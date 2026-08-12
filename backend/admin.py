import os
import json
import uuid
import re
from datetime import datetime, timezone, timedelta
from pathlib import Path

import bcrypt
import jwt
from fastapi import APIRouter, HTTPException, Request, UploadFile, File
from pydantic import BaseModel

router = APIRouter()

JWT_ALGORITHM = 'HS256'
UPLOAD_DIR = Path(__file__).parent / 'uploads'
UPLOAD_DIR.mkdir(exist_ok=True)

_db = None


def init(db):
    global _db
    _db = db


def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')


def verify_password(plain: str, hashed: str) -> bool:
    return bcrypt.checkpw(plain.encode('utf-8'), hashed.encode('utf-8'))


def create_token(email: str) -> str:
    payload = {
        'sub': email,
        'exp': datetime.now(timezone.utc) + timedelta(hours=12),
        'type': 'access',
    }
    return jwt.encode(payload, os.environ['JWT_SECRET'], algorithm=JWT_ALGORITHM)


async def require_admin(request: Request):
    auth = request.headers.get('Authorization', '')
    token = auth[7:] if auth.startswith('Bearer ') else request.cookies.get('access_token')
    if not token:
        raise HTTPException(status_code=401, detail='Not authenticated')
    try:
        payload = jwt.decode(token, os.environ['JWT_SECRET'], algorithms=[JWT_ALGORITHM])
        if payload.get('type') != 'access':
            raise HTTPException(status_code=401, detail='Invalid token')
        return payload['sub']
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail='Token expired — sign in again')
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail='Invalid token')


async def seed(db):
    await db.users.create_index('email', unique=True)
    await db.products.create_index('slug', unique=True)
    await db.posts.create_index('slug', unique=True)
    await db.login_attempts.create_index('identifier')

    email = os.environ['ADMIN_EMAIL']
    password = os.environ['ADMIN_PASSWORD']
    existing = await db.users.find_one({'email': email})
    if existing is None:
        await db.users.insert_one({
            'email': email, 'password_hash': hash_password(password),
            'name': 'Admin', 'role': 'admin', 'created_at': datetime.now(timezone.utc),
        })
    elif not verify_password(password, existing['password_hash']):
        await db.users.update_one({'email': email}, {'$set': {'password_hash': hash_password(password)}})

    if await db.products.count_documents({}) == 0:
        seed_file = Path(__file__).parent / 'seed_products.json'
        if seed_file.exists():
            products = json.loads(seed_file.read_text())
            for p in products:
                p['updated_at'] = datetime.now(timezone.utc)
            await db.products.insert_many(products)

    if await db.posts.count_documents({}) == 0:
        posts_file = Path(__file__).parent / 'seed_posts.json'
        if posts_file.exists():
            posts = json.loads(posts_file.read_text())
            for p in posts:
                p['updated_at'] = datetime.now(timezone.utc)
            await db.posts.insert_many(posts)


def clean_product(doc: dict) -> dict:
    doc.pop('_id', None)
    return doc


class LoginBody(BaseModel):
    email: str
    password: str


class ProductBody(BaseModel):
    slug: str
    name: str
    cat: str
    variants: str = ''
    desc: str = ''
    uses: list = []
    stock: str = 'in'
    specs: dict = {}
    shades: list = []
    photo: str = ''
    img: str = 'fabricRack'


class PostBody(BaseModel):
    slug: str
    title: str
    date: str = ''
    category: str = 'Industry Notes'
    excerpt: str = ''
    img: str = 'heroVelvet'
    body: list = []


