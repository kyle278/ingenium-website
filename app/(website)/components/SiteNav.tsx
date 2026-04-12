"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type NavItem = {
  href: string;
  label: string;
};

type SiteNavContent = {
  brand: string;
  items: NavItem[];
  primaryCta: NavItem;
  secondaryCta: NavItem;
};

export default function SiteNav({ content }: { content: SiteNavContent }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <div
        className={`mx-auto flex max-w-[1280px] items-center justify-between rounded-full border px-4 py-3 transition-all duration-300 ${
          scrolled
            ? "border-[var(--color-line)] bg-white/78 shadow-[0_18px_50px_rgba(22,32,51,0.10)] backdrop-blur-xl"
            : "border-white/50 bg-white/62 backdrop-blur-lg"
        }`}
      >
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.svg" alt="Ingenium logo" width={30} height={30} className="h-7 w-7" priority />
          <div>
            <p className="font-[var(--font-display)] text-base font-semibold tracking-[-0.04em] text-[var(--color-text)]">
              {content.brand}
            </p>
            <p className="font-[var(--font-mono)] text-[9px] uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
              Revenue operating system
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {content.items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                isActive(item.href)
                  ? "bg-[rgba(18,121,255,0.10)] text-[var(--color-brand)]"
                  : "text-[var(--color-text-soft)] hover:bg-white/75 hover:text-[var(--color-text)]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href={content.secondaryCta.href}
            className="cta-lift inline-flex rounded-full border border-[var(--color-line)] bg-white/70 px-4 py-2 text-sm font-semibold text-[var(--color-text)]"
          >
            {content.secondaryCta.label}
          </Link>
          <Link
            href={content.primaryCta.href}
            className="cta-lift inline-flex rounded-full bg-[var(--color-text)] px-4 py-2 text-sm font-semibold text-white shadow-[0_18px_38px_rgba(22,32,51,0.14)]"
          >
            {content.primaryCta.label}
          </Link>
        </div>

        <button
          type="button"
          aria-label="Toggle navigation"
          onClick={() => setOpen((value) => !value)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-line)] bg-white/72 text-[var(--color-text)] lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div className="mx-auto mt-3 max-w-[1280px] rounded-[28px] border border-[var(--color-line)] bg-white/90 p-5 shadow-[0_30px_70px_rgba(22,32,51,0.12)] backdrop-blur-xl lg:hidden">
          <div className="grid gap-2">
            {content.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`rounded-2xl px-4 py-3 text-sm font-medium transition ${
                  isActive(item.href)
                    ? "bg-[rgba(18,121,255,0.10)] text-[var(--color-brand)]"
                    : "bg-white/50 text-[var(--color-text-soft)]"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="mt-4 grid gap-2">
            <Link
              href={content.secondaryCta.href}
              onClick={() => setOpen(false)}
              className="cta-lift inline-flex justify-center rounded-full border border-[var(--color-line)] bg-white px-4 py-3 text-sm font-semibold text-[var(--color-text)]"
            >
              {content.secondaryCta.label}
            </Link>
            <Link
              href={content.primaryCta.href}
              onClick={() => setOpen(false)}
              className="cta-lift inline-flex justify-center rounded-full bg-[var(--color-text)] px-4 py-3 text-sm font-semibold text-white"
            >
              {content.primaryCta.label}
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
