import type { Metadata } from "next";

import { buildMetadata, pageSeo } from "@/lib/seo";

import { PortalPreview } from "../components/siteVisuals";
import { ButtonLink, SectionIntro, SurfaceCard } from "../components/sitePrimitives";

export const metadata: Metadata = buildMetadata(pageSeo["/websites"]);

export default function WebsitesPage() {
  return (
    <div className="space-y-20 pb-8 md:space-y-28">
      <section className="grid items-center gap-10 pt-4 lg:grid-cols-[0.94fr,1.06fr]">
        <div>
          <p className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.28em] text-[var(--color-brand)]">
            Websites
          </p>
          <h1 className="mt-6 max-w-4xl font-[var(--font-display)] text-5xl font-semibold tracking-[-0.06em] text-[var(--color-text)] sm:text-6xl">
            Your website should create pipeline, not just traffic.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--color-text-soft)]">
            Ingenium turns your website into a working part of the revenue system, with better lead capture, cleaner routing, and clearer proof for buyers.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink action={{ label: "Get a Revenue Systems Teardown", href: "/contact?intent=revenue-systems-teardown" }} />
            <ButtonLink action={{ label: "See Platform", href: "/platform" }} variant="secondary" />
          </div>
        </div>
        <PortalPreview
          eyebrow="Website flow"
          title="A website lead should arrive with enough context to act on"
          rows={[
            { label: "Lead captured", value: "Form, source, and service interest recorded", state: "Live" },
            { label: "CRM updated", value: "Owner and next step assigned", state: "Active" },
            { label: "Follow-up started", value: "Automation and alerts running", state: "On" },
          ]}
        />
      </section>

      <section>
        <SectionIntro
          eyebrow="What a modern website should do"
          title="Turn the site into part of the sales process."
          body="A strong website does more than look polished. It helps the right buyers convert and gives the team enough context to move fast."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {[
            "Clear service pages for high-value work",
            "Forms that capture useful context",
            "Submissions connected directly to the CRM",
            "Tracking that supports attribution",
            "Proof blocks that help buyers say yes",
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
            title="Most sites stop at the form. Ingenium carries the lead forward."
          />
          <div className="mt-8 grid gap-4">
            {[
              ["Before", "The form submits, then the team has to piece together what the buyer wanted and where they came from."],
              ["After", "The lead enters the CRM with source, service path, urgency, and a clearer next action attached."],
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
            Why this matters
          </p>
          <div className="mt-8 grid gap-3">
            {[
              "Sales replies faster because the lead is easier to understand.",
              "Marketing sees which pages are producing real pipeline, not just visits.",
              "Operations gets cleaner handoff into the rest of the workflow.",
              "Leadership can connect website performance to revenue outcomes.",
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/6 px-4 py-4 text-sm text-white/78">
                {item}
              </div>
            ))}
          </div>
        </SurfaceCard>
      </section>

      <section>
        <SectionIntro
          eyebrow="Early outcomes"
          title="The first month should make lead flow easier to trust."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            "Clearer buyer paths for your main services",
            "Better form quality and faster routing into the CRM",
            "Cleaner reporting on source, conversion, and response speed",
          ].map((item) => (
            <SurfaceCard key={item} className="panel-hover p-6 text-sm leading-7 text-[var(--color-text-soft)]">
              {item}
            </SurfaceCard>
          ))}
        </div>
      </section>

      <section className="graphite-panel rounded-[36px] px-8 py-12 text-center md:px-12">
        <h2 className="mx-auto max-w-4xl font-[var(--font-display)] text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">
          Your website should help the team act before anyone opens a second tool.
        </h2>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink action={{ label: "Book Demo", href: "/contact?intent=book-demo" }} className="bg-white text-[var(--color-text)]" />
          <ButtonLink action={{ label: "Get a Revenue Systems Teardown", href: "/contact?intent=revenue-systems-teardown" }} variant="secondary" className="border-white/18 bg-white/8 text-white" />
        </div>
      </section>
    </div>
  );
}
