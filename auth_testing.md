# Auth Testing Playbook — HemSambhav Impex Admin

## Credentials (test admin — see /app/memory/test_credentials.md)
- Email: admin@hemsambhavimpex.com
- Password: JKVelvet@Admin2026
- Role: admin (seeded on backend startup from ADMIN_EMAIL/ADMIN_PASSWORD env vars; hash auto-updates if env password changes)

## Endpoints
- POST /api/admin/login {email, password} → {token, email, name} (brute-force: 5 fails = 15 min lockout per IP+email)
- GET /api/products (public) → all fabrics
- GET /api/admin/products (Bearer token)
- POST /api/admin/products (Bearer) — create; 409 on duplicate slug
- PUT /api/admin/products/{slug} (Bearer) — full update
- DELETE /api/admin/products/{slug} (Bearer)
- POST /api/admin/upload (Bearer, multipart file) → {url: /api/uploads/<file>} served statically
- GET /api/shade-card/{slug} — public PDF, reads live Mongo data

## Quick curl test
```
API=http://localhost:8001
TOKEN=$(curl -s -X POST $API/api/admin/login -H "Content-Type: application/json" -d '{"email":"admin@hemsambhavimpex.com","password":"JKVelvet@Admin2026"}' | python3 -c "import sys,json;print(json.load(sys.stdin)['token'])")
curl -s $API/api/products | python3 -c "import sys,json;print(len(json.load(sys.stdin)))"
curl -s -X PUT $API/api/admin/products/twilight -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{"slug":"twilight","name":"Twilight","cat":"weaving","variants":"Woven · FD Full Dull","desc":"Woven full-dull pile.","uses":["Upholstery"],"stock":"in","specs":{"width":"54 in (137 cm)","roll":"70–100 m rolls","moq":"1 roll"},"photo":"twilight.jpg","img":"sofaGrey"}'
```
