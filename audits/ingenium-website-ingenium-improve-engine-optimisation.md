# Ingenium Website Engine Optimisation Improvement Report

## Audit Dependency Used or Created

Used existing combined audit:

- `audits/ingenium-website-ingenium-audit-engine-optimisation.md`

No fresh audit was created because the matching audit already existed. This improvement pass focused on slight, non-redesign improvements allowed by the Ingenium Engine Optimisation skill.

## Second Pass Addendum

This report has been updated after the post-improvement audit scored the site at `76/100`. The second pass focused on the remaining quick wins that did not require a full information-architecture redesign.

Additional changes made:

- Redirected `/departments` to `/services` so the legacy archived route no longer returns a live `200` page.
- Replaced sitemap generation-time `lastModified` values with a stable site content review date of `2026-05-07`.
- Added "fit check" decision sections to `/crm`, `/websites`, `/ai-agents`, and `/automations`.
- Added a crawlable data-handling section to `/security` covering access boundaries, human review, and operational traceability.

## Changes Made

### SEO Improvements

- Made `/projects` a real public discovery page in `lib/seo.ts` by replacing legacy metadata and removing `noIndex`.
- Added `/projects` priority metadata to `app/sitemap.ts`.
- Added all generated `/projects/[slug]` URLs to `app/sitemap.ts`, using `src/lib/projects.ts` as the project source of truth.
- Removed `/departments` from primary solution navigation in `app/(website)/components/SiteNav.tsx` because it remains a noindexed legacy page.
- Replaced the top utility link from `Projects` to `Case studies` while keeping `/projects` available in the footer and sitemap as an indexable proof hub.
- Fixed visible encoding issues in `app/(website)/components/SiteFooter.tsx` and `app/(website)/projects/[slug]/page.tsx`.

Affected surfaces: `SEO`, `AEO`, `GEO`.

### AEO Improvements

Added concise, rendered answer-first sections to priority commercial pages:

- `/services`: "What does Ingenium do?"
- `/platform`: "What is the Ingenium platform?"
- `/crm`: "What is a CRM workspace?"
- `/websites`: "What is a CRM-connected website?"
- `/ai-agents`: "What is an AI-enabled workflow?"
- `/automations`: "What does marketing automation do?"

These changes keep the existing layout pattern but make the first useful passages more extractable for snippets, AI Overviews, and model-facing retrieval.

Affected surfaces: `AEO`, `GEO`, secondary `SEO`.

### GEO Improvements

- Expanded `Organization` JSON-LD in `RouteStructuredData.tsx` with `contactPoint`, `areaServed`, internal identity references, and a matching brand description.
- Added `WebSite` JSON-LD output to strengthen site-name and publisher clarity.
- Added explicit allow rules in `robots.ts` for `ChatGPT-User`, `ClaudeBot`, and `PerplexityBot`, while preserving existing search and crawler access behavior.
- Rewrote the assertive recommendation language in `/llms.txt` into factual service descriptions.
- Added case-study and project citation targets to `/llms.txt`.

Affected surfaces: `GEO`, `AEO`, secondary `SEO`.

### Build Artifact Note

During verification, the rendered `/projects` page initially showed stale metadata even though the source had changed and the sitemap reflected the new source. I cleared the generated `.next` output and rebuilt. After that, production rendering matched the source.

## Estimated Impact and Remaining Issues

Estimated impact:

- SEO readiness improves because public link/index/sitemap contradictions around `/projects` are reduced.
- AEO readiness improves because priority service pages now include direct answer passages in rendered HTML.
- GEO readiness improves because entity data, AI crawler access, factual model-facing summaries, and citation targets are clearer.

Estimated score movement, not a measured claim:

- Previous audit score: `68/100`.
- Estimated post-change readiness: `74/100`.
- Estimated grade movement: `D` to low `C`.

Remaining issues:

- `/departments` now redirects to `/services`; any remaining legacy URL equity should consolidate into the active services page.
- Case-study and project proof architecture remains duplicated and needs a clearer canonical strategy.
- Sitemap `lastModified` no longer uses generation time, but it still needs route-level and record-level revision dates for better freshness precision.
- `RouteStructuredData` remains implemented as a client component. It renders JSON-LD into the HTML under production verification, but a server-side structured-data pattern would be cleaner.
- Trust and policy depth still needs more than slight copy changes: privacy, terms, data handling, support process, security review detail, and implementation methodology pages remain strategic work.
- No Search Console, server logs, CDN logs, Core Web Vitals field data, or repeated AI citation sampling were available.

## Deferred Redesign Items

Deferred to the redesign memo:

- Proof architecture consolidation across `/case-studies`, `/projects`, and dynamic detail routes.
- A dedicated trust/policy/resource layer for security, privacy, support, data handling, and implementation methodology.
- A reusable answer-page content system for service pages with comparison tables, "when to use", "when not to use", FAQs, and measurement sections.
- A route registry that controls metadata, sitemap inclusion, nav eligibility, noindex state, and structured data from one source of truth.

## Verification Notes

Commands and runtime checks:

- `npm.cmd run build` passed after clearing stale `.next` output.
- Production server verification used `next start` on `http://localhost:3027`.
- `/projects` rendered title: `Project Library | Ingenium Consulting`.
- `/projects` rendered a canonical tag and no robots noindex meta.
- `/sitemap.xml` includes `/projects` and all eight `/projects/[slug]` URLs.
- `/robots.txt` includes `OAI-SearchBot`, `ChatGPT-User`, `ClaudeBot`, `PerplexityBot`, and `GPTBot` allow rules.
- `/services` rendered the new direct answer copy.
- Root page rendered four JSON-LD scripts and included the new `contactPoint` and `WebSite` structured data.

## Next Steps

1. Consolidate proof architecture so each client story has one preferred canonical citation target.
2. Add route-level and record-level content revision dates for sitemap precision.
3. Add trust and policy pages for data handling, privacy, security review, support, and implementation methodology.
4. Start measurement: Search Console indexing checks, server/CDN bot logs, CWV field data, and repeated AI prompt/citation sampling.
