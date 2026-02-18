import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  ArrowUpRight,
  TrendingUp,
  Clock,
  Filter,
  Layers,
  Building2,
  Activity,
  DollarSign,
  BarChart3,
  Zap,
  Server,
} from "lucide-react";

import { PAGE_KEYS, SECTION_KEYS } from "@/src/lib/content-map";
import { loadPortalPageContent } from "@/src/lib/portal-page-content";
import AnimatedMetric from "../components/AnimatedMetric";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Enterprise Website Case Studies | Ingenium",
  description:
    "Real results from enterprise website rebuilds — conversion lift, pipeline growth, and system integration outcomes with measurable timelines.",
  openGraph: {
    title: "Enterprise Website Case Studies | Ingenium",
    description:
      "Real results from enterprise website rebuilds — conversion lift, pipeline growth, and system integration outcomes with measurable timelines.",
  },
  alternates: { canonical: "/case-studies" },
};

/* ── Fallback Content ──────────────────────────────────────────────── */

const fallbackHero = {
  label: "Evidence Library",
  title: "Enterprise website case studies with measurable outcomes.",
  body: "Every engagement produces data. These are the results from enterprise website rebuilds — conversion architecture, pipeline integration, and system-level transformation with verified timelines.",
  primary_cta: { label: "Book a Strategy Call", href: "/contact" },
  secondary_cta: { label: "Download the Full Case Pack", href: "/contact" },
  aggregate_metrics: [
    { metric: "+34%", label: "Avg. conversion lift", detail: "across all engagements" },
    { metric: "2.4x", label: "Pipeline growth", detail: "within first 90 days" },
    { metric: "41 days", label: "Avg. time to launch", detail: "from kickoff to live" },
    { metric: "67%", label: "CAC reduction", detail: "median across B2B clients" },
  ],
  aggregate_note: "Aggregate metrics from 12 enterprise engagements, 2023–2025",
};

const fallbackFilters = {
  label: "Filter by",
  industries: ["Fintech", "Healthcare", "Enterprise Services", "B2B Technology", "SaaS"],
  services: ["Website Rebuild", "Conversion Architecture", "CRM Integration", "AI Automation"],
  sizes: ["Series A–B", "Series C+", "Mid-Market", "Enterprise"],
};

