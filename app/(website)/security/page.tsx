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

const primaryButton =
  "inline-flex items-center gap-2 rounded-full bg-emerald-700 px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_35px_rgba(5,150,105,0.35)] transition hover:bg-emerald-800";
const secondaryButton =
  "inline-flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-white";
const card = "rounded-3xl border border-slate-200/70 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)]";
const cardSoft =
  "rounded-3xl border border-emerald-200/60 bg-white/90 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)]";
const chip =
  "inline-flex items-center gap-2 rounded-full border border-emerald-200/60 bg-emerald-50 px-4 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-emerald-900";

export default function SecurityPage() {
  return (
    <div className="space-y-20 md:space-y-28">
      <section className="grid gap-12 lg:grid-cols-[1.1fr,0.9fr] items-center">
        <div className="space-y-6">
          <div className={chip}>Security</div>
          <h1 className="font-[var(--font-display)] text-4xl md:text-5xl leading-tight tracking-tight">
            Enterprise security and governance by design.
          </h1>
          <p className="text-lg text-slate-600">
            Ingenium is built to meet enterprise security standards, with audit trails and approval
            workflows baked into every system.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/contact" className={primaryButton}>
              Request security packet
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link href="/platform" className={secondaryButton}>
              Explore the platform
            </Link>
          </div>
        </div>
        <div className={cardSoft + " space-y-4"}>
          <div className="text-xs text-slate-500">Security highlights</div>
          <div className="grid gap-3 text-sm text-slate-600">
            {controls.map((item) => (
              <div key={item} className="flex items-center gap-3">
                <Lock className="h-4 w-4 text-emerald-700" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={card + " p-8"}>
        <div className="grid gap-8 lg:grid-cols-[1.05fr,0.95fr]">
          <div>
            <h2 className="font-[var(--font-display)] text-3xl tracking-tight">Governance built for AI workflows</h2>
            <p className="text-slate-600 mt-2">
              Every AI workflow is governed by approvals, logging, and role-based controls.
            </p>
            <div className="mt-6 grid gap-3">
              {governance.map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-slate-600">
                  <ShieldCheck className="h-4 w-4 text-emerald-700" />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className={cardSoft + " space-y-3"}>
            <div className="text-xs text-slate-500">Compliance posture</div>
            <div className="text-lg font-semibold">SOC 2 readiness + GDPR alignment</div>
            <p className="text-sm text-slate-600">
              We support enterprise compliance requirements with documented controls and policies.
            </p>
            <div className="grid gap-3 text-sm text-slate-600">
              {[
                "Security questionnaires and vendor risk reviews",
                "DPA and privacy documentation",
                "Data retention and access policies",
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

      <section className={cardSoft + " p-10 text-center space-y-4"}>
        <div className={chip}>Security packet</div>
        <h2 className="font-[var(--font-display)] text-3xl md:text-4xl tracking-tight">
          Need a security review?
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          We can provide documentation, controls, and a security walkthrough for your procurement team.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/contact" className={primaryButton}>
            Request security packet
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          <Link href="/case-studies" className={secondaryButton}>
            View case studies
          </Link>
        </div>
      </section>
    </div>
  );
}
