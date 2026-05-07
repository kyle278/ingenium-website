# Ingenium Website - Ingenium Improve Entity Signals

## Audit dependency used or created

- Used existing audit: `C:\Users\kyler\Desktop\Projects\ingenium-website\audits\ingenium-website-ingenium-audit-entity-signals.md`

## Changes made

- Added approved business identity details to [lib/seo.ts](C:/Users/kyler/Desktop/Projects/ingenium-website/lib/seo.ts), including legal name, address, phone, Google Business Profile, and company LinkedIn.
- Expanded organization schema in [app/(website)/components/RouteStructuredData.tsx](C:/Users/kyler/Desktop/Projects/ingenium-website/app/(website)/components/RouteStructuredData.tsx) with `PostalAddress`, `ContactPoint`, `sameAs`, and stronger organization detail.
- Added reusable team records with LinkedIn URLs in [src/lib/team.ts](C:/Users/kyler/Desktop/Projects/ingenium-website/src/lib/team.ts).
- Added `Person` schema and visible LinkedIn buttons for each team member in [app/(website)/team/page.tsx](C:/Users/kyler/Desktop/Projects/ingenium-website/app/(website)/team/page.tsx).
- Added visible corroboration on the about and contact surfaces for address, phone, Google Business Profile, and company LinkedIn.

## Estimated impact and remaining issues

- Estimated impact: strong positive for business identity clarity and person-level entity signals.
- Remaining issue: corroboration is still limited to Google Business Profile and LinkedIn because no broader external profile set was supplied.
- Remaining issue: most visible marketing copy still uses `Ingenium Consulting` while the formal entity layer uses `Ingenium Digital Consulting`. This is workable if intentional, but it should remain consistent in external profile naming.

## Deferred redesign items

- No redesign was required for entity improvements.

## Verification notes

- `cmd /c npm.cmd run build`
- `cmd /c npx.cmd eslint "app/(website)/team/page.tsx" "app/(website)/about/page.tsx" "app/(website)/contact/page.tsx" "app/(website)/components/RouteStructuredData.tsx" "src/lib/team.ts" "lib/seo.ts"`

## Next steps

- Add any additional authoritative profiles if they exist, such as Clutch, Crunchbase, or other business citations.
- Decide whether the visible site-wide brand should remain `Ingenium Consulting` or be updated to `Ingenium Digital Consulting` everywhere.
