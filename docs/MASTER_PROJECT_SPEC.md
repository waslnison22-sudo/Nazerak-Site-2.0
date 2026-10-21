# NaZerak Site 2.0 — Master Project Specification

## Purpose
Rebuild the NaZerak website while preserving the existing Supabase project, identities, user data, forum data, roles, and Discord authentication. This document records intent; it is not proof that each listed database object or provider setting exists live. Verify before implementation.

## Project identity
- Production: https://nazerak.ru/
- Legacy repo: https://github.com/waslnison22-sudo/NazerakSites
- New repo: https://github.com/waslnison22-sudo/Nazerak-Site-2.0
- Minecraft: 1.21.11; server: nazehard.rustix.cc
- Discord: https://discord.gg/2KvsYYDHN6
- Existing Supabase project ref: ujlbyzvdsncvqbrhasuw
- Existing Supabase URL: https://ujlbyzvdsncvqbrhasuw.supabase.co

Never create a second Supabase project for convenience. Never reset or destructively migrate the existing database. Never commit secrets, provider tokens, OAuth codes, service-role keys, sb_secret keys, or Discord client secret.

## Design
Premium restrained dark UI, not a SaaS dashboard, admin panel, Discord clone, cyberpunk/neon/RGB theme, or overloaded game HUD.
- Backgrounds: #07070A, #0B0D11, #101217, #151820
- Text: #F5F5F7; secondary: #A8AAB3 and #777A84
- Accent: #FF2942 and #FF5F74
- Main panels radius 20–28 px; controls 10–18 px
- Motion generally 200–350 ms; honor prefers-reduced-motion
- Responsive widths: 320, 360, 390, 768, 1024, 1440, 1920 px
- Preserve assets/images/nazerak-autumn-hero.webp from the legacy repo. Do not replace it with a newly generated background.

## Hosting and stack
Production is documented as static Apache/REG.RU with GitHub Actions SFTP deploy. Historical host: server25.hosting.reg.ru, IP 31.31.196.3, root /www/nazerak.ru/; verify before using. Production server should not require Node.js unless current provider evidence proves otherwise. Evaluate a framework only if it provides measurable benefit. Do not deploy this branch or change DNS without explicit release approval.

## Routes
/, /forum, /forum/:slug, /forum/topic/:id, /members, /search, /user/:id, /forum/reports, /cabinet, /launcher/manifest.json. Inspect old aliases such as forum.html, forum-category.html, topic.html, cabinet.html and .htaccess. Test direct refresh, query parameters, back/forward and 404.

## Supabase and Discord OAuth
Existing project: ujlbyzvdsncvqbrhasuw. The legacy auth-config.js has a browser key intended to be public/publishable; inspect key type without copying its value into logs. Never expose service_role, sb_secret, Discord client secret, access/refresh tokens, or OAuth codes.
Documented Supabase Discord callback: https://ujlbyzvdsncvqbrhasuw.supabase.co/auth/v1/callback.
Historical Site URL: https://nazerak.ru/. Historical redirect allowlist includes https://nazerak.ru/cabinet.html, https://nazerak.ru/cabinet, http://localhost:8000/cabinet.html, http://localhost:8000/cabinet. These are historical, not confirmed live settings. Check current Supabase Auth URL config and Discord Developer Portal before OAuth tests. Use PKCE, one Supabase client, persistent session/refresh, and one auth-state listener. Never transfer OAuth codes/tokens between origins. A legacy GitHub Pages callback containing ?code= must discard callback data and ask the user to restart login on the official domain.

## Data model inventory to verify
Potential tables found or inferred from legacy migrations: auth.users, auth.identities, public.profiles, public.media_applications, public.forum_categories, public.forum_authors, public.forum_topics, public.forum_posts, public.forum_roles, public.forum_user_roles, private.forum_discord_role_bindings, public.forum_post_reactions, public.forum_topic_bookmarks, public.forum_topic_watchers, public.forum_reports, public.forum_notifications.
Potential views: forum_topic_list, forum_topic_detail, forum_node_directory, forum_my_permissions, forum_post_reaction_summary, forum_community_stats, forum_author_directory.
Known migration function: public.forum_my_public_id(). Verify actual table/view/function names, signatures, grants, owners, RLS policies, security-definer search_path, execute privileges and migration history against live database.

Historical role slugs: administrator, project-management, developer, moderator, curator, governor, government, court, media, verified, player. Example permissions: moderate_forum, manage_roles, manage_categories, publish_official. Database-side permissions are authoritative. Never trust client metadata, URL parameters, localStorage or hidden controls for authorization.

## Product and migration risks
- Migration notes mention area_slug=rp/administration while docs describe one unified six-root-category hierarchy. Resolve from live data before changes.
- Root categories: Информация и правила; Государство и организации; Игровой мир; Обращения и поддержка; Проект и развитие; Сообщество.
- Government, Court, Prosecutor's Office, FSB, Military Base and organizations belong under Государство и организации.
- Older schema contains profiles.minecraft_username, but current product intent says Minecraft binding belongs in NaZerak Launcher. Do not add a web form without approval.
- media_applications intake was disabled pending moderation process. Do not expose browser insert grants without review.
- A historical migration contains DELETE FROM public.forum_topics. Never replay old migrations blindly.
- Verify whether supabase/migrations/20261018193000_forum_my_public_id.sql is applied. Git push does not apply migrations.
- Inspect security_invoker views, RLS, grants, security-definer search_path and execute privileges.

## Required product behavior
Home: project intro, server IP copy with feedback, Discord/forum links; no invented player counts, uptime, download links or status. Preserve selected autumn hero.
Forum: six-category hierarchy, verified schema queries, search/pagination, loading/empty/error/retry, authorized topic/post/reaction/bookmark/watch actions. No invented starter posts.
Members/profiles: only explicitly public fields; no email, tokens, moderation notes or private metadata. No website Minecraft bind form unless approved.
Cabinet: signed-in/out/loading/error states, exact approved OAuth callback, no token logging, one client/listener; test login, callback, refresh, expiry and sign-out.
Moderation: enforce permissions at database/server for every operation; hiding a button is not authorization.
Launcher: preserve /launcher/manifest.json contract after inspecting current consumers; never fabricate downloads.

## QA and release gates
Record each check PASS / FAIL / NOT RUN / BLOCKED / NOT APPLICABLE.
1. Static source/config audit, lint/typecheck/build according to actual stack.
2. Route tests and direct refresh for all required routes.
3. Browser tests at 320, 360, 390, 768, 1024, 1440, 1920 px.
4. Keyboard navigation, visible focus, labels, reduced motion, contrast, zoom.
5. Console/network errors, broken assets, loading/error recovery.
6. Auth flow and session persistence only after redirect config verification.
7. Negative RLS tests for anonymous, regular, moderator and admin roles.
8. SEO titles/descriptions/canonical/robots/sitemap/404/redirects.
9. Secret/dependency scan and final diff review.
10. Production artifact path, Apache rewrites, rollback and post-deploy smoke checks.

A static build does not prove OAuth or RLS correctness. Mocked tests do not prove live integration. Never deploy, change DNS, mutate production data or rotate credentials without explicit approval.

## First-version definition of done
Home renders responsively; navigation works by keyboard and on mobile; clean routes resolve on Apache; IP copy reports result; forum/member/search/profile/moderation/cabinet have honest empty/configuration states until real data is verified; no fake content or secrets; Supabase is untouched; README and status log clearly mark limitations and next steps.
