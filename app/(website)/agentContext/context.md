# Website Area Context

## Scope
Website route group `app/(website)` handles public page rendering, client-side event tracking instrumentation, and contact intake UX.

## Current Task Relevance
- Contact form in `app/(website)/contact/ContactForm.tsx` must submit to internal API.
- Tracking context (UTM, CID, visitor/session/site IDs, submission URL, referrer) is captured in browser and included with submit payload.
- Global tracker runtime must load from Portal app and post events to Portal tracking ingestion endpoint.

## Guardrails
- Preserve current two-step form progression and validation gates.
- Keep browser code free of privileged credentials.
- Submit all entered fields, not a reduced subset, and include canonical linkage IDs.
- Ensure custom tracked events are flushed immediately after `track(...)`.
- Keep static route copy free of encoding artifacts; normalize punctuation if corrupted characters appear.
