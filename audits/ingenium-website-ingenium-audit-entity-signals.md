# Ingenium Entity Signals Audit

## Scope and evidence sources
- Scored target: `https://www.ingeniumconsulting.net` as observed on May 7, 2026.
- Cross-check files: `app/(website)/components/RouteStructuredData.tsx`, `app/(website)/about/page.tsx`, `app/(website)/team/page.tsx`, `app/llms.txt/route.ts`, `lib/seo.ts`, `src/lib/proofStories.ts`.

## Overall score and letter grade
- Score: 61/100
- Grade: D

## Rubric breakdown
- Source and accountable entity clarity: 16/25
- Visible proof and topic-entity precision: 11/20
- Schema and graph consistency: 10/20
- Delivery and generator integrity: 12/20
- Measurement restraint and ambiguity handling: 12/15

## Executive summary
- The core entity is recognizable: Ingenium Consulting / Ingenium Digital Consulting, with a consistent offer theme and a dedicated `llms.txt`.
- The entity layer is still too shallow. The graph lacks strong IDs, external references, and person-level markup, and some structured outputs are low-quality or inconsistent.

## What is good
- Naming is fairly consistent between brand and legal entity.
- `llms.txt` gives a coherent entity summary and route inventory.
- Team pages provide named people rather than anonymous roles.

## Findings by severity
- High: the organization graph is missing stronger linking primitives and external corroboration.
- Medium: breadcrumb schema quality is inconsistent and sometimes low quality.
- Medium: person/entity markup is underdeveloped.
- Medium: live and workspace proof architecture diverge, which weakens delivery consistency.

## Detailed issue inventory with evidence
- Thin organization graph.
- Evidence: `app/(website)/components/RouteStructuredData.tsx` builds `Organization`, `WebSite`, `WebPage`, and `Service` objects, but there is no stable `@id` graph strategy, `sameAs` is internal-only, and person-level schemas are absent.
- Why it matters: entity understanding improves when the graph is stable, connected, and corroborated, not just present.
- Best-practice recommendation: add stable `@id` values, expand `sameAs` to real external identity targets, and connect page, site, organization, and person nodes consistently.

- Low-quality breadcrumb labels.
- Evidence: the route label map omits several public routes, so breadcrumb names can fall back to raw slugs; live home breadcrumb output even includes an extra `index` item.
- Why it matters: sloppy structured output weakens the quality of the entity graph and can create avoidable ambiguity.
- Best-practice recommendation: map every public route explicitly and validate production breadcrumb JSON-LD after deploy.

- Team page lacks person markup.
- Evidence: live `/team` has named people, roles, and emails, but sampled JSON-LD types remain generic page-level types rather than `Person` or profile-oriented schemas.
- Why it matters: visible people are one of the strongest entity assets on the site, and they are underused structurally.
- Best-practice recommendation: add person/profile markup with role, organization, email or contact route, and external profile links where appropriate.

- Delivery inconsistency between production and workspace.
- Evidence: the workspace tries to consolidate case studies into canonical project records, while the live site still ships live case-study detail pages and a different proof architecture.
- Why it matters: entity signals are not only about what the code intends; they depend on what production actually publishes consistently.
- Best-practice recommendation: align production with the intended canonical entity model and stop splitting proof records across parallel URL systems.

## Improvement roadmap
- Quick wins: fix breadcrumb labels and add stable schema IDs.
- Moderate effort: add person/profile markup and external `sameAs` targets for the organization and key people.
- Strategic work: unify the proof and case-study entity model so the same client/project story is not represented multiple conflicting ways.

## Best practices, how-tos, dos, don'ts, tips, and tricks
- Do keep legal-name clarity alongside the public brand.
- Do connect entity nodes with durable IDs.
- Do use named people as entity-strength assets, not just visual trust content.
- Do not rely on internal-only `sameAs` links.
- Do not assume that “having schema” is the same as “having a strong entity graph.”
- Tip: if a page is about a person, project, or organization, publish both visible proof and graph-level proof for the same entity.

## Open questions and measurement caveats
- I did not inspect external knowledge-panel or rich-result behavior, because those are weak diagnostics for true entity strength on their own.
- Some entity issues may already be partly addressed in the workspace but are not yet reflected in production.

