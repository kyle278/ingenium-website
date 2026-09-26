# Launch readiness audit: tracking, forms and attribution

Reviewed 26 September 2026. Read-only source inspection of the current working tree, its sibling marketing repository, integration documentation, public `/demo` HTML and the public hosted tracker. No `.env` files, private account configuration or databases inspected; no forms submitted and no production records created by this audit. Ordinary page views may be logged by existing scripts. No code changes made. Suggested acceptance tests below are **not executed** and should run on an isolated staging tenant with outbound notifications disabled.

Paths beginning `../ingenium-website/` refer to `C:/Users/kyler/Desktop/Projects/ingenium-website/`. Others are relative to `C:/Users/kyler/Desktop/Projects/ingeniumportal/`. Line references are to the inspected working tree; deployment parity is not assumed. Public tracker retrieval confirmed the same relevant storage, UTM, submit and initialisation statements at the cited line numbers.

## Decision

Do not optimise paid spend against browser form attempts or generic confirmation-page visits. First establish one authoritative accepted-submission conversion, durable attribution, consent-aware analytics that does not disable the enquiry form, and idempotent form delivery. The native lead capture code exists; successful deployed CRM linkage, notifications and measurement still require a controlled end-to-end test.

## Findings and exact acceptance tests

### T1 — Campaign fields disappear after internal navigation

**Priority: P0 before paid acquisition. Confidence: high for source behavior; live submission payload unverified.**

`public/ingenium-tracker.js:94` reads query parameters from the current URL; `:662` builds form tracking context from that reader, and `:696` overwrites hidden UTM fields with empty values when absent. The submit API falls back to submission/source URL parameters (`app/api/websites/forms/submit/route.ts:336`) rather than a stored first-touch context. Reports group by the submission's UTM columns (`app/api/websites/reports/route.ts:606`).

Root browser inspection: opened the homepage with `?utm_source=launch_audit&utm_medium=qa&utm_campaign=prelaunch_check`, clicked the visible Book a Demo link, then inspected `/demo`; hidden UTM attributes appeared empty. A direct tagged `/demo` visit showed the same, so this DOM observation is inconclusive: input value properties can differ from HTML attributes, and submit refreshes tracking fields. No submission payload was captured. The inspected source still reads the current URL at submission, making cross-navigation attribution loss a concrete code-level issue to verify end to end. Backend session identity joins may preserve information in event history; total attribution loss is not established.

**Fix:** persist consent-appropriate first and latest campaign touch, landing URL and click IDs independently of the current URL, with explicit attribution window and overwrite rules. Keep submission URL distinct from landing URL. Populate server attribution from the approved context; do not label the submission page `landing_url` as the current metadata builder does (`forms/submit/route.ts:178`).

**Acceptance:** staging visit with five UTMs and campaign ID → navigate two internal routes → submit approved synthetic lead → all expected attribution fields survive in submission and CRM touch; landing URL remains initial entry and submission URL is final form. A later direct visit must follow a documented last-non-direct policy. A new campaign must update latest touch without replacing first touch. Denied-consent behavior must match the separately agreed measurement policy.

### T2 — Tracker starts persistent identification immediately and has no withdrawal API

**Priority: P0 readiness gate. Confidence: high for source; production consent configuration unverified.**

Tracker writes a visitor ID to localStorage (`public/ingenium-tracker.js:144`), writes sessionStorage (`:173`) and starts session/page tracking immediately (`:878`). Its public API (`:902` onward) has no stop/withdraw/clear-consent method. The marketing wrapper calls `init` without a consent check (`../ingenium-website/app/components/IngeniumTracking.tsx:13`). The root layout starts GTM `beforeInteractive` (`../ingenium-website/app/layout.tsx:90`).

Public `/demo` HTML includes GTM-KWCQSXC7 and the Portal tracker. Root browser additionally observed GA tag G-NQ1RH94GDN loaded and hidden visitor/session IDs. No cookie UI was visible in that browser state; it was not established to be a clean consent profile. GTM's private container configuration and actual consent-mode behavior were not inspected, so this is not a complete finding about every production tag or a legal determination.

