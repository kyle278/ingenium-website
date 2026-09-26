# Ingenium website rebuild: engineering tickets and release acceptance

Planning baseline: 26 September 2026. This is an implementation plan, not completed implementation or completed test evidence. It incorporates the [launch readiness audit](LAUNCH-READINESS-AUDIT.md), all T1–T11 findings in [tracking audit](audit-tracking.md), and the public/delivery audits. Product, design and copy decisions belong in the companion rebuild plan; this document turns them into build dependencies and verifiable release conditions.

## 1. Implementation boundary

Keep the existing Next.js marketing site and Portal public form endpoint. Improve their contracts; do not build a new CMS, analytics platform, event bus or separate application merely to launch three offers. Marketing pages should render their essential copy, prices, proof and contact paths without the CRM browser application. The website/CRM connection remains the supported Portal handoff, with external connectors scoped separately.

The marketing repository is `C:/Users/kyler/Desktop/Projects/ingenium-website`. Existing inspected paths are:

| Existing code | Relevant current responsibility |
|---|---|
| `app/layout.tsx` | Fonts, root metadata, GTM bootstrap and Portal tracker component |
| `app/components/IngeniumTracking.tsx` | Hosted tracker loading and immediate initialisation |
| `app/(website)/contact/ContactForm.tsx` | Shared three-step request form used by the demo route |
| `app/(website)/components/ConsentCardField.tsx` | Checkbox UI; current `required` prop only affects displayed asterisk |
| `lib/portalIntegration/public.ts` and `forms.ts` | Public Portal endpoint/site configuration and form slugs |
| `lib/portalIntegration/projects.ts` | Portal project fetch/normalisation; current errors collapse to empty/null |
| `app/(website)/projects/page.tsx` and `projects/[slug]/page.tsx` | Project index/detail and schema |
| `app/(website)/components/ProjectWebsiteEmbed.tsx` | Project iframe preview |
| `app/sitemap.ts`, `app/robots.ts`, `lib/seo.ts` | Discovery routes, crawl rules and metadata |
| `package.json` | Existing scripts: `dev`, `build`, `start`, `lint`; no test script declared in the inspected marketing package |

The Portal repository is `C:/Users/kyler/Desktop/Projects/ingeniumportal`. Existing inspected paths are:

| Existing code | Relevant current responsibility |
|---|---|
| `public/ingenium-tracker.js` | Browser identity, session/event queue and current form transport |
| `app/api/websites/forms/submit/route.ts` | Public submission persistence, notification, CRM sync and journey event |
| `app/api/websites/tracking/events/route.ts` | Public event ingestion/upsert |
| `lib/websites/public-ingest.ts` | Origin checks and CORS |
| `lib/server/website-form-crm-sync.ts` | Website submission → CRM mapping |
| `app/api/websites/reports/route.ts` | Persisted submission and event reporting |
| `__tests__/api/websites-forms-submit.test.ts`, `websites-tracking-events.test.ts` | Existing route test files to extend for meaningful behavior |
| `website-setup/website-forms-portal-integration.md` and `website-setup/client-onboarding/ANALYTICS_AND_FORMS_INTEGRATION.md` | Integration documentation to reconcile after implementation |

Any proposed transport helper, consent controller, attribution helper or acceptance test below is **new planned work**, not a claim that such a component currently exists. Choose its exact filename during implementation to match the repository; avoid scattering one behavior among several competing handlers.

## 2. Release gates

| Gate | Required evidence | What it unlocks |
|---|---|---|
| G0 — Offer and proof approved | Lane scope, actual price/terms, supported capability list, permitted case content, one consistent request-versus-booking outcome | Page implementation against stable content |
| G1 — Core enquiry dependable | Independent form transport, validation, idempotency, error recovery and owner visibility pass in staging | Controlled referral/warm launch |
| G2 — Buyer-ready site | No promoted broken proof links; no internal placeholders; accepted mobile/accessibility/performance/crawl checks | Public rebuilt pages |
| G3 — Measurement dependable | Consent tests, persisted attribution, authoritative conversion, GA/GTM/Ads account reconciliation | Paid acquisition and pricing experiments |
| G4 — Lane delivery accepted | Ordinary customer role completes the sold workflow; owner/support/billing/export agreed; only verified automation claimed | CRM/Connected offer activation |
| G5 — Production smoke and rollback ready | Deployed version, approved internal test receipts, monitoring owner and usable rollback recorded | First capped paid tranche |

