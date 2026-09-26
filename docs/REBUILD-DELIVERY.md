# Ingenium website rebuild — delivery and launch readiness

26 September 2026. Rebuild based on the research, copy deck, architecture and launch audit in `docs/rebuild/`. This is the implementation record; the archived planning documents contain proposals and are not themselves public website content.

## Delivered

- Light mineral/blue/teal design system, retained Manrope/Public Sans fonts, responsive navigation, keyboard focus, skip link and reduced-motion support.
- Customer-facing homepage, Websites, CRM, Website + CRM, Ecommerce, Pricing, Services and How we work pages. Monthly billing with separately stated setup costs, VAT and package boundaries. No checkout or weekly-price experiment.
- A manually operated, clearly labelled example enquiry journey. It uses synthetic data and makes no autonomous follow-up claim.
- About/team, support, security and scoped automation/AI information. Relevant old routes redirect; existing policy bodies are retained.
- Project publication filters shared by home, work index, detail routes and sitemap. No hardcoded links to unpublished cases, invented testimonials or missing-field editorial instructions.
- A short enquiry form with visible editable service choice and SME implementation budgets. Existing specialist request routes retain their backend intent and truthful request wording.
- Enquiries submit through a validated same-origin server route, independently of optional trackers. Accepted receipt is distinct from a click, generic HTTP success or a booked meeting.
- Optional analytics consent and withdrawal, redacted source URLs, consented campaign context and a post-acceptance event. Optional tags default to disabled until account configuration is verified.

## Audit findings mapped to implementation

| Audit issue | Delivered response | Remaining operational evidence |
|---|---|---|
| Empty work page and broken promoted cases | One validated published source; omit unavailable homepage proof; meaningful work-page fallback | Restore Portal public project endpoint and publish permissioned case records |
| Internal drafting text and broad claims | Rewritten public copy; scoped services; no fake results or autonomous actions | Owner checks each advertised CRM/Connected capability against a real delivered workflow |
| Enterprise budget mismatch / CTA detours | Service-prefilled single-page intake, EUR bands and direct destinations | Verify qualifying conversations against the chosen offer |
| Invalid email / ignored cancelled submit (T11) | Native and server validation; one form submit owner; hosted tracker interception removed | Browser + mocked route tests cover invalid submissions; production smoke remains |
| Enquiry depended on optional tracking | Independent `/api/enquiry` transport plus private-brief adapter | Confirm production origin/proxy and actual Portal availability |
| Attempt counted as accepted lead | Only explicit stored-submission receipt creates event; confirmation views do not | GTM/GA4 mapping and Ads reconciliation |
| Inaccurate consent snapshots | Shared versioned public notice; separate optional marketing choice | Verify contact ledger and suppression/unsubscribe operations before marketing sends |
| Campaign context/query risk | Consented session context; allowlisted campaign fields; query/fragment stripping | Inspect real saved records; no cross-device attribution claim |
| Duplicate requests | Stable request key and bounded same-process replay protection; no automatic uncertain retry | Durable cross-instance Portal uniqueness still needed |
| Saved lead but failed CRM/email action | UI promises saved enquiry only; genuine email fallback | CRM owner/role, notification delivery and failure monitoring |
| Tracker mixed-session batching | Unsafe hosted event tracker not loaded | Portal anonymous session/event analytics intentionally unavailable until separately repaired |
| Performance/accessibility unknown | Production build and responsive/keyboard/validation review; restrained JS and motion | Field Core Web Vitals and full assistive-technology review remain launch monitoring work |

## Known external blockers before paid launch

1. The configured Portal public project endpoint returned HTTP 404 during this work. The website cannot repair an undeployed/unavailable Portal endpoint by rewriting its pages. Restore the endpoint and its published data, then revalidate the website. The homepage automatically displays approved proof when the feed is available.
2. No production enquiry was submitted during this rebuild. Rehearse a clearly identified internal test through the deployed site and confirm the stored record, service/intent, consent text, assigned owner and actual staff receipt. A mock passing is not proof of production delivery.
3. Check ordinary client permissions, imports, exports and the actual website-to-CRM mapping before launching the CRM/Connected campaigns. The illustrative homepage journey is not evidence of production automation.
4. Configure and verify the existing GTM/GA4 account before setting `NEXT_PUBLIC_ENABLE_ANALYTICS=true` and redeploying. Advertising consent remains denied in the implementation. The former Portal page/event tracker is intentionally absent.
5. Add durable Portal request idempotency and distributed abuse controls before scaling paid acquisition. Process-local protection is not cross-instance deduplication.
6. Confirm response ownership, package economics, domain/data exit arrangements and policy review dates. No unverified response-time SLA, accreditation or revenue guarantee was added.

See [enquiry release checks](ENQUIRY-RELEASE-CHECKS.md) for exact transport, attribution and consent conditions.

## Verification

- `npm test`: 25 passing tests, including the actual enquiry route with mocked upstream requests, concurrent replay, invalid receipt handling, source sanitisation and project publication selection. No production writes.
- `npm run lint`: repository lint passed.
- `npm run build`: production compilation, TypeScript and static generation passed. The known Portal project 404 is logged and handled.
- `node scripts/smoke-rebuild.mjs`: 21 public pages return 200 with one H1 and their canonical URL; six legacy redirects, package anchors, internal route references, sitemap privacy exclusions and a true unknown-route 404 pass.
- Homepage first-party script payload measured at approximately 189KB gzipped in the local production build, below the chosen 250KB target. This is a payload check, not a field Core Web Vitals result.
- Browser checks: desktop homepage/pricing/contact; mobile home/service/contact at 390px; pricing at 320px without horizontal overflow; mobile service navigation; invalid email remains invalid and focuses its field; service preselection; example journey changes state; rejected analytics and footer preference reopening. Full Safari/iOS and assistive-technology acceptance remains a launch check.

## Source and publishing notes

Implementation starts from `origin/main` at `817f5c8` in a separate worktree. The user's `Kyle/ingenium-website-storefront` branch, its additional storefront commit and untracked local files were preserved. They are not included in this rebuild commit.

Public pricing follows the user-authorised rebuild plan as scoped proposal starting points. Actual project terms are confirmed in writing. The public form retains a required acknowledgement of the privacy notice for compatibility; this does not establish a legal basis. Company name and marketing preference remain optional. The `service` URL parameter is separate from the intake `intent` field.

Planning snapshots are retained for context. Where earlier drafts conflict, this implementation uses the canonical routes/CTA labels, EUR 2,000/5,000/10,000 budget boundaries, one-page form and 250KB first-party JavaScript target from the main rebuild specification. No unsupported operational assertion should be copied from a planning note into a public component.
