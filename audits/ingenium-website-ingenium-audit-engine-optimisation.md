# Ingenium Website Engine Optimisation Audit

## Scope, Target, and Evidence Sources

Target audited: `ingenium-website`, a Next.js 16 App Router website in `C:\Users\kyler\Desktop\Projects\ingenium-website`.

Audit date: 2026-05-07.

This is the post-improvement audit requested after the `ingenium-improve-engine-optimisation` pass.

Evidence inspected:

- Source code: `lib/seo.ts`, `app/robots.ts`, `app/sitemap.ts`, `app/llms.txt/route.ts`, `app/(website)/layout.tsx`, `app/(website)/components/SiteNav.tsx`, `app/(website)/components/RouteStructuredData.tsx`, service pages, project pages, case-study pages, and supporting data files.
- Runtime outputs from local production server on `http://localhost:3027`: `/`, `/services`, `/platform`, `/crm`, `/websites`, `/ai-agents`, `/automations`, `/about`, `/projects`, `/departments`, `/internal/revenue-calculator`, `/robots.txt`, `/sitemap.xml`, and `/llms.txt`.
- Verification commands: `npm.cmd run lint` and `npm.cmd run build`, both passing after improvements.
- Research standard: bundled Ingenium SEO, AEO, and GEO 2026 research notes, AEO/GEO diagnostics checklists, output contract, and topic rubric.

Unavailable evidence:

- No Search Console, Bing Webmaster Tools, server logs, CDN logs, Core Web Vitals field data, AI citation samples, or answer-engine referral analytics were available. Measurement-related conclusions remain readiness assessments, not observed visibility claims.

## Method Summary

I ran three explicit passes:

1. `SEO`: crawl/index status, metadata, canonical coverage, sitemap coverage, internal linking, structured data, status behavior, route inventory, and rendered output.
2. `AEO`: direct-answer visibility, question-led headings, passage extractability, snippet eligibility, entity clarity, and answer-format coverage.
3. `GEO`: AI crawler access, source clarity, citation target readiness, model-facing summaries, entity consistency, provenance, and measurement readiness.

Findings were merged into one cross-surface issue matrix so root causes are not duplicated across SEO, AEO, and GEO.

## Overall Score and Letter Grade

Overall score: **76/100**

Letter grade: **C**

The improvement pass materially fixed the largest technical contradictions from the first audit. `/projects` is now indexable, project detail routes are in the sitemap, public navigation no longer points to `/departments`, AI crawler access is clearer, JSON-LD source identity is stronger, and priority service pages now expose answer-first passages.

The site is now in acceptable technical shape for a small commercial website, but it is not yet strong. The remaining score drag comes from proof architecture duplication, shallow trust/policy depth, generic proof-page provenance, incomplete answer-page formats, generation-time sitemap dates, and missing measurement.

## Component Scores

| Component | Score | Summary |
| --- | ---: | --- |
| SEO | 82/100 | Clean build, canonical metadata, indexable `/projects`, project sitemap coverage, crawler-friendly rendering, and improved nav alignment. Remaining issues are route governance, noindexed legacy pages that still return `200`, generic proof schema, and sitemap freshness. |
| AEO | 72/100 | Priority service pages now have direct answer blocks in rendered HTML. Remaining gaps are thin FAQ/support coverage, limited comparison tables, weak "when to use / not use" sections, and proof pages that do not yet read like strong extractable evidence. |
| GEO | 72/100 | AI crawler rules, factual `/llms.txt`, citation target lists, and richer Organization/WebSite JSON-LD are positive. Remaining gaps are source provenance, proof-page evidence depth, bot-policy governance, and lack of repeated citation measurement. |

Weighted score: SEO 40%, AEO 30%, GEO 30%.

## Cross-Surface Issue Matrix

