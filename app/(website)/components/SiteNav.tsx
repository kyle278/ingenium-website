"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const navItems = [
  { href: "/websites", label: "Websites" },
  { href: "/platform", label: "Platform" },
  { href: "/agents", label: "AI Agents" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/security", label: "Security" },
];

const primaryCta =
  "inline-flex items-center gap-2 rounded-full bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(5,150,105,0.35)] transition hover:bg-emerald-800";
const secondaryCta =
  "inline-flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/80 px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-white";

export default function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

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

  return (
    <div className="flex items-center justify-between rounded-3xl border border-slate-200/70 bg-white/80 px-6 py-4 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur">
      <Link href="/" className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-700 text-white font-semibold">
          I
        </span>
        <div className="leading-tight">
          <div className="font-[var(--font-display)] text-base font-semibold tracking-tight">Ingenium</div>
          <div className="text-xs text-slate-500">Enterprise Website Systems</div>
        </div>
      </Link>

      <div className="hidden lg:flex items-center gap-1 text-sm">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                active
                  ? "bg-emerald-50 text-emerald-800"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>

      <div className="hidden lg:flex items-center gap-2">
        <Link href="/case-studies" className={secondaryCta}>
          View case studies
        </Link>
        <Link href="/contact" className={primaryCta}>
          Get a Website Strategy Call
        </Link>
      </div>

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="lg:hidden h-10 w-10 rounded-2xl border border-slate-200/70 bg-white inline-flex items-center justify-center"
        aria-label="Toggle navigation"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 bg-[#f7f2ea] lg:hidden">
          <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200/70 bg-white/90">
            <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-700 text-white font-semibold">
                I
              </span>
              <div className="leading-tight">
                <div className="font-[var(--font-display)] text-base font-semibold tracking-tight">Ingenium</div>
                <div className="text-xs text-slate-500">Enterprise Website Systems</div>
              </div>
            </Link>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="h-10 w-10 rounded-2xl border border-slate-200/70 bg-white inline-flex items-center justify-center"
              aria-label="Close navigation"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="px-6 py-8 space-y-6">
            <div className="grid gap-2 text-base">
              {navItems.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`rounded-2xl px-4 py-3 font-medium transition ${
                      active
                        ? "bg-emerald-50 text-emerald-800"
                        : "text-slate-600 hover:text-slate-900 hover:bg-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
            <div className="space-y-3">
              <Link href="/case-studies" className={`${secondaryCta} w-full`} onClick={() => setOpen(false)}>
                View case studies
              </Link>
              <Link href="/contact" className={`${primaryCta} w-full`} onClick={() => setOpen(false)}>
                Get a Website Strategy Call
              </Link>
            </div>
            <div className="rounded-3xl border border-slate-200/70 bg-white/80 p-4 text-sm text-slate-600">
              Strategy, build, and optimization in one enterprise-ready system.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
