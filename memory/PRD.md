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
- P1: Custom domain (hemsambhavimpex.com) + deploy build/ to static host (user handles domain)
- P1: Confirm FormSubmit activation email (first submission sent 2026-08-15)
- P2: User manages PDFs themselves; if shades/specs change, PDFs in public/pdfs must be regenerated or replaced manually
- P2: Sitemap.xml + robots.txt for the static host