G1 and G2 are not permission to advertise unaccepted CRM automation. Website-only work may launch before G4's CRM/Connected portions. Advanced automation, revenue-import reporting and elaborate dashboards are not prerequisites for a tested website offer. Any waiver must reduce the published promise or distribution, name its owner and expiry, and state the practical fallback; it cannot silently waive reliable enquiry capture.

## 3. Traceability: audit → ticket → expected test → gate

| Audit item | Ticket | Required test/result | Gate |
|---|---|---|---|
| T1 current-URL attribution; mislabeled landing URL | B05 | A05 tagged entry → two internal pages → lead retains first/latest campaign and correct landing/submission URLs | G3 |
| T2 immediate identification/no withdrawal lifecycle | B04 | A04 fresh reject/accept/withdraw/reload controls optional storage/requests while form stays usable | G3 |
| T3 analytics-dependent form delivery | B02 | A02 tracker/GA/GTM blocked → legitimate request still stored once with truthful receipt | G1 |
| T4 attempt ≠ accepted conversion | B06 | A06 failures, refresh and direct confirmation visit produce no accepted conversion | G3 |
| T5 honeypot follows success path | B03, B06 | A03 rejected spam creates no accepted record, notification or lead conversion | G1/G3 |
| T6 no form idempotency | B03 | A03 committed-but-lost-response and concurrent retries return one submission ID | G1 |
| T7 201 does not prove CRM/email success | B07 | A07 downstream failure remains visible/recoverable; received enquiry is not lost | G1/G4 |
| T8 origin/rate/schema production unknowns | B03 | A03 permitted origins, form schema, bounded body and rate controls verified in staging | G1 |
| T9 mixed-session batch relabeling | B05 | A05 queued pre/post-expiry events retain original sessions | G3 before session-based decisions |
| T10 arbitrary query/property capture | B04, B05 | A04/A05 synthetic token/email stripped; approved campaign fields retained | G3 |
| T11 cancelled validation ignored by tracker | B02, B03 | A02 unchecked required acknowledgement/invalid email → no transport; server rejects invalid direct payload | G1 |
| Empty Projects page; three promoted case links 404 | B08 | A08 every promoted proof URL returns its correct approved content; feed outage does not erase existing proof | G2 |
| Internal editorial copy and diagnostic CMS fields | B01, B08 | A01/A08 public copy contains no internal instructions or missing-field names | G0/G2 |
| Enterprise budget bands; missing currency | B01, B02 | A01/A02 EUR implementation bands fit starter offers; recurring cost explained separately | G0/G2 |
| Malformed email progresses; mobile fallback not tappable | B02 | A02 visible step validation, error focus, working mailto/tel fallback | G1/G2 |
| Consent snapshot differs from visible acknowledgement | B02, B04 | A02/A04 one approved text/version supplies display and stored snapshot | G1/G3 |
| Request versus booking ambiguity | B01, B06 | A01/A06 request and confirmed appointment counted/described separately | G0/G3 |
| Client access, sender/execution and billing not accepted | B07, B11 | A07/A11 ordinary client role + delivery/billing evidence supports exact advertised claims | G4 |
| Crawl/discovery/review dates and contradictory old routes | B09 | A09 redirects/canonicals/sitemap/robots and authentic dates match approved route inventory | G2 |
| Performance/accessibility not measured fully | B10 | A10 repeatable page checks meet explicit budgets and manual critical-path checks | G2 |
| Private analytics settings not inspected | B06, B12 | A06/A12 account-owner screenshots/logs reconcile one designated primary conversion | G3/G5 |

## 4. Phase A — Agree contract and stabilise lead capture

### B01 — Freeze route, offer, proof and conversion contracts

**Owner:** product/marketing with technical reviewer. **Dependency:** companion design/copy plan. **Deliverable:** one approved route inventory and one small offer/event definition sheet.

