import Link from "next/link";

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

interface EditorAttrs {
  "data-content-block-key": string;
  "data-page-key": string;
  "data-section-key": string;
}

interface SiteFooterProps {
  content: SiteFooterContent;
  editorAttrs: EditorAttrs;
}

export default function SiteFooter({ content, editorAttrs }: SiteFooterProps) {
  const productLinks = Array.isArray(content.product_links) ? content.product_links : [];
  const companyLinks = Array.isArray(content.company_links) ? content.company_links : [];
  const contactItems = Array.isArray(content.contact_items) ? content.contact_items : [];
  const tags = Array.isArray(content.tags) ? content.tags : [];

  return (
    <footer className="border-t border-white/70 bg-white/60">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[1.2fr,1fr,1fr,1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-sm font-bold text-white">
                I
              </span>
              <span
                className="font-[var(--font-display)] text-lg font-semibold tracking-tight text-slate-900"
                {...editorAttrs}
              >
                {content.brand}
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-500" {...editorAttrs}>
              {content.summary}
            </p>
            <div className="mt-6 flex flex-wrap gap-2 text-xs uppercase tracking-[0.3em] text-slate-400">
              {tags.map((tag) => (
                <span key={tag} {...editorAttrs}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400" {...editorAttrs}>
              {content.product_title}
            </h4>
            <div className="mt-4 flex flex-wrap gap-4">
              {productLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-sm text-slate-500 transition-colors hover:text-slate-900"
                  {...editorAttrs}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400" {...editorAttrs}>
              {content.company_title}
            </h4>
            <div className="mt-4 flex flex-wrap gap-4">
              {companyLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-sm text-slate-500 transition-colors hover:text-slate-900"
                  {...editorAttrs}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400" {...editorAttrs}>
              {content.contact_title}
            </h4>
            <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-500">
              {contactItems.map((item) => (
                <span key={item} {...editorAttrs}>
                  {item}
                </span>
              ))}
            </div>
            <Link
              href="/security"
              className="mt-4 inline-block text-sm font-semibold text-emerald-700 transition-colors hover:text-emerald-800"
              {...editorAttrs}
            >
              {content.security_link_label}
            </Link>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-white/70 pt-8 text-xs text-slate-400">
          <span {...editorAttrs}>{content.legal_line}</span>
          <span {...editorAttrs}>{content.legal_tagline}</span>
        </div>
      </div>
    </footer>
  );
}
