import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  CheckCircle2,
  Clock,
} from "lucide-react";

import AnimatedMetric from "../components/AnimatedMetric";
import PageReviewMeta from "../components/PageReviewMeta";
import ScrollReveal from "../components/ScrollReveal";
import { getPortalProjectPresentation, listPortalProjects } from "@/lib/portalIntegration/projects";
import { SITE_URL, buildMetadata, pageSeo } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(pageSeo["/projects"]);
export const revalidate = 300;

const sectionLabel = "type-meta-kicker text-[var(--color-brand)]";

function placeholderClass(missing: boolean, defaultClass: string) {
  return missing
    ? "border border-dashed border-amber-300 bg-amber-50 text-amber-700"
    : defaultClass;
}

export default async function ProjectsPage() {
  const projects = await listPortalProjects();

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Ingenium Client Projects",
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: getPortalProjectPresentation(project).projectName.text,
      url: `${SITE_URL}/projects/${project.slug}`,
    })),
  };

  return (
    <div className="space-y-24 md:space-y-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <section className="pt-8 text-center">
        <p className={sectionLabel}>Projects</p>
        <h1 className="mx-auto mt-6 max-w-4xl type-page-title text-[var(--color-text)]">
          Real client delivery work, organised around what changed for the buyer journey.
        </h1>
        <p className="mx-auto mt-5 max-w-[65ch] type-body-lead text-[var(--color-text-soft)]">
          Review named client projects across service websites, project libraries, booking paths,
          quote flows, and proof systems built to make buying easier.
        </p>
        <PageReviewMeta />
      </section>

      {projects.length === 0 ? (
        <section className="rounded-[32px] border border-dashed border-black/10 bg-white/70 p-10 text-center">
          <p className="type-card-title text-[var(--color-text)]">No published projects yet.</p>
          <p className="mx-auto mt-4 max-w-[52ch] type-body-base text-[var(--color-text-soft)]">
            This website is now reading from the portal project feed. Projects will appear here
            once they are marked for website display and given website fields in the portal.
          </p>
        </section>
      ) : (
        <section className="grid gap-6 lg:grid-cols-2">
          {projects.map((project, index) => {
            const presentation = getPortalProjectPresentation(project);

            return (
              <ScrollReveal key={project.id} delayMs={index * 45}>
                <Link
                  href={`/projects/${project.slug}`}
                  aria-label={`View ${presentation.projectName.text} project details`}
                  className="group block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/70"
                >
                  <article className="mineral-panel metric-card rounded-[28px] p-6">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`tech-pill type-section-kicker rounded-md px-2.5 py-1 ${placeholderClass(
                          presentation.industry.missing,
                          "text-[var(--color-brand)]"
                        )}`}
                      >
                        {presentation.industry.text}
                      </span>
                      <span
                        className={`rounded-md px-2.5 py-1 type-section-kicker ${placeholderClass(
                          presentation.timeframe.missing,
                          "bg-[var(--color-panel-low)] text-[var(--color-text-muted)]"
                        )}`}
                      >
                        {presentation.timeframe.text}
                      </span>
                      <span
                        className={`rounded-md px-2.5 py-1 font-[var(--font-mono)] text-[10px] uppercase tracking-wider ${presentation.websiteStatus.className}`}
                      >
                        {presentation.websiteStatus.label}
                      </span>
                    </div>

                    <h2 className="mt-4 type-card-title text-[var(--color-text)]">
                      {presentation.projectName.text}
                    </h2>
                    <p
                      className={`mt-1 type-body-sm ${
                        presentation.clientName.missing || presentation.clientSize.missing
                          ? "text-amber-700"
                          : "text-[var(--color-text-muted)]"
                      }`}
                    >
                      {presentation.clientName.text} - {presentation.clientSize.text}
                    </p>
                    <p
                      className={`mt-4 type-body-sm ${
                        presentation.teaser.missing
                          ? "text-amber-700"
                          : "text-[var(--color-text-soft)]"
                      }`}
                    >
                      {presentation.teaser.text}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {presentation.services.map((service) => (
                        <span
                          key={service.key}
                          className={`rounded-md px-2.5 py-1 type-body-xs ${placeholderClass(
                            service.missing,
                            "bg-[var(--color-panel-low)] text-[var(--color-text-soft)]"
                          )}`}
                        >
                          {service.text}
                        </span>
                      ))}
                    </div>

                    <div className="mt-5 space-y-2">
                      {presentation.insights.slice(0, 3).map((insight) => (
                        <div key={insight.key} className="flex items-start gap-2.5">
                          <CheckCircle2
                            className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${
                              insight.missing ? "text-amber-500" : "text-[var(--color-accent)]"
                            }`}
                          />
                          <p
                            className={`type-body-sm ${
                              insight.missing ? "text-amber-700" : "text-[var(--color-text-soft)]"
                            }`}
                          >
                            {insight.text}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-5 grid grid-cols-3 gap-3">
                      {presentation.outcomeMetrics.map((metric) => (
                        <div
                          key={metric.key}
                          className={`rounded-lg p-3 text-center ${
                            metric.missing
                              ? "border border-dashed border-amber-300 bg-amber-50"
                              : "bg-[var(--color-panel-low)]"
                          }`}
                        >
                          <AnimatedMetric
                            as="p"
                            className={`metric-display text-[1.5rem] font-bold ${
                              metric.value.missing
                                ? "text-amber-700"
                                : "text-[var(--color-brand)]"
                            }`}
                            value={metric.value.text}
                          />
                          <p
                            className={`mt-1 type-body-xs ${
                              metric.label.missing
                                ? "text-amber-700"
                                : "text-[var(--color-text-muted)]"
                            }`}
                          >
                            {metric.label.text}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 inline-flex items-center gap-2 type-action text-[var(--color-brand)] transition group-hover:text-[var(--color-brand-strong)]">
                      View full project breakdown
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </article>
                </Link>
              </ScrollReveal>
            );
          })}
        </section>
      )}

      <section className="graphite-panel relative overflow-hidden rounded-[36px] p-10 text-center md:p-14">
        <div className="pointer-events-none absolute inset-0 dot-grid opacity-35" />
        <div className="relative">
          <p className={sectionLabel}>Next Step</p>
          <h2 className="mx-auto mt-4 max-w-3xl type-card-title text-white">
            Want proof packaged this clearly for your own sales process?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/72">
            We scope the architecture, proof system, and conversion path before design drift or
            tool sprawl slows the build down.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/revenue-systems-teardown"
              className="cta-lift inline-flex items-center gap-2 rounded-md bg-white px-6 py-3 type-action text-[var(--color-text)]"
            >
              Request a Revenue Systems Teardown
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              href="/demo"
              className="cta-lift inline-flex items-center gap-2 rounded-md bg-white/10 px-6 py-3 type-action text-white"
            >
              Book Demo
              <BriefcaseBusiness className="h-4 w-4" />
            </Link>
          </div>
          <p className="mt-5 flex items-center justify-center gap-2 type-body-xs text-white/55">
            <Clock className="h-3.5 w-3.5" />
            Typical implementation window: 6-10 weeks | Strategy, technical, and security review
            paths available
          </p>
        </div>
      </section>
    </div>
  );
}
