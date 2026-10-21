# NaZerak Site 2.0 — status log

Updated: 2026-10-21

## Delivered in the first version
- Separate repository: https://github.com/waslnison22-sudo/Nazerak-Site-2.0
- Main frontend: responsive home page, navigation and clean-route renderer.
- Route surfaces: home, forum, six category pages, members, search, cabinet, reports, topic, public profile, privacy and 404.
- Copy-IP interaction with success/fallback feedback; mobile menu and Escape handling.
- Dark visual system, existing autumn hero image, focus-visible styles and reduced-motion support.
- Apache clean routes and legacy .html redirects.
- Existing launcher manifest contract copied from legacy repository without inventing resources.
- robots.txt, sitemap.xml, master specification, README and this status log.
- GitHub Actions static QA workflow.

## Verification
- PASS — GitHub Actions static QA on first version.
- PASS — GitHub Actions static QA after route/launcher hardening.
- PASS — app.js Node syntax check, required files/routes, responsive rule markers, secret-marker scan, launcher JSON contract, legacy redirect markers.
- NOT RUN — real browser E2E and screenshots.
- NOT RUN — real Apache/REG.RU route behavior.
- NOT RUN — production asset fetch from a deployed preview.
- NOT RUN — accessibility automation and manual assistive technology review.
- NOT RUN — live Supabase schema/RLS/grants/function/migration history audit.
- NOT RUN — Discord OAuth round-trip and live redirect allowlist check.
- NOT RUN — production deploy; no deployment attempted.

## Important limitations
Forum topics, member data, search results, profiles, moderation and account authentication are honest scaffolds and do not query Supabase yet. The existing Supabase project was not changed. OAuth remains disabled until the exact live redirect configuration is checked. The selected autumn image is referenced from the existing production domain; the image was not copied into this repository or regenerated.

## Next batches
1. Add browser-based route smoke tests and review the actual rendered layout.
2. Read-only audit of legacy Supabase migrations and current Auth URL settings.
3. Connect real read-only forum/category/member queries using verified schema and RLS.
4. Configure and test OAuth on approved redirect URLs.
5. Release checklist, Apache preview smoke tests, rollback plan, and separate explicit approval before production deployment.
