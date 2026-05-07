"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type NavChild = {
  href: string;
  label: string;
  description: string;
};

type NavItem = {
  href?: string;
  label: string;
  description?: string;
  children?: NavChild[];
};

const navContent: {
  brand: string;
  items: NavItem[];
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  topLinks: { label: string; href: string }[];
} = {
  brand: "Ingenium Consulting",
  items: [
    {
      label: "Solutions",
      description: "Website acquisition, CRM execution, automation, and AI support grouped into one path.",
      children: [
        {
          href: "/services",
          label: "Services",
          description: "Overview of the connected website, CRM, automation, and AI service stack.",
        },
        {
          href: "/websites",
          label: "Websites",
          description: "Lead-focused sites designed to feed the wider operating system.",
        },
        {
          href: "/crm",
          label: "CRM",
          description: "Custom pipeline structure, ownership rules, and shared commercial visibility.",
        },
        {
          href: "/automations",
          label: "Automations",
          description: "Campaign, follow-up, and operational handoffs without brittle manual work.",
        },
        {
          href: "/ai-agents",
          label: "AI Agents",
          description: "AI support embedded into real business workflows rather than running beside them.",
        },
      ],
    },
    {
      label: "Platform",
      description: "Platform design, rollout, and governance routes.",
      children: [
        {
          href: "/platform",
          label: "Platform Overview",
          description: "The operating layer connecting acquisition, CRM execution, reporting, and AI.",
        },
        {
          href: "/implementation",
          label: "Implementation",
          description: "How we scope, build, connect, and roll out the system with your team.",
        },
        {
          href: "/security",
          label: "Security",
          description: "Controls, auditability, and operational discipline across the connected stack.",
        },
        {
          href: "/security-review",
          label: "Security Review",
          description: "How access, data flows, approvals, and launch risks are reviewed.",
        },
        {
          href: "/data-handling",
          label: "Data Handling",
          description: "Boundaries for CRM, automation, reporting, and workflow data.",
        },
        {
          href: "/support",
          label: "Support",
          description: "Support scope, request handling, and response expectations.",
        },
        {
          href: "/implementation-methodology",
          label: "Methodology",
          description: "How connected systems are scoped, built, reviewed, and launched.",
        },
      ],
    },
    {
      label: "Proof",
      description: "Examples, detailed projects, and diagnostic entry points.",
      children: [
        {
          href: "/projects",
          label: "Projects",
          description: "Browse website delivery work and the service insights behind each build.",
        },
        {
          href: "/technical-review",
          label: "Technical Review",
          description: "A sharper view of your current setup, architecture, and risk.",
        },
        {
          href: "/revenue-systems-teardown",
          label: "Revenue Systems Teardown",
          description: "A guided review of acquisition, handoff, automation, and reporting gaps.",
        },
      ],
    },
    {
      label: "Company",
      description: "Who Ingenium is and how to start the conversation.",
      children: [
        {
          href: "/about",
          label: "About",
          description: "The mission, values, and operating philosophy behind Ingenium Consulting.",
        },
        {
          href: "/team",
          label: "Team",
          description: "Meet the team behind the connected growth system.",
        },
        {
          href: "/contact",
          label: "Contact",
          description: "Start with a direct conversation about your current stack and next step.",
        },
        {
          href: "/privacy",
          label: "Privacy",
          description: "Website visitor, enquiry, and business contact privacy notice.",
        },
      ],
    },
  ],
  primaryCta: { label: "Book Demo", href: "/demo" },
  secondaryCta: { label: "See the Platform", href: "/platform" },
  topLinks: [
    { label: "Technical review", href: "/technical-review" },
    { label: "Revenue teardown", href: "/revenue-systems-teardown" },
    { label: "Case studies", href: "/case-studies" },
    { label: "Contact", href: "/contact" },
  ],
};

const crawlPriorityPaths = new Set([
  "/services",
  "/websites",
  "/crm",
  "/automations",
  "/ai-agents",
  "/team",
  "/projects",
]);

