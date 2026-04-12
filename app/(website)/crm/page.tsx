import type { Metadata } from "next";

import { buildMetadata, pageSeo } from "@/lib/seo";

import { PortalPreview } from "../components/siteVisuals";
import { ButtonLink, SectionIntro, SurfaceCard } from "../components/sitePrimitives";

export const metadata: Metadata = buildMetadata(pageSeo["/crm"]);

export default function CrmPage() {
  return (
    <div className="space-y-24 pb-8 md:space-y-32">
      <section className="grid items-center gap-10 pt-6 lg:grid-cols-[1fr,1fr]">
        <div>
          <p className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.28em] text-[var(--color-brand)]">
            CRM
          </p>
          <h1 className="mt-6 max-w-4xl font-[var(--font-display)] text-5xl font-semibold tracking-[-0.06em] text-[var(--color-text)] sm:text-6xl">
            Turn your CRM into a system people trust.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--color-text-soft)]">
            Ingenium makes CRM action-ready with cleaner lifecycle logic, routing, attribution, and visibility across pipeline and delivery.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink action={{ label: "Book Demo", href: "/contact?intent=book-demo" }} />
            <ButtonLink action={{ label: "See the Platform", href: "/platform" }} variant="secondary" />
          </div>
        </div>
        <PortalPreview
          eyebrow="CRM command layer"
          title="Commercial records that keep their context"
          rows={[
            { label: "Lead routing", value: "Assigned in under 60 seconds", state: "SLA" },
            { label: "Lifecycle logic", value: "Stage rules reflect actual ownership", state: "Aligned" },
            { label: "Delivery handoff", value: "Won context retained after close", state: "Continuous" },
          ]}
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <SurfaceCard className="p-8">
          <SectionIntro
            eyebrow="Why CRM breaks"
            title="Most CRM drift is workflow drift."
            body="The system stops being trusted when owners, stages, attribution, and handoffs stop matching what the team is actually doing."
          />
          <div className="mt-8 grid gap-3">
            {[
              "Lead routing in under 60 seconds",
              "Ownership and stage logic that reflect reality",
              "Attribution tied back to revenue",
              "Follow-up visibility across the team",
              "Handoff into delivery without losing context",
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-[var(--color-line)] bg-white/72 px-4 py-4 text-sm text-[var(--color-text-soft)]">
                {item}
              </div>
            ))}
          </div>
        </SurfaceCard>
        <SurfaceCard dark className="p-8">
          <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.24em] text-cyan-300">
            What Ingenium fixes
          </p>
          <div className="mt-8 grid gap-3">
            {[
              "Routing and data quality stay governed instead of improvised.",
              "Marketing and sales look at the same commercial record.",
              "Leadership sees a forecast with operational context beneath it.",
              "Delivery inherits the account story instead of restarting discovery.",
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/6 px-4 py-4 text-sm text-white/75">
                {item}
              </div>
            ))}
          </div>
        </SurfaceCard>
      </section>

      <section>
        <SectionIntro
          eyebrow="Data flow"
          title="The record should move through the business without losing its history."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-4">
          {[
            "Website intent enters the record with source and page context.",
            "Routing rules assign the right owner and response expectation.",
            "AI and automation act on the same record, not a copy.",
            "Delivery status continues the same customer story after close.",
          ].map((item) => (
            <SurfaceCard key={item} className="panel-hover p-6 text-sm leading-7 text-[var(--color-text-soft)]">
              {item}
            </SurfaceCard>
          ))}
        </div>
      </section>

      <section className="graphite-panel rounded-[36px] px-8 py-12 text-center md:px-12">
        <h2 className="mx-auto max-w-4xl font-[var(--font-display)] text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">
          A CRM only becomes strategic when the team believes it reflects reality.
        </h2>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink action={{ label: "Book Demo", href: "/contact?intent=book-demo" }} className="bg-white text-[var(--color-text)]" />
          <ButtonLink action={{ label: "Get a Revenue Systems Teardown", href: "/contact?intent=revenue-systems-teardown" }} variant="secondary" className="border-white/18 bg-white/8 text-white" />
        </div>
      </section>
    </div>
  );
}
