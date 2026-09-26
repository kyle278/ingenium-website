import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { acceptedReceipt, sanitizeTracking, validateEnquiry } from "@/lib/enquiry-contract";
import { PORTAL_FORM_SUBMIT_ENDPOINT, PORTAL_SITE_ID } from "@/lib/portalIntegration/public";

export const runtime = "nodejs";
// Bounded same-process replay protection only. Durable cross-instance idempotency
// still requires the Portal database contract and is a documented release gate.
const requests = new Map<string, { hash: string; expires: number; result: Promise<{ status: number; body: Record<string, unknown> }> }>();
const attempts = new Map<string, { count: number; expires: number }>();
export async function POST(req: Request) {
  const origin = req.headers.get("origin");
  if (!origin || origin !== new URL(req.url).origin) return NextResponse.json({ error: "Please send this request from the website." }, { status: 403 });
  if (!req.headers.get("content-type")?.includes("application/json")) return NextResponse.json({ error: "Invalid request format." }, { status: 415 });
  if (Number(req.headers.get("content-length")) > 64000) return NextResponse.json({ error: "Your request is too long." }, { status: 413 });
  const raw = await req.text();
  if (Buffer.byteLength(raw) > 64000) return NextResponse.json({ error: "Your request is too long." }, { status: 413 });
  let body;
  try { body = JSON.parse(raw); } catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }
  const validation = validateEnquiry(body);
  if (validation) return NextResponse.json({ error: validation }, { status: 422 });
  if (body.fields.website_fax) return NextResponse.json({ error: "We could not accept this request. Please contact us by email." }, { status: 422 });
  const now = Date.now();
  for (const [key, entry] of requests) if (entry.expires < now) requests.delete(key);
  for (const [key, entry] of attempts) if (entry.expires < now) attempts.delete(key);
  const fingerprintFields = Object.fromEntries(Object.entries(body.fields).filter(([key]) => key !== "consent_captured_at").sort(([a], [b]) => a.localeCompare(b)));
  const hash = createHash("sha256").update(JSON.stringify({ slug: body.form_slug, fields: fingerprintFields })).digest("hex");
  const prior = requests.get(body.request_id);
  if (prior) {
    if (prior.hash !== hash) return NextResponse.json({ error: "This enquiry is already being processed. Please email us if you need to change it." }, { status: 409 });
    const result = await prior.result; return NextResponse.json(result.body, { status: result.status });
  }
  const ip = createHash("sha256").update(req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown").digest("hex");
  const rate = attempts.get(ip) || { count: 0, expires: now + 600000 };
  if (rate.count >= 8 || requests.size >= 2000 || attempts.size >= 5000) return NextResponse.json({ error: "Please wait a few minutes or contact us by email." }, { status: 429 });
  rate.count++; attempts.set(ip, rate);
  const result = (async () => {
    try {
      const tracking = sanitizeTracking(body.tracking);
      const response = await fetch(PORTAL_FORM_SUBMIT_ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json", Origin: origin }, body: JSON.stringify({ site_id: PORTAL_SITE_ID, form_slug: body.form_slug, fields: body.fields, tracking, metadata: { website_request_id: body.request_id, consent_captured_at: new Date().toISOString(), first_touch: sanitizeTracking(body.tracking?.first_touch), latest_touch: sanitizeTracking(body.tracking?.latest_touch) } }), signal: AbortSignal.timeout(20000) });
      const receipt = await response.json().catch(() => null);
      if (!response.ok || !acceptedReceipt(receipt)) return { status: 502, body: { error: "We could not confirm receipt. Please email hello@ingeniumconsulting.net before sending again." } };
      return { status: 201, body: { ok: true, submission_id: receipt.submission_id } };
    } catch { return { status: 503, body: { error: "We could not confirm receipt. It may have reached us. Please email hello@ingeniumconsulting.net before sending again." } }; }
  })();
  requests.set(body.request_id, { hash, expires: now + 3600000, result });
  const resolved = await result; return NextResponse.json(resolved.body, { status: resolved.status });
}
