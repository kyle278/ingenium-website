"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AlertCircle, X } from "lucide-react";

import { clearEnquiryRequestId, enquiryRequestId, enquiryTracking, recordAcceptedLead, sendEnquiry } from "@/lib/enquiry-client";
import { NOTICE_VERSION, PRIVACY_NOTICE, validateEnquiry } from "@/lib/enquiry-contract";
import FormStepHeading from "@/components/rebuild/FormStepHeading";
import {
  BOOKING_URL,
  BUSINESS_TYPES,
  DETAILS_MAX,
  MAIN_NEEDS,
  MARKETING_TEXT,
  SOMETHING_ELSE,
  STARTER_FORM_SLUG,
  TEAM_SIZES,
  routeStarterLead,
  type CtaPosition,
  type LeadRoute,
} from "@/lib/starter-website";
import { trackStarter } from "./track";

type Values = { name: string; email: string; phone: string; team_size: string; business_type: string; main_need: string; details: string; privacy: boolean; marketing: boolean };
type FieldName = "name" | "email" | "phone" | "details";

const EMPTY: Values = { name: "", email: "", phone: "", team_size: "", business_type: "", main_need: "", details: "", privacy: false, marketing: false };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function fieldError(field: FieldName, values: Values): string {
  if (field === "name") return values.name.trim().length >= 2 ? "" : "Enter your name.";
  if (field === "email") return EMAIL_PATTERN.test(values.email.trim()) ? "" : "Enter an email like name@business.ie";
  if (field === "phone") return !values.phone.trim() || /^[0-9+()\s-]{6,24}$/.test(values.phone.trim()) ? "" : "Enter a phone number, or leave it blank.";
  return values.details.length <= DETAILS_MAX ? "" : `Keep this under ${DETAILS_MAX} characters.`;
}

function firstName(name: string) {
  return name.trim().split(/\s+/)[0] || "there";
}

