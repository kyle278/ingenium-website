import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  Clock,
  Database,
  Globe,
  Layers,
  MonitorDot,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Workflow,
} from "lucide-react";

import { PAGE_KEYS, SECTION_KEYS } from "@/src/lib/content-map";
import { loadPortalPageContent } from "@/src/lib/portal-page-content";
import AnimatedMetric from "../components/AnimatedMetric";
import ScrollReveal from "../components/ScrollReveal";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Website + CRM + AI Platform for Revenue Teams | Ingenium",
  description:
    "One platform connecting your website, CRM, AI agents, and automations. Built for revenue teams who need pipeline visibility and control.",
  openGraph: {
    title: "Website + CRM + AI Platform for Revenue Teams | Ingenium",
    description:
      "One platform connecting your website, CRM, AI agents, and automations. Built for revenue teams who need pipeline visibility and control.",
  },
  alternates: { canonical: "/platform" },
};

/* ── Fallback Content ──────────────────────────────────────────────── */

const fallbackHero = {
  label: "Website CRM AI Platform",
  title: "One platform connecting your website, CRM, AI agents, and automations.",
  body: "Revenue teams lose pipeline when their tools are disconnected. Ingenium unifies website performance, CRM intelligence, AI execution, and workflow automation into a single system — so every interaction is tracked, every lead is routed, and every decision is backed by data.",
  primary_cta: { label: "Book a Strategy Call", href: "/contact" },
  secondary_cta: { label: "Explore Platform Modules", href: "#modules" },
  tertiary_cta: { label: "See case study results", href: "/case-studies" },
  proof_metric: "3.2x",
  proof_label: "pipeline velocity increase for a mid-market SaaS company after platform deployment",
  architecture: {
    label: "System architecture",
    layers: [
      { name: "Website Layer", description: "Conversion pages, forms, analytics", accent: "emerald" },
      { name: "CRM Layer", description: "Contacts, deals, pipeline, attribution", accent: "cyan" },
      { name: "AI Layer", description: "Agents, departments, governance", accent: "emerald" },
      { name: "Automation Layer", description: "Routing, enrichment, workflows", accent: "cyan" },
    ],
  },
};

const fallbackModules = {
  label: "Platform Modules",
  title: "Five systems engineered to operate as one.",
  body: "Each module handles a distinct function. Together, they create a closed-loop revenue system where data flows without manual intervention.",
  items: [
    {
      title: "Website Engine",
      description:
        "Conversion-optimised pages with built-in analytics, A/B testing, and progressive lead capture. Every visitor interaction feeds directly into your CRM.",
      icon: "globe",
      metric: "38%",
      metric_label: "avg. increase in qualified demo requests",
      link: { label: "Explore website redesign services", href: "/websites" },
    },
    {
      title: "CRM Foundation",
      description:
        "Unified contact records, pipeline tracking, lifecycle stages, and end-to-end attribution. The single source of truth for every revenue conversation.",
      icon: "database",
      metric: "<45s",
      metric_label: "lead-to-rep routing time",
      link: { label: "See CRM integration capabilities", href: "/crm" },
    },
    {
      title: "AI Agents",
      description:
        "Specialised agents for research, content, qualification, and follow-up. Each agent operates within governance controls with human-in-the-loop checkpoints.",
      icon: "sparkles",
      metric: "4x",
      metric_label: "content output without added headcount",
      link: { label: "Explore AI agent capabilities", href: "/agents" },
    },
    {
      title: "Automations",
      description:
        "Lead routing, data enrichment, follow-up sequences, and alert workflows. Triggered by behaviour signals, not arbitrary timers.",
      icon: "workflow",
      metric: "62%",
      metric_label: "reduction in manual data entry",
      link: { label: "View automation workflows", href: "/automations" },
    },
    {
      title: "Analytics & Attribution",
      description:
        "First-touch to closed-won attribution, funnel analysis, and performance dashboards. Know exactly which channels, pages, and campaigns drive revenue.",
      icon: "chart",
      metric: "100%",
      metric_label: "pipeline attribution coverage",
      link: { label: "See platform analytics in action", href: "/case-studies" },
    },
  ],
};

