# Ingenium Website

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Portal Connection

This website reads and writes data through Supabase tables managed by the Ingenium portal:

- `website_content_blocks`
- `website_media`
- `website_forms`
- `website_form_submissions`

### Required Environment Variables

Set these in local and deployment environments:

```bash
SUPABASE_URL=...
SUPABASE_ANON_KEY=...
SITE_ID=...
ACCOUNT_ID=...
CONTACT_FORM_SLUG=contact
```

`CONTACT_FORM_SLUG` is optional and defaults to `contact`.

### Canonical IDs

`portalconnect.ts` is the only source of truth for site/account IDs used by website queries:

- `SITE_ID`
- `ACCOUNT_ID`

Do not hardcode site/account IDs anywhere else in the app.

### Contact Form Flow

- The page at `app/(website)/contact/page.tsx` reads the active form from `website_forms`.
- The client component `app/(website)/contact/PortalContactForm.tsx` renders fields from `fields` JSON.
- Submissions post to `app/api/portal/forms/[slug]/submit/route.ts`.
- The route inserts into `website_form_submissions` with `account_id`, `site_id`, and `form_id`.

### Content Block Overrides (Contact Page)

If published, these `block_key` values override contact-page copy:

- `contact.hero.label`
- `contact.hero.title`
- `contact.hero.body`
- `contact.expectations` (`content_json` array or newline-delimited `content`)
- `contact.call_expectations` (`content_json` array or newline-delimited `content`)
- `contact.cta.title`
- `contact.cta.body`