export default function QualifyDialog({ open, position, onClose, onSubmitted }: {
  open: boolean;
  position: CtaPosition;
  onClose: () => void;
  onSubmitted: (route: LeadRoute) => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const form = useRef<HTMLFormElement>(null);
  const firstField = useRef<HTMLInputElement>(null);
  const honeypot = useRef<HTMLInputElement>(null);
  const openedAt = useRef(0);
  const started = useRef(false);
  const ids = useId();

  const [values, setValues] = useState<Values>(EMPTY);
  const [step, setStep] = useState<0 | 1>(0);
  const pending = useRef(false);
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [submitError, setSubmitError] = useState("");
  const [result, setResult] = useState<{ route: LeadRoute; name: string } | null>(null);

  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    if (open && !element.open) {
      element.showModal();
      if (!openedAt.current) openedAt.current = Date.now();
      if (!result) requestAnimationFrame(() => step === 0 ? firstField.current?.focus() : form.current?.querySelector<HTMLElement>('[name="privacy_consent"]')?.focus());
    }
    if (!open && element.open) element.close();
  }, [open, result, step]);

  function requestClose() {
    if (started.current && !result) trackStarter("starter_form_close_unsubmitted", { cta_position: position });
    onClose();
  }

  function update<K extends keyof Values>(key: K, value: Values[K]) {
    if (!started.current) {
      started.current = true;
      trackStarter("starter_form_start", { cta_position: position });
    }
    setValues((current) => ({ ...current, [key]: value }));
  }

  const showDetails = values.main_need === SOMETHING_ELSE;
  const visibleFields: FieldName[] = showDetails ? ["name", "email", "phone", "details"] : ["name", "email", "phone"];
  const errorFor = (field: FieldName) => (touched[field] ? fieldError(field, values) : "");

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (pending.current || result) return;
    setTouched(Object.fromEntries(visibleFields.map((field) => [field, true])));
    const firstInvalid = visibleFields.find((field) => fieldError(field, values));
    if (firstInvalid) {
      setStep(0);
      form.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    if (step === 0) { setStep(1); setSubmitError(""); setStatus("idle"); return; }
    if (!values.privacy) {
      setStatus("error"); setSubmitError("Please acknowledge the Privacy Policy before sending.");
      form.current?.querySelector<HTMLElement>('[name="privacy_consent"]')?.focus();
      return;
    }

    setStatus("sending");
    setSubmitError("");
    const requestId = enquiryRequestId(STARTER_FORM_SLUG);
    const fields: Record<string, string> = {
      name: values.name.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      team_size: values.team_size,
      business_type: values.business_type,
      main_need: values.main_need,
      details: showDetails ? values.details.trim() : "",
      marketing_consent: values.marketing ? "true" : "false",
      privacy_consent: values.privacy ? "true" : "false",
      consent_version: NOTICE_VERSION,
      consent_text_snapshot: PRIVACY_NOTICE,
      marketing_consent_text: MARKETING_TEXT,
      consent_captured_at: new Date().toISOString(),
      first_name: values.name.trim().split(/\s+/)[0],
      last_name: values.name.trim().split(/\s+/).slice(1).join(" "),
      service: "website",
      intent: STARTER_FORM_SLUG,
      biggest_growth_challenge: [values.main_need, showDetails ? values.details.trim() : ""].filter(Boolean).join(". "),
      cta_position: position,
      form_opened_from: location.pathname,
      submitted_at: new Date().toISOString(),
      fill_ms: String(Date.now() - openedAt.current),
      website_fax: honeypot.current?.value ?? "",
    };
    const payload = { request_id: requestId, form_slug: STARTER_FORM_SLUG, fields, tracking: enquiryTracking() };
    const invalid = validateEnquiry(payload);
    if (invalid) { setStatus("error"); setSubmitError(invalid); return; }
    pending.current = true;
    try {
      const receipt = await sendEnquiry(payload);
      clearEnquiryRequestId(STARTER_FORM_SLUG);
      const route = (receipt as { lead_route?: LeadRoute }).lead_route ?? routeStarterLead(fields);
      recordAcceptedLead(receipt.submission_id, STARTER_FORM_SLUG);
      trackStarter("starter_form_submit", { cta_position: position, lead_route: route });
      setResult({ route, name: fields.name });
      setStatus("idle");
      onSubmitted(route);
      requestAnimationFrame(() => dialog.current?.querySelector<HTMLElement>(".starter-result h2")?.focus());
    } catch (error) {
      setStatus("error");
      setSubmitError(error instanceof Error ? error.message : "We could not send your answers. Please email hello@ingeniumconsulting.net.");
    } finally { pending.current = false; }
  }

  const titleId = `${ids}-title`;

  return (
    <dialog
      ref={dialog}
      className="starter-dialog"
      aria-labelledby={titleId}
      onCancel={(event) => { event.preventDefault(); requestClose(); }}
      onClick={(event) => { if (event.target === dialog.current) requestClose(); }}
    >
      <div className="starter-dialog-card">
        <button type="button" className="starter-dialog-close" aria-label="Close" onClick={requestClose}><X size={22} aria-hidden="true" /></button>

        {result ? (
          <ResultScreen titleId={titleId} route={result.route} name={firstName(result.name)} onClose={requestClose} />
        ) : (
          <>
            <h2 id={titleId} className="starter-dialog-title">Let&apos;s see if the Starter Website fits your business.</h2>
            <p className="starter-dialog-intro">Six quick questions. We&apos;ll reply within 1 working day.</p>

            <form ref={form} className="starter-form" noValidate onSubmit={submit}>
              <FormStepHeading step={step} />
              <fieldset className="starter-form-fields" hidden={step !== 0} disabled={status === "sending"} aria-label="Your business details">
              <Field id={`${ids}-name`} label="Your name" error={errorFor("name")}>
                <input ref={firstField} id={`${ids}-name`} name="name" type="text" autoComplete="name" required maxLength={160}
                  value={values.name} onChange={(e) => update("name", e.target.value)} onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                  aria-invalid={Boolean(errorFor("name"))} aria-describedby={errorFor("name") ? `${ids}-name-error` : undefined} />
              </Field>

              <Field id={`${ids}-email`} label="Email" error={errorFor("email")}>
                <input id={`${ids}-email`} name="email" type="email" inputMode="email" autoComplete="email" required maxLength={254}
                  value={values.email} onChange={(e) => update("email", e.target.value)} onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                  aria-invalid={Boolean(errorFor("email"))} aria-describedby={errorFor("email") ? `${ids}-email-error` : undefined} />
              </Field>

              <Field id={`${ids}-phone`} label="Phone (optional)" help="If you'd rather we rang you." error={errorFor("phone")}>
                <input id={`${ids}-phone`} name="phone" type="tel" inputMode="tel" autoComplete="tel" maxLength={24}
                  value={values.phone} onChange={(e) => update("phone", e.target.value)} onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
                  aria-invalid={Boolean(errorFor("phone"))} aria-describedby={`${ids}-phone-help${errorFor("phone") ? ` ${ids}-phone-error` : ""}`} />
              </Field>

              <SelectField id={`${ids}-team`} name="team_size" label="How many people work in the business?" options={TEAM_SIZES} value={values.team_size} onChange={(v) => update("team_size", v)} />
              <SelectField id={`${ids}-type`} name="business_type" label="What kind of business is it?" options={BUSINESS_TYPES} value={values.business_type} onChange={(v) => update("business_type", v)} />
              <SelectField id={`${ids}-need`} name="main_need" label="What's the main thing you need help with?" options={MAIN_NEEDS} value={values.main_need} onChange={(v) => update("main_need", v)} />

              {showDetails && (
                <Field id={`${ids}-details`} label="Tell us a bit more" help={`${values.details.length}/${DETAILS_MAX}`} error={errorFor("details")}>
                  <textarea id={`${ids}-details`} name="details" rows={3} maxLength={DETAILS_MAX} placeholder="A sentence or two is plenty."
                    value={values.details} onChange={(e) => update("details", e.target.value)} onBlur={() => setTouched((t) => ({ ...t, details: true }))}
                    aria-invalid={Boolean(errorFor("details"))} aria-describedby={`${ids}-details-help${errorFor("details") ? ` ${ids}-details-error` : ""}`} />
                </Field>
              )}

              {/* Honeypot: hidden from people and assistive tech; bots that fill it are rejected server-side. */}
              <div className="starter-honeypot" aria-hidden="true">
                <label htmlFor={`${ids}-fax`}>Fax</label>
                <input ref={honeypot} id={`${ids}-fax`} name="website_fax" type="text" tabIndex={-1} autoComplete="off" />
              </div>

              </fieldset>
              <fieldset className="starter-form-fields" hidden={step !== 1} disabled={step !== 1 || status === "sending"} aria-label="Privacy and consent">
              <label className="starter-check">
                <input name="privacy_consent" type="checkbox" required checked={values.privacy} onChange={(e) => update("privacy", e.target.checked)} />
                <span>{PRIVACY_NOTICE} <a href="/privacy" target="_blank" rel="noopener">Read the Privacy Policy</a> (required)</span>
              </label>
              <label className="starter-check">
                <input name="marketing_consent" type="checkbox" checked={values.marketing} onChange={(e) => update("marketing", e.target.checked)} />
                <span>{MARKETING_TEXT} <a href="/privacy" target="_blank" rel="noopener">Read how we handle your data under GDPR</a> (optional)</span>
              </label>
              </fieldset>

              {status === "error" && <p className="starter-submit-error" role="alert"><AlertCircle size={18} aria-hidden="true" />{submitError}</p>}

              {step === 1 && <button type="button" className="rebuild-button-secondary" disabled={status === "sending"} onClick={() => { setStep(0); setSubmitError(""); setStatus("idle"); }}>Back to details</button>}
              <button type="submit" className="rebuild-button starter-submit" disabled={status === "sending"} aria-busy={status === "sending"}>
                {status === "sending" ? <><span className="starter-spinner" aria-hidden="true" />Sending…</> : step === 0 ? "Continue to privacy and consent" : "Check my fit"}
              </button>
            </form>
          </>
        )}
      </div>
    </dialog>
  );
}

