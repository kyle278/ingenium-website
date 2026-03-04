import { createClient } from "@supabase/supabase-js";
import type { NextRequest } from "next/server";

type SubmitOptions = {
  routeSlug?: string | null;
};

type SubmitResult = {
  status: number;
  body: Record<string, unknown>;
};

function readEnvValue(key: string) {
  const raw = process.env[key];
  if (typeof raw !== "string") {
    return null;
  }

  const normalized = raw.trim();
  return normalized.length > 0 ? normalized : null;
}

function sanitizeSecretValue(value: string) {
  return value.replace(/\\r\\n|\\n|\\r/g, "").trim();
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

function validateServiceRoleKey(serviceRoleKey: string) {
  const anonCandidates = [
    readEnvValue("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
    readEnvValue("SUPABASE_ANON_KEY"),
  ]
    .filter((value): value is string => Boolean(value))
    .map((value) => sanitizeSecretValue(value));

  if (serviceRoleKey.startsWith("sb_publishable_") || serviceRoleKey.startsWith("sb_anon_")) {
    return "PORTAL_SUPABASE_SERVICE_ROLE_KEY is set to a publishable/anon key. Use a service-role secret key.";
  }

  if (anonCandidates.includes(serviceRoleKey)) {
    return "PORTAL_SUPABASE_SERVICE_ROLE_KEY matches the anon key. Use a service-role secret key.";
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

    return data?.id ? (data.id as string) : null;
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

  return data?.id ? (data.id as string) : null;
}

export async function handlePortalFormSubmit(
  req: NextRequest,
  options: SubmitOptions = {},
): Promise<SubmitResult> {
  try {
    const supabaseUrl = readEnvValue("NEXT_PUBLIC_PORTAL_SUPABASE_URL");
    const serviceRoleRaw = readEnvValue("PORTAL_SUPABASE_SERVICE_ROLE_KEY");
    const serviceRoleKey = serviceRoleRaw ? sanitizeSecretValue(serviceRoleRaw) : null;
    const organisationId = readEnvValue("PORTAL_ORGANISATION_ID");
    const siteId = readEnvValue("PORTAL_SITE_ID");

    if (!supabaseUrl || !serviceRoleKey || !organisationId || !siteId) {
      return {
        status: 500,
        body: {
          error:
            "Portal form submit is not configured. Required env vars: NEXT_PUBLIC_PORTAL_SUPABASE_URL, PORTAL_SUPABASE_SERVICE_ROLE_KEY, PORTAL_ORGANISATION_ID, PORTAL_SITE_ID.",
        },
      };
    }

    const serviceKeyError = validateServiceRoleKey(serviceRoleKey);
    if (serviceKeyError) {
      return {
        status: 500,
        body: {
          error: serviceKeyError,
        },
      };
    }

    let payload: unknown;
    try {
      payload = await req.json();
    } catch {
      return { status: 400, body: { error: "Invalid JSON payload." } };
    }

    const bodyRaw = asObject(payload);
    if (!bodyRaw) {
      return { status: 400, body: { error: "Invalid payload: expected object body." } };
    }

    const fields = asObject(bodyRaw.fields);
    const tracking = asObject(bodyRaw.tracking) ?? {};

    if (!fields) {
      return { status: 400, body: { error: "Invalid payload: fields must be an object." } };
    }

    const requestedFormId = asNullableString(bodyRaw.formId);
    const requestedSlug =
      asNullableString(bodyRaw.formSlug) ??
      asNullableString(options.routeSlug) ??
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
      return {
        status: 400,
        body: { error: "Unable to resolve an active portal form for this submission." },
      };
    }

    const utmSource = readCanonicalValue(tracking, fields, "utm_source", ["UTM_Source"]);
    const utmMedium = readCanonicalValue(tracking, fields, "utm_medium", ["UTM_Medium"]);
    const utmCampaign = readCanonicalValue(tracking, fields, "utm_campaign", ["UTM_Campaign"]);
    const utmTerm = readCanonicalValue(tracking, fields, "utm_term", ["UTM_Term"]);
    const utmContent = readCanonicalValue(tracking, fields, "utm_content", ["UTM_Content"]);
    const cid = readCanonicalValue(tracking, fields, "cid", ["CID"]);
    const visitorId = readCanonicalValue(tracking, fields, "visitor_id", ["visitorId"]);
    const sessionId = readCanonicalValue(tracking, fields, "session_id", ["sessionId"]);
    const trackingSiteId = readCanonicalValue(tracking, fields, "site_id", ["siteId"]);
    const submissionUrl = readCanonicalValue(tracking, fields, "submission_url", [
      "Submission url",
      "submissionUrl",
      "Submission URL",
    ]);

    if (!submissionUrl) {
      return {
        status: 400,
        body: { error: "Missing required tracking value: submission_url." },
      };
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
      visitor_id: visitorId,
      session_id: sessionId,
      site_id: trackingSiteId,
      referrer,
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
      visitor_id: visitorId,
      session_id: sessionId,
      tracking_site_id: trackingSiteId,
      diagnostics: {
        has_form_id_override: Boolean(requestedFormId),
        route_slug: options.routeSlug ?? null,
        tracking_site_id_matches_env_site_id: trackingSiteId ? trackingSiteId === siteId : null,
      },
    };

    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const { data: insertedRows, error } = await supabase
      .from("website_form_submissions")
      .insert({
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
      })
      .select("id")
      .limit(1);

    if (error) {
      return { status: 500, body: { error: `Portal insert failed: ${error.message}` } };
    }

    return {
      status: 200,
      body: {
        ok: true,
        submissionId: insertedRows?.[0]?.id ?? null,
      },
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return { status: 500, body: { error: message } };
  }
}
