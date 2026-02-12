"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const navItems = [
  { href: "/websites", label: "Websites" },
  { href: "/platform", label: "Platform" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/security", label: "Security" },
  { href: "/contact", label: "Contact" },
];

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
    <div className="site-nav relative">
      <div className="flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 font-display text-lg">
          <span className="h-9 w-9 rounded-xl bg-[var(--accent)] text-[#071318] flex items-center justify-center font-semibold">I</span>
          <div className="leading-tight">
            <div>Ingenium</div>
            <div className="text-xs text-muted">Enterprise Website Systems</div>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-2 text-sm">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 py-1.5 transition ${
                  active
                    ? "bg-[var(--accent-soft)] text-[var(--accent)]"
                    : "text-muted hover:text-[var(--text)] hover:bg-[var(--surface-2)]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden md:flex items-center gap-2">
          <Link href="/case-studies" className="btn-secondary h-9 px-4 text-xs">
            View case studies
          </Link>
          <Link href="/contact" className="btn-primary h-9 px-4 text-xs">
            Get a Website Strategy Call
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="md:hidden h-10 w-10 rounded-xl border border-[var(--border)] bg-[var(--surface)] inline-flex items-center justify-center"
          aria-label="Toggle navigation"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-[var(--app-bg)] text-[var(--text)] md:hidden">
          <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--border)]">
            <Link href="/" className="flex items-center gap-2 font-display text-lg" onClick={() => setOpen(false)}>
              <span className="h-9 w-9 rounded-xl bg-[var(--accent)] text-[#071318] flex items-center justify-center font-semibold">I</span>
              <div className="leading-tight">
                <div>Ingenium</div>
                <div className="text-xs text-muted">Enterprise Website Systems</div>
              </div>
            </Link>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="h-10 w-10 rounded-xl border border-[var(--border)] bg-[var(--surface)] inline-flex items-center justify-center"
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
                    className={`rounded-xl px-4 py-3 transition ${
                      active
                        ? "bg-[var(--accent-soft)] text-[var(--accent)]"
                        : "text-muted hover:text-[var(--text)] hover:bg-[var(--surface-2)]"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
            <div className="space-y-3">
              <Link
                href="/case-studies"
                className="btn-secondary h-11 px-4 text-sm w-full inline-flex items-center justify-center"
                onClick={() => setOpen(false)}
              >
                View case studies
              </Link>
              <Link
                href="/contact"
                className="btn-primary h-11 px-4 text-sm w-full inline-flex items-center justify-center"
                onClick={() => setOpen(false)}
              >
                Get a Website Strategy Call
              </Link>
            </div>
            <div className="site-card p-4 text-sm text-muted">
              Launch a conversion-first enterprise website with a system that keeps optimizing after go-live.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
