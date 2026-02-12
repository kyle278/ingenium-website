import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  GitBranch,
  ShieldCheck,
  Workflow,
} from "lucide-react";

const coreWorkflows = [
  {
    title: "Lead routing",
    detail:
      "Route inbound leads based on intent, territory, and account priority.",
  },
  {
    title: "Follow-up automation",
    detail:
      "Trigger sequences when buyers engage with key pages or assets.",
  },
  {
    title: "Pipeline alerts",
    detail:
      "Surface stalled deals and send playbooks to owners automatically.",
  },
];

const governance = [
  "Approval gates for sensitive actions",
  "Audit logs for every workflow",
  "Role-based access controls",
  "Rollback options and monitoring",
];

const priorities = [
  "Lead capture to CRM routing",
  "Pipeline health alerts",
  "Executive reporting summaries",
  "Customer lifecycle updates",
];

export default function AutomationsPage() {
  return (
    <div className="space-y-24 md:space-y-32">
      {/* ── Hero ── */}
      <section className="text-center">
        <p className="inline-flex items-center rounded-full border border-emerald-200/60 bg-emerald-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-emerald-700">
          Automations
        </p>
        <h1 className="mx-auto mt-8 max-w-4xl font-[var(--font-display)] text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl">
          Automations that keep revenue moving
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-500">
          Build workflows that connect your website signals, CRM data, and AI
          agents&mdash;so teams act on intent instantly.
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
            href="/platform"
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-7 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Explore the Platform
          </Link>
        </div>
      </section>

      {/* ── Core workflows (sticky) ── */}
      <section className="grid items-start gap-16 lg:grid-cols-2">
        <div className="lg:sticky lg:top-28">
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
            Workflows
          </p>
          <h2 className="mt-4 font-[var(--font-display)] text-3xl font-bold tracking-tight md:text-4xl">
            Automations built for enterprise teams
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-500">
            We connect your workflows to measurable outcomes, not just task
            completion.
          </p>
        </div>
        <div className="space-y-4">
          {coreWorkflows.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-slate-200/60 bg-white p-6"
            >
              <div className="flex items-center gap-3">
                <GitBranch className="h-5 w-5 text-emerald-600" />
                <h3 className="font-semibold">{item.title}</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                {item.detail}
              </p>
            </div>
          ))}
          <div className="rounded-2xl border border-slate-200/60 bg-white p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Example workflow
            </p>
            <h3 className="mt-3 font-semibold">High-intent lead response</h3>
            <div className="mt-4 space-y-3">
              {[
                "Detect key page visits",
                "Trigger AI summary",
                "Assign SDR + notify",
                "Log activity in CRM",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-sm text-slate-600"
                >
                  <Workflow className="h-4 w-4 shrink-0 text-emerald-600" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Governance (dark) ── */}
      <section className="overflow-hidden rounded-[2rem] bg-slate-950 px-8 py-16 md:px-16 md:py-20">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-emerald-400">
              Governance
            </p>
            <h2 className="mt-4 font-[var(--font-display)] text-3xl font-bold tracking-tight text-white md:text-4xl">
              Governance and auditability
            </h2>
            <p className="mt-4 text-slate-400">
              Automation without control creates risk. We build governance into
              every workflow.
            </p>
            <div className="mt-8 space-y-3">
              {governance.map((item) => (
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
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              What we automate first
            </p>
            <div className="mt-4 space-y-3">
              {priorities.map((item) => (
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
        </div>
      </section>

      {/* ── Website tie-in ── */}
      <section className="grid items-start gap-16 lg:grid-cols-2">
        <div className="lg:sticky lg:top-28">
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
            Connected
          </p>
          <h2 className="mt-4 font-[var(--font-display)] text-3xl font-bold tracking-tight md:text-4xl">
            Every automation ties back to conversion
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-500">
            Automations run from website signals and CRM context to keep your
            funnel moving.
          </p>
        </div>
        <div className="rounded-2xl border border-emerald-200/40 bg-emerald-50/50 p-8">
          <div className="space-y-3">
            {[
              "Detect high-intent visits",
              "Trigger AI qualification",
              "Assign owner + notify",
              "Log outcome in CRM",
            ].map((item, idx) => (
              <div
                key={item}
                className="flex items-center gap-4 rounded-xl border border-emerald-200/60 bg-white px-5 py-3.5 text-sm text-slate-700"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-xs font-bold text-emerald-700">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                {item}
              </div>
            ))}
          </div>
          <Link
            href="/websites"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 transition hover:text-emerald-700"
          >
            Explore the website offer
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="overflow-hidden rounded-[2rem] bg-emerald-600 px-8 py-16 text-center md:px-16 md:py-20">
        <h2 className="mx-auto max-w-3xl font-[var(--font-display)] text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
          Ready to automate your revenue workflows?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-emerald-100">
          Book a strategy call to map your automation priorities and rollout
          plan.
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
            href="/platform"
            className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Explore the Platform
          </Link>
        </div>
      </section>
    </div>
  );
}
