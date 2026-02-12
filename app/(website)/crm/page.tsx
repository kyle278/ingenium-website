import Link from "next/link";
import { ArrowUpRight, CheckCircle2, Database, ShieldCheck, Target, Waypoints } from "lucide-react";

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

export default function CrmPage() {
  return (
    <div className="space-y-24">
      <section className="grid gap-12 lg:grid-cols-[1.1fr,0.9fr] items-center">
        <div className="space-y-6">
          <div className="chip">CRM</div>
          <h1 className="section-title text-4xl md:text-5xl leading-tight">
            A CRM built for conversion-first teams.
          </h1>
          <p className="text-lg text-muted">
            Keep every lead, decision, and follow-up in one system that connects directly to your website
            and AI operations.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/contact" className="btn-primary text-sm">
              Get a Website Strategy Call
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link href="/platform" className="btn-secondary text-sm">
              Explore the platform
            </Link>
          </div>
        </div>
        <div className="card-soft p-6 space-y-4">
          <div className="text-xs text-muted">CRM foundation</div>
          <div className="text-xl section-title">Pipeline visibility + automation</div>
          <div className="space-y-3 text-sm text-muted">
            {workflows.map((item) => (
              <div key={item} className="flex items-center gap-3">
                <Database className="h-4 w-4 text-[var(--accent)]" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="card p-8">
        <div className="grid gap-8 lg:grid-cols-[1.05fr,0.95fr]">
          <div>
            <h2 className="section-title text-3xl">Workflows that keep revenue moving</h2>
            <p className="text-muted mt-2">
              Align lifecycle stages, automate routing, and keep attribution clean across the funnel.
            </p>
            <div className="mt-6 grid gap-3">
              {[
                "Lead capture and routing",
                "Opportunity scoring and alerts",
                "Renewal and expansion tracking",
                "Full-funnel reporting",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-muted">
                  <CheckCircle2 className="h-4 w-4 text-[var(--accent)]" />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="card-soft p-6 space-y-4">
            <div className="chip">AI-ready</div>
            <h2 className="section-title text-2xl">Agents and automations plug in instantly</h2>
            <p className="text-sm text-muted">
              Every record is structured for AI agents and automation workflows to act without manual work.
            </p>
            <Link href="/automations" className="btn-secondary text-xs">
              Explore automations
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1fr,1fr]">
        <div className="card p-6">
          <h2 className="section-title text-2xl">Migration without disruption</h2>
          <p className="text-muted mt-2">
            We migrate data in phases so your teams keep moving while the new system comes online.
          </p>
          <div className="mt-4 grid gap-3 text-sm text-muted">
            {migration.map((item) => (
              <div key={item} className="flex items-center gap-3">
                <Waypoints className="h-4 w-4 text-[var(--accent)]" />
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="card-soft p-6 space-y-4">
          <div className="text-xs text-muted">Data governance</div>
          <div className="text-lg section-title">Security and compliance ready</div>
          <p className="text-sm text-muted">
            Role-based access, audit logs, and security documentation keep procurement confident.
          </p>
          <div className="grid gap-3 text-sm text-muted">
            {[
              "SSO / SAML support",
              "Audit trails and approvals",
              "Data retention policies",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <ShieldCheck className="h-4 w-4 text-[var(--accent)]" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="card-soft p-10 text-center space-y-4">
        <div className="chip">CRM foundation</div>
        <h2 className="section-title text-3xl md:text-4xl">
          Ready for a CRM built for conversion?
        </h2>
        <p className="text-muted max-w-2xl mx-auto">
          Book a strategy call to map your CRM rollout and website alignment.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/contact" className="btn-primary text-sm">
            Get a Website Strategy Call
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          <Link href="/websites" className="btn-secondary text-sm">
            Explore the website offer
          </Link>
        </div>
      </section>
    </div>
  );
}
