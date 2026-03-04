# Global Context

## System Purpose
Ingenium website is a Next.js App Router project that serves marketing pages, captures visitor interaction events, and submits contact intake data into Ingenium Portal.

## Active Domains
- Marketing website pages under `app/(website)`
- Browser tracking runtime via Ingenium tracker script loaded from Portal app
- Browser event ingestion to `${NEXT_PUBLIC_INGENIUM_PORTAL_APP_URL}/api/websites/tracking/events`
- Portal submission API under `app/api/portal`
- Portal-backed Supabase data model for form submissions

## Guardrails
- Do not expose service-role Supabase keys in client code.
- Keep browser event tracking delivery pointed to Portal tracking ingestion endpoint.
- Use canonical tracking/linkage IDs consistently: `visitor_id`, `session_id`, `site_id`.
- Keep contact form UX stable while evolving backend integration.
- Keep canonical tracking payload keys (`utm_*`, `cid`, `submission_url`, `visitor_id`, `session_id`, `site_id`) consistent.
- Keep marketing copy encoding clean and ASCII-safe where possible to prevent mojibake in production UI.

## Current Operational Assumptions
- Tracker script initializes only when `NEXT_PUBLIC_INGENIUM_PORTAL_APP_URL` and `NEXT_PUBLIC_INGENIUM_SITE_ID` are present.
- Custom interaction events are flushed immediately after `track(...)`.
- Portal form definitions are stored in `public.website_forms`.
- Submissions are written to `public.website_form_submissions`.
- Portal-side trigger handles downstream CRM attribution logic and event processing.
- Current known dependency issue: portal trigger execution for new submissions is currently blocked by an upstream SQL ambiguity on `submission_url`.
