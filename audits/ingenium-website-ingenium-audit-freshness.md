# Ingenium Website - Ingenium Audit Freshness

## Scope, target, and evidence sources

- Scope: public marketing, proof, and contact surfaces under `ingeniumconsulting.net`
- Target: codebase and observable implementation as of `2026-05-07`
- Evidence sources:
  - [app/(website)/page.tsx](C:/Users/kyler/Desktop/Projects/ingenium-website/app/(website)/page.tsx)
  - [app/(website)/services/page.tsx](C:/Users/kyler/Desktop/Projects/ingenium-website/app/(website)/services/page.tsx)
  - [app/(website)/projects/page.tsx](C:/Users/kyler/Desktop/Projects/ingenium-website/app/(website)/projects/page.tsx)
  - [app/(website)/team/page.tsx](C:/Users/kyler/Desktop/Projects/ingenium-website/app/(website)/team/page.tsx)
  - [app/sitemap.ts](C:/Users/kyler/Desktop/Projects/ingenium-website/app/sitemap.ts)

## Method summary

- Reviewed visible freshness indicators, sitemap freshness signaling, and whether core decision pages expose a credible review cadence.

## Overall score and letter grade

- `65%` - `D`

## Detailed findings by severity

- `High`: core commercial pages did not consistently expose a visible review date or review owner.
- `Medium`: sitemap freshness existed but was not mirrored by visible page-level review signals where buyers actually evaluate the offer.
- `Medium`: proof pages did not clearly show their review date in page content or schema.

## Detailed issue inventory

- Issue: missing visible review signals on key pages
  - Why it is a problem: freshness is harder to trust when the site claims operational specificity without showing when the page was last reviewed.
  - Affected surfaces: home, services, solution pages, proof pages, contact, about, team
  - Evidence: reviewed page templates listed above
  - Recommended fix: add a reusable page review component, publish a review owner, and standardize a review cadence

## Improvement roadmap

- Quick wins: add a shared visible review pattern and align sitemap `lastModified`
- Moderate effort: add `dateModified` to page and service schema
- Strategic work: create a repeatable content-review workflow across all commercial and policy pages

## Open questions and measurement caveats

- Score is based on implementation evidence only. No CMS history, Search Console recrawl timing, or editorial workflow telemetry was available.
