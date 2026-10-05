# Starter Website form and tracking

Updated 5 October 2026.

## Form delivery

The campaign uses the same `/api/enquiry` transport as contact and website brief forms. The server forwards to `https://portal.ingeniumconsulting.net/api/websites/forms/submit`, fixed site `13f9d31e-022c-4fd6-83bb-39cd1a51a85e`, slug `starter-website`. Success requires an accepted submission ID; routing labels are recomputed on the server.

The production Portal database was checked and the missing campaign form registered. Active form ID: `47970b3e-9210-44ed-8fb4-0aebf6b5bcaa`. Registration source is `supabase/snippets/website_forms_starter_website.json`; the accompanying SQL can reproduce registration while preserving any existing notification and CRM settings. No existing form registration was changed.

Details are step one; required privacy acknowledgement and optional marketing consent are step two. Both choices default to unchecked. Privacy notice, notice version, marketing wording and consent timestamp accompany the submission. Name aliases, service and intent are included for CRM mapping. The optional marketing wording includes website tips and an unsubscribe statement.

## Analytics

The root cookie controls govern all campaign analytics. Before consent or after rejection, the form still sends essential clean page URLs but no UTMs, visitor/session IDs or optional analytics events. Marketing consent is independent of analytics consent.

After analytics acceptance, page views, campaign CTA/form/video/example interactions and accepted-lead conversions go to the Portal tracking endpoint. Existing GTM events remain. Visitor identity is in localStorage; a session identity expires after 30 minutes of inactivity. Form attribution and analytics events share the same IDs. Withdrawal removes attribution and identities and prevents subsequent events.

Only controlled campaign properties are sent; query strings and fragments are stripped from page and referrer URLs. Form answers and contact details are excluded from events. First and latest attribution follow the existing session attribution policy. `ingenium_lead_received` is deduplicated per accepted receipt; `starter_form_submit` is a campaign funnel event, not an additional lead conversion.

## Verification and deployment

- 46 automated tests passed, including actual two-step submit handlers, consent rejection/withdrawal, Portal attribution and identity linkage, server validation and accepted-receipt handling.
- TypeScript, targeted ESLint and production build passed.
- Live Portal form registration verified active; live form and tracking OPTIONS requests returned 204 with the website origin allowed.
- Production build reported an unrelated existing projects API 404.
- No synthetic production lead was submitted; production CRM linkage and notification delivery have not been tested end to end.
- Website source changes require deployment. This work did not change live GTM configuration or enable the existing analytics feature flag.
