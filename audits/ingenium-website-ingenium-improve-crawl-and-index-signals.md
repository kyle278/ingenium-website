# Ingenium Website - Ingenium Improve Crawl And Index Signals

## Audit dependency used or created

- Used existing audit: `C:\Users\kyler\Desktop\Projects\ingenium-website\audits\ingenium-website-ingenium-audit-crawl-and-index-signals.md`

## Changes made

- Canonicalized the site to `www` in [lib/seo.ts](C:/Users/kyler/Desktop/Projects/ingenium-website/lib/seo.ts) and enforced the domain move with a permanent redirect in [proxy.ts](C:/Users/kyler/Desktop/Projects/ingenium-website/proxy.ts).
- Ensured [app/robots.ts](C:/Users/kyler/Desktop/Projects/ingenium-website/app/robots.ts) and [app/sitemap.ts](C:/Users/kyler/Desktop/Projects/ingenium-website/app/sitemap.ts) now emit `www` URLs through the shared site constant.
- Kept the legacy `/case-studies` surface out of discovery by pairing a permanent redirect page with `noIndex` page SEO config, while keeping `/projects` as the crawlable proof hub.
- Updated primary internal navigation to point to `/projects` in [app/(website)/components/SiteNav.tsx](C:/Users/kyler/Desktop/Projects/ingenium-website/app/(website)/components/SiteNav.tsx), [components/ui/hero-1.tsx](C:/Users/kyler/Desktop/Projects/ingenium-website/components/ui/hero-1.tsx), and [components/ui/demo.tsx](C:/Users/kyler/Desktop/Projects/ingenium-website/components/ui/demo.tsx).

## Estimated impact and remaining issues

- Estimated impact: strong positive for canonical control and crawl equity consolidation.
- Remaining issue: legacy case-study routes still exist as redirecting URLs, so they will continue to appear in the route map until external references age out. That is acceptable and preferable to leaving competing live pages.
- Remaining issue: private intake handling for `/website-brief` still depends on crawl directives rather than stronger access controls.

## Deferred redesign items

- No redesign work was required for crawl/index fixes.

## Verification notes

- Post-change search across `app`, `components`, `lib`, and `src` found no remaining hardcoded apex absolute URLs.
- `cmd /c npm.cmd run build`

## Next steps

- If hosting configuration allows it, mirror the `www` canonical preference at the DNS or platform domain-routing layer as well.
- Consider stronger access control for non-public intake routes if they should never be discoverable.
