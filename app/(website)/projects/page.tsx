import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, ArrowUpRight, BriefcaseBusiness, CheckCircle2, Clock } from "lucide-react";

import AnimatedMetric from "../components/AnimatedMetric";
import ScrollReveal from "../components/ScrollReveal";
import { projects } from "@/src/lib/projects";

export const metadata: Metadata = {
  title: "Client Projects and Delivery Outcomes | Ingenium",
  description:
    "Explore recent Ingenium client projects across website rebuilds, custom CRM, AI agents, and automation delivery with measurable outcomes.",
  openGraph: {
    title: "Client Projects and Delivery Outcomes | Ingenium",
    description:
      "Recent client projects with measurable outcomes across website, CRM, AI agents, and automation.",
    url: "/projects",
  },
  alternates: { canonical: "/projects" },
};

const sectionLabel = "font-(--font-mono) text-xs uppercase tracking-widest text-emerald-400";

export default function ProjectsPage() {
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Ingenium Client Projects",
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: project.projectName,
      url: `https://ingeniumconsulting.net/projects/${project.slug}`,
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
        <h1 className="mx-auto mt-6 max-w-4xl font-(--font-display) text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Real delivery projects with measurable outcomes.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-400">
          Each project combines service delivery and operations design. Review what was delivered,
          what changed, and where results came from.
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        {projects.map((project, index) => (
          <ScrollReveal key={project.slug} delayMs={index * 45}>
            <Link
              href={`/projects/${project.slug}`}
              aria-label={`View ${project.projectName} project details`}
              className="group block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/70"
            >
              <article className="metric-card rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-md border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-1 font-(--font-mono) text-[10px] uppercase tracking-wider text-emerald-400">
                    {project.industry}
                  </span>
                  <span className="rounded-md border border-slate-800 bg-slate-900 px-2.5 py-1 font-(--font-mono) text-[10px] uppercase tracking-wider text-slate-500">
                    {project.timeframe}
                  </span>
                </div>

                <h2 className="mt-4 font-(--font-display) text-2xl font-bold text-white">
                  {project.projectName}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  {project.clientName} - {project.clientSize}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-slate-400">{project.teaser}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.services.map((service) => (
                    <span
                      key={`${project.slug}-${service}`}
                      className="rounded-md border border-slate-800 bg-slate-900/70 px-2.5 py-1 text-xs text-slate-400"
                    >
                      {service}
                    </span>
                  ))}
                </div>

                <div className="mt-5 space-y-2">
                  {project.insights.slice(0, 3).map((insight) => (
                    <div key={insight} className="flex items-start gap-2.5">
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                      <p className="text-sm text-slate-300">{insight}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 grid grid-cols-3 gap-3">
                  {project.outcomeMetrics.map((metric) => (
                    <div
                      key={`${project.slug}-${metric.label}`}
                      className="rounded-lg border border-slate-800 bg-slate-900/70 p-3 text-center"
                    >
                      <AnimatedMetric
                        as="p"
                        className="metric-display text-xl font-bold text-emerald-400"
                        value={metric.value}
                      />
                      <p className="mt-1 text-[11px] leading-tight text-slate-500">{metric.label}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-emerald-400 transition group-hover:text-emerald-300">
                  View full project breakdown
                  <ArrowRight className="h-4 w-4" />
                </div>
              </article>
            </Link>
          </ScrollReveal>
        ))}
      </section>

      <section className="relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-900/40 to-slate-900 p-10 text-center md:p-14">
        <div className="pointer-events-none absolute inset-0 dot-grid opacity-35" />
        <div className="relative">
          <p className={sectionLabel}>Next Project</p>
          <h2 className="mx-auto mt-4 max-w-3xl font-(--font-display) text-2xl font-bold text-white sm:text-3xl">
            Want your project outcomes in this library?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-400">
            We map delivery scope, implementation sequence, and measurable targets before we
            start.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="cta-lift inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/25 hover:bg-emerald-500"
            >
              Book a Strategy Call
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              href="/case-studies"
              className="cta-lift inline-flex items-center gap-2 rounded-lg border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-300 hover:border-slate-600 hover:text-white"
            >
              Review Case Studies
              <BriefcaseBusiness className="h-4 w-4" />
            </Link>
          </div>
          <p className="mt-5 flex items-center justify-center gap-2 font-(--font-mono) text-xs text-slate-600">
            <Clock className="h-3.5 w-3.5" />
            Typical implementation window: 6-10 weeks
          </p>
        </div>
      </section>
    </div>
  );
}
