# Ingenium Content Quality Audit

## Scope and evidence sources
- Scored target: `https://www.ingeniumconsulting.net` as observed on May 7, 2026.
- Cross-check files: `app/(website)/services/page.tsx`, `app/(website)/platform/page.tsx`, `app/(website)/websites/page.tsx`, `app/(website)/crm/page.tsx`, `app/(website)/ai-agents/page.tsx`, `app/(website)/automations/page.tsx`, `app/(website)/security/page.tsx`, `app/(website)/privacy/page.tsx`, `app/(website)/support/page.tsx`, `src/lib/caseStudies.ts`, `src/lib/projects.ts`, `app/(website)/components/AnimatedMetric.tsx`.

## Overall score and letter grade
- Score: 66/100
- Grade: D

## Rubric breakdown
- Usefulness and originality: 17/25
- Evidence quality and factual discipline: 10/20
- Page-type discipline and completeness: 14/20
- YMYL and governance controls: 13/20
- AI provenance and measurement restraint: 12/15

## Executive summary
- The copy is clean, brand-consistent, and more original than generic agency filler.
- The main content weakness is that too much of the site stops at positioning language. It explains the offer, but often does not provide enough proof, decision detail, or operational evidence to satisfy high-intent evaluation.

## What is good
- The site has a clear point of view and does not read like interchangeable AI sludge.
- Named case studies and named team members are materially better than anonymous agency copy.
- Policy and support pages include visible “Last reviewed” dates.

## Findings by severity
- High: service pages are thin for high-consideration commercial intent.
- High: proof pages do not provide enough hard evidence, and some proof numbers degrade to zero in server HTML.
- Medium: the content model repeats the same card-and-tag pattern across too many page types.
- Medium: decision pages lack stronger authorship, review, and freshness cues.

## Detailed issue inventory with evidence
- Thin service content.
- Evidence: live service pages commonly fall between `209` and `322` words and rely on short hero copy, short answer blocks, and card grids.
- Why it matters: a B2B buyer looking for CRM, automation, or AI implementation support needs more than offer labeling.
- Best-practice recommendation: add sections for scope, qualification, implementation expectations, non-fit scenarios, common risks, and proof tied to outcomes.

- Weak proof evidence density.
- Evidence: live case-study pages are named and helpful, but the surfaced metrics are mostly qualitative counts such as route counts and brand pages, and the `AnimatedMetric` component can render those values as `0` in the server HTML.
- Why it matters: proof that disappears or softens in HTML is not reliable proof for either users or retrieval systems.
- Best-practice recommendation: publish stable, server-rendered metrics and add more business-outcome context, for example conversion improvement, sales-process clarity, lead quality, or operational efficiency where defensible.

- Repeated content patterning.
- Evidence: many pages reuse the same sequence of short hero, short answer block, card grid, and CTA panel with limited page-type differentiation.
- Why it matters: the writing stays clean, but the informational value plateaus quickly because the format does not force deeper specificity.
- Best-practice recommendation: adapt format to page type. Service pages need evaluation detail, proof pages need evidence and outcomes, trust pages need corroboration, and intake pages need expectation-setting.

- Limited governance cues on decision pages.
- Evidence: policy pages carry review dates, but core commercial pages do not expose reviewer, author, or update cues even when they discuss governance-heavy topics.
- Why it matters: for technical, workflow, and trust-sensitive services, governance signals should not be isolated only to policy pages.
- Best-practice recommendation: add page ownership, last-reviewed signals, or reviewer context to the pages where those claims are most commercially relevant.

## Improvement roadmap
- Quick wins: add privacy and review context near forms; server-render real proof numbers; strengthen case-study evidence blocks.
- Moderate effort: expand each service page into a fuller decision-support page type.
- Strategic work: create a proof-content model that separates narrative, evidence, outcome, and implementation detail instead of compressing everything into card stacks.

## Best practices, how-tos, dos, don'ts, tips, and tricks
- Do keep the current voice. It is clearer and more distinct than average.
- Do turn vague “why it matters” statements into operational specifics.
- Do surface first-hand implementation evidence where possible.
- Do not let proof depend on client animation.
- Do not assume policy pages alone solve trust-sensitive content quality.
- Tip: when a section claims an operational improvement, add one visible artifact or example that proves it.

## Open questions and measurement caveats
- I did not have access to confidential client outcome data, so I cannot tell whether harder commercial proof exists off-site or in sales collateral.
- The workspace suggests the proof model is actively changing, so some live proof weaknesses may reflect deployment lag rather than absent intent.

