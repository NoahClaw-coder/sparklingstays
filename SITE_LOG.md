# Sparkling Stays — Site Log

## Status: Built, pending push to GitHub

### Build Complete (2026-03-31, ~3am EDT)
All pages built locally at: /Users/banaf/.openclaw/workspace/projects/sparklingstays/

### Files Built
- index.html — Homepage (targets "cleaning services montreal")
- cleaning-services-montreal.html
- deep-cleaning-montreal.html
- move-in-out-cleaning-montreal.html
- airbnb-cleaning-montreal.html
- post-renovation-cleaning-montreal.html
- recurring-cleaning-montreal.html
- prix-nettoyage-montreal.html (FRENCH — most important page based on GSC data)
- ndg-cleaning-services.html
- plateau-cleaning-services.html
- westmount-cleaning-services.html
- laval-cleaning-services.html
- brossard-cleaning-services.html
- west-island-cleaning-services.html
- quote.html (has BookingKoala placeholder + fallback form)
- style.css, main.js
- vercel.json (cleanUrls, redirects from old WP URLs)
- sitemap.xml
- REDIRECT_MAP.md (old WP URLs → new clean URLs)
- SEO_ACTION_PLAN.md (keywords, title tags, meta descriptions, schema checklist)

### GitHub Repo
https://github.com/NoahClaw-coder/sparklingstays
Status: commits exist locally, push BLOCKED by expired GitHub token

### TODO (for Bana tomorrow)
1. Generate new GitHub token at: https://github.com/settings/tokens
   - Scope: repo
   - Then run: git -C /Users/banaf/.openclaw/workspace/projects/sparklingstays push origin main
2. Create Vercel project and connect to the GitHub repo
3. Set domain to sparklingstays.com on Vercel
4. Provide BookingKoala HTML embed code for quote.html

### Branding
- Primary: #DEA062 (gold/orange)
- Secondary: #000000 (black)
- Font: Inter
- Booking: https://sparklingstays.bookingkoala.com (placeholder "#book" in most CTAs)

### Key SEO Decisions
- Redirect /prix-femme-de-menage-montreal-2-heures-par-semaine/ → /prix-nettoyage-montreal (top performing page)
- Homepage targets "cleaning services montreal" (1,465 impressions, pos 20 — biggest opportunity)
- Old thin pages (whiteboard cleaning, party cleanup) marked for noindex in REDIRECT_MAP.md