Identify each lane's canonical destination, hero CTA, form intent value, primary proof, price and exclusions. Existing `/websites` and `/crm` are real routes; a Connected/ecommerce destination may be planned, so create only the routes selected in the parent plan. Preserve relevant existing URLs through real redirects or retained pages. Confirm whether `/demo` requests contact or displays a scheduler; initial recommendation is the honest request flow unless booking is actually implemented and accepted.

Final prices are an explicit business decision. Candidate starter offers are €1,500 + €149/month website, €3,000 + €249/month CRM, €4,500 + €349/month Connected; ecommerce from €3,500 + €199/month, ex VAT. Do not silently turn research hypotheses into irrevocable checkout products. The public price, quote, invoice preview and cancellation/ownership terms must match before deposits.

**A01 expected result:** every lane is understandable without visiting the platform overview; buyer can identify setup, service charge, tax treatment, exclusions and next step. All outcome claims have named evidence or are visibly labelled demonstrations. Copy review removes “FINAL CTA”, editorial instructions and unsupported automation/security/revenue promises. Budget examples use EUR and describe implementation budget, not ambiguous total company spend.

### B02 — One independent form transport and visible validation

**Owner:** website engineer. **Dependencies:** B01 for intent and required fields. **Existing files:** ContactForm, ConsentCardField and hosted tracker.

Give the form its own Portal submission operation that does not require analytics initialisation. A direct public endpoint call is sufficient if its approved CORS/abuse contract is met; do not introduce a proxy merely to hide a public site ID. Let tracking attach optional approved metadata. Remove generic tracker interception for this form, or explicitly opt it out, so there is exactly one owner. If generic interception remains for other client sites, check `event.defaultPrevented` before it transmits.

Validate required fields on the visible step and at final submission. Preserve entered data after failure. Use native semantics where appropriate, specific inline errors, focus management and an announced error summary. A `required` visual asterisk alone is insufficient. Make privacy acknowledgement and optional marketing consent distinct; generate visible text and saved snapshot/version from one approved source. Put the privacy link beside the control. Use actual mailto/tel links where contact details are offered.

Display pending only during a request; success only after a genuine accepted submission ID. A timeout after possible commit must show a retry path using the same idempotency key, not invent success or discard the input. Do not promise staff delivery, CRM linkage or a booked slot merely because the enquiry was received.

**A02 expected results:**

- Valid keyboard and mobile requests yield one persisted ID and truthful next-step copy with scripts blocked, analytics denied, or tracker slow to load.
- Invalid email stays on its visible step. Required acknowledgement unchecked prevents all submission fetches; server-side A03 still rejects bypassed invalid requests. Optional marketing unchecked does not block a requested response.
- Enter, rapid clicks and client rerenders cannot initiate competing transports. Hidden invalid fields do not trap focus on another step.
- HTTP error, network loss and timeout preserve input and re-enable a clear retry; success cannot be triggered by HTTP 202 `accepted:false`.
- Consent text/version in the submitted record matches what the user saw; no contact details or free-text body are copied into analytics events.

### B03 — Server request validation, idempotency and intake protection

**Owner:** Portal engineer. **Dependencies:** B02 request contract; can proceed in parallel with its UI. **Existing files:** forms submit route, shared public-ingest helper, route tests. **Planned work:** minimal database migration for a scoped request-id uniqueness constraint and any necessary delivery-status fields.

Generate a client request ID when a logical submission begins, preserve it for retries, and enforce uniqueness by site/form plus ID. Persist payload fingerprint or equivalent validation so the same key with different content yields an explicit conflict. Return original receipt for replay. Do not call a new insertion “deduplicated” merely because CRM matched the same email.

Apply form-specific required/type/length validation and bounded body size. Keep honeypot/rejection distinct from accepted receipt. Verify actual permitted origins and configuration, while recognising Origin is spoofable and not authentication. Add an existing project-compatible rate limiter if available; avoid building a bespoke anti-bot product. Log only necessary operational identifiers and errors.

Prevent duplicate notifications and journey work on replay. Use the persisted submission as the recovery anchor. A simple pending/delivered/error status plus safe retry is enough at launch; a new distributed queue is not required unless the existing architecture needs one.

