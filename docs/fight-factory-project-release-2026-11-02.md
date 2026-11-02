# Fight Factory portfolio addition — 2 November 2026

Live: https://www.ingeniumconsulting.net/results#current-projects and the homepage Current projects section.

Added Fight Factory Pro Wrestling, linking to https://fight-factory-pro-wrestling.vercel.app/, with its genuine homepage screenshot. Shared component: `components/rebuild/CurrentProjects.tsx`; image: `public/project-previews/fight-factory-pro-wrestling.webp` (1200×833, 40,722 bytes). Preview retains the complete headline and logo rather than cropping the left edge. No customer outcome claims or case study fabricated.

Prepared in isolated checkout `C:/Users/kyler/Desktop/Projects/ingenium-website-fight-factory-project`, branch `Kyle/add-fight-factory-project`, based on the canonical production checkout's Emerald Golf addition. Preserved the complete package/editor/SEO/Blog source and merged the subsequent Emerald release notes. Compared with that baseline, application changes are exactly one registry entry and one image. The original dirty checkout was not deployed.

Final Vercel deployment: `dpl_5ZFsHDhvN8g14cXfmBSWQ5AEDAB4`, https://ingenium-website-1y1o90okj-kyle278s-projects.vercel.app; promoted to the existing production domains. Application commit `c616c85` includes the corrected preview. Prior public deployment: `dpl_5zSk2wNzrQV938KERyVHWS5TF6J9` (Emerald Golf); promote that exact deployment to roll back this addition.

Checks: Vercel production build and TypeScript passed. Staged browser review at 1440px and 390px confirmed the new card's correct URL, loaded optimized preview, visible keyboard focus and no document overflow. No staged browser console errors. Live Results page was opened and its Fight Factory link, `_blank` target and loaded preview verified. Cookie-free HTTP checks cover homepage and Results. No enquiry or booking submitted, and no Portal state or integration configuration changed.

The optional existing Portal project feed still logs HTTP 404 during builds; explicit Current projects content renders independently. Local dependency installation stalled and was stopped; a local full build/test suite is not claimed. Vercel's complete build and TypeScript check are the compilation evidence for this content-only change.
