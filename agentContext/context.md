# Global Context

## Portal-managed Blog

- `/blog` and its article, archive, search, preview and RSS routes consume Portal Blog v1 through `lib/blog/client.ts`. Server-rendered articles and metadata use the same immutable revision. Website credentials are site-scoped server-only Blog credentials; no Portal service-role/encryption/storage key is installed here.
- `app/api/ingenium/blog` verifies signed refresh identities against the current durable Portal generation. Portal independently probes actual live HTML. Dynamic no-store reads avoid stale activation pointers; backend outages return 503. Static/offline delivery is outside this adapter.
- Blog owns its path namespace before generic managed SEO redirects. Existing managed SEO routing/schema integration is preserved for other routes. Public site sitemap/RSS include current eligible articles; preview sessions use single-use exchange, HttpOnly cookies and private/noindex/no-store output, and optional analytics skips previews.
- The reference Portal site is `13f9d31e-022c-4fd6-83bb-39cd1a51a85e`. Maintain the actual API and signing contract in Portal `website-setup/blog-portal-integration.md` and use `$websiteconnect-blog` for new client installations.


## System Purpose
Ingenium website is a Next.js App Router project that sells Ingenium as a unified revenue platform and implementation partner, guarantees durable anonymous analytics identity for Portal reporting, and submits contact intake data into Ingenium Portal through a server-owned integration path.

## Active Domains
- Marketing website pages under `app/(website)`
- Browser tracking runtime via Ingenium tracker script loaded from Portal app
- Browser event ingestion to `${PORTAL_APP_URL}/api/websites/tracking/events`
- Portal-backed published project feed from `${PORTAL_APP_URL}/api/websites/projects`
- Portal submission API under `app/api/portal`
- Portal-backed Supabase data model for form submissions
- Portal auth entrypoints exposed from website navigation via `${PORTAL_APP_URL}/login` and `${PORTAL_APP_URL}/signup`

## Guardrails
- Do not expose service-role Supabase keys in client code.
- Keep browser event tracking delivery pointed to Portal tracking ingestion endpoint.
- Use canonical tracking/linkage IDs consistently: `visitor_id`, `session_id`, `site_id`.
- Use canonical ownership IDs consistently: `organisation_id`, `site_id`, `form_id`.
- Keep contact form UX stable while evolving backend integration.
- Keep canonical tracking payload keys (`utm_*`, `cid`, `submission_url`, `visitor_id`, `session_id`, `site_id`) consistent.
- Keep marketing copy encoding clean and ASCII-safe where possible to prevent mojibake in production UI.
- Do not fall back to DOM ids or slugs as the primary form reporting key when a Portal form UUID is unavailable.

## Current Operational Assumptions
- Tracker script initializes from `PORTAL_APP_URL` and `PORTAL_SITE_ID` passed server-side into the root client bootstrap.
- Website shell auth links and tracker bootstrap both read Portal host configuration through the shared config module rather than direct env access in scattered files.
- Website runtime owns `visitor_id` cookie + `localStorage` sync and `session_id` rotation via `sessionStorage`.
- Browser tracking runtime emits `session_start`, `page_view`, `form_view`, and `scroll_depth` using canonical payload shape and page-scoped resets.
- Public IA now prioritizes platform, acquisition, CRM, AI agents, automation, security, proof, and contact over secondary brochure-style pages.
- Public proof surfaces now use named client work sourced from sibling project folders instead of anonymous placeholder brands.
- The `/projects` library now reads published project records from Ingenium Portal using the configured `PORTAL_SITE_ID`, while older static proof data remains in-repo only for legacy case-study mappings and redirects.
- Portal form definitions are stored in `public.website_forms`.
- Submissions are written to `public.website_form_submissions`.
- Portal-side trigger handles downstream CRM attribution logic and event processing.
- Contact page resolves the active Portal form by slug and fails explicitly when the canonical Portal form UUID is unavailable.

## Production Website editor release — 24 October 2026
Website editor and the Ingenium CMS adapter are now deployed and verified. The active public release is generation 3, 94cf8d76-ff57-49b2-bfcd-a76651ff397e, restoring the original production content. The production editor reports Connected and Live website verified. Acceptance covered drafts/reload/isolation, inline text, images/uploads, sections, publish/restore, 13 editor tests, 58 website tests and parity on 19 pages. Staging protection was restored and the temporary share link revoked.
IMPORTANT FOR FUTURE DEPLOYS: implementation source is isolated from unrelated local development changes. The Portal source branch is website-editor-release in C:/Users/kyler/.codex/worktrees/website-editor/ingeniumportal. The complete website source is C:/Users/kyler/Desktop/Projects/ingenium-website-editor-release. Merge/use those updated sources before deploying this original checkout, or a deployment may remove the editor integration. Full rollout/rollback evidence: the Portal release checkout's docs/website-editor-release-2026-10-24.md. The maintained websiteconnect-editor skill and website-setup/website-editor-integration.md define the connection contract.