const fallbackRoles = {
  label: "Role-Based Views",
  title: "One platform, tailored for every team.",
  body: "Marketing, sales, and technical teams each see what matters most — without the noise of irrelevant data or controls.",
  tabs: [
    {
      role: "Marketing",
      icon: "target",
      headline: "Launch faster. Prove ROI. Scale content.",
      outcomes: [
        "Website analytics with conversion attribution by campaign and channel",
        "AI-assisted content creation with brand governance and approval workflows",
        "A/B testing framework with automated winner deployment",
        "Pipeline contribution dashboards showing marketing-sourced revenue",
      ],
      proof: {
        metric: "2.1x",
        label: "marketing-attributed pipeline",
        context: "Series B SaaS, 90 days post-launch",
      },
    },
    {
      role: "Sales",
      icon: "users",
      headline: "Full context on every lead. Faster follow-up.",
      outcomes: [
        "Lead routing with firmographic enrichment delivered in under 60 seconds",
        "Account intelligence briefs generated by AI agents before every call",
        "Pipeline visibility with deal velocity tracking and risk alerts",
        "Automated follow-up sequences triggered by engagement signals",
      ],
      proof: {
        metric: "67%",
        label: "faster lead response time",
        context: "Mid-market technology company",
      },
    },
    {
      role: "Technical",
      icon: "shield",
      headline: "Governance, audit trails, and enterprise controls.",
      outcomes: [
        "Role-based access controls with SSO and SCIM provisioning",
        "Complete audit logs for every AI action, content change, and workflow execution",
        "SOC 2-ready infrastructure with compliance documentation",
        "API-first architecture for custom integrations and data warehouse connections",
      ],
      proof: {
        metric: "100%",
        label: "audit trail coverage",
        context: "Enterprise compliance requirement met",
      },
    },
  ],
};

const fallbackIntegrations = {
  label: "Integration Architecture",
  title: "Connects to your stack without a rip-and-replace.",
  body: "The platform integrates natively with major CRM, marketing automation, and data systems. Data flows bidirectionally so your existing tools stay in sync.",
  patterns: [
    {
      name: "HubSpot",
      flow: "Bidirectional sync of contacts, deals, and engagement data. Website form submissions create CRM records with full attribution context.",
      category: "CRM",
    },
    {
      name: "Salesforce",
      flow: "Native integration with leads, opportunities, and custom objects. Pipeline attribution mapped from first website touch to closed-won.",
      category: "CRM",
    },
    {
      name: "Marketing Automation",
      flow: "Marketo, Pardot, and HubSpot Marketing Hub. Behavioural triggers from website interactions feed nurture campaigns and lead scoring models.",
      category: "Automation",
    },
    {
      name: "Data Warehouse",
      flow: "Snowflake, BigQuery, and Redshift connectors. Unified data model for cross-platform reporting and custom analytics.",
      category: "Analytics",
    },
    {
      name: "Identity & Security",
      flow: "Okta, Azure AD, and Google Workspace SSO. SCIM provisioning for automated user lifecycle management.",
      category: "Security",
    },
    {
      name: "Communication",
      flow: "Slack and Teams notifications for lead alerts, workflow completions, and AI agent outputs. Real-time visibility without context-switching.",
      category: "Productivity",
    },
  ],
  governance_card: {
    label: "Enterprise Governance",
    title: "Security and compliance built into every integration.",
    body: "Approval workflows, audit trails, and data handling policies govern every connection. Your security team maintains full visibility.",
    items: [
      "Data encryption in transit and at rest",
      "Role-based access with granular permissions",
      "Complete audit logs for every data sync",
    ],
    link: { label: "Review security and AI governance controls", href: "/security" },
  },
};

const fallbackCta = {
  title: "Ready to unify your website, CRM, and AI operations?",
  body: "Book a strategy call to map your platform architecture, integration requirements, and rollout plan. Or request an architecture review to see how your current stack compares.",
  primary_cta: { label: "Book a Strategy Call", href: "/contact" },
  secondary_cta: { label: "Request an Architecture Review", href: "/contact" },
  reassurance: "30-minute call · Custom architecture diagram · No obligation",
};

/* ── Helpers ────────────────────────────────────────────────────────── */

