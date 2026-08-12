# HemSambhav Impex — Export Website

## Original Problem Statement
Lead-generation website for HemSambhav Impex, the export division of Shree JK Handloom (JK Velvet), a Surat velvet manufacturer since 1990. Goal: get international bulk/export buyers to submit inquiries. Brand color navy #1A4C7D, tagline "Possibility to Prosperity", MOQ 250 m/item. Pages: Home, About, Products, Gallery, Blog, Contact. Contact form emails inquiries to contact@hemsambhavimpex.com — no lead DB requested. User pushed for Awwwards-level design: kinetic masked-line hero, editorial marquee, numbered manifesto chapters, framer-motion scroll reveals, lenis smooth scroll, parallax.

## Architecture
- Frontend: React 19 + Tailwind + framer-motion + lenis + react-fast-marquee (`/app/frontend/src/pages/*`, data in `src/data/catalog.js`)
- Backend: FastAPI `/api/inquiries` → Resend email (non-blocking via asyncio.to_thread); graceful log-only mode when RESEND_API_KEY empty
- DB: MongoDB connected per env convention but not used for leads (per user request)
- Brand assets extracted from user-uploaded brand-guidelines PDF: `/app/frontend/public/assets/logo-blue.png`, `logo-white.png`, `logo-mark.png`, `favicon.png`

## User Personas
- International bulk fabric buyers (box makers, garment exporters, upholsterers) in Nepal, Bangladesh, UAE, UK
- Sourcing agents needing mill-direct velvet with export documentation

## Core Requirements (static)
Navy-dominant palette (#1A4C7D + paper #F4F1EA + rust #C85A17), real uploaded logo as nav/favicon, 6 pages, 20-product catalog (flocked/weaving/knitting), 6 end-uses, markets manifest, blog template, inquiry form (name, company, email, phone/WhatsApp, country/port, product dropdown, quantity, message), MOQ 250 m, CTAs everywhere, fully responsive.

## Implemented (2026-08-12)
- "Modern Trade Manifest" art direction: Cormorant Garamond + Cabinet Grotesk + IBM Plex Mono, grain overlay, sharp-edged bordered grids
- Home: masked line-reveal hero with parallax velvet frame, editorial marquee, category bento, 01–04 "why us" manifesto rows, dark shipping-manifest markets table, parallax tagline band, end-uses grid, CTA band
- About: numbered chapters (1990 founding → export division → promise), values, 4 capabilities, jkvelvet.com link-out
- Products: 20 items, sticky category filter bar, end-use section, per-product "Request quote" deep-links prefilling the contact form
- Gallery: filterable masonry texture archive (placeholder stock imagery, swappable)
- Blog: 4 placeholder posts, archive-index listing + detail template
- Contact: full inquiry form → POST /api/inquiries → success panel; direct email/phone/WhatsApp/address; mailto fallback
- Email delivery via Resend implemented but MOCKED (RESEND_API_KEY empty in backend/.env — needs a real key; without it inquiries are accepted and logged server-side only)
- Product detail pages at /products/:slug for all 20 fabrics: indicative spec sheet (construction, composition, GSM, width, MOQ, packing, lead time, payment, Incoterms), 12-shade indicative digital shade card, prefilled quote + WhatsApp CTAs, related products (2026-08-12)
- Floating WhatsApp button site-wide (wa.me/919429581000, prefilled message; per-product variant on detail pages) (2026-08-12)
- Real JK Velvet mill photography live on all 20 products, category covers and gallery (pulled from jkvelvet.com asset paths via weserv image proxy into /public/assets/products/<slug>.jpg — local copies, no hotlink dependency) (2026-08-12)
- Real published specs (composition, GSM, width, roll length, MOQ) from jkvelvet.com wired into detail pages + shade-card PDFs for Coco, Cloud Design, Non-Woven, Micro 9000, Lycra and Holland; user supplied the remaining 14 on 2026-08-12 — ALL 20 fabrics now carry real mill data (per-fabric MOQs in metres or rolls/kg, e.g. Kabul 15 rolls/450 m, FD 1 roll, Micro 11000 1,000 m/colour). Brasso Velvet flagged "Out of stock" (stock:'out' in catalog.js)
- FD (Full Dull) Velvet renamed to "Twilight" (slug /products/twilight, photo twilight.jpg, PDF key updated) (2026-08-12)
- Spec tables + PDFs render ONLY confirmed mill data — unconfirmed fields (e.g. Composition/GSM on Twilight) omitted entirely, no category fallbacks. Brasso PDF carries out-of-stock notice. Generic "MOQ 250 m" claims replaced with "per fabric, from 150 m" (2026-08-12)
- NOTE: no admin panel exists — catalog data lives in frontend/src/data/catalog.js + backend/shadecards.py, edited by the agent. User has asked about an admin panel (add/remove data); candidate next feature.
- ADMIN PANEL LIVE (2026-08-12): MongoDB is now source of truth for products (collection `products`, seeded from backend/seed_products.json when empty). JWT admin auth (bcrypt, 12h token, 5-attempt lockout) at /admin. Admin can add/edit/delete fabrics, toggle stock, edit specs, upload photos (POST /api/admin/upload → /api/uploads/*). Public pages (Home/Products/ProductDetail/Contact dropdown) read live from GET /api/products via useProducts() with static catalog.js fallback. Shade-card PDFs now read live Mongo data. See /app/auth_testing.md for test playbook.
- BLOG MANAGER + PER-FABRIC SHADES (2026-08-12): admin has Fabrics/Journal tabs. Posts CRUD in Mongo `posts` (seeded from seed_posts.json); public /blog reads live via usePosts() with static fallback. Fabric editor has a shade-range editor (colour picker + name); product pages + PDFs use custom shades when set ("Mill range" label), else standard 12-shade card ("Indicative"). NOTE: blog post "Why 250 Metre MOQ Works" is now outdated (MOQs vary per fabric) — user can edit/delete it in the Journal tab.
- About chapters rewritten with the true founding story (Anil Doshi, 1990 handloom → velvet 2002 → JK Velvet brand 2015) and real jkvelvet.com about-page photography (mill-story-1.jpg, mill-whatwedo.jpg in /public/assets) (2026-08-12)
- Downloadable branded A4 shade-card PDFs per fabric: GET /api/shade-card/{slug} (reportlab, backend/shadecards.py) with spec table + 12 indicative shades; "Download Printable Shade Card (PDF)" button on every product detail page (2026-08-12)

## Backlog
- P0: Add real RESEND_API_KEY (resend.com → API Keys) + verify hemsambhavimpex.com sending domain so emails actually reach contact@hemsambhavimpex.com; update SENDER_EMAIL to a verified domain address
- P1: SEO metadata per page + OG image
- P2: Blog CMS (DB-backed posts), product detail pages, multi-language, analytics events on quote CTAs

## Next Tasks
1. Collect Resend key from user and enable live email delivery
2. Replace placeholder images with real JK Velvet photography
3. Add per-page meta/OG tags