function Field({ id, label, help, error, children }: { id: string; label: string; help?: string; error: string; children: React.ReactNode }) {
  return (
    <div className="starter-field">
      <label htmlFor={id}>{label}</label>
      {children}
      {help && <p id={`${id}-help`} className="starter-field-help">{help}</p>}
      {error && <p id={`${id}-error`} className="starter-field-error"><AlertCircle size={16} aria-hidden="true" />{error}</p>}
    </div>
  );
}

function SelectField({ id, name, label, options, value, onChange }: { id: string; name: string; label: string; options: readonly string[]; value: string; onChange: (value: string) => void }) {
  return (
    <div className="starter-field">
      <label htmlFor={id}>{label}</label>
      <select id={id} name={name} value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">Choose one</option>
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    </div>
  );
}

function ResultScreen({ titleId, route, name, onClose }: { titleId: string; route: LeadRoute; name: string; onClose: () => void }) {
  return (
    <div className="starter-result" aria-live="polite">
      {route === "good-fit" && (
        <>
          <h2 id={titleId} tabIndex={-1}>Looks like a great fit, {name}.</h2>
          <p>Pick a time for your 20-minute call below. That call is all the content we need.</p>
          {BOOKING_URL && <BookingFrame />}
          <p className="starter-result-note">Can&apos;t see a time that suits? Kyle will email you within 1 working day.</p>
        </>
      )}
      {route === "needs-chat" && (
        <>
          <h2 id={titleId} tabIndex={-1}>Thanks, {name}. We&apos;ll be in touch.</h2>
          <p>Kyle will reply within 1 working day to talk it through.</p>
          {BOOKING_URL && (
            <details className="starter-result-booking">
              <summary>Or book a call now</summary>
              <BookingFrame />
            </details>
          )}
        </>
      )}
      {route === "bigger-needs" && (
        <>
          <h2 id={titleId} tabIndex={-1}>Thanks, {name}. This one might need more than one page.</h2>
          <p>Shops, bookings and larger teams usually need our full Websites package. Kyle will email you within 1 working day with the right option and price.</p>
        </>
      )}
      <button type="button" className="rebuild-button-secondary starter-result-close" onClick={onClose}>Close</button>
    </div>
  );
}

function BookingFrame() {
  return <iframe className="starter-booking" src={BOOKING_URL} title="Book your 20-minute call" loading="lazy" />;
}
