import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
  Crown,
  GitBranch,
  Layers,
  Network,
  Shield,
  ShieldCheck,
  TrendingUp,
  Users,
} from "lucide-react";

import { PAGE_KEYS, SECTION_KEYS } from "@/src/lib/content-map";
import { loadPortalPageContent } from "@/src/lib/portal-page-content";
import AnimatedMetric from "../components/AnimatedMetric";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "AI Departments for Revenue Teams | Ingenium",
  description:
    "Structure AI operations into governed departments with human oversight. Scale automation without losing control of quality or compliance.",
  openGraph: {
    title: "AI Departments for Revenue Teams | Ingenium",
    description:
      "Structure AI operations into governed departments with measurable KPIs, human oversight, and escalation controls.",
    url: "/departments",
  },
  alternates: { canonical: "/departments" },
};

/* ── Fallback Content ──────────────────────────────────────────────── */

const fallbackHero = {
  label: "AI Departments",
  title: "The operating model for scaling AI safely.",
  body: "Move beyond single agents. Deploy governed AI departments that run entire business functions — with human leaders, escalation paths, and measurable KPIs at every level.",
  primary_cta: { label: "Book a Strategy Call", href: "/contact" },
  secondary_cta: { label: "See the Implementation Blueprint", href: "/platform" },
  org_chart: {
    label: "Department blueprint",
    badge: "Human-governed",
    root: "Revenue Operations",
    branches: [
      { name: "Marketing Ops", agents: 4, oversight: "VP Marketing" },
      { name: "Sales Ops", agents: 3, oversight: "VP Sales" },
      { name: "Customer Success", agents: 3, oversight: "CS Director" },
      { name: "Growth Ops", agents: 2, oversight: "Growth Lead" },
    ],
    note: "Each department reports to a human leader with full escalation authority.",
  },
};

const fallbackOutcomes = {
  label: "Outcomes by Department",
  title: "Every department is measured by the KPIs that matter to your business.",
  body: "Departments are not experiments. Each one ships with defined metrics, reporting cadences, and improvement targets.",
  departments: [
    {
      name: "Marketing Operations",
      kpis: [
        { metric: "3.2x", label: "Content throughput" },
        { metric: "41%", label: "Campaign conversion lift" },
        { metric: "<4hr", label: "Brief-to-draft cycle" },
      ],
      focus: "Campaign execution, content production, and conversion testing at scale.",
    },
    {
      name: "Sales Operations",
      kpis: [
        { metric: "<60s", label: "Lead response time" },
        { metric: "94%", label: "Pipeline hygiene score" },
        { metric: "2.1x", label: "Follow-up completion" },
      ],
      focus: "Lead routing, pipeline hygiene, and automated follow-up playbooks.",
    },
    {
      name: "Customer Success",
      kpis: [
        { metric: "87%", label: "Health score accuracy" },
        { metric: "23%", label: "Churn reduction" },
        { metric: "100%", label: "Renewal prep coverage" },
      ],
      focus: "Health scoring, renewal readiness, and churn prevention workflows.",
    },
    {
      name: "Growth Ops",
      kpis: [
        { metric: "12x", label: "Experiment velocity" },
        { metric: "34%", label: "Funnel diagnostics lift" },
        { metric: "<1hr", label: "Signal-to-action time" },
      ],
      focus: "Experiment design, funnel diagnostics, and demand generation signals.",
    },
  ],
};

const fallbackGovernance = {
  label: "Human Control",
  title: "Your team stays in command at every level.",
  body: "AI departments execute fast, but humans set the rules, approve high-stakes actions, and override any decision in real time. This is the strongest trust layer in enterprise AI.",
  escalation_flow: {
    label: "Escalation flow",
    steps: [
      { stage: "Agent Action", description: "AI executes within approved playbook scope", risk: "Low" },
      { stage: "Threshold Check", description: "Action exceeds defined risk or spend threshold", risk: "Medium" },
      { stage: "Manager Review", description: "Department manager reviews flagged action", risk: "High" },
      { stage: "Human Override", description: "Leader approves, modifies, or rejects in real time", risk: "Resolved" },
    ],
  },
  override_examples: [
    "Sales agent pauses outreach to a prospect flagged by legal — escalated to VP Sales in under 90 seconds",
    "Content agent draft rejected by brand governance rules — routed to Marketing Director for tone review",
    "Customer Success agent detects churn signal on enterprise account — escalated to CS Director with full context",
    "Growth agent experiment exceeds budget threshold — paused automatically, awaiting Growth Lead approval",
  ],
  safeguards: [
    "Role-based permissions at agent and department level",
    "Approval workflows with configurable thresholds",
    "Complete audit trail for every automated action",
    "Real-time override capability for any human leader",
    "Escalation SLAs measured and reported weekly",
    "Security review documentation for procurement",
  ],
};

