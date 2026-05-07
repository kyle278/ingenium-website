# Ingenium Crawl and Index Signals Audit

## Scope and evidence sources
- Scored target: `https://www.ingeniumconsulting.net` as observed on May 7, 2026.
- Cross-check files: `app/robots.ts`, `app/sitemap.ts`, `app/(website)/components/SiteNav.tsx`, `app/(website)/agents/page.tsx`, `app/(website)/case-studies/[id]/page.tsx`, `lib/seo.ts`.

## Overall score and letter grade
- Score: 68/100
- Grade: D

## Rubric breakdown
- Crawl access and status handling: 18/25
- Indexing-state remediation: 17/25
- Canonical, duplicate, and international control: 14/20
- Refresh, recrawl, and cache honesty: 8/15
- Diagnostics and migration discipline: 11/15

## Executive summary
- The site is crawlable and mostly returns clean `200` responses on public routes, which prevents this from falling into failing territory.
- The score drops because the crawl graph is weaker than it should be, proof URLs are fragmented on the live site, and several index-control choices are low-discipline rather than deliberate.

## What is good
- Public pages sampled on the live site returned `200`.
- `robots.txt` and `sitemap.xml` are present and readable.
- The private brief route is at least flagged with `noindex, nofollow`.

## Findings by severity
- High: major commercial pages are absent from the server-rendered internal-link graph.
- High: live proof URLs are fragmented and partially orphaned.
- Medium: legacy `/agents` uses a temporary redirect instead of a permanent one.
- Medium: `/website-brief` uses a public `200` plus `Disallow` and `noindex` rather than access control.
- Medium: sitemap freshness and priority signals are low fidelity.

## Detailed issue inventory with evidence
- Zero inbound server-rendered anchors to key commercial child pages.
- Evidence: live anchor-graph checks showed `0` inbound anchor links to `/websites`, `/crm`, `/ai-agents`, `/automations`, and `/team`.
- Why it matters: sitemap discovery is not a substitute for normal crawl paths and internal-link support.
- Best-practice recommendation: expose those pages in crawlable server-rendered anchors from the main nav, footer, or relevant hub sections.

- Fragmented proof indexation on the live site.
- Evidence: live `/projects` is `noindex, nofollow, nocache`; live case-study detail pages return `200` with self-canonicals; indexable project detail pages return `200` and appear linked only from the noindex projects hub.
- Why it matters: proof content is split across surfaces with weak crawl pathways and inconsistent canonical intent.
- Best-practice recommendation: deploy one proof hierarchy and support it with clean canonicals, sitemap inclusion, and normal followable links.

- Temporary redirect on a legacy route.
- Evidence: live `/agents` returns `307` to `/ai-agents`, and the workspace uses `redirect()` in `app/(website)/agents/page.tsx`.
- Why it matters: a legacy path meant to consolidate value should not keep signaling as temporary.
- Best-practice recommendation: switch it to a permanent redirect and keep it stable.

- Public private-brief page with conflicting controls.
- Evidence: live `/website-brief` returns `200`, carries `noindex, nofollow, nocache`, and is also disallowed in `robots.txt`.
- Why it matters: if a route is genuinely private, access control is cleaner than relying on search directives. Also, `Disallow` can prevent some crawlers from seeing the `noindex`.
- Best-practice recommendation: protect the route behind auth or serve a non-public response. If it must stay public, remove `Disallow` and rely on `noindex`.

- Sitemap fidelity is weak.
- Evidence: the live sitemap stamps all listed URLs with the same `2026-04-16T11:29:29.070Z` timestamp, and important routes such as `/services`, `/demo`, `/technical-review`, `/revenue-systems-teardown`, `/about`, and `/team` sit at default-style priority `0.5`.
- Why it matters: sitemap hints do not have to be perfect, but obviously generic values reduce their usefulness.
- Best-practice recommendation: use page-specific last-modified values where possible and set priorities deliberately for key commercial routes.

## Improvement roadmap
- Quick wins: make `/agents` permanent; expose key child pages in server HTML; decide whether `/website-brief` is actually private or just noindexed.
- Moderate effort: clean up proof canonicals, sitemap coverage, and link pathways.
- Strategic work: align production with the newer proof-architecture direction already visible in the workspace.

## Best practices, how-tos, dos, don'ts, tips, and tricks
- Do use the sitemap as a supplement, not a crutch.
- Do keep crawl paths visible in the HTML a bot receives on first load.
- Do make private pages truly private if they contain sensitive or client-only workflows.
- Do not split proof across multiple indexable models without a canonical plan.
- Do not leave legacy redirects temporary unless they are actually temporary.
- Tip: if production and workspace disagree on canonical architecture, fix deployment discipline before adding more content.

## Open questions and measurement caveats
- I did not have Search Console Page Indexing or server-log data, so the audit cannot prove which URLs Google has chosen to exclude or cluster.
- The workspace already suggests a cleaner proof-canonical model than the live site currently shows.

