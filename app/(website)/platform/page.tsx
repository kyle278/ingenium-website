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

import AnimatedMetric from "../components/AnimatedMetric";
import ScrollReveal from "../components/ScrollReveal";

export const metadata: Metadata = {
  title: "Revenue Platform Architecture | Ingenium",
  description:
    "See how Ingenium connects acquisition, CRM execution, AI agents, automation, and governance into one revenue platform for growing teams.",
  openGraph: {
    title: "Revenue Platform Architecture | Ingenium",
    description:
      "One governed revenue platform connecting acquisition, CRM execution, AI agents, automation, and reporting.",
  },
  alternates: { canonical: "/platform" },
};

/* -- Fallback Content ------------------------------------------------ */

const fallbackHero = {
  label: "Revenue Platform Architecture",
  title: "The system your buyers feel, your reps trust, and your operators can finally control.",
  body: "HubSpot and Salesforce win because they promise one source of truth. Ingenium layers execution on top of that promise: the acquisition experience, the CRM operating model, the AI workforce, the automation fabric, and the governance required to run all of it in production.",
  primary_cta: { label: "Book a Platform Review", href: "/contact" },
  secondary_cta: { label: "Explore Platform Modules", href: "#modules" },
  tertiary_cta: { label: "See deployment outcomes", href: "/case-studies" },
  proof_metric: "4.1x",
  proof_label: "increase in operator speed after unified rollout across acquisition, CRM, and workflow layers",
  architecture: {
    label: "System architecture",
    layers: [
      { name: "Acquisition Layer", description: "Buyer journeys, pages, forms, and intent capture", accent: "emerald" },
      { name: "CRM Command Layer", description: "Contacts, lifecycle, ownership, and revenue truth", accent: "cyan" },
      { name: "AI Execution Layer", description: "Research, drafting, qualification, and operator assistance", accent: "emerald" },
      { name: "Automation Layer", description: "Routing, enrichment, escalations, and workflow timing", accent: "cyan" },
    ],
  },
};

const fallbackModules = {
  label: "Platform Modules",
  title: "Five modules designed to remove revenue drag.",
  body: "Every module is valuable alone. The leverage comes from the shared data model and operating rhythm between them.",
  items: [
    {
      title: "Acquisition Engine",
      description:
        "High-conviction buyer journeys, proof-heavy pages, progressive forms, and instrumentation that make demand generation accountable.",
      icon: "globe",
      metric: "2.2x",
      metric_label: "increase in qualified buyer intent",
      link: { label: "See the acquisition engine", href: "/websites" },
    },
    {
      title: "CRM Command",
      description:
        "Lifecycle design, routing logic, attribution, and operator visibility built so the CRM becomes actionable, not administrative.",
      icon: "database",
      metric: "<45s",
      metric_label: "lead-to-owner routing",
      link: { label: "See CRM command capabilities", href: "/crm" },
    },
    {
      title: "AI Agents",
      description:
        "Governed AI operators for research, briefing, drafting, and qualification, all running inside explicit human approval boundaries.",
      icon: "sparkles",
      metric: "90s",
      metric_label: "signal-to-brief turnaround",
      link: { label: "Explore AI agent operations", href: "/agents" },
    },
    {
      title: "Automation Layer",
      description:
        "Lead routing, escalations, follow-up, and internal notifications triggered by real signal, with rollback and observability built in.",
      icon: "workflow",
      metric: "99%",
      metric_label: "reduction in manual handoff lag",
      link: { label: "View automation workflows", href: "/automations" },
    },
    {
      title: "Trust and Measurement",
      description:
        "Attribution, auditability, governance, and reporting that let operators move fast without losing trust or procurement readiness.",
      icon: "chart",
      metric: "100%",
      metric_label: "governed reporting coverage",
      link: { label: "See trust and governance", href: "/security" },
    },
  ],
};

