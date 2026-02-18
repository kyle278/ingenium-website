import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronRight,
  LayoutPanelTop,
  LineChart,
  Lock,
  Sparkles,
  Workflow,
  Layers,
  Shield,
  Zap,
  BarChart3,
  Globe,
  Users,
} from "lucide-react";

import { PAGE_KEYS, SECTION_KEYS } from "@/src/lib/content-map";
import { loadPortalPageContent } from "@/src/lib/portal-page-content";
import AnimatedMetric from "./components/AnimatedMetric";
import ScrollReveal from "./components/ScrollReveal";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Enterprise Web Design Agency | Ingenium",
  description:
    "Ingenium is the enterprise web design agency that builds conversion systems - website, CRM, AI agents, and automation - to grow your pipeline.",
  openGraph: {
    title: "Enterprise Web Design Agency | Ingenium",
    description:
      "Ingenium is the enterprise web design agency that builds conversion systems for measurable pipeline growth.",
    url: "/",
  },
  alternates: { canonical: "/" },
};

/* ── Fallback Content ──────────────────────────────────────────────── */

const fallbackHero = {
  label: "Enterprise Web Design Agency",
  title: "We build enterprise websites that generate pipeline.",
  body: "Ingenium is the enterprise web design agency that builds conversion systems — website, CRM, AI agents, and automation — so your pipeline compounds week after week.",
  primary_cta: { label: "Book a Strategy Call", href: "/contact" },
  secondary_cta: { label: "See How It Works", href: "#process" },
  proof_metric: "47%",
  proof_label: "conversion lift for a Series B SaaS company in 90 days",
  badges: ["4–6 week launch", "Full pipeline attribution", "AI-powered operations"],
};

const fallbackMetrics = {
  label: "Average across 12 enterprise engagements, 2024–2025",
  items: [
    { metric: "47%", label: "Conversion lift", context: "avg. across enterprise clients" },
    { metric: "4–6 wks", label: "Strategy to launch", context: "full system deployment" },
    { metric: "100%", label: "Pipeline attribution", context: "end-to-end tracking" },
    { metric: "<60s", label: "Lead response time", context: "automated routing + context" },
  ],
};

const fallbackIndustries = {
  label: "Trusted by growth and enterprise teams across industries",
  items: [
    { name: "Series B–D SaaS", icon: "zap" },
    { name: "Enterprise Financial Services", icon: "bar_chart" },
    { name: "Healthcare Platforms", icon: "shield" },
    { name: "B2B Technology", icon: "globe" },
    { name: "Professional Services", icon: "users" },
    { name: "Enterprise IT Teams", icon: "layers" },
  ],
};

const fallbackProblem = {
  label: "The Problem",
  title: "Your website generates traffic. But can you prove which campaigns drive revenue?",
  problems: [
    {
      persona: "Marketing",
      pain: "Your website generates traffic but you can't prove which campaigns drive revenue.",
      icon: "bar_chart",
    },
    {
      persona: "Sales",
      pain: "Leads arrive late, unqualified, and without context. Reps waste hours on dead ends.",
      icon: "users",
    },
    {
      persona: "Technical",
      pain: "Your stack is duct-taped together and no one owns the data model.",
      icon: "layers",
    },
  ],
};

const fallbackEngine = {
  label: "The Conversion Engine",
  title: "A unified system, not a collection of tools.",
  body: "Your website is the front door. The Ingenium platform keeps it converting — CRM, AI agents, and automations working as one system.",
  nodes: [
    { title: "Website", outcome: "Conversion-first design that captures intent", href: "/websites", icon: "layout" },
    { title: "CRM", outcome: "Unified pipeline data with smart routing", href: "/crm", icon: "layers" },
    { title: "AI Agents", outcome: "Research, qualify, and brief in seconds", href: "/agents", icon: "sparkles" },
    { title: "Automations", outcome: "Trigger-to-action in under 60 seconds", href: "/automations", icon: "workflow" },
    { title: "Analytics", outcome: "Full-funnel attribution and dashboards", href: "/platform", icon: "line_chart" },
  ],
};

