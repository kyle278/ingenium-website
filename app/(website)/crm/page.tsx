import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Database,
  ShieldCheck,
  Waypoints,
} from "lucide-react";

const primaryButton =
  "inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(5,150,105,0.3)] transition hover:bg-emerald-700";
const secondaryButton =
  "inline-flex items-center gap-2 rounded-full border border-slate-300/80 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50";
const sectionLabel =
  "text-xs font-semibold uppercase tracking-[0.3em] text-emerald-700";
const card =
  "rounded-3xl border border-slate-200/70 bg-white/90 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)]";
const softCard =
  "rounded-3xl border border-white/60 bg-white/60 p-6 shadow-[0_12px_30px_rgba(15,23,42,0.04)]";

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
      <section className="grid items-center gap-12 lg:grid-cols-[1.05fr,0.95fr]">
        <div>
          <p className={sectionLabel}>CRM</p>
          <h1 className="mt-6 max-w-2xl font-[var(--font-display)] text-4xl font-bold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            A CRM built for conversion-first teams.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600">
            Keep every lead, decision, and follow-up in one system that connects
            directly to your website and AI operations.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/contact" className={primaryButton}>
              Book a Strategy Call
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/platform" className={secondaryButton}>
              Explore the Platform
            </Link>
          </div>
        </div>
        <div className={card}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
              CRM workspace
            </span>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
              Unified pipeline
            </span>
          </div>
          <div className="mt-6 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6">
            <p className="text-sm font-medium text-slate-500">
              Pipeline, routing, attribution, and lifecycle views in one place.
            </p>
            <div className="mt-4 grid gap-3">
              <div className="h-3 w-3/4 rounded-full bg-slate-200" />
              <div className="h-3 w-2/3 rounded-full bg-slate-200" />
              <div className="h-3 w-1/2 rounded-full bg-slate-200" />
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-10 lg:grid-cols-[1fr,1.1fr]">
        <div>
          <p className={sectionLabel}>CRM foundation</p>
          <h2 className="mt-4 max-w-xl font-[var(--font-display)] text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
            Pipeline visibility and automation in one system.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            Align lifecycle stages, automate routing, and keep attribution clean across the funnel.
          </p>
          <div className="mt-6 space-y-3">
            {workflows.map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm text-slate-600">
                <Database className="h-4 w-4 text-emerald-600" />
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="grid gap-4">
          <div className={softCard}>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
              Key workflows
            </p>
            <h3 className="mt-3 font-[var(--font-display)] text-xl font-semibold text-slate-900">
              Workflows that keep revenue moving.
            </h3>
            <div className="mt-5 space-y-3">
              {crmFeatures.map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-slate-600">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-emerald-200/60 bg-emerald-50/60 p-6">
            <p className="inline-flex items-center rounded-full border border-emerald-200/60 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-700">
              AI-ready
            </p>
            <h3 className="mt-4 font-[var(--font-display)] text-xl font-semibold text-slate-900">
              Agents and automations plug in instantly.
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Every record is structured for AI agents and automation workflows to act without manual work.
            </p>
            <Link
              href="/automations"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700"
            >
              Explore automations
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="rounded-[2.5rem] border border-slate-200/70 bg-white/80 px-8 py-16 shadow-[0_30px_80px_rgba(15,23,42,0.12)]">
        <div className="grid gap-12 lg:grid-cols-[1fr,0.9fr]">
          <div>
            <p className={sectionLabel}>Migration</p>
            <h2 className="mt-4 font-[var(--font-display)] text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
              Migration in weeks, not months.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              We migrate data in phases so your teams keep moving while the new system comes online.
            </p>
            <div className="mt-6 space-y-3">
              {migration.map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-slate-600">
                  <Waypoints className="h-4 w-4 text-emerald-600" />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-emerald-200/60 bg-emerald-50/60 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-700">
              Data governance
            </p>
            <h3 className="mt-3 font-[var(--font-display)] text-xl font-semibold text-slate-900">
              Security and compliance ready.
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Role-based access, audit logs, and security documentation keep procurement confident.
            </p>
            <div className="mt-4 space-y-3">
              {[
                "SSO and SAML support",
                "Audit trails and approvals",
                "Data retention policies",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-slate-600">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[2.5rem] bg-emerald-600 px-8 py-16 text-center text-white shadow-[0_25px_60px_rgba(5,150,105,0.35)]">
        <h2 className="mx-auto max-w-3xl font-[var(--font-display)] text-3xl font-semibold tracking-tight md:text-4xl">
          Ready for a CRM built for conversion?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-emerald-50">
          Book a strategy call to map your CRM rollout and website alignment.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50">
            Book a Strategy Call
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          <Link
            href="/websites"
            className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Explore the Website Offer
          </Link>
        </div>
      </section>
    </div>
  );
}
