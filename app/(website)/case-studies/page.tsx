import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  CheckCircle2,
  Clock,
  FolderKanban,
  Layers,
  Server,
} from "lucide-react";

import { caseStudies } from "@/src/lib/caseStudies";

import AnimatedMetric from "../components/AnimatedMetric";

export const metadata: Metadata = {
  title: "Client Website Case Studies | Ingenium",
  description:
    "Named client case studies showing how Ingenium structures websites, proof systems, and conversion paths for real businesses.",
  openGraph: {
    title: "Client Website Case Studies | Ingenium",
    description:
      "Named client case studies across healthcare, construction, specialist services, and commercial operations.",
  },
  alternates: { canonical: "/case-studies" },
};

const hero = {
  label: "Evidence Library",
  title: "Named client case studies with real delivery scope.",
  body:
    "These are not anonymized placeholders. Each case study below is grounded in a real client build from the local project portfolio, with the architecture, proof system, and high-intent pathways made explicit.",
  primary_cta: { label: "Book a Strategy Review", href: "/contact?intent=strategy-call" },
  secondary_cta: { label: "View Full Project Library", href: "/projects" },
  aggregate_metrics: [
    { metric: "8", label: "Named client builds", detail: "currently represented on-site" },
    { metric: "76", label: "Published routes", detail: "across the current client portfolio" },
    { metric: "10", label: "Featured decision paths", detail: "across the four case studies below" },
    { metric: "4", label: "Sectors covered", detail: "in the featured deep dives" },
  ],
  aggregate_note:
    "Proof set sourced from real sibling client projects in the current workspace portfolio.",
};

const proofThemes = [
  "Named clients are surfaced directly instead of anonymous category placeholders.",
  "Proof comes from real build scope: route count, page systems, quote paths, and proof libraries.",
  "Each case shows how structure, trust, and next-step clarity work together to convert.",
];

const finalCta = {
  title: "Need this level of proof and structure on your own site?",
  body:
    "We map the architecture, proof system, and next-step paths before design drift or tool sprawl slows the build down.",
  primary_cta: { label: "Book a Strategy Review", href: "/contact?intent=strategy-call" },
  secondary_cta: { label: "Request Named Work Samples", href: "/contact?intent=case-study-request" },
  reassurance: "Named client work - Scope-led planning - Strategy and technical review support",
};