const fallbackProcess = {
  label: "How We Work",
  title: "A proven path from strategy to scale.",
  body: "We align strategy, design, and execution so you see measurable conversion wins within weeks, not quarters.",
  phases: [
    {
      num: "01",
      title: "Discovery & Strategy",
      timeline: "Week 1–2",
      deliverables: "Conversion audit, messaging architecture, KPI framework, technical requirements",
      owner: "Ingenium leads, your team validates",
    },
    {
      num: "02",
      title: "Design & Build",
      timeline: "Week 3–4",
      deliverables: "Design system, page builds, CRM integration, analytics instrumentation",
      owner: "Ingenium builds, your team reviews at gates",
    },
    {
      num: "03",
      title: "Launch & Optimise",
      timeline: "Week 5–6",
      deliverables: "Go-live, AI agent deployment, automation workflows, first optimisation cycle",
      owner: "Joint ownership with weekly reporting",
    },
  ],
  first_30_days: {
    title: "Your first 30 days",
    items: [
      "Conversion blueprint with 12+ page-level hypotheses",
      "Design system and component library deployed",
      "Analytics instrumentation with attribution dashboards live",
      "AI operations roadmap for the next 90 days",
      "First A/B test live and generating data",
    ],
  },
};

const fallbackProof = {
  label: "Proof",
  title: "Outcomes from enterprise teams like yours.",
  link: { label: "View all enterprise website case studies", href: "/case-studies" },
  items: [
    {
      client_type: "Series B SaaS Company",
      industry: "Fintech",
      challenge: "Website generating traffic but less than 1% converting to demo requests.",
      intervention: "Full website rebuild with conversion architecture, CRM integration, and automated lead routing.",
      metric: "+47%",
      metric_label: "Conversion to qualified pipeline",
      timeframe: "90 days",
    },
    {
      client_type: "Healthcare SaaS Platform",
      industry: "Healthcare",
      challenge: "Generic website with no role-based messaging. Sales team manually qualifying every lead.",
      intervention: "Role-based page system with AI-assisted SDR briefs and automated follow-up sequences.",
      metric: "2.3x",
      metric_label: "Demo conversions",
      timeframe: "60 days",
    },
    {
      client_type: "Enterprise Services Firm",
      industry: "Professional Services",
      challenge: "4 regional websites with inconsistent messaging and no governance model.",
      intervention: "Unified platform with localised pages, approval workflows, and centralised analytics.",
      metric: "6 weeks",
      metric_label: "Strategy to full launch",
      timeframe: "Across 4 regions",
    },
  ],
};

const fallbackGovernance = {
  label: "Enterprise Governance",
  title: "Security and governance built into every layer.",
  body: "Approval workflows, audit trails, and role-based controls keep every update accountable — from content changes to AI agent outputs.",
  link: { label: "Review enterprise security and AI governance", href: "/security" },
  secondary_link: { label: "Request security review pack", href: "/contact" },
  items: [
    "SSO / SAML access controls",
    "Role-based approval workflows",
    "Complete audit trails and activity logs",
    "Data residency and sovereignty options",
    "Vendor risk documentation on request",
    "SOC 2 readiness framework",
  ],
};

const fallbackCta = {
  title: "Ready to build a website that drives pipeline?",
  body: "Book a strategy call and get a tailored conversion roadmap within 48 hours. No commitment required.",
  primary_cta: { label: "Book a Strategy Call", href: "/contact" },
  secondary_cta: { label: "Download Enterprise Website Checklist", href: "/contact" },
  reassurance: "30-minute call · Tailored roadmap · No obligation",
};

/* ── Helpers ────────────────────────────────────────────────────────── */

function getIcon(iconName: string | undefined) {
  switch (iconName) {
    case "layers": return Layers;
    case "sparkles": return Sparkles;
    case "workflow": return Workflow;
    case "line_chart": return LineChart;
    case "bar_chart": return BarChart3;
    case "shield": return Shield;
    case "zap": return Zap;
    case "globe": return Globe;
    case "users": return Users;
    default: return LayoutPanelTop;
  }
}

type IndustryTrustItem = {
  name: string;
  icon: string;
};

function normalizeIndustryItems(items: unknown): IndustryTrustItem[] {
  if (!Array.isArray(items)) {
    return fallbackIndustries.items;
  }

  const normalized = items
    .map((item, index) => {
      const fallbackItem = fallbackIndustries.items[index % fallbackIndustries.items.length];

      if (typeof item === "string") {
        const name = item.trim();
        if (!name) {
          return null;
        }
        return { name, icon: fallbackItem.icon };
      }

      if (item && typeof item === "object") {
        const record = item as Record<string, unknown>;
        const possibleName =
          typeof record.name === "string"
            ? record.name
            : typeof record.label === "string"
              ? record.label
              : typeof record.title === "string"
                ? record.title
                : "";
        const name = possibleName.trim();
        if (!name) {
          return null;
        }
        return {
          name,
          icon:
            typeof record.icon === "string" && record.icon.trim().length > 0
              ? record.icon
              : fallbackItem.icon,
        };
      }

      return null;
    })
    .filter((item): item is IndustryTrustItem => Boolean(item));

  return normalized.length > 0 ? normalized : fallbackIndustries.items;
}

