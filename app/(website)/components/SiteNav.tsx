"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const services = [
  { href: "/websites", label: "Websites", description: "Make your business easier to choose." },
  { href: "/crm", label: "CRM", description: "Keep enquiries and follow-up organised." },
  { href: "/connected", label: "Website + CRM", description: "Built together. Ready for the next step." },
  { href: "/ecommerce", label: "Ecommerce", description: "Make your products easier to buy." },
];
const links = [{ href: "/projects", label: "Our work" }, { href: "/how-we-work", label: "How we work" }, { href: "/pricing", label: "Pricing" }];

export default function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [serviceOpen, setServiceOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const companyButton = useRef<HTMLButtonElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const serviceButton = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const close = () => { setOpen(false); setServiceOpen(false); setCompanyOpen(false); };

  useEffect(() => {
    function dismiss(event: PointerEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) close();
    }
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, []);

  return (
    <header className="site-header" ref={navRef} onKeyDown={(event) => {
      if (event.key === "Escape") {
        if (companyOpen) { setCompanyOpen(false); companyButton.current?.focus(); }
        else if (serviceOpen) { setServiceOpen(false); serviceButton.current?.focus(); }
        else if (open) { setOpen(false); menuButton.current?.focus(); }
      }
    }}>
      <div className="site-header-inner">
        <Link href="/" className="site-brand" aria-label="Ingenium — home" onClick={close}>
          <Image src="/brand/ingenium-logo.png" alt="" width={1000} height={245} sizes="(max-width: 600px) 180px, 204px" className="site-brand-logo" priority />
        </Link>
        <button ref={menuButton} className="mobile-menu-button" type="button" aria-expanded={open} aria-controls="site-navigation" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}>
          {open ? <X size={23} /> : <Menu size={23} />}
        </button>
        <nav id="site-navigation" aria-label="Main navigation" className={`site-navigation ${open ? "is-open" : ""}`}>
          <div className="services-navigation" onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setServiceOpen(false);
          }}>
            <button ref={serviceButton} type="button" className="nav-link" aria-expanded={serviceOpen} aria-controls="services-navigation" onClick={() => setServiceOpen(!serviceOpen)}>
              Services <ChevronDown size={14} className={serviceOpen ? "rotate-chevron" : ""} />
            </button>
            <div id="services-navigation" className="services-dropdown" hidden={!serviceOpen}>
              {services.map(item => <Link key={item.href} href={item.href} onClick={close} aria-current={pathname === item.href ? "page" : undefined}>
                <span>{item.label}<ArrowUpRight size={17} aria-hidden="true" /></span>
                <small>{item.description}</small>
              </Link>)}
            </div>
          </div>
          {links.map(item => <Link key={item.href} className="nav-link" href={item.href} onClick={close} aria-current={pathname.startsWith(item.href) ? "page" : undefined}>{item.label}</Link>)}
          <div className="services-navigation" onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setCompanyOpen(false);
          }}>
            <button ref={companyButton} type="button" className="nav-link" aria-expanded={companyOpen} aria-controls="company-navigation" onClick={() => setCompanyOpen(!companyOpen)}>
              Company <ChevronDown size={14} className={companyOpen ? "rotate-chevron" : ""} />
            </button>
            <div id="company-navigation" className="services-dropdown" hidden={!companyOpen}>
              {[
                { href: "/about", label: "About Ingenium", description: "Our company, approach and responsibilities." },
                { href: "/team", label: "Meet the team", description: "The people behind design, delivery and your next steps." },
                { href: "/contact", label: "Contact", description: "Start a conversation about your project." },
              ].map(item => <Link key={item.href} href={item.href} onClick={close} aria-current={pathname === item.href ? "page" : undefined}>
                <span>{item.label}<ArrowUpRight size={17} aria-hidden="true" /></span>
                <small>{item.description}</small>
              </Link>)}
            </div>
          </div>
          <Link href="/contact" className="rebuild-button nav-cta" onClick={close}>Discuss your project <ArrowUpRight size={16} aria-hidden="true" /></Link>
        </nav>
      </div>
      <div className="site-scroll-progress" aria-hidden="true" />
    </header>
  );
}
