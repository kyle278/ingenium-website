# Ingenium AEO Audit

## Scope and evidence sources
- Scored target: `https://www.ingeniumconsulting.net` as observed on May 7, 2026.
- Cross-check files: `lib/seo.ts`, `app/llms.txt/route.ts`, `app/(website)/services/page.tsx`, `app/(website)/platform/page.tsx`, `app/(website)/websites/page.tsx`, `app/(website)/crm/page.tsx`, `app/(website)/ai-agents/page.tsx`, `app/(website)/automations/page.tsx`, `app/(website)/contact/IntakePathPage.tsx`, `app/(website)/components/AnimatedMetric.tsx`.

## Overall score and letter grade
- Score: 71/100
- Grade: C

## Rubric breakdown
- Answer extractability and passage clarity: 18/25
- Question-intent coverage and format fit: 14/20
- Structured data and answer-surface eligibility: 14/20
- Accessibility and comprehension: 16/20
- Entity, trust, and measurement discipline: 9/15

## Executive summary
- The site is trying to be answer-friendly. Several pages lead with direct-answer headings, and `llms.txt` is a real strength.
- The weakness is depth and structure. Answers are usually short, prose-heavy, and card-based rather than semantically chunked into extractable lists, tables, and richer Q&A coverage.

## What is good
- `llms.txt` exists and gives a strong summary of entity, offer, audience, and core routes.
- Core service pages use direct-answer headings like “What does Ingenium do?” and “What is the Ingenium platform?”
- Intake pages include visible FAQ content.

## Findings by severity
- High: service pages answer too briefly for high-value questions.
- High: extractable structures are weak; the sampled service pages use zero semantic lists or tables.
- Medium: answer coverage is concentrated on intake pages instead of the core commercial pages.
- Medium: proof metrics are unreliable in server HTML because they render as `0` before client animation.
- Low: live bot allowances are narrower than the workspace suggests they could be.

## Detailed issue inventory with evidence
- Thin answer blocks on money pages.
- Evidence: live `/websites`, `/crm`, `/ai-agents`, and `/automations` each land around `250` to `270` words with only two H2 sections after the hero.
- Why it matters: answer engines need more than a slogan plus a short paragraph when the query class is comparative or operational.
- Best-practice recommendation: expand each page with direct sections for who it is for, who it is not for, what inputs are required, what changes after implementation, what success looks like, and what common risks exist.

- No semantic lists or tables on sampled core service pages.
- Evidence: live HTML checks found `0` `<ul>`, `0` `<ol>`, and `0` `<table>` elements on sampled service pages despite content that is visually list-like.
- Why it matters: card grids are readable to humans, but retrieval systems and accessibility tools get cleaner signals from proper list and table structures.
- Best-practice recommendation: convert repeated div-card enumerations into semantic lists where appropriate, and use comparison tables for service fit, rollout paths, or evaluation criteria.

- FAQ coverage is not where it is most needed.
- Evidence: the demo, teardown, and technical-review routes expose FAQs, but the main service pages do not build out question clusters beyond one short “What is…” section.
- Why it matters: answer surfaces are often won on the main commercial pages, not only on lead-capture routes.
- Best-practice recommendation: bring focused question clusters onto the service pages themselves and keep them visibly supported by the surrounding content.

- Proof numbers are not reliably extractable.
- Evidence: `app/(website)/components/AnimatedMetric.tsx` starts at progress `0`; live HTML on case-study pages exposes values like “0 Live routes” before client animation runs.
- Why it matters: important proof facts are degraded for bots, no-JS users, and any system that reads the server HTML first.
- Best-practice recommendation: server-render the final metric value and animate from that value visually, rather than replacing the initial HTML with zeroes.

- Live `robots.txt` is less AI-surface-friendly than the workspace.
- Evidence: live `robots.txt` explicitly allows `OAI-SearchBot` and `GPTBot`, while the workspace version also includes `ChatGPT-User`, `ClaudeBot`, and `PerplexityBot`.
- Why it matters: not all answer surfaces behave the same way, and narrower allowances reduce distribution options.
- Best-practice recommendation: deploy the broader bot-allow policy if it matches your intended discovery posture.

## Improvement roadmap
- Quick wins: add semantic lists and tables; render final proof numbers in HTML; deploy broader AI-bot allowances if desired.
- Moderate effort: expand service pages into richer question clusters with scannable answer blocks.
- Strategic work: build a reusable answer-surface component set for comparison, definitions, fit checks, rollout expectations, and proof summaries.

## Best practices, how-tos, dos, don'ts, tips, and tricks
- Do keep `llms.txt`; it is one of the strongest AEO assets on the site.
- Do answer questions early and directly, then support the answer with proof and qualification detail.
- Do use visible structure, not only visual structure.
- Do not rely on animated client rendering for business-critical facts.
- Do not keep the best Q&A content only on the form-entry pages.
- Tip: if a section is logically a list, publish it as a list so both users and retrieval systems can parse it cleanly.

## Open questions and measurement caveats
- I did not have answer-engine impression data, so this score is based on readiness rather than observed citation frequency.
- Some live AEO issues, especially bot handling and proof architecture, appear to be partly improved in the workspace but not fully deployed.