@router.post('/admin/login')
async def login(body: LoginBody, request: Request):
    email = body.email.strip().lower()
    identifier = f"{request.client.host}:{email}"
    attempts = await _db.login_attempts.find_one({'identifier': identifier})
    if attempts and attempts.get('count', 0) >= 5:
        locked_at = attempts.get('last', datetime.now(timezone.utc))
        if locked_at.tzinfo is None:
            locked_at = locked_at.replace(tzinfo=timezone.utc)
        if datetime.now(timezone.utc) - locked_at < timedelta(minutes=15):
            raise HTTPException(status_code=429, detail='Too many attempts — locked for 15 minutes')

    user = await _db.users.find_one({'email': email})
    if not user or not verify_password(body.password, user['password_hash']):
        await _db.login_attempts.update_one(
            {'identifier': identifier},
            {'$inc': {'count': 1}, '$set': {'last': datetime.now(timezone.utc)}},
            upsert=True,
        )
        raise HTTPException(status_code=401, detail='Invalid email or password')
    await _db.login_attempts.delete_one({'identifier': identifier})
    return {'token': create_token(email), 'email': email, 'name': user.get('name', 'Admin')}


@router.get('/products')
async def list_products():
    docs = await _db.products.find({}).to_list(200)
    return [clean_product(d) for d in docs]


@router.get('/admin/products')
async def admin_list_products(request: Request):
    await require_admin(request)
    return await list_products()


@router.post('/admin/products')
async def create_product(body: ProductBody, request: Request):
    await require_admin(request)
    slug = re.sub(r'[^a-z0-9]+', '-', body.slug.lower()).strip('-')
    if await _db.products.find_one({'slug': slug}):
        raise HTTPException(status_code=409, detail='A fabric with this slug already exists')
    doc = body.model_dump()
    doc['slug'] = slug
    doc['updated_at'] = datetime.now(timezone.utc)
    await _db.products.insert_one(doc)
    return clean_product(doc)


@router.put('/admin/products/{slug}')
async def update_product(slug: str, body: ProductBody, request: Request):
    await require_admin(request)
    doc = body.model_dump()
    doc['slug'] = slug
    doc['updated_at'] = datetime.now(timezone.utc)
    result = await _db.products.update_one({'slug': slug}, {'$set': doc})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail='Fabric not found')
    return clean_product(doc)


@router.delete('/admin/products/{slug}')
async def delete_product(slug: str, request: Request):
    await require_admin(request)
    result = await _db.products.delete_one({'slug': slug})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail='Fabric not found')
    return {'deleted': slug}


@router.get('/posts')
async def list_posts():
    docs = await _db.posts.find({}).sort('date', -1).to_list(200)
    return [clean_product(d) for d in docs]


@router.post('/admin/posts')
async def create_post(body: PostBody, request: Request):
    await require_admin(request)
    slug = re.sub(r'[^a-z0-9]+', '-', body.slug.lower()).strip('-')
    if await _db.posts.find_one({'slug': slug}):
        raise HTTPException(status_code=409, detail='A post with this slug already exists')
    doc = body.model_dump()
    doc['slug'] = slug
    if not doc['date']:
        doc['date'] = datetime.now(timezone.utc).date().isoformat()
    doc['updated_at'] = datetime.now(timezone.utc)
    await _db.posts.insert_one(doc)
    return clean_product(doc)


@router.put('/admin/posts/{slug}')
async def update_post(slug: str, body: PostBody, request: Request):
    await require_admin(request)
    doc = body.model_dump()
    doc['slug'] = slug
    doc['updated_at'] = datetime.now(timezone.utc)
    result = await _db.posts.update_one({'slug': slug}, {'$set': doc})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail='Post not found')
    return clean_product(doc)


@router.delete('/admin/posts/{slug}')
async def delete_post(slug: str, request: Request):
    await require_admin(request)
    result = await _db.posts.delete_one({'slug': slug})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail='Post not found')
    return {'deleted': slug}


@router.post('/admin/upload')
async def upload_photo(request: Request, file: UploadFile = File(...)):
    await require_admin(request)
    ext = Path(file.filename).suffix.lower()
    if ext not in ('.jpg', '.jpeg', '.png', '.webp'):
        raise HTTPException(status_code=400, detail='Only JPG, PNG or WebP images')
    fname = f'{uuid.uuid4().hex[:12]}{ext}'
    data = await file.read()
    if len(data) > 8 * 1024 * 1024:
        raise HTTPException(status_code=400, detail='Image must be under 8 MB')
    (UPLOAD_DIR / fname).write_bytes(data)
    return {'url': f'/api/uploads/{fname}'}
