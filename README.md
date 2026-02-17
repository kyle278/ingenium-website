# Ingenium Website

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Ingenium Portal Integration

This website reads and writes Supabase data managed by the Ingenium Portal:

- `public.website_content_blocks`
- `public.website_forms`
- `public.website_form_submissions`

### Environment Variables

Set these in local and deployment environments:

```bash
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
NEXT_PUBLIC_ACCOUNT_ID=... # optional if ACCOUNT_ID is set
NEXT_PUBLIC_SITE_ID=...    # optional if SITE_ID is set
ACCOUNT_ID=...
SITE_ID=...
NEXT_PUBLIC_CONTACT_FORM_SLUG=contact # optional
CONTACT_FORM_SLUG=contact             # optional fallback
```

`src/portalconnect.ts` is the canonical source of `account_id` and `site_id` used by all portal reads/writes.

### Content Flow

- Content is loaded from `website_content_blocks` through `src/lib/portal-content.ts`.
- Content location is normalized by `page_key` + `section_key` with legacy `section` fallback parsing.
- Missing blocks render fallback text and log a dev warning.
- Editable text nodes include:
  - `data-content-block-key`
  - `data-page-key`
  - `data-section-key`
- Editor bridge events are sent by `app/(website)/components/PortalEditorBridge.tsx` when `?portal_editor=1`.

### Form Flow

- `app/(website)/contact/page.tsx` loads the active form from `website_forms`.
- `app/(website)/contact/PortalContactForm.tsx` renders the form from `fields` JSON.
- Submissions post to `app/api/portal/forms/[slug]/submit/route.ts`.
- The route inserts into `website_form_submissions` with:
  - `account_id`, `site_id`, `form_id`
  - normalized `data`
  - `source_url`
  - `metadata` including UTM/referrer/landing/form slug/submitted timestamp plus server `user_agent` and `ip_address` when available.

Portal DB triggers handle CRM and UTM linkage after insertion; the website does not create CRM leads directly.
