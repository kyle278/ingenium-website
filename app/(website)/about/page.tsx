import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { buildMetadata, pageSeo } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(pageSeo["/about"]);

const primaryButton =
  "inline-flex items-center gap-2 rounded-md bg-[linear-gradient(135deg,var(--color-brand),var(--color-brand-strong))] px-6 py-3 text-sm font-semibold text-white";
const secondaryButton =
  "inline-flex items-center gap-2 rounded-md bg-[var(--color-panel-high)] px-6 py-3 text-sm font-semibold text-[var(--color-brand)]";

export default function AboutPage() {
  return (
    <div className="space-y-24 pb-4 md:space-y-28">
      <section className="grid items-start gap-10 lg:grid-cols-[1.05fr,0.95fr]">
        <div>
          <p className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.24em] text-[var(--color-brand)]">
            About Ingenium
          </p>
          <h1 className="mt-5 max-w-3xl font-[var(--font-display)] text-4xl font-semibold tracking-[-0.03em] text-[var(--color-text)] sm:text-5xl">
            Ingenium exists to make service businesses easier to run.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--color-text-soft)]">
            The company story is simple: too many service businesses are trying to grow on top of disconnected websites, CRM setups, automations, reporting tools, and AI experiments. Ingenium was built to replace that sprawl with one accountable operating system.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/demo" className={primaryButton}>
              Book Demo
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/case-studies" className={secondaryButton}>
              Review Proof
            </Link>
          </div>
        </div>

        <div className="mineral-panel rounded-[28px] p-6">
          <p className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.24em] text-[var(--color-text-muted)]">
            Company facts
          </p>
          <div className="mt-5 grid gap-3">
            {[
              "Company name: Ingenium",
              "Descriptor: revenue operating system for service businesses",
              "Built for: founder-led service companies, consultancies, and revenue or ops teams cleaning up growth systems",
              "Delivery model: software plus rollout support",
            ].map((item) => (
              <div key={item} className="rounded-2xl bg-[var(--color-panel-low)] px-4 py-4 text-sm text-[var(--color-text-soft)]">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="mineral-panel rounded-[28px] p-6">
          <p className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.24em] text-[var(--color-brand)]">
            Why it exists
          </p>
          <h2 className="mt-4 font-[var(--font-display)] text-3xl font-semibold tracking-[-0.03em] text-[var(--color-text)]">
            The commercial problem is usually fragmentation, not lack of software.
          </h2>
          <div className="mt-6 grid gap-3">
            {[
              "Leads arrive without enough context.",
              "CRM records stop reflecting reality.",
              "Sales-to-delivery handoff loses the original story.",
              "Automation and AI create more hidden complexity instead of less.",
            ].map((item) => (
              <div key={item} className="rounded-xl bg-[var(--color-panel-low)] p-4 text-sm text-[var(--color-text-soft)]">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="mineral-panel rounded-[28px] p-6">
          <p className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.24em] text-[var(--color-brand)]">
            Operating principles
          </p>
          <div className="mt-6 grid gap-3">
            {[
              "Outcome first: business result before mechanism.",
              "One operating record: shared context across website, CRM, handoff, and reporting.",
              "Visible control: approvals, ownership, and history must be reviewable.",
              "Plain language: buyer-plain copy over internal systems language.",
            ].map((item) => (
              <div key={item} className="rounded-xl bg-[var(--color-panel-low)] p-4 text-sm text-[var(--color-text-soft)]">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mineral-panel rounded-[28px] p-8">
        <p className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.24em] text-[var(--color-brand)]">
          Delivery model
        </p>
        <h2 className="mt-4 font-[var(--font-display)] text-3xl font-semibold tracking-[-0.03em] text-[var(--color-text)]">
          Software plus rollout, review support, and a clearer path for buyers.
        </h2>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {[
            ["Commercial review", "Founders and revenue leaders review the buyer path, routing logic, and rollout priority."],
            ["Operational rollout", "CRM execution, automation, handoff, and reporting are configured around the target workflow."],
            ["Technical review", "Approvals, access, audit history, and architecture questions have a dedicated path."],
          ].map(([title, body]) => (
            <div key={title} className="rounded-2xl bg-[var(--color-panel-low)] p-5">
              <p className="font-[var(--font-display)] text-xl font-semibold tracking-[-0.03em] text-[var(--color-text)]">
                {title}
              </p>
              <p className="mt-3 text-sm leading-7 text-[var(--color-text-soft)]">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="graphite-panel rounded-[36px] px-8 py-12">
        <h2 className="font-[var(--font-display)] text-3xl font-semibold tracking-[-0.03em] text-white">
          Buyers remember companies that have a point of view.
        </h2>
        <p className="mt-4 max-w-3xl text-slate-300">
          Ingenium&apos;s point of view is that growth systems should be simpler to trust, simpler to review, and simpler to run.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="/demo" className={primaryButton}>
            Book Demo
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          <Link href="/technical-review" className={secondaryButton}>
            Request a Technical Review
          </Link>
          <Link
            href="/revenue-systems-teardown"
            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-300 transition hover:text-emerald-200"
          >
            Request a Revenue Systems Teardown
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
