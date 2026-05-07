import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, ArrowUpRight, BriefcaseBusiness, CheckCircle2, Clock } from "lucide-react";

import AnimatedMetric from "../components/AnimatedMetric";
import PageReviewMeta from "../components/PageReviewMeta";
import ScrollReveal from "../components/ScrollReveal";
import { projects } from "@/src/lib/projects";
import { SITE_URL, buildMetadata, pageSeo } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(pageSeo["/projects"]);

const sectionLabel = "type-meta-kicker text-[var(--color-brand)]";

function getWebsiteStatusMeta(status?: "live" | "mockup") {
  if (status === "live") {
    return {
      label: "Live Website",
      className: "bg-emerald-100 text-emerald-700",
    };
  }

  return {
    label: "Mockup Website",
    className: "bg-amber-100 text-amber-700",
  };
}

export default function ProjectsPage() {
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Ingenium Client Projects",
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: project.projectName,
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

      <section className="grid gap-6 lg:grid-cols-2">
        {projects.map((project, index) => {
          const websiteStatus = project.websiteIncluded ? getWebsiteStatusMeta(project.websiteStatus) : null;

          return (
          <ScrollReveal key={project.slug} delayMs={index * 45}>
            <Link
              href={`/projects/${project.slug}`}
              aria-label={`View ${project.projectName} project details`}
              className="group block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/70"
            >
              <article className="mineral-panel metric-card rounded-[28px] p-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="tech-pill type-section-kicker rounded-md px-2.5 py-1 text-[var(--color-brand)]">
                    {project.industry}
                  </span>
                  <span className="rounded-md bg-[var(--color-panel-low)] px-2.5 py-1 type-section-kicker text-[var(--color-text-muted)]">
                    {project.timeframe}
                  </span>
                  {websiteStatus ? (
                    <span
                      className={`rounded-md px-2.5 py-1 font-[var(--font-mono)] text-[10px] uppercase tracking-wider ${websiteStatus.className}`}
                    >
                      {websiteStatus.label}
                    </span>
                  ) : null}
                </div>

                <h2 className="mt-4 type-card-title text-[var(--color-text)]">
                  {project.projectName}
                </h2>
                <p className="mt-1 type-body-sm text-[var(--color-text-muted)]">
                  {project.clientName} - {project.clientSize}
                </p>
                <p className="mt-4 type-body-sm text-[var(--color-text-soft)]">{project.teaser}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.services.map((service) => (
                    <span
                      key={`${project.slug}-${service}`}
                      className="rounded-md bg-[var(--color-panel-low)] px-2.5 py-1 type-body-xs text-[var(--color-text-soft)]"
                    >
                      {service}
                    </span>
                  ))}
                </div>

                <div className="mt-5 space-y-2">
                  {project.insights.slice(0, 3).map((insight) => (
                    <div key={insight} className="flex items-start gap-2.5">
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-accent)]" />
                      <p className="type-body-sm text-[var(--color-text-soft)]">{insight}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 grid grid-cols-3 gap-3">
                  {project.outcomeMetrics.map((metric) => (
                    <div
                      key={`${project.slug}-${metric.label}`}
                      className="rounded-lg bg-[var(--color-panel-low)] p-3 text-center"
                    >
                  <AnimatedMetric as="p" className="metric-display text-[1.5rem] font-bold text-[var(--color-brand)]" value={metric.value} />
                  <p className="mt-1 type-body-xs text-[var(--color-text-muted)]">{metric.label}</p>
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

      <section className="graphite-panel relative overflow-hidden rounded-[36px] p-10 text-center md:p-14">
        <div className="pointer-events-none absolute inset-0 dot-grid opacity-35" />
        <div className="relative">
          <p className={sectionLabel}>Next Step</p>
          <h2 className="mx-auto mt-4 max-w-3xl type-card-title text-white">
            Want proof packaged this clearly for your own sales process?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/72">
            We scope the architecture, proof system, and conversion path before design drift or tool sprawl slows the build down.
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
            Typical implementation window: 6-10 weeks | Strategy, technical, and security review paths available
          </p>
        </div>
      </section>
    </div>
  );
}
