# Ingenium Multi-Skill Audit Overview

## Scope and evidence sources
- Audit date: May 7, 2026.
- Primary scored target: the deployed public site at `https://www.ingeniumconsulting.net`.
- Secondary implementation review: the workspace at `C:\Users\kyler\Desktop\Projects\ingenium-website`, including `app/layout.tsx`, `app/robots.ts`, `app/sitemap.ts`, `app/(website)/components/SiteNav.tsx`, `app/(website)/components/RouteStructuredData.tsx`, `app/(website)/components/AnimatedMetric.tsx`, `app/(website)/contact/ContactForm.tsx`, `lib/seo.ts`, `src/lib/caseStudies.ts`, and `src/lib/projects.ts`.
- Runtime verification used both the live site and a local production build. The local build exposed resilience risks that are not currently breaking the live site.

## Scorecard

| Skill | Score | Grade |
| --- | ---: | :---: |
| SEO | 74% | C |
| AEO | 71% | C |
| Crawl and Index Signals | 68% | D |
| Content Quality | 66% | D |
| User Experience Signals | 76% | C |
| Trust Signals | 63% | D |
| Entity Signals | 61% | D |

## Executive summary
- The site has real structural effort behind it: consistent titles and canonicals, a working sitemap and robots file, `llms.txt`, named proof pages, policy pages, and a clear commercial proposition.
- The largest weakness is not missing basics. It is weak delivery of depth and discoverability. Several important commercial pages are not present in the server-rendered anchor graph, money pages are thin, proof is fragmented, and structured trust/entity signals stop well short of best practice.
- The public site also appears to be behind the current workspace on a few proof-architecture items. The repo is trying to consolidate proof into canonical project records, but the live site still serves indexable case-study detail URLs and keeps `/projects` as `noindex, nofollow`.

## What is good across the site
- Titles, descriptions, canonicals, and page-level metadata are broadly present and consistent.
- `robots.txt`, `sitemap.xml`, and `llms.txt` exist and are readable.
- The site has clear service segmentation and multiple CTA paths.
- Team pages, policy pages, support pages, and security pages exist, which is materially better than most brochure sites.
- The site uses JSON-LD on public pages rather than omitting structured data entirely.

## Cross-cutting issues
- Important service pages such as `/websites`, `/crm`, `/ai-agents`, `/automations`, and `/team` have zero inbound server-rendered anchor links on the live site. They sit behind client-controlled dropdown state in the nav instead of being present in the initial HTML.
- Social preview metadata is incomplete. Sampled public pages emit `twitter:card=summary_large_image` but no `og:image` or `twitter:image`.
- Commercial pages are light on decision-making depth. Several service pages land around 250 to 320 words and mostly restate the proposition instead of answering comparison, process, risk, or proof questions in depth.
- The proof layer is fragmented on the live site. `/projects` is `noindex, nofollow`, case-study detail pages are still live and self-canonical, and indexable project detail pages appear to be linked only from the noindex projects hub.
- The proof metrics themselves are not reliably present in HTML. `AnimatedMetric` starts at `0`, so crawlers and no-JS users can see zeroed metrics on proof pages before client animation runs.
- Trust and entity reinforcement is thin. There is no visible business address, phone number, company registration detail, external profile set, or person-level schema on key commercial pages.

## Highest-priority recommendations
1. Put crawlable, server-rendered anchor links to all important commercial child pages into the initial HTML, not only into client-open nav states.
2. Clean up the proof architecture on production: choose the canonical proof surface, remove `noindex, nofollow` from any hub that is meant to pass value, and stop splitting proof across hidden project pages and live case-study pages.
3. Replace thin, card-heavy service pages with deeper answer-first content blocks that explain fit, process, tradeoffs, proof, and objections.
4. Fix structured content delivery issues: add social images, improve breadcrumb labels, add stronger organization/person graph markup, and stop rendering proof metrics as `0` in server HTML.
5. Add stronger trust signals around forms and decision pages: privacy notice links, response expectations, business identity details, and page-level proof elements.

## Deployment drift note
- The current workspace already contains changes that do not appear fully reflected on the live site, especially around project records and bot allowances in `robots.txt`.
- Because of that drift, some items in the detailed reports are marked as live-site issues with a note that the repo appears ahead of production.

