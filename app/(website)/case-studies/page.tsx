import Link from "next/link";
import { ArrowUpRight, CheckCircle2, Filter, Quote } from "lucide-react";

const quickWins = [
  "Pipeline lift +32%",
  "Demo conversions doubled",
  "Launch in 6 weeks",
  "100% attribution coverage",
];

const caseStudies = [
  {
    industry: "FinTech",
    title: "Enterprise payments platform",
    challenge: "Fragmented website messaging and low demo conversion rates.",
    solution: "Rebuilt website architecture, added intent-based routing, integrated CRM workflows.",
    results: ["Pipeline growth +32% in 90 days", "Conversion lift +28%"],
    quote: "Ingenium delivered a conversion system, not just a redesign.",
  },
  {
    industry: "Healthcare SaaS",
    title: "Patient engagement platform",
    challenge: "Buyer journey was unclear and follow-up was inconsistent.",
    solution: "Role-based pages, automation playbooks, AI summaries for SDRs.",
    results: ["Demo conversions doubled", "Response times cut in half"],
    quote: "Our pipeline is finally predictable and measurable.",
  },
  {
    industry: "Enterprise Services",
    title: "Global consulting firm",
    challenge: "Multiple regional sites, no unified governance or analytics.",
    solution: "Global design system, localized content workflows, analytics rollout.",
    results: ["Launch in 6 weeks", "4 new regions live"],
    quote: "We can finally scale without chaos.",
  },
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
const badge =
  "inline-flex items-center gap-2 rounded-full border border-slate-200/70 bg-white px-3 py-1 text-xs text-slate-600";

export default function CaseStudiesPage() {
  return (
    <div className="space-y-20 md:space-y-28">
      <section className="grid gap-12 lg:grid-cols-[1.1fr,0.9fr] items-center">
        <div className="space-y-6">
          <div className={chip}>Case Studies</div>
          <h1 className="font-[var(--font-display)] text-4xl md:text-5xl leading-tight tracking-tight">
            Proof that enterprise websites can drive revenue.
          </h1>
          <p className="text-lg text-slate-600">
            Real outcomes from teams that rebuilt their websites and operating systems with Ingenium.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/contact" className={primaryButton}>
              Get a Website Strategy Call
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link href="/websites" className={secondaryButton}>
              Explore the website offer
            </Link>
          </div>
        </div>
        <div className={cardSoft + " space-y-4"}>
          <div className="text-xs text-slate-500">Quick wins</div>
          <div className="grid gap-3 text-sm text-slate-600">
            {quickWins.map((item) => (
              <div key={item} className="flex items-center gap-3">
                <CheckCircle2 className="h-4 w-4 text-emerald-700" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={card + " p-6"}>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="font-[var(--font-display)] text-2xl tracking-tight">Filter by industry or function</h2>
            <p className="text-slate-600 mt-2">Shortlist stories that match your buyer journey.</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <Filter className="h-4 w-4 text-emerald-700" />
            Filters available on request
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {['FinTech', 'Healthcare', 'SaaS', 'Services', 'Enterprise'].map((item) => (
            <span key={item} className={badge}>
              {item}
            </span>
          ))}
        </div>
      </section>

      <section className="grid gap-8">
        {caseStudies.map((item) => (
          <div key={item.title} className={card + " grid gap-6 lg:grid-cols-[1.1fr,0.9fr]"}>
            <div className="space-y-4">
              <div className="text-xs uppercase tracking-[0.2em] text-slate-500">{item.industry}</div>
              <h3 className="font-[var(--font-display)] text-2xl tracking-tight">{item.title}</h3>
              <div className="space-y-2 text-sm text-slate-600">
                <div>
                  <strong className="text-slate-900">Challenge:</strong> {item.challenge}
                </div>
                <div>
                  <strong className="text-slate-900">Solution:</strong> {item.solution}
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {item.results.map((result) => (
                  <span key={result} className={badge}>
                    {result}
                  </span>
                ))}
              </div>
            </div>
            <div className={cardSoft + " space-y-3"}>
              <Quote className="h-6 w-6 text-emerald-700" />
              <p className="text-sm text-slate-600">“{item.quote}”</p>
              <Link href="/contact" className={secondaryButton + " text-xs"}>
                Request full case study
              </Link>
            </div>
          </div>
        ))}
      </section>

      <section className={cardSoft + " p-10 text-center space-y-4"}>
        <div className={chip}>Your story next</div>
        <h2 className="font-[var(--font-display)] text-3xl md:text-4xl tracking-tight">
          Ready to build your next case study?
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Book a strategy call to map your website and conversion priorities.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/contact" className={primaryButton}>
            Get a Website Strategy Call
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          <Link href="/platform" className={secondaryButton}>
            Explore the platform
          </Link>
        </div>
      </section>
    </div>
  );
}
