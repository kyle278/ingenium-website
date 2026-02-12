import Link from "next/link";
import { Layout, PenTool, Rocket, Search, ShieldCheck, Sparkles, Waypoints, CheckCircle2 } from "lucide-react";
import { parseDelimited } from "../lib/contentParsers";
import { getWebsiteContent } from "../lib/websiteContent";

const proofPlaceholdersFallback = [
  "Client Logo",
  "Client Logo",
  "Client Logo",
  "Client Logo",
  "Client Logo",
  "Client Logo",
];

const outcomesFallback = [
  { label: "Qualified demo requests", value: "+38%" },
  { label: "Lead response time", value: "-61%" },
  { label: "Pipeline attribution", value: "100% tracked" },
];

const deliverablesFallback = [
  {
    title: "Narrative-first strategy",
    description: "We map your story, offer, and ICP before a single pixel is placed.",
    icon: PenTool,
  },
  {
    title: "Conversion-grade design",
    description: "Every section moves the buyer toward clarity, proof, and action.",
    icon: Layout,
  },
  {
    title: "Launch + growth",
    description: "SEO, analytics, and automation hooks built in from day one.",
    icon: Rocket,
  },
];

const websiteBenefitsFallback = [
  "Live lead capture into CRM",
  "Automated routing and notifications",
  "AI-ready follow-ups",
  "Full-funnel analytics",
];

const faqsFallback = [
  {
    question: "Can you rebuild our current site?",
    answer: "Yes. We can migrate your content, keep what works, and re-architect the funnel.",
  },
  {
    question: "Will the site connect to our CRM?",
    answer: "Absolutely. Forms and CTAs can write directly into your CRM with automation triggers.",
  },
  {
    question: "What is the typical timeline?",
    answer: "Most websites ship in weeks, with a staged rollout for content and funnel upgrades.",
  },
];