const fallbackCaseList = {
  items: [
    {
      id: "fintech-saas",
      client_type: "Series B Fintech SaaS",
      industry: "Fintech",
      size: "Series B · 120 employees",
      stage: "Post-PMF, scaling outbound and inbound pipeline",
      challenge:
        "Website generated 62K monthly visits but converted at 0.7% to demo requests. Marketing attribution was broken — the team could not tie any campaign to closed revenue. Sales received form fills with zero context, leading to 4-day average response times and low qualification rates.",
      intervention:
        "Full website rebuild with conversion architecture: buyer-persona messaging across 16 pages, progressive lead capture forms, CRM integration with automated lead routing, AI-assisted enrichment for SDR context, and end-to-end attribution from first touch to closed-won.",
      metrics: {
        conversion: [
          { label: "Demo request rate", before: "0.7%", after: "2.4%", direction: "up" },
          { label: "Form abandonment", before: "71%", after: "28%", direction: "down" },
          { label: "Qualified lead rate", before: "23%", after: "58%", direction: "up" },
        ],
        pipeline: [
          { label: "Marketing-attributed pipeline", before: "$180K/mo", after: "$430K/mo", direction: "up" },
          { label: "Avg. deal velocity", before: "68 days", after: "41 days", direction: "down" },
          { label: "CAC payback", before: "14 months", after: "6 months", direction: "down" },
        ],
        operational: [
          { label: "Lead-to-rep routing", before: "4.2 days", after: "<45 seconds", direction: "down" },
          { label: "Attribution coverage", before: "12%", after: "100%", direction: "up" },
        ],
      },
      timeframe: "90 days post-launch",
      stack: ["Next.js", "HubSpot CRM", "Clearbit", "Segment", "Vercel"],
      cta_href: "/contact",
    },
    {
      id: "healthcare-platform",
      client_type: "Series C Healthcare Platform",
      industry: "Healthcare",
      size: "Series C · 340 employees",
      stage: "Expanding from single product to platform positioning",
      challenge:
        "The buyer journey was fragmented across three legacy microsites with inconsistent messaging. Enterprise prospects could not self-educate on compliance capabilities. Demo requests required manual triage, and the sales team had no visibility into which content influenced deals.",
      intervention:
        "Consolidated three sites into a unified platform with role-based navigation (CISO, CTO, Clinical Ops). Built compliance evidence pages with gated deep-dive content. Implemented progressive profiling forms, automated lead scoring, and real-time Slack alerts for high-intent visitors.",
      metrics: {
        conversion: [
          { label: "Demo conversions", before: "1.1%", after: "3.8%", direction: "up" },
          { label: "Page-to-MQL rate", before: "2.3%", after: "7.1%", direction: "up" },
          { label: "Content engagement", before: "1.2 pages/visit", after: "4.6 pages/visit", direction: "up" },
        ],
        pipeline: [
          { label: "Enterprise pipeline", before: "$320K/qtr", after: "$890K/qtr", direction: "up" },
          { label: "Deal size (avg)", before: "$45K ACV", after: "$78K ACV", direction: "up" },
          { label: "Sales cycle", before: "92 days", after: "64 days", direction: "down" },
        ],
        operational: [
          { label: "Lead response time", before: "6.5 hours", after: "8 minutes", direction: "down" },
          { label: "Content attribution", before: "None", after: "Full funnel", direction: "up" },
        ],
      },
      timeframe: "120 days post-launch",
      stack: ["Next.js", "Salesforce", "Marketo", "Contentful", "Vercel"],
      cta_href: "/contact",
    },
    {
      id: "enterprise-services",
      client_type: "Global Enterprise Consulting Firm",
      industry: "Enterprise Services",
      size: "1,200+ employees · 6 regions",
      stage: "Digital transformation of client-facing web presence",
      challenge:
        "Eight regional websites with no shared design system, inconsistent brand, and zero cross-region analytics. Each office maintained its own CMS and contact forms. Global leadership had no visibility into web-sourced pipeline, and compliance reviews took 3+ weeks per content update.",
      intervention:
        "Deployed a unified design system with localized content workflows and approval chains. Centralized analytics with region-level dashboards. Built a global lead routing engine that assigns based on geography, service interest, and account tier. Implemented governance workflows reducing content approval from 3 weeks to 48 hours.",
      metrics: {
        conversion: [
          { label: "Avg. conversion rate", before: "0.4%", after: "1.9%", direction: "up" },
          { label: "RFP request rate", before: "0.1%", after: "0.6%", direction: "up" },
          { label: "Bounce rate", before: "64%", after: "38%", direction: "down" },
        ],
        pipeline: [
          { label: "Web-sourced pipeline", before: "$1.2M/yr", after: "$4.8M/yr", direction: "up" },
          { label: "Cross-sell pipeline", before: "$0", after: "$680K/yr", direction: "up" },
          { label: "Avg. engagement value", before: "$85K", after: "$142K", direction: "up" },
        ],
        operational: [
          { label: "Content publish cycle", before: "3 weeks", after: "48 hours", direction: "down" },
          { label: "Regional sites unified", before: "8 separate", after: "1 system", direction: "down" },
        ],
      },
      timeframe: "6 months post-launch (phased rollout)",
      stack: ["Next.js", "Sanity CMS", "HubSpot", "Azure AD", "Vercel"],
      cta_href: "/contact",
    },
    {
      id: "b2b-technology",
      client_type: "Mid-Market B2B Infrastructure Provider",
      industry: "B2B Technology",
      size: "Mid-Market · 85 employees",
      stage: "Transitioning from founder-led sales to scalable inbound",
      challenge:
        "The company had grown to $8M ARR on founder-led sales with minimal web presence. The existing site was a static brochure with a generic contact form. There was no CRM integration, no lead scoring, and the founder personally triaged every inbound inquiry. The team needed to scale pipeline without scaling headcount.",
      intervention:
        "Built a conversion-engineered website with use-case pages targeting three ICP segments. Implemented HubSpot CRM with custom lead scoring, automated routing by segment and intent signals, AI-generated meeting prep briefs for the sales team, and a self-service ROI calculator that captured high-intent leads.",
      metrics: {
        conversion: [
          { label: "Inbound demo rate", before: "0.3%", after: "2.8%", direction: "up" },
          { label: "MQL-to-SQL rate", before: "15%", after: "44%", direction: "up" },
          { label: "ROI calc completions", before: "N/A", after: "340/mo", direction: "up" },
        ],
        pipeline: [
          { label: "Inbound pipeline", before: "$40K/mo", after: "$310K/mo", direction: "up" },
          { label: "CAC (inbound)", before: "$12,400", after: "$3,200", direction: "down" },
          { label: "Founder time on triage", before: "15 hrs/wk", after: "0 hrs/wk", direction: "down" },
        ],
        operational: [
          { label: "Lead routing", before: "Manual (founder)", after: "Automated <2 min", direction: "down" },
          { label: "Meeting prep time", before: "45 min/lead", after: "AI-generated brief", direction: "down" },
        ],
      },
      timeframe: "60 days post-launch",
      stack: ["Next.js", "HubSpot CRM", "OpenAI API", "Stripe", "Vercel"],
      cta_href: "/contact",
    },
  ],
};