/* ── Page Component ─────────────────────────────────────────────────── */

export default async function HomePage() {
  const { sectionJson, sectionAttrs } = await loadPortalPageContent(PAGE_KEYS.HOME);
  const hero = sectionJson(SECTION_KEYS.HOME.HERO, fallbackHero);
  const metrics = sectionJson(SECTION_KEYS.HOME.OUTCOMES, fallbackMetrics);
  const industries = sectionJson(SECTION_KEYS.HOME.INDUSTRIES, fallbackIndustries);
  const problem = sectionJson(SECTION_KEYS.HOME.PROBLEM, fallbackProblem);
  const engine = sectionJson(SECTION_KEYS.HOME.SYSTEM, fallbackEngine);
  const process = sectionJson(SECTION_KEYS.HOME.PROCESS, fallbackProcess);
  const proof = sectionJson(SECTION_KEYS.HOME.PROOF, fallbackProof);
  const governance = sectionJson(SECTION_KEYS.HOME.SECURITY, fallbackGovernance);
  const cta = sectionJson(SECTION_KEYS.HOME.CTA, fallbackCta);
  const industryItems = normalizeIndustryItems(industries.items);

  return (
    <div className="space-y-28 md:space-y-40">
      {/* ═══════ HERO ═══════ */}
      <section className="relative pt-8">
        <div className="mx-auto max-w-4xl text-center">
          <p
            className="font-(--font-mono) text-xs uppercase tracking-widest text-emerald-400"
            {...sectionAttrs(SECTION_KEYS.HOME.HERO)}
          >
            {hero.label}
          </p>
          <h1
            className="mt-6 font-(--font-display) text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl"
            {...sectionAttrs(SECTION_KEYS.HOME.HERO)}
          >
            {hero.title}
          </h1>
          <p
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-400"
            {...sectionAttrs(SECTION_KEYS.HOME.HERO)}
          >
            {hero.body}
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={hero.primary_cta?.href ?? "/contact"}
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/25 transition hover:bg-emerald-500 hover:shadow-emerald-500/30"
              {...sectionAttrs(SECTION_KEYS.HOME.HERO)}
            >
              {hero.primary_cta?.label ?? "Book a Strategy Call"}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={hero.secondary_cta?.href ?? "#process"}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-300 transition hover:border-slate-600 hover:text-white"
              {...sectionAttrs(SECTION_KEYS.HOME.HERO)}
            >
              {hero.secondary_cta?.label ?? "See How It Works"}
            </Link>
          </div>

          {/* Proof indicator */}
          <div className="mt-10 inline-flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/60 px-5 py-3">
            <AnimatedMetric
              as="span"
              className="metric-display text-3xl font-bold text-emerald-400"
              value={hero.proof_metric ?? fallbackHero.proof_metric}
            />
            <span className="text-left text-sm text-slate-400">
              {hero.proof_label ?? fallbackHero.proof_label}
            </span>
          </div>
        </div>

        {/* Badge strip */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          {(hero.badges ?? fallbackHero.badges).map((badge: string) => (
            <span
              key={badge}
              className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/50 px-4 py-2 text-xs text-slate-400"
              {...sectionAttrs(SECTION_KEYS.HOME.HERO)}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              {badge}
            </span>
          ))}
        </div>
      </section>

      {/* ═══════ METRICS STRIP ═══════ */}
      <section className="relative rounded-2xl border border-slate-800 bg-slate-900/50 p-8 dot-grid">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {(metrics.items ?? fallbackMetrics.items).map((item: { metric: string; label: string; context?: string }) => (
            <div key={item.label} {...sectionAttrs(SECTION_KEYS.HOME.OUTCOMES)}>
              <AnimatedMetric
                as="p"
                className="metric-display text-3xl font-bold text-white"
                value={item.metric}
                delayMs={40}
              />
              <p className="mt-1 text-sm font-medium text-slate-300">{item.label}</p>
              {item.context && (
                <p className="mt-1 font-(--font-mono) text-[11px] text-slate-600">{item.context}</p>
              )}
            </div>
          ))}
        </div>
        <p
          className="mt-8 border-t border-slate-800 pt-4 font-(--font-mono) text-[11px] text-slate-600"
          {...sectionAttrs(SECTION_KEYS.HOME.OUTCOMES)}
        >
          {metrics.label}
        </p>
      </section>

      {/* ═══════ INDUSTRY TRUST ═══════ */}
      <section>
        <p
          className="text-center text-sm text-slate-500"
          {...sectionAttrs(SECTION_KEYS.HOME.INDUSTRIES)}
        >
          {industries.label}
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          {industryItems.map((item, index) => {
            const Icon = getIcon(item.icon);
            return (
              <ScrollReveal key={`${item.name}-${index}`} delayMs={index * 40}>
                <div
                  className="flex items-center gap-2.5 rounded-lg border border-slate-800 bg-slate-900/40 px-4 py-2.5"
                  {...sectionAttrs(SECTION_KEYS.HOME.INDUSTRIES)}
                >
                  <Icon className="h-4 w-4 text-slate-500" />
                  <span className="text-sm text-slate-400">{item.name}</span>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* ═══════ PROBLEM STATEMENT ═══════ */}
      <section className="rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900/80 to-slate-950 p-8 md:p-12">
        <p
          className="font-(--font-mono) text-xs uppercase tracking-widest text-emerald-400"
          {...sectionAttrs(SECTION_KEYS.HOME.PROBLEM)}
        >
          {problem.label}
        </p>
        <h2
          className="mt-4 max-w-3xl font-(--font-display) text-2xl font-bold tracking-tight text-white sm:text-3xl"
          {...sectionAttrs(SECTION_KEYS.HOME.PROBLEM)}
        >
          {problem.title}
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {(problem.problems ?? fallbackProblem.problems).map((item: { persona: string; pain: string; icon?: string }) => {
            const Icon = getIcon(item.icon);
            return (
              <div
                key={item.persona}
                className="rounded-xl border border-slate-800 bg-slate-900/50 p-6"
                {...sectionAttrs(SECTION_KEYS.HOME.PROBLEM)}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800">
                    <Icon className="h-4 w-4 text-slate-400" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    {item.persona}
                  </span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-slate-400">{item.pain}</p>
              </div>
            );
          })}
        </div>
        <div className="mt-8">
          <Link
            href="/websites"
            className="inline-flex items-center gap-2 text-sm font-medium text-emerald-400 transition hover:text-emerald-300"
            {...sectionAttrs(SECTION_KEYS.HOME.PROBLEM)}
          >
            See how our enterprise website redesign services solve this
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* ═══════ CONVERSION ENGINE ═══════ */}
      <section>
        <div className="text-center">
          <p
            className="font-(--font-mono) text-xs uppercase tracking-widest text-emerald-400"
            {...sectionAttrs(SECTION_KEYS.HOME.SYSTEM)}
          >
            {engine.label}
          </p>
          <h2
            className="mt-4 font-(--font-display) text-2xl font-bold tracking-tight text-white sm:text-3xl"
            {...sectionAttrs(SECTION_KEYS.HOME.SYSTEM)}
          >
            {engine.title}
          </h2>
          <p
            className="mx-auto mt-4 max-w-2xl text-slate-400"
            {...sectionAttrs(SECTION_KEYS.HOME.SYSTEM)}
          >
            {engine.body}
          </p>
        </div>

        {/* System flow — horizontal pipeline */}
        <div className="mt-12 grid gap-3 md:grid-cols-5">
          {(engine.nodes ?? fallbackEngine.nodes).map((node: { title: string; outcome: string; href?: string; icon?: string }, i: number) => {
            const Icon = getIcon(node.icon);
            return (
              <ScrollReveal key={node.title} className="group relative" delayMs={i * 55}>
                <div {...sectionAttrs(SECTION_KEYS.HOME.SYSTEM)}>
                  <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 transition hover:border-emerald-800/60 hover:bg-slate-900/80">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10">
                        <Icon className="h-4 w-4 text-emerald-400" />
                      </div>
                      <span className="font-(--font-mono) text-[10px] text-slate-600">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="mt-3 text-sm font-semibold text-white">{node.title}</h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-slate-500">{node.outcome}</p>
                    {node.href && (
                      <Link href={node.href} className="mt-3 inline-flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300">
                        Learn more <ArrowRight className="h-3 w-3" />
                      </Link>
                    )}
                  </div>
                  {i < (engine.nodes ?? fallbackEngine.nodes).length - 1 && (
                    <div className="absolute right-0 top-1/2 hidden h-px w-3 -translate-y-1/2 translate-x-full bg-slate-800 md:block" />
                  )}
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* ═══════ PROCESS ═══════ */}
      <section id="process">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left: Timeline */}
          <div>
            <p
              className="font-(--font-mono) text-xs uppercase tracking-widest text-emerald-400"
              {...sectionAttrs(SECTION_KEYS.HOME.PROCESS)}
            >
              {process.label}
            </p>
            <h2
              className="mt-4 max-w-lg font-(--font-display) text-2xl font-bold tracking-tight text-white sm:text-3xl"
              {...sectionAttrs(SECTION_KEYS.HOME.PROCESS)}
            >
              {process.title}
            </h2>
            <p
              className="mt-4 text-slate-400"
              {...sectionAttrs(SECTION_KEYS.HOME.PROCESS)}
            >
              {process.body}
            </p>

            {/* Timeline steps */}
            <div className="mt-10 space-y-0">
              {(process.phases ?? fallbackProcess.phases).map((phase: { num: string; title: string; timeline: string; deliverables: string; owner: string }, i: number) => (
                <ScrollReveal key={phase.num} delayMs={i * 70}>
                  <div className="relative pl-8" {...sectionAttrs(SECTION_KEYS.HOME.PROCESS)}>
                    {/* Timeline line */}
                    {i < (process.phases ?? fallbackProcess.phases).length - 1 && (
                      <div className="absolute left-[11px] top-8 h-full w-px bg-slate-800" />
                    )}
                    {/* Timeline dot */}
                    <div className="absolute left-0 top-1.5 flex h-6 w-6 items-center justify-center rounded-full border border-emerald-500/30 bg-slate-900">
                      <div className="h-2 w-2 rounded-full bg-emerald-500" />
                    </div>
                    <div className="pb-8">
                      <div className="flex items-center gap-3">
                        <h3 className="text-base font-semibold text-white">{phase.title}</h3>
                        <span className="font-(--font-mono) text-[11px] text-emerald-400">{phase.timeline}</span>
                      </div>
                      <p className="mt-2 text-sm text-slate-400">{phase.deliverables}</p>
                      <p className="mt-1 font-(--font-mono) text-[11px] text-slate-600">{phase.owner}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Right: First 30 days card */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8">
            <p className="font-(--font-mono) text-xs uppercase tracking-widest text-cyan-400">First 30 Days</p>
            <h3
              className="mt-4 font-(--font-display) text-xl font-bold text-white"
              {...sectionAttrs(SECTION_KEYS.HOME.PROCESS)}
            >
              {process.first_30_days?.title ?? fallbackProcess.first_30_days.title}
            </h3>
            <div className="mt-6 space-y-4">
              {(process.first_30_days?.items ?? fallbackProcess.first_30_days.items).map((item: string, i: number) => (
                <ScrollReveal key={item} delayMs={i * 55}>
                  <div className="flex items-start gap-3" {...sectionAttrs(SECTION_KEYS.HOME.PROCESS)}>
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                    <span className="text-sm text-slate-300">{item}</span>
                  </div>
                </ScrollReveal>
              ))}
            </div>
            <div className="mt-8">
              <Link
                href="/websites"
                className="inline-flex items-center gap-2 text-sm font-medium text-emerald-400 hover:text-emerald-300"
              >
                See full enterprise website redesign services
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ PROOF / CASE SNAPSHOTS ═══════ */}
      <section>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p
              className="font-(--font-mono) text-xs uppercase tracking-widest text-emerald-400"
              {...sectionAttrs(SECTION_KEYS.HOME.PROOF)}
            >
              {proof.label}
            </p>
            <h2
              className="mt-4 font-(--font-display) text-2xl font-bold tracking-tight text-white sm:text-3xl"
              {...sectionAttrs(SECTION_KEYS.HOME.PROOF)}
            >
              {proof.title}
            </h2>
          </div>
          <Link
            href={proof.link?.href ?? "/case-studies"}
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white"
            {...sectionAttrs(SECTION_KEYS.HOME.PROOF)}
          >
            {proof.link?.label ?? "View all enterprise website case studies"}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {(proof.items ?? fallbackProof.items).map((item: { client_type: string; industry: string; challenge: string; intervention: string; metric: string; metric_label: string; timeframe: string }) => (
            <div
              key={item.client_type}
              className="group rounded-2xl border border-slate-800 bg-slate-900/40 p-6 transition hover:border-slate-700"
              {...sectionAttrs(SECTION_KEYS.HOME.PROOF)}
            >
              <div className="flex items-center justify-between">
                <span className="rounded-md bg-slate-800 px-2.5 py-1 font-(--font-mono) text-[10px] uppercase tracking-wider text-slate-400">
                  {item.industry}
                </span>
                <span className="font-(--font-mono) text-[11px] text-slate-600">{item.timeframe}</span>
              </div>
              <AnimatedMetric
                as="p"
                className="metric-display mt-5 text-4xl font-bold text-emerald-400"
                value={item.metric}
              />
              <p className="mt-1 text-sm font-medium text-white">{item.metric_label}</p>
              <div className="mt-4 border-t border-slate-800 pt-4">
                <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Client</p>
                <p className="mt-1 text-sm text-slate-300">{item.client_type}</p>
                <p className="mt-3 text-xs font-medium uppercase tracking-wider text-slate-500">Challenge</p>
                <p className="mt-1 text-sm text-slate-400">{item.challenge}</p>
                <p className="mt-3 text-xs font-medium uppercase tracking-wider text-slate-500">Intervention</p>
                <p className="mt-1 text-sm text-slate-400">{item.intervention}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════ GOVERNANCE ═══════ */}
      <section className="grid gap-12 lg:grid-cols-[1.1fr,0.9fr]">
        <div>
          <p
            className="font-(--font-mono) text-xs uppercase tracking-widest text-emerald-400"
            {...sectionAttrs(SECTION_KEYS.HOME.SECURITY)}
          >
            {governance.label}
          </p>
          <h2
            className="mt-4 max-w-lg font-(--font-display) text-2xl font-bold tracking-tight text-white sm:text-3xl"
            {...sectionAttrs(SECTION_KEYS.HOME.SECURITY)}
          >
            {governance.title}
          </h2>
          <p
            className="mt-4 text-slate-400"
            {...sectionAttrs(SECTION_KEYS.HOME.SECURITY)}
          >
            {governance.body}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={governance.link?.href ?? "/security"}
              className="inline-flex items-center gap-2 text-sm font-medium text-emerald-400 hover:text-emerald-300"
              {...sectionAttrs(SECTION_KEYS.HOME.SECURITY)}
            >
              {governance.link?.label ?? "Review enterprise security and AI governance"}
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-3">
            <Link
              href={governance.secondary_link?.href ?? "/contact"}
              className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-300"
            >
              {governance.secondary_link?.label ?? "Request security review pack"}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {(governance.items ?? fallbackGovernance.items).map((item: string) => (
            <div
              key={item}
              className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/40 px-4 py-3"
              {...sectionAttrs(SECTION_KEYS.HOME.SECURITY)}
            >
              <Lock className="h-4 w-4 shrink-0 text-emerald-400" />
              <span className="text-sm text-slate-300">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════ FINAL CTA ═══════ */}
      <section className="relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-900/40 to-slate-900 p-10 text-center md:p-16">
        <div className="pointer-events-none absolute inset-0 dot-grid opacity-30" />
        <div className="relative">
          <h2
            className="mx-auto max-w-3xl font-(--font-display) text-2xl font-bold tracking-tight text-white sm:text-3xl"
            {...sectionAttrs(SECTION_KEYS.HOME.CTA)}
          >
            {cta.title}
          </h2>
          <p
            className="mx-auto mt-4 max-w-xl text-slate-400"
            {...sectionAttrs(SECTION_KEYS.HOME.CTA)}
          >
            {cta.body}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={cta.primary_cta?.href ?? "/contact"}
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/25 transition hover:bg-emerald-500"
              {...sectionAttrs(SECTION_KEYS.HOME.CTA)}
            >
              {cta.primary_cta?.label ?? "Book a Strategy Call"}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              href={cta.secondary_cta?.href ?? "/contact"}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-6 py-3 text-sm font-medium text-slate-300 transition hover:border-slate-600 hover:text-white"
              {...sectionAttrs(SECTION_KEYS.HOME.CTA)}
            >
              {cta.secondary_cta?.label ?? "Download Enterprise Website Checklist"}
            </Link>
          </div>
          <p className="mt-6 font-(--font-mono) text-xs text-slate-600">
            {cta.reassurance ?? fallbackCta.reassurance}
          </p>
        </div>
      </section>
    </div>
  );
}