const fallbackStructure = {
  label: "Department Structure",
  title: "How AI departments are organized and connected.",
  body: "Each department follows a consistent org-chart model: a human leader, specialist AI agents, quality controls, and operational connectors — all mapped to your existing reporting structure.",
  departments: [
    {
      name: "Marketing Operations",
      purpose: "Scale content production and campaign execution without adding headcount.",
      workflows: ["Content briefs to published assets", "Campaign launch sequences", "A/B test management", "Performance reporting"],
      oversight_role: "VP Marketing",
      output_metrics: "Content throughput, conversion rates, campaign ROI",
      icon: "layers",
    },
    {
      name: "Sales Operations",
      purpose: "Accelerate pipeline velocity and eliminate manual lead management.",
      workflows: ["Inbound lead qualification", "Account research and enrichment", "Follow-up sequence execution", "Pipeline hygiene automation"],
      oversight_role: "VP Sales",
      output_metrics: "Response time, pipeline accuracy, follow-up completion",
      icon: "trending",
    },
    {
      name: "Customer Success",
      purpose: "Proactively retain and expand accounts with data-driven engagement.",
      workflows: ["Health score monitoring", "Renewal preparation", "Churn risk intervention", "Expansion opportunity detection"],
      oversight_role: "CS Director",
      output_metrics: "Health accuracy, churn rate, renewal coverage",
      icon: "users",
    },
    {
      name: "Growth Ops",
      purpose: "Run experiments faster and surface demand signals before competitors.",
      workflows: ["Experiment design and deployment", "Funnel diagnostics", "Signal detection and routing", "Competitive intelligence"],
      oversight_role: "Growth Lead",
      output_metrics: "Experiment velocity, signal-to-action time, funnel lift",
      icon: "network",
    },
  ],
  interactions: {
    label: "How departments connect",
    connections: [
      "Marketing Ops feeds qualified content to Sales Ops for outbound sequences",
      "Sales Ops shares pipeline signals with Customer Success for renewal prep",
      "Customer Success routes expansion signals to Growth Ops for experiment design",
      "Growth Ops surfaces demand intelligence back to Marketing Ops for campaign targeting",
    ],
  },
};

const fallbackCta = {
  title: "Ready to launch governed AI departments?",
  body: "Book a strategy call to define department roles, governance thresholds, and rollout priorities. Get a tailored blueprint within 48 hours.",
  primary_cta: { label: "Book a Strategy Call", href: "/contact" },
  secondary_cta: { label: "See the Implementation Blueprint", href: "/platform" },
  reassurance: "30-minute call · Department blueprint · No obligation",
};

/* ── Helpers ────────────────────────────────────────────────────────── */

function getDeptIcon(iconName: string | undefined) {
  switch (iconName) {
    case "layers":
      return Layers;
    case "trending":
      return TrendingUp;
    case "users":
      return Users;
    case "network":
      return Network;
    default:
      return Layers;
  }
}

function getRiskColor(risk: string) {
  switch (risk) {
    case "Low":
      return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
    case "Medium":
      return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20";
    case "High":
      return "text-orange-400 bg-orange-400/10 border-orange-400/20";
    case "Resolved":
      return "text-cyan-400 bg-cyan-400/10 border-cyan-400/20";
    default:
      return "text-slate-400 bg-slate-400/10 border-slate-400/20";
  }
}

/* ── Page Component ─────────────────────────────────────────────────── */

