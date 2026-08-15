from fastapi import FastAPI, APIRouter
from fastapi.responses import Response
from fastapi.staticfiles import StaticFiles
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import asyncio
import logging
import uuid
from pathlib import Path
from pydantic import BaseModel, EmailStr
from datetime import datetime, timezone
from shadecards import build_shade_card
import admin as admin_module

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]
admin_module.init(db)

app = FastAPI()
api_router = APIRouter(prefix="/api")

RESEND_API_KEY = os.environ.get('RESEND_API_KEY', '')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')
INQUIRY_RECIPIENT = os.environ.get('INQUIRY_RECIPIENT', 'contact@hemsambhavimpex.com')

if RESEND_API_KEY:
    import resend
    resend.api_key = RESEND_API_KEY


class Inquiry(BaseModel):
    full_name: str
    company_name: str = ''
    email: EmailStr
    phone: str = ''
    country: str = ''
    product: str = ''
    quantity: str = ''
    message: str = ''


def inquiry_html(i: Inquiry) -> str:
    rows = [
        ("Full Name", i.full_name),
        ("Company", i.company_name),
        ("Email", i.email),
        ("Phone / WhatsApp", i.phone),
        ("Country / Destination Port", i.country),
        ("Product of Interest", i.product),
        ("Estimated Quantity", i.quantity),
        ("Message", i.message.replace("\n", "<br>")),
    ]
    body = "".join(
        f'<tr><td style="padding:10px 14px;border:1px solid #d8d2c4;font-family:monospace;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#1A4C7D;background:#F4F1EA;width:220px">{k}</td>'
        f'<td style="padding:10px 14px;border:1px solid #d8d2c4;font-family:Arial,sans-serif;font-size:14px;color:#111827">{v or "—"}</td></tr>'
        for k, v in rows
    )
    return (
        '<div style="max-width:640px;margin:0 auto;font-family:Arial,sans-serif">'
        '<div style="background:#0A192F;padding:20px 24px">'
        '<span style="color:#F4F1EA;font-size:15px;letter-spacing:3px;font-weight:bold">HEMSAMBHAV IMPEX</span>'
        '<span style="color:#C85A17;font-size:11px;letter-spacing:2px;margin-left:12px">NEW EXPORT INQUIRY</span></div>'
        f'<table style="border-collapse:collapse;width:100%;margin-top:0">{body}</table>'
        '<p style="font-family:monospace;font-size:11px;color:#6b7280;margin-top:16px">Submitted via hemsambhavimpex.com — reply directly to this email to reach the buyer.</p>'
        '</div>'
    )


@api_router.get("/")
async def root():
    return {"message": "HemSambhav Impex API"}


@api_router.post("/inquiries")
async def create_inquiry(inquiry: Inquiry):
    doc = inquiry.model_dump()
    doc['id'] = uuid.uuid4().hex[:12]
    doc['read'] = False
    doc['created_at'] = datetime.now(timezone.utc)
    await db.inquiries.insert_one(doc)
    delivered = False
    if RESEND_API_KEY:
        try:
            import resend
            params = {
                "from": SENDER_EMAIL,
                "to": [INQUIRY_RECIPIENT],
                "reply_to": [inquiry.email],
                "subject": f"Export Inquiry — {inquiry.product or 'General'} — {inquiry.full_name}",
                "html": inquiry_html(inquiry),
            }
            await asyncio.to_thread(resend.Emails.send, params)
            delivered = True
        except Exception as e:
            logger.error(f"Failed to send inquiry email: {e}")
    else:
        logger.info(f"Inquiry received (email delivery not configured): {inquiry.model_dump()}")
    return {"status": "success", "email_delivered": delivered}


@api_router.get("/shade-card/{slug}")
async def shade_card(slug: str):
    product = await db.products.find_one({'slug': slug}, {'_id': 0})
    if not product:
        return Response(status_code=404)
    pdf = await asyncio.to_thread(build_shade_card, product)
    return Response(
        content=pdf,
        media_type="application/pdf",
        headers={"Content-Disposition": f'attachment; filename="HemSambhav-ShadeCard-{slug}.pdf"'},
    )


app.include_router(api_router)
app.include_router(admin_module.router, prefix="/api")
app.mount("/api/uploads", StaticFiles(directory=Path(__file__).parent / "uploads"), name="uploads")


@app.on_event("startup")
async def startup_seed():
    await admin_module.seed(db)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
