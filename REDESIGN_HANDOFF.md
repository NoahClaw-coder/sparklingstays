# Sparkling Stays Redesign Handoff

Last updated: 2026-04-02
Owner: Noah

## Purpose
This file prevents design drift after rate limits, context resets, or long pauses.
Read this first before doing any new homepage or design work.

## Locked Design Direction

### What Bana wants
- **Port the exact homepage/site design of the current live site `sparklingstays.com`.**
- Treat the current live Sparkling Stays site as the **direct UI blueprint**, not merely inspiration.
- It is acceptable to borrow useful ideas from **thecleanpanther.ca** only if needed, but the design target remains Sparkling Stays.
- **Do not** use the generic text-first layout that was previously built.
- Keep **Sparkling Stays color tones/palette**.
- Do **not** mention “bilingual service” as a selling point by default — in Montreal/Quebec that is assumed.
- The site should feel like the same Sparkling Stays brand/site, rebuilt on better tech.

### Explicitly rejected direction
- Text-heavy generic SaaS-style blocks
- Blank sections with no images
- Plain placeholder-looking cards
- Minimal “AI-looking” layout rhythm
- Reusing the earlier generic homepage structure as the base

## Homepage Direction (Locked)
1. Top utility bar matching the live site structure
2. Small social icons like the live site
3. Main navigation matching the live site structure/order
4. Hero should match the live site composition: video background, review strip, headline, subheadline, two CTAs
5. Services section should follow the live site card/grid rhythm
6. How-it-works, FAQ, review/trust, and footer should follow the live site structure as closely as practical
7. Preserve the visual identity of the current Sparkling Stays site rather than redesigning it
8. Keep Sparkling Stays navy/gold/white palette

## Visual References
### Primary reference
- https://sparklingstays.com
- Notes:
  - top utility bar
  - strong visual hero
  - service cards with imagery
  - business-style homepage rhythm
  - current layout direction is preferred

### Secondary reference
- https://thecleanpanther.ca
- Notes:
  - useful for conversion structure
  - stronger visual hierarchy
  - more energetic service landing page rhythm
  - use only as inspiration, not for brand colors

## Asset / Media Direction
- Use real images from Sparkling Stays current site / WP media when possible
- Preserve the feel of the current site’s hero media
- Bana noted that the current site hero includes a **video** and grey background context behind it
- Do not ship image-less layouts
- Avoid unnecessary “bilingual” messaging in hero, trust, or service copy unless it is specifically needed for a page

## Build Priority Order
1. Rebuild homepage layout first
2. Rebuild shared header/footer/navigation
3. Rebuild shared visual section components
4. Then apply redesign system to services/areas pages

## If Rate Limited / Forced To Pause
Before stopping, update this file and progress.json with:
- current page being redesigned
- visual references used
- assets gathered/not yet gathered
- exact next step

## Current Next Step
- Port the Sparkling Stays homepage section-for-section from the live site into Next.js
- Finish exact layout matching for utility bar, header/nav, hero, services, how-it-works, FAQ, and footer
- Then propagate the same visual system across internal pages while preserving the SEO/AEO rebuild plan underneath

## Reminder To Future Self
If you come back and feel tempted to reuse the generic layout: don’t.
That version was rejected by Bana.
This project now follows the existing Sparkling Stays layout direction first, competitor inspiration second.
