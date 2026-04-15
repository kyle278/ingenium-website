import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Layers,
  Monitor,
  Server,
} from "lucide-react";

import AnimatedMetric from "../../components/AnimatedMetric";
import ScrollReveal from "../../components/ScrollReveal";
import { buildMetadata, keywordClusters } from "@/lib/seo";
import { getProjectBySlug, projects } from "@/src/lib/projects";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

function WebsitePreview({
  title,
  subtitle,
  navItems,
  trustLine,
}: {
  title: string;
  subtitle: string;
  navItems: string[];
  trustLine: string;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-950/70">
      <div className="flex items-center gap-1.5 border-b border-slate-800 px-4 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-rose-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
        <span className="ml-3 font-(--font-mono) text-[10px] text-slate-600">homepage-preview</span>
      </div>
      <div className="p-5">
        <div className="flex flex-wrap gap-2">
          {navItems.map((item) => (
            <span
              key={item}
              className="rounded-md border border-slate-800 bg-slate-900/80 px-2 py-1 text-[10px] text-slate-500"
            >
              {item}
            </span>
          ))}
        </div>
        <h3 className="mt-5 max-w-xl font-(--font-display) text-2xl font-bold text-white">{title}</h3>
        <p className="mt-2 max-w-xl text-sm text-slate-400">{subtitle}</p>
        <div className="mt-5 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3 py-2">
          <p className="text-xs text-emerald-300">{trustLine}</p>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          <div className="rounded-lg border border-slate-800 bg-slate-900/70 p-3">
            <p className="font-(--font-mono) text-[10px] text-slate-600">Hero + Value Prop</p>
          </div>
          <div className="rounded-lg border border-slate-800 bg-slate-900/70 p-3">
            <p className="font-(--font-mono) text-[10px] text-slate-600">Proof + Insights</p>
          </div>
          <div className="rounded-lg border border-slate-800 bg-slate-900/70 p-3">
            <p className="font-(--font-mono) text-[10px] text-slate-600">CTA + Form Pathway</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found | Ingenium",
      description: "The requested project page could not be found.",
      alternates: { canonical: "/projects" },
    };
  }

  return buildMetadata({
    title: `${project.projectName} Project | Ingenium`,
    description: project.summary,
    path: `/projects/${project.slug}`,
    keywords: [
      ...keywordClusters.proof,
      ...project.services.map((service) => service.toLowerCase()),
      project.industry.toLowerCase(),
      project.clientName.toLowerCase(),
    ],
    pageType: "WebPage",
  });
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.projectName,
    description: project.summary,
    about: project.services,
    creator: {
      "@type": "Organization",
      name: "Ingenium Digital Consulting",
    },
    url: `https://ingeniumconsulting.net/projects/${project.slug}`,
  };

  return (
    <div className="space-y-24 md:space-y-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
      />

      <section className="pt-8">
        <Link
          href="/projects"
          className="cta-lift inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Projects
        </Link>

        <div className="mt-6 grid gap-10 lg:grid-cols-[1.2fr,0.8fr]">
          <div>
            <p className="font-(--font-mono) text-xs uppercase tracking-widest text-emerald-400">
              Project Detail
            </p>
            <h1 className="mt-5 max-w-3xl font-(--font-display) text-4xl font-bold tracking-tight text-white sm:text-5xl">
              {project.projectName}
            </h1>
            <p className="mt-3 text-sm text-slate-500">
              {project.clientName} - {project.industry} - {project.clientSize}
            </p>
            <p className="mt-6 max-w-2xl text-lg text-slate-400">{project.summary}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.services.map((service) => (
                <span
                  key={service}
                  className="rounded-md border border-slate-800 bg-slate-900/80 px-2.5 py-1 text-xs text-slate-400"
                >
                  {service}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/revenue-systems-teardown"
                className="cta-lift inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/25 hover:bg-emerald-500"
              >
                Request a Similar Teardown
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                href="/technical-review"
                className="cta-lift inline-flex items-center gap-2 rounded-lg border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-300 transition hover:border-slate-600 hover:text-white"
              >
                Request Technical Review
              </Link>
            </div>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/55 p-5">
            <p className="font-(--font-mono) text-[10px] uppercase tracking-wider text-slate-500">
              Scope Signals
            </p>
            <div className="mt-4 space-y-3">
              {project.outcomeMetrics.map((metric) => (
                <div
                  key={metric.label}
                  className="metric-card rounded-lg border border-slate-800 bg-slate-900/70 p-3"
                >
                  <AnimatedMetric
                    as="p"
                    className="metric-display text-2xl font-bold text-emerald-400"
                    value={metric.value}
                  />
                  <p className="mt-1 text-sm text-slate-400">{metric.label}</p>
                </div>
              ))}
            </div>
            <p className="mt-5 flex items-center gap-2 font-(--font-mono) text-xs text-slate-600">
              <Clock className="h-3.5 w-3.5" />
              Delivery timeline: {project.timeframe}
            </p>
          </div>
        </div>
      </section>

      {project.websiteIncluded && project.websitePreview ? (
        <section>
          <ScrollReveal>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 md:p-8">
              <div className="mb-5 flex items-center gap-2">
                <Monitor className="h-4 w-4 text-emerald-400" />
                <p className="font-(--font-mono) text-xs uppercase tracking-widest text-emerald-400">
                  Homepage Visual
                </p>
              </div>
              <WebsitePreview
                title={project.websitePreview.heroTitle}
                subtitle={project.websitePreview.heroSubtitle}
                navItems={project.websitePreview.primaryNav}
                trustLine={project.websitePreview.trustLine}
              />
            </div>
          </ScrollReveal>
        </section>
      ) : null}

      <section>
        <p className="font-(--font-mono) text-xs uppercase tracking-widest text-emerald-400">
          Services Delivered
        </p>
        <h2 className="mt-4 font-(--font-display) text-3xl font-bold text-white">
          Service-by-service outcomes
        </h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {project.serviceInsights.map((serviceInsight, index) => (
            <ScrollReveal key={serviceInsight.key} delayMs={index * 55}>
              <article className="metric-card rounded-xl border border-slate-800 bg-slate-900/55 p-5">
                <h3 className="font-(--font-display) text-xl font-semibold text-white">
                  {serviceInsight.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{serviceInsight.summary}</p>
                <div className="mt-4 space-y-2">
                  {serviceInsight.highlights.map((highlight) => (
                    <div key={highlight} className="flex items-start gap-2.5">
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                      <p className="text-sm text-slate-300">{highlight}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {serviceInsight.metrics.map((metric) => (
                    <div
                      key={`${serviceInsight.key}-${metric.label}`}
                      className="rounded-lg border border-slate-800 bg-slate-900/70 p-2.5 text-center"
                    >
                      <AnimatedMetric
                        as="p"
                        className="metric-display text-lg font-bold text-cyan-400"
                        value={metric.value}
                      />
                      <p className="mt-1 text-[11px] leading-tight text-slate-500">{metric.label}</p>
                    </div>
                  ))}
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1.1fr,0.9fr]">
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6">
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-emerald-400" />
            <p className="font-(--font-mono) text-[10px] uppercase tracking-wider text-slate-500">
              Key Insights
            </p>
          </div>
          <div className="mt-4 space-y-3">
            {project.insights.map((insight) => (
              <div key={insight} className="flex items-start gap-2.5">
                <span className="data-flow-dot mt-1.5 h-2 w-2 rounded-full bg-cyan-400" />
                <p className="text-sm text-slate-300">{insight}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6">
          <div className="flex items-center gap-2">
            <Server className="h-4 w-4 text-emerald-400" />
            <p className="font-(--font-mono) text-[10px] uppercase tracking-wider text-slate-500">
              Project Stack
            </p>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-slate-800 bg-slate-900 px-2.5 py-1 text-xs text-slate-400"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-900/40 to-slate-900 p-10 text-center md:p-14">
        <div className="pointer-events-none absolute inset-0 dot-grid opacity-35" />
        <div className="relative">
          <h2 className="mx-auto max-w-3xl font-(--font-display) text-2xl font-bold text-white sm:text-3xl">
            Need a similar project outcome?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-400">
            We can scope the website structure, proof system, and conversion path your next build needs.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/demo"
              className="cta-lift inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/25 hover:bg-emerald-500"
            >
              Book Demo
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              href="/projects"
              className="cta-lift inline-flex items-center gap-2 rounded-lg border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-300 hover:border-slate-600 hover:text-white"
            >
              View More Projects
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