**Fix:** implement the chosen consent policy before tracker initialisation, support withdrawal that stops timers/listeners and clears identifiers as appropriate, and configure tags consistently. Crucially split essential form delivery from optional analytics: simply blocking this tracker also blocks the current form's transport (T3).

**Acceptance:** fresh-profile staging visit, before interaction: no nonessential visitor storage or analytics requests under the adopted policy; reject leaves enquiry submission usable; accept starts one tracker; withdraw stops further tracking and removes applicable identifiers; reload respects the stored choice. Verify browser network requests and storage, plus GTM preview consent states, rather than banner appearance alone.

### T3 — Enquiry delivery depends on the analytics script loading

**Priority: P0 lead-capture resilience. Confidence: high source; blocked-script scenario not run live.**

ContactForm renders a `method="post"` form without its own action/transport (`../ingenium-website/app/(website)/contact/ContactForm.tsx:222`). It relies on tracker DOM events for submission state and success (`:136`). The tracker intercepts forms only once loaded (`public/ingenium-tracker.js:727` onward). With the script blocked, the form has no demonstrated independent submission path. A naive consent block would reproduce this dependency.

**Fix:** give the contact form an independent submission transport/server action and add optional tracking context when available. Provide explicit timeout/retry/error behavior with a usable contact fallback. Avoid binding two competing submit handlers.

**Acceptance:** block the hosted tracker URL and all analytics domains on staging; complete the form; exactly one request reaches the forms endpoint, one submission is saved, and the user sees a verified success or actionable error. Repeat with analytics consent rejected and slow script loading. The submit button must never remain indefinitely stuck.

### T4 — Submit attempts and accepted leads have different meanings

**Priority: P0 conversion definition. Confidence: high.**

`public/ingenium-tracker.js:710` logs `form_submit` before the API request and before the duplicate-click guard (`:735`). A failed request can therefore produce that event; repeated attempts can produce multiple events. The success path dispatches a DOM `ingenium:form-success` event (`:753`) but does not itself send a durable accepted-lead analytics event keyed by submission ID.

Important positive distinction: Portal reports count stored submission rows (`app/api/websites/reports/route.ts:579` and `:636`), not browser `form_submit` attempts. Do not claim this dashboard is currently counting attempts. Private GA/GTM conversion configuration was not accessible. ContactForm's success redirect (`ContactForm.tsx:116`) is not, by itself, proof that ad-platform conversions are deduplicated or tied to accepted records.

**Fix:** name browser event `form_submit_attempt`; emit authoritative `lead_received` only after accepted persistence, carrying submission ID and lane/intent, excluding personal information. Use the same ID for downstream deduplication. Keep qualified opportunity and won revenue as separate CRM lifecycle events.

**Acceptance:** validation failure, HTTP 500, network timeout and double-click generate zero accepted-lead conversions; one successful submission produces one conversion; refresh/direct visit of confirmation URL produces zero new lead conversions. Verify each intended analytics destination and dashboard reconciles by the same submission ID.

### T5 — Honeypot rejection currently follows the generic success path

**Priority: P1 measurement hygiene. Confidence: high.**

Forms API returns HTTP 202 with `accepted:false` for a filled honeypot (`app/api/websites/forms/submit/route.ts:234`). Tracker checks only `response.ok` (`public/ingenium-tracker.js:649`) and then dispatches success. ContactForm reacts to success by redirecting without checking the response body (`ContactForm.tsx:150`). The server honeypot test exists (`__tests__/api/websites-forms-submit.test.ts:109`), but that does not verify the browser's success/conversion behavior.

**Fix:** retain any deliberate neutral response to suspected bots while withholding accepted-lead conversion and submission ID. Require actual `submission_id`/accepted status for success metrics. Do not expose a detailed anti-spam rule in public UI.

**Acceptance:** filled honeypot produces no stored submission, no CRM record, no accepted-lead conversion and no notification; legitimate empty honeypot produces exactly one of each required artifact. Test browser plus backend together.

### T6 — Form delivery has no request-level idempotency