function getModuleIcon(iconName: string | undefined) {
  switch (iconName) {
    case "globe":
      return Globe;
    case "database":
      return Database;
    case "sparkles":
      return Sparkles;
    case "workflow":
      return Workflow;
    case "chart":
      return BarChart3;
    default:
      return Layers;
  }
}

function getRoleIcon(iconName: string | undefined) {
  switch (iconName) {
    case "target":
      return Target;
    case "users":
      return Users;
    case "shield":
      return ShieldCheck;
    default:
      return MonitorDot;
  }
}

function getCategoryColor(category: string) {
  switch (category) {
    case "CRM":
      return "text-emerald-400 border-emerald-500/20 bg-emerald-950/40";
    case "Automation":
      return "text-cyan-400 border-cyan-500/20 bg-cyan-950/40";
    case "Analytics":
      return "text-emerald-400 border-emerald-500/20 bg-emerald-950/40";
    case "Security":
      return "text-cyan-400 border-cyan-500/20 bg-cyan-950/40";
    case "Productivity":
      return "text-emerald-400 border-emerald-500/20 bg-emerald-950/40";
    default:
      return "text-slate-400 border-slate-700 bg-slate-800/40";
  }
}

function getArchitectureLayerIcon(layerName: string, index: number) {
  const normalized = layerName.toLowerCase();

  if (normalized.includes("website")) {
    return Globe;
  }

  if (normalized.includes("crm")) {
    return Database;
  }

  if (normalized.includes("ai")) {
    return Sparkles;
  }

  if (normalized.includes("automation")) {
    return Workflow;
  }

  if (normalized.includes("analytic")) {
    return BarChart3;
  }

  return index % 2 === 0 ? Layers : MonitorDot;
}

/* ── Page Component ─────────────────────────────────────────────────── */

