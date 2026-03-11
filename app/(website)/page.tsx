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

import AnimatedMetric from "./components/AnimatedMetric";
import ScrollReveal from "./components/ScrollReveal";

export const metadata: Metadata = {
  title: "Ingenium Revenue Platform | Website, CRM, AI, and Automation",
  description:
    "Ingenium gives revenue teams one system for acquisition, CRM execution, AI agents, and automation so pipeline moves faster and every signal is accountable.",
  openGraph: {
    title: "Ingenium Revenue Platform | Website, CRM, AI, and Automation",
    description:
      "One revenue platform for acquisition, CRM execution, AI agents, and automation - deployed with the team and governance to make it stick.",
    url: "/",
  },
  alternates: { canonical: "/" },
};

/* -- Fallback Content ------------------------------------------------ */

const fallbackHero = {
  label: "Ingenium Revenue Platform",
  title: "Replace disconnected tools with one revenue system that moves buyers to pipeline faster.",
  body: "Ingenium combines your acquisition engine, CRM command layer, AI agents, and automation workflows into one governed platform. We do not just install software. We architect the system, launch it with your team, and keep it compounding.",
  primary_cta: { label: "Book a Platform Strategy Call", href: "/contact" },
  secondary_cta: { label: "Explore the Platform", href: "/platform" },
  proof_metric: "31d",
  proof_label: "average time from kickoff to live revenue workflows",
  badges: ["One customer data layer", "Human-approved AI execution", "Revenue visibility from first touch"],
};

const fallbackMetrics = {
  label: "Representative outcomes from platform launches across growth-stage and enterprise teams",
  items: [
    { metric: "2.7x", label: "Faster pipeline velocity", context: "after full-system rollout" },
    { metric: "<45s", label: "Lead-to-owner routing", context: "with enrichment and context" },
    { metric: "100%", label: "Attribution coverage", context: "from session to CRM record" },
    { metric: "31d", label: "Time to first impact", context: "for launch-ready revenue teams" },
  ],
};

const fallbackIndustries = {
  label: "Built for teams that cannot afford broken handoffs between marketing, sales, and operations",
  items: [
    { name: "B2B SaaS", icon: "zap" },
    { name: "Enterprise Services", icon: "users" },
    { name: "Healthcare Platforms", icon: "shield" },
    { name: "Financial Services", icon: "bar_chart" },
    { name: "Multi-Region GTM Teams", icon: "globe" },
    { name: "RevOps-Led Organizations", icon: "layers" },
  ],
};

const fallbackProblem = {
  label: "Why Teams Switch",
  title: "Most revenue teams are still buying pipeline with a stack that cannot agree on what happened.",
  problems: [
    {
      persona: "Marketing",
      pain: "Traffic rises, but attribution is partial, page journeys are invisible, and campaign proof still depends on spreadsheets.",
      icon: "bar_chart",
    },
    {
      persona: "Sales",
      pain: "Leads arrive late, context is missing, and reps chase records instead of acting on live buyer intent.",
      icon: "users",
    },
    {
      persona: "Technical",
      pain: "Your stack is duct-taped together, workflows are brittle, and no one trusts the underlying data model.",
      icon: "layers",
    },
  ],
};

const fallbackEngine = {
  label: "The Platform",
  title: "A single operating system for revenue execution.",
  body: "Salesforce and HubSpot sell the power of one system of record. Ingenium goes further by combining that shared data model with the implementation layer, the AI execution layer, and the revenue workflows that actually move deals.",
  nodes: [
    { title: "Acquisition Engine", outcome: "Pages, forms, and proof flows built to create qualified intent", href: "/websites", icon: "layout" },
    { title: "CRM Command", outcome: "Shared pipeline truth with routing, ownership, and lifecycle accuracy", href: "/crm", icon: "layers" },
    { title: "AI Agents", outcome: "Research, brief, qualify, and assist with human approval gates", href: "/agents", icon: "sparkles" },
    { title: "Automation Layer", outcome: "Trigger-to-action workflows with SLA enforcement and rollback control", href: "/automations", icon: "workflow" },
    { title: "Trust Layer", outcome: "Security, governance, and auditability across every action", href: "/security", icon: "shield" },
  ],
};