const fallbackCta = {
  title: "Your results belong in this library.",
  body: "Book a strategy call to scope your website rebuild and define the metrics that matter. We will map your conversion architecture, timeline, and expected outcomes within 48 hours.",
  primary_cta: { label: "Book a Strategy Call", href: "/contact" },
  secondary_cta: { label: "Download the Full Case Pack", href: "/contact" },
  reassurance: "30-minute call · Scoped roadmap · No obligation",
};

/* ── Helpers ────────────────────────────────────────────────────────── */

function MetricArrow({ direction }: { direction: string }) {
  if (direction === "up") {
    return <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />;
  }
  return <TrendingUp className="h-3.5 w-3.5 rotate-180 text-cyan-400" />;
}

function getCategoryIcon(category: string) {
  switch (category) {
    case "conversion":
      return <BarChart3 className="h-3.5 w-3.5 text-emerald-400" />;
    case "pipeline":
      return <DollarSign className="h-3.5 w-3.5 text-emerald-400" />;
    case "operational":
      return <Zap className="h-3.5 w-3.5 text-emerald-400" />;
    default:
      return <Activity className="h-3.5 w-3.5 text-emerald-400" />;
  }
}

function getCategoryLabel(category: string) {
  switch (category) {
    case "conversion":
      return "Conversion Metrics";
    case "pipeline":
      return "Pipeline & Revenue";
    case "operational":
      return "Operational Impact";
    default:
      return category;
  }
}

/* ── Page Component ─────────────────────────────────────────────────── */