export default function CaseStudiesPage() {
  return (
    <div className="space-y-28 md:space-y-40">
      <section className="pt-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-(--font-mono) text-xs uppercase tracking-widest text-emerald-400">
            {hero.label}
          </p>
          <h1 className="mt-6 font-(--font-display) text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl">
            {hero.title}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-400">
            {hero.body}
          </p>

          <div className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
            {hero.aggregate_metrics.map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-center"
              >
                <AnimatedMetric
                  as="p"
                  className="metric-display font-(--font-display) text-2xl font-bold text-emerald-400 sm:text-3xl"
                  value={item.metric}
                />
                <p className="mt-1 text-sm font-medium text-slate-300">{item.label}</p>
                <p className="mt-0.5 font-(--font-mono) text-[10px] text-slate-600">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-4 font-(--font-mono) text-[11px] text-slate-600">
            {hero.aggregate_note}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={hero.primary_cta.href}
              className="cta-lift inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/25 transition hover:bg-emerald-500"
            >
              {hero.primary_cta.label}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={hero.secondary_cta.href}
              className="cta-lift inline-flex items-center gap-2 rounded-lg border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-300 transition hover:border-slate-600 hover:text-white"
            >
              {hero.secondary_cta.label}
            </Link>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-800 bg-slate-900/45 p-8 dot-grid">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="max-w-2xl">
            <p className="font-(--font-mono) text-xs uppercase tracking-widest text-cyan-400">
              What These Case Studies Prove
            </p>
            <h2 className="mt-4 font-(--font-display) text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Proof that reads like delivery, not copywriting.
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {["Healthcare", "Construction", "Specialist Services", "Commercial Ops"].map((item) => (
              <span
                key={item}
                className="rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-1.5 font-(--font-mono) text-[10px] uppercase tracking-wider text-slate-400"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {proofThemes.map((item) => (
            <div
              key={item}
              className="rounded-xl border border-slate-800 bg-slate-900/70 p-5"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span className="font-(--font-mono) text-[10px] uppercase tracking-wider text-slate-500">
                  Proof principle
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-16">
        {caseStudies.map((study) => (
          <article
            key={study.id}
            id={study.id}
            className="overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900/80 to-slate-950"
          >
            <div className="border-b border-slate-800/60 px-8 py-6 md:px-10">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-md bg-emerald-500/10 px-2.5 py-1 font-(--font-mono) text-[10px] uppercase tracking-wider text-emerald-400">
                  {study.industry}
                </span>
                <span className="rounded-md bg-slate-800 px-2.5 py-1 font-(--font-mono) text-[10px] uppercase tracking-wider text-slate-400">
                  {study.size}
                </span>
              </div>
              <h2 className="mt-4 font-(--font-display) text-xl font-bold text-white sm:text-2xl">
                {study.projectName}
              </h2>
              <p className="mt-2 max-w-3xl text-sm text-slate-500">{study.stage}</p>
            </div>

            <div className="grid gap-0 border-b border-slate-800/60 lg:grid-cols-[1.1fr,0.9fr]">
              <div className="border-b border-slate-800/60 px-8 py-6 lg:border-b-0 lg:border-r lg:px-10">
                <p className="font-(--font-mono) text-[10px] uppercase tracking-wider text-slate-500">
                  Challenge
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">{study.challenge}</p>

                <p className="mt-6 font-(--font-mono) text-[10px] uppercase tracking-wider text-slate-500">
                  Intervention
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">
                  {study.intervention}
                </p>
              </div>

              <div className="px-8 py-6 md:px-10">
                <div className="mb-4 flex items-center gap-2">
                  <FolderKanban className="h-4 w-4 text-emerald-400" />
                  <span className="font-(--font-mono) text-[10px] uppercase tracking-wider text-emerald-400">
                    Delivered Assets
                  </span>
                </div>
                <div className="space-y-3">
                  {study.deliveredAssets.map((asset) => (
                    <div key={asset} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                      <p className="text-sm leading-relaxed text-slate-300">{asset}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="px-8 py-8 md:px-10">
              <div className="mb-6 flex items-center gap-2">
                <Building2 className="h-4 w-4 text-cyan-400" />
                <span className="font-(--font-mono) text-[10px] uppercase tracking-wider text-cyan-400">
                  Concrete Build Evidence
                </span>
              </div>

              <div className="grid gap-4 lg:grid-cols-[0.9fr,1.1fr]">
                <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                  {study.buildMetrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="rounded-xl border border-slate-800 bg-slate-900/50 p-4"
                    >
                      <AnimatedMetric
                        as="p"
                        className="metric-display text-3xl font-bold text-emerald-400"
                        value={metric.value}
                      />
                      <p className="mt-1 text-sm font-medium text-slate-300">{metric.label}</p>
                    </div>
                  ))}
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-900/45 p-5">
                  <div className="flex items-center gap-2">
                    <Layers className="h-4 w-4 text-emerald-400" />
                    <span className="font-(--font-mono) text-[10px] uppercase tracking-wider text-slate-500">
                      Why it matters
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-slate-400">
                    The point of these builds is not just more pages. It is a cleaner path from
                    first visit to the right next step: clearer service choices, visible trust
                    layers, and more specific decision routes for the buyer.
                  </p>
                  <div className="mt-5 flex flex-wrap items-center gap-2">
                    <Server className="h-3.5 w-3.5 text-slate-600" />
                    <span className="font-(--font-mono) text-[10px] uppercase tracking-wider text-slate-600">
                      Stack:
                    </span>
                    {study.stack.map((tech) => (
                      <span
                        key={`${study.id}-${tech}`}
                        className="rounded border border-slate-800 bg-slate-900/70 px-2 py-0.5 font-(--font-mono) text-[10px] text-slate-500"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-900/40 to-slate-900 p-10 text-center md:p-16">
        <div className="pointer-events-none absolute inset-0 dot-grid opacity-30" />
        <div className="relative">
          <h2 className="mx-auto max-w-3xl font-(--font-display) text-2xl font-bold tracking-tight text-white sm:text-3xl">
            {finalCta.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-400">{finalCta.body}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={finalCta.primary_cta.href}
              className="cta-lift inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/25 transition hover:bg-emerald-500"
            >
              {finalCta.primary_cta.label}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              href={finalCta.secondary_cta.href}
              className="cta-lift inline-flex items-center gap-2 rounded-lg border border-slate-700 px-6 py-3 text-sm font-medium text-slate-300 transition hover:border-slate-600 hover:text-white"
            >
              {finalCta.secondary_cta.label}
            </Link>
          </div>
          <p className="mt-6 flex items-center justify-center gap-2 font-(--font-mono) text-xs text-slate-600">
            <Clock className="h-3.5 w-3.5" />
            {finalCta.reassurance}
          </p>
        </div>
      </section>
    </div>
  );
}
