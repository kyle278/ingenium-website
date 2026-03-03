# Global Context

## System Purpose
Ingenium website is a Next.js App Router project that serves marketing pages and a contact intake flow. The website now integrates form submissions into Ingenium Portal through a secure server-side API route.

## Active Domains
- Marketing website pages under `app/(website)`
- Portal submission API under `app/api/portal`
- Portal-backed Supabase data model for form submissions

## Guardrails
- Do not expose service-role Supabase keys in client code.
- Keep contact form UX stable while evolving backend integration.
- Keep canonical tracking payload keys (`utm_*`, `cid`, `submission_url`) consistent.

## Current Operational Assumptions
- Portal form definitions are stored in `public.website_forms`.
- Submissions are written to `public.website_form_submissions`.
- Portal-side trigger handles downstream CRM attribution logic.
