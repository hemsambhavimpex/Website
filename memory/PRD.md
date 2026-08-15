# HemSambhav Impex — Export Website (FULLY STATIC since 2026-08-15)

## Original Problem Statement
Lead-generation website for HemSambhav Impex, the export division of Shree JK Handloom (JK Velvet), a Surat velvet manufacturer since 1990. Goal: get international bulk/export buyers to submit inquiries. Brand color navy #1A4C7D, tagline "Possibility to Prosperity". Pages: Home, About, Products, Gallery, Blog, Contact.

## CURRENT ARCHITECTURE (static)
- React 19 SPA, NO backend, NO MongoDB, NO admin panel (all removed 2026-08-15 by user decision)
- Static data: src/data/products.js (20 fabrics), src/data/posts.js (3 posts), src/data/gallery.js (13 tiles), src/data/catalog.js (categories, markets, shades, images, helpers, contact)
- Static PDFs: public/pdfs/HemSambhav-ShadeCard-<slug>.pdf (20 files, pre-generated)
- Contact form: FormSubmit AJAX → contact@hemsambhavimpex.com (NO key; first submission triggers a one-time activation email the owner must confirm)
- SPA fallback configs: public/_redirects (Netlify/CF Pages) + vercel.json (Vercel)
- Build: cd /app/frontend && yarn build → deploy /app/frontend/build to any static host
- SEO: useSEO hook per page (title/description/OG), JSON-LD Organization in index.html

## Content history (all preserved through static conversion)
- Real JK Velvet photography (all 20 products), real mill specs incl. per-fabric MOQs (user-supplied), Brasso out of stock, "FD (Full Dull) Velvet" renamed to "Twilight", real founding story (Anil Doshi 1990 → velvet 2002 → JK Velvet brand 2015)
- User deleted the "Why 250 Metre MOQ" blog post via admin before conversion — 3 posts remain

## Removed on 2026-08-15
- /app/backend entirely (FastAPI, Motor/MongoDB, Resend code, JWT/bcrypt auth, admin CRUD, upload endpoint, PDF generator)
- Admin panel (/admin route, Admin.jsx), axios, useProducts/usePosts/useGallery hooks

## Backlog
- P1: Custom domain (hemsambhavimpex.com) + upload frontend/build to Hostinger Single public_html (user handles domain)
- P1: Confirm FormSubmit activation email (test submissions sent 2026-08-15)

## Production readiness (2026-08-15)
- public/.htaccess added: Apache SPA rewrite (deep links/refresh work on Hostinger), 1y asset caching, gzip, ErrorDocument 404 → index.html
- Branded 404 page (src/pages/NotFound.jsx) replaced the Home catch-all
- Mobile darkening fixed: Chrome Android auto-dark-theme was recoloring the page because no color-scheme was declared — added `<meta name="color-scheme" content="only light">` + `html { color-scheme: only light }`. Desktop untouched
- Emergent-only scripts removed from index.html: emergent-main.js, PostHog analytics (ap.emergent.sh), DataCloneError preview patch
- Verified on static serve of build/: all routes 200, 20/20 product pages, 3/3 posts, 404 page, mobile menu, FormSubmit success + mailto fallback, no console errors
- Build: `cd frontend && yarn build` → deploy frontend/build/ (8.6 MB: 20 PDFs, 20 product photos, hashed bundles)
