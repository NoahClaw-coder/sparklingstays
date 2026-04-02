# Sparkling Stays — Target Site Map (Revised)

Last updated: 2026-04-02
Status: locked planning draft for the Next.js/Vercel rebuild

## Why this replaces the earlier loose draft
We already had partial planning spread across:
- `SEO_ACTION_PLAN.md`
- `REDIRECT_MAP.md`
- `progress.json` (target = 125 pages)

That earlier number was useful for production tracking, but it mixed build phases with final information architecture.
This document cleans that up into a tighter, data-backed target sitemap.

---

## Data sources used
1. **GSC / page-query evidence already provided**
   - redirect map pages with clicks/impressions
   - neighborhood demand list in `content/data/neighborhoods.json`
2. **Ahrefs / keyword planning already reflected in `SEO_ACTION_PLAN.md`**
3. Existing WordPress URL inventory + cannibalization concern from Bana

---

## Recommended final published page count on Vercel
# **120 pages total**

This keeps the site strong and scalable without reproducing the current 1000+ page sprawl.

### Count breakdown
- Core/sitewide pages: **16** (8 page types × 2 languages)
- Service architecture pages: **20** (10 page types × 2 languages)
- Regional area pages: **8** (4 page types × 2 languages)
- Neighborhood pages: **50** (25 page types × 2 languages)
- Supporting SEO/AEO content pages: **20** (10 page types × 2 languages)
- Legal/utility/conversion pages: **6** (3 page types × 2 languages)

**Total = 120 pages**

> Note: this is a cleaner final IA than the earlier working target of 125. The older 125 number was a build tracker, not the final optimized sitemap.

---

# 1) Core / sitewide pages (16 total)
These are mandatory brand + conversion pages.

## English + French
1. `/` / homepage
2. `/about`
3. `/contact`
4. `/faq`
5. `/book-now`
6. `/pricing`
7. `/services`
8. `/areas`

### Why these stay
- required for trust / conversion / nav clarity
- already align with the current Sparkling Stays UX
- strong internal linking hubs

---

# 2) Service architecture pages (20 total)
These are the main transactional SEO pages.

## English + French
1. `/services/home-cleaning`
2. `/services/deep-cleaning`
3. `/services/move-in-out-cleaning`
4. `/services/commercial-cleaning`
5. `/services/office-cleaning`
6. `/services/maid-services`
7. `/services/airbnb-cleaning`
8. `/services/window-cleaning`
9. `/services/post-renovation-cleaning`
10. `/services/recurring-cleaning`

### Why these stay
These map to the strongest direct intent clusters already identified in `SEO_ACTION_PLAN.md`, including:
- cleaning services montreal
- deep cleaning montreal
- move out cleaning montreal
- airbnb cleaning montreal
- post renovation cleaning montreal
- recurring cleaning montreal
- office/commercial intent

### Improvement over earlier draft
- **Move-in/out cleaning** and **Recurring cleaning** are explicitly included as first-class service pages
- no vague overlap between general service pages and pricing/quote pages

---

# 3) Regional area pages (8 total)
These are the main local hubs.

## English + French
1. `/areas/montreal`
2. `/areas/laval`
3. `/areas/west-island`
4. `/areas/south-shore`

### Why these stay
These are the strongest parent geography pages and help consolidate local authority.
They also support internal linking to neighborhood pages without forcing every old location URL to remain standalone.

---

# 4) Neighborhood pages (50 total)
These are data-backed from the GSC neighborhood impression set already loaded in `content/data/neighborhoods.json`.

## English + French
1. `/areas/brossard` — 29,623 impressions
2. `/areas/laval` — 30,057 impressions *(also acts as regional hub)*
3. `/areas/longueuil` — 23,468 impressions
4. `/areas/pointe-claire` — 13,617 impressions
5. `/areas/kirkland` — 12,185 impressions
6. `/areas/dollard-des-ormeaux` — 12,358 impressions
7. `/areas/pierrefonds` — 11,502 impressions
8. `/areas/chambly` — 10,114 impressions
9. `/areas/saint-constant` — 8,398 impressions
10. `/areas/ile-perrot` — 8,393 impressions
11. `/areas/saint-laurent` — 6,119 impressions
12. `/areas/boucherville` — 5,996 impressions
13. `/areas/ville-marie` — 5,847 impressions
14. `/areas/beaconsfield` — 5,318 impressions
15. `/areas/baie-d-urfe` — 4,592 impressions
16. `/areas/westmount` — 4,333 impressions
17. `/areas/saint-hubert` — 3,185 impressions
18. `/areas/plateau-mont-royal` — 3,069 impressions
19. `/areas/lachine` — 2,830 impressions
20. `/areas/cote-des-neiges` — 2,730 impressions
21. `/areas/rosemont` — 2,613 impressions
22. `/areas/lasalle` — 2,269 impressions
23. `/areas/ndg` — 1,737 impressions
24. `/areas/vaudreuil-dorion` — 1,320 impressions
25. `/areas/montreal` *(regional hub page, supports borough linking and central-intent consolidation)*

