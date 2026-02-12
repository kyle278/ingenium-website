import Link from "next/link";
import { ArrowRight, ArrowUpRight, CheckCircle2, Quote } from "lucide-react";

const quickWins = [
  { metric: "+32%", label: "Pipeline lift" },
  { metric: "2x", label: "Demo conversions" },
  { metric: "6 wks", label: "Time to launch" },
  { metric: "100%", label: "Attribution coverage" },
];

const caseStudies = [
  {
    industry: "FinTech",
    title: "Enterprise payments platform",
    challenge:
      "Fragmented website messaging and low demo conversion rates.",
    solution:
      "Rebuilt website architecture, added intent-based routing, integrated CRM workflows.",
    results: ["Pipeline growth +32% in 90 days", "Conversion lift +28%"],
    quote: "Ingenium delivered a conversion system, not just a redesign.",
  },
  {
    industry: "Healthcare SaaS",
    title: "Patient engagement platform",
    challenge:
      "Buyer journey was unclear and follow-up was inconsistent.",
    solution:
      "Role-based pages, automation playbooks, AI summaries for SDRs.",
    results: ["Demo conversions doubled", "Response times cut in half"],
    quote: "Our pipeline is finally predictable and measurable.",
  },
  {
    industry: "Enterprise Services",
    title: "Global consulting firm",
    challenge:
      "Multiple regional sites, no unified governance or analytics.",
    solution:
      "Global design system, localized content workflows, analytics rollout.",
    results: ["Launch in 6 weeks", "4 new regions live"],
    quote: "We can finally scale without chaos.",
  },
];

const filters = ["FinTech", "Healthcare", "SaaS", "Services", "Enterprise"];

export default function CaseStudiesPage() {
  return (
    <div className="space-y-24 md:space-y-32">
      {/* ── Hero ── */}
      <section className="text-center">
        <p className="inline-flex items-center rounded-full border border-emerald-200/60 bg-emerald-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-emerald-700">
          Case Studies
        </p>
        <h1 className="mx-auto mt-8 max-w-4xl font-[var(--font-display)] text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl">
          Proof that enterprise websites can drive revenue
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-500">
          Real outcomes from teams that rebuilt their websites and operating
          systems with Ingenium.
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
            href="/websites"
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-7 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Explore the Website Offer
          </Link>
        </div>
      </section>

      {/* ── Quick wins strip ── */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {quickWins.map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-slate-200/60 bg-white p-6 text-center"
          >
            <p className="font-[var(--font-display)] text-3xl font-bold tracking-tight text-emerald-600">
              {item.metric}
            </p>
            <p className="mt-1 text-xs text-slate-500">{item.label}</p>
          </div>
        ))}
      </section>

      {/* ── Filters ── */}
      <section className="flex flex-wrap items-center gap-3">
        <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
          Filter
        </span>
        {filters.map((item) => (
          <span
            key={item}
            className="rounded-full border border-slate-200/60 bg-white px-4 py-1.5 text-xs font-medium text-slate-600"
          >
            {item}
          </span>
        ))}
      </section>

      {/* ── Case studies (sticky label per card) ── */}
      <section className="space-y-8">
        {caseStudies.map((item) => (
          <div
            key={item.title}
            className="grid gap-8 rounded-2xl border border-slate-200/60 bg-white p-8 lg:grid-cols-[1.2fr,0.8fr]"
          >
            <div className="space-y-4">
              <p className="text-xs font-medium uppercase tracking-widest text-slate-400">
                {item.industry}
              </p>
              <h3 className="font-[var(--font-display)] text-2xl font-bold tracking-tight">
                {item.title}
              </h3>
              <div className="space-y-2 text-sm leading-relaxed text-slate-500">
                <p>
                  <strong className="text-slate-700">Challenge:</strong>{" "}
                  {item.challenge}
                </p>
                <p>
                  <strong className="text-slate-700">Solution:</strong>{" "}
                  {item.solution}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {item.results.map((r) => (
                  <span
                    key={r}
                    className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200/60 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700"
                  >
                    <CheckCircle2 className="h-3 w-3" />
                    {r}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-emerald-200/40 bg-emerald-50/50 p-6">
              <Quote className="h-5 w-5 text-emerald-600" />
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                &ldquo;{item.quote}&rdquo;
              </p>
              <Link
                href="/contact"
                className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-emerald-600 transition hover:text-emerald-700"
              >
                Request full case study
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        ))}
      </section>

      {/* ── Final CTA ── */}
      <section className="overflow-hidden rounded-[2rem] bg-emerald-600 px-8 py-16 text-center md:px-16 md:py-20">
        <h2 className="mx-auto max-w-3xl font-[var(--font-display)] text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
          Ready to build your next case study?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-emerald-100">
          Book a strategy call to map your website and conversion priorities.
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
            href="/platform"
            className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Explore the Platform
          </Link>
        </div>
      </section>
    </div>
  );
}
