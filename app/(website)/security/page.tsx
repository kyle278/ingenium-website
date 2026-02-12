import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Lock,
  ShieldCheck,
} from "lucide-react";

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

const compliance = [
  "Security questionnaires and vendor risk reviews",
  "DPA and privacy documentation",
  "Data retention and access policies",
];

export default function SecurityPage() {
  return (
    <div className="space-y-24 md:space-y-32">
      {/* ── Hero ── */}
      <section className="text-center">
        <p className="inline-flex items-center rounded-full border border-emerald-200/60 bg-emerald-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-emerald-700">
          Security
        </p>
        <h1 className="mx-auto mt-8 max-w-4xl font-[var(--font-display)] text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl">
          Enterprise security and governance by design
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-500">
          Ingenium is built to meet enterprise security standards, with audit
          trails and approval workflows baked into every system.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(5,150,105,0.3)] transition hover:bg-emerald-700"
          >
            Request Security Packet
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

      {/* ── Controls (sticky) ── */}
      <section className="grid items-start gap-16 lg:grid-cols-2">
        <div className="lg:sticky lg:top-28">
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
            Security controls
          </p>
          <h2 className="mt-4 font-[var(--font-display)] text-3xl font-bold tracking-tight md:text-4xl">
            Built-in controls for enterprise teams
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-500">
            Every system ships with the access controls, logging, and encryption
            your security team expects.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {controls.map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 rounded-xl border border-slate-200/60 bg-white px-4 py-3.5 text-sm text-slate-600"
            >
              <Lock className="h-4 w-4 shrink-0 text-slate-400" />
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* ── Governance (dark) ── */}
      <section className="overflow-hidden rounded-[2rem] bg-slate-950 px-8 py-16 md:px-16 md:py-20">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-emerald-400">
              AI governance
            </p>
            <h2 className="mt-4 font-[var(--font-display)] text-3xl font-bold tracking-tight text-white md:text-4xl">
              Governance built for AI workflows
            </h2>
            <p className="mt-4 text-slate-400">
              Every AI workflow is governed by approvals, logging, and
              role-based controls.
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
              Compliance posture
            </p>
            <h3 className="mt-3 font-semibold text-white">
              SOC 2 readiness + GDPR alignment
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              We support enterprise compliance requirements with documented
              controls and policies.
            </p>
            <div className="mt-4 space-y-3">
              {compliance.map((item) => (
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

      {/* ── Final CTA ── */}
      <section className="overflow-hidden rounded-[2rem] bg-emerald-600 px-8 py-16 text-center md:px-16 md:py-20">
        <h2 className="mx-auto max-w-3xl font-[var(--font-display)] text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
          Need a security review?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-emerald-100">
          We can provide documentation, controls, and a security walkthrough for
          your procurement team.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
          >
            Request Security Packet
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            View Case Studies
          </Link>
        </div>
      </section>
    </div>
  );
}
