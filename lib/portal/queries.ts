import "server-only";

import { ACCOUNT_ID, SITE_ID } from "@/portalconnect";
import { createPortalSupabaseServerClient } from "@/lib/portal/supabase.server";
import type { WebsiteContentBlock, WebsiteForm, WebsiteMedia } from "@/lib/portal/types";

const WEBSITE_MEDIA_PUBLIC_PATH = "/storage/v1/object/public/website-media/";

function normalizeObject(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return null;
  }

  return value as Record<string, unknown>;
}

function normalizeWebsiteForm(raw: unknown): WebsiteForm | null {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return null;
  }

  const form = raw as WebsiteForm;
  return {
    ...form,
    fields: Array.isArray(form.fields) ? form.fields : [],
    metadata: normalizeObject(form.metadata),
  };
}

export function getWebsiteMediaPublicUrl(filePath: string) {
  const supabaseUrl = process.env.SUPABASE_URL;

  if (!supabaseUrl) {
    throw new Error("Missing required environment variable: SUPABASE_URL");
  }

  return `${supabaseUrl}${WEBSITE_MEDIA_PUBLIC_PATH}${filePath.replace(/^\/+/, "")}`;
}

export async function getPublishedContentBlocks(section?: string): Promise<WebsiteContentBlock[]> {
  const supabase = createPortalSupabaseServerClient();
  let query = supabase
    .from("website_content_blocks")
    .select("*")
    .eq("account_id", ACCOUNT_ID)
    .eq("site_id", SITE_ID)
    .eq("is_published", true)
    .order("sort_order", { ascending: true })
    .order("block_key", { ascending: true });

  if (section) {
    query = query.eq("section", section);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(`Failed to load website content blocks: ${error.message}`);
  }

  return (data ?? []) as WebsiteContentBlock[];
}

export async function getPublishedContentBlockMap(section?: string) {
  const blocks = await getPublishedContentBlocks(section);

  return blocks.reduce<Record<string, WebsiteContentBlock>>((accumulator, block) => {
    accumulator[block.block_key] = block;
    return accumulator;
  }, {});
}

export async function getWebsiteMedia(gallery?: string): Promise<WebsiteMedia[]> {
  const supabase = createPortalSupabaseServerClient();
  let query = supabase
    .from("website_media")
    .select("*")
    .eq("account_id", ACCOUNT_ID)
    .eq("site_id", SITE_ID)
    .order("gallery", { ascending: true })
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (gallery) {
    query = query.eq("gallery", gallery);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(`Failed to load website media: ${error.message}`);
  }

  return (data ?? []) as WebsiteMedia[];
}

export async function getActiveFormBySlug(slug: string) {
  const supabase = createPortalSupabaseServerClient();
  const { data, error } = await supabase
    .from("website_forms")
    .select("*")
    .eq("account_id", ACCOUNT_ID)
    .eq("site_id", SITE_ID)
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to load website form "${slug}": ${error.message}`);
  }

  return normalizeWebsiteForm(data);
}

interface CreateWebsiteFormSubmissionInput {
  formId: string;
  data: Record<string, unknown>;
  sourceUrl?: string | null;
  ipAddress?: string | null;
  userAgent?: string | null;
}

export async function createWebsiteFormSubmission({
  formId,
  data,
  sourceUrl = null,
  ipAddress = null,
  userAgent = null,
}: CreateWebsiteFormSubmissionInput) {
  const supabase = createPortalSupabaseServerClient();
  const { error } = await supabase.from("website_form_submissions").insert({
    account_id: ACCOUNT_ID,
    site_id: SITE_ID,
    form_id: formId,
    data,
    source_url: sourceUrl,
    ip_address: ipAddress,
    user_agent: userAgent,
  });

  if (error) {
    throw new Error(`Failed to submit website form: ${error.message}`);
  }
}
