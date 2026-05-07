# Ingenium SEO Audit

## Scope and evidence sources
- Scored target: `https://www.ingeniumconsulting.net` as observed on May 7, 2026.
- Cross-check files: `app/layout.tsx`, `app/robots.ts`, `app/sitemap.ts`, `app/(website)/components/SiteNav.tsx`, `app/(website)/components/RouteStructuredData.tsx`, `lib/seo.ts`, `src/lib/caseStudies.ts`, `src/lib/projects.ts`.

## Overall score and letter grade
- Score: 74/100
- Grade: C

## Rubric breakdown
- Technical crawl, index, and rendering foundations: 19/25
- Architecture and internal linking: 11/20
- On-page metadata and structured data: 16/20
- Content quality and intent fit: 15/20
- Performance, trust, and measurement discipline: 13/15

## Executive summary
- The site has solid SEO scaffolding, but the commercial pages are not being fully supported by the crawl graph or by proof depth.
- The biggest SEO losses come from hidden internal links, fragmented proof surfaces, missing social preview assets, and thin service-page content.

## What is good
- Titles, descriptions, and canonicals are present across sampled public routes.
- `robots.txt`, `sitemap.xml`, and `llms.txt` are live.
- Public pages emit JSON-LD instead of leaving schema blank.
- The site has named case studies, named team members, and support/policy routes, which helps overall quality and trust posture.

## Findings by severity
- High: Important service pages are absent from the server-rendered anchor graph.
- High: The live proof layer is split between indexable case studies, hidden project pages, and a `noindex, nofollow` projects hub.
- Medium: Social preview metadata is incomplete across sampled public pages.
- Medium: Money pages are comparatively thin and do not fully satisfy commercial evaluation intent.
- Medium: Breadcrumb schema quality is weak on some routes.

## Detailed issue inventory with evidence
- Hidden service-page links in initial HTML.
- Evidence: live anchor-graph checks found `0` inbound server-rendered anchor links to `/websites`, `/crm`, `/ai-agents`, `/automations`, and `/team`. In code, `app/(website)/components/SiteNav.tsx` renders those child links only when dropdown state is open.
- Why it matters: pages can still be in the sitemap, but they lose internal-link equity, crawl discoverability, and contextual anchor reinforcement.
- Best-practice recommendation: render permanent anchor links to important child pages in the initial HTML. Keep dropdown UX if you want, but do not make discoverability dependent on client interaction.

- Fragmented live proof architecture.
- Evidence: live `/projects` returns `noindex, nofollow, nocache`, live project detail pages such as `/projects/carlow-hearing-service-led-clinic-website` return `200` and are indexable, and those project pages appear linked only from `/projects`. Live case-study detail pages such as `/case-studies/carlow-hearing` also return `200` with self-canonicals.
- Why it matters: proof authority is split across multiple surfaces, and some of the indexable project pages are effectively starved of crawl support.
- Best-practice recommendation: choose one canonical proof model and make it consistent. If projects are canonical, index the hub, link to it normally, and 301 or 308 case studies to the chosen record. If case studies are canonical, do not leave indexable shadow project pages hanging off a noindex hub.

- Missing `og:image` and `twitter:image`.
- Evidence: sampled live pages including `/`, `/services`, `/platform`, `/contact`, `/demo`, and `/technical-review` emit `twitter:card=summary_large_image` but no image tag.
- Why it matters: poor link previews reduce click-through potential and waste an otherwise strong metadata foundation.
- Best-practice recommendation: generate a branded social image for all key page types and ship it through shared metadata helpers.

- Thin commercial pages.
- Evidence: sampled live word counts were roughly `209` for `/security`, `251` for `/automations`, `256` for `/ai-agents`, `267` for `/crm`, `268` for `/websites`, `298` for `/demo`, and `322` for `/services`.
- Why it matters: pages can rank with concise copy, but these pages are light for high-consideration B2B service queries and do not cover comparison, objections, pricing posture, rollout, or proof with much depth.
- Best-practice recommendation: add decision-support blocks for fit, non-fit, process, expected inputs, common risks, proof, and next-step expectations.

- Low-quality breadcrumb labels.
- Evidence: `app/(website)/components/RouteStructuredData.tsx` does not map several public routes such as `/services`, `/about`, `/team`, `data-handling`, and `implementation-methodology`; the fallback uses raw slugs. Live home breadcrumb markup also includes an extra `/index` item.
- Why it matters: this is not the biggest ranking lever, but it is low-quality structured output on important pages.
- Best-practice recommendation: map every public route to a human label and validate breadcrumb JSON-LD on production after deploy.

## Improvement roadmap
- Quick wins: add crawlable anchor links to hidden child pages; add page-type social images; map all breadcrumb labels; switch `/agents` to a permanent redirect.
- Moderate effort: deepen service pages with answer-first sections and proof; decide and deploy one canonical proof model.
- Strategic work: build content clusters around service evaluation intent instead of relying on thin pillar pages alone.

## Best practices, how-tos, dos, don'ts, tips, and tricks
- Do keep the current metadata discipline. The foundation is better than average.
- Do make server-rendered links and HTML proof text a priority before adding more decorative UI.
- Do treat proof pages as search assets, not only sales assets.
- Do not hide major commercial URLs behind client-only navigation states.
- Do not declare `summary_large_image` without providing the image.
- Tip: use a single metadata helper for title, description, canonical, social image, and schema IDs so pages stay consistent.

## Open questions and measurement caveats
- The workspace appears ahead of production on parts of the proof architecture. Some live proof issues may already be solved in code but not yet deployed.
- I did not have Search Console or log access, so ranking-state and excluded-URL claims are limited to observable crawl/index signals.

