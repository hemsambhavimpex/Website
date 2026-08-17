# HemSambhav Impex — Static Export Website PRD

## Original problem statement
Premium B2B lead-generation website for HemSambhav Impex, the export division of Shree JK Handloom (JK Velvet), Surat. Goal: convert international bulk/export buyers into inquiries while presenting the house's velvet manufacturing authority. Brand color: navy `#1A4C7D`; tagline: `Possibility to Prosperity`.

## Current architecture
- Fully static React 19 SPA; no backend, MongoDB, admin panel, authentication, CMS, or server runtime.
- Public routes: Home, About, Products, Product Detail, Gallery, Blog, Blog Detail, Contact, branded 404.
- Static data lives in `frontend/src/data/products.js` (20 products), `gallery.js`, `posts.js` (currently empty by user request), and `catalog.js`.
- Static assets are local under `frontend/public/assets/`; fonts are self-hosted. No remote editorial images or font CDNs.
- Contact form uses FormSubmit to `contact@hemsambhavimpex.com`; no API key or backend required.
- WhatsApp and IndiaMART are external links only.
- Hostinger/Apache SPA support: `frontend/public/.htaccess` is copied into `frontend/build/`; `_redirects` and `vercel.json` also exist for compatible static hosts.
- Production build command: `cd /app/frontend && yarn build`. Deploy the **contents** of `frontend/build/`, including hidden `.htaccess`, into Hostinger `public_html`.

## Implemented and current state
- Premium editorial textile-export design using navy, paper, rust/gold accents, Cormorant Garamond, Cabinet Grotesk and IBM Plex Mono.
- 20 real product entries with local product photography, specifications, categories, and quote links.
- 2026-08-17: Product catalog supports multiple images per product. Each product currently has a JK Velvet cover image plus its existing local application/context image as the second view; `coverIndex` selects the cover without touching product data.
- Product display order is Weaving Velvet → Flocked Velvet → Raising Velvet across products, related lists, category cards and gallery tiles.
- Product detail pages use a large main image with an accessible thumbnail strip; the strip becomes horizontally scrollable when more than four images are added.
- Visible category order: Weaving Velvet, Flocked Velvet, Raising Velvet.
- Product detail pages show specifications and quote CTA; digital shade-card UI/download links were removed by user request. Old static shade-card PDFs may remain unlinked under `public/pdfs/`.
- Blog listing/detail infrastructure remains, but the static post list is intentionally empty.
- Footer includes parent-brand JK Velvet, IndiaMART, GSTIN, SGCCI and MSME credentials.
- 2026-08-17: Added a five-page A4 portrait downloadable PDF brochure at `/assets/HemSambhav-Impex-Brochure.pdf` and a prominent gold `Download Brochure` button in the footer credentials row.
- Brochure contents: cover; company/quality/export capability page; two featured-product pages with 8 products; global reach/contact page. Featured products: Coco Velvet, Galaxy Velvet, Korean Velvet, Non-Woven Velvet, Micro 11000 (Falcon Velvet), Micro 9000 Velvet, Holland Velvet, Raising Velvet.

## Verification
- Latest production build completed successfully after the brochure/footer change.
- Testing agent report: `/app/test_reports/iteration_1.json` — 100% frontend pass for the brochure.
- Testing agent report: `/app/test_reports/iteration_2.json` — 100% frontend pass for multi-image product support, cover selection, category ordering, all 20 cover assets, desktop/mobile thumbnails and no console errors.
- Verified: footer button visibility/attributes/accessibility, PDF HTTP 200 and `application/pdf`, valid PDF signature, exactly 5 A4 portrait pages, 8 products, GSTIN/email/phone/export markets, no console errors.
- Brochure file size: about 1.35 MB; included in `frontend/build/assets/`.

## Credentials
- No authentication or admin credentials exist. The site is fully static.
- FormSubmit owner activation remains an external manual step.

## Prioritized backlog
- P0: User uploads the contents of `frontend/build/` to Hostinger `public_html` when ready.
- P0: User confirms FormSubmit activation email and sends one live test inquiry from the deployed domain.
- P1: User reviews the generated brochure wording/product selection and requests any content revisions.
- P1: Add each product's full 5+ photo set when the user supplies or approves the additional images.
- P1: Decide whether to delete the 20 now-unlinked shade-card PDFs from `frontend/public/pdfs/` before final upload.
- P2: Add future blog articles to `frontend/src/data/posts.js` when the user supplies approved content.
- P2: Final SEO/content review only if explicitly requested; do not create sitemap.xml or robots.txt without user approval.
