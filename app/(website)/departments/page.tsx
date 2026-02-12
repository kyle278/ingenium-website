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

export default function DepartmentsPage() {
  return (
    <div className="space-y-24">
      <section className="grid gap-12 lg:grid-cols-[1.1fr,0.9fr] items-center">
        <div className="space-y-6">
          <div className="chip">AI Agent Departments</div>
          <h1 className="section-title text-4xl md:text-5xl leading-tight">
            Full AI departments with roles, hierarchy, and approvals.
          </h1>
          <p className="text-lg text-muted">
            Move beyond single agents. Deploy multi-agent departments that run entire business functions
            with governance and accountability.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/contact" className="btn-primary text-sm">
              Get a Website Strategy Call
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link href="/agents" className="btn-secondary text-sm">
              See AI agents
            </Link>
          </div>
        </div>
        <div className="card-soft p-6 space-y-4">
          <div className="text-xs text-muted">Department blueprint</div>
          <div className="text-xl section-title">Roles → Approvals → Outcomes</div>
          <div className="grid gap-3 text-sm text-muted">
            {structure.map((item) => (
              <div key={item} className="flex items-center gap-3">
                <Layers className="h-4 w-4 text-[var(--accent)]" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div>
          <h2 className="section-title text-3xl">Departments built for outcomes</h2>
          <p className="text-muted mt-2 max-w-2xl">
            Each department is designed around a specific business function with measurable KPIs.
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {departments.map((dept) => (
            <div key={dept.title} className="card p-6 space-y-3">
              <div className="h-10 w-10 rounded-xl bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center">
                <Users className="h-5 w-5" />
              </div>
              <div className="text-lg section-title">{dept.title}</div>
              <p className="text-sm text-muted">{dept.focus}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="card p-8">
        <div className="grid gap-8 lg:grid-cols-[1.05fr,0.95fr]">
          <div>
            <h2 className="section-title text-3xl">Governance at every layer</h2>
            <p className="text-muted mt-2">
              Departments operate inside your security standards and approval workflows.
            </p>
            <div className="mt-6 grid gap-3">
              {outcomes.map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-muted">
                  <CheckCircle2 className="h-4 w-4 text-[var(--accent)]" />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="card-soft p-6 space-y-3">
            <div className="text-xs text-muted">Oversight model</div>
            <div className="text-lg section-title">Human leaders stay in control</div>
            <div className="space-y-3 text-sm text-muted">
              {[
                "Escalations for high-risk actions",
                "Approval thresholds by role",
                "Visibility across every task",
                "Security review documentation",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <ShieldCheck className="h-4 w-4 text-[var(--accent)]" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1fr,1fr]">
        <div className="card p-6">
          <h2 className="section-title text-2xl">Example department structure</h2>
          <div className="mt-4 grid gap-3 text-sm text-muted">
            {[
              "Department lead sets goals and approves playbooks",
              "Specialist agents execute research and content tasks",
              "QA agent validates compliance and tone",
              "Ops agent routes updates to CRM and analytics",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <Crown className="h-4 w-4 text-[var(--accent)]" />
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="card-soft p-6 space-y-4">
          <div className="chip">Aligned to your website</div>
          <h2 className="section-title text-2xl">Departments that keep your site converting</h2>
          <p className="text-sm text-muted">
            Each department is mapped to website conversion goals and pipeline outcomes.
          </p>
          <Link href="/platform" className="btn-secondary text-xs">
            Explore the platform
          </Link>
        </div>
      </section>

      <section className="card-soft p-10 text-center space-y-4">
        <div className="chip">AI departments</div>
        <h2 className="section-title text-3xl md:text-4xl">
          Ready to launch an AI department?
        </h2>
        <p className="text-muted max-w-2xl mx-auto">
          Book a strategy call to define department roles, governance, and rollout.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/contact" className="btn-primary text-sm">
            Get a Website Strategy Call
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          <Link href="/agents" className="btn-secondary text-sm">
            View AI agents
          </Link>
        </div>
      </section>
    </div>
  );
}
