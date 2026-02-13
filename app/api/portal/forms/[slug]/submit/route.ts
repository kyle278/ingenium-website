import { NextRequest, NextResponse } from "next/server";

import { createWebsiteFormSubmission, getActiveFormBySlug } from "@/lib/portal/queries";
import type { WebsiteFormField } from "@/lib/portal/types";
import { hasPortalConnectionConfig } from "@/portalconnect";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

function isMissingRequiredValue(value: unknown, field: WebsiteFormField) {
  if (!field.required) {
    return false;
  }

  if (typeof value === "boolean") {
    return field.type === "checkbox" ? !value : false;
  }

  if (value === null || value === undefined) {
    return true;
  }

  if (typeof value === "string") {
    return value.trim().length === 0;
  }

  return false;
}

function getClientIpAddress(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() ?? null;
  }

  return request.headers.get("x-real-ip");
}

export async function POST(request: NextRequest, context: RouteContext) {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY || !hasPortalConnectionConfig()) {
    return NextResponse.json(
      { error: "Portal connection is not configured on this deployment." },
      { status: 503 },
    );
  }

  const { slug } = await context.params;
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return NextResponse.json({ error: "Request body must be an object." }, { status: 400 });
  }

  const body = payload as Record<string, unknown>;
  const submissionData = body.data;

  if (!submissionData || typeof submissionData !== "object" || Array.isArray(submissionData)) {
    return NextResponse.json(
      { error: "Submission `data` must be a JSON object." },
      { status: 400 },
    );
  }

  let form = null;

  try {
    form = await getActiveFormBySlug(slug);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to load form.";
    return NextResponse.json({ error: message }, { status: 500 });
  }

  if (!form) {
    return NextResponse.json({ error: "Form not found." }, { status: 404 });
  }

  const submissionRecord = submissionData as Record<string, unknown>;
  const missingRequiredFields = form.fields.filter((field) =>
    isMissingRequiredValue(submissionRecord[field.key], field),
  );

  if (missingRequiredFields.length > 0) {
    return NextResponse.json(
      {
        error: "Missing required fields.",
        missing: missingRequiredFields.map((field) => field.key),
      },
      { status: 400 },
    );
  }

  const sourceUrl =
    typeof body.source_url === "string"
      ? body.source_url
      : typeof body.sourceUrl === "string"
        ? body.sourceUrl
        : request.headers.get("referer");

  const userAgent =
    typeof body.user_agent === "string"
      ? body.user_agent
      : typeof body.userAgent === "string"
        ? body.userAgent
        : request.headers.get("user-agent");

  const ipAddress =
    typeof body.ip_address === "string"
      ? body.ip_address
      : typeof body.ipAddress === "string"
        ? body.ipAddress
        : getClientIpAddress(request);

  try {
    await createWebsiteFormSubmission({
      formId: form.id,
      data: submissionRecord,
      sourceUrl,
      userAgent,
      ipAddress,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
