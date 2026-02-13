import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Globe,
  ShieldCheck,
  Users,
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

const leadership = [
  "Stakeholder workshops and KPI alignment",
  "Clear milestone planning",
  "Ongoing optimization and reporting",
];

export default function AboutPage() {
  return (
    <div className="space-y-24 md:space-y-32">
      <section className="grid items-center gap-12 lg:grid-cols-[1.05fr,0.95fr]">
        <div>
          <p className={sectionLabel}>About Ingenium</p>
          <h1 className="mt-6 max-w-2xl font-[var(--font-display)] text-4xl font-bold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            We build enterprise websites that drive measurable growth.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600">
            Ingenium Digital Consulting partners with enterprise teams to design conversion-first
            websites and the AI-powered systems behind them. We deliver strategy, build, and ongoing
            optimization in one accountable engagement.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/contact" className={primaryButton}>
              Book a Strategy Call
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/case-studies" className={secondaryButton}>
              View Case Studies
            </Link>
          </div>
        </div>
        <div className={card}>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
            What we deliver
          </p>
          <div className="mt-6 space-y-3">
            {highlights.map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm text-slate-600">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                {item}
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
            End-to-end delivery: strategy, build, and ongoing optimization.
          </div>
        </div>
      </section>

      <section className="grid gap-10 lg:grid-cols-[1fr,1.1fr]">
        <div>
          <p className={sectionLabel}>How we work</p>
          <h2 className="mt-4 max-w-xl font-[var(--font-display)] text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
            A single accountable team for the full system.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            We act as the operating team for your website, CRM, AI agents, and automation stack.
          </p>
          <div className="mt-6 space-y-3">
            {values.map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm text-slate-600">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          <div className={softCard}>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
              Leadership partnership
            </p>
            <h3 className="mt-3 font-[var(--font-display)] text-xl font-semibold text-slate-900">
              Built with executive alignment.
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              We align marketing, RevOps, and IT stakeholders early to keep execution fast and predictable.
            </p>
            <div className="mt-4 space-y-3">
              {leadership.map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-slate-600">
                  <Users className="h-4 w-4 text-emerald-600" />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-emerald-200/60 bg-emerald-50/60 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-700">
              Enterprise-ready
            </p>
            <h3 className="mt-3 font-[var(--font-display)] text-xl font-semibold text-slate-900">
              Governance and security aligned.
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Documentation, audit trails, and approval workflows are part of every engagement.
            </p>
            <Link
              href="/security"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700"
            >
              View security details
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="rounded-[2.5rem] border border-slate-200/70 bg-white/80 px-8 py-16 shadow-[0_30px_80px_rgba(15,23,42,0.12)]">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className={sectionLabel}>Global reach</p>
            <h2 className="mt-4 font-[var(--font-display)] text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
              Global delivery, enterprise focus.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              We operate across the US and EU, supporting global teams with security and governance baked in.
            </p>
            <div className="mt-6 flex items-center gap-3 text-sm text-slate-600">
              <Globe className="h-4 w-4 text-emerald-600" />
              US and EU delivery teams
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200/70 bg-white p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
              Enterprise partnership
            </p>
            <div className="mt-4 space-y-3 text-sm text-slate-600">
              <p>Multi-region delivery support</p>
              <p>Security review ready documentation</p>
              <p>Dedicated lifecycle optimization</p>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[2.5rem] bg-emerald-600 px-8 py-16 text-center text-white shadow-[0_25px_60px_rgba(5,150,105,0.35)]">
        <h2 className="mx-auto max-w-3xl font-[var(--font-display)] text-3xl font-semibold tracking-tight md:text-4xl">
          Ready to build a conversion-first website system?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-emerald-50">
          Book a strategy call to align stakeholders and map your rollout.
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
