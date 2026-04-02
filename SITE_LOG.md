# Sparkling Stays — Site Log

## Status: phase-1 rebuild implemented

### Updated
- Rebuilt the public architecture around approved pages 1-20
- Added coherent nav/footer, metadata, and internal linking
- Regenerated sitemap.xml from the actual indexable page set
- Updated vercel.json redirects for legacy and retired URLs
- Replaced out-of-scope legacy indexable pages with redirect coverage

## 2026-04-01 — Phase 0 Next.js scaffold
- Installed Next.js 15, React 19, next-intl, next-sitemap, Tailwind 4 toolchain, TypeScript, and ESLint
- Added bilingual App Router scaffold under `app/[locale]`
- Added source-of-truth data files: `content/data/services.json`, `content/data/neighborhoods.json`, `progress.json`
- Built initial component library: Header, Footer, CTAButton, FAQAccordion, JsonLd, Breadcrumbs, Hero, ServiceCard
- Configured `robots.txt`, `llms.txt`, `app/sitemap.ts`, and `next-sitemap.config.js`
- Added placeholder Phase 1 route scaffolds for home, service, pricing, about, contact, FAQ, and book-now pages
- Verified production build passes locally with `npm run build`
