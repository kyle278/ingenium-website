import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";

import { buildMetadata, keywordClusters } from "@/lib/seo";
import { caseStudies, getCaseStudyById } from "@/src/lib/caseStudies";
import { getProjectBySlug } from "@/src/lib/projects";

import { ButtonLink, SectionIntro, SurfaceCard } from "../../components/sitePrimitives";

interface CaseStudyPageProps {
  params: Promise<{ id: string }>;
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
    <div className="overflow-hidden rounded-[24px] border border-slate-800 bg-slate-950/88 shadow-[0_20px_60px_rgba(15,23,42,0.24)]">
      <div className="flex items-center gap-1.5 border-b border-slate-800 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-rose-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
        <span className="ml-3 font-[var(--font-mono)] text-[10px] uppercase tracking-[0.18em] text-slate-500">
          website preview
        </span>
      </div>
      <div className="p-5 md:p-6">
        <div className="flex flex-wrap gap-2">
          {navItems.map((item) => (
            <span
              key={item}
              className="rounded-md border border-slate-800 bg-slate-900/80 px-2 py-1 text-[10px] uppercase tracking-[0.14em] text-slate-400"
            >
              {item}
            </span>
          ))}
        </div>
        <h3 className="mt-5 max-w-2xl font-[var(--font-display)] text-3xl font-semibold tracking-[-0.04em] text-white">
          {title}
        </h3>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">{subtitle}</p>
        <div className="mt-5 rounded-2xl border border-emerald-500/18 bg-emerald-500/10 px-4 py-3">
          <p className="text-sm text-emerald-300">{trustLine}</p>
        </div>
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {["Hero", "Proof", "Conversion path"].map((item) => (
            <div key={item} className="rounded-xl border border-slate-800 bg-slate-900/72 p-4">
              <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.16em] text-slate-500">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return caseStudies.map((study) => ({ id: study.id }));
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { id } = await params;
  const study = getCaseStudyById(id);

  if (!study) {
    return {
      title: "Case Study Not Found | Ingenium",
      description: "The requested case study could not be found.",
      alternates: { canonical: "/case-studies" },
    };
  }

  return buildMetadata({
    title: `${study.client} Case Study | Ingenium`,
    description: `${study.client}: ${study.challenge}`,
    path: `/case-studies/${study.id}`,
    keywords: [
      ...keywordClusters.proof,
      study.client.toLowerCase(),
      study.industry.toLowerCase(),
      ...study.serviceLines.map((item) => item.toLowerCase()),
      ...study.stack.map((item) => item.toLowerCase()),
    ],
    pageType: "WebPage",
  });
}

export default async function CaseStudyDetailPage({ params }: CaseStudyPageProps) {
  const { id } = await params;
  const study = getCaseStudyById(id);

  if (!study) {
    notFound();
  }

  const relatedProject = study.relatedProjectSlug ? getProjectBySlug(study.relatedProjectSlug) : undefined;
  const hasWebsitePreview = Boolean(relatedProject?.websiteIncluded && relatedProject.websitePreview);
  const hasEmbeddedWebsite = Boolean(study.websiteUrl);

  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: study.projectName,
    description: study.challenge,
    creator: {
      "@type": "Organization",
      name: "Ingenium Digital Consulting",
    },
    about: [study.client, study.industry, ...study.stack],
  };

  return (
    <div className="space-y-20 pb-8 md:space-y-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />

      <section className="pt-4">
        <Link
          href="/case-studies"
          className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-text-muted)] transition hover:text-[var(--color-text)]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to case studies
        </Link>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.05fr,0.95fr]">
          <div>
            <p className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.26em] text-[var(--color-brand)]">
              {study.client} - {study.industry}
            </p>
            <h1 className="mt-4 max-w-4xl font-[var(--font-display)] text-4xl font-semibold tracking-[-0.05em] text-[var(--color-text)] sm:text-5xl">
              {study.projectName}
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-[var(--color-text-soft)]">
              {study.stage}
            </p>
            <div className="mt-6 rounded-[24px] border border-black/6 bg-white/72 p-5">
              <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
                Services delivered
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {study.serviceLines.map((service) => (
                  <span
                    key={service}
                    className="tech-pill inline-flex rounded-full px-3 py-1.5 text-sm font-medium text-[var(--color-text)]"
                  >
                    {service}
                  </span>
                ))}
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

          <SurfaceCard className="p-6">
            <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
              At a glance
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {study.buildMetrics.map((metric) => (
                <div key={metric.label} className="rounded-2xl border border-black/6 bg-white/75 p-4">
                  <p className="font-[var(--font-display)] text-2xl font-semibold tracking-[-0.04em] text-[var(--color-brand)]">
                    {metric.value}
                  </p>
                  <p className="mt-1 text-sm text-[var(--color-text-soft)]">{metric.label}</p>
                </div>
              ))}
            </div>
            <p className="mt-5 text-sm leading-6 text-[var(--color-text-soft)]">
              Client type: {study.size}
            </p>
          </SurfaceCard>
        </div>
      </section>

      {hasEmbeddedWebsite || hasWebsitePreview ? (
        <section>
          <SectionIntro
            eyebrow="Website View"
            title="An embedded look at the website delivered as part of this work."
            body={
              hasEmbeddedWebsite
                ? "This case study includes a live site embed."
                : "This case study includes a built-in preview of the website structure and messaging."
            }
          />
          <div className="mt-8">
            {hasEmbeddedWebsite ? (
              <div className="overflow-hidden rounded-[28px] border border-black/8 bg-white/72 p-3 md:p-4">
                <iframe
                  src={study.websiteUrl}
                  title={`${study.client} website preview`}
                  className="h-[720px] w-full rounded-[20px] border border-black/8 bg-white"
                  loading="lazy"
                />
              </div>
            ) : relatedProject?.websitePreview ? (
              <WebsitePreview
                title={relatedProject.websitePreview.heroTitle}
                subtitle={relatedProject.websitePreview.heroSubtitle}
                navItems={relatedProject.websitePreview.primaryNav}
                trustLine={relatedProject.websitePreview.trustLine}
              />
            ) : null}
          </div>
        </section>
      ) : null}

      <section className="grid gap-6 lg:grid-cols-[0.9fr,1.1fr]">
        <SurfaceCard className="p-6 md:p-8">
          <SectionIntro
            eyebrow="The Problem"
            title="What was getting in the way"
            body={study.challenge}
          />
        </SurfaceCard>

        <SurfaceCard className="p-6 md:p-8">
          <SectionIntro
            eyebrow="The Fix"
            title="What changed"
            body={study.intervention}
          />
        </SurfaceCard>
      </section>

      <section>
        <SectionIntro
          eyebrow="What the Client Got"
          title="The parts of the site and system that made the experience clearer."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {study.deliveredAssets.map((asset) => (
            <SurfaceCard key={asset} className="p-5">
              <p className="text-sm leading-6 text-[var(--color-text-soft)]">{asset}</p>
            </SurfaceCard>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
        <SurfaceCard className="p-6 md:p-8">
          <SectionIntro
            eyebrow="Technology"
            title="Build stack"
            body="The implementation used a modern stack that keeps the public site fast, maintainable, and easier to extend."
          />
          <div className="mt-6 flex flex-wrap gap-2">
            {study.stack.map((item) => (
              <span
                key={item}
                className="tech-pill inline-flex rounded-full px-3 py-1 text-sm text-[var(--color-text-soft)]"
              >
                {item}
              </span>
            ))}
          </div>
        </SurfaceCard>

        <SurfaceCard dark className="p-6 md:p-8">
          <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.24em] text-cyan-300">
            Next Step
          </p>
          <h2 className="mt-4 font-[var(--font-display)] text-3xl font-semibold tracking-[-0.04em] text-white">
            Need something similar for your own site?
          </h2>
          <p className="mt-4 text-base leading-7 text-white/72">
            We can map the pages, proof, and conversion path before the build gets bloated or unclear.
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
              href="/case-studies"
              className="cta-lift inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/10 px-5 py-3 text-sm font-semibold text-white"
            >
              More case studies
            </Link>
          </div>
        </SurfaceCard>
      </section>
    </div>
  );
}