**Priority: P0 before scaling lead volume. Confidence: high source.**

The form payload has no stable attempt/submission key (`public/ingenium-tracker.js:615`). The API unconditionally inserts (`app/api/websites/forms/submit/route.ts:384`). Journey events use an idempotency key derived from the newly inserted ID (`:489`), which cannot deduplicate two inserts caused by retrying the same original request. CRM email matching may avoid duplicate people but does not automatically avoid duplicate submissions, notifications or touches.

Positive distinction: interaction events already upsert by `site_id,client_event_id` (`app/api/websites/tracking/events/route.ts:470`). That protection is separate from form idempotency, and database deployment of its required unique index was not inspected.

**Fix:** stable client request ID retained across retry, scoped server unique constraint, transactional persistence and idempotent downstream notification/journey work; return the original accepted submission ID on replay.

**Acceptance:** simulate a committed write with a lost HTTP response; retry identical key twice, including concurrently. Exactly one submission, one accepted-lead conversion and one notification result. Reusing the key with a different payload must return a clear conflict rather than silently corrupting the original; a genuinely new enquiry gets a new key.

### T7 — API success does not prove CRM sync or notification delivery

**Priority: P0 operational handoff test; P1 monitoring implementation. Confidence: high.**

Forms route records notification results into metadata (`app/api/websites/forms/submit/route.ts:417`) and catches CRM sync failures into `crm_mapping_sync_error` (`:445`). It still returns 201 (`:496`). This is sensible for not losing the original enquiry but means a front-end success cannot establish the promised native sales handoff. Journey ingestion failures are also swallowed (`:491`).

**Fix:** show separate received, CRM-linked, owner-assigned and notification-delivered operational states; alert on queued failures and provide idempotent replay. Define an owner and recovery SLA. Do not force users to resubmit a successfully saved enquiry to recover an internal notification failure.

**Acceptance:** force CRM mapping failure and email failure independently in staging: lead remains saved, user sees receipt, operations alert appears, retry links the original submission and sends once after recovery. Normal demo verifies correct organisation, site/form, person, pipeline/owner and campaign, with timestamped evidence.

### T8 — Public intake controls need deployment verification

**Priority: P1 data quality/security control. Confidence: high defaults; deployed state unknown.**

Both public routes read `WEBSITE_TRACKING_ENFORCE_ORIGIN` with a default of false (`forms/submit/route.ts:265`; `tracking/events/route.ts:397`). Shared validation accepts no Origin header and missing site-domain configuration (`lib/websites/public-ingest.ts:45`). No rate limit or CAPTCHA verification appears in these handlers. Origin filtering is not authentication; a server client can spoof it. No adversarial production requests were sent.

**Fix:** verify intentional production origin settings, explicit permitted domains, server-side schema validation and appropriate rate/spam controls; record filtered spam outside the business conversion metric. Establish a controlled server-to-server path where missing Origin is legitimate. Do not treat enabling one environment flag as complete abuse prevention.

**Acceptance:** staging approved domain succeeds; unapproved browser origin and malformed form payload fail; configured request threshold yields 429 without new leads; legitimate retries still work via idempotency. Verify expected behavior for approved server calls and inactive tenant/form states.

### T9 — Session ID is carried per event but ignored by ingestion

**Priority: P1 analytic accuracy. Confidence: high source; practical incidence unmeasured.**

Tracker event objects contain `session_id` (`public/ingenium-tracker.js:241`). Batch creation obtains the current session (`:358`). API normalisation drops per-event session ID (`app/api/websites/tracking/events/route.ts:65`), then writes the top-level session to every event (`:454`). A queued batch spanning expiry can therefore relabel older events into a newer session.

**Fix:** group queued events by session or validate/honour each event's session; define behavior for mixed-session payloads. Maintain visitor identity in memory if storage is unavailable to avoid new IDs on every call.

**Acceptance:** queue events, advance clock beyond 30 minutes, enqueue a new-session event, then flush; stored old/new events retain correct sessions and entry pages. Disable local/session storage and verify stable identity within the in-memory page lifecycle without an endless sequence of new sessions.

