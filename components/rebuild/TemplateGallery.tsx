"use client";

import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowUpRight, Check, LayoutTemplate, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import GuidedEnquiry from "@/components/forms/GuidedEnquiry";
import { canViewTemplate, readTemplateAccess, templateInterest, TEMPLATE_ACCESS_KEY, TEMPLATE_INDUSTRIES, WEBSITE_TEMPLATES, type TemplateAccess, type WebsiteTemplate } from "@/lib/website-templates";
import "./template-gallery.css";

export default function TemplateGallery({ templates = WEBSITE_TEMPLATES }: { templates?: WebsiteTemplate[] }) {
  const [industry, setIndustry] = useState("all");
  const [access, setAccess] = useState<TemplateAccess>({ viewed: [], unlocked: false });
  const [selected, setSelected] = useState<WebsiteTemplate | null>(null);
  const [gated, setGated] = useState(false);
  const [pending, setPending] = useState(false);





  const accessRef = useRef(access);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const previewLinkRef = useRef<HTMLAnchorElement>(null);
  useEffect(() => { if (selected && !gated && access.unlocked) previewLinkRef.current?.focus(); }, [selected, gated, access.unlocked]);
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
    <Dialog.Root open={selected !== null} onOpenChange={open => { if (!open && !pending) setSelected(null); }}>
      <Dialog.Portal><Dialog.Overlay className="template-dialog-overlay" /><Dialog.Content className={`template-dialog ${gated ? "template-dialog-gate" : "template-dialog-preview"}`} onCloseAutoFocus={event => { event.preventDefault(); triggerRef.current?.focus(); }} onEscapeKeyDown={event => { if (pending) event.preventDefault(); }} onPointerDownOutside={event => { if (pending) event.preventDefault(); }}>
        <Dialog.Close className="template-dialog-close" disabled={pending} aria-label="Close template"><X size={22} /></Dialog.Close>
        <Dialog.Title className={gated ? "sr-only" : undefined}>{gated ? "Keep exploring. Find your website." : selected?.title}</Dialog.Title>
        <Dialog.Description className={gated ? "sr-only" : undefined}>{gated ? "You’ve explored two templates. Add your name and email for free access to the full collection." : "Explore the website below. If the preview doesn’t load, open it in a new tab."}</Dialog.Description>
        {gated && selected ? <GuidedEnquiry key={selected.id} kind="template" formName="Website Template Access" formSlug="template-gallery" submitLabel="Unlock all templates" onPendingChange={setPending} extraFields={(() => { const interest = templateInterest(access.viewed, selected, templates); const message = `Template gallery access requested. Industries explored: ${interest.industries.join(", ")}. Templates: ${interest.titles.join(", ")}.`; return { service: "website", intent: "template-gallery-access", message, biggest_growth_challenge: message, additional_goals: message, industry: interest.industries.join(", "), template_interest: interest.titles.join(", ") }; })()} onAccepted={() => { save({ viewed: [...new Set([...access.viewed, selected.id])], unlocked: true }); setGated(false); }} /> : selected && <><a ref={previewLinkRef} className="template-open-link" href={selected.url} target="_blank" rel="noopener noreferrer">Open website in a new tab <ArrowUpRight size={16} aria-hidden="true" /></a><iframe key={selected.id} src={selected.url} title={`${selected.title} website preview`} sandbox="allow-scripts allow-same-origin allow-forms allow-popups" referrerPolicy="no-referrer" /></>}
      </Dialog.Content></Dialog.Portal>
    </Dialog.Root>
  </section>;
}


