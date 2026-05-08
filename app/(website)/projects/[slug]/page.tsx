import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";

import AnimatedMetric from "../../components/AnimatedMetric";
import PageReviewMeta from "../../components/PageReviewMeta";
import ProjectWebsiteEmbed from "../../components/ProjectWebsiteEmbed";
import ScrollReveal from "../../components/ScrollReveal";
import { ButtonLink, SectionIntro, SurfaceCard } from "../../components/sitePrimitives";
import {
  getPortalProjectBySlug,
  getPortalProjectClientName,
  getPortalProjectPresentation,
  getPortalProjectSummary,
  getPortalProjectTitle,
  listPortalProjects,
} from "@/lib/portalIntegration/projects";
import { SITE_URL, buildMetadata, keywordClusters } from "@/lib/seo";

export const revalidate = 300;

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

function inputPlaceholderClass(missing: boolean, defaultClass: string) {
  return missing ? "text-amber-700" : defaultClass;
}

function placeholderSurfaceClass(
  missing: boolean,
  defaultClass = "border border-black/6 bg-white/72"
) {
  return missing ? "border border-dashed border-amber-300 bg-amber-50" : defaultClass;
}

export async function generateStaticParams() {
  const projects = await listPortalProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getPortalProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found | Ingenium",
      description: "The requested project page could not be found.",
      alternates: { canonical: "/projects" },
    };
  }

  const title = getPortalProjectTitle(project);
  const clientName = getPortalProjectClientName(project);
  const summary =
    getPortalProjectSummary(project) ??
    "Portal-backed project detail published from Ingenium Portal.";
  const presentation = getPortalProjectPresentation(project);

  return buildMetadata({
    title: `${title} Project | Ingenium`,
    description: summary,
    path: `/projects/${project.slug}`,
    keywords: [
      ...keywordClusters.proof,
      ...presentation.services
        .filter((item) => !item.missing)
        .map((item) => item.text.toLowerCase()),
      ...(presentation.industry.missing ? [] : [presentation.industry.text.toLowerCase()]),
      ...(clientName ? [clientName.toLowerCase()] : []),
    ],
    pageType: "WebPage",
  });
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getPortalProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const title = getPortalProjectTitle(project);
  const presentation = getPortalProjectPresentation(project);
  const schemaSummary =
    getPortalProjectSummary(project) ??
    (presentation.summary.missing ? title : presentation.summary.text);

  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: title,
    description: schemaSummary,
    dateModified: project.updatedAt,
    creator: {
      "@type": "Organization",
      name: "Ingenium Digital Consulting",
    },
    url: `${SITE_URL}/projects/${project.slug}`,
    ...(presentation.challenge.missing ? {} : { abstract: presentation.challenge.text }),
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
          className="inline-flex items-center gap-2 type-action text-[var(--color-text-muted)] transition hover:text-[var(--color-text)]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to projects
        </Link>

        <div className="mt-8">
          <ScrollReveal>
            <div className="max-w-4xl">
              <p
                className={`type-page-kicker ${
                  presentation.clientName.missing || presentation.industry.missing
                    ? "text-amber-700"
                    : "text-[var(--color-brand)]"
                }`}
              >
                {presentation.clientName.text} / {presentation.industry.text}
              </p>
              <div className="mt-4">
                <span
                  className={`inline-flex rounded-full px-3 py-1 type-detail-kicker ${presentation.websiteStatus.className}`}
                >
                  {presentation.websiteStatus.label}
                </span>
              </div>
              <h1 className="mt-4 max-w-4xl type-page-title text-[var(--color-text)]">
                {presentation.projectName.text}
              </h1>
              <p
                className={`mt-4 max-w-[68ch] type-body-lead ${inputPlaceholderClass(
                  presentation.teaser.missing,
                  "text-[var(--color-text-soft)]"
                )}`}
              >
                {presentation.teaser.text}
              </p>
              <p
                className={`mt-6 max-w-[68ch] type-body-base ${inputPlaceholderClass(
                  presentation.summary.missing,
                  "text-[var(--color-text-soft)]"
                )}`}
              >
                {presentation.summary.text}
              </p>
              <PageReviewMeta />

              <div className="mt-6 flex flex-wrap gap-2">
                {presentation.services.map((service) => (
                  <span
                    key={service.key}
                    className={`tech-pill inline-flex rounded-full px-3 py-1.5 type-form-label ${placeholderSurfaceClass(
                      service.missing,
                      "text-[var(--color-text)]"
                    )}`}
                  >
                    {service.text}
                  </span>
                ))}
              </div>

              <div className="mt-6 grid gap-3 type-body-sm sm:grid-cols-2 lg:max-w-3xl">
                <div
                  className={`rounded-2xl px-4 py-4 ${placeholderSurfaceClass(
                    presentation.clientSize.missing
                  )}`}
                >
                  <span
                    className={inputPlaceholderClass(
                      presentation.clientSize.missing,
                      "text-[var(--color-text-soft)]"
                    )}
                  >
                    Client type: {presentation.clientSize.text}
                  </span>
                </div>
                <div
                  className={`rounded-2xl px-4 py-4 ${placeholderSurfaceClass(
                    presentation.deliveryDate.missing
                  )}`}
                >
                  <span
                    className={inputPlaceholderClass(
                      presentation.deliveryDate.missing,
                      "text-[var(--color-text-soft)]"
                    )}
                  >
                    Delivery date: {presentation.deliveryDate.text}
                  </span>
                </div>
                <div
                  className={`rounded-2xl px-4 py-4 sm:col-span-2 ${placeholderSurfaceClass(
                    presentation.timeframe.missing
                  )}`}
                >
                  <span
                    className={inputPlaceholderClass(
                      presentation.timeframe.missing,
                      "text-[var(--color-text-soft)]"
                    )}
                  >
                    Delivery context: {presentation.timeframe.text}
                  </span>
                </div>
                <div
                  className={`rounded-2xl px-4 py-4 sm:col-span-2 ${placeholderSurfaceClass(
                    presentation.websiteStatus.missing
                  )}`}
                >
                  <span
                    className={inputPlaceholderClass(
                      presentation.websiteStatus.missing,
                      "text-[var(--color-text-soft)]"
                    )}
                  >
                    Website status: {presentation.websiteStatus.description}
                  </span>
                </div>
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

      <section>
        <ScrollReveal>
          <SectionIntro
            eyebrow="Live Project"
            title="A live embedded view of the delivered project."
            body="Add a project website URL in the project record to show the embed here."
          />
        </ScrollReveal>
        <ScrollReveal className="mt-8" delayMs={70} blur>
          {presentation.websiteUrl ? (
            <ProjectWebsiteEmbed
              url={presentation.websiteUrl}
              title={`${presentation.clientName.text} project preview`}
            />
          ) : (
            <SurfaceCard className="border border-dashed border-amber-300 bg-amber-50 p-8">
              <p className="type-card-title text-amber-700">Add website field: website_url</p>
              <p className="mt-3 type-body-sm text-amber-700/85">
                Add a live website URL in the project Website tab if you want the embedded preview
                to render here.
              </p>
            </SurfaceCard>
          )}
        </ScrollReveal>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.9fr,1.1fr]">
        <ScrollReveal>
          <SurfaceCard
            className={`p-6 md:p-8 ${
              presentation.summary.missing ? "border border-dashed border-amber-300 bg-amber-50" : ""
            }`}
          >
            <SectionIntro
              eyebrow="Project Outcome"
              title="What changed for the buyer journey"
              body={presentation.summary.text}
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
              {presentation.insights.map((insight) => (
                <div
                  key={insight.key}
                  className={`rounded-2xl px-4 py-4 type-body-sm ${placeholderSurfaceClass(
                    insight.missing,
                    "border border-black/6 bg-white/72 text-[var(--color-text-soft)]"
                  )}`}
                >
                  {insight.text}
                </div>
              ))}
            </div>
          </SurfaceCard>
        </ScrollReveal>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.02fr,0.98fr]">
        <ScrollReveal>
          <SurfaceCard
            className={`p-6 md:p-8 ${
              presentation.challenge.missing ? "border border-dashed border-amber-300 bg-amber-50" : ""
            }`}
          >
            <SectionIntro
              eyebrow="Case Study Detail"
              title="What problem the client needed to solve"
              body={presentation.challenge.text}
            />
          </SurfaceCard>
        </ScrollReveal>

        <ScrollReveal delayMs={80} direction="left">
          <SurfaceCard
            className={`p-6 md:p-8 ${
              presentation.intervention.missing ? "border border-dashed border-amber-300 bg-amber-50" : ""
            }`}
          >
            <SectionIntro
              eyebrow="Intervention"
              title="How the project was structured"
              body={presentation.intervention.text}
            />
            <div className="mt-6 space-y-3">
              {presentation.deliveredAssets.map((asset) => (
                <div
                  key={asset.key}
                  className={`rounded-2xl px-4 py-4 type-body-sm ${placeholderSurfaceClass(
                    asset.missing,
                    "border border-black/6 bg-white/72 text-[var(--color-text-soft)]"
                  )}`}
                >
                  {asset.text}
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
          {presentation.serviceInsights.map((serviceInsight, index) => (
            <ScrollReveal key={serviceInsight.key} delayMs={index * 45}>
              <SurfaceCard className="p-6">
                <p
                  className={`type-card-title ${inputPlaceholderClass(
                    serviceInsight.title.missing,
                    "text-[var(--color-text)]"
                  )}`}
                >
                  {serviceInsight.title.text}
                </p>
                <p
                  className={`mt-4 type-body-sm ${inputPlaceholderClass(
                    serviceInsight.summary.missing,
                    "text-[var(--color-text-soft)]"
                  )}`}
                >
                  {serviceInsight.summary.text}
                </p>
                <div className="mt-5 grid gap-3">
                  {serviceInsight.highlights.map((highlight) => (
                    <div
                      key={highlight.key}
                      className={`rounded-2xl px-4 py-4 type-body-sm ${placeholderSurfaceClass(
                        highlight.missing,
                        "border border-black/6 bg-white/72 text-[var(--color-text-soft)]"
                      )}`}
                    >
                      {highlight.text}
                    </div>
                  ))}
                </div>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  {serviceInsight.metrics.map((metric) => (
                    <div
                      key={metric.key}
                      className={`rounded-2xl p-4 text-center ${
                        metric.missing
                          ? "border border-dashed border-amber-300 bg-amber-50"
                          : "border border-black/6 bg-[var(--color-panel-low)]"
                      }`}
                    >
                      <AnimatedMetric
                        as="p"
                        value={metric.value.text}
                        className={`metric-display text-[1.5rem] font-semibold ${
                          metric.value.missing ? "text-amber-700" : "text-[var(--color-brand)]"
                        }`}
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
              {presentation.stack.map((item) => (
                <span
                  key={item.key}
                  className={`tech-pill inline-flex rounded-full px-3 py-1 type-body-sm ${placeholderSurfaceClass(
                    item.missing,
                    "text-[var(--color-text-soft)]"
                  )}`}
                >
                  {item.text}
                </span>
              ))}
            </div>
          </SurfaceCard>
        </ScrollReveal>

        <ScrollReveal delayMs={80} direction="left" blur>
          <SurfaceCard dark className="p-6 md:p-8">
            <p className="type-section-kicker text-cyan-300">Next Step</p>
            <h2 className="mt-4 type-section-title text-white">
              Need something similar for your own project?
            </h2>
            <p className="mt-4 type-body-base text-white/72">
              We can map the structure, proof, and conversion path before the build gets bloated
              or unclear.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/demo"
                className="cta-lift inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 type-action text-[var(--color-text)]"
              >
                Book Demo
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                href="/projects"
                className="cta-lift inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/10 px-5 py-3 type-action text-white"
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
