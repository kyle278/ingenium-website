# Website Area Context

## Portal-managed Blog

- `/blog` and its article, archive, search, preview and RSS routes consume Portal Blog v1 through `lib/blog/client.ts`. Server-rendered articles and metadata use the same immutable revision. Website credentials are site-scoped server-only Blog credentials; no Portal service-role/encryption/storage key is installed here.
- `app/api/ingenium/blog` verifies signed refresh identities against the current durable Portal generation. Portal independently probes actual live HTML. Dynamic no-store reads avoid stale activation pointers; backend outages return 503. Static/offline delivery is outside this adapter.
- Blog owns its path namespace before generic managed SEO redirects. Existing managed SEO routing/schema integration is preserved for other routes. Public site sitemap/RSS include current eligible articles; preview sessions use single-use exchange, HttpOnly cookies and private/noindex/no-store output, and optional analytics skips previews.
- The reference Portal site is `13f9d31e-022c-4fd6-83bb-39cd1a51a85e`. Maintain the actual API and signing contract in Portal `website-setup/blog-portal-integration.md` and use `$websiteconnect-blog` for new client installations.


## Scope
Website route group `app/(website)` handles public page rendering, client-side event tracking instrumentation, and contact intake UX.

## Current Task Relevance
- Shared shell and visible route IA now position Ingenium as a unified revenue platform and implementation partner.
- Contact and website brief forms must remain real Portal-managed HTML forms identified by canonical slug.
- Tracking context (UTM, CID, visitor/session/site IDs, submission URL) is injected by the hosted tracker into the form DOM.
- Global tracker runtime must load from Portal and post events to the production tracking ingestion endpoint.
- Shared top navigation now routes Login and Sign Up to the Portal app on desktop and mobile.

## Guardrails
- Preserve multi-step progression and validation gates while keeping earlier inputs mounted through final submit.
- Keep browser code free of privileged credentials.
- Submit all entered fields, not a reduced subset, and include canonical linkage IDs plus explicit consent fields.
- Ensure the rendered form uses `data-ingenium-submit="portal"` and `data-form-slug`, not a website-owned submit route.
- Keep visible route hierarchy focused; lower-priority pages can remain in the repo but should not dilute the main buyer journey.
- Keep static route copy free of encoding artifacts; normalize punctuation if corrupted characters appear.
