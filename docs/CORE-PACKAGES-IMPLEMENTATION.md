# Three-package website rebuild: implementation and verification

Date: 29 October 2026
Workspace: C:/Users/kyler/Desktop/Projects/ingenium-website
Status: Implemented locally. Public production has not been deployed.
Local production preview: http://localhost:3010/

## Commercial decisions

- Positioning: business growth and automation consultancy for Irish businesses.
- Three canonical paths: Starter Website, Business Growth, CRM & Automation.
- Starter: €795 standard setup; €495 during the fixed promotion; €50/month.
- Growth: indicative starting prices from €1,500 setup and from €99/month.
- CRM: indicative starting prices from €3,000 implementation and from €199/month.
- No VAT currently charged, as confirmed by the user.
- Existing client agreements and free-hosting periods remain honoured.
- No invented testimonials, revenue claims, monetary bonus valuations, seat counts or guaranteed leads.
- Scope, acceptance, support allowances and subscription terms are confirmed in a written proposal.

## Research and sales deliverables

1. [Irish market research and package validation](IRISH-PACKAGE-VALIDATION-2026-10-29.md).
2. [Hormozi Offer Brief and critique](CORE-PACKAGES-OFFER-BRIEF.md).
3. [Hormozi Leads Brief and one-page advertising plan](CORE-PACKAGES-LEADS-BRIEF.md).

The research supports a plausible service ladder. Customer willingness to pay, acquisition economics, delivery margin and retention remain unmeasured. Quote-led service businesses are the initial targeting recommendation, not a proven best-converting segment.

## Pages and journeys

- /: new positioning, three early self-selection paths, full package cards, service-business examples, existing real work/team, process and objections.
- /packages: scope comparison, clear prices and commercial notes.
- /starter-website: restored as a real indexed landing page.
- /business-growth: website + CRM + one enquiry workflow.
- /crm-automation: discovery-led operational implementation.
- /book-a-call?service=...&package=...: package context and package-specific heading retained.
- /how-it-works: scope, responsibilities, preparation and realistic targets.
- /about: updated consultancy positioning and content responsibilities.
- Navigation, footer, metadata, discovery paths, breadcrumbs and llms.txt aligned.
- Existing website/CRM/connected/phone-ringing/never-miss/leads-to-jobs links route to appropriate canonical pages.
- Legacy editor aliases remain available and point to the replacements.

The existing Portal editor, SEO, Blog, consent and enquiry infrastructure are retained. New editorial regions use new v2 identities, reducing the chance of stale saved hero overrides replacing the new package story.

## Promotion contract

Start: 2026-10-29T07:02:20.000Z.
End: 2026-11-05T07:02:20.000Z.
Displayed deadline: 5 November 2026 at 07:02:20 Irish time.

The deadline is fixed in lib/business-packages.ts and is exactly seven days. It does not reset on reload, repeat visit, new device or deployment.

Starter setup is €495 inside the campaign and €795 at/after expiry. Savings, first-year comparisons and the promotional banner follow the same rule. Countdown values clamp to zero.

An eligible Starter quote request received through the website before the deadline preserves the promotional price, subject to agreeing the Starter scope. A deposit is not required just to request a quote. An external calendar booking or an unsent form does not reserve it. This rule is stated in the Starter FAQ.

The API records receipt-time package/pricing context and removes browser-supplied monetary/promotion claims. A pre-expiry accepted request retains its original snapshot on an idempotent retry. This is quotation context, not a checkout/payment system.

Server components share one request-scoped timestamp. Client prices and countdowns hydrate that snapshot and then update from the browser clock. Server receipt time remains authoritative for offer eligibility.

## Actual resources supplied

public/resources contains:
- starter-content-checklist.txt
- starter-launch-checklist.txt
- growth-enquiry-response.txt
- growth-pipeline-guide.txt
- crm-workflow-map.txt
- crm-acceptance-checklist.txt

Each package page links to its relevant downloads. They are practical samples, not a substitute for each customer's signed scope.

## Verification

- npm test: 88 passing tests.
- New regressions cover fixed duration, exact expiry boundary, price/saving/annual-total reversion, nonnegative timer, canonical/legacy package routing and server quote snapshots.
- API regressions verify forged browser prices cannot override server eligibility and mismatched package/service claims do not become monetary snapshots.
- Existing form tests check separate names, phone validation, privacy and optional marketing, back navigation, duplicate submission and selected-package handling.
- Production build succeeds, including TypeScript.
- Source lint command: npx eslint app components lib tests next.config.ts. Zero errors; 27 warnings remain in the source tree, principally existing unused imports and image guidance.
- Production HTTP checks: homepage, comparison, three package pages and three package-specific request URLs return 200; expected legacy redirects return 308; sampled resource URLs return 200; sitemap includes all three canonical package routes.
- Browser screenshots inspected at 1440 desktop and 390 mobile viewport overrides.
- Mobile homepage, comparison and three landing pages have no document-level horizontal overflow; the comparison table has its own horizontal scroll region.
- Three path links and mobile package menu verified.
- Starter, Growth and CRM enquiries retain the correct package in the request screen.
- Visible keyboard focus verified.
- No broken completed images observed.
- No browser errors from the local production origin observed.

Evidence logs: .codex-preview/core-packages-tests.log, core-packages-build.log, core-packages-source-lint.log and core-packages-http-checks.json. Browser screenshots were inspected in the conversation.

## Verification limits and deployment notes

No live customer form was submitted and no real CRM, email or automation record was deliberately created. Transport and deadline behaviour were exercised with isolated tests. Portal acceptance, downstream automation execution, email deliverability and production CMS overrides were not re-certified by this marketing rebuild.

The build logs an optional Portal projects-feed 404 from the existing integration. It does not fail the build; the homepage's current-project visuals are separate. Do not describe that feed as verified.

The original checkout already had substantial local changes. This task does not commit or deploy unrelated work. Before a public release, follow the repository's existing canonical rebuild/editor/Blog/SEO release notes and include the compatible integration sources. Review the active Portal editor registry and managed redirects/metadata for the new canonical URLs as part of release verification.

The new deadline is already running. Publishing later does not restart it. If public release happens after expiry, the website correctly shows standard Starter pricing.

## Commercial operating work still required

- Confirm CRM users, records, email volumes, workflow execution and support entitlements per quote.
- Document cancellation, data access/export and third-party charges.
- Validate delivery cost and actual support load at the indicative starting prices.
- Obtain evidence and customer permission before publishing outcome claims.
- Record qualified enquiries, calls held, proposals, deposits, collected cash and retained monthly contribution by package and segment.