| ID | Issue | Severity | SEO | AEO | GEO |
| --- | --- | --- | --- | --- | --- |
| 1 | Proof architecture is still split across `/case-studies` and `/projects` without a canonical editorial model | High | Yes | Yes | Yes |
| 2 | Case-study and project pages still have weak provenance and generic schema | High | Yes | Yes | Yes |
| 3 | Trust and policy depth is not strong enough for CRM, automation, AI, and data-handling claims | High | Yes | Yes | Yes |
| 4 | Service pages now answer directly, but still lack deeper answer formats | Medium | Partial | Yes | Yes |
| 5 | Route governance remains manually distributed across metadata, sitemap, nav, and page files | Medium | Yes | Partial | Partial |
| 6 | Sitemap `lastModified` values use generation time, not content revision time | Medium | Yes | No | Partial |
| 7 | Legacy/private utility pages still return `200` with `noindex` rather than redirecting or being removed where appropriate | Medium | Yes | Partial | Partial |
| 8 | AI crawler access is permissive but governance and verification are not documented | Medium | No | No | Yes |
| 9 | `llms.txt` is useful but remains a non-standard discovery aid, not a proven GEO control | Low | No | Partial | Yes |
| 10 | No Search Console, log, CWV, or AI citation measurement is wired into the workflow | Medium | Yes | Yes | Yes |

## Detailed Findings by Severity

### High: Proof Architecture Is Still Split Across Case Studies and Projects

Affected surfaces: `SEO`, `AEO`, `GEO`.

Evidence:

- `/case-studies` and `/case-studies/[id]` exist and are indexed through the sitemap.
- `/projects` and `/projects/[slug]` now also exist as indexable public proof pages and are included in the sitemap.
- Some clients appear in both systems, such as Carlow Hearing, Kenny Construction, Holland Pianos, and Farrell Contract Cleaning.
- Runtime sitemap now includes both case-study detail routes and project detail routes.

Why it is a problem:

The improvement fixed discovery, but it did not decide the editorial relationship between case studies and projects. When two URL families cover the same client stories, search engines and answer engines may not know which URL should be the primary citation target. This creates duplicate-intent risk, weakens proof consolidation, and makes internal linking strategy harder to reason about.

Recommended fix:

- Define the proof model:
  - Case studies as outcome narratives, projects as portfolio records; or
  - Case studies only as canonical proof pages; or
  - Projects only as canonical delivery records.
- Add clear cross-links and canonical intent between related pages.
- If both stay, make each page type answer a different query class.
- Add a route-level proof registry that maps each client/story to one preferred citation target.

### High: Proof Pages Need Stronger Provenance and Schema

Affected surfaces: `SEO`, `AEO`, `GEO`.

Evidence:

- Dynamic project pages use `CreativeWork` schema.
- Case-study pages also use generic `CreativeWork` schema.
- Records include useful challenge, intervention, assets, stack, and metrics, but visible pages still lack consistent publish/update dates, method statements, caveats, before/after evidence, source ownership, and stronger article-like provenance.

Why it is a problem:

The site sells expertise-heavy implementation work. Proof pages are the strongest source of trust, but the current template still reads more like a portfolio showcase than a fully attributable case-study evidence page. AEO and GEO benefit from answerable, source-rich passages that make the claim, method, and evidence easy to extract.

Recommended fix:

- Add visible case-study provenance: date published, last updated, services delivered, implementation scope, method, constraints, and result caveats.
- Consider `Article` or `BlogPosting` structured data where the visible content supports it.
- Keep `CreativeWork` only where the page is primarily a delivered work sample.
- Add short "What changed", "How we did it", "Evidence", and "Limits of this result" sections.

### High: Trust and Policy Depth Is Still Thin

Affected surfaces: `SEO`, `AEO`, `GEO`.

Evidence:

- `/about`, `/team`, `/security`, and `/contact` exist and are indexable or discoverable.
- Runtime root page emits richer Organization/WebSite JSON-LD, including `contactPoint`.
- The site does not yet expose dedicated privacy, terms, data handling, support process, AI governance, implementation methodology, or security review detail pages.

Why it is a problem:

Ingenium offers CRM, marketing automation, AI workflows, and revenue operations. Those services imply customer data, permissions, workflow accountability, and technical governance. Generic trust copy is not enough for strong E-E-A-T-like trust legibility or GEO citation confidence. Answer engines and technical buyers need concrete, crawlable policy and process information.

Recommended fix:

- Add dedicated pages for privacy, terms, data handling, support, security review, implementation methodology, and AI governance.
- Link them from footer, `/security`, `/about`, and relevant service pages.
- Add structured data where appropriate, but keep it aligned with visible content.

## Detailed Issue Inventory

### 1. Split proof architecture

Severity: High.

Affected surfaces: `SEO`, `AEO`, `GEO`.

Evidence: Both `/case-studies/[id]` and `/projects/[slug]` are public and sitemap-listed. Multiple clients appear in both systems.