const fallbackProcess = {
  label: "How We Deploy",
  title: "Platform strategy, rollout, and operating rhythm in one engagement.",
  body: "The sale does not stop at the software layer. We define the architecture, launch the system with your team, and establish the measurement model that proves whether it is working.",
  phases: [
    {
      num: "01",
      title: "Revenue Systems Audit",
      timeline: "Week 1",
      deliverables: "Signal map, funnel leak analysis, role requirements, and architecture blueprint",
      owner: "Ingenium leads; your operators pressure-test the model",
    },
    {
      num: "02",
      title: "Build the Core System",
      timeline: "Week 2-4",
      deliverables: "Acquisition journeys, CRM configuration, AI workflows, automations, and dashboards",
      owner: "Ingenium builds; your team approves at structured gates",
    },
    {
      num: "03",
      title: "Launch and Optimize",
      timeline: "Week 5+",
      deliverables: "Go-live, operator training, KPI reviews, experiment backlog, and governance cadence",
      owner: "Joint operating rhythm with weekly decision reviews",
    },
  ],
  first_30_days: {
    title: "Your first 30 days",
    items: [
      "One shared signal model connecting website behavior to CRM action",
      "Role-specific dashboards for marketing, sales, and leadership",
      "Live lead-routing and follow-up workflows with SLA visibility",
      "Governed AI agents operating inside approved tasks",
      "A prioritized growth backlog tied to revenue outcomes",
    ],
  },
};

const fallbackProof = {
  label: "Proof",
  title: "Outcomes from teams that stopped buying isolated fixes.",
  link: { label: "View all revenue platform case studies", href: "/case-studies" },
  items: [
    {
      client_type: "Series B SaaS Company",
      industry: "Fintech",
      challenge: "Traffic was healthy, but CRM routing was manual and leadership had no clean attribution to pipeline.",
      intervention: "Unified acquisition, CRM, and routing system with real-time qualification and accountable reporting.",
      metric: "2.3x",
      metric_label: "Marketing-attributed pipeline",
      timeframe: "90 days",
    },
    {
      client_type: "Healthcare SaaS Platform",
      industry: "Healthcare",
      challenge: "Three disconnected buyer journeys and no way to scale enterprise follow-up without increasing headcount.",
      intervention: "Role-based acquisition paths, governed AI briefs, and automated qualification handoff.",
      metric: "<2m",
      metric_label: "Intent-to-brief turnaround",
      timeframe: "60 days",
    },
    {
      client_type: "Enterprise Services Firm",
      industry: "Professional Services",
      challenge: "Regional websites, inconsistent governance, and no shared pipeline visibility across markets.",
      intervention: "Unified platform with localized journeys, approval workflows, and region-level attribution.",
      metric: "48h",
      metric_label: "Content approval cycle after rollout",
      timeframe: "Across 4 regions",
    },
  ],
};

const fallbackGovernance = {
  label: "Trust and Governance",
  title: "Urgency wins the deal only when trust survives procurement.",
  body: "The platform story is stronger because it is backed by governance. Approval workflows, audit trails, environment separation, and role-based controls sit under every automated or AI-assisted action.",
  link: { label: "Review trust, security, and AI governance", href: "/security" },
  secondary_link: { label: "Request an architecture review", href: "/contact" },
  items: [
    "Shared governance model across website, CRM, AI, and automation",
    "Role-based approvals before sensitive actions or launches",
    "Complete audit trails and execution history",
    "Security review pack and architecture walkthroughs on request",
    "Data handling boundaries designed for regulated buyers",
    "Implementation partner accountability after launch",
  ],
};

const fallbackCta = {
  title: "If your stack is slowing revenue, the fix is not another isolated tool.",
  body: "Book a platform strategy call and we will map how Ingenium can replace disconnected acquisition, CRM, AI, and automation workflows with one accountable operating system.",
  primary_cta: { label: "Book a Platform Strategy Call", href: "/contact" },
  secondary_cta: { label: "Request an Architecture Review", href: "/contact" },
  reassurance: "30-minute call - revenue systems audit - implementation roadmap",
};

/* -- Helpers ---------------------------------------------------------- */

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

/* -- Page Component --------------------------------------------------- */

