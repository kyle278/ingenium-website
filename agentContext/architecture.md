# Global Architecture

## Portal-managed Blog

- `/blog` and its article, archive, search, preview and RSS routes consume Portal Blog v1 through `lib/blog/client.ts`. Server-rendered articles and metadata use the same immutable revision. Website credentials are site-scoped server-only Blog credentials; no Portal service-role/encryption/storage key is installed here.
- `app/api/ingenium/blog` verifies signed refresh identities against the current durable Portal generation. Portal independently probes actual live HTML. Dynamic no-store reads avoid stale activation pointers; backend outages return 503. Static/offline delivery is outside this adapter.
- Blog owns its path namespace before generic managed SEO redirects. Existing managed SEO routing/schema integration is preserved for other routes. Public site sitemap/RSS include current eligible articles; preview sessions use single-use exchange, HttpOnly cookies and private/noindex/no-store output, and optional analytics skips previews.
- The reference Portal site is `13f9d31e-022c-4fd6-83bb-39cd1a51a85e`. Maintain the actual API and signing contract in Portal `website-setup/blog-portal-integration.md` and use `$websiteconnect-blog` for new client installations.


## Runtime Layers
- Client layer: React components in `app/(website)` for page rendering, multi-step intake UX, and consent handling.
- Tracking script layer: `ingenium-tracker.js` loaded at runtime from Portal app and initialized in root layout.
- Server/API layer: Next.js route handlers in `app/api` for site content only; standard Portal form submission no longer uses local proxy routes.
- Data layer: Portal-managed tracking and form ingestion endpoints hosted at `https://portal.ingeniumconsulting.net`.
- Project proof data layer: Portal-managed published project feed hosted at `https://portal.ingeniumconsulting.net/api/websites/projects`.

## Integration Boundary
- Browser tracking events post directly to `https://portal.ingeniumconsulting.net/api/websites/tracking/events`.
- Standard lead forms submit directly to `https://portal.ingeniumconsulting.net/api/websites/forms/submit` through the hosted tracker.
- Published project reads resolve through `https://portal.ingeniumconsulting.net/api/websites/projects?site_id=...`.
- The frontend identifies forms by canonical slug via `data-form-slug`.
- Canonical linkage IDs (`visitor_id`, `session_id`, `site_id`) are injected by the hosted tracker into the real form DOM before submit.
- Attribution, persistence in `website_form_submissions`, and downstream CRM linkage occur in Portal, not in website runtime.

## Change Impact Map
- Public marketing route copy, metadata, nav, and footer now carry a platform-first narrative modeled on unified-system selling patterns.
- Named client proof now lives in the `/projects` library and the `/case-studies` route, with shared structured-data support and static sitemap/robots generation in the App Router layer.
- The `/projects` list, `/projects/[slug]` detail pages, and sitemap entries now depend on the portal-backed project feed rather than the old static in-code project library.
- Form UX changes impact conversion flow, consent capture, and visible success/error states.
- Tracking runtime changes impact event completeness, unique visitor/session quality, and Website > Reports form metrics.
- The editable `PORTAL_SITE_ID` constant impacts runtime form resolution and tracking destination accuracy.

## Production Website editor release — 24 October 2026
Website editor and the Ingenium CMS adapter are now deployed and verified. The active public release is generation 3, 94cf8d76-ff57-49b2-bfcd-a76651ff397e, restoring the original production content. The production editor reports Connected and Live website verified. Acceptance covered drafts/reload/isolation, inline text, images/uploads, sections, publish/restore, 13 editor tests, 58 website tests and parity on 19 pages. Staging protection was restored and the temporary share link revoked.
IMPORTANT FOR FUTURE DEPLOYS: implementation source is isolated from unrelated local development changes. The Portal source branch is website-editor-release in C:/Users/kyler/.codex/worktrees/website-editor/ingeniumportal. The complete website source is C:/Users/kyler/Desktop/Projects/ingenium-website-editor-release. Merge/use those updated sources before deploying this original checkout, or a deployment may remove the editor integration. Full rollout/rollback evidence: the Portal release checkout's docs/website-editor-release-2026-10-24.md. The maintained websiteconnect-editor skill and website-setup/website-editor-integration.md define the connection contract.
