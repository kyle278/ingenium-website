-- Ingenium portal seed/upsert SQL for website tables.
-- Replace the two TODO UUID values once, then run this file.

begin;

-- 0) Canonical IDs from portalconnect/env
with params as (
  select
    'TODO_ACCOUNT_UUID'::uuid as account_id,
    'TODO_SITE_UUID'::uuid as site_id
)
insert into website_sites (
  id,
  account_id,
  name,
  slug,
  domain,
  description,
  status,
  features,
  metadata
)
select
  p.site_id,
  p.account_id,
  'Ingenium Website',
  'ingenium-website',
  null,
  'Public marketing website connected to Ingenium portal',
  'active',
  '{"gallery": true, "forms": true}'::jsonb,
  '{}'::jsonb
from params p
on conflict (id) do update
set
  account_id = excluded.account_id,
  name = excluded.name,
  slug = excluded.slug,
  domain = excluded.domain,
  description = excluded.description,
  status = excluded.status,
  features = excluded.features,
  metadata = excluded.metadata,
  updated_at = now();

-- 1) Content blocks (website_content_blocks)
with params as (
  select
    'TODO_ACCOUNT_UUID'::uuid as account_id,
    'TODO_SITE_UUID'::uuid as site_id
),
rows as (
  select *
  from jsonb_to_recordset(
    '[
      {
        "block_key": "contact.hero.label",
        "label": "Contact Label",
        "block_type": "text",
        "content": "Contact",
        "content_json": null,
        "section": "contact",
        "sort_order": 10,
        "is_published": true
      },
      {
        "block_key": "contact.hero.title",
        "label": "Contact Hero Title",
        "block_type": "text",
        "content": "Book a Website Strategy Call",
        "content_json": null,
        "section": "contact",
        "sort_order": 20,
        "is_published": true
      },
      {
        "block_key": "contact.hero.body",
        "label": "Contact Hero Body",
        "block_type": "text",
        "content": "Tell us about your website goals and we will map the conversion plan, timeline, and rollout.",
        "content_json": null,
        "section": "contact",
        "sort_order": 30,
        "is_published": true
      },
      {
        "block_key": "contact.expectations",
        "label": "Contact Expectations",
        "block_type": "custom",
        "content": null,
        "content_json": [
          "We respond within 1 business day",
          "Strategy call includes a conversion roadmap",
          "Security review available on request"
        ],
        "section": "contact",
        "sort_order": 40,
        "is_published": true
      },
      {
        "block_key": "contact.call_expectations",
        "label": "Contact Call Expectations",
        "block_type": "custom",
        "content": null,
        "content_json": [
          "Walk through your current website and funnel",
          "Identify quick conversion wins",
          "Map a phased rollout plan",
          "Answer security and procurement questions"
        ],
        "section": "contact",
        "sort_order": 50,
        "is_published": true
      },
      {
        "block_key": "contact.cta.title",
        "label": "Contact CTA Title",
        "block_type": "text",
        "content": "Want a deeper walkthrough?",
        "content_json": null,
        "section": "contact",
        "sort_order": 60,
        "is_published": true
      },
      {
        "block_key": "contact.cta.body",
        "label": "Contact CTA Body",
        "block_type": "text",
        "content": "We can share a full website roadmap, platform overview, and security packet.",
        "content_json": null,
        "section": "contact",
        "sort_order": 70,
        "is_published": true
      }
    ]'::jsonb
  ) as t(
    block_key text,
    label text,
    block_type text,
    content text,
    content_json jsonb,
    section text,
    sort_order integer,
    is_published boolean
  )
)
insert into website_content_blocks (
  id,
  account_id,
  site_id,
  block_key,
  label,
  block_type,
  content,
  content_json,
  section,
  sort_order,
  is_published,
  metadata
)
select
  gen_random_uuid(),
  p.account_id,
  p.site_id,
  r.block_key,
  r.label,
  r.block_type::website_content_block_type,
  r.content,
  r.content_json,
  r.section,
  r.sort_order,
  r.is_published,
  '{}'::jsonb
from params p
cross join rows r
on conflict (site_id, block_key) do update
set
  label = excluded.label,
  block_type = excluded.block_type,
  content = excluded.content,
  content_json = excluded.content_json,
  section = excluded.section,
  sort_order = excluded.sort_order,
  is_published = excluded.is_published,
  metadata = excluded.metadata,
  updated_at = now();

