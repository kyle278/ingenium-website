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
    <footer className="border-t border-white/70 bg-white/60">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[1.2fr,1fr,1fr,1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-sm font-bold text-white">
                I
              </span>
              <span className="font-[var(--font-display)] text-lg font-semibold tracking-tight text-slate-900">
                Ingenium
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-500">
              Enterprise websites and AI operations that drive pipeline, backed
              by CRM, automation, and governance.
            </p>
            <div className="mt-6 flex flex-wrap gap-2 text-xs uppercase tracking-[0.3em] text-slate-400">
              <span>Websites</span>
              <span>AI Agents</span>
              <span>CRM</span>
              <span>Automations</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
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
            <h4 className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
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
            <h4 className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
              Get in touch
            </h4>
            <div className="mt-4 space-y-3 text-sm text-slate-500">
              <p>hello@ingeniumconsulting.net</p>
              <p>Mon-Fri, 9 am-6 pm</p>
              <p>US + EU delivery teams</p>
            </div>
            <Link
              href="/security"
              className="mt-4 inline-block text-sm font-semibold text-emerald-700 transition-colors hover:text-emerald-800"
            >
              Security overview
            </Link>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-white/70 pt-8 text-xs text-slate-400">
          <span>&copy; 2026 Ingenium Digital Consulting. All rights reserved.</span>
          <span>Enterprise website systems</span>
        </div>
      </div>
    </footer>
  );
}
