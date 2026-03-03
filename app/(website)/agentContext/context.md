# Website Area Context

## Scope
Website route group `app/(website)` handles public page rendering and client-side contact intake UX.

## Current Task Relevance
- Contact form in `app/(website)/contact/ContactForm.tsx` must submit to internal API.
- Tracking context (UTM, CID, submission URL, referrer) is captured in browser and included with submit payload.

## Guardrails
- Preserve current two-step form progression and validation gates.
- Keep browser code free of privileged credentials.
- Submit all entered fields, not a reduced subset.
- Keep static route copy free of encoding artifacts; normalize punctuation if corrupted characters appear.
