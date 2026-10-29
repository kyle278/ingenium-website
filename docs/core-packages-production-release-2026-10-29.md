# Three-package production release — 29 October 2026

Live: https://www.ingeniumconsulting.net. Final deployment `dpl_4d9G7KrjrLr1X4oTMkCuYd7BZnhD`, https://ingenium-website-3fjvllmub-kyle278s-projects.vercel.app, application commit `19fa4fb`. Canonical complete source remains `C:/Users/kyler/Desktop/Projects/ingenium-website-rebuild-release-20261027`, branch `core-packages-release-20261029`.

## Published scope

Promoted the locally reviewed Starter Website, Business Growth and CRM & Automation release: homepage, package comparison, three indexed landing pages, navigation/footer, metadata, resources and package-specific callback requests. Prepared the release from the preceding complete production checkout and copied only the scoped 48-file package changes; unrelated local work was excluded. Package code is commit `7b5b811`.

Starter is €495 setup during the fixed campaign, standard €795, plus €50/month. Business Growth starts at €1,500 plus €99/month; CRM & Automation starts at €3,000 plus €199/month. The latter two are indicative and subject to agreed scope. The already-running campaign still ends **5 November 2026 at 07:02:20 Irish time**; no timer was restarted. Server-owned receipt-time pricing remains authoritative. Existing agreements/free-hosting periods remain honoured.

At the user's follow-up request, refreshed Attic's project preview from its actual live homepage, https://attic-jiu-jitsu-website.vercel.app/. Declined optional analytics and waited for the banner to disappear, fonts and visible images to load. Captured at 1440×1000 and exported 1200×833 WebP (64,610 bytes). `public/project-previews/attic-jiu-jitsu-20261029.webp` has a new filename to avoid stale optimized-image caches. The shared CurrentProjects component uses this image on the homepage and Results page; its destination remains Attic's homepage. Original workspace and canonical release sources/assets are synchronized for this change.

## Verification

- 88 tests pass, including package expiry, price reversion, forged client price rejection, package/service matching, callback contact/consent requirements, and replay behaviour.
- Vercel production builds and TypeScript checks pass for both package and Attic deployments. The duplicate local build was stopped after compilation once the isolated Vercel build had passed; it is not reported as a completed local build.
- Source ESLint: zero errors, 27 existing warnings. Changed CurrentProjects component lint passes.
- Staged and final live browser checks: 14 desktop/mobile page observations, six package-specific callback journeys with intercepted submissions, no page errors, no document horizontal overflow, working canonical URLs and loaded images. Final live checks specifically loaded the new Attic image and inspected its cards on both homepage and Results at 1440px/390px.
- Eleven legacy public paths return expected 308 redirects; their private editor canvases and publisher probes still return 200 with the current published editor release. Generation 5, release `7c303ef2-c11b-497f-8996-afd52d95d080`, is preserved. New content survives the saved snapshot. Signed editor refresh succeeds, unsigned requests and hostile preview origins are rejected. An initial live probe briefly lacked the marker; direct checks and the complete final live verification subsequently passed without changing Portal state.
- SEO receiver/revision is preserved. The three canonical package routes are indexable and included in sitemap; six linked resource downloads are served. This is not a search indexing or ranking claim.
- Blog generation 19 remains live: all seven published article revisions, canonical/schema, sitemap/RSS, and current/duplicate signed refreshes pass; old generation and expired signatures are rejected. No editorial content was republished.
- Actual Portal analytics verification on the package deployment persisted eight session/page/form/scroll events under the correct site and canonical form UUID, with no requests before consent or after rejection/withdrawal. The Attic follow-up changes only its static image and shared preview source.
- One clearly labelled synthetic phone-only Starter request was accepted through the production UI and Portal ingestion: submission `7c1e2432-b00d-4b81-9402-b83b782f5d30`, site `13f9d31e-022c-4fd6-83bb-39cd1a51a85e`, organisation `d253b486-faa4-47b9-b10f-67a7c6da3374`. Independently read its stored separate names, linked CRM lead, marketing refusal, absent analytics identity and server quote: €495 setup/€50 monthly, promotion eligible, fixed expiry unchanged. Test uses the reserved UK fictional telephone range and explicitly requests no call/email/work. Contact notifications were confirmed unconfigured before sending. No private brief/build job was triggered.

Evidence: original workspace `.codex-preview/core-release-live-verification.json`, `core-release-integration-verification.json`, `core-release-live-delivery.json`, `live-tracking-verification.json`, `blog-connection-verification.json`, desktop/mobile screenshots and the canonical checkout's release/build/lint logs. Temporary deployment bypass cookies are removed after verification.

## Limits and rollback

Website replay protection remains bounded to one process. The optional old Portal projects feed still returns 404; the seven current projects are explicit website content. GA4/GTM remain disabled pending separate configuration verification. No new scheduler, email-deliverability or private-brief lifecycle test was run.

Before this task the live deployment was `dpl_7sZEv9zx1YBWa9NxvGYePUYi9RBR` (`ingenium-website-8bcd6mz37-kyle278s-projects.vercel.app`). Package-only deployment before Attic refresh: `dpl_98TQXSAtUg4CHnmSDhuNgvdFt5Xb` (`ingenium-website-mlu5wqtnr-kyle278s-projects.vercel.app`). Promote either exact deployment for the corresponding website rollback; no Portal publication/database configuration was changed in this release. Do not deploy the dirty original checkout wholesale over this canonical source.
