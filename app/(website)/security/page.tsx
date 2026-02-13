import Link from "next/link";
import { ArrowRight, ArrowUpRight, CheckCircle2, Lock, ShieldCheck } from "lucide-react";

const primaryButton =
  "inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(5,150,105,0.3)] transition hover:bg-emerald-700";
const secondaryButton =
  "inline-flex items-center gap-2 rounded-full border border-slate-300/80 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50";
const sectionLabel =
  "text-xs font-semibold uppercase tracking-[0.3em] text-emerald-700";
const card =
  "rounded-3xl border border-slate-200/70 bg-white/90 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)]";

const controls = [
  "Role-based access controls",
  "SSO and SAML with SCIM support",
  "Audit logs for every change",
  "Data encryption in transit and at rest",
];

const governance = [
  "Approval workflows for AI actions",
  "Escalation paths for sensitive tasks",
  "Version control and rollback",
  "Security documentation for procurement",
];

const compliance = [
  "Security questionnaires and vendor risk reviews",
  "DPA and privacy documentation",
  "Data retention and access policies",
];

export default function SecurityPage() {
  return (
    <div className="space-y-24 md:space-y-32">
      <section className="grid items-center gap-12 lg:grid-cols-[1.05fr,0.95fr]">
        <div>
          <p className={sectionLabel}>Security</p>
          <h1 className="mt-6 max-w-2xl font-[var(--font-display)] text-4xl font-bold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Enterprise security and governance by design.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600">
            Ingenium is built to meet enterprise security standards, with audit trails and
            approval workflows baked into every system.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/contact" className={primaryButton}>
              Request Security Packet
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/platform" className={secondaryButton}>
              Explore the Platform
            </Link>
          </div>
        </div>
        <div className={card}>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
            Compliance highlights
          </p>
          <div className="mt-6 space-y-3">
            {compliance.map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm text-slate-600">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                {item}
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
            SOC 2 readiness and GDPR alignment supported on request.
          </div>
        </div>
      </section>

      <section className="grid gap-10 lg:grid-cols-[1fr,1.1fr]">
        <div>
          <p className={sectionLabel}>Security controls</p>
          <h2 className="mt-4 max-w-xl font-[var(--font-display)] text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
            Built-in controls for enterprise teams.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            Every system ships with the access controls, logging, and encryption your security team expects.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {controls.map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 rounded-2xl border border-slate-200/70 bg-white px-4 py-3 text-sm text-slate-600"
            >
              <Lock className="h-4 w-4 text-emerald-600" />
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[2.5rem] border border-slate-200/70 bg-white/80 px-8 py-16 shadow-[0_30px_80px_rgba(15,23,42,0.12)]">
        <div className="grid gap-12 lg:grid-cols-[1fr,0.9fr]">
          <div>
            <p className={sectionLabel}>AI governance</p>
            <h2 className="mt-4 font-[var(--font-display)] text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
              Governance built for AI workflows.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              Every AI workflow is governed by approvals, logging, and role-based controls.
            </p>
            <div className="mt-6 space-y-3">
              {governance.map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-slate-600">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-emerald-200/60 bg-emerald-50/60 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-700">
              Compliance posture
            </p>
            <h3 className="mt-3 font-[var(--font-display)] text-xl font-semibold text-slate-900">
              SOC 2 readiness and GDPR alignment.
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              We support enterprise compliance requirements with documented controls and policies.
            </p>
            <div className="mt-4 space-y-3">
              {[
                "Security questionnaires",
                "Vendor risk reviews",
                "Privacy documentation",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-slate-600">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[2.5rem] bg-emerald-600 px-8 py-16 text-center text-white shadow-[0_25px_60px_rgba(5,150,105,0.35)]">
        <h2 className="mx-auto max-w-3xl font-[var(--font-display)] text-3xl font-semibold tracking-tight md:text-4xl">
          Need a security review?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-emerald-50">
          We can provide documentation, controls, and a security walkthrough for your procurement team.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50">
            Request Security Packet
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            View Case Studies
          </Link>
        </div>
      </section>
    </div>
  );
}