### T10 — Raw URL/query capture needs an allowlist

**Priority: P1 privacy/data cleanliness. Confidence: high mechanism; actual sensitive URL traffic unverified.**

Tracker stores full `window.location.href`, query-bearing paths and referrer (`public/ingenium-tracker.js:52`, `:71`, `:675`). Server copies raw event properties and URL values (`tracking/events/route.ts:94`, `:159`). If a customer arrives on a URL containing an email, token or other sensitive query parameter, this capture mechanism can retain it. No evidence is claimed that such data is already stored.

**Fix:** allowlist campaign parameters, strip fragments and sensitive query values, and restrict event-property schemas. Keep useful campaign reporting fields explicit instead of retaining arbitrary URLs indefinitely.

**Acceptance:** staging URL with synthetic `email`, `token` and allowed UTM parameters sends no excluded values to network payloads or logs while retaining approved campaign attribution; SPA navigation receives the same treatment.

### T11 — Tracker does not respect the form's prevented submission

**Priority: P0 form validation correctness. Confidence: high source-level interaction; staging reproduction required.**

ContactForm's React capture handler calls `event.preventDefault()` when privacy acknowledgement is absent (`../ingenium-website/app/(website)/contact/ContactForm.tsx:177`). The hosted tracker's native submit listener never checks `event.defaultPrevented` before issuing its own fetch (`public/ingenium-tracker.js:708`). `ConsentCardField` accepts a `required` prop but uses it only to show an asterisk; the checkbox itself has no HTML `required` attribute (`../ingenium-website/app/(website)/components/ConsentCardField.tsx:30`). The final submit button is disabled only while submitting (`ContactForm.tsx:463`). Thus prevention of the default browser action does not necessarily prevent the separate tracker fetch; the current two-handler design can bypass the intended client validation. The public API also does not enforce a form-specific privacy field requirement in the inspected handler.

**Fix:** one owner for submit transport and validation; respect cancelled events if the generic tracker remains involved; implement appropriate schema-level validation server-side and map required controls to actual browser constraints. Keep optional marketing consent genuinely optional.

**Acceptance:** staging final step with all mandatory contact fields but privacy unchecked: zero form API requests, no row, visible validation message. Check privacy: exactly one accepted submission. Marketing unchecked still allows the requested enquiry and remains false in persisted data. Repeat keyboard submission and programmatic `requestSubmit()`; verify the server rejects payloads that violate the configured form requirements.

## Documentation and observed positives

The onboarding contract explicitly requires end-to-end form, event and reporting verification (`website-setup/client-onboarding/ANALYTICS_AND_FORMS_INTEGRATION.md:94`). The inspected documentation does not substitute for execution evidence and does not document a consent lifecycle, attribution persistence or form idempotency contract. Update it alongside fixes so future websites do not replicate these gaps.

Source does include active site/form checks, organisation work checks, honeypot rejection, event IDs, stored submission counting, CRM sync invocation and captured form consent fields. Marketing consent is a separate unchecked control in the current contact UI (`ContactForm.tsx:70`, `:244`). Continue buttons only update local React steps (`:85` and `:94`) and are `type="button"`; they are not lead submissions.

No complete bridge from those form consent fields into `marketing_consent_events` was established in the reviewed submission/sync code. Treat newsletter/journey eligibility as an additional test requirement rather than assuming a captured boolean governs all sends: marketing unchecked must permit the requested response but exclude any marketing-only sequence; revocation must apply before the next send. This audit did not inspect private automation setup or send any email.

## Release evidence to attach before campaigns scale

Record deployed build/version, approved site/form identifiers, browser consent/network trace, tagged-navigation payload, one staging accepted submission ID, CRM link/owner, notification outcome, duplicate retry result, and reconciled conversion count. Verify GA/GTM/ads conversion mappings inside their actual accounts; public script IDs alone establish presence, not correct configuration. Exclude audit/test traffic from campaign performance. Re-test supported mobile browser and ad-blocked/consent-denied paths before making the native-connected lead handoff the central campaign promise.
