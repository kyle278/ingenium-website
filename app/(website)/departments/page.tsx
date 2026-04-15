import type { Metadata } from "next";
import Link from "next/link";

import { buildMetadata, pageSeo } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(pageSeo["/departments"]);

export default function DepartmentsPage() {
  return (
    <div className="space-y-20 pb-8 md:space-y-28">
      <section className="pt-10">
        <div className="mx-auto max-w-4xl rounded-[36px] border border-[var(--color-line)] bg-white/82 px-8 py-12 shadow-[0_22px_55px_rgba(22,32,51,0.06)]">
          <p className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.28em] text-[var(--color-brand)]">
            Archived page
          </p>
          <h1 className="mt-6 font-[var(--font-display)] text-4xl font-semibold tracking-[-0.05em] text-[var(--color-text)] sm:text-5xl">
            This enterprise AI departments page is not part of Ingenium&apos;s active public story.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--color-text-soft)]">
            Ingenium&apos;s main site currently focuses on revenue operations for service businesses. The previous AI departments narrative has been pulled out of active promotion until it has dedicated proof and enterprise-ready supporting material.
          </p>
          <div className="mt-8 grid gap-3 md:grid-cols-2">
            {[
              "This page is intentionally noindexed.",
              "Placeholder deployment averages and ambiguous metrics have been removed.",
              "Use the main service-business journey for current product positioning.",
              "Request a technical review directly if your question is AI governance related.",
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-panel-low)] px-4 py-4 text-sm leading-7 text-[var(--color-text-soft)]">
                {item}
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/"
              className="cta-lift inline-flex items-center justify-center rounded-md bg-[linear-gradient(135deg,var(--color-brand),var(--color-brand-strong))] px-5 py-3 text-sm font-semibold text-white"
            >
              Return to Homepage
            </Link>
            <Link
              href="/technical-review"
              className="cta-lift inline-flex items-center justify-center rounded-md bg-[var(--color-panel-high)] px-5 py-3 text-sm font-semibold text-[var(--color-brand)]"
            >
              Technical Review
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