const fallbackRoles = {
  label: "Role-Based Views",
  title: "One platform, different value by operator.",
  body: "The promise is unified. The experience is role-specific. Marketing, sales, RevOps, and leadership each get the control surface they actually need.",
  tabs: [
    {
      role: "Marketing",
      icon: "target",
      headline: "Create demand with proof, speed, and clean attribution.",
      outcomes: [
        "See buyer movement from first visit to qualified pipeline",
        "Launch AI-assisted content inside real brand and approval controls",
        "Run experimentation without breaking reporting fidelity",
        "Show leadership how acquisition is moving revenue, not just traffic",
      ],
      proof: {
        metric: "2.1x",
        label: "marketing-attributed pipeline",
        context: "after unified acquisition + CRM rollout",
      },
    },
    {
      role: "Sales",
      icon: "users",
      headline: "Act on context immediately, not after another handoff.",
      outcomes: [
        "Receive enriched, qualified leads with activity history already attached",
        "Get AI-prepared briefs before outreach or calls",
        "See pipeline stall risk while there is still time to intervene",
        "Trigger follow-up and escalation paths without waiting on ops",
      ],
      proof: {
        metric: "67%",
        label: "faster lead response time",
        context: "after automation + AI brief deployment",
      },
    },
    {
      role: "Revenue Ops",
      icon: "shield",
      headline: "Control the system without becoming the bottleneck.",
      outcomes: [
        "Own the lifecycle model, routing rules, and reporting logic in one place",
        "Audit every AI action, routing event, and deployment change",
        "Maintain governance without slowing the go-to-market team down",
        "Connect the platform to the warehouse and the rest of your stack cleanly",
      ],
      proof: {
        metric: "100%",
        label: "audit trail coverage",
        context: "across AI, CRM, and workflow execution",
      },
    },
  ],
};

