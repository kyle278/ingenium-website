import "server-only";

import { createSupabaseAnonClient } from "@/src/lib/supabase";
import type { WebsiteForm } from "@/src/lib/portal-types";
import { portalConnect } from "@/src/portalconnect";

export interface WebsiteSubmissionMetadata {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_term: string | null;
  utm_content: string | null;
  referrer: string | null;
  landing_url: string | null;
  form_slug: string;
  submitted_at: string;
  user_agent?: string | null;
  ip_address?: string | null;
}

interface CreateWebsiteFormSubmissionInput {
  formId: string;
  data: Record<string, unknown>;
  sourceUrl: string | null;
  metadata: WebsiteSubmissionMetadata;
  ipAddress?: string | null;
  userAgent?: string | null;
}

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

function readTextValue(value: unknown) {
  if (typeof value !== "string") {
    return null;
  }

  const normalized = value.trim();
  return normalized.length > 0 ? normalized : null;
}

function splitName(fullName: string) {
  const parts = fullName.split(/\s+/).filter(Boolean);

  if (parts.length === 0) {
    return {
      first_name: null,
      last_name: null,
    };
  }

  if (parts.length === 1) {
    return {
      first_name: parts[0] ?? null,
      last_name: null,
    };
  }

  return {
    first_name: parts[0] ?? null,
    last_name: parts.slice(1).join(" "),
  };
}

export function normalizeSubmissionData(data: Record<string, unknown>) {
  const normalizedData: Record<string, unknown> = { ...data };

  const email = readTextValue(data.email) ?? readTextValue(data.work_email) ?? readTextValue(data.workEmail);
  const phone = readTextValue(data.phone) ?? readTextValue(data.mobile);
  const company = readTextValue(data.company) ?? readTextValue(data.organization);
  const title = readTextValue(data.title) ?? readTextValue(data.role);
  const firstName = readTextValue(data.first_name) ?? readTextValue(data.firstName);
  const lastName = readTextValue(data.last_name) ?? readTextValue(data.lastName);
  const fullName =
    readTextValue(data.name) ?? readTextValue(data.full_name) ?? readTextValue(data.fullName);

  if (email) {
    normalizedData.email = email;
  }

  if (phone) {
    normalizedData.phone = phone;
  }

  if (company) {
    normalizedData.company = company;
  }

  if (title) {
    normalizedData.title = title;
  }

  if (!firstName && !lastName && fullName) {
    const split = splitName(fullName);

    if (split.first_name) {
      normalizedData.first_name = split.first_name;
    }

    if (split.last_name) {
      normalizedData.last_name = split.last_name;
    }
  } else {
    if (firstName) {
      normalizedData.first_name = firstName;
    }

    if (lastName) {
      normalizedData.last_name = lastName;
    }
  }

  return normalizedData;
}

export async function getActiveFormByIdentifier(identifier: string) {
  const supabase = createSupabaseAnonClient();
  const escapedIdentifier = identifier.replaceAll(",", "\\,");
  const { data, error } = await supabase
    .from("website_forms")
    .select("*")
    .eq("account_id", portalConnect.account_id)
    .eq("site_id", portalConnect.site_id)
    .eq("is_active", true)
    .or(`slug.eq.${escapedIdentifier},name.eq.${escapedIdentifier}`)
    .limit(1)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to load website form "${identifier}": ${error.message}`);
  }

  return normalizeWebsiteForm(data);
}

export async function getActiveFormBySlug(slug: string) {
  const supabase = createSupabaseAnonClient();
  const { data, error } = await supabase
    .from("website_forms")
    .select("*")
    .eq("account_id", portalConnect.account_id)
    .eq("site_id", portalConnect.site_id)
    .eq("is_active", true)
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to load website form "${slug}": ${error.message}`);
  }

  return normalizeWebsiteForm(data);
}

export async function createWebsiteFormSubmission({
  formId,
  data,
  sourceUrl,
  metadata,
  ipAddress = null,
  userAgent = null,
}: CreateWebsiteFormSubmissionInput) {
  const supabase = createSupabaseAnonClient();
  const normalizedData = normalizeSubmissionData(data);
  const metadataWithServerContext = {
    ...metadata,
    user_agent: metadata.user_agent ?? userAgent ?? null,
    ip_address: metadata.ip_address ?? ipAddress ?? null,
  };

  const { error } = await supabase.from("website_form_submissions").insert({
    account_id: portalConnect.account_id,
    site_id: portalConnect.site_id,
    form_id: formId,
    data: normalizedData,
    source_url: sourceUrl,
    ip_address: ipAddress,
    user_agent: userAgent,
    metadata: metadataWithServerContext,
  });

  if (error) {
    throw new Error(`Failed to submit website form: ${error.message}`);
  }
}
