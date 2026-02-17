import Link from "next/link";
import { ArrowRight, ArrowUpRight, CheckCircle2, Quote } from "lucide-react";

import { PAGE_KEYS, SECTION_KEYS } from "@/src/lib/content-map";
import { loadPortalPageContent } from "@/src/lib/portal-page-content";

export const dynamic = "force-dynamic";

const primaryButton =
  "inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(5,150,105,0.3)] transition hover:bg-emerald-700";
const secondaryButton =
  "inline-flex items-center gap-2 rounded-full border border-slate-300/80 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50";
const sectionLabel =
  "text-xs font-semibold uppercase tracking-[0.3em] text-emerald-700";
const card =
  "rounded-3xl border border-slate-200/70 bg-white/90 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)]";

const fallbackHero = {
  label: "Case studies",
  title: "Proof that enterprise websites can drive revenue.",
  body: "Real outcomes from teams that rebuilt their websites and operating systems with Ingenium.",
  primary_cta: {
    label: "Book a Strategy Call",
    href: "/contact",
  },
  secondary_cta: {
    label: "Explore the Website Offer",
    href: "/websites",
  },
  quick_wins_label: "Typical outcomes",
  quick_wins_note: "Results from recent enterprise launches",
  quick_wins: [
    { metric: "+32%", label: "Pipeline lift" },
    { metric: "2x", label: "Demo conversions" },
    { metric: "6 wks", label: "Time to launch" },
    { metric: "100%", label: "Attribution coverage" },
  ],
};

const fallbackFilters = {
  label: "Filter",
  items: ["Fintech", "Healthcare", "SaaS", "Services", "Enterprise"],
};

const fallbackCaseList = {
  items: [
    {
      industry: "Fintech",
      title: "Enterprise payments platform",
      challenge: "Fragmented website messaging and low demo conversion rates.",
      solution:
        "Rebuilt website architecture, added intent-based routing, integrated CRM workflows.",
      results: ["Pipeline growth +32% in 90 days", "Conversion lift +28%"],
      quote: "Ingenium delivered a conversion system, not just a redesign.",
      cta_label: "Request full case study",
      cta_href: "/contact",
    },
    {
      industry: "Healthcare SaaS",
      title: "Patient engagement platform",
      challenge: "Buyer journey was unclear and follow-up was inconsistent.",
      solution:
        "Role-based pages, automation playbooks, AI summaries for SDRs.",
      results: ["Demo conversions doubled", "Response times cut in half"],
      quote: "Our pipeline is finally predictable and measurable.",
      cta_label: "Request full case study",
      cta_href: "/contact",
    },
    {
      industry: "Enterprise Services",
      title: "Global consulting firm",
      challenge: "Multiple regional sites, no unified governance or analytics.",
      solution:
        "Global design system, localized content workflows, analytics rollout.",
      results: ["Launch in 6 weeks", "4 new regions live"],
      quote: "We can finally scale without chaos.",
      cta_label: "Request full case study",
      cta_href: "/contact",
    },
  ],
};

const fallbackCta = {
  title: "Ready to build your next case study?",
  body: "Book a strategy call to map your website and conversion priorities.",
  primary_cta: {
    label: "Book a Strategy Call",
    href: "/contact",
  },
  secondary_cta: {
    label: "Explore the Platform",
    href: "/platform",
  },
};

