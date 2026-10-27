# Current projects production release — 27 October 2026

Production deployment: `dpl_6Cr2uRZiNmYZCTwUPdNfU6ZR63ML`

URL: https://www.ingeniumconsulting.net/projects#current-projects

Built from the clean Website editor release (`c4eeec8`), retaining all existing editor integration and production environment configuration. Promoted with Vercel after its production build passed. Previous production deployment: `dpl_BnUN2Ci9PwMLNSsmpEjHvfMXoEmd`.

The homepage and `/projects` now render six direct website links with locally hosted, compressed WebP screenshots. Both the link and screenshot for Attic use its homepage. No iframe or external screenshot service is required. Screenshot assets live in `public/project-previews/`; the shared component is `components/rebuild/CurrentProjects.tsx`.

- Farrell Cleaning: https://www.farrellcleaning.ie
- Holland Pianos: https://www.hollandpianos.ie
- Tantrum: https://tantrum-website.vercel.app
- KennyPM: https://kennypm-website.vercel.app/
- Attic Jiu Jitsu: https://attic-jiu-jitsu-website.vercel.app/
- Connie Byrne Yoga: https://conniebyrneyoga.com

The Portal case-study feed currently responds with HTTP 404. The `/projects` page only renders the separate Portal case-study section when records exist, so the unavailable-feed notice no longer appears alongside the current projects. The feed and its publication rules are unchanged.

Validation: production build and TypeScript passed; all 58 existing tests passed; changed files linted without errors (two existing unused-import warnings). Browser checks at 1440px and 390px confirmed six loaded previews, the Attic homepage link, no horizontal overflow, and no unavailable message. Live checks on `/` and `/projects` returned HTTP 200, loaded all six images, reported no page errors, and resolved published Website editor release `7c303ef2-c11b-497f-8996-afd52d95d080`.

The canonical production source remains `C:/Users/kyler/Desktop/Projects/ingenium-website-editor-release`. This release is fast-forwarded into that checkout after verification. The original `ingenium-website` checkout still contains unrelated development changes; do not deploy it wholesale over the editor release.

## Nitro Sports Supplements addition

Added https://nitro-sports-supplements.vercel.app/ as the seventh current project, with a homepage screenshot in `public/project-previews/nitro-sports-supplements.webp`. Captured after declining optional analytics so the consent banner does not obscure the preview.

Production deployment: https://ingenium-website-ei4ayka8w-kyle278s-projects.vercel.app, promoted to https://www.ingeniumconsulting.net. Production build and TypeScript passed. Render check confirmed seven entries with the correct Nitro URL and image. Live browser checks on `/` and `/projects` confirmed HTTP 200, seven project cards, the loaded Nitro screenshot, no page errors, and the same published editor release. The mobile card was checked at 390px without horizontal overflow.
