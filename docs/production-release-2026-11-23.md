# Outstanding website changes released — 23 November 2026

Production: https://www.ingeniumconsulting.net
Deployment: `dpl_C4m5hD3VuGJi3uMSEUWtC2zXmETB`, https://ingenium-website-p8dbiozxe-kyle278s-projects.vercel.app
Application commit: `8242f46`; branch `Kyle/outstanding-production-20261123`.
Source checkout: `C:/Users/kyler/.codex/worktrees/ingenium-crm-preview-build/ingenium-website`.

Released the four outstanding CRM-preview commits, including the CRM-first homepage, CRM package journey, package comparison, quote proof, Results positioning and callback context. Merged the latest production source (`origin/Kyle/enquiry-proof-preview`, `4ff02c1`) to preserve the approved team portraits. Carried the remaining Business Growth walkthrough copy from the dirty prospect-feedback-round-two checkout into the newer layout, retaining its workflow navigation.

The original `ingenium-website` working directory contains historical production work mixed with local campaign/video assets and scratch files. It was not deployed wholesale. Portal Blog, editor, SEO receiver, forms, analytics and proxy sources compare identically with the latest production source. No Portal records or environment configuration were changed.

Validation: all 88 tests pass on the final application source. Vercel production build and TypeScript pass. Source ESLint reports zero errors and 25 existing warnings. Whole-repository lint also encounters eight existing CommonJS-import errors in the three editor migration scripts; those scripts were unchanged. The existing optional Portal projects feed returns 404 during build; the explicit project gallery remains available.

Staged and live browser verification each covers ten routes at 1440px and 390px, checking HTTP 200, one H1, canonical presence, no horizontal overflow, loaded images and no browser page errors. Three package callback journeys at both widths are submitted to an intercepted response, checking package/service pairing and declined marketing consent. No real enquiry or callback was created. Homepage, CRM and Business Growth screenshots and JSON evidence are stored in `.vercel/release-checks/` in the source checkout. This is not a fresh end-to-end Portal publishing or ingestion verification.

Live sitemap, robots and RSS return 200. The apex redirects permanently to www. Roll back the website by promoting the previous deployment `dpl_CzQgdHzTCy4wjBnrPcJp68TLfveC`, https://ingenium-website-9lfm0lp2h-kyle278s-projects.vercel.app. Source is backed up on GitHub under the release branch; the unrelated main branch was not rewritten.