**A03 expected results:** committed write followed by lost response, concurrent identical retries and double-click produce one stored submission and original ID; downstream work runs once or safely resumes. Same ID/different payload returns conflict. New genuine request uses a new ID. Invalid schema is rejected before persistence; filled honeypot yields no accepted lead/notification/conversion. Allowed browser origin works, unapproved origin fails according to policy, configured burst limit yields 429, oversized body is rejected, and legitimate server requests use the explicitly supported path. No adversarial tests on production.

## 5. Phase B — Measurement and fulfilment

### B04 — Consent lifecycle with useful non-tracking forms

**Owner:** website/analytics engineer plus designated policy owner. **Dependencies:** B02 independent transport. **Existing files:** IngeniumTracking, root GTM bootstrap, hosted tracker. **Planned component:** small consent controller or an existing suitable CMP, chosen once.

Implement the adopted policy for initial state, accept, reject and withdrawal across Portal identifiers and third-party tags. Do not infer this solely from banner rendering. Stop timers/listeners and clear relevant identifiers on withdrawal; prevent repeated initialisation from doubling history hooks/page views. Separate enquiry processing from consent for marketing or optional analytics. Use approved URL/property allowlists rather than retaining arbitrary search strings or tokens.

**A04 expected results:** clean profile before choice behaves according to documented defaults; reject leaves form usable and suppresses prohibited storage/requests; accept starts one event flow; withdraw stops future prohibited requests and removes applicable identifiers; reload respects choice. Test analytics domain blocked, storage unavailable and mobile navigation. Inspect network payloads/storage and account preview state. Synthetic `email`/`token` query parameters never reach analytics payloads. This technical acceptance does not claim a comprehensive legal certification.

### B05 — First/latest touch, reliable sessions and clean URLs

**Owner:** tracking engineer. **Dependencies:** B04 measurement policy, B03 payload contract.

Create a small approved attribution context: first touch, latest eligible touch, original landing path, submission path, five standard UTMs and approved click/campaign IDs if actually used. Define expiry and direct-visit overwrite rules. Store context only in ways permitted by the adopted consent policy; when tracking is denied, report attribution as unavailable or use an approved contextual approach, not invented precision. Keep server records/reporting aligned with those definitions.

Retain event session IDs when queued batches span expiry, or split batches by session. Retain an in-memory visitor/session fallback for unavailable storage. Redact arbitrary queries and fragments. Do not add a data warehouse for this requirement.

**A05 expected results:** a tagged landing followed by two internal routes produces the correct first/latest source on the accepted submission and corresponding report; later direct visit follows the documented policy; new tagged campaign changes latest but not first; landing/submission URLs differ correctly. Flush queued events after a 30-minute expiry and verify old/new session assignment. Storage denial yields a stable in-page identity and useful form submission. Live DOM input attributes alone are not accepted evidence: inspect the actual staging payload and saved record.

### B06 — Authoritative conversions and analytics account mapping

**Owner:** analytics owner with Portal engineer. **Dependencies:** B03 accepted receipt/idempotency; B04 policy; B05 attribution.

