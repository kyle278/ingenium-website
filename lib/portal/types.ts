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
  label: string;
  block_type: WebsiteContentBlockType;
  content: string | null;
  content_json: unknown;
  section: string | null;
  sort_order: number;
  is_published: boolean;
  metadata: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
}

export type WebsiteMediaType = "image" | "video" | "document";

export interface WebsiteMedia {
  id: string;
  account_id: string;
  site_id: string;
  file_name: string;
  file_path: string;
  file_size: number | null;
  mime_type: string | null;
  media_type: WebsiteMediaType;
  alt_text: string | null;
  caption: string | null;
  gallery: string;
  sort_order: number;
  width: number | null;
  height: number | null;
  metadata: Record<string, unknown> | null;
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
