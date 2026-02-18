"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

interface NavItem {
  href: string;
  label: string;
}

interface SiteNavContent {
  brand: string;
  items: NavItem[];
  contact_label: string;
  cta_label: string;
}

interface EditorAttrs {
  "data-content-block-key": string;
  "data-page-key": string;
  "data-section-key": string;
}

interface SiteNavProps {
  content: SiteNavContent;
  editorAttrs: EditorAttrs;
}

export default function SiteNav({ content, editorAttrs }: SiteNavProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);
  const [activeIndicator, setActiveIndicator] = useState({ x: 0, width: 0, visible: false });
  const navItems = Array.isArray(content.items) ? content.items : [];

  const isActivePath = useCallback(
    (href: string) => pathname === href || pathname.startsWith(`${href}/`),
    [pathname],
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const updateActiveIndicator = useCallback(() => {
    const navElement = navRef.current;
    if (!navElement) {
      return;
    }

    const activeLink = navElement.querySelector<HTMLAnchorElement>("a[data-active='true']");
    if (!activeLink) {
      setActiveIndicator((current) => ({ ...current, visible: false, width: 0 }));
      return;
    }

    const navRect = navElement.getBoundingClientRect();
    const linkRect = activeLink.getBoundingClientRect();

    setActiveIndicator({
      x: linkRect.left - navRect.left,
      width: linkRect.width,
      visible: true,
    });
  }, []);

  useEffect(() => {
    const rafId = window.requestAnimationFrame(updateActiveIndicator);
    window.addEventListener("resize", updateActiveIndicator);
    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("resize", updateActiveIndicator);
    };
  }, [pathname, navItems.length, updateActiveIndicator]);

  return (
    <header className="sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6">
        <div
          className={`flex h-16 items-center justify-between rounded-2xl border px-5 transition-all duration-300 ${
            scrolled
              ? "border-slate-800/80 bg-slate-900/90 shadow-lg shadow-black/20 backdrop-blur-xl"
              : "border-slate-800/40 bg-slate-900/60 backdrop-blur-md"
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/logo.svg" alt="Ingenium logo" width={32} height={32} className="h-8 w-8" priority />
            <span
              className="font-(--font-display) text-lg font-bold tracking-tight text-white"
              {...editorAttrs}
            >
              {content.brand}
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav ref={navRef} className="relative hidden items-center gap-1 lg:flex">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-1 rounded-lg bg-slate-800/60 transition-[transform,width,opacity] duration-300 motion-reduce:transition-none"
              style={{
                width: `${activeIndicator.width}px`,
                transform: `translateX(${activeIndicator.x}px)`,
                opacity: activeIndicator.visible ? 1 : 0,
              }}
            />
            {navItems.map((item) => {
              const isActive = isActivePath(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  data-active={isActive ? "true" : "false"}
                  className={`relative z-10 rounded-lg px-3 py-2 text-sm transition-colors ${
                    isActive
                      ? "font-semibold text-white"
                      : "text-slate-400 hover:bg-slate-800/40 hover:text-white"
                  }`}
                  {...editorAttrs}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden items-center gap-4 lg:flex">
            <Link
              href="/contact"
              className="text-sm text-slate-400 transition-colors hover:text-white"
              {...editorAttrs}
            >
              {content.contact_label}
            </Link>
            <Link
              href="/contact"
              className="cta-lift inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-500"
              {...editorAttrs}
            >
              {content.cta_label}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700/60 bg-slate-800/50 text-slate-300 lg:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="fixed inset-0 top-[84px] z-50 bg-slate-950/98 backdrop-blur-xl lg:hidden">
          <nav className="mx-auto max-w-7xl space-y-1 px-6 py-6">
            {[...navItems, { href: "/contact", label: content.contact_label }].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`block rounded-xl px-4 py-3 text-base font-medium transition ${
                  isActivePath(item.href)
                    ? "bg-slate-800 text-white"
                    : "text-slate-400 hover:bg-slate-800/60 hover:text-white"
                }`}
                {...editorAttrs}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4">
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="block rounded-xl bg-emerald-600 px-6 py-3.5 text-center text-sm font-semibold text-white shadow-lg shadow-emerald-600/20"
                {...editorAttrs}
              >
                {content.cta_label}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
