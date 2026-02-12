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

export default function CaseStudiesPage() {
  return (
    <div className="space-y-24">
      <section className="grid gap-12 lg:grid-cols-[1.1fr,0.9fr] items-center">
        <div className="space-y-6">
          <div className="chip">Case Studies</div>
          <h1 className="section-title text-4xl md:text-5xl leading-tight">
            Proof that enterprise websites can drive revenue.
          </h1>
          <p className="text-lg text-muted">
            Real outcomes from teams that rebuilt their websites and operating systems with Ingenium.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/contact" className="btn-primary text-sm">
              Get a Website Strategy Call
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link href="/websites" className="btn-secondary text-sm">
              Explore the website offer
            </Link>
          </div>
        </div>
        <div className="card-soft p-6 space-y-4">
          <div className="text-xs text-muted">Quick wins</div>
          <div className="grid gap-3 text-sm text-muted">
            {quickWins.map((item) => (
              <div key={item} className="flex items-center gap-3">
                <CheckCircle2 className="h-4 w-4 text-[var(--accent)]" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="card p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="section-title text-2xl">Filter by industry or function</h2>
            <p className="text-muted mt-2">Shortlist stories that match your buyer journey.</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted">
            <Filter className="h-4 w-4 text-[var(--accent)]" />
            Filters available on request
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {["FinTech", "Healthcare", "SaaS", "Services", "Enterprise"].map((item) => (
            <span key={item} className="badge">
              {item}
            </span>
          ))}
        </div>
      </section>

      <section className="grid gap-8">
        {caseStudies.map((item) => (
          <div key={item.title} className="card p-8 grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
            <div className="space-y-4">
              <div className="text-xs uppercase tracking-[0.2em] text-subtle">{item.industry}</div>
              <h3 className="section-title text-2xl">{item.title}</h3>
              <div className="space-y-2 text-sm text-muted">
                <div>
                  <strong className="text-[var(--text)]">Challenge:</strong> {item.challenge}
                </div>
                <div>
                  <strong className="text-[var(--text)]">Solution:</strong> {item.solution}
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {item.results.map((result) => (
                  <span key={result} className="badge">
                    {result}
                  </span>
                ))}
              </div>
            </div>
            <div className="card-soft p-6 space-y-3">
              <Quote className="h-6 w-6 text-[var(--accent)]" />
              <p className="text-sm text-muted">“{item.quote}”</p>
              <Link href="/contact" className="btn-secondary text-xs">
                Request full case study
              </Link>
            </div>
          </div>
        ))}
      </section>

      <section className="card-soft p-10 text-center space-y-4">
        <div className="chip">Your story next</div>
        <h2 className="section-title text-3xl md:text-4xl">
          Ready to build your next case study?
        </h2>
        <p className="text-muted max-w-2xl mx-auto">
          Book a strategy call to map your website and conversion priorities.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/contact" className="btn-primary text-sm">
            Get a Website Strategy Call
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          <Link href="/platform" className="btn-secondary text-sm">
            Explore the platform
          </Link>
        </div>
      </section>
    </div>
  );
}
