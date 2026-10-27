"use client";
import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import GuidedEnquiry from "@/components/forms/GuidedEnquiry";
import { type CtaPosition, type LeadRoute, STARTER_FORM_SLUG } from "@/lib/starter-website";
export default function QualifyDialog({ open, position, onClose, onSubmitted }: { open: boolean; position: CtaPosition; onClose: () => void; onSubmitted: (route: LeadRoute) => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => { const el = dialog.current; if (!el) return; if (open && !el.open) { el.showModal(); el.querySelector<HTMLElement>("h2")?.focus(); } if (!open && el.open) el.close(); }, [open]);
  function close() { if (!dialog.current?.querySelector('[aria-busy="true"]')) onClose(); }
  return <dialog ref={dialog} className="guided-modal" aria-label="Website enquiry" onCancel={event => { event.preventDefault(); close(); }}><button type="button" className="guided-modal-close" aria-label="Close enquiry" onClick={close}><X size={22} aria-hidden="true" /></button>{open && <GuidedEnquiry kind="starter" formName="Starter Website Enquiry" formSlug={STARTER_FORM_SLUG} submitLabel="Send my website request" extraFields={{ cta_position: position }} onAccepted={receipt => onSubmitted(["good-fit", "bigger-needs"].includes(receipt.lead_route || "") ? receipt.lead_route as LeadRoute : "needs-chat")} />}</dialog>;
}
