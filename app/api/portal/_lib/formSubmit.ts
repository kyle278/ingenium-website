import type { NextRequest } from "next/server";

import { readPortalServerConfig } from "@/lib/portalIntegration/config";
import { createPortalServerClient, getPortalFormBySlug } from "@/lib/portalIntegration/server";
import type { PortalFormSubmitRequest } from "@/lib/portalIntegration/types";

type SubmitOptions = {
  routeSlug?: string | null;
};

type SubmitResult = {
  status: number;
  body: Record<string, unknown>;
};

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
    const fieldValue = asNullableString(fields[key]);
    if (fieldValue) {
      return fieldValue;
    }
  }

  return null;
}

function readIpAddress(req: NextRequest) {
  const ipHeader = req.headers.get("x-forwarded-for") ?? req.headers.get("x-real-ip");
  return ipHeader?.split(",")[0]?.trim() || null;
}

async function parseSubmitPayload(req: NextRequest) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return { error: "Invalid JSON payload." } as const;
  }

  const body = asObject(payload) as PortalFormSubmitRequest | null;
  if (!body) {
    return { error: "Invalid payload: expected object body." } as const;
  }

  const fields = asObject(body.fields);
  const tracking = asObject(body.tracking) ?? {};

  if (!fields) {
    return { error: "Invalid payload: fields must be an object." } as const;
  }

  return {
    body,
    fields,
    tracking,
  } as const;
}

export async function handlePortalFormSubmit(
  req: NextRequest,
  options: SubmitOptions = {},
): Promise<SubmitResult> {
  try {
    const parsedPayload = await parseSubmitPayload(req);
    if ("error" in parsedPayload) {
      return { status: 400, body: { error: parsedPayload.error } };
    }

    const { body, fields, tracking } = parsedPayload;
    const config = readPortalServerConfig();
    const requestedFormId = asNullableString(body.formId);
    const requestedSlug =
      asNullableString(body.formSlug) ?? asNullableString(options.routeSlug) ?? config.defaultFormSlug;
    const requestedFormName = asNullableString(body.formName);
    const idempotencyKey = asNullableString(body.idempotencyKey);

    if (!requestedSlug) {
      return {
        status: 400,
        body: { error: "Missing required form identifier: formSlug." },
      };
    }

    const { supabase } = createPortalServerClient();
    const resolvedForm = await getPortalFormBySlug(requestedSlug);

    if (!resolvedForm) {
      return {
        status: 400,
        body: { error: `No active Portal website form found for slug "${requestedSlug}".` },
      };
    }

    if (requestedFormId && requestedFormId !== resolvedForm.id) {
      return {
        status: 400,
        body: {
          error: `Provided formId does not match the active Portal form UUID for slug "${requestedSlug}".`,
        },
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
    const submissionUrl = readCanonicalValue(tracking, fields, "submission_url", [
      "submissionUrl",
      "Submission URL",
    ]);
    const landingUrl = readCanonicalValue(tracking, fields, "landing_url", ["landingUrl"]);
    const referrer =
      readCanonicalValue(tracking, fields, "referrer", ["Referrer"]) ??
      asNullableString(req.headers.get("referer"));

    if (!submissionUrl) {
      return {
        status: 400,
        body: { error: "Missing required tracking value: submission_url." },
      };
    }

    if (idempotencyKey) {
      const { data: existingRows, error: existingError } = await supabase
        .from("website_form_submissions")
        .select("id")
        .eq("organisation_id", config.organisationId)
        .eq("site_id", config.siteId)
        .eq("form_id", resolvedForm.id)
        .contains("metadata", { idempotency_key: idempotencyKey })
        .limit(1);

      if (existingError) {
        return {
          status: 500,
          body: { error: `Failed duplicate submission check: ${existingError.message}` },
        };
      }

      const existingId = existingRows?.[0]?.id;
      if (existingId) {
        return {
          status: 200,
          body: {
            ok: true,
            duplicate: true,
            submissionId: existingId,
          },
        };
      }
    }

    const metadata = {
      submitted_at: new Date().toISOString(),
      referrer,
      landing_url: landingUrl,
      utm_source: utmSource,
      utm_medium: utmMedium,
      utm_campaign: utmCampaign,
      utm_term: utmTerm,
      utm_content: utmContent,
      cid,
      visitor_id: visitorId,
      session_id: sessionId,
      form_slug: resolvedForm.slug,
      form_name: requestedFormName ?? resolvedForm.name,
      idempotency_key: idempotencyKey,
    };

    const dataPayload = {
      ...fields,
      utm_source: utmSource,
      utm_medium: utmMedium,
      utm_campaign: utmCampaign,
      utm_term: utmTerm,
      utm_content: utmContent,
      cid,
      submission_url: submissionUrl,
      visitor_id: visitorId,
      session_id: sessionId,
      site_id: config.siteId,
    };

    const { data: insertedRows, error } = await supabase
      .from("website_form_submissions")
      .insert({
        organisation_id: config.organisationId,
        site_id: config.siteId,
        form_id: resolvedForm.id,
        data: dataPayload,
        source_url: submissionUrl,
        submission_url: submissionUrl,
        utm_source: utmSource,
        utm_medium: utmMedium,
        utm_campaign: utmCampaign,
        utm_term: utmTerm,
        utm_content: utmContent,
        campaign_cid: cid,
        tracking_visitor_id: visitorId,
        tracking_session_id: sessionId,
        metadata,
        ip_address: readIpAddress(req),
        user_agent: asNullableString(req.headers.get("user-agent")),
      })
      .select("id")
      .limit(1);

    if (error) {
      return {
        status: 500,
        body: { error: `Portal insert failed: ${error.message}` },
      };
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
