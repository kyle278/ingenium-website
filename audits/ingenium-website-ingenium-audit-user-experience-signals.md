# Ingenium User Experience Signals Audit

## Scope and evidence sources
- Scored target: `https://www.ingeniumconsulting.net` as observed on May 7, 2026.
- Cross-check files: `app/globals.css`, `app/(website)/components/SiteNav.tsx`, `app/(website)/components/ScrollReveal.tsx`, `app/(website)/components/AnimatedMetric.tsx`, `components/ui/hero-1.tsx`, `app/(website)/contact/ContactForm.tsx`.

## Overall score and letter grade
- Score: 76/100
- Grade: C

## Rubric breakdown
- Core Web Vitals and field performance: 20/30
- Mobile and accessibility parity: 15/20
- Friction, interstitials, and ad interference: 15/20
- Content clarity and interaction quality: 13/15
- Measurement discipline and frontend edge cases: 13/15

## Executive summary
- The site is visually clean, readable, and not overloaded with ads or modal spam. That keeps the UX baseline respectable.
- The weaker areas are information-discovery UX, semantically thin content structures, and frontend behaviors that look polished but reduce robustness for bots, no-JS users, and low-friction navigation.

## What is good
- Public pages are mostly static, which is a positive starting point for performance.
- Forms use labels and a simple two-step pattern rather than giant all-in-one walls.
- Reduced-motion handling exists in `ScrollReveal` and the global CSS.

## Findings by severity
- High: major destination pages are not discoverable in the initial HTML nav.
- Medium: the frontend relies on many client chunks relative to how text-heavy the pages are.
- Medium: semantic list and table structures are largely absent.
- Medium: form trust and expectation cues are light at the point of submission.
- Low: contact-page operational status text is overly internal for public UX.

## Detailed issue inventory with evidence
- Hidden navigation destinations.
- Evidence: live anchor-graph checks showed zero inbound anchor links to `/websites`, `/crm`, `/ai-agents`, `/automations`, and `/team`; `app/(website)/components/SiteNav.tsx` conditionally renders child links only when dropdown state is open.
- Why it matters: this is not just crawl debt. It is also weak discovery UX for users who do not explore the dropdown state deeply.
- Best-practice recommendation: keep the dropdown, but include persistent visible anchors to major subpages on desktop and mobile.

- Heavy client scripting relative to page depth.
- Evidence: local production HTML for core pages carried dozens of script tags and chunk references even on simple marketing pages.
- Why it matters: this does not prove poor field CWV by itself, but it raises the performance bar the site needs to clear in real-world conditions.
- Best-practice recommendation: keep animation client code lean, avoid unnecessary client wrappers around static content, and prioritize server-rendered facts over client-only polish.

- Non-semantic information structures.
- Evidence: sampled service pages use zero semantic lists or tables even when they present enumerations, process steps, and comparisons.
- Why it matters: semantic weakness reduces accessibility quality and makes content harder to scan programmatically.
- Best-practice recommendation: use real lists, step lists, and tables where the content is structurally list-like.

- Low-friction trust around forms is underdeveloped.
- Evidence: public intake pages show the form quickly, but there is no strong adjacent privacy/processing cue beside submission, and `ContactForm.tsx` ends with a simple email line rather than a clearer data-use reassurance.
- Why it matters: for higher-consideration B2B submissions, reassurance near the CTA reduces hesitation.
- Best-practice recommendation: add a short privacy and response-expectation note beside the submit action with a link to the relevant policy page.

- Internal status copy in public UI.
- Evidence: live `/contact` exposes “Portal form status: Contact Form is resolving correctly.”
- Why it matters: it is not catastrophic, but it reads like operational telemetry rather than user-facing guidance.
- Best-practice recommendation: hide system-health status from public users or translate it into normal user-facing copy.

## Improvement roadmap
- Quick wins: expose key nav links in initial HTML; add privacy and response cues beside form submits; remove public ops-status phrasing.
- Moderate effort: replace div-card pseudo lists with semantic structures and reduce client overhead around static sections.
- Strategic work: validate field CWV with real-user data and adjust animation/runtime choices based on actual performance, not lab guesses.

## Best practices, how-tos, dos, don'ts, tips, and tricks
- Do keep the clean visual hierarchy and limited-friction CTA approach.
- Do treat accessibility and crawlability as part of UX, not as separate checklists.
- Do design the server HTML to stand on its own before client enhancement.
- Do not animate business-critical facts from zero.
- Do not hide major destinations in interaction-only states.
- Tip: if content is important enough to rank and convert, it is important enough to exist semantically in the initial document.

## Open questions and measurement caveats
- I did not have CrUX or RUM data, so the score uses implementation evidence rather than observed field vitals.
- Local resilience failures on intake pages were environment-specific and are not breaking the live site today, but they still indicate fragile UX fallback behavior.

