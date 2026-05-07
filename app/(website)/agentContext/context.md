# Website Area Context

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
