import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

function readEnvValue(...keys: string[]) {
  for (const key of keys) {
    const raw = process.env[key];
    if (typeof raw === "string" && raw.trim().length > 0) {
      return raw.trim();
    }
  }

  return null;
}

function asObject(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return null;
  }

  return value as Record<string, unknown>;
}

function asNullableString(value: unknown) {
  if (typeof value !== "string") {
    return null;
  }

  const normalized = value.trim();
  return normalized.length > 0 ? normalized : null;
}

function readCanonicalValue(
  tracking: Record<string, unknown>,
  fields: Record<string, unknown>,
  canonicalKey: string,
  aliases: string[] = [],
) {
  for (const key of [canonicalKey, ...aliases]) {
    const trackingValue = asNullableString(tracking[key]);
    if (trackingValue) {
      return trackingValue;
    }
  }

  for (const key of [canonicalKey, ...aliases]) {
    const fieldsValue = asNullableString(fields[key]);
    if (fieldsValue) {
      return fieldsValue;
    }
  }

  return null;
}

async function resolveFormId(params: {
  supabaseUrl: string;
  serviceRoleKey: string;
  organisationId: string;
  siteId: string;
  requestedFormId: string | null;
  requestedSlug: string | null;
}) {
  const {
    supabaseUrl,
    serviceRoleKey,
    organisationId,
    siteId,
    requestedFormId,
    requestedSlug,
  } = params;

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  if (requestedFormId) {
    const { data, error } = await supabase
      .from("website_forms")
      .select("id")
      .eq("organisation_id", organisationId)
      .eq("site_id", siteId)
      .eq("id", requestedFormId)
      .eq("is_active", true)
      .maybeSingle();

    if (error) {
      throw new Error(`Failed to resolve form by id: ${error.message}`);
    }

    if (!data?.id) {
      return null;
    }

    return data.id as string;
  }

  if (!requestedSlug) {
    return null;
  }

  const { data, error } = await supabase
    .from("website_forms")
    .select("id")
    .eq("organisation_id", organisationId)
    .eq("site_id", siteId)
    .eq("slug", requestedSlug)
    .eq("is_active", true)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to resolve form by slug: ${error.message}`);
  }

  if (!data?.id) {
    return null;
  }

  return data.id as string;
}

export async function POST(req: NextRequest, context: RouteContext) {
  try {
    const supabaseUrl = readEnvValue(
      "NEXT_PUBLIC_PORTAL_SUPABASE_URL",
      "NEXT_PUBLIC_SUPABASE_URL",
      "SUPABASE_URL",
    );
    const serviceRoleKey = readEnvValue(
      "PORTAL_SUPABASE_SERVICE_ROLE_KEY",
      "SUPABASE_SERVICE_ROLE_KEY",
    );
    const organisationId = readEnvValue(
      "PORTAL_ORGANISATION_ID",
      "NEXT_PUBLIC_ORGANISATION_ID",
      "ORGANISATION_ID",
      "ACCOUNT_ID",
      "NEXT_PUBLIC_ACCOUNT_ID",
    );
    const siteId = readEnvValue("PORTAL_SITE_ID", "NEXT_PUBLIC_SITE_ID", "SITE_ID");

    if (!supabaseUrl || !serviceRoleKey || !organisationId || !siteId) {
      return NextResponse.json(
        {
          error:
            "Portal integration is not configured. Ensure NEXT_PUBLIC_PORTAL_SUPABASE_URL, PORTAL_SUPABASE_SERVICE_ROLE_KEY, PORTAL_ORGANISATION_ID, and PORTAL_SITE_ID are set.",
        },
        { status: 500 },
      );
    }

    let payload: unknown;
    try {
      payload = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
    }

    const bodyRaw = asObject(payload);
    if (!bodyRaw) {
      return NextResponse.json({ error: "Invalid payload: expected object body." }, { status: 400 });
    }

    const fields = asObject(bodyRaw.fields);
    const tracking = asObject(bodyRaw.tracking) ?? {};

    if (!fields) {
      return NextResponse.json({ error: "Invalid payload: fields must be an object." }, { status: 400 });
    }

    const { slug: slugParamRaw } = await context.params;
    const slugParam = asNullableString(slugParamRaw);
    const requestedFormId = asNullableString(bodyRaw.formId);
    const requestedSlug =
      asNullableString(bodyRaw.formSlug) ??
      slugParam ??
      readEnvValue("PORTAL_DEFAULT_FORM_SLUG") ??
      null;

    const formId = await resolveFormId({
      supabaseUrl,
      serviceRoleKey,
      organisationId,
      siteId,
      requestedFormId,
      requestedSlug,
    });

    if (!formId) {
      return NextResponse.json(
        { error: "Unable to resolve an active portal form for this submission." },
        { status: 400 },
      );
    }

    const utmSource = readCanonicalValue(tracking, fields, "utm_source", ["UTM_Source"]);
    const utmMedium = readCanonicalValue(tracking, fields, "utm_medium", ["UTM_Medium"]);
    const utmCampaign = readCanonicalValue(tracking, fields, "utm_campaign", ["UTM_Campaign"]);
    const utmTerm = readCanonicalValue(tracking, fields, "utm_term", ["UTM_Term"]);
    const utmContent = readCanonicalValue(tracking, fields, "utm_content", ["UTM_Content"]);
    const cid = readCanonicalValue(tracking, fields, "cid", ["CID"]);
    const submissionUrl = readCanonicalValue(tracking, fields, "submission_url", [
      "Submission url",
      "submissionUrl",
      "Submission URL",
    ]);

    if (!submissionUrl) {
      return NextResponse.json(
        { error: "Missing required tracking value: submission_url." },
        { status: 400 },
      );
    }

    const referrer =
      readCanonicalValue(tracking, fields, "referrer", ["Referrer"]) ??
      asNullableString(req.headers.get("referer"));

    const ipHeader = req.headers.get("x-forwarded-for") ?? req.headers.get("x-real-ip");
    const ipAddress = ipHeader?.split(",")[0]?.trim() || null;
    const userAgent = req.headers.get("user-agent");

    const dataPayload = {
      ...fields,
      utm_source: utmSource,
      utm_medium: utmMedium,
      utm_campaign: utmCampaign,
      utm_term: utmTerm,
      utm_content: utmContent,
      cid,
      submission_url: submissionUrl,
    };

    const metadata = {
      submitted_at: new Date().toISOString(),
      resolved_form_slug: requestedSlug,
      referrer,
      landing_url: submissionUrl,
      utm_source: utmSource,
      utm_medium: utmMedium,
      utm_campaign: utmCampaign,
      utm_term: utmTerm,
      utm_content: utmContent,
      cid,
      diagnostics: {
        has_form_id_override: Boolean(requestedFormId),
        route_slug: slugParam,
      },
    };

    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const { error } = await supabase.from("website_form_submissions").insert({
      organisation_id: organisationId,
      site_id: siteId,
      form_id: formId,
      data: dataPayload,
      source_url: submissionUrl,
      submission_url: submissionUrl,
      utm_source: utmSource,
      utm_medium: utmMedium,
      utm_campaign: utmCampaign,
      utm_term: utmTerm,
      utm_content: utmContent,
      campaign_cid: cid,
      metadata,
      ip_address: ipAddress,
      user_agent: userAgent,
    });

    if (error) {
      return NextResponse.json({ error: `Portal insert failed: ${error.message}` }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
