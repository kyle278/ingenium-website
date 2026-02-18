import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, CheckCircle2, Mail, MapPin, PhoneCall } from "lucide-react";

import PortalContactForm from "@/app/(website)/contact/PortalContactForm";
import {
  BLOCK_KEYS,
  BLOCK_NAMES,
  PAGE_KEYS,
  SECTION_KEYS,
  buildBlockKey,
  getSectionContentBlockKey,
} from "@/src/lib/content-map";
import {
  createPageContentResolver,
  getPublishedBlocks,
  type NormalizedWebsiteContentBlock,
} from "@/src/lib/portal-content";
import { getActiveFormByIdentifier } from "@/src/lib/portal-forms";
import { hasPortalConnectConfig } from "@/src/portalconnect";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Book a Website Strategy Consultation | Ingenium",
  description:
    "Start with a strategy call. Tell us your biggest growth challenge and get a tailored conversion roadmap within 48 hours.",
  openGraph: {
    title: "Book a Website Strategy Consultation | Ingenium",
    description:
      "Start with a strategy call and get a tailored website, CRM, and automation roadmap for pipeline growth.",
    url: "/contact",
  },
  alternates: { canonical: "/contact" },
};

const sectionLabel = "font-(--font-mono) text-xs uppercase tracking-widest text-emerald-400";
const darkCard = "rounded-2xl border border-slate-800 bg-slate-900/70 p-6";

const fallbackExpectations = [
  "Response within 1 business day",
  "Conversion roadmap delivered within 48 hours",
  "Security review support for enterprise buyers",
];

const fallbackCallExpectations = [
  "Current funnel and conversion leak analysis",
  "Priority fixes by impact and implementation effort",
  "Recommended website, CRM, and automation architecture",
  "Next-step plan with owners and timeline",
];

const fallbackInfoCards = [
  { title: "Email", body: "hello@ingeniumconsulting.net" },
  { title: "Availability", body: "Mon-Fri, 9 am-6 pm ET" },
  { title: "Delivery footprint", body: "US and EU coverage" },
];

function FallbackContactForm() {
  return (
    <form className="space-y-5">
      <div className="space-y-2">
        <p className="font-(--font-mono) text-xs uppercase tracking-widest text-slate-500">
          Step 1 of 2
        </p>
        <p className="text-sm text-slate-400">
          Portal form not configured yet. Add fields in the portal to enable submissions.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          className="w-full rounded-lg border border-slate-700 bg-slate-800/60 px-4 py-3 text-sm text-slate-200 placeholder-slate-500 outline-none"
          placeholder="Name"
          type="text"
          disabled
        />
        <input
          className="w-full rounded-lg border border-slate-700 bg-slate-800/60 px-4 py-3 text-sm text-slate-200 placeholder-slate-500 outline-none"
          placeholder="Work email"
          type="email"
          disabled
        />
      </div>
      <textarea
        className="min-h-[120px] w-full rounded-lg border border-slate-700 bg-slate-800/60 px-4 py-3 text-sm text-slate-200 placeholder-slate-500 outline-none"
        placeholder="What is your biggest growth challenge?"
        disabled
      />
      <button
        type="button"
        className="inline-flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-lg bg-slate-700 px-7 py-3.5 text-sm font-semibold text-slate-300 opacity-80"
      >
        Portal Form Not Configured
      </button>
      <p className="text-center text-xs text-slate-500">
        Prefer email? Reach us at{" "}
        <span className="font-medium text-emerald-400">hello@ingeniumconsulting.net</span>
      </p>
    </form>
  );
}

