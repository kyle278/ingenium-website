# Website connections — 27 October 2026

Production: https://www.ingeniumconsulting.net. Application commit `61b23b6`, deployment `dpl_7sZEv9zx1YBWa9NxvGYePUYi9RBR` (`ingenium-website-8bcd6mz37-kyle278s-projects.vercel.app`). Canonical source remains `C:/Users/kyler/Desktop/Projects/ingenium-website-rebuild-release-20261027`, branch `form-experience-release-20261027`.

## Identity and ownership

Portal site `13f9d31e-022c-4fd6-83bb-39cd1a51a85e`, organisation `d253b486-faa4-47b9-b10f-67a7c6da3374`, registered domain `www.ingeniumconsulting.net`, lifecycle active. Preserve the existing V1 tracking/form connection deliberately; no second SDK or competing identity was installed. Website submission proxy uses the public ingestion contract, not direct database inserts. Portal owns form records, CRM sync and Blog publication.

## Tracking changes

`lib/portal-page-tracking.ts` adds session starts, navigation page views, visible lead-form views with canonical Portal form UUIDs, scroll milestones and contact/primary CTA clicks. Existing article and accepted-lead events remain. Events carry only controlled properties and query-free URLs; never form answers or contact values. Delivery is serialized because V1 creates a session on its first event. Pending deliveries recheck consent and identity before transmission. Defaults remain off; withdrawal clears attribution/identity and detaches observers. Blog and Website editor previews are excluded. Google Tag Manager remains disabled pending independent container/configuration verification; this release verifies Portal analytics, not GA4.

Live Chromium verification observes no requests while consent is pending or rejected, one session start, page and visible-form events after acceptance, navigation to `/packages`, scroll milestones, successful Portal HTTP 201 responses, matching site/organisation/session database records, and no additional events after withdrawal. Form-view events resolve to the same public Portal form IDs used for submissions.

## Forms

Reconciled all four existing form definitions in Portal, retaining UUIDs, activation and notification settings. Added current fields and privacy/marketing notices; separate first and last names are required. Contact email is conditional because callback requests can be phone-only; website validation enforces phone for callbacks and email for emailed responses/marketing opt-in. Retired `challenge` no longer appears required. Starter CRM first-name mappings now use `first_name` rather than full `name`; added last-name mappings for leads and contacts.

Four clearly labelled synthetic submissions were accepted through the real production `/api/enquiry` → Portal route: a visibility check completed in the real guided UI, a phone-only callback, template access and Starter. All were independently read from the correct site and linked CRM records; separate names, phone when supplied and marketing refusal were verified. Analytics was rejected and no visitor/session identifiers were attached. Synthetic addresses use `example.invalid`; the phone uses the reserved UK fictional range. Test records are labelled `TEST Integration Verification`, with no action requested. No form-notification email was configured on these three tested registrations.

Private brief: current configuration and an existing CRM-linked accepted submission were checked. A new synthetic submission was deliberately not sent because its database trigger creates an actual website-build request and its configured notification emails internally. Its new guided UI and server validation were verified in the preceding form release; this report does not claim a fresh private-brief production submission.

Accepted submission IDs: visibility `70150091-a233-4a7d-95dd-8b0b6e6f8c87`, callback `af9e4434-d731-4bd0-98af-1b3b830261b9`, templates `f64a3fb0-9f4f-42c5-ad92-716fec6be0b8`, Starter `b9ad6209-319f-432b-9114-57576736f227`.

Existing limitations: website replay protection is bounded to a single process; durable cross-instance idempotency requires a Portal contract change. No new backend or database schema was introduced. Form consent strings retain the actual existing V1 adapter contract; do not mix V2 form requirements into V1.

## Blog, editor and SEO

Blog generation 19, latest release `9afa7643-f280-42ca-bd91-c26e7f6adc29`, independently persisted Portal delivery status verified. All seven articles return HTTP 200 with the current immutable revision, server-rendered title/body, canonical and structured data, and appear in sitemap and RSS. All seven cover images respond successfully. Category, author and search return 200; historical article alias returns 308 and an unknown article returns 404. Current/duplicate signed refreshes return 200, older-generation refresh 409 and expired signature 401. No content was published or modified to obtain this evidence. No scheduler/withdrawal lifecycle was rerun; the existing reference installation's lifecycle evidence remains separate.

Website editor generation 5/release `7c303ef2-c11b-497f-8996-afd52d95d080` and published overrides remain intact. Eight legacy public redirects, private editor canvases and publisher probes pass. Signed editor refresh and rejection of unsigned/hostile requests pass. SEO receiver/revision and Blog receivers remain available.

## Validation and rollback

84 tests pass, changed tracking TypeScript ESLint passes, and production Vercel build succeeds. Staged mobile form smoke covered 12 screens, five intercepted request attempts, no page errors, overflow or UI issues. Those UI submissions were intercepted; the four explicit live submissions above are the distinct delivery evidence. Live tracking checks read actual accepted Portal events. Evidence scripts and JSON reports live in the original workspace `.codex-preview/`; bypass cookies are removed after checks.

Previous production before this work: `dpl_9vFNY9iyQrsfgHQ9uLcm1qwF8x4w`, `ingenium-website-3l00ftwgs-kyle278s-projects.vercel.app`. Promoting it rolls back website tracking changes; it does not revert compatible Portal form-definition corrections. A local private form-definition snapshot was saved before those corrections. Do not deploy the dirty original website or Portal working directory wholesale.

The optional legacy Portal projects feed still returns 404; the rebuilt public Results page uses the existing seven explicit client projects and labelled examples. This release does not claim that separate portfolio feed is connected or that GA4/Search Console has been verified.
