import type { Metadata } from "next";

import { buildMetadata, pageSeo } from "@/lib/seo";
import { caseStudies } from "@/src/lib/caseStudies";

import { ButtonLink, SectionIntro, SurfaceCard } from "../components/sitePrimitives";

export const metadata: Metadata = buildMetadata(pageSeo["/case-studies"]);

export default function CaseStudiesPage() {
  return (
    <div className="space-y-20 pb-8 md:space-y-28">
      <section className="pt-4">
        <div className="max-w-4xl">
          <p className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.28em] text-[var(--color-brand)]">
            Case Studies
          </p>
          <h1 className="mt-6 max-w-4xl font-[var(--font-display)] text-5xl font-semibold tracking-[-0.06em] text-[var(--color-text)] sm:text-6xl">
            Proof that the system works in the real world.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--color-text-soft)]">
            Show the work, the change, and the result clearly. Buyers should be able to understand what improved and why it mattered.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink action={{ label: "Book Demo", href: "/contact?intent=book-demo" }} />
            <ButtonLink action={{ label: "Get a Revenue Systems Teardown", href: "/contact?intent=revenue-systems-teardown" }} variant="secondary" />
          </div>
        </div>
      </section>

      <section>
        <SectionIntro
          eyebrow="What each case proves"
          title="Named work, clear change, and visible business value."
        />
        <div className="mt-10 space-y-6">
          {caseStudies.map((study) => (
            <SurfaceCard key={study.id} className="p-8">
              <div className="grid gap-6 xl:grid-cols-[0.9fr,1.1fr]">
                <div>
                  <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.24em] text-[var(--color-brand)]">
                    {study.client}
                  </p>
                  <h2 className="mt-4 font-[var(--font-display)] text-3xl font-semibold tracking-[-0.04em] text-[var(--color-text)]">
                    {study.projectName}
                  </h2>
                  <div className="mt-5 grid gap-3 text-sm leading-7 text-[var(--color-text-soft)]">
                    <p><strong className="text-[var(--color-text)]">Problem:</strong> {study.challenge}</p>
                    <p><strong className="text-[var(--color-text)]">What changed:</strong> {study.intervention}</p>
                    <p><strong className="text-[var(--color-text)]">What Ingenium improved:</strong> Clearer buyer journey, better workflow continuity, and stronger commercial visibility.</p>
                    <p><strong className="text-[var(--color-text)]">Modules involved:</strong> Website, CRM structure, automation flow, and reporting visibility.</p>
                  </div>
                </div>
                <div className="grid gap-4">
                  <div className="rounded-[28px] border border-[var(--color-line)] bg-white/72 p-5">
                    <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
                      Delivered
                    </p>
                    <div className="mt-4 grid gap-3">
                      {study.deliveredAssets.map((asset) => (
                        <div key={asset} className="rounded-2xl border border-[var(--color-line)] bg-white/72 px-4 py-4 text-sm text-[var(--color-text-soft)]">
                          {asset}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-[28px] border border-[var(--color-line)] bg-white/72 p-5">
                    <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
                      Evidence
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {study.buildMetrics.map((metric) => (
                        <span key={metric.label} className="tech-pill inline-flex rounded-full px-3 py-1 font-[var(--font-mono)] text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-soft)]">
                          {metric.label}: {metric.value}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </SurfaceCard>
          ))}
        </div>
      </section>

      <section className="graphite-panel rounded-[36px] px-8 py-12 text-center md:px-12">
        <h2 className="mx-auto max-w-4xl font-[var(--font-display)] text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">
          Proof lands better when buyers can see the workflow change, not just a headline claim.
        </h2>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink action={{ label: "Book Demo", href: "/contact?intent=book-demo" }} className="bg-white text-[var(--color-text)]" />
          <ButtonLink action={{ label: "Technical Review", href: "/contact?intent=technical-review" }} variant="secondary" className="border-white/18 bg-white/8 text-white" />
        </div>
      </section>
    </div>
  );
}
