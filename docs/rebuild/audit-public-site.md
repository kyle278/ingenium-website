# Ingenium public-site launch readiness audit

Observed 26 September 2026, approximately 13:21–13:29 UTC. Target: https://www.ingeniumconsulting.net/. Read-only audit; no forms submitted, no site/source changes, no customer records accessed. This report adds public HTTP, offer, copy and trust findings beyond the already identified project-feed problem.

## Assessment

The core public pages are reachable, have distinct titles and self-referencing canonicals, and explain the broad connected-system concept. The present site is not yet a good destination for the proposed three-lane SME launch. It routes all buyers toward the same relatively enterprise-oriented intake, does not expose purchasable scope or subscription terms, and still contains internal editorial wording. Tracking and privacy implementation need a targeted verification pass before increasing traffic.

This is a launch-readiness assessment, not a penetration test, legal opinion, accessibility certification, performance benchmark or conversion-rate study. Confirmed means observed in HTTP response content or the referenced source. Consequences for conversion are reasoned risks, not measured losses. Client-side storage/network behaviour and final form delivery were not exercised in this pass.

## Method and freshness

- Fetched homepage, all 21 static sitemap routes, robots, sitemap and social-preview asset directly with PowerShell HTTP requests. Inspected response status, headers, titles, canonical URLs, H1s, links, initial form markup and rendered-text content extracted from HTML. Scripts/styles were excluded from body-copy extraction.
- Used cache-busting query strings and `Cache-Control: no-cache` as a freshness check. Those requests do **not** guarantee cache bypass, so response headers were recorded and initially stale pages were fetched again after revalidation.
- The first homepage request returned `x-vercel-cache: STALE`, `Age: 641`. A later homepage fetch returned `HIT`, `Age: 89`, with the same observed editorial copy. Core offer/form pages returned `HIT` with ages around 4–10 seconds in the initial parallel pass.
- `/implementation` initially returned `STALE`, then `HIT`, `Age: 99`, preserving its problematic H1. `/security` was rechecked at `HIT`, `Age: 48`; `/platform` at `HIT`, `Age: 109`; `/demo` at `HIT`, `Age: 111`. These findings are not based solely on search-engine cached snippets.
- Read matching source in sibling project `C:/Users/kyler/Desktop/Projects/ingenium-website` to explain observed behaviour. Local files corroborate deployed markup but are not assumed to represent every deployed revision. In particular the local sitemap has commerce additions not seen in the fetched live sitemap.
- Inspected the publicly served tracker script at https://portal.ingeniumconsulting.net/ingenium-tracker.js (200, 31,184 characters). This was a script read, not a tracking-event submission.

## Positive checks and route coverage

| Check | Observation | Scope/limit |
|---|---|---|
| Public routes | 200 for `/`, `/platform`, `/services`, `/websites`, `/crm`, `/ai-agents`, `/automations`, `/security`, `/data-handling`, `/privacy`, `/security-review`, `/support`, `/implementation-methodology`, `/implementation`, `/contact`, `/demo`, `/revenue-systems-teardown`, `/technical-review`, `/projects`, `/about`, `/team` | Does not prove business workflows work |
| Page metadata | Inspected pages have distinct relevant titles and matching canonical routes | No search-console/index coverage data inspected |
| Canonical host | `http://ingeniumconsulting.net` and `https://ingeniumconsulting.net` ultimately resolve to `https://www.ingeniumconsulting.net/` with 200 | Full redirect hop types not recorded |
| Basic document | Homepage has `lang="en"`, responsive viewport, organisation/contact structured data and social metadata | Not a complete accessibility/schema validation |
| Social preview | `/opengraph-image` returns 200 `image/png`; PNG header indicates 1200×630 | Visual content not reviewed |
| Not-found behaviour | Deliberately nonexistent route returns 404 | No broad soft-404 issue found in this sample |
| Marketing choice | Form marketing checkbox starts unchecked and is distinct from required enquiry acknowledgment | Submission persistence not tested |
| Support identity | `/contact` supplies address, phone and one-business-day new-enquiry response expectation | Operational fulfilment not tested |
| Security honesty | `/security-review` explicitly avoids claiming certification without a documented audit | Control effectiveness was not tested |