export default async function HomePage() {
  const hero = fallbackHero;
  const metrics = fallbackMetrics;
  const industries = fallbackIndustries;
  const problem = fallbackProblem;
  const engine = fallbackEngine;
  const process = fallbackProcess;
  const proof = fallbackProof;
  const governance = fallbackGovernance;
  const cta = fallbackCta;
  const industryItems = normalizeIndustryItems(industries.items);

  return (
    <div className="space-y-28 md:space-y-40">
      {/* ======= HERO ======= */}
      <section className="relative pt-8">
        <div className="mx-auto max-w-4xl text-center">
          <p
            className="font-(--font-mono) text-xs uppercase tracking-widest text-emerald-400"
          >
            {hero.label}
          </p>
          <h1
            className="mt-6 font-(--font-display) text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            {hero.title}
          </h1>
          <p
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-400"
          >
            {hero.body}
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={hero.primary_cta?.href ?? "/contact"}
              className="cta-lift inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/25 transition hover:bg-emerald-500 hover:shadow-emerald-500/30"
            >
              {hero.primary_cta?.label ?? "Book a Platform Strategy Call"}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={hero.secondary_cta?.href ?? "#process"}
              className="cta-lift inline-flex items-center gap-2 rounded-lg border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-300 transition hover:border-slate-600 hover:text-white"
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
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              {badge}
            </span>
          ))}
        </div>
      </section>

      {/* ======= METRICS STRIP ======= */}
      <section className="relative rounded-2xl border border-slate-800 bg-slate-900/50 p-8 dot-grid">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {(metrics.items ?? fallbackMetrics.items).map((item: { metric: string; label: string; context?: string }) => (
            <div
              key={item.label}
              className="metric-card rounded-lg border border-slate-800/80 bg-slate-900/55 p-4"
            >
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
        >
          {metrics.label}
        </p>
      </section>

      {/* ======= INDUSTRY TRUST ======= */}
      <section>
        <p
          className="text-center text-sm text-slate-500"
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
                >
                  <Icon className="h-4 w-4 text-slate-500" />
                  <span className="text-sm text-slate-400">{item.name}</span>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* ======= PROBLEM STATEMENT ======= */}
      <section className="rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900/80 to-slate-950 p-8 md:p-12">
        <p
          className="font-(--font-mono) text-xs uppercase tracking-widest text-emerald-400"
        >
          {problem.label}
        </p>
        <h2
          className="mt-4 max-w-3xl font-(--font-display) text-2xl font-bold tracking-tight text-white sm:text-3xl"
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
          >
            See how the acquisition engine solves this
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* ======= CONVERSION ENGINE ======= */}
      <section>
        <div className="text-center">
          <p
            className="font-(--font-mono) text-xs uppercase tracking-widest text-emerald-400"
          >
            {engine.label}
          </p>
          <h2
            className="mt-4 font-(--font-display) text-2xl font-bold tracking-tight text-white sm:text-3xl"
          >
            {engine.title}
          </h2>
          <p
            className="mx-auto mt-4 max-w-2xl text-slate-400"
          >
            {engine.body}
          </p>
        </div>

        {/* System flow - horizontal pipeline */}
        <div className="mt-12 grid gap-3 md:grid-cols-5">
          {(engine.nodes ?? fallbackEngine.nodes).map((node: { title: string; outcome: string; href?: string; icon?: string }, i: number) => {
            const Icon = getIcon(node.icon);
            return (
              <ScrollReveal key={node.title} className="group relative" delayMs={i * 55}>
                <div>
                  <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 transition hover:border-emerald-800/60 hover:bg-slate-900/80">
                    <div className="flex items-center gap-3">
                      <div className="data-flow-dot flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10">
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

      {/* ======= PROCESS ======= */}
      <section id="process">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left: Timeline */}
          <div>
            <p
              className="font-(--font-mono) text-xs uppercase tracking-widest text-emerald-400"
            >
              {process.label}
            </p>
            <h2
              className="mt-4 max-w-lg font-(--font-display) text-2xl font-bold tracking-tight text-white sm:text-3xl"
            >
              {process.title}
            </h2>
            <p
              className="mt-4 text-slate-400"
            >
              {process.body}
            </p>

            {/* Timeline steps */}
            <div className="mt-10 space-y-0">
              {(process.phases ?? fallbackProcess.phases).map((phase: { num: string; title: string; timeline: string; deliverables: string; owner: string }, i: number) => (
                <ScrollReveal key={phase.num} className="timeline-step" delayMs={i * 70}>
                  <div className="relative pl-8">
                    {/* Timeline line */}
                    {i < (process.phases ?? fallbackProcess.phases).length - 1 && (
                      <div className="timeline-line absolute left-[11px] top-8 h-full w-px bg-slate-800" />
                    )}
                    {/* Timeline dot */}
                    <div className="timeline-dot absolute left-0 top-1.5 flex h-6 w-6 items-center justify-center rounded-full border border-emerald-500/30 bg-slate-900">
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
            >
              {process.first_30_days?.title ?? fallbackProcess.first_30_days.title}
            </h3>
            <div className="mt-6 space-y-4">
              {(process.first_30_days?.items ?? fallbackProcess.first_30_days.items).map((item: string, i: number) => (
                <ScrollReveal key={item} delayMs={i * 55}>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                    <span className="text-sm text-slate-300">{item}</span>
                  </div>
                </ScrollReveal>
              ))}
            </div>
            <div className="mt-8">
              <Link
                href="/websites"
                className="cta-lift inline-flex items-center gap-2 text-sm font-medium text-emerald-400 hover:text-emerald-300"
              >
                See the full acquisition engine
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ======= PROOF / CASE SNAPSHOTS ======= */}
      <section>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p
              className="font-(--font-mono) text-xs uppercase tracking-widest text-emerald-400"
            >
              {proof.label}
            </p>
            <h2
              className="mt-4 font-(--font-display) text-2xl font-bold tracking-tight text-white sm:text-3xl"
            >
              {proof.title}
            </h2>
          </div>
          <Link
            href={proof.link?.href ?? "/case-studies"}
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white"
          >
            {proof.link?.label ?? "View all revenue platform case studies"}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {(proof.items ?? fallbackProof.items).map((item: { client_type: string; industry: string; challenge: string; intervention: string; metric: string; metric_label: string; timeframe: string }) => (
            <div
              key={item.client_type}
              className="metric-card group rounded-2xl border border-slate-800 bg-slate-900/40 p-6 transition hover:border-slate-700"
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

      {/* ======= GOVERNANCE ======= */}
      <section className="grid gap-12 lg:grid-cols-[1.1fr,0.9fr]">
        <div>
          <p
            className="font-(--font-mono) text-xs uppercase tracking-widest text-emerald-400"
          >
            {governance.label}
          </p>
          <h2
            className="mt-4 max-w-lg font-(--font-display) text-2xl font-bold tracking-tight text-white sm:text-3xl"
          >
            {governance.title}
          </h2>
          <p
            className="mt-4 text-slate-400"
          >
            {governance.body}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={governance.link?.href ?? "/security"}
              className="inline-flex items-center gap-2 text-sm font-medium text-emerald-400 hover:text-emerald-300"
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
            >
              <Lock className="h-4 w-4 shrink-0 text-emerald-400" />
              <span className="text-sm text-slate-300">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ======= FINAL CTA ======= */}
      <section className="relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-900/40 to-slate-900 p-10 text-center md:p-16">
        <div className="pointer-events-none absolute inset-0 dot-grid opacity-30" />
        <div className="relative">
          <h2
            className="mx-auto max-w-3xl font-(--font-display) text-2xl font-bold tracking-tight text-white sm:text-3xl"
          >
            {cta.title}
          </h2>
          <p
            className="mx-auto mt-4 max-w-xl text-slate-400"
          >
            {cta.body}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={cta.primary_cta?.href ?? "/contact"}
              className="cta-lift inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/25 transition hover:bg-emerald-500"
            >
              {cta.primary_cta?.label ?? "Book a Platform Strategy Call"}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              href={cta.secondary_cta?.href ?? "/contact"}
              className="cta-lift inline-flex items-center gap-2 rounded-lg border border-slate-700 px-6 py-3 text-sm font-medium text-slate-300 transition hover:border-slate-600 hover:text-white"
            >
              {cta.secondary_cta?.label ?? "Request an Architecture Review"}
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
