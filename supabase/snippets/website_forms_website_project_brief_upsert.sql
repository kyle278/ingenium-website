-- Portal website form setup for the private website client intake flow.
-- Run this in Ingenium Portal so ingenium-website can resolve the form by slug.

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
  'Website Project Brief',
  'website-project-brief',
  'Private client intake form for planning a website build',
  '[
    { "key": "name", "label": "Full name", "type": "text", "required": true },
    { "key": "email", "label": "Work email", "type": "email", "required": true },
    { "key": "phone", "label": "Phone", "type": "tel", "required": false },
    { "key": "company", "label": "Company", "type": "text", "required": true },
    { "key": "website_url", "label": "Current website", "type": "url", "required": false },
    { "key": "business_summary", "label": "Business summary", "type": "textarea", "required": true },
    { "key": "target_audience", "label": "Target audience", "type": "text", "required": false },
    { "key": "current_website_status", "label": "Current website status", "type": "select", "required": true },
    { "key": "primary_goal", "label": "Primary goal", "type": "select", "required": true },
    { "key": "required_pages", "label": "Required pages", "type": "textarea", "required": true },
    { "key": "requested_features", "label": "Requested features", "type": "multiselect", "required": false },
    { "key": "feature_count", "label": "Feature count", "type": "number", "required": false },
    { "key": "timeline", "label": "Ideal timeline", "type": "select", "required": true },
    { "key": "brand_assets_status", "label": "Brand assets status", "type": "select", "required": false },
    { "key": "copy_support_needed", "label": "Copy support needed", "type": "select", "required": false },
    { "key": "inspiration_sites", "label": "Reference sites", "type": "textarea", "required": false },
    { "key": "extra_notes", "label": "Extra notes", "type": "textarea", "required": false },
    { "key": "first_name", "label": "First name", "type": "text", "required": false },
    { "key": "last_name", "label": "Last name", "type": "text", "required": false },
    { "key": "pages_summary", "label": "Pages summary", "type": "textarea", "required": false },
    { "key": "project_type", "label": "Project type", "type": "text", "required": false }
  ]'::jsonb,
  'hello@ingeniumconsulting.net',
  true,
  '{"visibility":"private","source":"ingenium-website"}'::jsonb
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
  and slug = 'website-project-brief';