## Prioritised findings

Severity: **P1** address before paid campaign scaling; **P2** address before or during initial controlled launch; **P3** housekeeping. No P0 outage was established in the core routes inspected. Owner names below are proposed from the live team descriptions, not assignments already accepted.

### PUB-01 — P1 — Optional tracking has no visible consent gate in the inspected implementation

**Confirmed evidence:** Live page markup initialises Google Tag Manager `GTM-KWCQSXC7` with `beforeInteractive`. It loads the Ingenium tracker with `afterInteractive` and calls `IngeniumTracker.init` with endpoint/site ID only. The live tracker defaults `autoTrackPageViews` to true, writes/retrieves a visitor identifier in `localStorage`, stores session state in `sessionStorage`, and starts a `page_view` on initialisation. No consent reference was found in that script or the inspected initialisation path. No cookie-management UI text or preference link appeared in the fetched public body/links. Sources: [homepage](https://www.ingeniumconsulting.net/), [demo](https://www.ingeniumconsulting.net/demo), [live tracker](https://portal.ingeniumconsulting.net/ingenium-tracker.js).

**Source corroboration:** `ingenium-website/app/layout.tsx:90`; `app/components/IngeniumTracking.tsx`; tracker storage calls also appear in portal `public/ingenium-tracker.js:148` onward.

**Uncertainty:** This is strong evidence of an ungated implementation path, not a captured browser HAR proving every request/storage write. GTM loading alone does not establish which downstream tags fire. A tag/container or uninspected runtime layer could alter behaviour. No claim of a confirmed legal breach is made.

**Fix / owner:** Kyle + privacy adviser: inventory purposes, gate optional analytics/storage appropriately, provide accessible choice/withdrawal, and keep essential form submission operational independently. The tracker also participates in forms, so do not simply remove it and accidentally break lead intake. Irish DPC guidance normally requires consent for cookies and similar technologies except strictly necessary use. [DPC guidance](https://www.dataprotection.ie/en/dpc-guidance/guidance-cookies-and-other-tracking-technologies).

**Acceptance:** Fresh browser profile shows no optional identifiers or analytics events before the appropriate choice; reject, accept and withdraw each work; necessary form submission still works in staging with optional tracking rejected; documented tool/purpose/retention inventory matches production.

### PUB-02 — P1 — Privacy notice lacks decision-useful processing detail

**Confirmed evidence:** [Privacy](https://www.ingeniumconsulting.net/privacy) calls itself a basic summary. It lists purposes and provider categories but does not state the lawful basis for each purpose, a usable retention schedule/criteria, a supervisory-authority complaint route, or the full relevant rights/withdrawal information. It refers generically to browser settings controlling some analytics. [Data handling](https://www.ingeniumconsulting.net/data-handling) remains general and does not resolve those visitor-notice omissions.

**Why it matters:** CRM/data-handling competence is central to the product pitch. The notice should accurately explain actual processing, not rely on future client-specific agreements for website visitor information. The DPC identifies lawful bases, retention periods/criteria and complaint rights among required transparency information. [DPC transparency guidance](https://dataprotection.ie/en/individuals/know-your-rights/right-be-informed-transparency-article-13-14-gdpr).

**Fix / owner:** Kyle + privacy adviser. Replace the generic summary with a notice mapped to actual enquiry, marketing, analytics and service operations. Identify the controller clearly; explain relevant transfers/safeguards where applicable, rights, and actionable contact details. Do not invent processors or retention periods.

**Acceptance:** Approved notice covers actual production purposes and tools; purpose-to-basis and retention decisions are documented; notice and consent controls agree; all intake routes link to it at collection.

### PUB-03 — P1 — Launch economics and intake budget bands conflict

**Confirmed evidence:** `/demo`, `/technical-review` and `/revenue-systems-teardown` include the same second-step budget options: `Under 25k`, `25k-50k`, `50k-100k`, `100k+`. No currency or recurring/project distinction is supplied. The first three required fields are name, work email and growth challenge; company/stack/timeline/budget/goals follow. Budget is optional. [Demo](https://www.ingeniumconsulting.net/demo), [technical review](https://www.ingeniumconsulting.net/technical-review), [teardown](https://www.ingeniumconsulting.net/revenue-systems-teardown).

**Inference:** A small-business website buyer may infer the provider expects €25k-scale work. This could discourage the intended launch segment; no abandonment data was inspected.

**Fix / owner:** Clayton + Kyle. Give each launch lane an appropriate fit form. Show EUR and distinguish setup budget from recurring care; include “not sure.” A simple website quote should not require interpreting “Current Stack” or technical governance categories.

**Acceptance:** Each campaign lands on its corresponding offer and appropriate intake; advertised price has an obvious matching budget band; no unstated currency; optional questions do not block enquiry; capture lane attribution.

### PUB-04 — P1 — Website-only, CRM-only and combined offers are not commercially separable

**Confirmed evidence:** [Websites](https://www.ingeniumconsulting.net/websites) describes CRM-connected builds and routes to demo/platform, including an FAQ that often recommends a CRM. [CRM](https://www.ingeniumconsulting.net/crm) is similarly a broad capability page. [Services](https://www.ingeniumconsulting.net/services) describes an operating model. None of these inspected pages publishes a defined starter scope, price/model, included support allowance or explicit website-only purchasing route. Probed `/pricing`, `/terms`, `/ownership` return 404; these are not broken navigational links because no such links were found.

**Inference:** Existing messaging favours the combined system and asks a website-only buyer to understand a platform sale. This conflicts with the proposed three-lane launch, not necessarily with the previous site strategy.

**Fix / owner:** Clayton for packaging, Kyle for scope, Sophie for presentation. Publish three landing pages with fit, included work, exclusions, timeframe, starting cost, recurring model and next step. Keep a standalone website offer credible. Explain licences, usage and migration separately for CRM.

**Acceptance:** A prospect can identify the right lane, estimate first-year cost and understand the next step without booking a discovery call solely to learn the commercial basics.

### PUB-05 — P1 — Internal editorial language is publicly visible

**Confirmed evidence:** Fresh revalidated [implementation](https://www.ingeniumconsulting.net/implementation) H1: “The page has to earn the scroll with a believable rollout.” Homepage proof introduction: “Three proof blocks before the buyer has to trust the concept…” and eyebrow “Final CTA.” [Security](https://www.ingeniumconsulting.net/security) uses “Trust Messaging” as a visible section label and an H1 about what technical buyers need. [Contact](https://www.ingeniumconsulting.net/contact) exposes route paths as copy; intake pages include “Role-specific next step” wording.

**Why it matters:** These are instructions about building/selling the page rather than explanations for the customer. They undermine the editorial confidence Ingenium is selling.

**Fix / owner:** Clayton + Sophie. Replace internal labels with buyer outcomes, deliverables and clear practical instructions. Suggested implementation direction: “From first enquiry to a working sales process”; retain only promises the team can deliver.

**Acceptance:** Read-through of every published route removes planning labels such as “Final CTA,” “proof blocks,” and “Trust Messaging”; all hero text describes the customer's offer or result. Re-fetch deployed content after cache revalidation.

### PUB-06 — P2 — The platform CTA is a detour; the demo is an enquiry request

**Confirmed evidence:** The primary [platform](https://www.ingeniumconsulting.net/platform) button labelled “See the Platform” links to `/contact`, which asks the visitor to choose a path, commonly leading to `/demo`. The header button with the same label links to `/platform`. [Demo](https://www.ingeniumconsulting.net/demo) offers a three-step request form and says timing will be confirmed; no public interactive walkthrough or time-slot selector appears in fetched markup.

**Correction:** The main platform CTA is **not** a self-link; only the same-page header link is. No calendar failure was established, because the site currently describes a human-confirmed next step.

**Fix / owner:** Clayton + Kyle. Use “Request a demo” consistently if it is a request. Send the main CTA directly to that request, or provide a viewable short demonstration that fulfils “See.”

**Acceptance:** CTA label accurately predicts the destination/action; platform → demo requires one action; confirmation explains response time and next step without suggesting a booking already exists.

### PUB-07 — P2 — Enquiry acknowledgment text and stored snapshot differ

**Confirmed evidence:** The initial live [demo](https://www.ingeniumconsulting.net/demo) form includes hidden `consent_text_snapshot` value “I confirm Ingenium may use my details to reply to this request under the Privacy Policy.” The visible checkbox description says “I have read the Privacy Policy and I consent to Ingenium using the information above to respond to this request.” “Privacy Policy” is plain text in this form section; the working privacy link is in the footer. Source confirms separate literals in `app/(website)/contact/ContactForm.tsx:248` and `:392`.

**Uncertainty:** Actual stored database values were not tested. The mismatch is in the payload preparation/markup, not an asserted database corruption.

**Fix / owner:** Kyle + privacy adviser. Derive displayed copy and captured snapshot from the same versioned source; put a real privacy link beside the control; decide the appropriate acknowledgment/legal-basis wording rather than using “consent” indiscriminately.

**Acceptance:** Staging submission records the exact displayed text/version and independent marketing choice; policy link works by keyboard and preserves entered form data; no optional marketing preselection.

### PUB-08 — P1 — Invalid email advances past step one; final hidden-field validation needs testing

**Confirmed source and separate team browser observation:** `ContactForm.tsx` checks only non-empty name/email/challenge in `handleContinueFromStepOne`; it then hides step one. The email input remains `required type="email"` within a hidden parent. The coordinating auditor reproduced `not-an-email` advancing from step one to step two in the live browser, without submitting. [Live form route](https://www.ingeniumconsulting.net/demo), source `app/(website)/contact/ContactForm.tsx:93` onward. The final browser-validation outcome remains untested: it may target a non-focusable field on the hidden first step. No production submission was performed.

**Fix / owner:** Kyle. Validate email before advancing; make error/focus handling deterministic when any earlier-step field becomes invalid. Separate form transport readiness from tracker availability.

**Acceptance:** In staging, malformed email is rejected visibly at step one; back/forward retains data; final submission with an invalid earlier field moves to the right step and focuses its error; tracker load failure yields an actionable fallback rather than endless submitting.

### PUB-09 — P2 — Subscription ownership, cancellation and support are not purchase-ready

**Confirmed evidence:** [Support](https://www.ingeniumconsulting.net/support) says response times, emergency routes and service levels must be agreed in writing; without an SLA support is commercially reasonable. [Data handling](https://www.ingeniumconsulting.net/data-handling) says production remains client-controlled unless separately agreed. Inspected public offer pages do not explain site-code ownership, CRM portability, exports, minimum term, early exit or what a care subscription contains.

**Assessment:** This is not inherently a defect for bespoke consulting sold by contract. It becomes a launch dependency before advertising a standard weekly/monthly offer.

**Fix / owner:** Clayton + Kyle. Publish a plain-language commercial summary and binding scoped terms: setup/recurring fees, 52 weekly versus 12 monthly collections, VAT, minimum term, renewal, cancellation, source-code/licence rights, customer-data export, included support and paid changes.

**Acceptance:** A sample first-year invoice and cancellation example reconcile with the landing-page price; customer data/domain and platform/software rights are distinguished; advertised response levels match resourcing.

### PUB-10 — P2 — Quarterly review statement is overdue; sitemap dates are generic

**Confirmed evidence:** Many service/company pages display “Last reviewed May 7, 2026” and “Quarterly review cadence”; the observation date is 26 September. Live [sitemap](https://www.ingeniumconsulting.net/sitemap.xml) has 21 static entries, all with `2026-05-07T00:00:00.000Z`. Matching source hard-codes `SITE_CONTENT_LAST_REVIEWED` in `app/sitemap.ts:35` and `LAST_REVIEWED_ISO` in `lib/review.ts:3`.

**Inference limit:** Old dates do not prove every statement is wrong or that search engines penalise the site. The concrete mismatch is the missed publicly promised review cadence. Sitemap dates should reflect actual meaningful changes, not an artificial freshness reset.

**Fix / owner:** Kyle + content owner. Review each critical page; record the actual review; use per-page meaningful modification dates where available. Remove cadence claims if the team will not maintain them.

**Acceptance:** Published review dates have an accountable review record; next review is scheduled internally; sitemap values match real content changes and do not change merely because a request ran.

### PUB-11 — P2 — AI-specific robots groups omit the general exclusions

**Confirmed evidence:** [robots.txt](https://www.ingeniumconsulting.net/robots.txt) general group disallows `/api/`, `/internal/`, `/website-brief`. Separate OAI-SearchBot, ChatGPT-User, ClaudeBot, PerplexityBot and GPTBot groups only say `Allow: /`. Local `app/robots.ts` matches this structure.

**Assessment:** The policy is inconsistent: specific groups may select their own rules rather than inherit the wildcard disallows. This is a crawl-policy finding, not evidence that private data is publicly accessible. Robots rules are never authentication.

**Fix / owner:** Kyle. Confirm intended bot policy; repeat exclusions in each specific group or simplify the configuration. Verify private routes are protected independently and mark public-but-nonindexable intake pages appropriately.

**Acceptance:** A robots parser test confirms all intended user agents receive the same private-path restrictions; no sensitive material relies on robots for access control; sitemap excludes non-public routes.

### PUB-12 — P2 — Capability and delivery claims need scoping before campaign reuse

**Confirmed evidence:** [Homepage](https://www.ingeniumconsulting.net/) says every form/chat/campaign updates CRM in real time and every interaction flows into a custom CRM; it also says ready in weeks. [Platform](https://www.ingeniumconsulting.net/platform) states immediate routing of owner/SLA/stage. [Projects](https://www.ingeniumconsulting.net/projects) states a typical implementation window of 6–10 weeks. [CRM](https://www.ingeniumconsulting.net/crm) also describes setup, migrations and integrations, leaving the distinction between own software and third-party implementation unclear.

**Assessment:** “Weeks” and “6–10 weeks” are not logically contradictory. The issue is lack of lane-specific conditions and boundaries. This audit did not verify the product capabilities and does not label the claims false.

**Fix / owner:** Kyle + Clayton. Produce a capability/offer matrix: existing own-platform features, supported external CRMs, configuration work, bespoke work, usage limits and dependencies. Express launch windows from the point of approved scope/content/access and distinguish simple websites from migrations.

**Acceptance:** Every advert maps to a demonstrable included capability or explicit scoped service; native connection, integrations and future options are distinguished; a real demo validates form → CRM → owner → next action; timeline estimates have scope and client-dependency assumptions.

## Project-feed issue: brief cross-reference only

The fresh `/projects` response still says no published projects and exposes an internal explanation about the portal feed, while the homepage names three projects. This corroborates the existing project investigation and should be resolved by that workstream; this report does not repeat its root-cause analysis. The live sitemap presently contains no project-detail entries. Do not assume a cache purge alone resolves this mismatch.

## Recommended launch gate

Before paid scaling: remove editorial copy; publish clear lane offers/intake; align prices with qualification; resolve tracking/privacy concerns; verify the form journey in staging and then with an explicitly authorised production smoke test. Launch with bounded traffic only after the route, form-delivery and CRM-routing checks pass.

Before subscription checkout: publish approved ownership, cancellation, billing and support terms; reconcile advert wording, contract and actual collection schedule.

During first controlled cohort: measure qualified-lead rate, form completion by step, response time, booked calls and close rate by lane. Use measured losses to prioritise further UX changes. None of those metrics were available in this public audit.

## Remaining verification

- The coordinating auditor separately checked all three form steps, confirmed unchecked optional marketing, and found no horizontal overflow at 390px, with mobile menu/submenus operating. No browser errors/warnings were captured in that pass. These are bounded positive checks, not a complete responsive/accessibility certification; broader desktop/mobile and keyboard/screen-reader checks remain.
- Clean-profile storage/network captures for consent accept/reject/withdraw paths and GTM tags.
- Staging form transport, errors, anti-spam, CRM routing, notifications and acknowledgment persistence; no form was sent during this audit.
- Search Console index coverage and real-user performance; HTTP 200 and metadata do not establish ranking or Core Web Vitals.
- Exact hosting/subprocessor locations, data transfer safeguards, retention and contractual ownership; public text is not the underlying contract.
