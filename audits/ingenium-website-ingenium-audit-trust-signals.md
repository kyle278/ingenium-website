# Ingenium Trust Signals Audit

## Scope and evidence sources
- Scored target: `https://www.ingeniumconsulting.net` as observed on May 7, 2026.
- Cross-check files: `app/(website)/about/page.tsx`, `app/(website)/team/page.tsx`, `app/(website)/security/page.tsx`, `app/(website)/privacy/page.tsx`, `app/(website)/support/page.tsx`, `app/(website)/components/PolicyPage.tsx`, `app/(website)/contact/ContactForm.tsx`, `app/(website)/contact/page.tsx`, `app/(website)/components/RouteStructuredData.tsx`, `lib/portalIntegration/server.ts`, `lib/portalIntegration/config.ts`.

## Overall score and letter grade
- Score: 63/100
- Grade: D

## Rubric breakdown
- Identity and accountability clarity: 15/25
- Evidence and legitimacy cues: 13/20
- External reputation and consistency: 8/20
- Page-type trust fit: 15/20
- Measurement restraint and diagnostic rigor: 12/15

## Executive summary
- The site is ahead of many small B2B sites because it has named people, policy pages, support pages, and a dedicated security surface.
- The trust layer is still too self-asserted. Decision pages do not provide enough verifiable business identity, proof, or external corroboration for the seriousness of the offer.

## What is good
- The team is named.
- The site exposes privacy, support, data-handling, and security-review pages.
- Case studies are named rather than anonymous.

## Findings by severity
- High: accountable business identity is still too thin on decision pages.
- High: trust-heavy claims are not consistently paired with concrete visible proof.
- Medium: form flows lack strong privacy and processing reassurance near submission.
- Medium: public operational status copy is exposed, and local code would leak raw config errors if the portal breaks.

## Detailed issue inventory with evidence
- Thin accountable identity on money pages.
- Evidence: the live site exposes email and named staff, but not a visible business address, phone number, company-registration detail, or external business profile set on key decision pages.
- Why it matters: a buyer evaluating CRM, automation, AI, and governance services expects clearer accountability than a basic brochure site.
- Best-practice recommendation: add fuller business identity details on trust-sensitive pages and in the footer or contact surface.

- Trust claims outrun visible proof.
- Evidence: pages talk about audit history, governance, approvals, and trust, but the decision pages do not surface strong artifacts such as documented guarantees, implementation evidence, certifications in context, or linked external corroboration.
- Why it matters: trust claims without accompanying proof ask the user to take the brand’s word for it.
- Best-practice recommendation: pair each major trust claim with visible supporting evidence, for example named documentation packs, process artifacts, sample review deliverables, or verified external references where available.

- Weak reassurance at submission points.
- Evidence: `app/(website)/contact/ContactForm.tsx` ends with an email line, but not a stronger privacy or data-use explanation near submit.
- Why it matters: a form collecting work email and challenge details should reassure the user at the point of action, not only in a separate policy page.
- Best-practice recommendation: add a short line near the CTA covering privacy, response times, and how the submitted information is used.

- Public ops-status and resilience risk.
- Evidence: live `/contact` exposes “Portal form status: Contact Form is resolving correctly.” In the workspace, `contact/page.tsx` would display the raw error string if portal resolution failed, and the intake pages can hard-fail when the form lookup is missing.
- Why it matters: operational internals should not become part of the public trust story, especially when the fallback behavior is fragile.
- Best-practice recommendation: keep public messaging user-focused and move operational health checks to internal monitoring or admin-only surfaces.

## Improvement roadmap
- Quick wins: add privacy reassurance beside submit actions; remove public form-status copy; improve footer/contact identity detail.
- Moderate effort: strengthen trust surfaces with visible proof artifacts and clearer expectation-setting.
- Strategic work: build a trust evidence system that connects team identity, policies, proof, governance claims, and review deliverables into one coherent layer.

## Best practices, how-tos, dos, don'ts, tips, and tricks
- Do keep the named team and policy pages; they are useful assets.
- Do bring trust evidence onto the pages where the buying decision happens.
- Do make privacy and response expectations explicit at form level.
- Do not treat trust as a site-wide halo effect that magically transfers onto every service page.
- Do not expose raw operational health states to public visitors.
- Tip: the best trust cue is usually a visible, concrete artifact tied to the exact promise being made.

## Open questions and measurement caveats
- I did not audit external reputation databases, review platforms, or company-registration records beyond what the site itself exposed.
- Some local resilience issues are not currently public on the live site, but they are still relevant implementation risks.

