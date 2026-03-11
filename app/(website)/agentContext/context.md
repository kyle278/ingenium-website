# Website Area Context

## Scope
Website route group `app/(website)` handles public page rendering, client-side event tracking instrumentation, and contact intake UX.

## Current Task Relevance
- Shared shell and visible route IA now position Ingenium as a unified revenue platform and implementation partner.
- Contact page must resolve the active Portal form UUID before rendering the client form.
- Contact form in `app/(website)/contact/ContactForm.tsx` must submit to internal API with the canonical Portal form UUID and slug.
- Tracking context (UTM, CID, visitor/session/site IDs, landing URL, submission URL, referrer) is captured in browser and included with submit payload.
- Global tracker runtime must load from Portal app and post events to Portal tracking ingestion endpoint.
- Shared top navigation now routes Login and Sign Up to the Portal app on desktop and mobile.

## Guardrails
- Preserve current two-step form progression and validation gates.
- Keep browser code free of privileged credentials.
- Submit all entered fields, not a reduced subset, and include canonical linkage IDs.
- Ensure the rendered form uses `data-form-id="<portal form uuid>"`, not a DOM id fallback.
- Ensure page-scoped form-view and scroll-depth state resets on route changes.
- Keep visible route hierarchy focused; lower-priority pages can remain in the repo but should not dilute the main buyer journey.
- Keep static route copy free of encoding artifacts; normalize punctuation if corrupted characters appear.