export default async function DepartmentsPage() {
  const { sectionJson, sectionAttrs } = await loadPortalPageContent(PAGE_KEYS.DEPARTMENTS);
  const hero = sectionJson(SECTION_KEYS.DEPARTMENTS.HERO, fallbackHero);
  const outcomes = sectionJson(SECTION_KEYS.DEPARTMENTS.DEPARTMENTS, fallbackOutcomes);
  const governance = sectionJson(SECTION_KEYS.DEPARTMENTS.GOVERNANCE, fallbackGovernance);
  const structure = sectionJson(SECTION_KEYS.DEPARTMENTS.STRUCTURE, fallbackStructure);
  const cta = sectionJson(SECTION_KEYS.DEPARTMENTS.CTA, fallbackCta);

  const orgChart = hero.org_chart ?? fallbackHero.org_chart;
  const escalationFlow = governance.escalation_flow ?? fallbackGovernance.escalation_flow;
  const overrideExamples = governance.override_examples ?? fallbackGovernance.override_examples;
  const safeguards = governance.safeguards ?? fallbackGovernance.safeguards;
  const deptList = outcomes.departments ?? fallbackOutcomes.departments;
  const structureDepts = structure.departments ?? fallbackStructure.departments;
  const interactions = structure.interactions ?? fallbackStructure.interactions;

  return (
    <div className="space-y-28 md:space-y-40">
      {/* ═══════ HERO ═══════ */}
      <section className="relative pt-8">
        <div className="grid items-start gap-12 lg:grid-cols-[1.1fr,0.9fr]">
          {/* Left: Copy */}
          <div>
            <p
              className="font-(--font-mono) text-xs uppercase tracking-widest text-emerald-400"
              {...sectionAttrs(SECTION_KEYS.DEPARTMENTS.HERO)}
            >
              {hero.label}
            </p>
            <h1
              className="mt-6 max-w-2xl font-(--font-display) text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl"
              {...sectionAttrs(SECTION_KEYS.DEPARTMENTS.HERO)}
            >
              {hero.title}
            </h1>
            <p
              className="mt-6 max-w-xl text-lg leading-relaxed text-slate-400"
              {...sectionAttrs(SECTION_KEYS.DEPARTMENTS.HERO)}
            >
              {hero.body}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href={hero.primary_cta?.href ?? "/contact"}
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/25 transition hover:bg-emerald-500 hover:shadow-emerald-500/30"
                {...sectionAttrs(SECTION_KEYS.DEPARTMENTS.HERO)}
              >
                {hero.primary_cta?.label ?? "Book a Strategy Call"}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={hero.secondary_cta?.href ?? "/platform"}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-300 transition hover:border-slate-600 hover:text-white"
                {...sectionAttrs(SECTION_KEYS.DEPARTMENTS.HERO)}
              >
                {hero.secondary_cta?.label ?? "See the Implementation Blueprint"}
              </Link>
            </div>
          </div>

          {/* Right: Org-chart visual concept */}
          <div
            className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6"
            {...sectionAttrs(SECTION_KEYS.DEPARTMENTS.HERO)}
          >
            <div className="flex items-center justify-between">
              <span className="font-(--font-mono) text-xs uppercase tracking-widest text-slate-500">
                {orgChart.label}
              </span>
              <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
                {orgChart.badge}
              </span>
            </div>

            {/* Root node */}
            <div className="mt-6 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-center">
              <p className="text-sm font-semibold text-emerald-400">{orgChart.root}</p>
            </div>

            {/* Branch connector */}
            <div className="flex justify-center py-2">
              <div className="h-6 w-px bg-slate-700" />
            </div>

            {/* Department branches */}
            <div className="grid grid-cols-2 gap-3">
              {(orgChart.branches ?? fallbackHero.org_chart.branches).map(
                (branch: { name: string; agents: number; oversight: string }) => (
                  <div
                    key={branch.name}
                    className="rounded-lg border border-slate-800 bg-slate-950/60 p-3"
                  >
                    <p className="text-xs font-semibold text-white">{branch.name}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <AnimatedMetric
                        as="span"
                        className="font-(--font-mono) text-[10px] text-cyan-400"
                        value={`${branch.agents} agents`}
                      />
                      <span className="font-(--font-mono) text-[10px] text-slate-500">
                        {branch.oversight}
                      </span>
                    </div>
                  </div>
                ),
              )}
            </div>

            <div className="mt-4 rounded-lg border border-dashed border-slate-700 bg-slate-950/40 p-3 text-xs text-slate-500">
              {orgChart.note}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ OUTCOMES FRAMING — Departmental KPIs ═══════ */}
      <section>
        <div className="text-center">
          <p
            className="font-(--font-mono) text-xs uppercase tracking-widest text-emerald-400"
            {...sectionAttrs(SECTION_KEYS.DEPARTMENTS.DEPARTMENTS)}
          >
            {outcomes.label}
          </p>
          <h2
            className="mt-4 font-(--font-display) text-2xl font-bold tracking-tight text-white sm:text-3xl"
            {...sectionAttrs(SECTION_KEYS.DEPARTMENTS.DEPARTMENTS)}
          >
            {outcomes.title}
          </h2>
          <p
            className="mx-auto mt-4 max-w-2xl text-slate-400"
            {...sectionAttrs(SECTION_KEYS.DEPARTMENTS.DEPARTMENTS)}
          >
            {outcomes.body}
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {deptList.map(
            (dept: {
              name: string;
              kpis: { metric: string; label: string }[];
              focus: string;
            }) => (
              <div
                key={dept.name}
                className="group rounded-2xl border border-slate-800 bg-slate-900/40 p-6 transition hover:border-slate-700"
                {...sectionAttrs(SECTION_KEYS.DEPARTMENTS.DEPARTMENTS)}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10">
                    <Crown className="h-4 w-4 text-emerald-400" />
                  </div>
                  <h3 className="text-base font-semibold text-white">{dept.name}</h3>
                </div>
                <p className="mt-3 text-sm text-slate-400">{dept.focus}</p>
                <div className="mt-4 grid grid-cols-3 gap-3 border-t border-slate-800 pt-4">
                  {(dept.kpis ?? []).map((kpi: { metric: string; label: string }) => (
                    <div key={kpi.label}>
                      <AnimatedMetric
                        as="p"
                        className="font-(--font-mono) text-lg font-bold text-cyan-400"
                        value={kpi.metric}
                      />
                      <p className="mt-0.5 text-[11px] text-slate-500">{kpi.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            ),
          )}
        </div>
      </section>

      {/* ═══════ HUMAN CONTROL — Escalation & Override ═══════ */}
      <section className="rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900/80 to-slate-950 p-8 md:p-12">
        <p
          className="font-(--font-mono) text-xs uppercase tracking-widest text-emerald-400"
          {...sectionAttrs(SECTION_KEYS.DEPARTMENTS.GOVERNANCE)}
        >
          {governance.label}
        </p>
        <h2
          className="mt-4 max-w-3xl font-(--font-display) text-2xl font-bold tracking-tight text-white sm:text-3xl"
          {...sectionAttrs(SECTION_KEYS.DEPARTMENTS.GOVERNANCE)}
        >
          {governance.title}
        </h2>
        <p
          className="mt-4 max-w-2xl text-slate-400"
          {...sectionAttrs(SECTION_KEYS.DEPARTMENTS.GOVERNANCE)}
        >
          {governance.body}
        </p>

        {/* Escalation flow diagram */}
        <div className="mt-10">
          <p className="font-(--font-mono) text-xs uppercase tracking-widest text-cyan-400">
            {escalationFlow.label}
          </p>
          <div className="mt-6 grid gap-3 md:grid-cols-4">
            {(escalationFlow.steps ?? fallbackGovernance.escalation_flow.steps).map(
              (
                step: { stage: string; description: string; risk: string },
                i: number,
              ) => (
                <div key={step.stage} className="group relative" {...sectionAttrs(SECTION_KEYS.DEPARTMENTS.GOVERNANCE)}>
                  <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
                    <div className="flex items-center justify-between">
                      <span className="font-(--font-mono) text-[10px] text-slate-600">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`rounded-full border px-2.5 py-0.5 font-(--font-mono) text-[10px] ${getRiskColor(step.risk)}`}
                      >
                        {step.risk}
                      </span>
                    </div>
                    <h4 className="mt-3 text-sm font-semibold text-white">{step.stage}</h4>
                    <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
                      {step.description}
                    </p>
                  </div>
                  {i < (escalationFlow.steps ?? fallbackGovernance.escalation_flow.steps).length - 1 && (
                    <div className="absolute right-0 top-1/2 hidden h-px w-3 -translate-y-1/2 translate-x-full bg-slate-700 md:block" />
                  )}
                </div>
              ),
            )}
          </div>
        </div>

        {/* Override examples + Safeguards grid */}
        <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr,0.9fr]">
          {/* Override examples */}
          <div>
            <p className="font-(--font-mono) text-xs uppercase tracking-widest text-slate-500">
              Real-world escalation examples
            </p>
            <div className="mt-4 space-y-3">
              {overrideExamples.map((example: string, i: number) => (
                <div
                  key={`override-${i}`}
                  className="flex items-start gap-3 rounded-lg border border-slate-800 bg-slate-900/40 p-4"
                  {...sectionAttrs(SECTION_KEYS.DEPARTMENTS.GOVERNANCE)}
                >
                  <GitBranch className="mt-0.5 h-4 w-4 shrink-0 text-orange-400" />
                  <p className="text-sm text-slate-300">{example}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Safeguards */}
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6">
            <p className="font-(--font-mono) text-xs uppercase tracking-widest text-emerald-400">
              Governance safeguards
            </p>
            <div className="mt-4 space-y-3">
              {safeguards.map((item: string) => (
                <div
                  key={item}
                  className="flex items-center gap-3"
                  {...sectionAttrs(SECTION_KEYS.DEPARTMENTS.GOVERNANCE)}
                >
                  <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-400" />
                  <span className="text-sm text-slate-300">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mid-page CTA ladder (tier 1) */}
        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/security"
            className="inline-flex items-center gap-2 text-sm font-medium text-emerald-400 hover:text-emerald-300"
          >
            Review enterprise security controls
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* ═══════ DEPARTMENT STRUCTURE — Org-Chart Detail ═══════ */}
      <section>
        <div className="grid gap-12 lg:grid-cols-[0.85fr,1.15fr]">
          {/* Left: Introduction */}
          <div>
            <p
              className="font-(--font-mono) text-xs uppercase tracking-widest text-emerald-400"
              {...sectionAttrs(SECTION_KEYS.DEPARTMENTS.STRUCTURE)}
            >
              {structure.label}
            </p>
            <h2
              className="mt-4 max-w-lg font-(--font-display) text-2xl font-bold tracking-tight text-white sm:text-3xl"
              {...sectionAttrs(SECTION_KEYS.DEPARTMENTS.STRUCTURE)}
            >
              {structure.title}
            </h2>
            <p
              className="mt-4 text-slate-400"
              {...sectionAttrs(SECTION_KEYS.DEPARTMENTS.STRUCTURE)}
            >
              {structure.body}
            </p>

            {/* Inter-department connections */}
            <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
              <p className="font-(--font-mono) text-xs uppercase tracking-widest text-cyan-400">
                {interactions.label}
              </p>
              <div className="mt-4 space-y-3">
                {(interactions.connections ?? fallbackStructure.interactions.connections).map(
                  (connection: string, i: number) => (
                    <div
                      key={`connection-${i}`}
                      className="flex items-start gap-3"
                      {...sectionAttrs(SECTION_KEYS.DEPARTMENTS.STRUCTURE)}
                    >
                      <Network className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" />
                      <span className="text-sm text-slate-400">{connection}</span>
                    </div>
                  ),
                )}
              </div>
            </div>

            {/* CTA ladder (tier 2) */}
            <div className="mt-6">
              <Link
                href="/agents"
                className="inline-flex items-center gap-2 text-sm font-medium text-emerald-400 hover:text-emerald-300"
              >
                See how individual AI agents work
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Right: Department cards */}
          <div className="grid gap-4 sm:grid-cols-2">
            {structureDepts.map(
              (dept: {
                name: string;
                purpose: string;
                workflows: string[];
                oversight_role: string;
                output_metrics: string;
                icon?: string;
              }) => {
                const Icon = getDeptIcon(dept.icon);
                return (
                  <div
                    key={dept.name}
                    className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5 transition hover:border-slate-700"
                    {...sectionAttrs(SECTION_KEYS.DEPARTMENTS.STRUCTURE)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10">
                        <Icon className="h-4 w-4 text-emerald-400" />
                      </div>
                      <h3 className="text-sm font-semibold text-white">{dept.name}</h3>
                    </div>
                    <p className="mt-3 text-xs leading-relaxed text-slate-400">{dept.purpose}</p>

                    <div className="mt-4 space-y-1.5">
                      {(dept.workflows ?? []).map((wf: string) => (
                        <div key={wf} className="flex items-center gap-2">
                          <span className="h-1 w-1 rounded-full bg-emerald-500" />
                          <span className="text-[11px] text-slate-500">{wf}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 border-t border-slate-800 pt-3">
                      <div className="flex items-center gap-2">
                        <Shield className="h-3 w-3 text-slate-600" />
                        <span className="font-(--font-mono) text-[10px] text-slate-500">
                          Oversight: {dept.oversight_role}
                        </span>
                      </div>
                      <p className="mt-1.5 font-(--font-mono) text-[10px] text-slate-600">
                        Metrics: {dept.output_metrics}
                      </p>
                    </div>
                  </div>
                );
              },
            )}
          </div>
        </div>
      </section>

      {/* ═══════ PROOF ELEMENT ═══════ */}
      <section className="relative rounded-2xl border border-slate-800 bg-slate-900/50 p-8 dot-grid">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <AnimatedMetric as="p" className="font-(--font-mono) text-3xl font-bold text-white" value="12" />
            <p className="mt-1 text-sm font-medium text-slate-300">AI agents per avg. deployment</p>
            <p className="mt-1 font-(--font-mono) text-[11px] text-slate-600">across 4 departments</p>
          </div>
          <div>
            <AnimatedMetric as="p" className="font-(--font-mono) text-3xl font-bold text-white" value="100%" />
            <p className="mt-1 text-sm font-medium text-slate-300">Human oversight coverage</p>
            <p className="mt-1 font-(--font-mono) text-[11px] text-slate-600">every action auditable</p>
          </div>
          <div>
            <AnimatedMetric as="p" className="font-(--font-mono) text-3xl font-bold text-white" value="<90s" />
            <p className="mt-1 text-sm font-medium text-slate-300">Escalation response time</p>
            <p className="mt-1 font-(--font-mono) text-[11px] text-slate-600">avg. to human review</p>
          </div>
          <div>
            <AnimatedMetric as="p" className="font-(--font-mono) text-3xl font-bold text-white" value="4-6 wks" />
            <p className="mt-1 text-sm font-medium text-slate-300">Strategy to full deployment</p>
            <p className="mt-1 font-(--font-mono) text-[11px] text-slate-600">including governance setup</p>
          </div>
        </div>
        <p className="mt-8 border-t border-slate-800 pt-4 font-(--font-mono) text-[11px] text-slate-600">
          Averages across enterprise department deployments, 2024-2025
        </p>
      </section>

      {/* ═══════ FINAL CTA ═══════ */}
      <section className="relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-900/40 to-slate-900 p-10 text-center md:p-16">
        <div className="pointer-events-none absolute inset-0 dot-grid opacity-30" />
        <div className="relative">
          <h2
            className="mx-auto max-w-3xl font-(--font-display) text-2xl font-bold tracking-tight text-white sm:text-3xl"
            {...sectionAttrs(SECTION_KEYS.DEPARTMENTS.CTA)}
          >
            {cta.title}
          </h2>
          <p
            className="mx-auto mt-4 max-w-xl text-slate-400"
            {...sectionAttrs(SECTION_KEYS.DEPARTMENTS.CTA)}
          >
            {cta.body}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={cta.primary_cta?.href ?? "/contact"}
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/25 transition hover:bg-emerald-500"
              {...sectionAttrs(SECTION_KEYS.DEPARTMENTS.CTA)}
            >
              {cta.primary_cta?.label ?? "Book a Strategy Call"}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              href={cta.secondary_cta?.href ?? "/platform"}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-6 py-3 text-sm font-medium text-slate-300 transition hover:border-slate-600 hover:text-white"
              {...sectionAttrs(SECTION_KEYS.DEPARTMENTS.CTA)}
            >
              {cta.secondary_cta?.label ?? "See the Implementation Blueprint"}
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