### Why all 25 stay
Because these are not random city pages — they were selected from real search demand signals already gathered.
Even the lowest-priority one in the current list still has meaningful local impressions.

### Priority tiers
#### Tier 1 — must-win local pages
- Laval
- Brossard
- Longueuil
- Pointe-Claire
- Kirkland
- DDO
- Pierrefonds
- Chambly
- Saint-Constant
- Île-Perrot

#### Tier 2 — strong secondary local pages
- Saint-Laurent
- Boucherville
- Ville-Marie
- Beaconsfield
- Baie-d’Urfé
- Westmount

#### Tier 3 — long-tail/local coverage pages
- Saint-Hubert
- Plateau-Mont-Royal
- Lachine
- Côte-des-Neiges
- Rosemont
- LaSalle
- NDG
- Vaudreuil-Dorion

---

# 5) Supporting SEO / AEO pages (20 total)
These replace random blog sprawl with a tighter, intent-driven support layer.

## English + French
1. `/blog/how-much-does-cleaning-cost-in-montreal`
2. `/blog/deep-cleaning-vs-standard-cleaning-montreal`
3. `/blog/move-out-cleaning-checklist-montreal`
4. `/blog/airbnb-turnover-cleaning-checklist-montreal`
5. `/blog/post-renovation-cleaning-checklist-montreal`
6. `/blog/how-often-should-you-book-recurring-cleaning`
7. `/blog/what-is-included-in-a-home-cleaning-service`
8. `/blog/how-to-prepare-for-a-cleaning-service-visit`
9. `/blog/office-cleaning-checklist-montreal`
10. `/blog/window-cleaning-and-seasonal-home-maintenance`

### Why only 10 topics
- enough to support AEO / FAQ / long-tail capture
- avoids recreating low-value blog sprawl
- each topic supports a real service or pricing intent

### Improvement over earlier draft
The earlier working plan implied 15 blog topics (30 bilingual pages). This tighter set uses **10 stronger topics** instead of producing more content than we can justify.

---

# 6) Legal / utility / conversion pages (6 total)
## English + French
1. `/privacy-policy`
2. `/terms`
3. `/thank-you`

### Why these stay
- trust / compliance
- conversion tracking
- necessary for launch and ads/analytics hygiene if expanded later

---

# 7) What gets redirected instead of rebuilt
This is critical because of the existing WordPress sprawl.

## Redirect rule
- keep and rebuild only pages with clear intent + evidence
- redirect weak or duplicate URLs into the strongest parent/service/location page
- do **not** recreate random blog pages unless they have clear value

## Already evidenced from redirect planning
High-priority redirects already identified in `REDIRECT_MAP.md` include:
- `/prix-femme-de-menage-montreal-2-heures-par-semaine/`
- bathtub-cleaning blog URLs
- DDO old page
- service/blog trailing-slash variants

### Redirect strategy by bucket
- old pricing pages → `/pricing`
- old service variations → canonical service page
- old neighborhood fragments → best matching area page
- weak informational blogs → best matching service or support article
- booking/contact duplicates → `/book-now` or `/contact`

---

# 8) Pages that should NOT be multiplied
To avoid cannibalization, do **not** create multiple pages for the same intent such as:
- separate “maid service montreal”, “cleaning lady montreal”, and “house cleaning montreal” pages if one page can own the intent cluster
- multiple shallow borough pages with nearly identical content
- blog posts that duplicate service page FAQs
- quote pages that compete with pricing/contact/book-now

---

# 9) Final recommendation
## Final Vercel site size: **120 published pages**
This is the best current target because it:
- preserves major local and service intent
- uses the GSC local demand already collected
- aligns with the Ahrefs-informed keyword plan
- avoids rebuilding the 1000+ WordPress mess
- gives us enough breadth for SEO/AEO without causing fresh cannibalization

If we later find stronger evidence for expansion, we can add pages from data — not from guesswork.
