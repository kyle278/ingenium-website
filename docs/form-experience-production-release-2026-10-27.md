# Form experience production release — 27 October 2026

Promoted to https://www.ingeniumconsulting.net using the user's form-experience skill and existing design system.

| Release | Deployment |
| --- | --- |
| Current | `dpl_9vFNY9iyQrsfgHQ9uLcm1qwF8x4w` — https://ingenium-website-3l00ftwgs-kyle278s-projects.vercel.app |
| First verified forms release | `dpl_CqpwZ2XPfxfYzqzbPAVUjwgWLixC` — https://ingenium-website-au88cexrt-kyle278s-projects.vercel.app |
| Pre-forms rollback target | `dpl_9zXjX39qiHY3CGZ14e9saTuQSW6J` — https://ingenium-website-5dxd76u8m-kyle278s-projects.vercel.app |

Complete source: `C:/Users/kyler/Desktop/Projects/ingenium-website-rebuild-release-20261027`, branch `form-experience-release-20261027`, application commit `48521ca`. Source changes were copied to the original workspace only after checking for conflicting concurrent edits. No unrelated campaign/video work was deployed. Later documentation commits do not change the application artifact.

## Implemented

The visibility request, generic enquiry component (including technical review and systems teardown), template-access gate, private website brief and reusable retired Starter dialog now use the shared guided form. The callback remains a phone-led journey and has the same inline privacy-settings action. Separate names are required end to end, and the server rejects missing independent names. Email is required for the emailed response/report journeys; callback phone remains required, with conditional email only for an optional email-marketing opt-in.

Every first-party lead route ends on two independent, initially unchecked native-checkbox cards: required Privacy Policy acknowledgement/link and optional purpose-specific marketing consent. Policy links do not toggle acknowledgement or discard answers. Consent does not advance or submit. Final action, real receipt validation, Back, failure recovery, request references, consent evidence and safe attribution are retained. There is no review page or repeated answer summary.

The private brief's essential field aliases and accuracy declaration are preserved. Its transport now uses `/api/enquiry`, and the obsolete document-level brief submit listener has been removed. Branch changes clear and omit obsolete URLs/Other text. Existing request-reference storage keys are retained; the measured Starter fill time remains stable on uncertain retries without inventing an elapsed value.

The question/field assessment, removals, purpose and destination map, and layout exceptions are in [FORM-EXPERIENCE-REBUILD.md](FORM-EXPERIENCE-REBUILD.md). Blog search remains a single labelled native GET search with an explicit Search action; it does not create a lead or collect marketing consent. The private brief remains access-protected. The old Starter URL still redirects, and the temporary local verification route was removed before deployment.

## Verification

- All **80** automated tests pass, including shared journey handlers, branch invalidation, contact requirements, separate Unicode names, consent, accepted receipts, duplicate guards, uncertain failures and stable Starter retry timing.
- Local and Vercel production builds pass. Changed form/tracking files lint without errors. The Blog's existing remote-cover `<img>` warning is unchanged.
- Local browser coverage includes **63** screen/viewport observations at 1440×1000, 390×844 and 375×667, including the protected brief and retired dialog via an unshipped fixture. No page errors or horizontal overflow remain. The only blocked non-enquiry POSTs were three local Next development stack-frame diagnostics, identified separately from lead transport.
- The complete keyboard enquiry, actual double-click choice and held-Enter protections pass. Reduced motion, 200% text, native required fields, policy-link independence, consent-card text/padding/Space activation, Back/edit, invalid contact, failure/retry and absence of personal details in browser storage are checked. This is not a manual screen-reader or physical mobile-keyboard certification.
- The existing callback suite passes desktop/mobile, enlarged text, phone-only requests, optional marketing email, retry handling and all four package routes.
- Staged production browser coverage passes **39** public form screens, without page errors or layout issues. Public checks after promotion cover the enquiry/report/template flows, callback, packages, homepage, Blog, all seven project previews and canonical redirects.
- Production-origin invalid requests receive 422 for missing independent names and missing callback phone before any upstream lead operation. Search submits its expected GET query. Private intake and the removed fixture return 404 without authorised private access.
- Portal editor generation **5**, `7c303ef2-c11b-497f-8996-afd52d95d080`, published overrides, preview aliases, signed refresh, managed SEO and Blog remain intact. No Portal content, connection secret or account ownership was reset.

Browser enquiry requests use intercepted responses and create no real leads, emails or appointments; they do not prove downstream Portal delivery. The existing server-owned adapter and canonical form slugs remain in use. The optional project-feed 404 is unchanged and unrelated to these forms.

Evidence is in the original workspace's `.codex-preview`: `all-forms-local-verification.json`, `all-forms-staged-verification.json`, `all-forms-live-verification.json`, `forms-keyboard-verification.json`, `forms-call-journey-verification.json`, `form-release-probe.json`, screenshots and `forms-promoted-deployment.json`.
