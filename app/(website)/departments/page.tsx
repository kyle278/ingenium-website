import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Crown,
  Layers,
  ShieldCheck,
  Users,
} from "lucide-react";

const primaryButton =
  "inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(5,150,105,0.3)] transition hover:bg-emerald-700";
const secondaryButton =
  "inline-flex items-center gap-2 rounded-full border border-slate-300/80 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50";
const sectionLabel =
  "text-xs font-semibold uppercase tracking-[0.3em] text-emerald-700";
const card =
  "rounded-3xl border border-slate-200/70 bg-white/90 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)]";
const softCard =
  "rounded-3xl border border-white/60 bg-white/60 p-6 shadow-[0_12px_30px_rgba(15,23,42,0.04)]";

const departments = [
  {
    title: "Marketing Operations",
    focus: "Campaign execution, content throughput, and conversion testing.",
  },
  {
    title: "Sales Operations",
    focus: "Lead routing, pipeline hygiene, and automated follow-up playbooks.",
  },
  {
    title: "Customer Success",
    focus: "Health scoring, renewal readiness, and churn prevention workflows.",
  },
  {
    title: "Growth Ops",
    focus: "Experiment design, funnel diagnostics, and demand generation signals.",
  },
];

const structure = [
  "Role-based agents with defined scopes",
  "Approval checkpoints for every action",
  "Escalation paths to human owners",
  "Audit trail across decisions",
];

const outcomes = [
  "Faster execution without additional headcount",
  "Clear ownership for each workflow",
  "Governed automation aligned to policy",
  "Continuous optimization tied to KPIs",
];

const exampleStructure = [
  "Department lead sets goals and approves playbooks",
  "Specialist agents execute research and content tasks",
  "QA agent validates compliance and tone",
  "Ops agent routes updates to CRM and analytics",
];

export default function DepartmentsPage() {
  return (
    <div className="space-y-24 md:space-y-32">
      <section className="grid items-center gap-12 lg:grid-cols-[1.05fr,0.95fr]">
        <div>
          <p className={sectionLabel}>AI Agent Departments</p>
          <h1 className="mt-6 max-w-2xl font-[var(--font-display)] text-4xl font-bold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Full AI departments with roles, hierarchy, and approvals.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600">
            Move beyond single agents. Deploy multi-agent departments that run entire
            business functions with governance and accountability.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/contact" className={primaryButton}>
              Book a Strategy Call
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/agents" className={secondaryButton}>
              View AI Agents
            </Link>
          </div>
        </div>
        <div className={card}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
              Department blueprint
            </span>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
              Human-led oversight
            </span>
          </div>
          <div className="mt-6 space-y-4">
            {structure.map((item) => (
              <div key={item} className="flex items-start gap-3 text-sm text-slate-600">
                <Layers className="mt-0.5 h-4 w-4 text-emerald-600" />
                {item}
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
            Departments align to your KPIs, governance, and reporting standards.
          </div>
        </div>
      </section>

      <section className="grid gap-10 lg:grid-cols-[1fr,1.1fr]">
        <div>
          <p className={sectionLabel}>Departments</p>
          <h2 className="mt-4 max-w-xl font-[var(--font-display)] text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
            Built for outcomes, not experiments.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            Each department is designed around a specific business function with measurable KPIs.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {departments.map((dept) => (
            <div key={dept.title} className={softCard}>
              <Users className="h-5 w-5 text-emerald-600" />
              <h3 className="mt-4 text-base font-semibold text-slate-900">
                {dept.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {dept.focus}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[2.5rem] border border-slate-200/70 bg-white/80 px-8 py-16 shadow-[0_30px_80px_rgba(15,23,42,0.12)]">
        <div className="grid gap-12 lg:grid-cols-[1fr,0.9fr]">
          <div>
            <p className={sectionLabel}>Governance</p>
            <h2 className="mt-4 font-[var(--font-display)] text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
              Human leaders stay in control.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              Departments operate inside your security standards and approval workflows.
            </p>
            <div className="mt-8 space-y-3">
              {outcomes.map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-slate-600">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-emerald-200/60 bg-emerald-50/60 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-700">
              Oversight model
            </p>
            <div className="mt-4 space-y-3">
              {[
                "Escalations for high-risk actions",
                "Approval thresholds by role",
                "Visibility across every task",
                "Security review documentation",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-slate-600">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-10 lg:grid-cols-[1fr,1fr]">
        <div>
          <p className={sectionLabel}>How it works</p>
          <h2 className="mt-4 font-[var(--font-display)] text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
            Example department structure.
          </h2>
          <div className="mt-6 space-y-3">
            {exampleStructure.map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm text-slate-600">
                <Crown className="h-4 w-4 text-emerald-600" />
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-emerald-200/60 bg-emerald-50/60 p-8">
          <p className="inline-flex items-center rounded-full border border-emerald-200/60 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-700">
            Aligned to your website
          </p>
          <h3 className="mt-4 font-[var(--font-display)] text-2xl font-semibold text-slate-900">
            Departments that keep your site converting.
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            Each department is mapped to website conversion goals and pipeline outcomes.
          </p>
          <Link
            href="/platform"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700"
          >
            Explore the platform
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="rounded-[2.5rem] bg-emerald-600 px-8 py-16 text-center text-white shadow-[0_25px_60px_rgba(5,150,105,0.35)]">
        <h2 className="mx-auto max-w-3xl font-[var(--font-display)] text-3xl font-semibold tracking-tight md:text-4xl">
          Ready to launch an AI department?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-emerald-50">
          Book a strategy call to define department roles, governance, and rollout.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50">
            Book a Strategy Call
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          <Link
            href="/agents"
            className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            View AI Agents
          </Link>
        </div>
      </section>
    </div>
  );
}