const crawlPriorityLinks = navContent.items
  .flatMap((item) => item.children ?? [])
  .filter((child) => crawlPriorityPaths.has(child.href));

export default function SiteNav() {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href?: string) => Boolean(href && (pathname === href || pathname.startsWith(`${href}/`)));

  const isDropdownActive = (item: NavItem) =>
    Boolean(item.children?.some((child) => pathname === child.href || pathname.startsWith(`${child.href}/`)));

  return (
    <header className="sticky top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <div
        className={`mx-auto max-w-[1280px] rounded-[28px] transition-all duration-300 ${
          scrolled
            ? "ghost-outline bg-[rgba(247,250,254,0.88)] shadow-[0_4px_24px_rgba(24,28,31,0.08)] backdrop-blur-xl"
            : "bg-[rgba(247,250,254,0.78)] shadow-[0_4px_18px_rgba(24,28,31,0.04)] backdrop-blur-lg"
        }`}
      >
        <div className="hidden items-center justify-between px-6 py-3 text-[11px] text-[var(--color-text-muted)] lg:flex">
          <p className="font-semibold uppercase tracking-[0.24em] text-[var(--color-secondary)]">
            Connected websites. Intelligent growth.
          </p>
          <div className="flex items-center gap-5">
            {navContent.topLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-[var(--color-text)]">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between px-5 py-4">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.svg" alt="Ingenium logo" width={30} height={30} className="h-7 w-7" priority />
            <div className="min-w-0">
              <p className="font-[var(--font-display)] text-sm font-semibold tracking-[-0.04em] text-[var(--color-text)] sm:text-base">
                {navContent.brand}
              </p>
              <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
                Website + CRM + AI
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {navContent.items.map((item) =>
              item.children ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown((value) => (value === item.label ? null : value))}
                >
                  <button
                    type="button"
                    onClick={() => setOpenDropdown((value) => (value === item.label ? null : item.label))}
                    className={`inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition ${
                      isDropdownActive(item)
                        ? "bg-[var(--color-panel-high)] text-[var(--color-brand)]"
                        : "text-[var(--color-text-soft)] hover:bg-[var(--color-panel-low)] hover:text-[var(--color-text)]"
                    }`}
                  >
                    {item.label}
                    <ChevronDown className="h-4 w-4" />
                  </button>

                  {openDropdown === item.label ? (
                    <div className="ghost-outline absolute left-0 top-full z-20 mt-3 w-[440px] rounded-[28px] bg-[rgba(247,250,254,0.96)] p-4 shadow-[0_4px_24px_rgba(24,28,31,0.08)] backdrop-blur-xl">
                      <div className="rounded-[22px] bg-[var(--color-panel-low)] px-4 py-4">
                        <p className="font-[var(--font-display)] text-lg font-semibold tracking-[-0.03em] text-[var(--color-text)]">
                          {item.label}
                        </p>
                        {item.description ? (
                          <p className="mt-2 text-sm leading-6 text-[var(--color-text-soft)]">{item.description}</p>
                        ) : null}
                      </div>
                      <div className="mt-3 grid gap-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="rounded-2xl bg-white px-4 py-4 transition hover:bg-[var(--color-panel-low)]"
                          >
                            <p className="text-sm font-semibold text-[var(--color-text)]">{child.label}</p>
                            <p className="mt-1 text-sm leading-6 text-[var(--color-text-soft)]">{child.description}</p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href!}
                  className={`rounded-md px-3 py-2 text-sm font-medium transition ${
                    isActive(item.href)
                      ? "bg-[var(--color-panel-high)] text-[var(--color-brand)]"
                      : "text-[var(--color-text-soft)] hover:bg-[var(--color-panel-low)] hover:text-[var(--color-text)]"
                  }`}
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href={navContent.secondaryCta.href}
              className="text-sm font-semibold text-[var(--color-text-soft)] transition hover:text-[var(--color-text)]"
            >
              {navContent.secondaryCta.label}
            </Link>
            <Link
              href={navContent.primaryCta.href}
              className="cta-lift inline-flex rounded-md bg-[linear-gradient(135deg,var(--color-brand),var(--color-brand-strong))] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_4px_24px_rgba(24,28,31,0.08)]"
            >
              {navContent.primaryCta.label}
            </Link>
          </div>

          <button
            type="button"
            aria-label="Toggle navigation"
            onClick={() => setOpen((value) => !value)}
            className="ghost-outline inline-flex h-11 w-11 items-center justify-center rounded-full bg-[rgba(255,255,255,0.86)] text-[var(--color-text)] lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <div className="hidden border-t border-[var(--color-line)] px-5 pb-4 lg:block">
          <div className="flex flex-wrap gap-2 pt-3">
            {crawlPriorityLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`inline-flex rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                  isActive(link.href)
                    ? "border-[rgba(0,87,191,0.18)] bg-[var(--color-panel-high)] text-[var(--color-brand)]"
                    : "border-[var(--color-line)] bg-white/72 text-[var(--color-text-soft)] hover:border-[rgba(0,87,191,0.18)] hover:text-[var(--color-text)]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {open ? (
        <div className="ghost-outline mx-auto mt-3 max-w-[1280px] rounded-[28px] bg-[rgba(247,250,254,0.94)] p-5 shadow-[0_4px_24px_rgba(24,28,31,0.08)] backdrop-blur-xl lg:hidden">
          <div className="mt-1 grid gap-2">
            <Link
              href={navContent.primaryCta.href}
              onClick={() => setOpen(false)}
              className="cta-lift inline-flex justify-center rounded-md bg-[linear-gradient(135deg,var(--color-brand),var(--color-brand-strong))] px-4 py-3 text-sm font-semibold text-white"
            >
              {navContent.primaryCta.label}
            </Link>
            <Link
              href={navContent.secondaryCta.href}
              onClick={() => setOpen(false)}
              className="cta-lift inline-flex justify-center rounded-md bg-[var(--color-panel-high)] px-4 py-3 text-sm font-semibold text-[var(--color-brand)]"
            >
              {navContent.secondaryCta.label}
            </Link>
          </div>

          <div className="mt-4 grid gap-2">
            {navContent.items.map((item) =>
              item.children ? (
                <div key={item.label} className="rounded-[24px] bg-[var(--color-panel-low)] p-2">
                  <button
                    type="button"
                    onClick={() => setOpenDropdown((value) => (value === item.label ? null : item.label))}
                    className={`w-full rounded-2xl px-4 py-3 text-left text-sm font-medium transition ${
                      isDropdownActive(item)
                        ? "bg-white text-[var(--color-brand)]"
                        : "text-[var(--color-text-soft)]"
                    }`}
                  >
                    {item.label}
                  </button>
                  {openDropdown === item.label ? (
                    <div className="mt-2 grid gap-2 px-2 pb-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setOpen(false)}
                          className="rounded-2xl bg-white px-4 py-3"
                        >
                          <p className="text-sm font-semibold text-[var(--color-text)]">{child.label}</p>
                          <p className="mt-1 text-sm leading-6 text-[var(--color-text-soft)]">{child.description}</p>
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href!}
                  onClick={() => setOpen(false)}
                  className={`rounded-2xl px-4 py-3 text-sm font-medium transition ${
                    isActive(item.href)
                      ? "bg-white text-[var(--color-brand)]"
                      : "bg-[var(--color-panel-low)] text-[var(--color-text-soft)]"
                  }`}
                >
                  {item.label}
                </Link>
              ),
            )}
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2 border-t border-[var(--color-line)] pt-4">
            {navContent.topLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="inline-flex min-h-10 items-center rounded-xl px-4 py-2 text-sm font-medium text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-panel-low)] hover:text-[var(--color-text)]"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
