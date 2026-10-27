"use client";

import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowUpRight, Check, LayoutTemplate, X } from "lucide-react";
import { useRef, useState } from "react";
import { clearEnquiryRequestId, enquiryRequestId, enquiryTracking, recordAcceptedLead, sendEnquiry } from "@/lib/enquiry-client";
import { MARKETING_NOTICE, NOTICE_VERSION, PRIVACY_NOTICE, validateEnquiry } from "@/lib/enquiry-contract";
import FormStepHeading from "./FormStepHeading";
import { canViewTemplate, readTemplateAccess, templateInterest, TEMPLATE_ACCESS_KEY, TEMPLATE_INDUSTRIES, WEBSITE_TEMPLATES, type TemplateAccess, type WebsiteTemplate } from "@/lib/website-templates";
import "./template-gallery.css";

export default function TemplateGallery({ templates = WEBSITE_TEMPLATES }: { templates?: WebsiteTemplate[] }) {
  const [industry, setIndustry] = useState("all");
  const [access, setAccess] = useState<TemplateAccess>({ viewed: [], unlocked: false });
  const [selected, setSelected] = useState<WebsiteTemplate | null>(null);
  const [gated, setGated] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState<0 | 1>(0);
  const sending = useRef(false);
  const requestId = useRef("");
  const accessRef = useRef(access);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const groups = TEMPLATE_INDUSTRIES.filter(item => industry === "all" || item.id === industry);

  function save(next: TemplateAccess) {
    accessRef.current = next;
    setAccess(next);
    try { localStorage.setItem(TEMPLATE_ACCESS_KEY, JSON.stringify(next)); } catch { /* Keep access in memory when storage is unavailable. */ }
  }

  function open(template: WebsiteTemplate) {
    let current = accessRef.current;
    try {
      const stored = readTemplateAccess(localStorage.getItem(TEMPLATE_ACCESS_KEY));
      current = { viewed: [...new Set([...current.viewed, ...stored.viewed])], unlocked: current.unlocked || stored.unlocked };
    } catch { /* Use this page's access state. */ }
    const allowed = canViewTemplate(current, template.id);
    save(allowed ? { ...current, viewed: [...new Set([...current.viewed, template.id])] } : current);
    setSelected(template);
    setGated(!allowed);
    setError("");
    setStep(0);
  }

  async function unlock(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending.current || !selected || !event.currentTarget.reportValidity()) return;
    if (step === 0) { setStep(1); setError(""); return; }
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    const interest = templateInterest(access.viewed, selected, templates);
    const message = `Template gallery access requested. Industries explored: ${interest.industries.join(", ")}. Templates: ${interest.titles.join(", ")}.`;
    const fields = {
      name, email: String(data.get("email") || "").trim(), first_name: name.split(/\s+/)[0], last_name: name.split(/\s+/).slice(1).join(" "),
      service: "website", message, biggest_growth_challenge: message, additional_goals: message,
      intent: "template-gallery-access", industry: interest.industries.join(", "), template_interest: interest.titles.join(", "),
      privacy_consent: data.has("privacy_consent") ? "true" : "false", marketing_consent: data.has("marketing_consent") ? "true" : "false",
      consent_version: NOTICE_VERSION, consent_text_snapshot: PRIVACY_NOTICE,
      marketing_consent_text: MARKETING_NOTICE,
      website_fax: String(data.get("website_fax") || ""),
    };
    requestId.current ||= enquiryRequestId("template-gallery");
    const payload = { request_id: requestId.current, form_slug: "template-gallery", fields, tracking: enquiryTracking() };
    const invalid = validateEnquiry(payload);
    if (invalid) { setError(invalid); return; }
    sending.current = true; setPending(true); setError("");
    try {
      const receipt = await sendEnquiry(payload);
      clearEnquiryRequestId("template-gallery");
      recordAcceptedLead(receipt.submission_id, "website");
      save({ viewed: [...new Set([...access.viewed, selected.id])], unlocked: true });
      setGated(false);
    } catch (err) { setError(err instanceof Error ? err.message : "Please try again. Your details have been kept."); }
    finally { sending.current = false; setPending(false); }
  }

  return <section className="rebuild-section template-gallery" id="templates" aria-labelledby="template-heading">
    <div className="template-intro"><div><p className="rebuild-kicker">Website templates & mockups</p><h2 className="rebuild-section-heading" id="template-heading">Find a look for your industry.</h2><p>Explore website designs built for businesses like yours. Start with your industry and see what’s possible.</p></div><p className="template-access-note"><LayoutTemplate size={20} aria-hidden="true" />Preview two templates freely. Enter your name and email to keep exploring.</p></div>
    <div className="template-filters" role="group" aria-label="Filter templates by industry">
      {[{ id: "all", name: "All industries" }, ...TEMPLATE_INDUSTRIES].map(item => <button type="button" key={item.id} aria-pressed={industry === item.id} onClick={() => setIndustry(item.id)}>{item.name}</button>)}
    </div>
    {access.unlocked && <p className="template-unlocked" role="status"><Check size={17} aria-hidden="true" />You’re all set. Explore as many templates as you like.</p>}
    <div className="template-groups" aria-live="polite" aria-atomic="false">
      {groups.map(group => {
        const items = templates.filter(item => item.industry === group.id);
        return <section key={group.id} className={items.length ? "template-industry" : "template-industry template-industry-empty"} aria-labelledby={`industry-${group.id}`}>
          <div className="template-industry-heading"><h3 id={`industry-${group.id}`}>{group.name}</h3><span>{items.length ? `${items.length} ${items.length === 1 ? "template" : "templates"}` : "Coming soon"}</span></div>
          {items.length ? <div className="template-cards">{items.map(template => <button type="button" className="template-card" key={template.id} onClick={event => { triggerRef.current = event.currentTarget; open(template); }}>
            <div className="template-screenshot"><Image src={template.image} alt={`Website preview: ${template.title}`} width={1200} height={800} sizes="(max-width: 700px) 100vw, 50vw" /><span>View template <ArrowUpRight size={16} aria-hidden="true" /></span></div>
            <div className="template-caption"><h4>{template.title}</h4><p>{template.description}</p></div>
          </button>)}</div> : <p>{group.description}<br /><span>Website previews are on the way.</span></p>}
        </section>;
      })}
    </div>
    <Dialog.Root open={selected !== null} onOpenChange={open => { if (!open && !sending.current) setSelected(null); }}>
      <Dialog.Portal><Dialog.Overlay className="template-dialog-overlay" /><Dialog.Content className={`template-dialog ${gated ? "template-dialog-gate" : "template-dialog-preview"}`} onCloseAutoFocus={event => { event.preventDefault(); triggerRef.current?.focus(); }} onEscapeKeyDown={event => { if (pending) event.preventDefault(); }} onPointerDownOutside={event => { if (pending) event.preventDefault(); }}>
        <Dialog.Close className="template-dialog-close" disabled={pending} aria-label="Close template"><X size={22} /></Dialog.Close>
        <Dialog.Title>{gated ? "Keep exploring. Find your website." : selected?.title}</Dialog.Title>
        <Dialog.Description>{gated ? "You’ve explored two templates. Add your name and email for free access to the full collection." : "Explore the website below. If the preview doesn’t load, open it in a new tab."}</Dialog.Description>
        {gated ? <form name="Website Template Access" className="rebuild-form" onSubmit={unlock} noValidate aria-busy={pending}>
          <FormStepHeading step={step} detailsTitle="Your name. Your email. More inspiration." detailsDescription="Add your details, then review privacy and consent before unlocking the collection." />
          <fieldset hidden={step !== 0} disabled={pending} className="template-gate-fields" aria-label="Your details">
            <div className="rebuild-field"><label htmlFor="template-name">Your name</label><input id="template-name" name="name" autoComplete="name" minLength={2} maxLength={160} required /></div>
            <div className="rebuild-field"><label htmlFor="template-email">Email address</label><input id="template-email" name="email" type="email" autoComplete="email" maxLength={254} required /></div>
            <div hidden aria-hidden="true"><input name="website_fax" tabIndex={-1} autoComplete="off" aria-label="Leave empty" /></div>
          </fieldset>
          <fieldset hidden={step !== 1} disabled={step !== 1 || pending} className="template-gate-fields" aria-label="Privacy and consent">
            <p className="template-privacy-copy">We’ll save the templates and industries you’ve explored with your details to help with a future website enquiry.</p>
            <div className="rebuild-check"><input id="template-privacy" name="privacy_consent" type="checkbox" required /><label htmlFor="template-privacy">{PRIVACY_NOTICE} <a href="/privacy" target="_blank" rel="noreferrer">Privacy Policy</a></label></div>
            <div className="rebuild-check"><input id="template-marketing" name="marketing_consent" type="checkbox" /><label htmlFor="template-marketing">{MARKETING_NOTICE} (optional)</label></div>
          </fieldset>
          {error && <p className="rebuild-form-error" role="alert">{error}</p>}
          <div className="form-step-actions">
            {step === 1 && <button type="button" className="rebuild-button-secondary" disabled={pending} onClick={() => { setStep(0); setError(""); }}>Back to details</button>}
            <button className="rebuild-button" type="submit" disabled={pending}>{pending ? "Unlocking…" : step === 0 ? "Continue to privacy and consent" : "Unlock all templates"}<ArrowUpRight size={17} aria-hidden="true" /></button>
          </div>
        </form> : selected && <><a className="template-open-link" href={selected.url} target="_blank" rel="noopener noreferrer">Open website in a new tab <ArrowUpRight size={16} aria-hidden="true" /></a><iframe key={selected.id} src={selected.url} title={`${selected.title} website preview`} sandbox="allow-scripts allow-same-origin allow-forms allow-popups" referrerPolicy="no-referrer" /></>}
      </Dialog.Content></Dialog.Portal>
    </Dialog.Root>
  </section>;
}
