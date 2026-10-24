"use client";
import { EditorImage, EditorLink, EditorText } from "@/components/website-editor/Editable";


import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const services = [
  { href: "/phone-ringing-website", title: "Websites", detail: "Help customers understand and choose you." },
  { href: "/never-miss-a-lead", title: "CRM & follow-up", detail: "Keep enquiries, quotes and next actions together." },
  { href: "/leads-to-jobs", title: "Website + CRM", detail: "Plan the first impression and the follow-through." },
  { href: "/ecommerce", title: "Ecommerce", detail: "Make your products easier to buy." },
];
const links = [{ href: "/results", label: "Our work" }, { href: "/how-it-works", label: "How it works" }, { href: "/packages", label: "Pricing" }, { href: "/blog", label: "Blog" }, { href: "/about", label: "About" }];

export default function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const servicesButton = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);
  function close() { setOpen(false); setServicesOpen(false); }
  useEffect(() => {
    const dismiss = (event: PointerEvent) => { if (navRef.current && !navRef.current.contains(event.target as Node)) { setOpen(false); setServicesOpen(false); } };
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, []);
  return <header className="site-header brand-navigation" ref={navRef} onKeyDown={event => {
    if (event.key !== "Escape") return;
    if (servicesOpen) { event.stopPropagation(); setServicesOpen(false); servicesButton.current?.focus(); }
    else if (open) { setOpen(false); menuButton.current?.focus(); }
  }}><div className="site-header-inner">
    <EditorLink editorId="rebuild.app.website.components.SiteNav.tsx.link.cd1475f71db4" href="/" className="site-brand" aria-label="Ingenium home" onClick={close}><EditorImage editorId="rebuild.app.website.components.SiteNav.tsx.image.e3821b3f6333" src="/brand/ingenium-logo.png" alt="" width={1000} height={245} sizes="(max-width: 600px) 180px, 204px" className="site-brand-logo" priority /></EditorLink>
    <button ref={menuButton} className="mobile-menu-button" type="button" aria-expanded={open} aria-controls="site-navigation" aria-label={open ? "Close menu" : "Open menu"} onClick={() => { setOpen(!open); setServicesOpen(false); }}>{open ? <X size={23} /> : <Menu size={23} />}</button>
    <nav id="site-navigation" aria-label="Main navigation" className={`site-navigation ${open ? "is-open" : ""}`}>
      <div className="services-navigation"><button ref={servicesButton} type="button" className="nav-link" aria-expanded={servicesOpen} aria-controls="services-dropdown" onClick={() => setServicesOpen(!servicesOpen)}>Services<ChevronDown size={14} className={servicesOpen ? "rotate-chevron" : undefined} aria-hidden="true" /></button>
        <div id="services-dropdown" className="services-dropdown" hidden={!servicesOpen}>{services.map(item => <EditorLink editorId="rebuild.app.website.components.SiteNav.tsx.link.5860dc5ad553" identity={item.href} href={item.href} key={item.href} onClick={close} aria-current={pathname === item.href ? "page" : undefined}><span><EditorText editorId="rebuild.app.website.components.SiteNav.tsx.text.21b8263f512c" identity={item.href} tag="span" value={item.title} /><ArrowUpRight size={16} aria-hidden="true" /></span><small>{item.detail}</small></EditorLink>)}</div>
      </div>
      {links.map(item => <EditorLink editorId="rebuild.app.website.components.SiteNav.tsx.link.9d5b4255e5e1" identity={item.href} key={item.href} className="nav-link" href={item.href} onClick={close} aria-current={pathname.startsWith(item.href) ? "page" : undefined}><EditorText editorId="rebuild.app.website.components.SiteNav.tsx.text.6d349d07aa85" identity={item.href} tag="Link" value={item.label} /></EditorLink>)}
      <EditorLink editorId="rebuild.app.website.components.SiteNav.tsx.link.2d7331e63eee" href="/book-a-call" className="rebuild-button nav-cta" onClick={close}><EditorText editorId="rebuild.app.website.components.SiteNav.tsx.text.4ad4f7e7d1e3" tag="Link" value={"Book a free call"} /><ArrowUpRight size={16} aria-hidden="true" /></EditorLink>
    </nav>
  </div><div className="site-scroll-progress" aria-hidden="true" /></header>;
}
