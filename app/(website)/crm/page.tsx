import Link from "next/link";
import { ArrowUpRight, CheckCircle2, Database, ShieldCheck, Waypoints } from "lucide-react";

const workflows = [
  "Lead routing and ownership rules",
  "Lifecycle stages and pipeline health",
  "Revenue attribution and reporting",
  "Automated follow-ups with AI context",
];

const migration = [
  "Phased rollout with data validation",
  "Field mapping and custom objects",
  "Secure access controls and approvals",
  "Training and enablement for teams",
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

export default function CrmPage() {
  return (
    <div className="space-y-20 md:space-y-28">
      <section className="grid gap-12 lg:grid-cols-[1.1fr,0.9fr] items-center">
        <div className="space-y-6">
          <div className={chip}>CRM</div>
          <h1 className="font-[var(--font-display)] text-4xl md:text-5xl leading-tight tracking-tight">
            A CRM built for conversion-first teams.
          </h1>
          <p className="text-lg text-slate-600">
            Keep every lead, decision, and follow-up in one system that connects directly to your website
            and AI operations.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/contact" className={primaryButton}>
              Get a Website Strategy Call
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link href="/platform" className={secondaryButton}>
              Explore the platform
            </Link>
          </div>
        </div>
        <div className={cardSoft + " space-y-4"}>
          <div className="text-xs text-slate-500">CRM foundation</div>
          <div className="text-xl font-semibold">Pipeline visibility + automation</div>
          <div className="space-y-3 text-sm text-slate-600">
            {workflows.map((item) => (
              <div key={item} className="flex items-center gap-3">
                <Database className="h-4 w-4 text-emerald-700" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={card + " p-8"}>
        <div className="grid gap-8 lg:grid-cols-[1.05fr,0.95fr]">
          <div>
            <h2 className="font-[var(--font-display)] text-3xl tracking-tight">Workflows that keep revenue moving</h2>
            <p className="text-slate-600 mt-2">
              Align lifecycle stages, automate routing, and keep attribution clean across the funnel.
            </p>
            <div className="mt-6 grid gap-3">
              {[
                "Lead capture and routing",
                "Opportunity scoring and alerts",
                "Renewal and expansion tracking",
                "Full-funnel reporting",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-slate-600">
                  <CheckCircle2 className="h-4 w-4 text-emerald-700" />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className={cardSoft + " space-y-4"}>
            <div className={chip}>AI-ready</div>
            <h2 className="font-[var(--font-display)] text-2xl tracking-tight">Agents and automations plug in instantly</h2>
            <p className="text-sm text-slate-600">
              Every record is structured for AI agents and automation workflows to act without manual work.
            </p>
            <Link href="/automations" className={secondaryButton + " text-xs"}>
              Explore automations
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1fr,1fr]">
        <div className={card}>
          <h2 className="font-[var(--font-display)] text-2xl tracking-tight">Migration without disruption</h2>
          <p className="text-slate-600 mt-2">
            We migrate data in phases so your teams keep moving while the new system comes online.
          </p>
          <div className="mt-4 grid gap-3 text-sm text-slate-600">
            {migration.map((item) => (
              <div key={item} className="flex items-center gap-3">
                <Waypoints className="h-4 w-4 text-emerald-700" />
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className={cardSoft + " space-y-4"}>
          <div className="text-xs text-slate-500">Data governance</div>
          <div className="text-lg font-semibold">Security and compliance ready</div>
          <p className="text-sm text-slate-600">
            Role-based access, audit logs, and security documentation keep procurement confident.
          </p>
          <div className="grid gap-3 text-sm text-slate-600">
            {[
              "SSO / SAML support",
              "Audit trails and approvals",
              "Data retention policies",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <ShieldCheck className="h-4 w-4 text-emerald-700" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={cardSoft + " p-10 text-center space-y-4"}>
        <div className={chip}>CRM foundation</div>
        <h2 className="font-[var(--font-display)] text-3xl md:text-4xl tracking-tight">
          Ready for a CRM built for conversion?
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Book a strategy call to map your CRM rollout and website alignment.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/contact" className={primaryButton}>
            Get a Website Strategy Call
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          <Link href="/websites" className={secondaryButton}>
            Explore the website offer
          </Link>
        </div>
      </section>
    </div>
  );
}
