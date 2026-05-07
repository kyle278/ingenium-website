import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";

import { buildMetadata, keywordClusters } from "@/lib/seo";
import { getProjectBySlug, projects } from "@/src/lib/projects";

import AnimatedMetric from "../../components/AnimatedMetric";
import ProjectWebsiteEmbed from "../../components/ProjectWebsiteEmbed";
import ScrollReveal from "../../components/ScrollReveal";
import { ButtonLink, SectionIntro, SurfaceCard } from "../../components/sitePrimitives";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

function getWebsiteStatusMeta(status?: "live" | "mockup") {
  if (status === "live") {
    return {
      label: "Live Website",
      description: "This project includes a live website.",
      pillClass: "bg-emerald-100 text-emerald-700",
    };
  }

  return {
    label: "Mockup Website",
    description: "This project is currently shown as a mockup or concept view.",
    pillClass: "bg-amber-100 text-amber-700",
  };
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

  const hasEmbeddedWebsite = Boolean(project.websiteUrl);
  const websiteStatus = project.websiteIncluded ? getWebsiteStatusMeta(project.websiteStatus) : null;

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
    <div className="space-y-20 pb-8 md:space-y-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
      />

      <section className="pt-4">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-text-muted)] transition hover:text-[var(--color-text)]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to projects
        </Link>

        <div className="mt-8">
          <ScrollReveal>
            <div className="max-w-4xl">
              <p className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.26em] text-[var(--color-brand)]">
                {project.clientName} / {project.industry}
              </p>
              {websiteStatus ? (
                <div className="mt-4">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 font-[var(--font-mono)] text-[10px] uppercase tracking-[0.18em] ${websiteStatus.pillClass}`}
                  >
                    {websiteStatus.label}
                  </span>
                </div>
              ) : null}
              <h1 className="mt-4 max-w-4xl font-[var(--font-display)] text-4xl font-semibold tracking-[-0.05em] text-[var(--color-text)] sm:text-5xl">
                {project.projectName}
              </h1>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-[var(--color-text-soft)]">
                {project.teaser}
              </p>
              <p className="mt-6 max-w-3xl text-base leading-8 text-[var(--color-text-soft)]">
                {project.summary}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {project.services.map((service) => (
                  <span
                    key={service}
                    className="tech-pill inline-flex rounded-full px-3 py-1.5 text-sm font-medium text-[var(--color-text)]"
                  >
                    {service}
                  </span>
                ))}
              </div>

              <div className="mt-6 grid gap-3 text-sm leading-6 text-[var(--color-text-soft)] sm:grid-cols-2 lg:max-w-3xl">
                <div className="rounded-2xl border border-black/6 bg-white/72 px-4 py-4">
                  Client type: {project.clientSize}
                </div>
                <div className="rounded-2xl border border-black/6 bg-white/72 px-4 py-4">
                  Timeline: {project.timeframe}
                </div>
                {websiteStatus ? (
                  <div className="rounded-2xl border border-black/6 bg-white/72 px-4 py-4 sm:col-span-2">
                    Website status: {websiteStatus.description}
                  </div>
                ) : null}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink action={{ label: "Book Demo", href: "/demo" }} />
                <ButtonLink
                  action={{ label: "Revenue Systems Teardown", href: "/revenue-systems-teardown" }}
                  variant="secondary"
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {hasEmbeddedWebsite ? (
        <section>
          <ScrollReveal>
            <SectionIntro
              eyebrow="Live Project"
              title="A live embedded view of the delivered project."
              body="Add a project website URL in the project record to show the embed here."
            />
          </ScrollReveal>
          <ScrollReveal className="mt-8" delayMs={70} blur>
            <ProjectWebsiteEmbed
              url={project.websiteUrl!}
              title={`${project.clientName} project preview`}
            />
          </ScrollReveal>
        </section>
      ) : null}

      <section className="grid gap-6 lg:grid-cols-[0.9fr,1.1fr]">
        <ScrollReveal>
          <SurfaceCard className="p-6 md:p-8">
            <SectionIntro
              eyebrow="Project Outcome"
              title="What changed for the buyer journey"
              body={project.summary}
            />
          </SurfaceCard>
        </ScrollReveal>

        <ScrollReveal delayMs={80} direction="left">
          <SurfaceCard className="p-6 md:p-8">
            <SectionIntro
              eyebrow="Why it worked"
              title="The key operational and conversion shifts"
            />
            <div className="mt-6 space-y-3">
              {project.insights.map((insight) => (
                <div key={insight} className="rounded-2xl border border-black/6 bg-white/72 px-4 py-4 text-sm leading-7 text-[var(--color-text-soft)]">
                  {insight}
                </div>
              ))}
            </div>
          </SurfaceCard>
        </ScrollReveal>
      </section>

      <section>
        <ScrollReveal>
          <SectionIntro
            eyebrow="Services Delivered"
            title="What Ingenium delivered across the project"
            body="Each delivery area is framed around clearer structure, better trust signals, and a more direct conversion path."
          />
        </ScrollReveal>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {project.serviceInsights.map((serviceInsight, index) => (
            <ScrollReveal key={serviceInsight.key} delayMs={index * 45}>
              <SurfaceCard className="p-6">
                <p className="font-[var(--font-display)] text-2xl font-semibold tracking-[-0.03em] text-[var(--color-text)]">
                  {serviceInsight.title}
                </p>
                <p className="mt-4 text-sm leading-7 text-[var(--color-text-soft)]">{serviceInsight.summary}</p>
                <div className="mt-5 grid gap-3">
                  {serviceInsight.highlights.map((highlight) => (
                    <div
                      key={highlight}
                      className="rounded-2xl border border-black/6 bg-white/72 px-4 py-4 text-sm leading-7 text-[var(--color-text-soft)]"
                    >
                      {highlight}
                    </div>
                  ))}
                </div>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  {serviceInsight.metrics.map((metric) => (
                    <div
                      key={`${serviceInsight.key}-${metric.label}`}
                      className="rounded-2xl border border-black/6 bg-[var(--color-panel-low)] p-4 text-center"
                    >
                      <AnimatedMetric
                        as="p"
                        value={metric.value}
                        className="metric-display font-[var(--font-display)] text-xl font-semibold tracking-[-0.04em] text-[var(--color-brand)]"
                      />
                      <p className="mt-1 text-[11px] leading-tight text-[var(--color-text-muted)]">
                        {metric.label}
                      </p>
                    </div>
                  ))}
                </div>
              </SurfaceCard>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
        <ScrollReveal>
          <SurfaceCard className="p-6 md:p-8">
            <SectionIntro
              eyebrow="Technology"
              title="Build stack"
              body="The implementation used a modern stack that keeps the public site fast, maintainable, and easier to extend."
            />
            <div className="mt-6 flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <span
                  key={item}
                  className="tech-pill inline-flex rounded-full px-3 py-1 text-sm text-[var(--color-text-soft)]"
                >
                  {item}
                </span>
              ))}
            </div>
          </SurfaceCard>
        </ScrollReveal>

        <ScrollReveal delayMs={80} direction="left" blur>
          <SurfaceCard dark className="p-6 md:p-8">
            <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.24em] text-cyan-300">
              Next Step
            </p>
            <h2 className="mt-4 font-[var(--font-display)] text-3xl font-semibold tracking-[-0.04em] text-white">
              Need something similar for your own project?
            </h2>
            <p className="mt-4 text-base leading-7 text-white/72">
              We can map the structure, proof, and conversion path before the build gets bloated or unclear.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/demo"
                className="cta-lift inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[var(--color-text)]"
              >
                Book Demo
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                href="/projects"
                className="cta-lift inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/10 px-5 py-3 text-sm font-semibold text-white"
              >
                View More Projects
              </Link>
            </div>
          </SurfaceCard>
        </ScrollReveal>
      </section>
    </div>
  );
}
