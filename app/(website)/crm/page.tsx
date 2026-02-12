import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Database,
  ShieldCheck,
  Waypoints,
} from "lucide-react";

const workflows = [
  "Lead routing and ownership rules",
  "Lifecycle stages and pipeline health",
  "Revenue attribution and reporting",
  "Automated follow-ups with AI context",
];

const crmFeatures = [
  "Lead capture and routing",
  "Opportunity scoring and alerts",
  "Renewal and expansion tracking",
  "Full-funnel reporting",
];

const migration = [
  "Phased rollout with data validation",
  "Field mapping and custom objects",
  "Secure access controls and approvals",
  "Training and enablement for teams",
];

export default function CrmPage() {
  return (
    <div className="space-y-24 md:space-y-32">
      {/* ── Hero ── */}
      <section className="text-center">
        <p className="inline-flex items-center rounded-full border border-emerald-200/60 bg-emerald-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-emerald-700">
          CRM
        </p>
        <h1 className="mx-auto mt-8 max-w-4xl font-[var(--font-display)] text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl">
          A CRM built for conversion-first teams
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-500">
          Keep every lead, decision, and follow-up in one system that connects
          directly to your website and AI operations.
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

      {/* ── Workflows (sticky) ── */}
      <section className="grid items-start gap-16 lg:grid-cols-2">
        <div className="lg:sticky lg:top-28">
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
            CRM foundation
          </p>
          <h2 className="mt-4 font-[var(--font-display)] text-3xl font-bold tracking-tight md:text-4xl">
            Pipeline visibility + automation
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-500">
            Align lifecycle stages, automate routing, and keep attribution clean
            across the funnel.
          </p>
          <div className="mt-8 space-y-3">
            {workflows.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 text-sm text-slate-600"
              >
                <Database className="h-4 w-4 shrink-0 text-emerald-600" />
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200/60 bg-white p-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Key workflows
            </p>
            <h3 className="mt-3 font-[var(--font-display)] text-xl font-semibold">
              Workflows that keep revenue moving
            </h3>
            <div className="mt-6 space-y-3">
              {crmFeatures.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-sm text-slate-600"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-emerald-200/40 bg-emerald-50/50 p-8">
            <p className="inline-flex items-center rounded-full border border-emerald-200/60 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-widest text-emerald-700">
              AI-ready
            </p>
            <h3 className="mt-4 font-[var(--font-display)] text-xl font-semibold">
              Agents and automations plug in instantly
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-500">
              Every record is structured for AI agents and automation workflows
              to act without manual work.
            </p>
            <Link
              href="/automations"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 transition hover:text-emerald-700"
            >
              Explore automations
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Migration + governance (dark) ── */}
      <section className="overflow-hidden rounded-[2rem] bg-slate-950 px-8 py-16 md:px-16 md:py-20">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-emerald-400">
              Migration
            </p>
            <h2 className="mt-4 font-[var(--font-display)] text-3xl font-bold tracking-tight text-white md:text-4xl">
              Migration in weeks, not months
            </h2>
            <p className="mt-4 text-slate-400">
              We migrate data in phases so your teams keep moving while the new
              system comes online.
            </p>
            <div className="mt-8 space-y-3">
              {migration.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-sm text-slate-300"
                >
                  <Waypoints className="h-4 w-4 shrink-0 text-emerald-400" />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Data governance
            </p>
            <h3 className="mt-3 font-semibold text-white">
              Security and compliance ready
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              Role-based access, audit logs, and security documentation keep
              procurement confident.
            </p>
            <div className="mt-4 space-y-3">
              {[
                "SSO / SAML support",
                "Audit trails and approvals",
                "Data retention policies",
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

      {/* ── Final CTA ── */}
      <section className="overflow-hidden rounded-[2rem] bg-emerald-600 px-8 py-16 text-center md:px-16 md:py-20">
        <h2 className="mx-auto max-w-3xl font-[var(--font-display)] text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
          Ready for a CRM built for conversion?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-emerald-100">
          Book a strategy call to map your CRM rollout and website alignment.
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
            href="/websites"
            className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Explore the Website Offer
          </Link>
        </div>
      </section>
    </div>
  );
}
