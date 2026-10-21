# NaZerak Site 2.0 — status log

Updated: 2026-10-21

## Checkpoint
- Created feature branch work/first-working-version.
- Added static frontend shell, responsive styles, route rendering and Apache clean-route rewrites.
- Added home, forum categories, members, search, cabinet, reports, topic, user profile, privacy and 404 states.
- Added mobile navigation, Escape handling, copy-IP interaction, focus states and reduced-motion support.
- Documented Supabase/Discord constraints and migration guardrails.
- Existing Supabase project untouched; no production deploy or database write attempted.
- Existing autumn hero image reused by referencing legacy production asset; no new background generated.

## Not verified yet
- Browser-based tests and responsive screenshots.
- Apache rewrites on REG.RU.
- Production asset access from new preview environment.
- Live Supabase URL configuration and Discord OAuth redirect allowlist.
- Live schema, RLS, grants, functions and migration history.
- Real forum/member/profile queries and OAuth.
- Accessibility automation, final security scan and deployment workflow.
- Production deploy remains unapproved and not attempted.

## Next batches
1. Run static and browser QA; fix actual defects.
2. Read-only audit of legacy migrations and live Supabase metadata/settings.
3. Connect read-only forum/category/member flows to verified schema and RLS.
4. Configure/test exact OAuth URLs against existing project.
5. Final release gate, rollback plan and explicit approval before production publication.
