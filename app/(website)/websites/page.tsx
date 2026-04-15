import type { Metadata } from "next";

import { buildMetadata, pageSeo } from "@/lib/seo";

import { PortalPreview } from "../components/siteVisuals";
import { ButtonLink, SectionIntro, SurfaceCard } from "../components/sitePrimitives";

export const metadata: Metadata = buildMetadata(pageSeo["/websites"]);

export default function WebsitesPage() {
  return (
    <div className="space-y-20 pb-8 md:space-y-28">
      <section className="grid items-center gap-10 pt-4 lg:grid-cols-[0.92fr,1.08fr]">
        <div>
          <p className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.28em] text-[var(--color-brand)]">
            Websites
          </p>
          <h1 className="mt-6 max-w-4xl font-[var(--font-display)] text-5xl font-semibold tracking-[-0.06em] text-[var(--color-text)] sm:text-6xl">
            Build conversion architecture, not a brochure.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--color-text-soft)]">
            For service businesses with unclear buyer journeys, Ingenium replaces page sprawl and generic contact forms with one website process so high-intent leads arrive with enough context to route, reply, and qualify quickly.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink action={{ label: "Get a Revenue Systems Teardown", href: "/revenue-systems-teardown" }} />
            <ButtonLink action={{ label: "Book Demo", href: "/demo" }} variant="secondary" />
          </div>
        </div>
        <PortalPreview
          eyebrow="Conversion architecture"
          title="The site should explain the offer, surface proof, and route the lead cleanly"
          rows={[
            { label: "Offer clarity", value: "One buyer problem and one next step per page", state: "Defined" },
            { label: "Proof", value: "Named examples and trust cues visible before contact", state: "Live" },
            { label: "Routing", value: "Lead reaches the CRM with service and intent context", state: "Tracked" },
          ]}
        />
      </section>

      <section>
        <SectionIntro
          eyebrow="What changes"
          title="A website page should do four jobs before anyone fills a form."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            "Define the pain in buyer-plain language.",
            "Show the operating change, not just the feature label.",
            "Use proof blocks that reduce risk before the CTA.",
            "Capture enough context for the CRM handoff to be useful.",
          ].map((item) => (
            <SurfaceCard key={item} className="panel-hover p-6 text-sm leading-7 text-[var(--color-text-soft)]">
              {item}
            </SurfaceCard>
          ))}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.08fr,0.92fr]">
        <SurfaceCard className="p-8">
          <SectionIntro
            eyebrow="Page system"
            title="Each page should have one ICP, one pain, one operational change, one proof block, and one CTA."
          />
          <div className="mt-8 grid gap-4">
            {[
              ["Hero", "State the buyer problem and the operational outcome first."],
              ["Proof", "Move screenshots, examples, and implementation evidence above lower-value overview content."],
              ["Routing", "Tie forms, CTA paths, and CRM ownership to the specific page intent."],
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
            The buyer outcome
          </p>
          <div className="mt-8 grid gap-3">
            {[
              "Service buyers understand the offer faster.",
              "Sales gets cleaner enquiry context from the first touch.",
              "Reporting becomes more useful because page intent is clearer.",
              "The site feels like operating infrastructure instead of a polished template.",
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/6 px-4 py-4 text-sm text-white/78">
                {item}
              </div>
            ))}
          </div>
        </SurfaceCard>
      </section>

      <section className="graphite-panel rounded-[36px] px-8 py-12 text-center md:px-12">
        <h2 className="mx-auto max-w-4xl font-[var(--font-display)] text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">
          A website earns trust when it clarifies the buying path before asking for contact.
        </h2>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink action={{ label: "Revenue Systems Teardown", href: "/revenue-systems-teardown" }} className="bg-white text-[var(--color-text)]" />
          <ButtonLink action={{ label: "Book Demo", href: "/demo" }} variant="secondary" className="border-white/18 bg-white/8 text-white" />
        </div>
      </section>
    </div>
  );
}
