import Image from "next/image";
import Link from "next/link";

import { ButtonLink, MonoTag } from "./sitePrimitives";

type FooterLink = {
  href: string;
  label: string;
};

type SiteFooterContent = {
  summary: string;
  sitemap: FooterLink[];
  trust: FooterLink[];
  actions: FooterLink[];
};

export default function SiteFooter({ content }: { content: SiteFooterContent }) {
  return (
    <footer className="bg-[rgba(241,244,248,0.76)]">
      <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mineral-panel rounded-[36px] p-8 md:p-10">
          <div className="grid gap-10 lg:grid-cols-[1.1fr,0.9fr]">
            <div>
              <div className="flex items-center gap-3">
                <Image src="/logo.svg" alt="Ingenium logo" width={34} height={34} className="h-8 w-8" />
                <div>
                  <p className="font-[var(--font-display)] text-xl font-semibold tracking-[-0.04em] text-[var(--color-text)]">
                    Ingenium Consulting
                  </p>
                  <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
                    Connected websites. Intelligent growth.
                  </p>
                </div>
              </div>
              <p className="mt-5 max-w-xl text-base leading-7 text-[var(--color-text-soft)]">
                {content.summary}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["Connected websites", "CRM integration", "Marketing automation", "AI workflows"].map((item) => (
                  <MonoTag key={item}>{item}</MonoTag>
                ))}
              </div>
            </div>

            <div className="grid gap-8 sm:grid-cols-3">
              <div>
                <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.24em] text-[var(--color-text-muted)]">
                  Platform
                </p>
                <div className="mt-4 grid gap-2">
                  {content.sitemap.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-sm text-[var(--color-text-soft)] hover:text-[var(--color-text)]"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.24em] text-[var(--color-text-muted)]">
                  Trust
                </p>
                <div className="mt-4 grid gap-2">
                  {content.trust.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-sm text-[var(--color-text-soft)] hover:text-[var(--color-text)]"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.24em] text-[var(--color-text-muted)]">
                  Get started
                </p>
                <div className="mt-4 grid gap-3">
                  <ButtonLink action={content.actions[0]} />
                  <ButtonLink action={content.actions[1]} variant="secondary" />
                  <ButtonLink action={content.actions[2]} variant="tertiary" />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-3 pt-6 text-sm text-[var(--color-text-muted)]">
            <p>(c) 2026 Ingenium Digital Consulting</p>
            <p>Designed for startups and SMEs that want smarter growth.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
