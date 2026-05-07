import type { Metadata } from "next";
import Link from "next/link";

import { buildMetadata, pageSeo } from "@/lib/seo";
import { caseStudies } from "@/src/lib/caseStudies";
import { getCanonicalProofPathForCaseStudy } from "@/src/lib/proofStories";

import AnimatedMetric from "../components/AnimatedMetric";
import ScrollReveal from "../components/ScrollReveal";
import { ButtonLink, SectionIntro, SurfaceCard } from "../components/sitePrimitives";

export const metadata: Metadata = buildMetadata(pageSeo["/case-studies"]);

export default function CaseStudiesPage() {
  return (
    <div className="space-y-20 pb-8 md:space-y-28">
      <section className="pt-4">
        <ScrollReveal className="max-w-4xl">
          <p className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.28em] text-[var(--color-brand)]">
            Proof
          </p>
          <h1 className="mt-6 max-w-4xl font-[var(--font-display)] text-5xl font-semibold tracking-[-0.06em] text-[var(--color-text)] sm:text-6xl">
            Proof that the operating model works.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--color-text-soft)]">
            Case studies for service businesses that changed how leads, teams, and delivery connect.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink action={{ label: "Book Demo", href: "/demo" }} />
          <ButtonLink
              action={{ label: "View the Platform", href: "/platform" }}
              variant="secondary"
            />
          </div>
        </ScrollReveal>
      </section>

      <section>
        <ScrollReveal>
          <SectionIntro
            eyebrow="Client Proof"
            title="Operational depth, workflow change, and visible proof."
            body="Three proof blocks before the buyer has to trust the concept: named work, concrete workflow change, and clearer outcomes."
          />
        </ScrollReveal>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {caseStudies.map((study, index) => (
            <ScrollReveal key={study.id} delayMs={index * 45} blur>
              <Link
                href={getCanonicalProofPathForCaseStudy(study.id) ?? "/projects"}
                aria-label={`View ${study.projectName} project record`}
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
                      {study.buildMetrics.map((metric, metricIndex) => (
                        <span
                          key={metric.label}
                          className="tech-pill inline-flex rounded-full px-2.5 py-1 font-[var(--font-mono)] text-[10px] uppercase tracking-[0.18em] text-[var(--color-text-soft)]"
                        >
                          {metric.label}:{" "}
                          <AnimatedMetric value={metric.value} delayMs={metricIndex * 70} className="metric-display" />
                        </span>
                      ))}
                    </div>
                    <p className="mt-4 text-sm font-medium text-[var(--color-brand)]">
                      View canonical project record
                    </p>
                  </div>
                </div>
                </SurfaceCard>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <ScrollReveal className="graphite-panel rounded-[36px] px-8 py-12 text-center md:px-12" blur>
        <h2 className="mx-auto max-w-4xl font-[var(--font-display)] text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">
          Buyers trust proof faster when they can see the issue, the fix, and the outcome.
        </h2>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink action={{ label: "Book Demo", href: "/demo" }} className="bg-white text-[var(--color-text)]" />
          <ButtonLink
            action={{ label: "Contact Us", href: "/contact" }}
            variant="secondary"
            className="border-white/18 bg-white/8 text-white"
          />
        </div>
      </ScrollReveal>
    </div>
  );
}
