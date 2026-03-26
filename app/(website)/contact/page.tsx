import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, CheckCircle2, Mail, MapPin, PhoneCall } from "lucide-react";

import { WEBSITE_FORM_NAMES, WEBSITE_FORM_SLUGS } from "@/lib/portalIntegration/forms";
import { getPortalFormBySlug } from "@/lib/portalIntegration/server";

import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Book a Strategy Review | Ingenium",
  description:
    "Start with a strategy review. Tell us where revenue is leaking and Ingenium will map the system, rollout priorities, proof needs, and next decisions.",
  openGraph: {
    title: "Book a Strategy Review | Ingenium",
    description:
      "Start with a strategy review and get a tailored acquisition, CRM, AI, and automation roadmap for pipeline growth.",
    url: "/contact",
  },
  alternates: { canonical: "/contact" },
};

const sectionLabel = "font-(--font-mono) text-xs uppercase tracking-widest text-emerald-400";
const darkCard = "rounded-2xl border border-slate-800 bg-slate-900/70 p-6";

const expectations = [
  "Response within 1 business day",
  "Architecture and rollout direction within 48 hours",
  "Security and stakeholder review support included",
];

const callExpectations = [
  "Current-state revenue systems audit",
  "Highest-friction handoff analysis across acquisition, CRM, AI, and ops",
  "Recommended platform architecture and rollout order",
  "Next-step plan with owners, risks, and timing",
];

const infoCards = [
  { title: "Email", body: "hello@ingeniumconsulting.net" },
  { title: "Availability", body: "Mon-Fri, 9 am-6 pm ET" },
  { title: "Delivery footprint", body: "US and EU coverage" },
];

