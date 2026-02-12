import Link from "next/link";

const productLinks = [
  { href: "/websites", label: "Websites" },
  { href: "/platform", label: "Platform" },
  { href: "/agents", label: "AI Agents" },
  { href: "/crm", label: "CRM" },
  { href: "/automations", label: "Automations" },
];

const companyLinks = [
  { href: "/about", label: "About" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/security", label: "Security" },
  { href: "/contact", label: "Contact" },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-slate-200/60">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-sm font-bold text-white">
                I
              </span>
              <span className="font-[var(--font-display)] text-lg font-semibold tracking-tight">
                Ingenium
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-500">
              Enterprise websites, AI operations, and CRM systems built to convert and scale.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Product
            </h4>
            <div className="mt-4 space-y-3">
              {productLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-sm text-slate-500 transition-colors hover:text-slate-900"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Company
            </h4>
            <div className="mt-4 space-y-3">
              {companyLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-sm text-slate-500 transition-colors hover:text-slate-900"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Get in Touch
            </h4>
            <div className="mt-4 space-y-3 text-sm text-slate-500">
              <p>hello@ingeniumconsulting.net</p>
              <p>Mon&ndash;Fri, 9 am&ndash;6 pm</p>
              <p>US + EU delivery teams</p>
            </div>
            <Link
              href="/security"
              className="mt-4 inline-block text-sm font-medium text-emerald-600 transition-colors hover:text-emerald-700"
            >
              Security overview
            </Link>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200/60 pt-8 text-xs text-slate-400">
          <span>&copy; 2026 Ingenium Digital Consulting. All rights reserved.</span>
          <span>Websites &middot; AI Agents &middot; CRM &middot; Automations</span>
        </div>
      </div>
    </footer>
  );
}