const fallbackIntegrations = {
  label: "Integration Architecture",
  title: "Fits into the stack you already have to justify.",
  body: "Ingenium is designed to connect to the tools already inside your buying committee, while replacing the fragmented operating logic between them.",
  patterns: [
    {
      name: "HubSpot",
      flow: "Use HubSpot as the CRM system of record while Ingenium owns acquisition journeys, workflow timing, AI execution, and richer attribution context.",
      category: "CRM",
    },
    {
      name: "Salesforce",
      flow: "Keep Salesforce at the center of opportunity management while Ingenium upgrades the signal, routing, briefing, and orchestration layer around it.",
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
    title: "Security and compliance stay attached to every connection.",
    body: "Approvals, audit logs, and documented data handling guard every integration so your security team can say yes faster.",
    items: [
      "Data encryption in transit and at rest",
      "Role-based access with granular permissions",
      "Complete audit logs for every data sync",
    ],
    link: { label: "Review security and AI governance controls", href: "/security" },
  },
};

const fallbackCta = {
  title: "The fastest way to grow is to stop making your team work around a fragmented system.",
  body: "Book a platform review and we will map your current stack, identify the highest-friction revenue handoffs, and show how Ingenium would replace them with one governed operating model.",
  primary_cta: { label: "Book a Platform Review", href: "/contact" },
  secondary_cta: { label: "Request an Architecture Review", href: "/contact" },
  reassurance: "30-minute call - current-state teardown - architecture recommendation",
};

/* -- Helpers ---------------------------------------------------------- */

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

function pickText(value: unknown, fallback: string) {
  return typeof value === "string" && value.trim().length > 0 ? value : fallback;
}

function normalizeModuleItem(
  item: unknown,
  fallback: (typeof fallbackModules.items)[number],
) {
  const record = item && typeof item === "object" ? (item as Record<string, unknown>) : {};
  const linkRecord =
    record.link && typeof record.link === "object"
      ? (record.link as Record<string, unknown>)
      : {};

  return {
    title: pickText(record.title, fallback.title),
    description: pickText(record.description, fallback.description),
    icon: pickText(record.icon, fallback.icon),
    metric: pickText(record.metric, fallback.metric),
    metric_label: pickText(record.metric_label, fallback.metric_label),
    link: {
      label: pickText(linkRecord.label, fallback.link.label),
      href: pickText(linkRecord.href, fallback.link.href),
    },
  };
}

/* -- Page Component --------------------------------------------------- */

export default async function PlatformPage() {
  const hero = fallbackHero;
  const modules = fallbackModules;
  const roles = fallbackRoles;
  const integrations = fallbackIntegrations;
  const cta = fallbackCta;
  const rawModuleItems =
    modules.items && Array.isArray(modules.items) ? modules.items : [];
  const moduleItems = fallbackModules.items.map((fallbackItem, index) =>
    normalizeModuleItem(rawModuleItems[index], fallbackItem),
  );

  return (
    <div className="space-y-28 md:space-y-40">
      {/* ======= HERO ======= */}
      <section className="pt-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr,0.9fr]">
          <div>
            <p
              className="font-(--font-mono) text-xs uppercase tracking-widest text-emerald-400"
            >
              {hero.label}
            </p>
            <h1
              className="mt-6 font-(--font-display) text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl"
            >
              {hero.title}
            </h1>
            <p
              className="mt-6 max-w-xl text-lg leading-relaxed text-slate-400"
            >
              {hero.body}
            </p>

            {/* Three-tier CTA ladder */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href={hero.primary_cta?.href ?? "/contact"}
                className="cta-lift inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/25 transition hover:bg-emerald-500"
              >
                {hero.primary_cta?.label ?? "Book a Platform Strategy Call"}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={hero.secondary_cta?.href ?? "#modules"}
                className="cta-lift inline-flex items-center gap-2 rounded-lg border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-300 transition hover:border-slate-600 hover:text-white"
              >
                {hero.secondary_cta?.label ?? "Explore Platform Modules"}
              </Link>
              <Link
                href={hero.tertiary_cta?.href ?? "/case-studies"}
                className="cta-lift inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition hover:text-slate-300"
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
                      <ScrollReveal key={signal} delayMs={i * 45} direction="left">
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
                        <ScrollReveal key={layer.name} delayMs={i * 70} className="timeline-step">
                          <div className="relative pl-9">
                            <span className={`timeline-dot data-flow-dot absolute left-0 top-4 flex h-8 w-8 items-center justify-center rounded-lg border ${accentClasses}`}>
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
                      <ScrollReveal key={output} delayMs={i * 45 + 70} direction="right">
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

      {/* ======= MODULES ======= */}
      <section id="modules">
        <div className="text-center">
          <p
            className="font-(--font-mono) text-xs uppercase tracking-widest text-emerald-400"
          >
            {modules.label}
          </p>
          <h2
            className="mt-4 font-(--font-display) text-2xl font-bold tracking-tight text-white sm:text-3xl"
          >
            {modules.title}
          </h2>
          <p
            className="mx-auto mt-4 max-w-2xl text-slate-400"
          >
            {modules.body}
          </p>
        </div>

        <div className="mt-12 space-y-4">
          {/* First row: 2 large cards */}
          <div className="grid gap-4 lg:grid-cols-2">
            {moduleItems
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
                      className={`metric-card relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/40 p-6 ${bgClass}`}
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
            {moduleItems
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
                      className={`metric-card relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/40 p-6 ${bgVariants[i] ?? ""}`}
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

      {/* ======= ROLE-BASED VIEWS ======= */}
      <section className="rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900/80 to-slate-950 p-8 md:p-12">
        <div className="text-center">
          <p
            className="font-(--font-mono) text-xs uppercase tracking-widest text-emerald-400"
          >
            {roles.label}
          </p>
          <h2
            className="mt-4 font-(--font-display) text-2xl font-bold tracking-tight text-white sm:text-3xl"
          >
            {roles.title}
          </h2>
          <p
            className="mx-auto mt-4 max-w-2xl text-slate-400"
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
                  className={`metric-card rounded-xl border ${borderAccent} bg-slate-900/60 p-6`}
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

      {/* ======= INTEGRATIONS ======= */}
      <section className="grid gap-12 lg:grid-cols-[1.1fr,0.9fr]">
        <div>
          <p
            className="font-(--font-mono) text-xs uppercase tracking-widest text-emerald-400"
          >
            {integrations.label}
          </p>
          <h2
            className="mt-4 max-w-lg font-(--font-display) text-2xl font-bold tracking-tight text-white sm:text-3xl"
          >
            {integrations.title}
          </h2>
          <p
            className="mt-4 max-w-lg text-slate-400"
          >
            {integrations.body}
          </p>

          <div className="mt-8 space-y-4">
            {(integrations.patterns ?? fallbackIntegrations.patterns).map(
              (pattern: { name: string; flow: string; category: string }) => (
                <div
                  key={pattern.name}
                  className="rounded-xl border border-slate-800 bg-slate-900/40 p-4"
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
            className="cta-lift mt-6 inline-flex items-center gap-2 text-sm font-medium text-emerald-400 transition hover:text-emerald-300"
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
                  <span className="data-flow-dot flex h-5 w-5 items-center justify-center rounded font-(--font-mono) text-[9px] font-bold text-cyan-400 bg-cyan-500/10">
                    {i + 1}
                  </span>
                  <span className="text-xs text-slate-500">{step}</span>
                </div>
              ))}
            </div>
          </div>
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
          <p className="mt-6 flex items-center justify-center gap-2 font-(--font-mono) text-xs text-slate-600">
            <Clock className="h-3.5 w-3.5" />
            {cta.reassurance ?? fallbackCta.reassurance}
          </p>
        </div>
      </section>
    </div>
  );
}
