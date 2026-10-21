# NaZerak Site 2.0 — status log

Updated: 2026-10-21

## Delivered in the first version
- Separate repository: https://github.com/waslnison22-sudo/Nazerak-Site-2.0
- Responsive home page, navigation, clean-route renderer and honest page states.
- Home, About section, search, privacy and 404.
- Forum and members catalog removed from the visible interface; cabinet and launcher are non-functional placeholder controls.
- Copy-IP interaction, mobile menu, Escape handling, focus-visible and reduced-motion support.
- Apache clean routes plus redirects for legacy .html URLs.
- Existing launcher manifest schema preserved exactly.
- robots.txt, sitemap.xml, master specification, README and status log.
- Dependency-free local preview server and route/asset smoke test.

## Verification
- PASS — GitHub Actions static QA on initial version and route/launcher hardening.
- PASS — app.js syntax check and static required-file/route/secret-marker checks.
- PASS — launcher JSON contract and legacy rewrite markers.
- PASS — GitHub Actions local HTTP smoke test for route fallback and static assets.
- NOT RUN — real browser E2E and screenshots.
- NOT RUN — actual Apache/REG.RU route behavior.
- NOT RUN — accessibility automation and manual assistive technology review.
- NOT RUN — live Supabase schema/RLS/grants/function/migration history audit.
- NOT RUN — Discord OAuth round-trip and live redirect allowlist check.
- NOT RUN — production deploy; no deployment attempted.

## Important limitations
Forum topics, member data, search results, profiles, moderation and account authentication are scaffolds and do not query Supabase yet. The existing Supabase project was not changed. OAuth remains disabled until exact live redirect configuration is checked. The hero uses an external 4K Minecraft forest image with a cache-busting query string; the image is not stored in the repository. The production domain remains untouched.

## Next batches
1. Review actual rendered layout in a browser and add responsive screenshots.
2. Read-only audit of legacy Supabase migrations and current Auth URL settings.
3. Connect read-only forum/category/member queries using verified schema and RLS.
4. Configure and test OAuth on approved redirect URLs.
5. Complete release checklist and Apache preview smoke tests before any separate production approval.
