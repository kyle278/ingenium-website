"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
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
  eyebrow?: string;
  pillars?: string[];
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
      eyebrow: "Acquisition + execution",
      pillars: ["Websites", "CRM", "Automations", "AI agents"],
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
      eyebrow: "Operating layer",
      pillars: ["Implementation", "Security", "Data", "Support"],
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
      eyebrow: "Evidence + diagnostics",
      pillars: ["Projects", "Technical review", "Teardown"],
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
      eyebrow: "People + policies",
      pillars: ["About", "Team", "Contact", "Privacy"],
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
    { label: "Projects", href: "/projects" },
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

const getPanelId = (label: string) => `nav-panel-${label.toLowerCase().replace(/\s+/g, "-")}`;

export default function SiteNav() {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [desktopDropdown, setDesktopDropdown] = useState<string | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        setDesktopDropdown(null);
        setMobileDropdown(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const isActive = (href?: string) => Boolean(href && (pathname === href || pathname.startsWith(`${href}/`)));

  const isDropdownActive = (item: NavItem) =>
    Boolean(item.children?.some((child) => pathname === child.href || pathname.startsWith(`${child.href}/`)));

  const closeMenus = () => {
    setOpen(false);
    setDesktopDropdown(null);
    setMobileDropdown(null);
  };

  const activeDesktopItem =
    navContent.items.find((item) => item.label === desktopDropdown && item.children?.length) ?? null;
  const featuredDesktopChild = activeDesktopItem?.children?.[0] ?? null;
  const activeDesktopChildCount = activeDesktopItem?.children?.length ?? 0;
  const desktopMegaMenuGridClass =
    activeDesktopChildCount <= 3
      ? "lg:grid-cols-3"
      : activeDesktopChildCount === 4
        ? "lg:grid-cols-4"
        : activeDesktopChildCount === 5
          ? "lg:grid-cols-5"
          : "lg:grid-cols-4";

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
          <p className="type-meta-kicker text-[var(--color-secondary)]">
            Connected websites. Intelligent growth.
          </p>
          <div className="flex items-center gap-5">
            {navContent.topLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenus}
                className="hover:text-[var(--color-text)]"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 px-5 py-4">
          <Link href="/" onClick={closeMenus} className="flex items-center gap-3">
            <Image src="/logo.svg" alt="Ingenium logo" width={30} height={30} className="h-7 w-7" priority />
            <div className="min-w-0">
              <p className="type-nav-brand text-[var(--color-text)]">
                {navContent.brand}
              </p>
              <p className="type-caption-kicker font-medium text-[var(--color-text-muted)]">
                Website + CRM + AI
              </p>
            </div>
          </Link>

          <div className="hidden flex-1 justify-center lg:flex">
            <div
              className="relative flex w-full max-w-[1240px] flex-col items-center"
              onMouseLeave={() => setDesktopDropdown(null)}
            >
              <nav className="relative z-10 flex items-center gap-1">
                {navContent.items.map((item) =>
                  item.children ? (
                    <button
                      key={item.label}
                      id={`${getPanelId(item.label)}-trigger`}
                      type="button"
                      aria-expanded={desktopDropdown === item.label}
                      aria-controls={getPanelId(item.label)}
                      onMouseEnter={() => setDesktopDropdown(item.label)}
                      onFocus={() => setDesktopDropdown(item.label)}
                      onClick={() => setDesktopDropdown((value) => (value === item.label ? null : item.label))}
                      className={`group inline-flex items-center gap-1.5 rounded-full px-3.5 py-2.5 transition-[background-color,color,box-shadow] duration-200 ease-[var(--motion-ease-out)] ${
                        isDropdownActive(item) || desktopDropdown === item.label
                          ? "bg-[rgba(20,36,61,0.08)] text-[var(--color-text)] shadow-[inset_0_0_0_1px_rgba(217,226,236,0.9)]"
                          : "text-[var(--color-text-soft)] hover:bg-[rgba(20,36,61,0.05)] hover:text-[var(--color-text)]"
                      }`}
                    >
                      <span className="type-action">{item.label}</span>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ease-[var(--motion-ease-out)] ${
                          desktopDropdown === item.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  ) : (
                    <Link
                      key={item.href}
                      href={item.href!}
                      onClick={closeMenus}
                      className={`inline-flex items-center rounded-full px-3.5 py-2.5 transition-[background-color,color,box-shadow] duration-200 ease-[var(--motion-ease-out)] ${
                        isActive(item.href)
                          ? "bg-[rgba(20,36,61,0.08)] text-[var(--color-text)] shadow-[inset_0_0_0_1px_rgba(217,226,236,0.9)]"
                          : "text-[var(--color-text-soft)] hover:bg-[rgba(20,36,61,0.05)] hover:text-[var(--color-text)]"
                      }`}
                    >
                      <span className="type-action">{item.label}</span>
                    </Link>
                  ),
                )}
              </nav>

              {activeDesktopItem ? (
                <div className="absolute inset-x-0 top-full z-30 pt-4">
                  <div
                    id={getPanelId(activeDesktopItem.label)}
                    role="region"
                    aria-labelledby={`${getPanelId(activeDesktopItem.label)}-trigger`}
                    className="ghost-outline relative overflow-hidden rounded-[32px] bg-[rgba(247,250,254,0.96)] p-3 shadow-[0_24px_64px_rgba(20,36,61,0.16)] backdrop-blur-2xl"
                  >
                    <div className="absolute top-5 right-8 h-28 w-28 rounded-full bg-[rgba(19,183,168,0.12)] blur-[46px]" />
                    <div className="absolute bottom-0 left-[32%] h-20 w-20 rounded-full bg-[rgba(23,103,195,0.12)] blur-[34px]" />

                    <div className="relative overflow-hidden rounded-[26px] bg-[linear-gradient(135deg,rgba(20,36,61,0.99),rgba(18,48,86,0.97))] text-white">
                      <div className="grid-lines absolute inset-0 opacity-[0.08]" />
                      <div
                        className={`relative grid gap-3 ${
                          featuredDesktopChild ? "lg:grid-cols-[minmax(0,1fr)_14.5rem]" : ""
                        } p-4`}
                      >
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="type-detail-kicker text-[rgba(220,236,255,0.76)]">
                              {activeDesktopItem.eyebrow}
                            </p>
                            <span className="type-caption-kicker rounded-full bg-[rgba(255,255,255,0.12)] px-2.5 py-1.5 text-[rgba(220,236,255,0.72)]">
                              {String(activeDesktopChildCount).padStart(2, "0")} pages
                            </span>
                          </div>
                          <h3 className="mt-3 type-card-title text-white">
                            {activeDesktopItem.label}
                          </h3>
                          {activeDesktopItem.description ? (
                            <p
                              className="mt-2 max-w-[64ch] overflow-hidden text-[13px] leading-5 text-[rgba(220,236,255,0.82)] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]"
                            >
                              {activeDesktopItem.description}
                            </p>
                          ) : null}

                          <div className="mt-3 flex flex-wrap gap-1.5">
                            {activeDesktopItem.pillars?.map((pillar) => (
                              <span
                                key={pillar}
                                className="type-caption-kicker rounded-full bg-[rgba(255,255,255,0.12)] px-2.5 py-1.5 text-[rgba(220,236,255,0.8)]"
                              >
                                {pillar}
                              </span>
                            ))}
                          </div>
                        </div>

                        {featuredDesktopChild ? (
                          <Link
                            href={featuredDesktopChild.href}
                            onClick={closeMenus}
                            className="rounded-[22px] bg-[rgba(255,255,255,0.12)] px-3.5 py-3 transition-colors duration-200 ease-[var(--motion-ease-out)] hover:bg-[rgba(255,255,255,0.18)]"
                          >
                            <p className="type-caption-kicker text-[rgba(220,236,255,0.68)]">
                              Recommended entry
                            </p>
                            <div className="mt-2 flex items-center justify-between gap-3">
                              <p className="type-action text-white">{featuredDesktopChild.label}</p>
                              <ArrowRight className="h-4 w-4 text-white" />
                            </div>
                            <p className="mt-1.5 overflow-hidden text-[13px] leading-5 text-[rgba(220,236,255,0.8)] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3]">
                              {featuredDesktopChild.description}
                            </p>
                          </Link>
                        ) : null}
                      </div>
                    </div>

                    <div className="mt-2.5 rounded-[26px] bg-[rgba(255,255,255,0.92)] p-2.5">
                      <div className="flex items-center justify-between px-2 pb-2">
                        <p className="type-detail-kicker text-[var(--color-text-muted)]">Pick your next step</p>
                        <p className="text-xs font-medium tracking-[-0.01em] text-[var(--color-text-muted)]">
                          {activeDesktopChildCount} pages
                        </p>
                      </div>

                      <div className={`grid gap-2 ${desktopMegaMenuGridClass}`}>
                        {activeDesktopItem.children?.map((child, index) => {
                          const childIsActive = isActive(child.href);

                          return (
                            <Link
                              key={child.href}
                              href={child.href}
                              aria-current={childIsActive ? "page" : undefined}
                              onClick={closeMenus}
                              className={`group rounded-[22px] border px-3 py-3 transition-[transform,background-color,border-color,box-shadow] duration-220 ease-[var(--motion-ease-out)] ${
                                childIsActive
                                  ? "border-[rgba(23,103,195,0.18)] bg-[var(--color-panel-high)] shadow-[0_10px_24px_rgba(20,36,61,0.08)]"
                                  : "border-transparent bg-[rgba(241,245,249,0.72)] hover:-translate-y-[2px] hover:border-[rgba(23,103,195,0.16)] hover:bg-white hover:shadow-[0_10px_24px_rgba(20,36,61,0.08)]"
                              }`}
                            >
                              <div className="flex items-start justify-between gap-3">
                                <span className="type-caption-kicker text-[var(--color-text-muted)]">
                                  {String(index + 1).padStart(2, "0")}
                                </span>
                                <span
                                  className={`inline-flex h-7 w-7 items-center justify-center rounded-full transition-colors duration-200 ease-[var(--motion-ease-out)] ${
                                    childIsActive
                                      ? "bg-white text-[var(--color-brand)]"
                                      : "bg-white/82 text-[var(--color-brand)] group-hover:bg-[var(--color-panel-high)]"
                                  }`}
                                >
                                  <ArrowRight className="h-3.5 w-3.5" />
                                </span>
                              </div>
                              <p className="mt-3 type-action text-[var(--color-text)]">
                                {child.label}
                              </p>
                              <p className="mt-1 overflow-hidden text-[13px] leading-5 text-[var(--color-text-soft)] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">
                                {child.description}
                              </p>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href={navContent.secondaryCta.href}
              onClick={closeMenus}
              className="type-action text-[var(--color-text-soft)] transition hover:text-[var(--color-text)]"
            >
              {navContent.secondaryCta.label}
            </Link>
            <Link
              href={navContent.primaryCta.href}
              onClick={closeMenus}
              className="cta-lift inline-flex rounded-md bg-[linear-gradient(135deg,var(--color-brand),var(--color-brand-strong))] px-4 py-2.5 type-action text-white shadow-[0_4px_24px_rgba(24,28,31,0.08)]"
            >
              {navContent.primaryCta.label}
            </Link>
          </div>

          <button
            type="button"
            aria-label="Toggle navigation"
            onClick={() => {
              setDesktopDropdown(null);
              setOpen((value) => !value);
            }}
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
                onClick={closeMenus}
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
        <div className="ghost-outline mx-auto mt-3 w-full max-w-[1280px] rounded-[28px] bg-[rgba(247,250,254,0.94)] p-5 shadow-[0_4px_24px_rgba(24,28,31,0.08)] backdrop-blur-xl lg:hidden">
          <div className="mt-1 grid gap-2">
            <Link
              href={navContent.primaryCta.href}
              onClick={closeMenus}
              className="cta-lift inline-flex justify-center rounded-md bg-[linear-gradient(135deg,var(--color-brand),var(--color-brand-strong))] px-4 py-3 type-action text-white"
            >
              {navContent.primaryCta.label}
            </Link>
            <Link
              href={navContent.secondaryCta.href}
              onClick={closeMenus}
              className="cta-lift type-action inline-flex justify-center rounded-md bg-[var(--color-panel-high)] px-4 py-3 text-[var(--color-brand)]"
            >
              {navContent.secondaryCta.label}
            </Link>
          </div>

          <div className="mt-4 grid gap-3">
            {navContent.items.map((item) =>
              item.children ? (
                <div
                  key={item.label}
                  className="overflow-hidden rounded-[24px] border border-[var(--color-line)] bg-[rgba(255,255,255,0.78)]"
                >
                  <button
                    type="button"
                    aria-expanded={mobileDropdown === item.label}
                    aria-controls={`${getPanelId(item.label)}-mobile`}
                    onClick={() => setMobileDropdown((value) => (value === item.label ? null : item.label))}
                    className="w-full px-4 py-4 text-left"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="type-caption-kicker text-[var(--color-text-muted)]">{item.eyebrow}</p>
                        <p className="mt-2 type-action text-[var(--color-text)]">{item.label}</p>
                      </div>
                      <ChevronDown
                        className={`mt-0.5 h-5 w-5 flex-none text-[var(--color-text-soft)] transition-transform duration-200 ease-[var(--motion-ease-out)] ${
                          mobileDropdown === item.label ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                    {item.description ? (
                      <p className="mt-3 pr-8 text-sm leading-6 text-[var(--color-text-soft)]">{item.description}</p>
                    ) : null}
                  </button>

                  {mobileDropdown === item.label ? (
                    <div
                      id={`${getPanelId(item.label)}-mobile`}
                      className="border-t border-[var(--color-line)] bg-[var(--color-panel-low)] p-3"
                    >
                      {item.pillars?.length ? (
                        <div className="mb-3 flex flex-wrap gap-2 px-1">
                          {item.pillars.map((pillar) => (
                            <span
                              key={pillar}
                              className="type-caption-kicker rounded-full bg-white px-3 py-2 text-[var(--color-text-muted)]"
                            >
                              {pillar}
                            </span>
                          ))}
                        </div>
                      ) : null}

                      <div className={`grid gap-2 ${item.children.length > 4 ? "sm:grid-cols-2" : ""}`}>
                        {item.children.map((child, index) => {
                          const childIsActive = isActive(child.href);

                          return (
                            <Link
                              key={child.href}
                              href={child.href}
                              aria-current={childIsActive ? "page" : undefined}
                              onClick={closeMenus}
                              className={`rounded-[20px] border px-4 py-4 ${
                                childIsActive
                                  ? "border-[rgba(23,103,195,0.18)] bg-white"
                                  : "border-transparent bg-[rgba(255,255,255,0.84)]"
                              }`}
                            >
                              <div className="flex items-start justify-between gap-3">
                                <span className="type-caption-kicker text-[var(--color-text-muted)]">
                                  {String(index + 1).padStart(2, "0")}
                                </span>
                                <ArrowRight className="mt-0.5 h-4 w-4 text-[var(--color-brand)]" />
                              </div>
                              <p className="mt-4 type-action text-[var(--color-text)]">{child.label}</p>
                              <p className="mt-2 text-sm leading-6 text-[var(--color-text-soft)]">
                                {child.description}
                              </p>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href!}
                  onClick={closeMenus}
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
                onClick={closeMenus}
                className="type-action inline-flex min-h-10 items-center rounded-xl px-4 py-2 text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-panel-low)] hover:text-[var(--color-text)]"
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
