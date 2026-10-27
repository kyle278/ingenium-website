# Local business website rebuild

Implemented from the 24 October 2026 rebuild plan, with the user's instruction to hold undecided commercial details. The user confirmed Starter normally costs €795 + €49/month and is currently discounted to €495 + €49/month. The previously approved five-page package remains €1,495 + €99/month, with care starting at launch. CRM and combined work are quoted individually.

## Ready to review

- Demo-led homepage showing the website-to-CRM journey, two prominent service routes, broader service navigation, real team profiles and a common free 15-minute call CTA. The restoration decisions are recorded in [BRAND-RESTORATION.md](BRAND-RESTORATION.md).
- `/packages`: two priced website packages and two individually quoted follow-up options, grouped into website and follow-up routes. Leads with the one-off build price and monthly care. Includes deliverables, exclusions and planned timelines. Calculated annual totals are available inside an optional cost breakdown, following feedback that annual presentation felt too heavy. Prices also appear after the homepage's service, work and team story and on the relevant service pages.
- `/phone-ringing-website`, `/never-miss-a-lead`, `/leads-to-jobs`: outcome-led route pages.
- `/how-it-works`: three steps, from the initial call through drafting and approval to launch checks.
- `/results`: explicitly labelled illustrative designs, existing template gallery and published Portal projects when available. No invented customer numbers or discounts.
- `/about`: team and Carlow story together, with existing real headshots and contact details.
- `/visibility-check`: human-reviewed Google visibility request, delivered by email.
- `/book-a-call`: a call request with optional preferred day/time in Europe/Dublin. The owner confirmed there is no calendar link currently. An accepted request is not represented as a confirmed booking.
- Existing URLs redirect permanently; project detail URLs remain intact. Canonicals, discovery paths, breadcrumbs, service schemas and social preview copy follow the new structure.

## Forms

Both new request types use the existing `contact` Portal form through `/api/enquiry`, with distinct `intent` values (`free-call`, `visibility-check`). All context also appears in the readable message so it is useful in the existing contact inbox. Package-specific buttons preselect the service and carry the package name into the request. Changing to another service clears that package interest so stale choices are not submitted. Consent evidence, optional marketing, same-origin checks, honeypot, bounded replay protection and consent-aware attribution retain the established contracts. Required visibility context and date/time preferences are also validated on the server.

The call request now follows the `form-experience` skill: icon topic cards, optional timing preferences, contact details near the end, then clickable cards for required privacy acknowledgement and separate optional marketing consent, with no review page. Valid service/package links skip the repeated topic question. Separate first and last names and a phone number are required for the callback. Email, business name and notes are optional behind a disclosure; Back preserves corrections. Email becomes required only for a separately selected email-marketing opt-in. The local API enforces these rules without weakening email requirements for emailed reports or other request types. The question assessment, interaction rules and delivery mapping are recorded in [CALL-REQUEST-JOURNEY.md](CALL-REQUEST-JOURNEY.md).

The visibility check is a request for a manual review, not an automated ranking report. The team still needs to review it and send the report. Call requests need the team to use the supplied number to agree a time. Confirmation copy follows this phone-based response.

For a future calendar, set `NEXT_PUBLIC_BOOKING_URL` to an HTTPS event URL for a **15-minute** call and rebuild. The calendar loads only after the visitor requests it, with an external-link fallback. The old starter campaign's 20-minute event setting is deliberately not reused.

## Held for decisions

- Delivery platform and account arrangements still need confirmation in the proposal. Website care starts at launch: €495 + €49/month for Starter (normally €795 + €49/month); €1,495 + €99/month for up to five pages. No fixed or monthly CRM/combined prices are published; each proposal defines its scope, timing and ongoing costs.
- Grants and any grant navigation/banner: wait for Carlow LEO confirmation. No funding claim or eligibility check is published.
- Guarantees, refund promises, cancellation and exit terms: wait for reviewed wording. No new terms or commitments are published.
- Capacity, response-time promises and numerical results: publish only when evidenced and approved. The user-confirmed Starter discount is published as a €300 saving on the build only, with no invented expiry or remaining-place count.

The old starter offer redirects to the current starter package on the Packages page, so its superseded pricing and terms are not served as a sales page. Existing support, security, data handling and privacy pages are preserved.

## Verification

Production build and automated tests pass. Browser checks cover the 11 rebuilt pages at 1440px and 390px, legacy redirects, image loading, overflow, mobile navigation, keyboard focus, reduced motion, required privacy, optional marketing, failed submission retention, duplicate activation and accepted receipts. Browser form tests intercept the enquiry response; they do not create real Portal leads or prove live delivery.

In this local environment, the project feed returns 404 and the blog connection has no configured key. The Results page therefore shows labelled examples. The sitemap still returns the main pages and available projects when the optional blog is unavailable. Existing Blog implementation and production connection settings are preserved.

## Offer strategy

The Hormozi offer brief is in `docs/INGENIUM-OFFER-BRIEF.md`. Starter sells one clear place for referrals to check the business; Phone Ringing Website sells dedicated pages for distinct services; the follow-up options remain individually quoted. Website copy is drafted for approval. Existing profile/review deliverables are presented as included extras, with no invented retail values on the public site.

The user estimates a Starter build takes 3–4 hours and requested valuing labour at €25/hour. With no direct hosting cost reported, build labour is €75–€100 and the current €495 build fee leaves €395–€420 before sales, admin, revisions, overhead and ongoing support. The €49 care fee is recurring revenue before maintenance and edit time. These are planning estimates, not a net-profit claim.
