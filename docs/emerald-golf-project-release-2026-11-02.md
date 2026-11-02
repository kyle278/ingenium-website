# Emerald Golf Distribution portfolio addition — 2 November 2026

Adds Emerald Golf Distribution as the eighth entry in the shared CurrentProjects gallery on the homepage and Results page. Destination: https://emerald-golf-distribution.vercel.app/. This is the sample website, not the prospect's existing production website.

The preview is a fresh screenshot of the sample's opening hero, captured in the real browser at 1200×833 CSS pixels, then exported as a 1200×833 WebP (53,272 bytes). Asset: public/project-previews/emerald-golf-distribution.webp. The screenshot and one new array entry are the only application changes.

Prepared from the canonical complete production source at C:/Users/kyler/Desktop/Projects/ingenium-website-rebuild-release-20261027, starting at 18e66a2 (application commit 19fa4fb), matching production deployment dpl_4d9G7KrjrLr1X4oTMkCuYd7BZnhD. Working branch: Kyle/add-emerald-golf-project. The original dirty ingenium-website workspace received only the matching component entry and image, preserving unrelated changes. No Portal records, editorial releases, analytics, forms, payments or settings were changed.

## Published and verified

Promoted production deployment dpl_5zSk2wNzrQV938KERyVHWS5TF6J9, https://ingenium-website-pmgdwuasj-kyle278s-projects.vercel.app, to https://www.ingeniumconsulting.net. Application commit a68a9061602e5fe805c5bf26335f8e83fae693e7. The complete branch is backed up at https://github.com/kyle278/ingenium-website/tree/Kyle/add-emerald-golf-project. The canonical checkout's origin still points to the original local workspace; the branch was pushed explicitly to the existing GitHub repository without changing that remote or its main branch.

- All 88 existing tests pass; changed component ESLint passes with zero errors/warnings. Existing Node module-format warnings remain unchanged. Vercel's production build and TypeScript check pass.
- Staged review: eight cards, correct Emerald link and loaded screenshot; desktop/mobile layout has no horizontal overflow.
- Live homepage and /results return HTTP 200, contain eight project links and include Emerald's URL and preview. The public WebP returns HTTP 200, image/webp, 53,272 bytes.
- Live browser at 1440×1000 confirms eight cards, correct sample destination, loaded preview and no horizontal overflow. At 390×844, the homepage card is fully readable, its long name wraps cleanly, its screenshot loads, and no horizontal overflow occurs. Both live browser log checks return no warnings/errors.
- Screenshots are stored locally under C:/Users/kyler/Documents/ChatGPT/EGD-website/notes/screenshots/ingenium-portfolio-desktop.jpg and ingenium-portfolio-mobile.jpg.
- No live enquiries, orders, payments, consent acceptances or Portal publishing were triggered. Optional analytics was declined on staging. The old optional Portal case-study feed still returns its pre-existing 404 during build; it is independent of the current-project gallery and does not prevent this release.

The previous production deployment above remains the rollback reference. Existing pricing deadline, editor/SEO/Blog/form/tracking application sources and production environment were retained. This scoped change does not claim a new end-to-end verification of those unrelated integrations.
