import type { Metadata } from "next";

import { buildMetadata, pageSeo } from "@/lib/seo";

import { PortalPreview } from "../components/siteVisuals";
import { ButtonLink, SectionIntro, SurfaceCard } from "../components/sitePrimitives";

export const metadata: Metadata = buildMetadata(pageSeo["/websites"]);

export default function WebsitesPage() {
  return (
    <div className="space-y-24 pb-8 md:space-y-32">
      <section className="grid items-center gap-10 pt-6 lg:grid-cols-[1fr,1fr]">
        <div>
          <p className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.28em] text-[var(--color-brand)]">
            Websites
          </p>
          <h1 className="mt-6 max-w-4xl font-[var(--font-display)] text-5xl font-semibold tracking-[-0.06em] text-[var(--color-text)] sm:text-6xl">
            Your website should work like part of the system.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--color-text-soft)]">
            Ingenium turns websites into active revenue infrastructure with high-intent journeys, form capture, routing, and proof-driven conversion.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink action={{ label: "Book Demo", href: "/contact?intent=book-demo" }} />
            <ButtonLink action={{ label: "See the Platform", href: "/platform" }} variant="secondary" />
          </div>
        </div>
        <PortalPreview
          eyebrow="Acquisition engine"
          title="Website intent flowing directly into the operating layer"
          rows={[
            { label: "Progressive form path", value: "Buyer context captured before submit", state: "Live" },
            { label: "Submission routing", value: "CRM owner and SLA assigned", state: "Connected" },
            { label: "Proof-led page system", value: "Named outcomes attached to service paths", state: "Visible" },
          ]}
        />
      </section>

      <section>
        <SectionIntro
          eyebrow="What a modern acquisition engine does"
          title="Turn your public site into accountable acquisition infrastructure."
          body="The website should create qualified intent, preserve context, and make the next action obvious."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {[
            "High-intent page architecture",
            "Progressive forms",
            "CRM-connected submissions",
            "Attribution-ready tracking",
            "Proof-led conversion paths",
          ].map((item) => (
            <SurfaceCard key={item} className="panel-hover p-6 text-sm leading-7 text-[var(--color-text-soft)]">
              {item}
            </SurfaceCard>
          ))}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <SurfaceCard className="p-8">
          <SectionIntro
            eyebrow="Before and after"
            title="Most websites stop at form capture. Ingenium carries the signal forward."
          />
          <div className="mt-8 grid gap-4">
            {[
              ["Before", "Pages convert in isolation. Buyer context is lost after the click."],
              ["After", "Buyer intent, source, service interest, and urgency enter the CRM as one record."],
            ].map(([title, body]) => (
              <div key={title} className="rounded-2xl border border-[var(--color-line)] bg-white/72 p-5">
                <p className="font-[var(--font-display)] text-xl font-semibold tracking-[-0.03em] text-[var(--color-text)]">
                  {title}
                </p>
                <p className="mt-3 text-sm leading-7 text-[var(--color-text-soft)]">{body}</p>
              </div>
            ))}
          </div>
        </SurfaceCard>
        <SurfaceCard dark className="p-8">
          <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.24em] text-cyan-300">
            CRM and automation continuity
          </p>
          <div className="mt-8 grid gap-3">
            {[
              "Forms route directly into governed CRM logic.",
              "Attribution stays attached to the commercial record.",
              "Automation starts from real intent instead of a generic list entry.",
              "Teams act with the page journey already visible.",
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
          eyebrow="30-day outcomes"
          title="The first month should clarify conversion, not create more ambiguity."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            "Clearer buyer pathways for high-value services",
            "Portal-linked form capture and routing still intact",
            "Early reporting on source, conversion path, and response speed",
          ].map((item) => (
            <SurfaceCard key={item} className="panel-hover p-6 text-sm leading-7 text-[var(--color-text-soft)]">
              {item}
            </SurfaceCard>
          ))}
        </div>
      </section>

      <section className="graphite-panel rounded-[36px] px-8 py-12 text-center md:px-12">
        <h2 className="mx-auto max-w-4xl font-[var(--font-display)] text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">
          Your site should qualify, route, and inform the next action before a rep ever opens the record.
        </h2>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink action={{ label: "Book Demo", href: "/contact?intent=book-demo" }} className="bg-white text-[var(--color-text)]" />
          <ButtonLink action={{ label: "Get a Revenue Systems Teardown", href: "/contact?intent=revenue-systems-teardown" }} variant="secondary" className="border-white/18 bg-white/8 text-white" />
        </div>
      </section>
    </div>
  );
}