Why it is a problem: Duplicate proof URLs can split internal signals and confuse model-facing citation selection.

Recommended fix: Define canonical proof intent per story and add cross-links, canonical targeting, or consolidation.

### 2. Generic proof-page schema and weak evidence structure

Severity: High.

Affected surfaces: `SEO`, `AEO`, `GEO`.

Evidence: Project and case-study pages use `CreativeWork` schema and lack consistent visible dates, author/editor/reviewer fields, method notes, or caveats.

Why it is a problem: Proof pages are citation candidates, but current provenance is too light for high trust.

Recommended fix: Add article-like provenance and evidence sections, then update schema to match visible content.

### 3. Trust and policy pages are incomplete

Severity: High.

Affected surfaces: `SEO`, `AEO`, `GEO`.

Evidence: `/security` describes controls at a high level; no dedicated privacy, data handling, support, AI governance, or implementation methodology pages were found.

Why it is a problem: CRM and AI services need crawlable accountability signals, not only marketing reassurance.

Recommended fix: Publish dedicated trust/policy pages and link them from service and footer surfaces.

### 4. Service answer coverage is improved but incomplete

Severity: Medium.

Affected surfaces: `AEO`, `GEO`, partial `SEO`.

Evidence: Runtime checks confirmed direct-answer sections on `/services`, `/platform`, `/crm`, `/websites`, `/ai-agents`, and `/automations`. However, those pages still lack deeper answer structures such as comparison tables, "best for / not best for", FAQs, implementation checklists, and common mistakes.

Why it is a problem: Direct answer blocks are a strong first step, but answer surfaces often need more than a definition. Decision-support content improves extractability and trust.

Recommended fix: Add reusable answer modules by page type:

- "When to use this"
- "When not to use this"
- "Common mistakes"
- "How implementation works"
- "What to compare"
- FAQ answers outside critical hidden states

### 5. Route governance is still manually distributed

Severity: Medium.

Affected surfaces: `SEO`, partial `AEO`, partial `GEO`.

Evidence: Metadata lives in `lib/seo.ts`; sitemap generation lives in `app/sitemap.ts`; nav links live in `SiteNav.tsx` and layout/footer content; dynamic route records live in `src/lib/projects.ts` and `src/lib/caseStudies.ts`.

Why it is a problem: The improvement fixed current drift, but the system can drift again. A future route can be linked publicly while noindexed, or indexable while omitted from the sitemap.

Recommended fix: Create a shared route registry that controls indexability, sitemap inclusion, nav eligibility, page type, and canonical metadata from one source.

### 6. Sitemap freshness uses generation time

Severity: Medium.

Affected surfaces: `SEO`, partial `GEO`.

Evidence: Runtime `/sitemap.xml` gives every URL the same `lastmod` timestamp from the build/request generation time.

Why it is a problem: This can imply every page changed together and does not communicate content freshness accurately.

Recommended fix: Add per-route and per-record `updatedAt` values and emit those in `lastModified`.

### 7. Legacy and private utility pages return `200`

Severity: Medium.

Affected surfaces: `SEO`, partial `AEO`, partial `GEO`.

Evidence:

- `/departments` returns `200` with `noindex, nofollow, nocache`.
- `/internal/revenue-calculator` returns `200` with `noindex, nofollow, nocache`.
- Robots disallows `/internal/` and `/website-brief`.

Why it is a problem: Some noindexed utility routes are acceptable, but legacy public routes should either become useful, redirect, or be removed. Returning `200` for a dead legacy page keeps operational ambiguity alive.

Recommended fix: Redirect `/departments` to a relevant indexable page or rebuild it as an intentional page. Keep truly internal routes disallowed and unlinked.

### 8. AI crawler policy is clearer but not governed

Severity: Medium.

Affected surfaces: `GEO`.

Evidence: Runtime `/robots.txt` explicitly allows `OAI-SearchBot`, `ChatGPT-User`, `ClaudeBot`, `PerplexityBot`, and `GPTBot`.

Why it is a problem: Allowing bots is not the same as a governed policy. OpenAI, Anthropic, Perplexity, Bing, and Google have different crawler functions and product behaviors.

Recommended fix: Document the intended distinction between search discovery, user-triggered fetch, training, and preview permissions. Verify bot access in logs.

### 9. `llms.txt` remains a useful but non-standard aid

Severity: Low.

Affected surfaces: `GEO`, partial `AEO`.

