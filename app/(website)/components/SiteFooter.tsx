import Link from "next/link";

const footerLinks = [
  { href: "/websites", label: "Websites" },
  { href: "/platform", label: "Platform" },
  { href: "/agents", label: "AI Agents" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/security", label: "Security" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function SiteFooter() {
  return (
    <footer className="mt-16 space-y-8">
      <div className="rounded-3xl border border-slate-200/70 bg-white/90 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
        <div className="grid gap-8 lg:grid-cols-[1.5fr,1fr,1fr]">
          <div className="space-y-4">
            <div className="text-xs uppercase tracking-[0.24em] text-slate-500">Ingenium</div>
            <p className="text-2xl font-[var(--font-display)] tracking-tight text-slate-900">
              Enterprise websites built to convert and scale.
            </p>
            <p className="text-sm text-slate-600 max-w-md">
              We design the site, orchestrate the AI operations behind it, and keep performance compounding
              with a unified CRM and automation layer.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-slate-200/70 bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-white"
            >
              Get a Website Strategy Call
            </Link>
          </div>
          <div className="space-y-2 text-sm">
            <div className="text-xs uppercase tracking-[0.2em] text-slate-500">Explore</div>
            {footerLinks.map((link) => (
              <Link key={link.href} href={link.href} className="block text-slate-600 hover:text-slate-900">
                {link.label}
              </Link>
            ))}
          </div>
          <div className="space-y-2 text-sm">
            <div className="text-xs uppercase tracking-[0.2em] text-slate-500">Contact</div>
            <p className="text-slate-600">Global team (US + EU)</p>
            <p className="text-slate-600">hello@ingeniumconsulting.net</p>
            <p className="text-slate-600">Mon-Fri · 9am-6pm</p>
            <Link href="/security" className="inline-flex items-center gap-2 text-emerald-700">
              Security overview
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
        <span>© 2026 Ingenium Digital Consulting. All rights reserved.</span>
        <span>Websites · AI Agents · CRM · Automations</span>
      </div>
    </footer>
  );
}
