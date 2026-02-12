import Link from "next/link";
import { ArrowUpRight, CheckCircle2, Globe, ShieldCheck, Users } from "lucide-react";

const values = [
  "Outcome-first delivery",
  "Enterprise-grade governance",
  "Clarity over complexity",
  "Long-term partnership",
];

const highlights = [
  "Website strategy, design, and build",
  "AI agent departments with approvals",
  "CRM and automation integration",
  "Analytics and experimentation systems",
];

export default function AboutPage() {
  return (
    <div className="space-y-24">
      <section className="grid gap-12 lg:grid-cols-[1.1fr,0.9fr] items-center">
        <div className="space-y-6">
          <div className="chip">About Ingenium</div>
          <h1 className="section-title text-4xl md:text-5xl leading-tight">
            We build enterprise websites that drive measurable growth.
          </h1>
          <p className="text-lg text-muted">
            Ingenium Digital Consulting partners with enterprise teams to design conversion-first websites
            and the AI-powered systems behind them. We deliver strategy, build, and ongoing optimization in
            one accountable engagement.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/contact" className="btn-primary text-sm">
              Get a Website Strategy Call
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link href="/case-studies" className="btn-secondary text-sm">
              View case studies
            </Link>
          </div>
        </div>
        <div className="card-soft p-6 space-y-4">
          <div className="text-xs text-muted">What we deliver</div>
          <div className="grid gap-3 text-sm text-muted">
            {highlights.map((item) => (
              <div key={item} className="flex items-center gap-3">
                <CheckCircle2 className="h-4 w-4 text-[var(--accent)]" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="card p-8">
        <div className="grid gap-8 lg:grid-cols-[1.05fr,0.95fr]">
          <div>
            <h2 className="section-title text-3xl">Our operating model</h2>
            <p className="text-muted mt-2">
              We act as the single accountable team for your website, CRM, AI agents, and automation
              stack—so outcomes are measurable and consistent.
            </p>
            <div className="mt-6 grid gap-3">
              {values.map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-muted">
                  <ShieldCheck className="h-4 w-4 text-[var(--accent)]" />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="card-soft p-6 space-y-4">
            <div className="text-xs text-muted">Leadership partnership</div>
            <div className="text-lg section-title">Built with executive alignment</div>
            <p className="text-sm text-muted">
              We align marketing, RevOps, and IT stakeholders early to keep execution fast and predictable.
            </p>
            <div className="grid gap-3 text-sm text-muted">
              {[
                "Stakeholder workshops and KPI alignment",
                "Clear milestone planning",
                "Ongoing optimization and reporting",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <Users className="h-4 w-4 text-[var(--accent)]" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1fr,1fr]">
        <div className="card p-6">
          <h2 className="section-title text-2xl">Global delivery, enterprise focus</h2>
          <p className="text-muted mt-2">
            We operate across the US and EU, supporting global teams with security and governance baked in.
          </p>
          <div className="mt-4 flex items-center gap-3 text-sm text-muted">
            <Globe className="h-4 w-4 text-[var(--accent)]" />
            US + EU delivery teams
          </div>
        </div>
        <div className="card-soft p-6 space-y-4">
          <div className="chip">Enterprise-ready</div>
          <h2 className="section-title text-2xl">Security and compliance aligned</h2>
          <p className="text-sm text-muted">
            Documentation, audit trails, and approval workflows are part of every engagement.
          </p>
          <Link href="/security" className="btn-secondary text-xs">
            View security details
          </Link>
        </div>
      </section>

      <section className="card-soft p-10 text-center space-y-4">
        <div className="chip">Work with Ingenium</div>
        <h2 className="section-title text-3xl md:text-4xl">
          Ready to build a conversion-first website system?
        </h2>
        <p className="text-muted max-w-2xl mx-auto">
          Book a strategy call to align stakeholders and map your rollout.
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