-- 2) Media rows (website_media)
-- file_path is the object key in the public "website-media" bucket.
with params as (
  select
    'TODO_ACCOUNT_UUID'::uuid as account_id,
    'TODO_SITE_UUID'::uuid as site_id
),
rows as (
  select *
  from jsonb_to_recordset(
    '[
      {
        "file_name": "hero-dashboard.png",
        "file_path": "hero-dashboard.png",
        "file_size": 245120,
        "mime_type": "image/png",
        "media_type": "image",
        "alt_text": "Dashboard preview",
        "caption": "Live conversion dashboard preview",
        "gallery": "default",
        "sort_order": 10,
        "width": 1600,
        "height": 900
      }
    ]'::jsonb
  ) as t(
    file_name text,
    file_path text,
    file_size integer,
    mime_type text,
    media_type text,
    alt_text text,
    caption text,
    gallery text,
    sort_order integer,
    width integer,
    height integer
  )
)
insert into website_media (
  id,
  account_id,
  site_id,
  file_name,
  file_path,
  file_size,
  mime_type,
  media_type,
  alt_text,
  caption,
  gallery,
  sort_order,
  width,
  height,
  metadata
)
select
  gen_random_uuid(),
  p.account_id,
  p.site_id,
  r.file_name,
  r.file_path,
  r.file_size,
  r.mime_type,
  r.media_type::website_media_type,
  r.alt_text,
  r.caption,
  coalesce(r.gallery, 'default'),
  coalesce(r.sort_order, 0),
  r.width,
  r.height,
  '{}'::jsonb
from params p
cross join rows r
where not exists (
  select 1
  from website_media wm
  where wm.site_id = p.site_id
    and wm.account_id = p.account_id
    and wm.file_path = r.file_path
);

-- 3) Form definitions (website_forms)
with params as (
  select
    'TODO_ACCOUNT_UUID'::uuid as account_id,
    'TODO_SITE_UUID'::uuid as site_id
),
rows as (
  select *
  from jsonb_to_recordset(
    '[
      {
        "name": "Contact Form",
        "slug": "contact",
        "description": "Website strategy call request form",
        "fields": [
          { "key": "name", "label": "Full name", "type": "text", "required": true },
          { "key": "email", "label": "Work email", "type": "email", "required": true },
          { "key": "company", "label": "Company", "type": "text", "required": false },
          { "key": "role", "label": "Role", "type": "text", "required": false },
          { "key": "website", "label": "Company website", "type": "url", "required": false },
          {
            "key": "budget",
            "label": "Budget range",
            "type": "select",
            "required": false,
            "options": ["$25k-$50k", "$50k-$100k", "$100k-$250k", "$250k+"]
          },
          { "key": "message", "label": "Tell us about your goals", "type": "textarea", "required": true }
        ],
        "notification_email": "hello@ingeniumconsulting.net",
        "is_active": true
      }
    ]'::jsonb
  ) as t(
    name text,
    slug text,
    description text,
    fields jsonb,
    notification_email text,
    is_active boolean
  )
)
insert into website_forms (
  id,
  account_id,
  site_id,
  name,
  slug,
  description,
  fields,
  notification_email,
  is_active,
  metadata
)
select
  gen_random_uuid(),
  p.account_id,
  p.site_id,
  r.name,
  r.slug,
  r.description,
  r.fields,
  r.notification_email,
  r.is_active,
  '{}'::jsonb
from params p
cross join rows r
on conflict (site_id, slug) do update
set
  name = excluded.name,
  description = excluded.description,
  fields = excluded.fields,
  notification_email = excluded.notification_email,
  is_active = excluded.is_active,
  metadata = excluded.metadata,
  updated_at = now();

-- 4) Optional example submission (website_form_submissions)
-- Run this only if you want a test record in portal inbox.
with params as (
  select
    'TODO_ACCOUNT_UUID'::uuid as account_id,
    'TODO_SITE_UUID'::uuid as site_id
),
seed_submission as (
  select false as enabled
),
contact_form as (
  select f.id as form_id
  from website_forms f
  join params p on p.site_id = f.site_id and p.account_id = f.account_id
  where f.slug = 'contact'
  limit 1
)
insert into website_form_submissions (
  id,
  account_id,
  site_id,
  form_id,
  data,
  source_url,
  ip_address,
  user_agent,
  is_read,
  is_spam,
  metadata
)
select
  gen_random_uuid(),
  p.account_id,
  p.site_id,
  cf.form_id,
  '{
    "name": "Test Lead",
    "email": "test@example.com",
    "company": "Ingenium",
    "role": "Marketing Lead",
    "website": "https://example.com",
    "budget": "$50k-$100k",
    "message": "Please contact me about enterprise website planning."
  }'::jsonb,
  'https://www.example.com/contact',
  null,
  'manual-seed-script',
  false,
  false,
  '{}'::jsonb
from params p
cross join contact_form cf
cross join seed_submission ss
where ss.enabled;

commit;

-- 5) Quick verification
-- select id, slug, is_active from website_forms where site_id = 'TODO_SITE_UUID'::uuid;
-- select block_key, is_published from website_content_blocks where site_id = 'TODO_SITE_UUID'::uuid order by sort_order;
-- select file_name, file_path from website_media where site_id = 'TODO_SITE_UUID'::uuid order by gallery, sort_order;
-- select created_at, data from website_form_submissions where site_id = 'TODO_SITE_UUID'::uuid order by created_at desc limit 5;
