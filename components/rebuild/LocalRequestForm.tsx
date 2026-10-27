"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { clearEnquiryRequestId, enquiryRequestId, enquiryTracking, recordAcceptedLead, sendEnquiry } from "@/lib/enquiry-client";
import { MARKETING_NOTICE, NOTICE_VERSION, PRIVACY_NOTICE, validateEnquiry } from "@/lib/enquiry-contract";
import CallRequestJourney from "./CallRequestJourney";

export default function LocalRequestForm({ kind, initialService, initialPackage }: { kind: "call" | "visibility"; initialService?: string; initialPackage?: string }) {
  return kind === "call" ? <CallRequestJourney initialService={initialService} initialPackage={initialPackage} /> : <VisibilityRequestForm />;
}

function VisibilityRequestForm() {
  const [status, setStatus] = useState<"idle" | "pending" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const sending = useRef(false);
  const requestId = useRef("");
  const errorRef = useRef<HTMLParagraphElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  useEffect(() => { if (status === "success") successRef.current?.focus(); if (status === "error") errorRef.current?.focus(); }, [status]);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending.current || status === "success" || !event.currentTarget.reportValidity()) return;
    const data = new FormData(event.currentTarget);
    const fields: Record<string, string> = {};
    data.forEach((value, key) => { if (typeof value === "string") fields[key] = value.trim(); });
    Object.assign(fields, {
      intent: "visibility-check", budget_range: "", timezone: "Europe/Dublin",
      privacy_consent: data.has("privacy_consent") ? "true" : "false",
      marketing_consent: data.has("marketing_consent") ? "true" : "false",
      consent_version: NOTICE_VERSION, consent_text_snapshot: PRIVACY_NOTICE,
      marketing_consent_text: MARKETING_NOTICE,
      first_name: fields.name.split(/\s+/)[0], last_name: fields.name.split(/\s+/).slice(1).join(" "),
    });
    fields.message = `Free Google Visibility Check: ${fields.company}; service: ${fields.trade}; town: ${fields.town}; website/profile: ${fields.website || "not supplied"}.`;
    requestId.current ||= enquiryRequestId("visibility-check");
    const payload = { request_id: requestId.current, form_slug: "contact", fields, tracking: enquiryTracking() };
    const invalid = validateEnquiry(payload);
    if (invalid) { setError(invalid); setStatus("error"); return; }
    sending.current = true; setStatus("pending"); setError("");
    try {
      const receipt = await sendEnquiry(payload);
      clearEnquiryRequestId("visibility-check");
      recordAcceptedLead(receipt.submission_id, fields.service);
      setStatus("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "We couldn’t confirm receipt. Please email hello@ingeniumconsulting.net before sending again.");
      setStatus("error");
    } finally { sending.current = false; }
  }

  if (status === "success") return <div ref={successRef} tabIndex={-1} className="local-receipt" role="status"><CheckCircle2 size={32} aria-hidden="true" /><h2>Your visibility check is requested.</h2><p>We’ll review your business, service and town, then email your check to the address you supplied. This is a human review, so there’s no instant score.</p><Link href="/">Back to the homepage ↗</Link></div>;

  return <form className="rebuild-form local-request-form" onSubmit={submit} aria-busy={status === "pending"}>
    <fieldset disabled={status === "pending"}><legend>Where should we look?</legend>
      <input type="hidden" name="service" value="website" />
      <div className="rebuild-field"><label htmlFor="visibility-company">Business name <span>(required)</span></label><input id="visibility-company" name="company" autoComplete="organization" required minLength={2} maxLength={160} /></div>
      <div className="local-form-pair"><div className="rebuild-field"><label htmlFor="visibility-trade">Main service <span>(required)</span></label><input id="visibility-trade" name="trade" required minLength={2} maxLength={160} placeholder="e.g. electrician" /></div><div className="rebuild-field"><label htmlFor="visibility-town">Town or area <span>(required)</span></label><input id="visibility-town" name="town" required minLength={2} maxLength={160} placeholder="e.g. Carlow" /></div></div>
      <div className="rebuild-field"><label htmlFor="visibility-website">Website or Google profile <span>(optional)</span></label><input id="visibility-website" name="website" maxLength={500} placeholder="A link, if you have one" /><small>No website yet? Leave this blank.</small></div>
      <div className="local-form-pair"><div className="rebuild-field"><label htmlFor="visibility-name">Your name <span>(required)</span></label><input id="visibility-name" name="name" autoComplete="name" required minLength={2} maxLength={160} /></div><div className="rebuild-field"><label htmlFor="visibility-email">Email <span>(required)</span></label><input id="visibility-email" name="email" type="email" autoComplete="email" required maxLength={254} /></div></div>
      <div hidden aria-hidden="true"><label htmlFor="visibility-fax">Leave this empty</label><input id="visibility-fax" name="website_fax" tabIndex={-1} autoComplete="off" /></div>
      <div className="rebuild-check"><input id="visibility-privacy" name="privacy_consent" type="checkbox" required /><label htmlFor="visibility-privacy">{PRIVACY_NOTICE} <Link href="/privacy" target="_blank">Read the Privacy Policy</Link> (required)</label></div>
      <div className="rebuild-check"><input id="visibility-marketing" name="marketing_consent" type="checkbox" /><label htmlFor="visibility-marketing">{MARKETING_NOTICE} (optional)</label></div>
      {error && <p ref={errorRef} tabIndex={-1} className="rebuild-form-error" role="alert">{error}</p>}
      <button type="submit" className="rebuild-button" disabled={status === "pending"}>{status === "pending" ? "Sending your request…" : "Request my free visibility check"}<ArrowUpRight size={18} aria-hidden="true" /></button>
      <p className="local-form-note">We’ll email your review. Requesting it doesn’t book a call or sign you up for marketing.</p>
    </fieldset>
  </form>;
}
