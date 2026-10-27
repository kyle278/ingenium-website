# Ingenium brand and service depth restoration

The revised site combines the live website's broader website/CRM story with the clearer local offers and request journey. Existing Manrope/Public Sans typography, blue/teal identity and real team assets remain the visual foundation.

## Page decisions

- **Demo-led hero:** restores “A better website. A clearer next step.” and an interactive website → customer record → next action example. The illustration is labelled; its buttons never submit a lead. Keyboard controls, reduced motion and manual progression remain available.
- **Services before prices:** two prominent starting points, website and follow-up, with a full-width website-plus-CRM route and a visible ecommerce link. The main menu restores all four services, Our work and Blog. Mobile/tablet navigation uses a disclosure with Escape, focus return and outside-click dismissal.
- **A visible mechanism:** the homepage and CRM/connected service pages show the four-step enquiry journey. Actual connections, fields and automated actions remain subject to scope. Service pages now explain planning, delivery, checking and handover before presenting prices.
- **Work and people:** published projects are preferred when supplied by the existing Portal feed. When unavailable, the homepage shows clearly labelled fictional design examples. Kyle, Clayton and Sophie appear on the homepage using the real team source, with links to their full profiles. No customer outcomes or testimonials are invented.
- **An accessible offer within a broader business:** Starter's normal €795/current €495 build fee and €49/month care, plus the €1,495/€99 five-page option, remain later in the homepage. CRM/combined projects stay individually quoted. No new guarantee, grant, urgency, capacity or exit claim is introduced.
- **Preserved enquiry journey:** separate first/last names, required callback phone, optional email, conditional opt-in email and final consent cards remain intact. All form integration, consent evidence, attribution and accepted-receipt requirements are retained.

## Verification and dependencies

The browser pass covers desktop, tablet and mobile navigation; homepage and service routes; interactive examples; reduced motion; first-screen primary CTA; horizontal overflow; images; metadata; keyboard focus; and preservation of package prices. Demo interactions must create zero enquiry requests. The callback browser suite uses intercepted responses and creates no Portal leads.

The local Blog is not configured and returns HTTP 503. It now presents a branded, non-indexable outage page with working return links, retaining `Retry-After` and no-store behaviour. This is not evidence of a live Blog connection. The local Portal projects feed remains unavailable; template previews are therefore identified as design examples. Reconnecting either provider and deploying the site are outside this local design revision.

The visual check follows the Pro Design skill: one complete pass, one batch of corrections, then a confirming pass. It caught the Blog's bare error response, a mobile privacy-settings/call-bar overlap, and a JSX lint issue. Final evidence is recorded in `.codex-preview/brand-verification.json`, with screenshots and the callback verification beside it.

Final validation: production build and targeted ESLint pass; all 77 automated tests pass. The confirming browser pass covers 25 page/viewport combinations plus tablet navigation, with no horizontal overflow, broken images, page errors or unintended enquiry requests. The guided-call suite also passes desktop/mobile, reduced motion, enlarged text, four package routes, retry handling, consent and visibility-form regression using intercepted responses. Blog connection unavailability is the only pending browser dependency.
