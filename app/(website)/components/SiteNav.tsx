"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const navItems = Array.isArray(content.items) ? content.items : [];

  return (
    <header className="sticky top-0 z-50">
      <div className="mx-auto max-w-6xl px-6 pt-5">
        <div className="flex h-[70px] items-center justify-between rounded-full border border-white/70 bg-white/80 px-6 shadow-[0_12px_40px_rgba(15,23,42,0.08)] backdrop-blur">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-sm font-bold text-white">
              I
            </span>
            <span
              className="font-[var(--font-display)] text-lg font-semibold tracking-tight text-slate-900"
              {...editorAttrs}
            >
              {content.brand}
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm transition-colors ${
                  pathname === item.href
                    ? "font-semibold text-slate-900"
                    : "text-slate-500 hover:text-slate-900"
                }`}
                {...editorAttrs}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-5 lg:flex">
            <Link
              href="/contact"
              className="text-sm text-slate-500 transition-colors hover:text-slate-900"
              {...editorAttrs}
            >
              {content.contact_label}
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
              {...editorAttrs}
            >
              {content.cta_label}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200/60 bg-white/70 lg:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 top-[86px] z-50 bg-[#f6f2eb] lg:hidden">
          <nav className="mx-auto max-w-6xl space-y-2 px-6 py-8">
            {[...navItems, { href: "/contact", label: content.contact_label }].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`block rounded-2xl px-5 py-3 text-base font-medium transition ${
                  pathname === item.href
                    ? "bg-white text-slate-900"
                    : "text-slate-600 hover:bg-white/70 hover:text-slate-900"
                }`}
                {...editorAttrs}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-6">
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="block rounded-full bg-emerald-600 px-6 py-3.5 text-center text-sm font-semibold text-white"
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
