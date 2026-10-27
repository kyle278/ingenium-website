# Ingenium rebuild production release — 27 October 2026

The approved rebuild was promoted to https://www.ingeniumconsulting.net with the existing Portal editor, managed SEO, Blog, tracking and form adapters retained.

- Deployment: `dpl_9zXjX39qiHY3CGZ14e9saTuQSW6J`, https://ingenium-website-5dxd76u8m-kyle278s-projects.vercel.app.
- Previous production / rollback target: `dpl_4zsQRD7PNgmBfPdAPuxSUJyTPPzW`, https://ingenium-website-ei4ayka8w-kyle278s-projects.vercel.app.
- Deployed application source: commit `03ebb0f` in `C:/Users/kyler/Desktop/Projects/ingenium-website-rebuild-release-20261027`, branch `rebuild-release-20261027`. Later documentation commits do not change the deployed application.
- Current CMS publication remains generation **5**, `7c303ef2-c11b-497f-8996-afd52d95d080`. The two published homepage text/design overrides are retained through their original field IDs. No draft, publication, signing secret or Portal state was reset.

The release combines the approved website rebuild with the editor SDK from the verified production release. The project screenshot release (`a765c3f`) and subsequent Nitro addition (`4a51b89`) landed during staging; both are incorporated, including all seven images and the Attic homepage link.

## Editor compatibility

Existing Portal page identities remain usable. Ordinary public requests to old service/contact/pricing/project URLs redirect permanently to the new routes. Editor canvases at those same identities internally render the replacement pages, retain the original browser path for the signed handshake, and suppress tracking and form submission. Publication verification requests also render the new public content at the old identity and return the actual current release marker. Compatibility responses are private/no-store and noindex; existing preview origin and signature controls remain intact.

Unchanged migrated regions retain their identities. New/replaced content has explicit IDs recorded in source; the hero's two existing published text identities and visual identity are retained. Static project previews, form logic, pricing calculations, Blog content and Portal feeds keep their existing owners. The original workspace received the compatible source changes only after checking that its files had not diverged, preserving concurrent work.

## Validation

- Vercel production build and TypeScript pass. All 77 automated tests pass. Targeted ESLint reports no errors (unused-import warnings remain after wrapper migration).
- Staged browser checks pass across 25 page/viewport combinations and tablet navigation: no broken images, horizontal overflow, page errors or unintended lead requests. Seven current projects, approved prices, interactive demos, keyboard controls and reduced motion are checked.
- The full guided-call browser suite passes on the integrated release: desktop/mobile, enlarged text, conditional email, required phone, independent consent cards, retry/deduplication, four package routes and visibility-form regression. Requests are intercepted; these checks create no live leads and do not prove downstream delivery.
- Eight legacy routes are checked for public 308 redirects, working editor canvases and publication probes. Published CMS text and release markers survive. A correctly signed refresh succeeds; unsigned refresh and hostile preview-origin requests are rejected. SEO and Blog integration endpoints remain present.
- Blog returns HTTP 200 with production configuration. The optional Portal project feed still returns 404; seven explicitly listed current projects and separately labelled fictional design examples remain available.

Live verification evidence is saved under the original workspace's `.codex-preview/live-release-verification.json` and `.codex-preview/release-integration-verification.json`. Screenshots and staged browser reports are beside them. Production domain identity is recorded in `.codex-preview/promoted-deployment.json`.

For future releases, start from the complete rebuild release checkout above. The original workspace retains unrelated campaign/video/development work; the older `ingenium-website-editor-release` checkout contains the preceding production version and must not be promoted over this rebuild without merging it.