export default async function PlatformPage() {
  const { sectionJson, sectionAttrs } = await loadPortalPageContent(PAGE_KEYS.PLATFORM);
  const hero = sectionJson(SECTION_KEYS.PLATFORM.HERO, fallbackHero);
  const modules = sectionJson(SECTION_KEYS.PLATFORM.MODULES, fallbackModules);
  const roles = sectionJson(SECTION_KEYS.PLATFORM.ROLES, fallbackRoles);
  const integrations = sectionJson(SECTION_KEYS.PLATFORM.INTEGRATIONS, fallbackIntegrations);
  const cta = sectionJson(SECTION_KEYS.PLATFORM.CTA, fallbackCta);

  return (
    <div className="space-y-28 md:space-y-40">
      {/* ═══════ HERO ═══════ */}
      <section className="pt-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr,0.9fr]">
          <div>
            <p
              className="font-(--font-mono) text-xs uppercase tracking-widest text-emerald-400"
              {...sectionAttrs(SECTION_KEYS.PLATFORM.HERO)}
            >
              {hero.label}
            </p>
            <h1
              className="mt-6 font-(--font-display) text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl"
              {...sectionAttrs(SECTION_KEYS.PLATFORM.HERO)}
            >
              {hero.title}
            </h1>
            <p
              className="mt-6 max-w-xl text-lg leading-relaxed text-slate-400"
              {...sectionAttrs(SECTION_KEYS.PLATFORM.HERO)}
            >
              {hero.body}
            </p>

            {/* Three-tier CTA ladder */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href={hero.primary_cta?.href ?? "/contact"}
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/25 transition hover:bg-emerald-500"
                {...sectionAttrs(SECTION_KEYS.PLATFORM.HERO)}
              >
                {hero.primary_cta?.label ?? "Book a Strategy Call"}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={hero.secondary_cta?.href ?? "#modules"}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-300 transition hover:border-slate-600 hover:text-white"
                {...sectionAttrs(SECTION_KEYS.PLATFORM.HERO)}
              >
                {hero.secondary_cta?.label ?? "Explore Platform Modules"}
              </Link>
              <Link
                href={hero.tertiary_cta?.href ?? "/case-studies"}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition hover:text-slate-300"
                {...sectionAttrs(SECTION_KEYS.PLATFORM.HERO)}
              >
                {hero.tertiary_cta?.label ?? "See case study results"}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Proof element */}
            <div className="mt-10 inline-flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/60 px-5 py-3">
              <AnimatedMetric
                as="span"
                className="metric-display font-(--font-mono) text-3xl font-bold text-emerald-400"
                value={hero.proof_metric ?? fallbackHero.proof_metric}
              />
              <span className="text-left text-sm text-slate-400">
                {hero.proof_label ?? fallbackHero.proof_label}
              </span>
            </div>
          </div>

          {/* System architecture visual */}
          <div
            className="relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/40 p-6 dot-grid"
            {...sectionAttrs(SECTION_KEYS.PLATFORM.HERO)}
          >
            <div className="flex items-center justify-between gap-3">
              <p className="font-(--font-mono) text-[10px] uppercase tracking-wider text-slate-600">
                {hero.architecture?.label ?? fallbackHero.architecture.label}
              </p>
              <span className="rounded-full border border-slate-700 bg-slate-950/70 px-2.5 py-1 font-(--font-mono) text-[10px] text-slate-500">
                Real-time data sync
              </span>
            </div>

            <div className="mt-5 grid gap-4 lg:grid-cols-[0.95fr,1.25fr,0.95fr]">
              <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-3">
                <p className="font-(--font-mono) text-[10px] uppercase tracking-wider text-cyan-400">
                  Input Signals
                </p>
                <div className="mt-3 space-y-2">
                  {["Website sessions", "Form intent", "Campaign touchpoints", "Product usage events"].map(
                    (signal, i) => (
                      <ScrollReveal key={signal} delayMs={i * 45}>
                        <div className="rounded-md border border-slate-800 bg-slate-900/80 px-2.5 py-1.5 text-xs text-slate-300">
                          {signal}
                        </div>
                      </ScrollReveal>
                    ),
                  )}
                </div>
              </div>

              <div className="relative">
                <div className="pointer-events-none absolute left-4 top-4 bottom-4 w-px bg-gradient-to-b from-emerald-500/40 via-cyan-500/30 to-emerald-500/40" />
                <div className="space-y-3">
                  {(hero.architecture?.layers ?? fallbackHero.architecture.layers).map(
                    (layer: { name: string; description: string; accent: string }, i: number) => {
                      const LayerIcon = getArchitectureLayerIcon(layer.name, i);
                      const accentClasses =
                        layer.accent === "cyan"
                          ? "border-cyan-500/20 bg-cyan-950/20 text-cyan-400"
                          : "border-emerald-500/20 bg-emerald-950/20 text-emerald-400";

                      return (
                        <ScrollReveal key={layer.name} delayMs={i * 70}>
                          <div className="relative pl-9">
                            <span className={`absolute left-0 top-4 flex h-8 w-8 items-center justify-center rounded-lg border ${accentClasses}`}>
                              <LayerIcon className="h-4 w-4" />
                            </span>
                            <div className={`rounded-lg border p-3 ${accentClasses.replace("text-cyan-400", "").replace("text-emerald-400", "")}`}>
                              <div className="flex items-center justify-between gap-3">
                                <span className="text-sm font-semibold text-white">{layer.name}</span>
                                <span className="font-(--font-mono) text-[10px] text-slate-500">
                                  {String(i + 1).padStart(2, "0")}
                                </span>
                              </div>
                              <p className="mt-1.5 text-xs leading-relaxed text-slate-400">{layer.description}</p>
                            </div>
                          </div>
                        </ScrollReveal>
                      );
                    },
                  )}
                </div>
              </div>

              <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-3">
                <p className="font-(--font-mono) text-[10px] uppercase tracking-wider text-emerald-400">
                  Activation Outputs
                </p>
                <div className="mt-3 space-y-2">
                  {["Routed leads", "SDR briefs", "SLA alerts", "Revenue dashboards"].map(
                    (output, i) => (
                      <ScrollReveal key={output} delayMs={i * 45 + 70}>
                        <div className="rounded-md border border-slate-800 bg-slate-900/80 px-2.5 py-1.5 text-xs text-slate-300">
                          {output}
                        </div>
                      </ScrollReveal>
                    ),
                  )}
                </div>
              </div>
            </div>

            <ScrollReveal delayMs={220}>
              <div className="mt-4 rounded-lg border border-slate-800 bg-slate-950/60 p-3 text-center">
                <p className="font-(--font-mono) text-[10px] uppercase tracking-wider text-emerald-400">
                  Unified Data Layer
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Shared schema, event bus, and attribution model across all modules
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══════ MODULES ═══════ */}
      <section id="modules">
        <div className="text-center">
          <p
            className="font-(--font-mono) text-xs uppercase tracking-widest text-emerald-400"
            {...sectionAttrs(SECTION_KEYS.PLATFORM.MODULES)}
          >
            {modules.label}
          </p>
          <h2
            className="mt-4 font-(--font-display) text-2xl font-bold tracking-tight text-white sm:text-3xl"
            {...sectionAttrs(SECTION_KEYS.PLATFORM.MODULES)}
          >
            {modules.title}
          </h2>
          <p
            className="mx-auto mt-4 max-w-2xl text-slate-400"
            {...sectionAttrs(SECTION_KEYS.PLATFORM.MODULES)}
          >
            {modules.body}
          </p>
        </div>

        <div className="mt-12 space-y-4">
          {/* First row: 2 large cards */}
          <div className="grid gap-4 lg:grid-cols-2">
            {(modules.items ?? fallbackModules.items)
              .slice(0, 2)
              .map(
                (
                  item: {
                    title: string;
                    description: string;
                    icon?: string;
                    metric?: string;
                    metric_label?: string;
                    link?: { label: string; href: string };
                  },
                  i: number,
                ) => {
                  const Icon = getModuleIcon(item.icon);
                  const bgClass = i === 0 ? "dot-grid" : "grid-lines";
                  return (
                    <div
                      key={item.title}
                      className={`relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/40 p-6 ${bgClass}`}
                      {...sectionAttrs(SECTION_KEYS.PLATFORM.MODULES)}
                    >
                      <div className="relative">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
                            <Icon className="h-5 w-5 text-emerald-400" />
                          </div>
                          <h3 className="font-(--font-display) text-lg font-bold text-white">
                            {item.title}
                          </h3>
                        </div>
                        <p className="mt-3 text-sm leading-relaxed text-slate-400">
                          {item.description}
                        </p>
                        <div className="mt-4 flex items-end justify-between">
                          <div className="rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-2">
                            <AnimatedMetric
                              as="span"
                              className="metric-display font-(--font-mono) text-xl font-bold text-emerald-400"
                              value={item.metric ?? "0"}
                            />
                            <p className="mt-0.5 text-[10px] text-slate-500">{item.metric_label}</p>
                          </div>
                          {item.link && (
                            <Link
                              href={item.link.href}
                              className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-400 transition hover:text-emerald-300"
                            >
                              {item.link.label}
                              <ArrowRight className="h-3.5 w-3.5" />
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                },
              )}
          </div>

          {/* Second row: 3 compact cards */}
          <div className="grid gap-4 md:grid-cols-3">
            {(modules.items ?? fallbackModules.items)
              .slice(2)
              .map(
                (
                  item: {
                    title: string;
                    description: string;
                    icon?: string;
                    metric?: string;
                    metric_label?: string;
                    link?: { label: string; href: string };
                  },
                  i: number,
                ) => {
                  const Icon = getModuleIcon(item.icon);
                  const bgVariants = ["", "glass-card", "dot-grid"];
                  return (
                    <div
                      key={item.title}
                      className={`relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/40 p-6 ${bgVariants[i] ?? ""}`}
                      {...sectionAttrs(SECTION_KEYS.PLATFORM.MODULES)}
                    >
                      <div className="relative">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
                          <Icon className="h-5 w-5 text-emerald-400" />
                        </div>
                        <h3 className="mt-4 font-(--font-display) text-base font-bold text-white">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-slate-400">
                          {item.description}
                        </p>
                        <div className="mt-4 rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-2">
                          <AnimatedMetric
                            as="span"
                            className="metric-display font-(--font-mono) text-xl font-bold text-cyan-400"
                            value={item.metric ?? "0"}
                          />
                          <p className="mt-0.5 text-[10px] text-slate-500">{item.metric_label}</p>
                        </div>
                        {item.link && (
                          <Link
                            href={item.link.href}
                            className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-emerald-400 transition hover:text-emerald-300"
                          >
                            {item.link.label}
                            <ArrowRight className="h-3.5 w-3.5" />
                          </Link>
                        )}
                      </div>
                    </div>
                  );
                },
              )}
          </div>
        </div>
      </section>

      {/* ═══════ ROLE-BASED VIEWS ═══════ */}
      <section className="rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900/80 to-slate-950 p-8 md:p-12">
        <div className="text-center">
          <p
            className="font-(--font-mono) text-xs uppercase tracking-widest text-emerald-400"
            {...sectionAttrs(SECTION_KEYS.PLATFORM.ROLES)}
          >
            {roles.label}
          </p>
          <h2
            className="mt-4 font-(--font-display) text-2xl font-bold tracking-tight text-white sm:text-3xl"
            {...sectionAttrs(SECTION_KEYS.PLATFORM.ROLES)}
          >
            {roles.title}
          </h2>
          <p
            className="mx-auto mt-4 max-w-2xl text-slate-400"
            {...sectionAttrs(SECTION_KEYS.PLATFORM.ROLES)}
          >
            {roles.body}
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {(roles.tabs ?? fallbackRoles.tabs).map(
            (
              tab: {
                role: string;
                icon?: string;
                headline: string;
                outcomes: string[];
                proof: { metric: string; label: string; context: string };
              },
              i: number,
            ) => {
              const Icon = getRoleIcon(tab.icon);
              const borderAccent =
                i === 1 ? "border-cyan-500/20" : "border-emerald-500/20";
              return (
                <div
                  key={tab.role}
                  className={`rounded-xl border ${borderAccent} bg-slate-900/60 p-6`}
                  {...sectionAttrs(SECTION_KEYS.PLATFORM.ROLES)}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                        i === 1 ? "bg-cyan-500/10" : "bg-emerald-500/10"
                      }`}
                    >
                      <Icon className={`h-4.5 w-4.5 ${i === 1 ? "text-cyan-400" : "text-emerald-400"}`} />
                    </div>
                    <span className="font-(--font-mono) text-xs uppercase tracking-wider text-slate-500">
                      {tab.role}
                    </span>
                  </div>

                  <h3 className="mt-4 font-(--font-display) text-base font-bold text-white">
                    {tab.headline}
                  </h3>

                  <div className="mt-4 space-y-3">
                    {tab.outcomes.map((outcome: string) => (
                      <div key={outcome} className="flex items-start gap-2.5">
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                        <span className="text-sm leading-relaxed text-slate-400">{outcome}</span>
                      </div>
                    ))}
                  </div>

                  {/* Role-specific proof */}
                  <div className="mt-6 rounded-lg border border-slate-800 bg-slate-950/60 p-3">
                    <AnimatedMetric
                      as="span"
                      className="metric-display font-(--font-mono) text-2xl font-bold text-emerald-400"
                      value={tab.proof.metric}
                    />
                    <p className="mt-1 text-xs text-slate-400">{tab.proof.label}</p>
                    <p className="mt-0.5 font-(--font-mono) text-[10px] text-slate-600">
                      {tab.proof.context}
                    </p>
                  </div>
                </div>
              );
            },
          )}
        </div>
      </section>

      {/* ═══════ INTEGRATIONS ═══════ */}
      <section className="grid gap-12 lg:grid-cols-[1.1fr,0.9fr]">
        <div>
          <p
            className="font-(--font-mono) text-xs uppercase tracking-widest text-emerald-400"
            {...sectionAttrs(SECTION_KEYS.PLATFORM.INTEGRATIONS)}
          >
            {integrations.label}
          </p>
          <h2
            className="mt-4 max-w-lg font-(--font-display) text-2xl font-bold tracking-tight text-white sm:text-3xl"
            {...sectionAttrs(SECTION_KEYS.PLATFORM.INTEGRATIONS)}
          >
            {integrations.title}
          </h2>
          <p
            className="mt-4 max-w-lg text-slate-400"
            {...sectionAttrs(SECTION_KEYS.PLATFORM.INTEGRATIONS)}
          >
            {integrations.body}
          </p>

          <div className="mt-8 space-y-4">
            {(integrations.patterns ?? fallbackIntegrations.patterns).map(
              (pattern: { name: string; flow: string; category: string }) => (
                <div
                  key={pattern.name}
                  className="rounded-xl border border-slate-800 bg-slate-900/40 p-4"
                  {...sectionAttrs(SECTION_KEYS.PLATFORM.INTEGRATIONS)}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-white">{pattern.name}</h3>
                    <span
                      className={`rounded-md border px-2 py-0.5 font-(--font-mono) text-[10px] uppercase tracking-wider ${getCategoryColor(pattern.category)}`}
                    >
                      {pattern.category}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">{pattern.flow}</p>
                </div>
              ),
            )}
          </div>
        </div>

        {/* Governance sidebar */}
        <div
          className="rounded-2xl border border-emerald-500/20 bg-emerald-950/20 p-8"
          {...sectionAttrs(SECTION_KEYS.PLATFORM.INTEGRATIONS)}
        >
          <span className="inline-flex items-center rounded-md border border-emerald-500/20 bg-emerald-950/40 px-2.5 py-1 font-(--font-mono) text-[10px] uppercase tracking-wider text-emerald-400">
            {integrations.governance_card?.label ?? fallbackIntegrations.governance_card.label}
          </span>
          <h3 className="mt-4 font-(--font-display) text-xl font-bold text-white">
            {integrations.governance_card?.title ?? fallbackIntegrations.governance_card.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-400">
            {integrations.governance_card?.body ?? fallbackIntegrations.governance_card.body}
          </p>
          <div className="mt-6 space-y-3">
            {(
              integrations.governance_card?.items ?? fallbackIntegrations.governance_card.items
            ).map((item: string) => (
              <div key={item} className="flex items-center gap-3">
                <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-400" />
                <span className="text-sm text-slate-300">{item}</span>
              </div>
            ))}
          </div>
          <Link
            href={
              integrations.governance_card?.link?.href ??
              fallbackIntegrations.governance_card.link.href
            }
            className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-emerald-400 transition hover:text-emerald-300"
          >
            {integrations.governance_card?.link?.label ??
              fallbackIntegrations.governance_card.link.label}
            <ArrowRight className="h-4 w-4" />
          </Link>

          {/* Data flow visual */}
          <div className="mt-8 rounded-lg border border-slate-800 bg-slate-950/60 p-4">
            <p className="font-(--font-mono) text-[10px] uppercase tracking-wider text-cyan-400">
              Data flow
            </p>
            <div className="mt-3 space-y-2">
              {[
                "Website event captured",
                "Lead enriched + scored",
                "CRM record created",
                "Workflow triggered",
                "Rep notified with context",
              ].map((step, i) => (
                <div key={step} className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded font-(--font-mono) text-[9px] font-bold text-cyan-400 bg-cyan-500/10">
                    {i + 1}
                  </span>
                  <span className="text-xs text-slate-500">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ FINAL CTA ═══════ */}
      <section className="relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-900/40 to-slate-900 p-10 text-center md:p-16">
        <div className="pointer-events-none absolute inset-0 dot-grid opacity-30" />
        <div className="relative">
          <h2
            className="mx-auto max-w-3xl font-(--font-display) text-2xl font-bold tracking-tight text-white sm:text-3xl"
            {...sectionAttrs(SECTION_KEYS.PLATFORM.CTA)}
          >
            {cta.title}
          </h2>
          <p
            className="mx-auto mt-4 max-w-xl text-slate-400"
            {...sectionAttrs(SECTION_KEYS.PLATFORM.CTA)}
          >
            {cta.body}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={cta.primary_cta?.href ?? "/contact"}
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/25 transition hover:bg-emerald-500"
              {...sectionAttrs(SECTION_KEYS.PLATFORM.CTA)}
            >
              {cta.primary_cta?.label ?? "Book a Strategy Call"}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              href={cta.secondary_cta?.href ?? "/contact"}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-6 py-3 text-sm font-medium text-slate-300 transition hover:border-slate-600 hover:text-white"
              {...sectionAttrs(SECTION_KEYS.PLATFORM.CTA)}
            >
              {cta.secondary_cta?.label ?? "Request an Architecture Review"}
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
