import Link from "next/link";
import { ArrowUpRight, CheckCircle2, Crown, Layers, ShieldCheck, Users } from "lucide-react";

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

const primaryButton =
  "inline-flex items-center gap-2 rounded-full bg-emerald-700 px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_35px_rgba(5,150,105,0.35)] transition hover:bg-emerald-800";
const secondaryButton =
  "inline-flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-white";
const card = "rounded-3xl border border-slate-200/70 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)]";
const cardSoft =
  "rounded-3xl border border-emerald-200/60 bg-white/90 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)]";
const chip =
  "inline-flex items-center gap-2 rounded-full border border-emerald-200/60 bg-emerald-50 px-4 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-emerald-900";

export default function DepartmentsPage() {
  return (
    <div className="space-y-20 md:space-y-28">
      <section className="grid gap-12 lg:grid-cols-[1.1fr,0.9fr] items-center">
        <div className="space-y-6">
          <div className={chip}>AI Agent Departments</div>
          <h1 className="font-[var(--font-display)] text-4xl md:text-5xl leading-tight tracking-tight">
            Full AI departments with roles, hierarchy, and approvals.
          </h1>
          <p className="text-lg text-slate-600">
            Move beyond single agents. Deploy multi-agent departments that run entire business functions
            with governance and accountability.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/contact" className={primaryButton}>
              Get a Website Strategy Call
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link href="/agents" className={secondaryButton}>
              See AI agents
            </Link>
          </div>
        </div>
        <div className={cardSoft + " space-y-4"}>
          <div className="text-xs text-slate-500">Department blueprint</div>
          <div className="text-xl font-semibold">Roles → Approvals → Outcomes</div>
          <div className="grid gap-3 text-sm text-slate-600">
            {structure.map((item) => (
              <div key={item} className="flex items-center gap-3">
                <Layers className="h-4 w-4 text-emerald-700" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div>
          <h2 className="font-[var(--font-display)] text-3xl tracking-tight">Departments built for outcomes</h2>
          <p className="text-slate-600 mt-2 max-w-2xl">
            Each department is designed around a specific business function with measurable KPIs.
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {departments.map((dept) => (
            <div key={dept.title} className={card + " space-y-3"}>
              <div className="h-10 w-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <Users className="h-5 w-5" />
              </div>
              <div className="text-lg font-semibold">{dept.title}</div>
              <p className="text-sm text-slate-600">{dept.focus}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={card + " p-8"}>
        <div className="grid gap-8 lg:grid-cols-[1.05fr,0.95fr]">
          <div>
            <h2 className="font-[var(--font-display)] text-3xl tracking-tight">Governance at every layer</h2>
            <p className="text-slate-600 mt-2">
              Departments operate inside your security standards and approval workflows.
            </p>
            <div className="mt-6 grid gap-3">
              {outcomes.map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-slate-600">
                  <CheckCircle2 className="h-4 w-4 text-emerald-700" />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className={cardSoft + " space-y-3"}>
            <div className="text-xs text-slate-500">Oversight model</div>
            <div className="text-lg font-semibold">Human leaders stay in control</div>
            <div className="space-y-3 text-sm text-slate-600">
              {[
                "Escalations for high-risk actions",
                "Approval thresholds by role",
                "Visibility across every task",
                "Security review documentation",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <ShieldCheck className="h-4 w-4 text-emerald-700" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1fr,1fr]">
        <div className={card}>
          <h2 className="font-[var(--font-display)] text-2xl tracking-tight">Example department structure</h2>
          <div className="mt-4 grid gap-3 text-sm text-slate-600">
            {[
              "Department lead sets goals and approves playbooks",
              "Specialist agents execute research and content tasks",
              "QA agent validates compliance and tone",
              "Ops agent routes updates to CRM and analytics",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <Crown className="h-4 w-4 text-emerald-700" />
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className={cardSoft + " space-y-4"}>
          <div className={chip}>Aligned to your website</div>
          <h2 className="font-[var(--font-display)] text-2xl tracking-tight">Departments that keep your site converting</h2>
          <p className="text-sm text-slate-600">
            Each department is mapped to website conversion goals and pipeline outcomes.
          </p>
          <Link href="/platform" className={secondaryButton + " text-xs"}>
            Explore the platform
          </Link>
        </div>
      </section>

      <section className={cardSoft + " p-10 text-center space-y-4"}>
        <div className={chip}>AI departments</div>
        <h2 className="font-[var(--font-display)] text-3xl md:text-4xl tracking-tight">
          Ready to launch an AI department?
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Book a strategy call to define department roles, governance, and rollout.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/contact" className={primaryButton}>
            Get a Website Strategy Call
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          <Link href="/agents" className={secondaryButton}>
            View AI agents
          </Link>
        </div>
      </section>
    </div>
  );
}
