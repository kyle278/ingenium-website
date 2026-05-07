# Ingenium Website Phase 1 Implementation Report

Date: May 7, 2026

## Scope

This pass implemented the highest-leverage items from the audit roadmap without redesigning page layouts. The work focused on crawlability, social metadata, structured data quality, trust messaging, intake resilience, and proof rendering accuracy.

## Implemented

### SEO

- Added a reusable default social preview image to `buildMetadata` in [lib/seo.ts](/C:/Users/kyler/Desktop/Projects/ingenium-website/lib/seo.ts).
- Added a generated Open Graph image route in [app/opengraph-image.tsx](/C:/Users/kyler/Desktop/Projects/ingenium-website/app/opengraph-image.tsx).
- Expanded footer discovery links in [app/(website)/layout.tsx](/C:/Users/kyler/Desktop/Projects/ingenium-website/app/(website)/layout.tsx).
- Improved sitemap route priority coverage in [app/sitemap.ts](/C:/Users/kyler/Desktop/Projects/ingenium-website/app/sitemap.ts).

### Crawl and Index Signals

- Added an always-rendered desktop crawl path for key commercial child pages in [app/(website)/components/SiteNav.tsx](/C:/Users/kyler/Desktop/Projects/ingenium-website/app/(website)/components/SiteNav.tsx), so those links exist in initial HTML without opening dropdowns.
- Converted `/agents` to a permanent redirect in [app/(website)/agents/page.tsx](/C:/Users/kyler/Desktop/Projects/ingenium-website/app/(website)/agents/page.tsx).
- Added per-route `lastModified` overrides for the intake paths in [app/sitemap.ts](/C:/Users/kyler/Desktop/Projects/ingenium-website/app/sitemap.ts).

### AEO

- Added explicit social preview image references for Open Graph and Twitter in [lib/seo.ts](/C:/Users/kyler/Desktop/Projects/ingenium-website/lib/seo.ts).
- Improved breadcrumb naming coverage and normalization in [app/(website)/components/RouteStructuredData.tsx](/C:/Users/kyler/Desktop/Projects/ingenium-website/app/(website)/components/RouteStructuredData.tsx), including `/services`, `/team`, `/privacy`, `/support`, `/security-review`, and related routes.

### Trust Signals

- Removed weak internal-only `sameAs` usage from the organization schema in [app/(website)/components/RouteStructuredData.tsx](/C:/Users/kyler/Desktop/Projects/ingenium-website/app/(website)/components/RouteStructuredData.tsx).
- Added stable `@id` references for `Organization`, `WebSite`, `WebPage`, `BreadcrumbList`, and `Service` nodes in [app/(website)/components/RouteStructuredData.tsx](/C:/Users/kyler/Desktop/Projects/ingenium-website/app/(website)/components/RouteStructuredData.tsx).
- Reworked the public contact support copy in [app/(website)/contact/page.tsx](/C:/Users/kyler/Desktop/Projects/ingenium-website/app/(website)/contact/page.tsx) so it emphasizes response expectations and manual fallback instead of operational form-routing language.
- Sanitized public form-error copy and added a privacy/response-time reassurance block in [app/(website)/contact/ContactForm.tsx](/C:/Users/kyler/Desktop/Projects/ingenium-website/app/(website)/contact/ContactForm.tsx).

### User Experience Signals

- Stopped server HTML from rendering proof metrics as `0` before hydration in [app/(website)/components/AnimatedMetric.tsx](/C:/Users/kyler/Desktop/Projects/ingenium-website/app/(website)/components/AnimatedMetric.tsx).
- Kept manual fallback guidance visible on contact and intake surfaces when online submission fails, via [app/(website)/contact/ContactForm.tsx](/C:/Users/kyler/Desktop/Projects/ingenium-website/app/(website)/contact/ContactForm.tsx) and [app/(website)/contact/page.tsx](/C:/Users/kyler/Desktop/Projects/ingenium-website/app/(website)/contact/page.tsx).

## Deferred

- The proof architecture decision between case-study hubs and project pages still needs a dedicated structural pass.
- Main commercial pages still need deeper answer-first content, richer comparison sections, and stronger evidence density.
- Person schema, stronger external entity corroboration, and broader business identity signals remain outstanding.
- Portal-form degradation is now safer from a user-message standpoint, but deeper platform-level fallback handling can still be added if the submission transport itself changes.

## Verification

- `cmd /c node_modules\\.bin\\eslint.cmd "app/opengraph-image.tsx" "app/(website)/components/SiteNav.tsx" "app/(website)/layout.tsx" "app/(website)/components/RouteStructuredData.tsx" "lib/seo.ts" "app/(website)/components/AnimatedMetric.tsx" "app/(website)/contact/ContactForm.tsx" "app/(website)/contact/page.tsx" "app/(website)/agents/page.tsx" "app/sitemap.ts"`
- `cmd /c npm.cmd run build`
