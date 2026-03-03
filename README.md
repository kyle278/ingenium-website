# Ingenium Website

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Current Architecture

- Framework: Next.js App Router
- Styling: Tailwind CSS + `app/globals.css`
- Content model: static in-code fallback objects per route page
- Contact flow: progressive form in `app/(website)/contact/ContactForm.tsx` posting to `app/api/portal/forms/[slug]/submit/route.ts`

The website keeps page content static in code, while form submissions are forwarded to Ingenium Portal.

## Portal Form Integration Env

Set these values in `.env.local`:

```bash
NEXT_PUBLIC_PORTAL_SUPABASE_URL=https://<portal-project>.supabase.co
PORTAL_SUPABASE_SERVICE_ROLE_KEY=<portal-service-role-key>
PORTAL_ORGANISATION_ID=<organisation-uuid>
PORTAL_SITE_ID=<website-site-uuid>
PORTAL_DEFAULT_FORM_SLUG=contact
```

## Key Route Files

- Home: `app/(website)/page.tsx`
- Services: `app/(website)/*/page.tsx`
- Team: `app/(website)/team/page.tsx`
- Projects: `app/(website)/projects/page.tsx` and `app/(website)/projects/[slug]/page.tsx`
- Shared layout/nav/footer: `app/(website)/layout.tsx`

## Design Standards

UI and UX implementation standards are defined in:

- `AGENTS/DesignLanguage.md`

Use that file as the source of truth for visual system, layout, motion, and component decisions.