export default async function ContactPage() {
  const contactFormIdentifier =
    process.env.NEXT_PUBLIC_CONTACT_FORM_SLUG ?? process.env.CONTACT_FORM_SLUG ?? "contact";
  const shouldUsePortal = hasPortalConnectConfig();

  let blocks: NormalizedWebsiteContentBlock[] = [];
  let portalForm = null;

  if (shouldUsePortal) {
    try {
      const [form, contentBlocks] = await Promise.all([
        getActiveFormByIdentifier(contactFormIdentifier),
        getPublishedBlocks(),
      ]);
      portalForm = form;
      blocks = contentBlocks;
    } catch (error) {
      console.error("Portal connection failed for contact page:", error);
    }
  }

  const content = createPageContentResolver(PAGE_KEYS.CONTACT, blocks);
  const text = (sectionKey: string, blockKey: string, fallback: string) =>
    shouldUsePortal ? content.text(sectionKey, blockKey, fallback) : fallback;
  const list = (sectionKey: string, blockKey: string, fallback: string[]) =>
    shouldUsePortal ? content.list(sectionKey, blockKey, fallback) : fallback;
  const json = <T,>(sectionKey: string, blockKey: string, fallback: T) =>
    shouldUsePortal ? content.json(sectionKey, blockKey, fallback) : fallback;

  const pageLabel = text(
    SECTION_KEYS.CONTACT.HERO,
    BLOCK_KEYS.CONTACT.HERO_LABEL,
    "Website Strategy Consultation",
  );
  const pageTitle = text(
    SECTION_KEYS.CONTACT.HERO,
    BLOCK_KEYS.CONTACT.HERO_TITLE,
    "Tell us your growth challenge. We will map the conversion system.",
  );
  const pageBody = text(
    SECTION_KEYS.CONTACT.HERO,
    BLOCK_KEYS.CONTACT.HERO_BODY,
    "Start with a short strategy intake. We design a practical plan covering website conversion, CRM pipeline flow, AI automation, and governance.",
  );
  const expectations = list(
    SECTION_KEYS.CONTACT.EXPECTATIONS,
    BLOCK_KEYS.CONTACT.EXPECTATIONS,
    fallbackExpectations,
  );
  const callExpectations = list(
    SECTION_KEYS.CONTACT.CALL_EXPECTATIONS,
    BLOCK_KEYS.CONTACT.CALL_EXPECTATIONS,
    fallbackCallExpectations,
  );
  const callExpectationsTitle = text(
    SECTION_KEYS.CONTACT.CALL_EXPECTATIONS,
    buildBlockKey(PAGE_KEYS.CONTACT, SECTION_KEYS.CONTACT.CALL_EXPECTATIONS, BLOCK_NAMES.LABEL),
    "What happens after you submit",
  );
  const infoCards = json(
    SECTION_KEYS.CONTACT.INFO,
    getSectionContentBlockKey(PAGE_KEYS.CONTACT, SECTION_KEYS.CONTACT.INFO),
    fallbackInfoCards,
  );
  const ctaTitle = text(
    SECTION_KEYS.CONTACT.CTA,
    BLOCK_KEYS.CONTACT.CTA_TITLE,
    "Need technical or compliance detail before a strategy call?",
  );
  const ctaBody = text(
    SECTION_KEYS.CONTACT.CTA,
    BLOCK_KEYS.CONTACT.CTA_BODY,
    "We can provide architecture details, security documentation, and implementation scope for stakeholder review.",
  );
  const formDescription = text(
    SECTION_KEYS.CONTACT.FORM,
    BLOCK_KEYS.CONTACT.FORM_DESCRIPTION,
    "",
  );

  const infoContentBlockKey = getSectionContentBlockKey(PAGE_KEYS.CONTACT, SECTION_KEYS.CONTACT.INFO);
  const safeInfoCards = Array.isArray(infoCards) ? infoCards : fallbackInfoCards;

  return (
    <div className="space-y-24 md:space-y-28">
      <section className="grid items-start gap-8 lg:grid-cols-[1.05fr,0.95fr]">
        <div>
          <p className={sectionLabel} {...content.attrs(SECTION_KEYS.CONTACT.HERO, BLOCK_KEYS.CONTACT.HERO_LABEL)}>
            {pageLabel}
          </p>
          <h1
            className="mt-5 max-w-3xl font-(--font-display) text-4xl font-bold tracking-tight text-white sm:text-5xl"
            {...content.attrs(SECTION_KEYS.CONTACT.HERO, BLOCK_KEYS.CONTACT.HERO_TITLE)}
          >
            {pageTitle}
          </h1>
          <p
            className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-400"
            {...content.attrs(SECTION_KEYS.CONTACT.HERO, BLOCK_KEYS.CONTACT.HERO_BODY)}
          >
            {pageBody}
          </p>

          <div className="mt-8 space-y-3">
            {expectations.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 text-sm text-slate-300"
                {...content.attrs(SECTION_KEYS.CONTACT.EXPECTATIONS, BLOCK_KEYS.CONTACT.EXPECTATIONS)}
              >
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                {item}
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
            <p
              className="font-(--font-mono) text-xs uppercase tracking-widest text-slate-500"
              {...content.attrs(
                SECTION_KEYS.CONTACT.CALL_EXPECTATIONS,
                buildBlockKey(PAGE_KEYS.CONTACT, SECTION_KEYS.CONTACT.CALL_EXPECTATIONS, BLOCK_NAMES.LABEL),
              )}
            >
              {callExpectationsTitle}
            </p>
            <div className="mt-4 space-y-3">
              {callExpectations.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-sm text-slate-300"
                  {...content.attrs(
                    SECTION_KEYS.CONTACT.CALL_EXPECTATIONS,
                    BLOCK_KEYS.CONTACT.CALL_EXPECTATIONS,
                  )}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={`${darkCard} grid-lines`}>
          {portalForm ? <PortalContactForm form={portalForm} description={formDescription} /> : <FallbackContactForm />}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {safeInfoCards.map((item, index) => {
          const title = typeof item?.title === "string" ? item.title : fallbackInfoCards[index]?.title;
          const body = typeof item?.body === "string" ? item.body : fallbackInfoCards[index]?.body;
          const key = `${title ?? "contact-info"}-${index}`;
          const iconClassName = "h-5 w-5 text-emerald-400";

          return (
            <div key={key} className={darkCard}>
              {index === 0 ? <Mail className={iconClassName} /> : null}
              {index === 1 ? <PhoneCall className={iconClassName} /> : null}
              {index > 1 ? <MapPin className={iconClassName} /> : null}
              <h2
                className="mt-4 font-(--font-display) text-lg font-semibold text-white"
                {...content.attrs(SECTION_KEYS.CONTACT.INFO, infoContentBlockKey)}
              >
                {title}
              </h2>
              <p className="mt-2 text-sm text-slate-400" {...content.attrs(SECTION_KEYS.CONTACT.INFO, infoContentBlockKey)}>
                {body}
              </p>
            </div>
          );
        })}
      </section>

      <section className="rounded-3xl border border-emerald-500/30 bg-emerald-500/10 px-8 py-12">
        <h2
          className="max-w-3xl font-(--font-display) text-3xl font-bold tracking-tight text-white"
          {...content.attrs(SECTION_KEYS.CONTACT.CTA, BLOCK_KEYS.CONTACT.CTA_TITLE)}
        >
          {ctaTitle}
        </h2>
        <p
          className="mt-4 max-w-3xl text-slate-300"
          {...content.attrs(SECTION_KEYS.CONTACT.CTA, BLOCK_KEYS.CONTACT.CTA_BODY)}
        >
          {ctaBody}
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/contact?intent=strategy-call"
            className="cta-lift inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500"
          >
            Book a Strategy Call
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
            Review enterprise website case studies
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
