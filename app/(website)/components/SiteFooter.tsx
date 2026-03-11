import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

interface FooterLink {
  href: string;
  label: string;
}

interface SiteFooterContent {
  brand: string;
  summary: string;
  product_title: string;
  product_links: FooterLink[];
  company_title: string;
  company_links: FooterLink[];
  contact_title: string;
  contact_items: string[];
  security_link_label: string;
  legal_line: string;
  legal_tagline: string;
  tags: string[];
}

interface SiteFooterProps {
  content: SiteFooterContent;
}

export default function SiteFooter({ content }: SiteFooterProps) {
  const productLinks = Array.isArray(content.product_links) ? content.product_links : [];
  const companyLinks = Array.isArray(content.company_links) ? content.company_links : [];
  const contactItems = Array.isArray(content.contact_items) ? content.contact_items : [];
  const tags = Array.isArray(content.tags) ? content.tags : [];

  return (
    <footer className="border-t border-slate-800/60 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Main CTA band */}
        <div className="border-b border-slate-800/60 py-16 text-center">
          <h2 className="font-(--font-display) text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Ready to replace disconnected revenue tooling with one operating system?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-slate-400">
            Book a platform strategy call and get a practical rollout direction for acquisition,
            CRM, AI execution, and automation.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="cta-lift inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-500"
            >
              Book a Platform Strategy Call
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              href="/case-studies"
              className="cta-lift inline-flex items-center gap-2 rounded-lg border border-slate-700 px-6 py-3 text-sm font-medium text-slate-300 transition hover:border-slate-600 hover:text-white"
            >
              View Case Studies
            </Link>
          </div>
        </div>

        {/* Link columns */}
        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div>
            <div className="flex items-center gap-2.5">
              <Image src="/logo.svg" alt="Ingenium logo" width={28} height={28} className="h-7 w-7" />
              <span
                className="font-(--font-display) text-lg font-bold tracking-tight text-white"
              >
                {content.brand}
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-500">
              {content.summary}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-slate-800 bg-slate-900 px-2 py-1 font-(--font-mono) text-[10px] uppercase tracking-widest text-slate-500"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Product links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              {content.product_title}
            </h4>
            <ul className="mt-4 space-y-2.5">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 transition-colors hover:text-emerald-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              {content.company_title}
            </h4>
            <ul className="mt-4 space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 transition-colors hover:text-emerald-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              {content.contact_title}
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-400">
              {contactItems.map((item) => (
                <li key={item}>
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/security"
              className="cta-lift mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-emerald-400 transition-colors hover:text-emerald-300"
            >
              {content.security_link_label}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-800/60 py-6 text-xs text-slate-600">
          <span>{content.legal_line}</span>
          <span>{content.legal_tagline}</span>
        </div>
      </div>
    </footer>
  );
}
