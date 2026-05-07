import type { Metadata } from "next";

import { buildMetadata, pageSeo } from "@/lib/seo";

import { ButtonLink, SectionIntro, SurfaceCard } from "../components/sitePrimitives";

export const metadata: Metadata = buildMetadata(pageSeo["/crm"]);

export default function CrmPage() {
  return (
    <div className="space-y-20 pb-8 md:space-y-28">
      <section className="grid items-center gap-10 pt-4 lg:grid-cols-[0.96fr,1.04fr]">
        <div>
          <p className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.28em] text-[var(--color-secondary)]">
            CRM
          </p>
          <h1 className="mt-6 max-w-4xl font-[var(--font-display)] text-5xl font-semibold tracking-[-0.06em] text-[var(--color-text)] sm:text-6xl">
            A CRM workspace your team can actually trust.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--color-text-soft)]">
            Ingenium builds custom CRM systems that store, score, route, and organize leads so sales, marketing, and
            delivery all work from the same record.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink action={{ label: "Book a Demo", href: "/demo" }} />
            <ButtonLink action={{ label: "Revenue Systems Teardown", href: "/revenue-systems-teardown" }} variant="secondary" />
          </div>
        </div>

        <SurfaceCard className="p-8">
          <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.24em] text-[var(--color-secondary)]">
            CRM workspace
          </p>
          <div className="mt-6 grid gap-3">
            {[
              "Contacts, pipelines, notes, and lifecycle stages stay in one place.",
              "Lead scoring and routing logic help the right owner act faster.",
              "Reporting reads from the same workflow your team uses every day.",
            ].map((item) => (
              <div key={item} className="rounded-[18px] border border-[var(--color-line)] bg-white/80 px-4 py-4 text-sm text-[var(--color-text-soft)]">
                {item}
              </div>
            ))}
          </div>
        </SurfaceCard>
      </section>

      <section>
        <SurfaceCard className="p-6 md:p-8">
          <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.24em] text-[var(--color-secondary)]">
            Direct answer
          </p>
          <h2 className="mt-4 font-[var(--font-display)] text-2xl font-semibold tracking-[-0.03em] text-[var(--color-text)]">
            What is a CRM workspace?
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-[var(--color-text-soft)]">
            A CRM workspace is the shared record of your commercial activity: contacts, lead source, pipeline stage,
            owner, notes, follow-up tasks, and delivery context. Ingenium improves CRM work by making those records
            easier to trust and easier to act on.
          </p>
        </SurfaceCard>
      </section>

      <section>
        <SectionIntro
          eyebrow="Why It Matters"
          title="A connected CRM reduces missed follow-up and fragmented handoff."
          body="The CRM should not just look populated. It should help your team know what happened, who owns the next step, and what needs attention."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            "Lead source and intent stay attached to the record.",
            "Ownership rules and next actions are visible immediately.",
            "Marketing and automation work from the same customer data.",
            "Delivery inherits the same commercial context after the sale.",
          ].map((item) => (
            <SurfaceCard key={item} className="panel-hover p-6 text-sm leading-7 text-[var(--color-text-soft)]">
              {item}
            </SurfaceCard>
          ))}
        </div>
      </section>

      <section>
        <SectionIntro
          eyebrow="Fit Check"
          title="A custom CRM is useful when the work depends on process, ownership, and clean handoff."
          body="It is usually not the right first move for a team that only needs a simple contact list or has not agreed how leads should move through the business."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {[
            [
              "Use it when",
              "Lead quality, routing, follow-up timing, and delivery context affect revenue outcomes.",
            ],
            [
              "Avoid it when",
              "The team needs basic storage only, has no shared sales process, or cannot maintain record quality.",
            ],
          ].map(([title, body]) => (
            <SurfaceCard key={title} className="panel-hover p-6">
              <p className="font-[var(--font-display)] text-2xl font-semibold tracking-[-0.03em] text-[var(--color-text)]">
                {title}
              </p>
              <p className="mt-4 text-sm leading-7 text-[var(--color-text-soft)]">{body}</p>
            </SurfaceCard>
          ))}
        </div>
      </section>

      <section className="graphite-panel rounded-[18px] px-8 py-12 text-center md:px-12">
        <h2 className="mx-auto max-w-4xl font-[var(--font-display)] text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">
          A CRM works best when it is part of the same website, marketing, and reporting system.
        </h2>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink action={{ label: "Book a Demo", href: "/demo" }} className="bg-white text-[var(--color-text)]" />
          <ButtonLink action={{ label: "See the Platform", href: "/platform" }} variant="secondary" className="border-white/30 text-white" />
        </div>
      </section>
    </div>
  );
}
