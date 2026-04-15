"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type NavItem = {
  href?: string;
  label: string;
  description?: string;
  children?: Array<{
    href: string;
    label: string;
    description: string;
  }>;
};

type CtaItem = {
  href: string;
  label: string;
};

type SiteNavContent = {
  brand: string;
  items: NavItem[];
  primaryCta: CtaItem;
  secondaryCta: CtaItem;
};

export default function SiteNav({ content }: { content: SiteNavContent }) {
  const pathname = usePathname();
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

  const isActive = (href?: string) =>
    Boolean(href && (pathname === href || pathname.startsWith(`${href}/`)));

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
          <p className="font-[var(--font-mono)] uppercase tracking-[0.24em] text-[var(--color-brand)]">
            Revenue operating system for service businesses
          </p>
          <div className="flex items-center gap-5">
            <Link href="/case-studies" className="hover:text-[var(--color-text)]">
              Customer stories
            </Link>
            <Link href="/implementation" className="hover:text-[var(--color-text)]">
              Implementation
            </Link>
            <Link href="/technical-review" className="hover:text-[var(--color-text)]">
              Technical review
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-between px-5 py-4">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.svg" alt="Ingenium logo" width={30} height={30} className="h-7 w-7" priority />
            <div className="min-w-0">
              <p className="font-[var(--font-display)] text-sm font-semibold tracking-[-0.04em] text-[var(--color-text)] sm:text-base">
                {content.brand}
              </p>
              <p className="font-[var(--font-mono)] text-[8px] uppercase tracking-[0.24em] text-[var(--color-text-muted)] sm:text-[9px]">
                Revenue systems for service businesses
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {content.items.map((item) => (
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
                    className={`rounded-md px-3 py-2 text-sm font-medium transition ${
                      isDropdownActive(item)
                        ? "bg-[var(--color-panel-high)] text-[var(--color-brand)]"
                        : "text-[var(--color-text-soft)] hover:bg-[var(--color-panel-low)] hover:text-[var(--color-text)]"
                    }`}
                  >
                    {item.label}
                  </button>

                  {openDropdown === item.label ? (
                    <div className="ghost-outline absolute left-0 top-full z-20 mt-3 w-[420px] rounded-[28px] bg-[rgba(247,250,254,0.96)] p-4 shadow-[0_4px_24px_rgba(24,28,31,0.08)] backdrop-blur-xl">
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
              )
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href={content.secondaryCta.href}
              className="text-sm font-semibold text-[var(--color-text-soft)] transition hover:text-[var(--color-text)]"
            >
              {content.secondaryCta.label}
            </Link>
            <Link
              href={content.primaryCta.href}
              className="cta-lift inline-flex rounded-md bg-[linear-gradient(135deg,var(--color-brand),var(--color-brand-strong))] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_4px_24px_rgba(24,28,31,0.08)]"
            >
              {content.primaryCta.label}
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
      </div>

      {open ? (
        <div className="ghost-outline mx-auto mt-3 max-w-[1280px] rounded-[28px] bg-[rgba(247,250,254,0.94)] p-5 shadow-[0_4px_24px_rgba(24,28,31,0.08)] backdrop-blur-xl lg:hidden">
          <div className="grid gap-2">
            {content.items.map((item) => (
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
              )
            ))}
          </div>
          <div className="mt-4 grid gap-2">
            <Link
              href={content.secondaryCta.href}
              onClick={() => setOpen(false)}
              className="cta-lift inline-flex justify-center rounded-md bg-[var(--color-panel-high)] px-4 py-3 text-sm font-semibold text-[var(--color-brand)]"
            >
              {content.secondaryCta.label}
            </Link>
            <Link
              href={content.primaryCta.href}
              onClick={() => setOpen(false)}
              className="cta-lift inline-flex justify-center rounded-md bg-[linear-gradient(135deg,var(--color-brand),var(--color-brand-strong))] px-4 py-3 text-sm font-semibold text-white"
            >
              {content.primaryCta.label}
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