const requestPaths = [
  {
    label: "Strategy",
    title: "Platform strategy call",
    body: "Best when you need rollout priorities, scope, and the fastest path to measurable impact.",
    href: "/contact?intent=strategy-call",
  },
  {
    label: "Technical",
    title: "Architecture review",
    body: "Best when your team needs integration, implementation, or systems-design detail before buying.",
    href: "/contact?intent=architecture-review",
  },
  {
    label: "Security",
    title: "Security and stakeholder review",
    body: "Best when procurement, compliance, or internal reviewers need confidence before the first call.",
    href: "/contact?intent=security-review",
  },
];

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  let contactForm = null;
  let formResolutionError: string | null = null;

  try {
    contactForm = await getPortalFormBySlug(WEBSITE_FORM_SLUGS.contact);
  } catch (error) {
    formResolutionError =
      error instanceof Error ? error.message : "Unknown Portal form resolution error.";
  }

  return (
    <div className="space-y-24 md:space-y-28">
      <section className="grid items-start gap-8 lg:grid-cols-[1.05fr,0.95fr]">
        <div>
          <p className={sectionLabel}>Strategy Review</p>
          <h1 className="mt-5 max-w-3xl font-(--font-display) text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Tell us where revenue is leaking. We will map the system that fixes it.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-400">
            Start with a short intake. We will design a practical plan covering acquisition,
            CRM execution, AI workflows, automation, and governance.
          </p>

          <div className="mt-8 space-y-3">
            {expectations.map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm text-slate-300">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                {item}
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
            <p className="font-(--font-mono) text-xs uppercase tracking-widest text-slate-500">
              What happens after you submit
            </p>
            <div className="mt-4 space-y-3">
              {callExpectations.map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-slate-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-(--font-mono) text-xs uppercase tracking-widest text-cyan-400">
                  Choose the right path
                </p>
                <p className="mt-2 text-sm text-slate-400">
                  Pick the route that fits your buying stage. We will tailor the follow-up and preparation.
                </p>
              </div>
              <p className="font-(--font-mono) text-[11px] text-slate-600">Step 1 takes about 60 seconds</p>
            </div>
            <div className="mt-5 grid gap-3">
              {requestPaths.map((path) => (
                <Link
                  key={path.title}
                  href={path.href}
                  className="group rounded-xl border border-slate-800 bg-slate-950/40 p-4 transition hover:border-emerald-500/30 hover:bg-slate-900/80"
                >
                  <p className="font-(--font-mono) text-[10px] uppercase tracking-widest text-emerald-400">
                    {path.label}
                  </p>
                  <h2 className="mt-2 text-base font-semibold text-white">{path.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{path.body}</p>
                  <span className="mt-3 inline-flex items-center gap-2 text-sm text-slate-500 transition group-hover:text-emerald-300">
                    Start this request
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>

        </div>

        <div className={`${darkCard} grid-lines`}>
          <div className="mb-5 rounded-xl border border-slate-800 bg-slate-950/60 p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-(--font-mono) text-[10px] uppercase tracking-widest text-emerald-400">
                  Short first step
                </p>
                <p className="mt-2 text-sm text-slate-300">
                  Start with name, work email, and your biggest challenge. Everything else is optional follow-up context.
                </p>
              </div>
              <p className="font-(--font-mono) text-[11px] text-slate-600">Response within 1 business day</p>
            </div>
          </div>
          {contactForm ? (
            <ContactForm
              formId={contactForm.id}
              formSlug={contactForm.slug}
              formName={contactForm.name}
            />
          ) : (
            <div className="space-y-4 rounded-xl border border-rose-500/40 bg-rose-500/10 p-5">
              <p className="font-(--font-mono) text-xs uppercase tracking-widest text-rose-300">
                Form Configuration Required
              </p>
              <h2 className="font-(--font-display) text-xl font-semibold text-white">
                Contact form UUID is not configured in Ingenium Portal.
              </h2>
              <p className="text-sm leading-relaxed text-slate-300">
                The website requires the canonical Portal form UUID for reporting and submission
                tracking. Upsert the form row named{" "}
                <span className="font-medium text-white">{WEBSITE_FORM_NAMES.contact}</span> with
                slug <span className="font-medium text-white">{WEBSITE_FORM_SLUGS.contact}</span>{" "}
                in Portal, then reload this page.
              </p>
              {formResolutionError ? (
                <p className="text-xs text-rose-200/80">{formResolutionError}</p>
              ) : null}
            </div>
          )}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {infoCards.map((item, index) => {
          const iconClassName = "h-5 w-5 text-emerald-400";

          return (
            <div key={item.title} className={darkCard}>
              {index === 0 ? <Mail className={iconClassName} /> : null}
              {index === 1 ? <PhoneCall className={iconClassName} /> : null}
              {index > 1 ? <MapPin className={iconClassName} /> : null}
              <h2 className="mt-4 font-(--font-display) text-lg font-semibold text-white">
                {item.title}
              </h2>
              <p className="mt-2 text-sm text-slate-400">{item.body}</p>
            </div>
          );
        })}
      </section>

      <section className="rounded-3xl border border-emerald-500/30 bg-emerald-500/10 px-8 py-12">
        <h2 className="max-w-3xl font-(--font-display) text-3xl font-bold tracking-tight text-white">
          Need technical or compliance detail before a strategy call?
        </h2>
        <p className="mt-4 max-w-3xl text-slate-300">
          We can provide architecture details, security documentation, and implementation scope for
          stakeholder review.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/contact?intent=strategy-call"
            className="cta-lift inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500"
          >
            Book a Strategy Review
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          <Link
            href="/contact?intent=security-review"
            className="cta-lift inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-slate-600 hover:text-white"
          >
            Request Security Review
          </Link>
          <Link
            href="/case-studies"
            className="cta-lift inline-flex items-center gap-2 text-sm font-semibold text-emerald-300 transition hover:text-emerald-200"
          >
            Review revenue platform case studies
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/projects"
            className="cta-lift inline-flex items-center gap-2 text-sm font-semibold text-emerald-300 transition hover:text-emerald-200"
          >
            Review client projects
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
        <p className="mt-6 font-(--font-mono) text-xs text-emerald-100/70">
          Strategy, technical, and security review paths all route through the same team with clear next steps.
        </p>
      </section>
    </div>
  );
}
