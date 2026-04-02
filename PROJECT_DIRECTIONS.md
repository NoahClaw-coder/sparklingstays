# Sparkling Stays — Full Project Directions

Last updated: 2026-04-02
Owner: Bana
Operator: Noah

---

## 1. What This Project Is

A WordPress → Next.js/Vercel migration of sparklingstays.com.

**The goal:**
- Same front-end design as the current live site
- Much better tech, speed, SEO, and AEO underneath
- Cleaner URL structure (from 1000+ pages down to ~116)
- Ranking preservation through careful redirects
- Launch-ready on Vercel with GitHub CI/CD

---

## 2. Design Rule

**Copy the exact design of sparklingstays.com.**

Not "inspired by." Not a redesign. Not a premium reinterpretation.
The same layout, same colors, same section order, same visual identity.

### What stays the same
- Layout logic and section order
- Color palette (navy, gold, white, cream)
- Header structure (utility bar → logo/nav → book now)
- Hero composition (video background, Google stars, centered headline, 2 CTAs)
- Service card grid rhythm
- How-it-works section
- FAQ accordion style
- Footer structure (4-column)
- Small social icons (not text links)

### What changes
- Tech stack (WordPress → Next.js 15 + Tailwind + Vercel)
- Site architecture (cleaner, fewer pages, no cannibalization)
- SEO structure (proper meta, schema, canonicals, hreflang, sitemap)
- AEO optimization (entity clarity, FAQ structure, llms.txt)
- Speed (static/SSR, no WordPress bloat)
- Maintainability (GitHub repo, clean codebase)

---

## 3. Copy Rules

- Do NOT mention "bilingual service" — in Montreal/Quebec that is assumed
- Do NOT use generic AI-sounding filler copy
- Keep copy close to the live site's tone
- Service descriptions should be practical, not marketing fluff

---

## 4. Site Structure (116 pages)

See `TARGET_SITE_MAP.md` for the full page-by-page breakdown.

### Summary
| Category | Pages | Notes |
|---|---|---|
| Core (home, about, contact, faq, book-now, pricing, services hub, areas hub) | 16 | 8 × EN/FR |
| Service pages (10 services) | 20 | 10 × EN/FR |
| Regional area hubs (Montreal, Laval, West Island, South Shore) | 8 | 4 × EN/FR |
| Neighborhood pages (23 data-backed locations) | 46 | 23 × EN/FR |
| Support/blog content (10 topics) | 20 | 10 × EN/FR |
| Utility (privacy, terms, thank-you) | 6 | 3 × EN/FR |
| **Total** | **116** | |

---

## 5. SEO Strategy

See `SEO_ACTION_PLAN.md` for keyword targets, meta tags, schema specs, and internal linking strategy.

### Key principles
- One page = one primary search intent
- No duplicate-intent pages competing with each other
- Strong internal linking between service pages, area pages, and hubs
- Schema on every page (LocalBusiness, Service, FAQPage, BreadcrumbList)
- Proper canonical + hreflang on all EN/FR pairs
- Clean sitemap submitted to GSC + Bing

---

## 6. Redirect Strategy

See `REDIRECT_MAP.md` for the current redirect plan.

### Key principles
- Every ranking WordPress URL gets a 301 redirect to the best new equivalent
- Do not delete pages that are already ranking without redirecting them
- Consolidate weak/duplicate WordPress URLs into stronger parent pages
- Preserve link equity and search visibility through the migration

---

## 7. AEO Strategy

Make the site easy for AI search engines to understand and cite:
- Clear entity definitions (business name, services, locations)
- FAQ blocks with direct answers
- Structured schema
- llms.txt file for AI crawlers
- Concise, retrievable content formatting

---

## 8. Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router) |
| Styling | Tailwind CSS 4.x |
| i18n | next-intl (EN/FR) |
| Hosting | Vercel |
| Repo | GitHub (NoahClaw-coder/sparklingstays) |
| Images | next/image (auto WebP/AVIF) |
| Content | Inline data + JSON files (no CMS) |
| Forms | Server Actions or embedded booking widget |
| Analytics | Vercel Analytics + GA4 + GSC |

---

## 9. Build Order

### Phase A — Homepage exact port ✅ (done)
- Top utility bar, header/nav, hero video, services grid, how-it-works, about/trust, FAQ, lead form, footer

### Phase B — Internal page scaffolding ✅ (done)
- Routes for about, contact, faq, book-now, pricing, services, areas

### Phase C — Service detail pages (next)
- Dynamic route: `/[locale]/services/[slug]`
- 10 service pages with real content

### Phase D — Area/neighborhood detail pages
- Dynamic route: `/[locale]/areas/[slug]`
- 4 regional hubs + 23 neighborhood pages

### Phase E — Blog/support content
- Dynamic route: `/[locale]/blog/[slug]`
- 10 support articles

### Phase F — SEO layer
- Schema components (LocalBusiness, Service, FAQPage, BreadcrumbList, Article)
- Meta tags, OG tags, hreflang
- Sitemap, robots.txt, llms.txt
- Redirect configuration

### Phase G — FR content pass
- Full French translations for all pages beyond nav/hero

### Phase H — Deploy + go live
- Push to GitHub
- Deploy on Vercel
- Point DNS
- Verify redirects
- Submit sitemap to GSC + Bing
- Keep WordPress on old subdomain for 30 days

### Phase I — Monitor + optimize
- Weekly GSC review
- Fix any indexation/redirect issues
- Optimize underperforming pages based on data

---

## 10. Key Files in This Project

| File | Purpose |
|---|---|
| `PROJECT_DIRECTIONS.md` | This file — full project directions |
| `REDESIGN_HANDOFF.md` | Design direction lock + rate-limit recovery context |
| `TARGET_SITE_MAP.md` | Page-by-page site structure with data backing |
| `SEO_ACTION_PLAN.md` | Keyword targets, meta tags, schema, internal linking |
| `REDIRECT_MAP.md` | WordPress → new site redirect plan |
| `progress.json` | Build progress tracker |

---

## 11. Google Sheet

**Sparkling Stays - NEW URLs**
https://docs.google.com/spreadsheets/d/1OObU3ll7vfYE1XDIOkA9yhFah2uAp6j7i4KXB4mLUC8/edit

Tabs:
- **URLs** — all 116 target pages with group, priority, locale, URL, label, reason, evidence
- **Summary** — page count breakdown
- **Migration** — old URL → new URL → action → reason

---

## 12. Blockers / Dependencies

| Item | Status | Who |
|---|---|---|
| GitHub auth on Mac mini | ❌ Needed | Bana runs `gh auth login` |
| Vercel CLI auth | ❌ Needed | Bana runs `vercel login` or provides token |
| Vercel project link | ❌ Needed | Connect repo in Vercel dashboard |
| DNS switch | Not yet | Bana approves before switching |
| BookingKoala widget integration | Not yet | Needs booking widget embed code |

---

## 13. One-Line Summary

**Same Sparkling Stays design on the front end. Much better system underneath. 116 pages instead of 1000+. Launch on Vercel.**
