-- Portal website form setup for the canonical website contact form.
-- Replace the two placeholder UUIDs and run in Ingenium Portal.

insert into public.website_forms (
  organisation_id,
  site_id,
  name,
  slug,
  description,
  fields,
  notification_email,
  is_active,
  metadata
)
values (
  'd253b486-faa4-47b9-b10f-67a7c6da3374'::uuid,
  '13f9d31e-022c-4fd6-83bb-39cd1a51a85e'::uuid,
  'Contact Form',
  'contact',
  'Main website contact form',
  '[
    { "key": "name", "label": "Name", "type": "text", "required": true },
    { "key": "email", "label": "Work Email", "type": "email", "required": true },
    { "key": "challenge", "label": "Biggest Growth Challenge", "type": "select", "required": true },
    { "key": "companySize", "label": "Company Size", "type": "select", "required": false },
    { "key": "stack", "label": "Current Stack", "type": "text", "required": false },
    { "key": "timeline", "label": "Timeline", "type": "select", "required": false },
    { "key": "budgetRange", "label": "Budget Range", "type": "select", "required": false },
    { "key": "goals", "label": "Additional Goals", "type": "textarea", "required": false },
    { "key": "first_name", "label": "First name", "type": "text", "required": false },
    { "key": "last_name", "label": "Last name", "type": "text", "required": false },
    { "key": "biggest_growth_challenge", "label": "Biggest growth challenge", "type": "text", "required": false },
    { "key": "company_size", "label": "Company size", "type": "text", "required": false },
    { "key": "current_stack", "label": "Current stack", "type": "text", "required": false },
    { "key": "budget_range", "label": "Budget range", "type": "text", "required": false },
    { "key": "additional_goals", "label": "Additional goals", "type": "textarea", "required": false },
    { "key": "intent", "label": "Intent", "type": "text", "required": false }
  ]'::jsonb,
  null,
  true,
  '{}'::jsonb
)
on conflict (site_id, slug)
do update set
  name = excluded.name,
  description = excluded.description,
  fields = excluded.fields,
  notification_email = excluded.notification_email,
  is_active = excluded.is_active,
  metadata = excluded.metadata,
  updated_at = now();

select id, slug, name
from public.website_forms
where site_id = '13f9d31e-022c-4fd6-83bb-39cd1a51a85e'::uuid
  and organisation_id = 'd253b486-faa4-47b9-b10f-67a7c6da3374'::uuid
  and slug = 'contact';