Evidence: Runtime `/llms.txt` now gives factual service descriptions, key page links, case-study citation targets, and project citation targets.

Why it is a problem: The file is useful for model-facing clarity, but the bundled GEO research is explicit that no authoritative source proves `llms.txt` as a universal citation or ranking control.

Recommended fix: Keep it factual, maintain it alongside route changes, and do not treat it as a substitute for crawlable HTML, schema, and proof pages.

### 10. Measurement is still absent

Severity: Medium.

Affected surfaces: `SEO`, `AEO`, `GEO`.

Evidence: No Search Console, Bing AI Performance, server logs, CDN logs, CWV field data, answer-engine referral analytics, or repeated prompt samples were available.

Why it is a problem: GEO and AEO performance cannot be inferred from one build or one prompt. Visibility is stochastic and should be measured over time.

Recommended fix: Implement measurement:

- Search Console URL indexing and performance checks.
- Bot access logs by user agent.
- Core Web Vitals field data.
- Repeated AI prompt/citation sampling by branded, service, comparison, and support intent.
- Referral analytics for answer-engine sessions.

## Improvement Roadmap

### Quick Wins

- Redirect or rebuild `/departments`.
- Add per-record `updatedAt` values to `projects` and `caseStudies`.
- Add "when to use / when not to use" sections to `/crm`, `/websites`, `/ai-agents`, and `/automations`.
- Add footer links to existing trust pages and future policy pages.
- Add a route test that fails when a noindexed route appears in public nav.

### Moderate Effort

- Create a shared route registry for metadata, sitemap inclusion, noindex state, nav eligibility, and structured data type.
- Upgrade proof page templates with method, dates, evidence, caveats, and outcome context.
- Add comparison tables for service decision pages.
- Move JSON-LD generation toward a server-side pattern where feasible.
- Add `Article`/`BlogPosting` schema where proof pages become article-like and visible content supports it.

### Strategic Work

- Consolidate or clearly separate `/case-studies` and `/projects`.
- Build a trust center or resource layer for privacy, terms, data handling, security, support, implementation methodology, and AI governance.
- Establish a recurring AEO/GEO measurement program.
- Build a quarterly bot-policy and citation-target review process.

## Best Practices, How-Tos, Dos, Don'ts, Tips, and Tricks

### Best Practices

- Keep every indexable page discoverable through crawlable links and sitemap coverage.
- Keep one preferred citation target per proof story.
- Use answer-first page sections for service definitions and decision support.
- Match structured data to visible page content.
- Treat `llms.txt` as a map, not a ranking mechanism.
- Make trust and data-handling details crawlable.
- Measure AI visibility repeatedly rather than relying on one screenshot.

### How-Tos

- For proof pages: add `Problem`, `Constraints`, `Method`, `Delivered scope`, `Outcome`, `Caveats`, and `Related services`.
- For service pages: add direct answer, use cases, non-fit cases, implementation steps, comparison criteria, and FAQs.
- For sitemap hygiene: generate URLs only from canonical, indexable route records.
- For GEO measurement: sample prompt sets across branded, service, comparison, and support queries over multiple days.

### Do

- Do preserve snippet eligibility on pages expected to appear in answer surfaces.
- Do use concrete nouns and dates near claims.
- Do make organization identity visible in content and schema.
- Do keep AI crawler permissions intentional and documented.
- Do keep proof pages specific and source-rich.

### Don't

- Do not let multiple pages chase the same proof/query intent without canonical strategy.
- Do not use broad noindex/nofollow on pages linked from public nav.
- Do not treat schema as a substitute for visible evidence.
- Do not overclaim GEO performance without repeated measurement.
- Do not let stale build artifacts or generated outputs substitute for fresh runtime checks.

## Open Questions and Measurement Caveats

- Which proof URL should be canonical for each client story?
- Should `/departments` redirect, be deleted, or be rebuilt?
- What bot policy does the business actually want for search discovery versus training?
- Are there legal-approved privacy, data handling, terms, and AI governance statements ready to publish?
- Does production Search Console confirm Google-selected canonicals match the intended URLs?
- Do server/CDN logs confirm access from Googlebot, Bingbot, OAI-SearchBot, ChatGPT-User, Claude, and Perplexity?
- What are the target AI/search query sets for recurring measurement?
- No field performance or AI citation data was available, so the score reflects readiness, not observed ranking or citation share.
