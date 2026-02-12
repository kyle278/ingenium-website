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
    <footer className="mt-20 space-y-10">
      <div className="card p-8 grid gap-8 lg:grid-cols-[1.5fr,1fr,1fr]">
        <div className="space-y-3">
          <div className="text-xs uppercase tracking-[0.24em] text-subtle">Ingenium</div>
          <p className="text-2xl section-title text-[var(--text)]">
            Enterprise websites built to convert and scale.
          </p>
          <p className="text-sm text-muted max-w-md">
            We design the site, orchestrate the AI operations behind it, and keep performance compounding
            with a unified CRM and automation layer.
          </p>
          <Link href="/contact" className="btn-secondary text-sm">
            Get a Website Strategy Call
          </Link>
        </div>
        <div className="space-y-2 text-sm">
          <div className="text-xs uppercase tracking-[0.2em] text-subtle">Explore</div>
          {footerLinks.map((link) => (
            <Link key={link.href} href={link.href} className="block hover:text-[var(--accent)]">
              {link.label}
            </Link>
          ))}
        </div>
        <div className="space-y-2 text-sm">
          <div className="text-xs uppercase tracking-[0.2em] text-subtle">Contact</div>
          <p>Global team (US + EU)</p>
          <p>hello@ingeniumconsulting.net</p>
          <p>Mon-Fri · 9am-6pm</p>
          <Link href="/security" className="inline-flex items-center gap-2 text-[var(--accent)]">
            Security overview
          </Link>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-muted">
        <span>© 2026 Ingenium Digital Consulting. All rights reserved.</span>
        <span>Websites · AI Agents · CRM · Automations</span>
      </div>
    </footer>
  );
}
