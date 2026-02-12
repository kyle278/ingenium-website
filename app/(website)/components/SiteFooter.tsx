import Link from "next/link";

const footerLinks = [
  { href: "/websites", label: "Websites" },
  { href: "/platform", label: "Platform" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/security", label: "Security" },
  { href: "/contact", label: "Contact" },
];

export default function SiteFooter() {
  return (
    <footer className="mt-20 space-y-10">
      <div className="site-card p-8 grid gap-8 lg:grid-cols-[1.4fr,1fr,1fr]">
        <div className="space-y-3">
          <div className="text-xs uppercase tracking-[0.24em] text-[var(--text-subtle)]">
            Ingenium
          </div>
          <p className="text-2xl font-display text-[var(--text)]">
            Enterprise websites that keep converting after launch.
          </p>
          <p className="text-sm text-muted max-w-md">
            We build conversion-first websites and the AI-powered operating system behind them: agents,
            CRM, automations, and analytics.
          </p>
          <Link href="/contact" className="btn-secondary h-10 px-4 text-xs inline-flex items-center">
            Get a Website Strategy Call
          </Link>
        </div>
        <div className="space-y-2 text-sm">
          <div className="text-xs uppercase tracking-[0.2em] text-[var(--text-subtle)]">Explore</div>
          {footerLinks.map((link) => (
            <Link key={link.href} href={link.href} className="block hover:text-[var(--accent)]">
              {link.label}
            </Link>
          ))}
        </div>
        <div className="space-y-2 text-sm">
          <div className="text-xs uppercase tracking-[0.2em] text-[var(--text-subtle)]">Contact</div>
          <p>Global team (US + EU)</p>
          <p>hello@ingeniumconsulting.net</p>
          <p>Mon-Fri · 9am-6pm</p>
          <Link
            href="/app"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-[var(--accent)]"
          >
            Enter the Portal
          </Link>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-muted">
        <span>© 2026 Ingenium. All rights reserved.</span>
        <span>Websites · AI Agents · CRM · Automations</span>
      </div>
    </footer>
  );
}
