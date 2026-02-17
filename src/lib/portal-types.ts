export type WebsiteContentBlockType =
  | "text"
  | "richtext"
  | "image"
  | "hero"
  | "cta"
  | "testimonial"
  | "faq"
  | "custom";

export interface WebsiteContentBlock {
  id: string;
  account_id: string;
  site_id: string;
  block_key: string;
  label: string | null;
  block_type: WebsiteContentBlockType | string | null;
  content: string | null;
  content_json: unknown;
  section: string | null;
  page_key: string | null;
  section_key: string | null;
  page_label: string | null;
  section_label: string | null;
  max_length: number | null;
  helper_text: string | null;
  is_editable: boolean | null;
  sort_order: number | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface WebsiteFormFieldOption {
  label: string;
  value: string;
}

export interface WebsiteFormField {
  key: string;
  label: string;
  type: string;
  required?: boolean;
  placeholder?: string;
  options?: Array<string | WebsiteFormFieldOption>;
  metadata?: Record<string, unknown>;
}

export interface WebsiteForm {
  id: string;
  account_id: string;
  site_id: string;
  name: string;
  slug: string;
  description: string | null;
  fields: WebsiteFormField[];
  notification_email: string | null;
  is_active: boolean;
  metadata: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
}
