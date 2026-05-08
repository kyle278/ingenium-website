import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";

import PageReviewMeta from "../../components/PageReviewMeta";
import ProjectWebsiteEmbed from "../../components/ProjectWebsiteEmbed";
import ScrollReveal from "../../components/ScrollReveal";
import { ButtonLink, SectionIntro, SurfaceCard } from "../../components/sitePrimitives";
import {
  formatPortalProjectFieldValue,
  getPortalProjectBySlug,
  getPortalProjectClientName,
  getPortalProjectDetailFields,
  getPortalProjectPreviewFields,
  getPortalProjectSummary,
  getPortalProjectTitle,
  getPortalProjectWebsiteUrl,
  listPortalProjects,
  PORTAL_PROJECTS_REVALIDATE_SECONDS,
  type PortalProjectField,
} from "@/lib/portalIntegration/projects";
import { SITE_URL, buildMetadata, keywordClusters } from "@/lib/seo";

export const revalidate = PORTAL_PROJECTS_REVALIDATE_SECONDS;

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

function isWideField(field: PortalProjectField) {
  if (Array.isArray(field.value)) {
    return field.value.length > 3;
  }

  return typeof field.value === "string" && field.value.trim().length > 120;
}

function renderFieldValue(field: PortalProjectField) {
  if (Array.isArray(field.value)) {
    return (
      <div className="mt-3 flex flex-wrap gap-2">
        {field.value.map((item) => (
          <span
            key={`${field.key}-${item}`}
            className="tech-pill inline-flex rounded-full px-3 py-1 type-body-sm text-[var(--color-text-soft)]"
          >
            {item}
          </span>
        ))}
      </div>
    );
  }

  if (
    typeof field.value === "string" &&
    /^https?:\/\//i.test(field.value.trim())
  ) {
    return (
      <Link
        href={field.value}
        target="_blank"
        rel="noreferrer"
        className="mt-3 inline-flex items-center gap-2 type-action text-[var(--color-brand)] hover:text-[var(--color-brand-strong)]"
      >
        Open link
        <ArrowUpRight className="h-4 w-4" />
      </Link>
    );
  }

  return (
    <p className="mt-3 type-body-base text-[var(--color-text-soft)]">
      {formatPortalProjectFieldValue(field.value)}
    </p>
  );
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

  return buildMetadata({
    title: `${title} Project | Ingenium`,
    description: summary,
    path: `/projects/${project.slug}`,
    keywords: [
      ...keywordClusters.proof,
      title.toLowerCase(),
      ...(clientName ? [clientName.toLowerCase()] : []),
      ...project.websiteData.map((field) => field.label.toLowerCase()),
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
  const clientName = getPortalProjectClientName(project);
  const summary =
    getPortalProjectSummary(project) ??
    "Portal-backed project detail published from Ingenium Portal.";
  const websiteUrl = getPortalProjectWebsiteUrl(project);
  const previewFields = getPortalProjectPreviewFields(project).slice(0, 4);
  const detailFields = getPortalProjectDetailFields(project);

  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: title,
    description: summary,
    dateModified: project.updatedAt,
    creator: {
      "@type": "Organization",
      name: "Ingenium Digital Consulting",
    },
    url: `${SITE_URL}/projects/${project.slug}`,
    about: detailFields.map((field) => field.label),
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
              <p className="type-page-kicker text-[var(--color-brand)]">
                {clientName ?? "Published Project"}
              </p>
              <h1 className="mt-4 max-w-4xl type-page-title text-[var(--color-text)]">
                {title}
              </h1>
              <p className="mt-4 max-w-[68ch] type-body-lead text-[var(--color-text-soft)]">
                {summary}
              </p>
              <PageReviewMeta />

              <div className="mt-6 grid gap-3 type-body-sm text-[var(--color-text-soft)] sm:grid-cols-2 lg:max-w-3xl">
                <div className="rounded-2xl border border-black/6 bg-white/72 px-4 py-4">
                  Published from the Ingenium Portal project feed
                </div>
                <div className="rounded-2xl border border-black/6 bg-white/72 px-4 py-4">
                  Last updated: {formatPortalProjectFieldValue(project.updatedAt)}
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

      {previewFields.length > 0 ? (
        <section>
          <ScrollReveal>
            <SectionIntro
              eyebrow="Key Details"
              title="The main website fields selected for this project"
              body="These values are driven directly by the Website tab configuration on the project record inside Ingenium Portal."
            />
          </ScrollReveal>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {previewFields.map((field, index) => (
              <ScrollReveal key={field.key} delayMs={index * 45}>
                <SurfaceCard className="p-5">
                  <p className="type-detail-kicker text-[var(--color-text-muted)]">
                    {field.label}
                  </p>
                  <p className="mt-3 type-body-base text-[var(--color-text)]">
                    {formatPortalProjectFieldValue(field.value)}
                  </p>
                </SurfaceCard>
              </ScrollReveal>
            ))}
          </div>
        </section>
      ) : null}

      {websiteUrl ? (
        <section>
          <ScrollReveal>
            <SectionIntro
              eyebrow="Live Project"
              title="A live embedded view of the delivered project"
              body="This preview is shown because the project feed includes a website URL."
            />
          </ScrollReveal>
          <ScrollReveal className="mt-8" delayMs={70} blur>
            <ProjectWebsiteEmbed url={websiteUrl} title={`${title} project preview`} />
          </ScrollReveal>
        </section>
      ) : null}

      {detailFields.length > 0 ? (
        <section>
          <ScrollReveal>
            <SectionIntro
              eyebrow="Project Data"
              title="All website-visible fields for this project"
              body="Nothing below is hardcoded in the website. Each field is coming from the portal allowlist for this project."
            />
          </ScrollReveal>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {detailFields.map((field, index) => (
              <ScrollReveal key={field.key} delayMs={index * 35}>
                <SurfaceCard className={`p-6 ${isWideField(field) ? "md:col-span-2" : ""}`}>
                  <p className="type-detail-kicker text-[var(--color-text-muted)]">
                    {field.label}
                  </p>
                  {renderFieldValue(field)}
                </SurfaceCard>
              </ScrollReveal>
            ))}
          </div>
        </section>
      ) : null}

      <section className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
        <ScrollReveal>
          <SurfaceCard className="p-6 md:p-8">
            <SectionIntro
              eyebrow="Portal Workflow"
              title="How this project gets to the website"
              body="The project is published from the CRM record. The website receives the site-scoped feed, while the portal resolves organisation scope internally from the configured site ID."
            />
          </SurfaceCard>
        </ScrollReveal>

        <ScrollReveal delayMs={80} direction="left">
          <SurfaceCard className="p-6 md:p-8">
            <SectionIntro
              eyebrow="Next Step"
              title="Want this same publishing workflow for your own project library?"
              body="We can structure the CRM model, website feed, and public proof surfaces so project updates only need to happen in one place."
            />
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink action={{ label: "Book Demo", href: "/demo" }} />
              <ButtonLink
                action={{ label: "Contact Ingenium", href: "/contact" }}
                variant="secondary"
              />
            </div>
          </SurfaceCard>
        </ScrollReveal>
      </section>
    </div>
  );
}
