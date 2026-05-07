# Ingenium Website - Ingenium Improve Freshness

## Audit dependency used or created

- Created audit during this pass: `C:\Users\kyler\Desktop\Projects\ingenium-website\audits\ingenium-website-ingenium-audit-freshness.md`

## Changes made

- Added a reusable visible review component in [app/(website)/components/PageReviewMeta.tsx](C:/Users/kyler/Desktop/Projects/ingenium-website/app/(website)/components/PageReviewMeta.tsx).
- Added centralized review data in [lib/review.ts](C:/Users/kyler/Desktop/Projects/ingenium-website/lib/review.ts) using the approved owner, quarterly cadence, and review date of `2026-05-07`.
- Applied visible review metadata to the homepage, services, solution pages, projects, project detail pages, about, team, platform, and contact surfaces.
- Added `dateModified` to page and service schema in [app/(website)/components/RouteStructuredData.tsx](C:/Users/kyler/Desktop/Projects/ingenium-website/app/(website)/components/RouteStructuredData.tsx).
- Standardized sitemap freshness to the approved review date in [app/sitemap.ts](C:/Users/kyler/Desktop/Projects/ingenium-website/app/sitemap.ts).

## Estimated impact and remaining issues

- Estimated impact: meaningful improvement for visible freshness and machine-readable update signals.
- Remaining issue: support, privacy, security review, data handling, and implementation methodology pages do not yet all show the same visible review component.
- Remaining issue: all dates currently resolve to the same approved review date, which is fine for this pass but should become page-specific over time if editorial updates diverge.

## Deferred redesign items

- No redesign work was required.

## Verification notes

- `cmd /c npm.cmd run build`
- Schema changes compile cleanly and static generation still completes.

## Next steps

- Roll the same review component onto the remaining trust and policy pages.
- If future reviews diverge by page, move review metadata into page-level config instead of one shared constant.