export default async function CaseStudiesPage() {
  const { sectionJson, sectionAttrs } = await loadPortalPageContent(PAGE_KEYS.CASE_STUDIES);
  const hero = sectionJson(SECTION_KEYS.CASE_STUDIES.HERO, fallbackHero);
  const filters = sectionJson(SECTION_KEYS.CASE_STUDIES.FILTERS, fallbackFilters);
  const caseList = sectionJson(SECTION_KEYS.CASE_STUDIES.CASE_LIST, fallbackCaseList);
  const cta = sectionJson(SECTION_KEYS.CASE_STUDIES.CTA, fallbackCta);

  const aggregateMetrics = Array.isArray(hero.aggregate_metrics)
    ? hero.aggregate_metrics
    : fallbackHero.aggregate_metrics;
  const industries = Array.isArray(filters.industries)
    ? filters.industries
    : fallbackFilters.industries;
  const services = Array.isArray(filters.services)
    ? filters.services
    : fallbackFilters.services;
  const sizes = Array.isArray(filters.sizes) ? filters.sizes : fallbackFilters.sizes;
  const caseStudies = Array.isArray(caseList.items)
    ? caseList.items
    : fallbackCaseList.items;

  return (
    <div className="space-y-28 md:space-y-40">
      {/* ═══════ HERO WITH OUTCOMES ═══════ */}
      <section className="pt-8">
        <div className="mx-auto max-w-4xl text-center">
          <p
            className="font-(--font-mono) text-xs uppercase tracking-widest text-emerald-400"
            {...sectionAttrs(SECTION_KEYS.CASE_STUDIES.HERO)}
          >
            {hero.label ?? fallbackHero.label}
          </p>
          <h1
            className="mt-6 font-(--font-display) text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl"
            {...sectionAttrs(SECTION_KEYS.CASE_STUDIES.HERO)}
          >
            {hero.title ?? fallbackHero.title}
          </h1>
          <p
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-400"
            {...sectionAttrs(SECTION_KEYS.CASE_STUDIES.HERO)}
          >
            {hero.body ?? fallbackHero.body}
          </p>

          {/* Aggregate Impact Metrics */}
          <div className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
            {aggregateMetrics.map(
              (
                item: { metric: string; label: string; detail: string },
                index: number,
              ) => {
                const m = item?.metric ?? fallbackHero.aggregate_metrics[index]?.metric;
                const l = item?.label ?? fallbackHero.aggregate_metrics[index]?.label;
                const d = item?.detail ?? fallbackHero.aggregate_metrics[index]?.detail;
                return (
                  <div
                    key={`agg-${index}`}
                    className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-center"
                    {...sectionAttrs(SECTION_KEYS.CASE_STUDIES.HERO)}
                  >
                    <AnimatedMetric
                      as="p"
                      className="metric-display font-(--font-display) text-2xl font-bold text-emerald-400 sm:text-3xl"
                      value={m}
                    />
                    <p className="mt-1 text-sm font-medium text-slate-300">{l}</p>
                    <p className="mt-0.5 font-(--font-mono) text-[10px] text-slate-600">
                      {d}
                    </p>
                  </div>
                );
              },
            )}
          </div>
          <p
            className="mt-4 font-(--font-mono) text-[11px] text-slate-600"
            {...sectionAttrs(SECTION_KEYS.CASE_STUDIES.HERO)}
          >
            {hero.aggregate_note ?? fallbackHero.aggregate_note}
          </p>

          {/* Hero CTAs */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={hero.primary_cta?.href ?? "/contact"}
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/25 transition hover:bg-emerald-500"
              {...sectionAttrs(SECTION_KEYS.CASE_STUDIES.HERO)}
            >
              {hero.primary_cta?.label ?? "Book a Strategy Call"}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={hero.secondary_cta?.href ?? "/contact"}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-300 transition hover:border-slate-600 hover:text-white"
              {...sectionAttrs(SECTION_KEYS.CASE_STUDIES.HERO)}
            >
              {hero.secondary_cta?.label ?? "Download the Full Case Pack"}
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════ FILTERS ═══════ */}
      <section {...sectionAttrs(SECTION_KEYS.CASE_STUDIES.FILTERS)}>
        <div className="flex flex-wrap items-start gap-8">
          {/* Industry */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Building2 className="h-3.5 w-3.5 text-slate-500" />
              <span className="font-(--font-mono) text-[10px] uppercase tracking-wider text-slate-500">
                Industry
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {industries.map((item: string, index: number) => (
                <span
                  key={`ind-${index}`}
                  className="cursor-pointer rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-1.5 font-(--font-mono) text-xs text-slate-400 transition hover:border-emerald-500/30 hover:text-emerald-400"
                >
                  {typeof item === "string" ? item : fallbackFilters.industries[index]}
                </span>
              ))}
            </div>
          </div>

          {/* Service type */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Layers className="h-3.5 w-3.5 text-slate-500" />
              <span className="font-(--font-mono) text-[10px] uppercase tracking-wider text-slate-500">
                Service
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {services.map((item: string, index: number) => (
                <span
                  key={`svc-${index}`}
                  className="cursor-pointer rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-1.5 font-(--font-mono) text-xs text-slate-400 transition hover:border-emerald-500/30 hover:text-emerald-400"
                >
                  {typeof item === "string" ? item : fallbackFilters.services[index]}
                </span>
              ))}
            </div>
          </div>

          {/* Company size */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Filter className="h-3.5 w-3.5 text-slate-500" />
              <span className="font-(--font-mono) text-[10px] uppercase tracking-wider text-slate-500">
                Company Size
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {sizes.map((item: string, index: number) => (
                <span
                  key={`size-${index}`}
                  className="cursor-pointer rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-1.5 font-(--font-mono) text-xs text-slate-400 transition hover:border-emerald-500/30 hover:text-emerald-400"
                >
                  {typeof item === "string" ? item : fallbackFilters.sizes[index]}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ CASE CARDS (EXPANDED DASHBOARD FORMAT) ═══════ */}
      <section className="space-y-16">
        {caseStudies.map((item: typeof fallbackCaseList.items[number], index: number) => {
          const fallback = fallbackCaseList.items[index] ?? fallbackCaseList.items[0];
          const clientType = item?.client_type ?? fallback.client_type;
          const industry = item?.industry ?? fallback.industry;
          const size = item?.size ?? fallback.size;
          const stage = item?.stage ?? fallback.stage;
          const challenge = item?.challenge ?? fallback.challenge;
          const intervention = item?.intervention ?? fallback.intervention;
          const metrics = item?.metrics ?? fallback.metrics;
          const timeframe = item?.timeframe ?? fallback.timeframe;
          const stack = Array.isArray(item?.stack) ? item.stack : fallback.stack;
          const ctaHref = item?.cta_href ?? fallback.cta_href;

          const metricCategories = Object.entries(metrics ?? {}) as [
            string,
            { label: string; before: string; after: string; direction: string }[],
          ][];

          return (
            <article
              key={item?.id ?? `case-${index}`}
              className="overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900/80 to-slate-950"
              {...sectionAttrs(SECTION_KEYS.CASE_STUDIES.CASE_LIST)}
            >
              {/* Case header */}
              <div className="border-b border-slate-800/60 px-8 py-6 md:px-10">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-md bg-emerald-500/10 px-2.5 py-1 font-(--font-mono) text-[10px] uppercase tracking-wider text-emerald-400">
                    {industry}
                  </span>
                  <span className="rounded-md bg-slate-800 px-2.5 py-1 font-(--font-mono) text-[10px] uppercase tracking-wider text-slate-400">
                    {size}
                  </span>
                  <span className="font-(--font-mono) text-[11px] text-slate-600">
                    {timeframe}
                  </span>
                </div>
                <h3 className="mt-4 font-(--font-display) text-xl font-bold text-white sm:text-2xl">
                  {clientType}
                </h3>
                <p className="mt-1 text-sm text-slate-500">{stage}</p>
              </div>

              {/* Challenge + Intervention */}
              <div className="grid gap-0 border-b border-slate-800/60 md:grid-cols-2">
                <div className="border-b border-slate-800/60 px-8 py-6 md:border-b-0 md:border-r md:px-10">
                  <p className="font-(--font-mono) text-[10px] uppercase tracking-wider text-slate-500">
                    Challenge
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">
                    {challenge}
                  </p>
                </div>
                <div className="px-8 py-6 md:px-10">
                  <p className="font-(--font-mono) text-[10px] uppercase tracking-wider text-slate-500">
                    Intervention
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">
                    {intervention}
                  </p>
                </div>
              </div>

              {/* Metrics Dashboard */}
              <div className="px-8 py-8 md:px-10">
                <div className="mb-6 flex items-center gap-2">
                  <Activity className="h-4 w-4 text-emerald-400" />
                  <span className="font-(--font-mono) text-[10px] uppercase tracking-wider text-emerald-400">
                    Measured Outcomes
                  </span>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                  {metricCategories.map(([category, metricItems]) => (
                    <div key={category} className="space-y-3">
                      <div className="flex items-center gap-2 border-b border-slate-800/60 pb-2">
                        {getCategoryIcon(category)}
                        <span className="font-(--font-mono) text-[10px] uppercase tracking-wider text-slate-500">
                          {getCategoryLabel(category)}
                        </span>
                      </div>
                      <div className="space-y-3">
                        {(metricItems ?? []).map(
                          (
                            metric: {
                              label: string;
                              before: string;
                              after: string;
                              direction: string;
                            },
                            mIndex: number,
                          ) => (
                            <div
                              key={`${category}-${mIndex}`}
                              className="rounded-lg border border-slate-800/40 bg-slate-900/40 p-3"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-slate-500">
                                  {metric.label}
                                </span>
                                <MetricArrow direction={metric.direction} />
                              </div>
                              <div className="mt-2 flex items-baseline gap-3">
                                <span className="font-(--font-mono) text-xs text-slate-600 line-through">
                                  {metric.before}
                                </span>
                                <ArrowRight className="h-3 w-3 text-slate-700" />
                                <AnimatedMetric
                                  as="span"
                                  className="metric-display font-(--font-mono) text-lg font-bold text-cyan-400"
                                  value={metric.after}
                                />
                              </div>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stack + CTA footer */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-800/60 px-8 py-5 md:px-10">
                <div className="flex flex-wrap items-center gap-2">
                  <Server className="h-3.5 w-3.5 text-slate-600" />
                  <span className="font-(--font-mono) text-[10px] uppercase tracking-wider text-slate-600">
                    Stack:
                  </span>
                  {stack.map((tech: string, tIndex: number) => (
                    <span
                      key={`stack-${tIndex}`}
                      className="rounded border border-slate-800 bg-slate-900/60 px-2 py-0.5 font-(--font-mono) text-[10px] text-slate-500"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <Link
                  href={ctaHref ?? "/contact"}
                  className="inline-flex items-center gap-2 text-sm font-medium text-emerald-400 transition hover:text-emerald-300"
                >
                  Request full case study
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          );
        })}
      </section>

      {/* ═══════ FINAL CTA ═══════ */}
      <section className="relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-900/40 to-slate-900 p-10 text-center md:p-16">
        <div className="pointer-events-none absolute inset-0 dot-grid opacity-30" />
        <div className="relative">
          <h2
            className="mx-auto max-w-3xl font-(--font-display) text-2xl font-bold tracking-tight text-white sm:text-3xl"
            {...sectionAttrs(SECTION_KEYS.CASE_STUDIES.CTA)}
          >
            {cta.title ?? fallbackCta.title}
          </h2>
          <p
            className="mx-auto mt-4 max-w-xl text-slate-400"
            {...sectionAttrs(SECTION_KEYS.CASE_STUDIES.CTA)}
          >
            {cta.body ?? fallbackCta.body}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={cta.primary_cta?.href ?? "/contact"}
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/25 transition hover:bg-emerald-500"
              {...sectionAttrs(SECTION_KEYS.CASE_STUDIES.CTA)}
            >
              {cta.primary_cta?.label ?? "Book a Strategy Call"}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              href={cta.secondary_cta?.href ?? "/contact"}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-6 py-3 text-sm font-medium text-slate-300 transition hover:border-slate-600 hover:text-white"
              {...sectionAttrs(SECTION_KEYS.CASE_STUDIES.CTA)}
            >
              {cta.secondary_cta?.label ?? "Download the Full Case Pack"}
            </Link>
          </div>
          <p className="mt-6 flex items-center justify-center gap-2 font-(--font-mono) text-xs text-slate-600">
            <Clock className="h-3.5 w-3.5" />
            {cta.reassurance ?? fallbackCta.reassurance}
          </p>
        </div>
      </section>
    </div>
  );
}
