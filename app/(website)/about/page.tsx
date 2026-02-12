import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Globe,
  ShieldCheck,
  Users,
} from "lucide-react";

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
      {/* ── Hero ── */}
      <section className="text-center">
        <p className="inline-flex items-center rounded-full border border-emerald-200/60 bg-emerald-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-emerald-700">
          About Ingenium
        </p>
        <h1 className="mx-auto mt-8 max-w-4xl font-[var(--font-display)] text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl">
          We build enterprise websites that drive measurable growth
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-500">
          Ingenium Digital Consulting partners with enterprise teams to design
          conversion-first websites and the AI-powered systems behind them. We
          deliver strategy, build, and ongoing optimization in one accountable
          engagement.
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
            href="/case-studies"
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-7 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            View Case Studies
          </Link>
        </div>
      </section>

      {/* ── Operating model (sticky) ── */}
      <section className="grid items-start gap-16 lg:grid-cols-2">
        <div className="lg:sticky lg:top-28">
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
            How we work
          </p>
          <h2 className="mt-4 font-[var(--font-display)] text-3xl font-bold tracking-tight md:text-4xl">
            Our operating model
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-500">
            We act as the single accountable team for your website, CRM, AI
            agents, and automation stack&mdash;so outcomes are measurable and
            consistent.
          </p>
          <div className="mt-8 space-y-3">
            {values.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 text-sm text-slate-600"
              >
                <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-600" />
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200/60 bg-white p-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              What we deliver
            </p>
            <div className="mt-4 space-y-3">
              {highlights.map((item) => (
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
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Leadership partnership
            </p>
            <h3 className="mt-3 font-[var(--font-display)] text-xl font-semibold">
              Built with executive alignment
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-500">
              We align marketing, RevOps, and IT stakeholders early to keep
              execution fast and predictable.
            </p>
            <div className="mt-4 space-y-3">
              {leadership.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-sm text-slate-600"
                >
                  <Users className="h-4 w-4 shrink-0 text-emerald-600" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Global delivery (dark) ── */}
      <section className="overflow-hidden rounded-[2rem] bg-slate-950 px-8 py-16 md:px-16 md:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-emerald-400">
              Global reach
            </p>
            <h2 className="mt-4 font-[var(--font-display)] text-3xl font-bold tracking-tight text-white md:text-4xl">
              Global delivery, enterprise focus
            </h2>
            <p className="mt-4 text-slate-400">
              We operate across the US and EU, supporting global teams with
              security and governance baked in.
            </p>
            <div className="mt-6 flex items-center gap-3 text-sm text-slate-300">
              <Globe className="h-4 w-4 text-emerald-400" />
              US + EU delivery teams
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <p className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-emerald-300">
              Enterprise-ready
            </p>
            <h3 className="mt-4 font-semibold text-white">
              Security and compliance aligned
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              Documentation, audit trails, and approval workflows are part of
              every engagement.
            </p>
            <Link
              href="/security"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 transition hover:text-emerald-300"
            >
              View security details
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="overflow-hidden rounded-[2rem] bg-emerald-600 px-8 py-16 text-center md:px-16 md:py-20">
        <h2 className="mx-auto max-w-3xl font-[var(--font-display)] text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
          Ready to build a conversion-first website system?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-emerald-100">
          Book a strategy call to align stakeholders and map your rollout.
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