export default async function CaseStudiesPage() {
  const { sectionJson, sectionAttrs } = await loadPortalPageContent(
    PAGE_KEYS.CASE_STUDIES,
  );
  const hero = sectionJson(SECTION_KEYS.CASE_STUDIES.HERO, fallbackHero);
  const filters = sectionJson(SECTION_KEYS.CASE_STUDIES.FILTERS, fallbackFilters);
  const caseList = sectionJson(SECTION_KEYS.CASE_STUDIES.CASE_LIST, fallbackCaseList);
  const cta = sectionJson(SECTION_KEYS.CASE_STUDIES.CTA, fallbackCta);
  const quickWins = Array.isArray(hero.quick_wins)
    ? hero.quick_wins
    : fallbackHero.quick_wins;
  const filterItems = Array.isArray(filters.items)
    ? filters.items
    : fallbackFilters.items;
  const caseStudies = Array.isArray(caseList.items)
    ? caseList.items
    : fallbackCaseList.items;

  return (
    <div className="space-y-24 md:space-y-32">
      <section className="grid items-center gap-12 lg:grid-cols-[1.05fr,0.95fr]">
        <div>
          <p className={sectionLabel} {...sectionAttrs(SECTION_KEYS.CASE_STUDIES.HERO)}>
            {hero.label}
          </p>
          <h1
            className="mt-6 max-w-2xl font-[var(--font-display)] text-4xl font-bold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl"
            {...sectionAttrs(SECTION_KEYS.CASE_STUDIES.HERO)}
          >
            {hero.title}
          </h1>
          <p
            className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600"
            {...sectionAttrs(SECTION_KEYS.CASE_STUDIES.HERO)}
          >
            {hero.body}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href={hero.primary_cta?.href ?? "/contact"}
              className={primaryButton}
              {...sectionAttrs(SECTION_KEYS.CASE_STUDIES.HERO)}
            >
              {hero.primary_cta?.label ?? "Book a Strategy Call"}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={hero.secondary_cta?.href ?? "/websites"}
              className={secondaryButton}
              {...sectionAttrs(SECTION_KEYS.CASE_STUDIES.HERO)}
            >
              {hero.secondary_cta?.label ?? "Explore the Website Offer"}
            </Link>
          </div>
        </div>
        <div className={card}>
          <p
            className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400"
            {...sectionAttrs(SECTION_KEYS.CASE_STUDIES.HERO)}
          >
            {hero.quick_wins_label ?? "Typical outcomes"}
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {quickWins.map((item, index) => {
              const metric =
                typeof item?.metric === "string"
                  ? item.metric
                  : fallbackHero.quick_wins[index]?.metric;
              const label =
                typeof item?.label === "string"
                  ? item.label
                  : fallbackHero.quick_wins[index]?.label;

              return (
                <div
                  key={`${metric ?? "metric"}-${index}`}
                  className="rounded-2xl bg-white p-4 text-center"
                  {...sectionAttrs(SECTION_KEYS.CASE_STUDIES.HERO)}
                >
                  <p className="text-2xl font-[var(--font-display)] font-semibold text-emerald-600">
                    {metric}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">{label}</p>
                </div>
              );
            })}
          </div>
          <p
            className="mt-5 text-xs uppercase tracking-[0.3em] text-slate-400"
            {...sectionAttrs(SECTION_KEYS.CASE_STUDIES.HERO)}
          >
            {hero.quick_wins_note ?? "Results from recent enterprise launches"}
          </p>
        </div>
      </section>

      <section className="flex flex-wrap items-center gap-3">
        <span
          className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400"
          {...sectionAttrs(SECTION_KEYS.CASE_STUDIES.FILTERS)}
        >
          {filters.label ?? "Filter"}
        </span>
        {filterItems.map((item, index) => (
          <span
            key={`${typeof item === "string" ? item : "filter"}-${index}`}
            className="rounded-full border border-slate-200/60 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500"
            {...sectionAttrs(SECTION_KEYS.CASE_STUDIES.FILTERS)}
          >
            {typeof item === "string" ? item : fallbackFilters.items[index]}
          </span>
        ))}
      </section>

      <section className="space-y-8">
        {caseStudies.map((item, index) => {
          const title =
            typeof item?.title === "string"
              ? item.title
              : fallbackCaseList.items[index]?.title;
          const industry =
            typeof item?.industry === "string"
              ? item.industry
              : fallbackCaseList.items[index]?.industry;
          const challenge =
            typeof item?.challenge === "string"
              ? item.challenge
              : fallbackCaseList.items[index]?.challenge;
          const solution =
            typeof item?.solution === "string"
              ? item.solution
              : fallbackCaseList.items[index]?.solution;
          const quote =
            typeof item?.quote === "string"
              ? item.quote
              : fallbackCaseList.items[index]?.quote;
          const ctaLabel =
            typeof item?.cta_label === "string"
              ? item.cta_label
              : fallbackCaseList.items[index]?.cta_label;
          const ctaHref =
            typeof item?.cta_href === "string"
              ? item.cta_href
              : fallbackCaseList.items[index]?.cta_href;
          const results = Array.isArray(item?.results)
            ? item.results
            : fallbackCaseList.items[index]?.results ?? [];

          return (
            <div
              key={`${title ?? "case-study"}-${index}`}
              className="grid gap-8 rounded-3xl border border-slate-200/70 bg-white/90 p-8 shadow-[0_18px_50px_rgba(15,23,42,0.08)] lg:grid-cols-[1.2fr,0.8fr]"
            >
              <div className="space-y-4">
                <p
                  className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400"
                  {...sectionAttrs(SECTION_KEYS.CASE_STUDIES.CASE_LIST)}
                >
                  {industry}
                </p>
                <h3
                  className="font-[var(--font-display)] text-2xl font-semibold text-slate-900"
                  {...sectionAttrs(SECTION_KEYS.CASE_STUDIES.CASE_LIST)}
                >
                  {title}
                </h3>
                <div
                  className="space-y-2 text-sm leading-relaxed text-slate-600"
                  {...sectionAttrs(SECTION_KEYS.CASE_STUDIES.CASE_LIST)}
                >
                  <p>
                    <strong className="text-slate-900">Challenge:</strong> {challenge}
                  </p>
                  <p>
                    <strong className="text-slate-900">Solution:</strong> {solution}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {results.map((result, resultIndex) => (
                    <span
                      key={`${title ?? "result"}-${resultIndex}`}
                      className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200/60 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700"
                      {...sectionAttrs(SECTION_KEYS.CASE_STUDIES.CASE_LIST)}
                    >
                      <CheckCircle2 className="h-3 w-3" />
                      {typeof result === "string" ? result : null}
                    </span>
                  ))}
                </div>
              </div>
              <div
                className="rounded-2xl border border-emerald-200/60 bg-emerald-50/60 p-6"
                {...sectionAttrs(SECTION_KEYS.CASE_STUDIES.CASE_LIST)}
              >
                <Quote className="h-5 w-5 text-emerald-600" />
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  &ldquo;{quote}&rdquo;
                </p>
                <Link
                  href={ctaHref ?? "/contact"}
                  className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-emerald-700"
                >
                  {ctaLabel ?? "Request full case study"}
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          );
        })}
      </section>

      <section className="rounded-[2.5rem] bg-emerald-600 px-8 py-16 text-center text-white shadow-[0_25px_60px_rgba(5,150,105,0.35)]">
        <h2
          className="mx-auto max-w-3xl font-[var(--font-display)] text-3xl font-semibold tracking-tight md:text-4xl"
          {...sectionAttrs(SECTION_KEYS.CASE_STUDIES.CTA)}
        >
          {cta.title}
        </h2>
        <p
          className="mx-auto mt-4 max-w-xl text-emerald-50"
          {...sectionAttrs(SECTION_KEYS.CASE_STUDIES.CTA)}
        >
          {cta.body}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href={cta.primary_cta?.href ?? "/contact"}
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
            {...sectionAttrs(SECTION_KEYS.CASE_STUDIES.CTA)}
          >
            {cta.primary_cta?.label ?? "Book a Strategy Call"}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          <Link
            href={cta.secondary_cta?.href ?? "/platform"}
            className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            {...sectionAttrs(SECTION_KEYS.CASE_STUDIES.CTA)}
          >
            {cta.secondary_cta?.label ?? "Explore the Platform"}
          </Link>
        </div>
      </section>
    </div>
  );
}
