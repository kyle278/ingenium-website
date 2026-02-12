"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

const navItems = [
  { href: "/websites", label: "Websites" },
  { href: "/platform", label: "Platform" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/security", label: "Security" },
];

export default function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
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

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-[#f7f2ea]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-sm font-bold text-white">
            I
          </span>
          <span className="font-[var(--font-display)] text-lg font-semibold tracking-tight">
            Ingenium
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm transition-colors ${
                pathname === item.href
                  ? "font-medium text-slate-900"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <Link
            href="/contact"
            className="text-sm text-slate-500 transition-colors hover:text-slate-900"
          >
            Contact
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            Book a Strategy Call
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg lg:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 top-[73px] z-50 bg-[#f7f2ea] lg:hidden">
          <nav className="mx-auto max-w-7xl space-y-1 px-6 py-8">
            {[...navItems, { href: "/contact", label: "Contact" }].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`block rounded-xl px-4 py-3 text-base font-medium transition ${
                  pathname === item.href
                    ? "bg-white text-slate-900"
                    : "text-slate-600 hover:bg-white/60 hover:text-slate-900"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-6">
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="block rounded-full bg-slate-900 px-6 py-3.5 text-center text-sm font-medium text-white"
              >
                Book a Strategy Call
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
