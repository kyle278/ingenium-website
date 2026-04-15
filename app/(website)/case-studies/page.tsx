import type { Metadata } from "next";
import Link from "next/link";

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
            Real client work, explained in plain language.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--color-text-soft)]">
            Each case study shows who it was for, what was getting in the way, what changed, and what a customer would notice.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink action={{ label: "Book Demo", href: "/demo" }} />
            <ButtonLink
              action={{ label: "Revenue Systems Teardown", href: "/revenue-systems-teardown" }}
              variant="secondary"
            />
          </div>
        </div>
      </section>

      <section>
        <SectionIntro
          eyebrow="Client Proof"
          title="Who it was for, what was blocking progress, and what improved."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {caseStudies.map((study) => (
            <Link
              key={study.id}
              href={`/case-studies/${study.id}`}
              aria-label={`View ${study.projectName} case study`}
              className="group block rounded-[28px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)]/45"
            >
              <SurfaceCard className="flex h-full flex-col p-5 transition group-hover:-translate-y-0.5">
                <div className="flex h-full flex-col gap-4">
                  <div>
                    <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.24em] text-[var(--color-brand)]">
                      {study.client} - {study.industry}
                    </p>
                    <h2 className="mt-2 font-[var(--font-display)] text-xl font-semibold tracking-[-0.04em] text-[var(--color-text)]">
                      {study.projectName}
                    </h2>
                    <p className="mt-3 text-sm leading-6 text-[var(--color-text-soft)]">{study.challenge}</p>
                  </div>

                  <div className="rounded-[22px] border border-black/6 bg-white/72 p-4">
                    <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
                      What changed
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[var(--color-text-soft)]">{study.intervention}</p>
                  </div>

                  <div className="mt-auto rounded-[22px] border border-black/6 bg-white/60 p-4">
                    <div className="flex flex-wrap gap-1.5">
                      {study.deliveredAssets.slice(0, 3).map((asset) => (
                        <span
                          key={asset}
                          className="tech-pill inline-flex rounded-full px-2.5 py-1 text-[11px] leading-5 text-[var(--color-text-soft)]"
                        >
                          {asset}
                        </span>
                      ))}
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {study.buildMetrics.map((metric) => (
                        <span
                          key={metric.label}
                          className="tech-pill inline-flex rounded-full px-2.5 py-1 font-[var(--font-mono)] text-[10px] uppercase tracking-[0.18em] text-[var(--color-text-soft)]"
                        >
                          {metric.label}: {metric.value}
                        </span>
                      ))}
                    </div>
                    <p className="mt-4 text-sm font-medium text-[var(--color-brand)]">
                      View full case study
                    </p>
                  </div>
                </div>
              </SurfaceCard>
            </Link>
          ))}
        </div>
      </section>

      <section className="graphite-panel rounded-[36px] px-8 py-12 text-center md:px-12">
        <h2 className="mx-auto max-w-4xl font-[var(--font-display)] text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">
          Buyers trust proof faster when they can see the issue, the fix, and the outcome.
        </h2>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink action={{ label: "Book Demo", href: "/demo" }} className="bg-white text-[var(--color-text)]" />
          <ButtonLink
            action={{ label: "Technical Review", href: "/technical-review" }}
            variant="secondary"
            className="border-white/18 bg-white/8 text-white"
          />
        </div>
      </section>
    </div>
  );
}
