import Link from "next/link";
import { ArrowUpRight, CheckCircle2, Lock, ShieldCheck } from "lucide-react";

const controls = [
  "Role-based access controls",
  "SSO / SAML and SCIM support",
  "Audit logs for every change",
  "Data encryption in transit and at rest",
];

const governance = [
  "Approval workflows for AI actions",
  "Escalation paths for sensitive tasks",
  "Version control and rollback",
  "Security documentation for procurement",
];

export default function SecurityPage() {
  return (
    <div className="space-y-24">
      <section className="grid gap-12 lg:grid-cols-[1.1fr,0.9fr] items-center">
        <div className="space-y-6">
          <div className="chip">Security</div>
          <h1 className="section-title text-4xl md:text-5xl leading-tight">
            Enterprise security and governance by design.
          </h1>
          <p className="text-lg text-muted">
            Ingenium is built to meet enterprise security standards, with audit trails and approval
            workflows baked into every system.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/contact" className="btn-primary text-sm">
              Request security packet
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link href="/platform" className="btn-secondary text-sm">
              Explore the platform
            </Link>
          </div>
        </div>
        <div className="card-soft p-6 space-y-4">
          <div className="text-xs text-muted">Security highlights</div>
          <div className="grid gap-3 text-sm text-muted">
            {controls.map((item) => (
              <div key={item} className="flex items-center gap-3">
                <Lock className="h-4 w-4 text-[var(--accent)]" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="card p-8">
        <div className="grid gap-8 lg:grid-cols-[1.05fr,0.95fr]">
          <div>
            <h2 className="section-title text-3xl">Governance built for AI workflows</h2>
            <p className="text-muted mt-2">
              Every AI workflow is governed by approvals, logging, and role-based controls.
            </p>
            <div className="mt-6 grid gap-3">
              {governance.map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-muted">
                  <ShieldCheck className="h-4 w-4 text-[var(--accent)]" />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="card-soft p-6 space-y-3">
            <div className="text-xs text-muted">Compliance posture</div>
            <div className="text-lg section-title">SOC 2 readiness + GDPR alignment</div>
            <p className="text-sm text-muted">
              We support enterprise compliance requirements with documented controls and policies.
            </p>
            <div className="grid gap-3 text-sm text-muted">
              {[
                "Security questionnaires and vendor risk reviews",
                "DPA and privacy documentation",
                "Data retention and access policies",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="h-4 w-4 text-[var(--accent)]" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="card-soft p-10 text-center space-y-4">
        <div className="chip">Security packet</div>
        <h2 className="section-title text-3xl md:text-4xl">
          Need a security review?
        </h2>
        <p className="text-muted max-w-2xl mx-auto">
          We can provide documentation, controls, and a security walkthrough for your procurement team.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/contact" className="btn-primary text-sm">
            Request security packet
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          <Link href="/case-studies" className="btn-secondary text-sm">
            View case studies
          </Link>
        </div>
      </section>
    </div>
  );
}
