# Ingenium Website Engine Optimisation Redesign Memo

## Why Slight Improvement Is Insufficient

The slight improvement pass fixed crawl/index drift, sitemap coverage, model-facing summaries, crawler access, and answer-first copy on priority service pages. Those changes improve readiness, but they do not solve the deeper information architecture and trust-system issues identified in the audit.

The second improvement pass also handled the safest remaining quick wins: `/departments` now redirects to `/services`, sitemap `lastModified` values no longer use generation time, core service pages include fit/non-fit decision blocks, and `/security` has a more explicit data-handling section. These are useful improvements, but they still do not replace a true route registry, proof model, policy layer, or measurement program.

The remaining work requires structural decisions: which proof hub is canonical, which support and trust pages should exist, how service pages should consistently answer commercial and answer-engine intents, and how route metadata should be governed from one source of truth.

## Pages or Templates Affected

- `/case-studies`
- `/case-studies/[id]`
- `/projects`
- `/projects/[slug]`
- `/services`
- `/platform`
- `/websites`
- `/crm`
- `/ai-agents`
- `/automations`
- `/security`
- `/about`
- `/team`
- Future policy/support pages
- Shared route metadata, sitemap, nav, and structured-data systems

## Required Redesign Moves

- Choose a canonical proof architecture: case studies only, projects only, or a deliberate two-hub model with distinct search purposes.
- Create a service-page content model with reusable sections for definitions, direct answers, use cases, fit/non-fit, implementation steps, risks, comparison tables, FAQs, and proof links.
- Create a trust and policy layer with privacy, terms, data handling, support process, security review, implementation methodology, and AI governance pages.
- Move route metadata, sitemap inclusion, nav eligibility, noindex rules, and structured data page type into one shared route registry.
- Consider moving structured data generation to a server-side pattern so JSON-LD is controlled without depending on client route detection.

## Content, IA, Component, or Workflow Changes Needed

- Rewrite proof pages around evidence: context, constraint, method, delivered scope, dates, outcomes, caveats, and related service links.
- Add article-like provenance fields to case-study/project records where accurate: created/updated dates, method, client sector, services, and visible outcome evidence.
- Add comparison tables to commercial pages where users evaluate alternatives.
- Expand the new fit/non-fit sections into a full service-page answer system with comparison criteria, implementation steps, FAQs, and proof links.
- Add support and policy links to footer and trust pages once those pages exist.
- Add a route QA workflow that fails builds when a public nav item points to a noindexed route or an indexable dynamic route is missing from the sitemap.

## Risks, Dependencies, and Sequencing

- Proof consolidation may require redirects or canonical decisions to avoid splitting existing discovery signals.
- Policy pages need accurate legal and operational input before publication.
- Bot policy needs business approval because search discovery, user-triggered fetch, and training access are different choices.
- New structured data should be validated against visible content to avoid inflated or misleading schema.
- Sequence should be: route registry, proof architecture, trust/policy pages, service-page content system, then measurement instrumentation.
