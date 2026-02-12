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
      {/* ── Hero ── */}
      <section className="text-center">
        <p className="inline-flex items-center rounded-full border border-emerald-200/60 bg-emerald-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-emerald-700">
          AI Agent Departments
        </p>
        <h1 className="mx-auto mt-8 max-w-4xl font-[var(--font-display)] text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl">
          Full AI departments with roles, hierarchy, and approvals
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-500">
          Move beyond single agents. Deploy multi-agent departments that run
          entire business functions with governance and accountability.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(5,150,105,0.3)] transition hover:bg-emerald-700"
          >
            Get a Website Strategy Call
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/agents"
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-7 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            See AI Agents
          </Link>
        </div>
      </section>

      {/* ── Departments (sticky) ── */}
      <section className="grid items-start gap-16 lg:grid-cols-2">
        <div className="lg:sticky lg:top-28">
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
            Departments
          </p>
          <h2 className="mt-4 font-[var(--font-display)] text-3xl font-bold tracking-tight md:text-4xl">
            Built for outcomes, not experiments
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-500">
            Each department is designed around a specific business function with
            measurable KPIs.
          </p>
        </div>
        <div className="space-y-4">
          {departments.map((dept) => (
            <div
              key={dept.title}
              className="rounded-2xl border border-slate-200/60 bg-white p-6"
            >
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-emerald-600" />
                <h3 className="font-semibold">{dept.title}</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                {dept.focus}
              </p>
            </div>
          ))}
          <div className="rounded-2xl border border-slate-200/60 bg-white p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Department blueprint
            </p>
            <div className="mt-4 space-y-3">
              {structure.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-sm text-slate-600"
                >
                  <Layers className="h-4 w-4 shrink-0 text-emerald-600" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Governance + oversight (dark) ── */}
      <section className="overflow-hidden rounded-[2rem] bg-slate-950 px-8 py-16 md:px-16 md:py-20">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-emerald-400">
              Governance
            </p>
            <h2 className="mt-4 font-[var(--font-display)] text-3xl font-bold tracking-tight text-white md:text-4xl">
              Human leaders stay in control
            </h2>
            <p className="mt-4 text-slate-400">
              Departments operate inside your security standards and approval
              workflows.
            </p>
            <div className="mt-8 space-y-3">
              {outcomes.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-sm text-slate-300"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Oversight model
            </p>
            <div className="mt-4 space-y-3">
              {[
                "Escalations for high-risk actions",
                "Approval thresholds by role",
                "Visibility across every task",
                "Security review documentation",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-sm text-slate-300"
                >
                  <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-400" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Example structure (sticky) ── */}
      <section className="grid items-start gap-16 lg:grid-cols-2">
        <div className="lg:sticky lg:top-28">
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
            How it works
          </p>
          <h2 className="mt-4 font-[var(--font-display)] text-3xl font-bold tracking-tight md:text-4xl">
            Example department structure
          </h2>
          <div className="mt-8 space-y-3">
            {exampleStructure.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 text-sm text-slate-600"
              >
                <Crown className="h-4 w-4 shrink-0 text-emerald-600" />
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-emerald-200/40 bg-emerald-50/50 p-8">
          <p className="inline-flex items-center rounded-full border border-emerald-200/60 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-widest text-emerald-700">
            Aligned to your website
          </p>
          <h3 className="mt-4 font-[var(--font-display)] text-2xl font-bold tracking-tight">
            Departments that keep your site converting
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-500">
            Each department is mapped to website conversion goals and pipeline
            outcomes.
          </p>
          <Link
            href="/platform"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 transition hover:text-emerald-700"
          >
            Explore the platform
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="overflow-hidden rounded-[2rem] bg-emerald-600 px-8 py-16 text-center md:px-16 md:py-20">
        <h2 className="mx-auto max-w-3xl font-[var(--font-display)] text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
          Ready to launch an AI department?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-emerald-100">
          Book a strategy call to define department roles, governance, and
          rollout.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
          >
            Get a Website Strategy Call
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          <Link
            href="/agents"
            className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            View AI Agents
          </Link>
        </div>
      </section>
    </div>
  );
}
