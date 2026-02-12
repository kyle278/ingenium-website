import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  CheckCircle2,
  ShieldCheck,
  Target,
  Waypoints,
} from "lucide-react";

const capabilities = [
  {
    title: "Research + intelligence",
    detail: "Market scans, competitor tracking, and buyer intent analysis.",
  },
  {
    title: "Content execution",
    detail: "Drafts, variations, and QA aligned to your brand governance.",
  },
  {
    title: "Revenue operations",
    detail:
      "Lead routing, enrichment, and follow-up sequences triggered by behavior.",
  },
];

const workflows = [
  "Inbound lead \u2192 AI qualification \u2192 CRM routing",
  "Content brief \u2192 AI draft \u2192 human approval \u2192 publish",
  "Account signals \u2192 playbook launch \u2192 SDR notification",
];

const safeguards = [
  "Approval workflows with role-based permissions",
  "Audit logs for every automated action",
  "Human-in-the-loop checkpoints",
  "Security and compliance alignment",
];

const agentPack = [
  "Research agent maps competitive positioning",
  "Content agent drafts personalized follow-ups",
  "QA agent validates tone + compliance",
  "Ops agent routes to CRM owner",
];

const impactAreas = [
  "Speed up lead qualification and routing",
  "Maintain consistent follow-up with high intent accounts",
  "Expand content output without adding headcount",
  "Surface risks and opportunities across the pipeline",
];

export default function AgentsPage() {
  return (
    <div className="space-y-24 md:space-y-32">
      {/* ── Hero ── */}
      <section className="text-center">
        <p className="inline-flex items-center rounded-full border border-emerald-200/60 bg-emerald-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-emerald-700">
          AI Agents
        </p>
        <h1 className="mx-auto mt-8 max-w-4xl font-[var(--font-display)] text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl">
          AI agents that execute, not just assist
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-500">
          Deploy specialized agents that handle research, content, and
          operational execution while your team retains oversight and control.
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
            href="/departments"
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-7 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Explore Agent Departments
          </Link>
        </div>
      </section>

      {/* ── Capabilities (sticky) ── */}
      <section className="grid items-start gap-16 lg:grid-cols-2">
        <div className="lg:sticky lg:top-28">
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
            Capabilities
          </p>
          <h2 className="mt-4 font-[var(--font-display)] text-3xl font-bold tracking-tight md:text-4xl">
            What agents do inside the Ingenium system
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-500">
            Each agent has a focused role, aligned to your revenue workflow and
            reporting standards.
          </p>
        </div>
        <div className="space-y-4">
          {capabilities.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-slate-200/60 bg-white p-6"
            >
              <div className="flex items-center gap-3">
                <Target className="h-5 w-5 text-emerald-600" />
                <h3 className="font-semibold">{item.title}</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                {item.detail}
              </p>
            </div>
          ))}
          <div className="rounded-2xl border border-slate-200/60 bg-white p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Example workflows
            </p>
            <div className="mt-4 space-y-3">
              {workflows.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-sm text-slate-600"
                >
                  <Bot className="h-4 w-4 shrink-0 text-emerald-600" />
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
              Enterprise governance
            </p>
            <h2 className="mt-4 font-[var(--font-display)] text-3xl font-bold tracking-tight text-white md:text-4xl">
              AI agents operate inside your controls
            </h2>
            <p className="mt-4 text-slate-400">
              Approvals, audit logs, and security requirements govern every
              automated action.
            </p>
            <div className="mt-8 space-y-3">
              {safeguards.map((item) => (
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
              Example agent pack
            </p>
            <h3 className="mt-3 font-semibold text-white">
              Marketing response team
            </h3>
            <div className="mt-4 space-y-3">
              {agentPack.map((item) => (
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

      {/* ── Impact + website tie-in (sticky) ── */}
      <section className="grid items-start gap-16 lg:grid-cols-2">
        <div className="lg:sticky lg:top-28">
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
            Impact
          </p>
          <h2 className="mt-4 font-[var(--font-display)] text-3xl font-bold tracking-tight md:text-4xl">
            Where agents create measurable results
          </h2>
          <div className="mt-8 space-y-3">
            {impactAreas.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 text-sm text-slate-600"
              >
                <Waypoints className="h-4 w-4 shrink-0 text-emerald-600" />
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-emerald-200/40 bg-emerald-50/50 p-8">
          <p className="inline-flex items-center rounded-full border border-emerald-200/60 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-widest text-emerald-700">
            Aligned with your website
          </p>
          <h3 className="mt-4 font-[var(--font-display)] text-2xl font-bold tracking-tight">
            Every agent action ties back to conversion
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-500">
            Agents connect directly to website signals, CRM records, and
            automation rules so outcomes stay measurable.
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
          Ready to deploy AI agents with governance?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-emerald-100">
          Book a strategy call to map agent roles, workflows, and rollout
          priorities.
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
            href="/departments"
            className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            See Agent Departments
          </Link>
        </div>
      </section>
    </div>
  );
}
