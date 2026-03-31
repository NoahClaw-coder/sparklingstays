# Sparkling Stays — Redirect Map
**Purpose:** Preserve link equity and traffic from old WordPress URLs to new Vercel static site URLs.
**Rule:** Any page with 5+ clicks gets a 301 redirect. Pages below threshold get noindexed or dropped.

---

## Priority Redirects (5+ clicks)

| Old URL | New URL | Clicks | Impressions | Reason |
|---------|---------|--------|-------------|--------|
| `/prix-femme-de-menage-montreal-2-heures-par-semaine/` | `/prix-nettoyage-montreal` | 219 | 13,811 | Top traffic page — French pricing page redirect |
| `/` | `/` | 48 | 25,541 | Homepage stays — but title/meta MUST be fixed |
| `/fr/comment-nettoyer-une-baignoire-sans-frotter/` | `/cleaning-services-montreal` | 35 | 3,053 | Blog post → service hub (no exact match page) |
| `/bathtub-cleaning-without-scrubbing/` | `/cleaning-services-montreal` | 26 | 6,099 | Blog post → service hub |
| `/house-cleaning-services-in-dollard-des-ormeaux-ddo/` | `/west-island-cleaning-services` | 13 | 2,676 | DDO is West Island area — best location match |

---

## Secondary Redirects (impression value or brand consistency)

| Old URL | New URL | Clicks | Impressions | Reason |
|---------|---------|--------|-------------|--------|
| `/cleaning-services-montreal/` | `/cleaning-services-montreal` | — | — | Trailing slash canonical |
| `/deep-cleaning-montreal/` | `/deep-cleaning-montreal` | — | — | Trailing slash canonical |
| `/move-in-out-cleaning-montreal/` | `/move-in-out-cleaning-montreal` | — | — | Trailing slash canonical |
| `/airbnb-cleaning-montreal/` | `/airbnb-cleaning-montreal` | — | — | Trailing slash canonical |
| `/post-renovation-cleaning/` | `/post-renovation-cleaning-montreal` | — | — | Old URL without city |
| `/recurring-cleaning/` | `/recurring-cleaning-montreal` | — | — | Old URL without city |
| `/blog/` | `/cleaning-services-montreal` | — | — | Blog → service hub (no blog on new site) |
| `/blog` | `/cleaning-services-montreal` | — | — | Blog without slash |
| `/book-now/` | `/quote` | — | — | Old CTA URL |
| `/book-now` | `/quote` | — | — | Old CTA URL without slash |
| `/contact/` | `/quote` | — | — | Old contact page |
| `/contact` | `/quote` | — | — | Old contact without slash |
| `/services/` | `/cleaning-services-montreal` | — | — | Old services hub |
| `/services` | `/cleaning-services-montreal` | — | — | Old services hub without slash |
| `/en/` | `/` | — | — | Old bilingual prefix |
| `/fr/` | `/prix-nettoyage-montreal` | — | — | Old French prefix → FR pricing page |

---

## Notes
- `/fr/comment-nettoyer-une-baignoire-sans-frotter/` and `/bathtub-cleaning-without-scrubbing/` are informational blog posts with no exact match on the new site. Redirecting to the service hub is correct.
- The homepage CTR issue (0.2% at pos 19) is NOT a redirect problem — it requires title tag + meta description optimization.
- DDO (Dollard-des-Ormeaux) is technically West Island. Consider adding a specific DDO section to the west-island page or a standalone DDO page if traffic grows.
