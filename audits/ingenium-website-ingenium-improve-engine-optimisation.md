# Ingenium Website - Ingenium Improve Engine Optimisation

## Audit dependency used or created

- Used existing audit: `C:\Users\kyler\Desktop\Projects\ingenium-website\audits\ingenium-website-ingenium-audit-engine-optimisation.md`

## Changes made

- Forced canonical host resolution to `https://www.ingeniumconsulting.net` in [lib/seo.ts](C:/Users/kyler/Desktop/Projects/ingenium-website/lib/seo.ts) so metadata, canonicals, sitemap URLs, and other absolute URLs no longer drift to the apex domain.
- Added a host redirect in [proxy.ts](C:/Users/kyler/Desktop/Projects/ingenium-website/proxy.ts) so `ingeniumconsulting.net` permanently redirects to `www.ingeniumconsulting.net`.
- Kept `Projects` as the canonical proof surface by redirecting the legacy case studies hub in [app/(website)/case-studies/page.tsx](C:/Users/kyler/Desktop/Projects/ingenium-website/app/(website)/case-studies/page.tsx) and preserving legacy detail redirects in [app/(website)/case-studies/[id]/page.tsx](C:/Users/kyler/Desktop/Projects/ingenium-website/app/(website)/case-studies/[id]/page.tsx).
- Added case-study depth to canonical project detail pages in [app/(website)/projects/[slug]/page.tsx](C:/Users/kyler/Desktop/Projects/ingenium-website/app/(website)/projects/[slug]/page.tsx) instead of maintaining a second competing proof template.
- Refreshed OG identity output in [app/opengraph-image.tsx](C:/Users/kyler/Desktop/Projects/ingenium-website/app/opengraph-image.tsx) to use the approved business name.

## Estimated impact and remaining issues

- Estimated impact: positive for canonical consolidation, proof-surface clarity, and answer-engine consistency.
- The largest remaining engine-optimisation gap is still content depth on the main service pages. The structure is better, but the site still needs fuller FAQs, comparisons, and objection handling.
- Public branding still uses `Ingenium Consulting` in many visible UI strings while schema and legal identity now point to `Ingenium Digital Consulting`. That is acceptable if intentional, but full brand convergence is still open.

## Deferred redesign items

- No structural redesign was applied.
- Service-page expansion, comparison layouts, and deeper proof storytelling remain deferred.

## Verification notes

- `cmd /c npm.cmd run build`
- `cmd /c npx.cmd eslint "app/(website)/page.tsx" "app/(website)/contact/page.tsx" "app/(website)/about/page.tsx" "app/(website)/components/RouteStructuredData.tsx" "app/(website)/team/page.tsx" "app/opengraph-image.tsx" "lib/seo.ts" "src/lib/caseStudies.ts" "src/lib/team.ts" "lib/review.ts" "proxy.ts"`

## Next steps

- Expand `/services`, `/websites`, `/crm`, `/ai-agents`, and `/automations` with richer semantic FAQ and comparison content.
- Add more external corroboration targets if more profiles or business listings exist beyond Google Business Profile and LinkedIn.