export default async function WebsiteSitesPage() {
  const content = await getWebsiteContent();

  const proofPlaceholders = content.lines("websites_proof_logos", proofPlaceholdersFallback);

  const outcomes = parseDelimited(
    content.lines(
      "websites_outcomes",
      outcomesFallback.map((item) => `${item.label} | ${item.value}`)
    ),
    outcomesFallback,
    (parts) => ({ label: parts[0], value: parts[1] }),
    2
  );

  const deliverableOverrides = parseDelimited(
    content.lines(
      "websites_deliverables",
      deliverablesFallback.map((item) => `${item.title} | ${item.description}`)
    ),
    deliverablesFallback.map((item) => ({ title: item.title, description: item.description })),
    (parts) => ({ title: parts[0], description: parts[1] }),
    2
  );

  const deliverables = deliverablesFallback.map((item, index) => ({
    ...item,
    title: deliverableOverrides[index]?.title ?? item.title,
    description: deliverableOverrides[index]?.description ?? item.description,
  }));

  const websiteBenefits = content.lines("websites_benefits", websiteBenefitsFallback);

  const faqs = parseDelimited(
    content.lines(
      "websites_faqs",
      faqsFallback.map((item) => `${item.question} | ${item.answer}`)
    ),
    faqsFallback,
    (parts) => ({ question: parts[0], answer: parts[1] }),
    2
  );

  const heroFlowSteps = content.lines("websites_hero_flow_steps", [
    "Capture intent in real time",
    "Route to the right owner instantly",
    "Trigger AI follow-ups",
  ]);

  const implementationSteps = content.lines("websites_implementation_steps", [
    "Audit current funnel and messaging",
    "Design conversion-first structure",
    "Build + connect CRM workflows",
    "Launch and optimize",
  ]);
  return (
    <div className="space-y-24">
      <section className="grid gap-12 lg:grid-cols-[1.1fr,0.9fr] items-center">
        <div className="space-y-6">
          <div className="site-chip">{content.text("websites_hero_chip", "Websites")}</div>
          <h1 className="font-display text-4xl md:text-5xl">
            {content.text("websites_hero_title", "Websites that turn interest into revenue.")}
          </h1>
          <p className="text-lg text-muted">
            {content.text(
              "websites_hero_subtext",
              "Your website is the first AI agent your prospects meet. We build conversion-first sites that connect seamlessly to your CRM, automations, and AI departments."
            )}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/contact" className="btn-primary h-11 px-6 text-sm">
              {content.text("websites_hero_primary_cta", "Start a website build")}
            </Link>
            <Link href="/crm" className="btn-secondary h-11 px-6 text-sm">
              {content.text("websites_hero_secondary_cta", "Explore CRM")}
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {outcomes.map((stat) => (
              <div key={stat.label} className="site-kpi">
                <div className="text-2xl font-display">{stat.value}</div>
                <div className="text-xs text-muted mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="site-card-bright p-6 space-y-4">
          <div className="text-xs text-muted">
            {content.text("websites_hero_flow_title", "Full-funnel flow")}
          </div>
          <div className="text-xl font-display">
            {content.text("websites_hero_flow_headline", "Website > CRM > AI Agents > Automations")}
          </div>
          <div className="mt-4 grid gap-3 text-sm text-muted">
            {heroFlowSteps.map((item) => (
              <div key={item} className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="site-card p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl">
              {content.text("websites_proof_title", "Proof placeholders ready to swap")}
            </h2>
            <p className="text-muted text-sm mt-2">
              {content.text(
                "websites_proof_subtext",
                "Add customer logos, testimonials, or results once available."
              )}
            </p>
          </div>
          <span className="site-badge">
            {content.text("websites_proof_badge", "Placeholder zone")}
          </span>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {proofPlaceholders.map((logo, index) => (
            <div key={`${logo}-${index}`} className="site-card p-6 text-center text-sm text-muted">
              {logo}
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {deliverables.map((item) => (
          <div key={item.title} className="site-card p-6">
            <item.icon className="h-6 w-6 text-[var(--accent)]" />
            <div className="mt-4 text-xl font-display">{item.title}</div>
            <p className="mt-2 text-sm text-muted">{item.description}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-10 lg:grid-cols-[1.1fr,0.9fr] items-start">
        <div className="space-y-4">
          <h2 className="font-display text-3xl">
            {content.text("websites_system_title", "Your website becomes the front door of the CRM.")}
          </h2>
          <p className="text-muted">
            {content.text(
              "websites_system_subtext",
              "Every form submission becomes a structured workflow. Automations route, score, and notify while AI departments follow up with the right context."
            )}
          </p>
          <div className="flex items-center gap-2 text-xs text-muted">
            <Waypoints className="h-4 w-4 text-[var(--accent)]" />
            {content.text("websites_system_badge", "Website > CRM > AI Agents > Automations")}
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {websiteBenefits.map((item) => (
              <div key={item} className="site-card p-4 text-sm">
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="site-card p-6 space-y-4">
          <div className="text-xs text-muted">
            {content.text("websites_example_label", "Example conversion path")}
          </div>
          <div className="text-xl font-display">
            {content.text("websites_example_title", "Inbound lead > AI qualification > SDR booked")}
          </div>
          <p className="text-sm text-muted">
            {content.text(
              "websites_example_subtext",
              "Your website becomes the first step of an accountable, trackable revenue system."
            )}
          </p>
        </div>
      </section>

      <section className="site-card p-8">
        <div className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
          <div className="space-y-4">
            <h2 className="font-display text-3xl">
              {content.text("websites_implementation_title", "Implementation path")}
            </h2>
            <p className="text-muted">
              {content.text(
                "websites_implementation_subtext",
                "We map your message, build the conversion system, and connect it to CRM + AI."
              )}
            </p>
          </div>
          <div className="space-y-3">
            {implementationSteps.map((item, index) => (
              <div key={item} className="flex items-start gap-3 text-sm">
                <span className="h-7 w-7 rounded-full border border-[var(--border)] bg-[var(--surface-2)] flex items-center justify-center text-xs font-display">
                  {index + 1}
                </span>
                <span className="text-muted">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1.1fr,0.9fr]">
        <div className="site-card p-6">
          <h2 className="font-display text-2xl">
            {content.text("websites_what_you_get_title", "What you get")}
          </h2>
          <div className="mt-4 grid gap-3">
            {websiteBenefits.map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm text-muted">
                <CheckCircle2 className="h-4 w-4 text-[var(--accent)]" />
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="site-card p-6">
          <h2 className="font-display text-2xl">
            {content.text("websites_faq_title", "FAQ")}
          </h2>
          <div className="mt-4 space-y-4">
            {faqs.map((faq) => (
              <div key={faq.question}>
                <div className="text-sm font-semibold">{faq.question}</div>
                <div className="text-xs text-muted mt-2">{faq.answer}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="site-card-bright p-10 text-center space-y-4">
        <div className="site-chip">
          {content.text("websites_final_chip", "Ready to upgrade your front door?")}
        </div>
        <h2 className="font-display text-3xl md:text-4xl">
          {content.text("websites_final_title", "Let us build the website your CRM and AI deserve.")}
        </h2>
        <p className="text-muted max-w-2xl mx-auto">
          {content.text(
            "websites_final_subtext",
            "We will map the story, design the experience, and wire everything into the CRM and AI stack."
          )}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/contact" className="btn-primary h-12 px-6 text-sm">
            {content.text("websites_final_primary_cta", "Book a website consult")}
          </Link>
          <Link href="/crm" className="btn-secondary h-12 px-6 text-sm">
            {content.text("websites_final_secondary_cta", "Explore CRM")}
          </Link>
        </div>
      </section>
    </div>
  );
}




