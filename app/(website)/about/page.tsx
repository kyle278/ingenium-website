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

const primaryButton =
  "inline-flex items-center gap-2 rounded-full bg-emerald-700 px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_35px_rgba(5,150,105,0.35)] transition hover:bg-emerald-800";
const secondaryButton =
  "inline-flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-white";
const card = "rounded-3xl border border-slate-200/70 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)]";
const cardSoft =
  "rounded-3xl border border-emerald-200/60 bg-white/90 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)]";
const chip =
  "inline-flex items-center gap-2 rounded-full border border-emerald-200/60 bg-emerald-50 px-4 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-emerald-900";

export default function AboutPage() {
  return (
    <div className="space-y-20 md:space-y-28">
      <section className="grid gap-12 lg:grid-cols-[1.1fr,0.9fr] items-center">
        <div className="space-y-6">
          <div className={chip}>About Ingenium</div>
          <h1 className="font-[var(--font-display)] text-4xl md:text-5xl leading-tight tracking-tight">
            We build enterprise websites that drive measurable growth.
          </h1>
          <p className="text-lg text-slate-600">
            Ingenium Digital Consulting partners with enterprise teams to design conversion-first websites
            and the AI-powered systems behind them. We deliver strategy, build, and ongoing optimization in
            one accountable engagement.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/contact" className={primaryButton}>
              Get a Website Strategy Call
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link href="/case-studies" className={secondaryButton}>
              View case studies
            </Link>
          </div>
        </div>
        <div className={cardSoft + " space-y-4"}>
          <div className="text-xs text-slate-500">What we deliver</div>
          <div className="grid gap-3 text-sm text-slate-600">
            {highlights.map((item) => (
              <div key={item} className="flex items-center gap-3">
                <CheckCircle2 className="h-4 w-4 text-emerald-700" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={card + " p-8"}>
        <div className="grid gap-8 lg:grid-cols-[1.05fr,0.95fr]">
          <div>
            <h2 className="font-[var(--font-display)] text-3xl tracking-tight">Our operating model</h2>
            <p className="text-slate-600 mt-2">
              We act as the single accountable team for your website, CRM, AI agents, and automation
              stack—so outcomes are measurable and consistent.
            </p>
            <div className="mt-6 grid gap-3">
              {values.map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-slate-600">
                  <ShieldCheck className="h-4 w-4 text-emerald-700" />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className={cardSoft + " space-y-4"}>
            <div className="text-xs text-slate-500">Leadership partnership</div>
            <div className="text-lg font-semibold">Built with executive alignment</div>
            <p className="text-sm text-slate-600">
              We align marketing, RevOps, and IT stakeholders early to keep execution fast and predictable.
            </p>
            <div className="grid gap-3 text-sm text-slate-600">
              {[
                "Stakeholder workshops and KPI alignment",
                "Clear milestone planning",
                "Ongoing optimization and reporting",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <Users className="h-4 w-4 text-emerald-700" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1fr,1fr]">
        <div className={card}>
          <h2 className="font-[var(--font-display)] text-2xl tracking-tight">Global delivery, enterprise focus</h2>
          <p className="text-slate-600 mt-2">
            We operate across the US and EU, supporting global teams with security and governance baked in.
          </p>
          <div className="mt-4 flex items-center gap-3 text-sm text-slate-600">
            <Globe className="h-4 w-4 text-emerald-700" />
            US + EU delivery teams
          </div>
        </div>
        <div className={cardSoft + " space-y-4"}>
          <div className={chip}>Enterprise-ready</div>
          <h2 className="font-[var(--font-display)] text-2xl tracking-tight">Security and compliance aligned</h2>
          <p className="text-sm text-slate-600">
            Documentation, audit trails, and approval workflows are part of every engagement.
          </p>
          <Link href="/security" className={secondaryButton + " text-xs"}>
            View security details
          </Link>
        </div>
      </section>

      <section className={cardSoft + " p-10 text-center space-y-4"}>
        <div className={chip}>Work with Ingenium</div>
        <h2 className="font-[var(--font-display)] text-3xl md:text-4xl tracking-tight">
          Ready to build a conversion-first website system?
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Book a strategy call to align stakeholders and map your rollout.
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
