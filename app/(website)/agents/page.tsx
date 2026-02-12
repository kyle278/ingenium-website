import Link from "next/link";
import { ArrowUpRight, Bot, CheckCircle2, ShieldCheck, Target, Waypoints } from "lucide-react";

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
    detail: "Lead routing, enrichment, and follow-up sequences triggered by behavior.",
  },
];

const workflows = [
  "Inbound lead → AI qualification → CRM routing",
  "Content brief → AI draft → human approval → publish",
  "Account signals → playbook launch → SDR notification",
];

const safeguards = [
  "Approval workflows with role-based permissions",
  "Audit logs for every automated action",
  "Human-in-the-loop checkpoints",
  "Security and compliance alignment",
];

const primaryButton =
  "inline-flex items-center gap-2 rounded-full bg-emerald-700 px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_35px_rgba(5,150,105,0.35)] transition hover:bg-emerald-800";
const secondaryButton =
  "inline-flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-white";
const card = "rounded-3xl border border-slate-200/70 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)]";
const cardSoft =
  "rounded-3xl border border-emerald-200/60 bg-white/90 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)]";
const chip =
  "inline-flex items-center gap-2 rounded-full border border-emerald-200/60 bg-emerald-50 px-4 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-emerald-900";

export default function AgentsPage() {
  return (
    <div className="space-y-20 md:space-y-28">
      <section className="grid gap-12 lg:grid-cols-[1.1fr,0.9fr] items-center">
        <div className="space-y-6">
          <div className={chip}>AI Agents</div>
          <h1 className="font-[var(--font-display)] text-4xl md:text-5xl leading-tight tracking-tight">
            AI agents that execute, not just assist.
          </h1>
          <p className="text-lg text-slate-600">
            Deploy specialized agents that handle research, content, and operational execution while your
            team retains oversight and control.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/contact" className={primaryButton}>
              Get a Website Strategy Call
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link href="/departments" className={secondaryButton}>
              Explore agent departments
            </Link>
          </div>
        </div>
        <div className={cardSoft + " space-y-4"}>
          <div className="text-xs text-slate-500">Agent workflow</div>
          <div className="text-xl font-semibold">Website signal → AI agent → Action</div>
          <div className="space-y-3 text-sm text-slate-600">
            {workflows.map((item) => (
              <div key={item} className="flex items-center gap-3">
                <Bot className="h-4 w-4 text-emerald-700" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div>
          <h2 className="font-[var(--font-display)] text-3xl tracking-tight">What agents do inside the Ingenium system</h2>
          <p className="text-slate-600 mt-2 max-w-2xl">
            Each agent has a focused role, aligned to your revenue workflow and reporting standards.
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {capabilities.map((item) => (
            <div key={item.title} className={card + " space-y-3"}>
              <div className="h-10 w-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <Target className="h-5 w-5" />
              </div>
              <div className="text-lg font-semibold">{item.title}</div>
              <p className="text-sm text-slate-600">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={card + " p-8"}>
        <div className="grid gap-8 lg:grid-cols-[1.05fr,0.95fr]">
          <div>
            <h2 className="font-[var(--font-display)] text-3xl tracking-tight">Governance built for enterprise teams</h2>
            <p className="text-slate-600 mt-2">
              AI agents operate inside your approvals, audit logs, and security requirements.
            </p>
            <div className="mt-6 grid gap-3">
              {safeguards.map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-slate-600">
                  <ShieldCheck className="h-4 w-4 text-emerald-700" />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className={cardSoft + " space-y-3"}>
            <div className="text-xs text-slate-500">Example agent pack</div>
            <div className="text-lg font-semibold">Marketing response team</div>
            <div className="space-y-3 text-sm text-slate-600">
              {[
                "Research agent maps competitive positioning",
                "Content agent drafts personalized follow-ups",
                "QA agent validates tone + compliance",
                "Ops agent routes to CRM owner",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="h-4 w-4 text-emerald-700" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1fr,1fr]">
        <div className={card}>
          <h2 className="font-[var(--font-display)] text-2xl tracking-tight">Where agents create impact</h2>
          <div className="mt-4 grid gap-3 text-sm text-slate-600">
            {[
              "Speed up lead qualification and routing",
              "Maintain consistent follow-up with high intent accounts",
              "Expand content output without adding headcount",
              "Surface risks and opportunities across the pipeline",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <Waypoints className="h-4 w-4 text-emerald-700" />
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className={cardSoft + " space-y-4"}>
          <div className={chip}>Aligned with your website</div>
          <h2 className="font-[var(--font-display)] text-2xl tracking-tight">Every agent action ties back to conversion</h2>
          <p className="text-sm text-slate-600">
            Agents connect directly to website signals, CRM records, and automation rules so outcomes stay
            measurable.
          </p>
          <Link href="/platform" className={secondaryButton + " text-xs"}>
            Explore the platform
          </Link>
        </div>
      </section>

      <section className={cardSoft + " p-10 text-center space-y-4"}>
        <div className={chip}>AI workforce</div>
        <h2 className="font-[var(--font-display)] text-3xl md:text-4xl tracking-tight">
          Ready to deploy AI agents with governance?
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Book a strategy call to map agent roles, workflows, and rollout priorities.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/contact" className={primaryButton}>
            Get a Website Strategy Call
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          <Link href="/departments" className={secondaryButton}>
            See agent departments
          </Link>
        </div>
      </section>
    </div>
  );
}