Keep a small event set: `cta_clicked` and `form_submit_attempt` for diagnosis, internal `lead_received` for a persisted genuine enquiry, `meeting_booked` only for confirmed scheduling, and separate CRM qualification/win/payment states. Map an eligible `lead_received` to GA4 `generate_lead` using the [official event reference](https://developers.google.com/analytics/devguides/collection/ga4/reference/events#generate_lead). Do not attach a made-up monetary lead value; add currency/value only under an agreed valuation rule.

Deduplicate explicitly in Ingenium's dispatch/reconciliation logic with a non-personal submission identifier. Merely sending an `event_id` parameter does not automatically deduplicate arbitrary GA4 events. Choose one dispatch owner/path per destination. Do not emit the same primary enquiry through both a GA4 import and an independent Ads tag and count both as separate wins.

GTM-KWCQSXC7 and GA4 G-NQ1RH94GDN were seen publicly; ownership, correct property/container, published version, trigger rules, consent defaults, referral exclusions, key-event definitions, internal-traffic filters and Google Ads import/primary settings remain private-account verification tasks. Enhanced measurement's generic form events must not become the accepted-enquiry metric by accident. Keep analytics PII-free; no names, email, telephone or enquiry text.

**A06 expected results:** one staging accepted receipt maps to one intended lead event per permitted destination. Failed validation/500, blocked spam, double-click, committed retry, direct confirmation URL and refresh generate no extra conversions. A demo request is not a booked meeting. Account owner records DebugView/Realtime and tag preview evidence, then checks reporting after normal processing delay. Reconcile by an internal ID ledger without assuming public script loading proves receipt. If no lawful/consented external analytics event is sent, the internal accepted submission remains the operational truth and coverage differences are reported honestly.

### B07 — Enquiry receipt → CRM → person, with visible failures

**Owner:** Portal/delivery engineer and named sales operator. **Dependencies:** B03; lane capability definition B01.

Track accepted submission separately from CRM sync, assignment, staff notification and promised prospect next step. Existing errors in metadata are a starting point; expose a simple operator exception list for received-but-unmapped, unassigned, notification-failed and overdue-follow-up records. Add idempotent repair on the original record. Nominate primary and backup owner with the actual response-time commitment.

Test as an ordinary authorised client member using the sold role/products. Administrator visibility is not acceptance. Marketing consent must affect marketing-only sequences, while a requested reply is handled under the agreed operational policy. If automation execution or sender verification is not accepted, use a tested manual action and describe it honestly; do not let a visual workflow builder stand in for execution evidence.

**A07 expected results:** a controlled lead has correct organisation/site/form, expected fields, permitted person/pipeline, named owner and next action; staff notification arrives in the agreed inbox with working record link; any promised prospect next step is actually delivered. Force CRM/email failure independently in staging: original enquiry remains, operator sees error, retry repairs the same ID without duplicate records/sends. Marketing unchecked is excluded from marketing-only follow-up. Record what the ordinary client can see and do, not just screenshots from an admin account.

## 6. Phase C — Proof, discovery and front-end quality

### B08 — Publish resilient, approved project proof

**Owner:** content owner and website engineer. **Dependencies:** B01 permissioned proof list.

Current project fetching uses a five-minute revalidation setting (`lib/portalIntegration/projects.ts:3`, `:434`), but exceptions return empty list/null (`:461`, `:477`); detail then calls `notFound()` (`app/(website)/projects/[slug]/page.tsx:89`). Thus an upstream failure can be presented as no work or a missing project. The index currently explains internal Portal fields to visitors; field presentation helpers can also generate missing-field instructions.

Use a small approved proof snapshot for launch or a last-known-good published dataset, with clear cache ownership and update/invalidation. Distinguish true empty/unpublished/not-found from transient service failure. A real removed project should not stay public indefinitely via stale cache: apply explicit unpublish/invalidation. Never show admin field names, setup instructions or broken numerical outcome placeholders in public UI. Omit optional missing fields; require essential title, summary, screenshot and permission before publication. Screenshots plus links are sufficient; load live embeds only on request where useful.

**A08 expected results:** every promoted homepage/service case link returns correct named proof, or is removed/replaced honestly; Carlow Hearing/Kenny Construction/Holland Pianos links from the audit are included in the check. Mock feed timeout/500/malformed JSON: approved existing proof remains usable or an honest fallback appears without pretending no projects exist. Unknown slug returns genuine 404; temporary upstream failure does not falsely erase known proof. Unpublish removes the item from index/detail/sitemap according to policy. No unsupported revenue metrics, internal copy or empty amber diagnostic cards appear.

### B09 — Routes, metadata and migration without broken journeys

**Owner:** website engineer/content. **Dependencies:** B01 route map, B08 proof IDs/slugs.

Implement parent plan's route inventory and explicit old→new mappings. Prefer existing canonical paths when their purpose stays the same. Add 301/308 redirects for deliberate replacements, retain legitimate pages when useful, and return real 404 for unknown content. Check private/confirmation paths, canonical metadata, social previews, schema, sitemap and robots together. Crawler-specific robots rules must not accidentally contradict the chosen restrictions. Robots directives are not access controls.

Do not populate `lastModified` with build time just to appear fresh. Existing sitemap static review date and dynamic product `new Date()` behavior should be replaced by genuine content-change dates where available, or omit invented freshness. Use only supported schema claims and actual published proof.

**A09 expected results:** crawl every listed public route plus old promoted links; zero unintended 404/5xx/redirect loops, unique intended title/H1/canonical, no preview-domain canonical. Sitemap contains only canonical public indexable pages that return 200; removed/draft/confirmation pages excluded per approved policy. Metadata/schema values match visible copy; unknown page really returns 404. Privacy/security pages are accessible where linked; protected resources require real access checks.

### B10 — Accessible, responsive and fast implementation

**Owner:** front-end engineer and reviewer. **Dependencies:** final design primitives; B02/B08 content paths.

Treat these as chosen build budgets, not measurements already achieved. Aim for WCAG 2.2 AA across the marketed site, using [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/) as the acceptance reference. Automated scanning supports manual checks; it cannot certify the whole experience.

| Area | Build budget / expected result | Verification |
|---|---|---|
| Loading and stability | Field p75 LCP ≤2.5s, INP ≤200ms, CLS ≤0.1, separately mobile/desktop when enough data exists | Post-launch field data; no fabricated pre-launch field pass |
| Pre-launch performance | Three controlled mobile runs/page; median Lighthouse Performance ≥90 as diagnostic target, LCP ≤2.5s and CLS ≤0.1 in that profile; investigate all material regressions | Fixed device/network profile on deployed preview with production build; report actual results and profile |
| Interaction lab check | Menu, form validation, step change, submit-pending and consent controls respond promptly without visible stalls; use TBT ≤200ms as a chosen lab budget | Lighthouse/DevTools interaction trace; TBT is not INP |
| Payload | Initial compressed JS target ≤250KB per marketing route; initial page transfer target ≤1.5MB; hero asset ≤250KB where visually feasible | Browser transfer report; keep explicit exception if necessary and prove performance target |
| Third parties | No autoplay-heavy media or live iframe above the fold; only necessary approved tags; defer optional embeds | Initial network waterfall before/after consent |
| Layout | No unintended horizontal scroll at 320, 390, 768, 1024 and 1440px; content works at 200% zoom and reflows at 320 CSS px | Real browser viewport/zoom and longest plausible content |
| Keyboard | Every menu, accordion, consent control and form usable; visible focus not hidden behind sticky header; no trap | Manual keyboard traversal, including escape/return focus for overlays |
| Forms | Programmatic labels, appropriate autocomplete/input modes, linked errors, readable summary and announced state | DOM/accessibility tree plus screen-reader critical path |
| Contrast and targets | WCAG AA text/control contrast; aim ≥44×44 CSS px primary touch controls without crowding | Contrast checker and mobile hit-target inspection |
| Motion | `prefers-reduced-motion` respected; essential content visible without scroll animation or JS | Reduced-motion browser setting and script-failure check |

Google's current [Core Web Vitals guidance](https://web.dev/articles/vitals) defines the field thresholds and p75 segmentation above. A load-only Lighthouse run cannot measure INP; a high score is not proof of accessible UI or successful real-user performance.

**A10 expected result:** homepage, each offer page, proof index/detail, contact/demo and confirmation path pass critical keyboard/screen-reader/mobile checks; no severe automated accessibility findings remain unresolved. Test current Safari/iOS and Chrome/Android as well as desktop Chrome/Firefox; record versions. Empty, error, pending and long-content states fit. Necessary exceptions are documented with impact, owner and compensating proof; arbitrary animation complexity does not justify missing basic performance.

## 7. Phase D — Client acceptance and controlled release

### B11 — Accept each lane as sold, including roles, money and exit

**Owner:** delivery lead/founder. **Dependencies:** B01, B07; relevant product release state.

Use one short acceptance sheet per lane. Website: pages, enquiry delivery, agreed analytics, edit/training and support. CRM: configured objects/fields, import sample, permissions, pipeline, operator task and export. Connected: actual supported website→CRM handoff, source and owner, duplicate handling, and only accepted live rules. Ecommerce: real staging test order/payment/shipping configuration and scoped customer/order handoff; do not infer store readiness from a brochure case.

Confirm seats/product membership and ordinary client role; verify billing preview includes setup, recurring fee, licences/usage and VAT treatment under approved terms. Demonstrate the contractual data export/handover scope and how service cancellation affects website or licensed CRM access. Do not expose secrets or client records in demo media. Do not claim the underlying shared platform source code transfers merely because custom website deliverables do.

**A11 expected result:** client role completes agreed tasks, restricted role cannot access another tenant, claimed automation produces the intended action with receipt and correct sender, support/owner exists, export is usable, and quote/billing/exit wording matches. Unaccepted features are removed from public offer or explicitly manual; they do not receive a green tick based on code existence.

### B12 — Rehearse deployment, evidence, monitoring and rollback

**Owner:** release owner, analytics owner and enquiry owner. **Dependencies:** all applicable gates G0–G4.

Use isolated staging data with outbound messages disabled or directed only to approved internal recipients. Run failure/abuse tests there. Run repository lint/build and targeted meaningful tests for form contract, idempotency, consent boundaries, attribution and event emission. Do not invent a claim that the marketing package already has a test suite; add only what is needed for these high-impact behaviors. Reconcile integration docs with the chosen transport so future client sites follow the accepted pattern.

Before deployment, record current version/configuration names, change set and rollback steps; no private secrets in the report. Database changes for idempotency/status should be additive and compatible with the prior deployed client. Test rollback does not remove accepted submissions or republish withdrawn proof. On release, one approved internal production smoke enquiry per promoted form verifies real routing; exclude test IDs from business reporting and do not send to uninvolved customers. This plan is not evidence that those sends have occurred.

**A12 expected result:** release evidence includes deployed commit/build, route, test ID, expected/actual result, owner/date, saved receipt, ordinary-role CRM view, notification delivery, consent/network trace, source attribution and intended account event. Named operator checks new enquiries and exception list daily for the first week; engineering reviews errors/failed posts; analytics owner reconciles qualified leads weekly. If capture fails, pause affected ads and roll back/fix the form immediately. If external analytics fails but enquiries work, pause attribution-led scaling and repair measurement; do not discard valid leads.

## 8. Minimum sequence and dependency map

1. **B01** defines scope, routes, claims, next step and event names. In parallel prepare approved proof for **B08**.
2. **B02 + B03** establish independent, validated and idempotent capture. They are one coordinated frontend/backend contract, not two separate competing implementations.
3. **B04** adds consent once forms are independent. **B05** follows the chosen consent/attribution policy. **B07** makes operational handoff visible; start role/owner work early.
4. **B06** maps accepted leads to accounts only after the accepted-record contract is stable. Do not optimise on the old attempt event while waiting.
5. **B08 + B09 + B10** complete public proof, route migration and design quality; these can progress beside backend work using approved static content.
6. **B11** accepts each advertised lane. **B12** records the rehearsal, release and rollback. Release website-only first if that is the only accepted lane; expand CRM/Connected once their gates pass.

Keep one issue per B-ticket with its named owner, dependencies, affected existing files, checklist A-ID, test evidence and release gate. This provides sufficient coordination without a large programme-management system. No ticket is complete merely because a component compiles; no test is marked passed without its actual observed result.

## 9. Evidence template

| Field | Record |
|---|---|
| Ticket / acceptance ID | B02 / A02, for example |
| Environment and version | Preview/staging/production, deployment URL and commit/build |
| Preconditions | Role, consent state, channel tags, blocked services, permitted test recipient |
| Expected result | Exact result from this plan |
| Actual result | Observation, including partial success/failure |
| Evidence | Redacted request/response, saved submission ID, delivery receipt, role screenshot or test output |
| Status | Not run / passed / failed / explicitly scoped out |
| Owner/date | Named person and date |
| Gate decision | G1–G5 passed, held or lane narrowed |

Current status of every A01–A12 acceptance suite: **not executed as part of this planning document**. Prior audit observations remain bounded evidence in their reports; they do not substitute for the rebuild's release rehearsal.
