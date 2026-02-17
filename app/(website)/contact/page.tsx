import Link from "next/link";
import { ArrowUpRight, CheckCircle2, Mail, MapPin, PhoneCall } from "lucide-react";

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

const sectionLabel = "text-xs font-semibold uppercase tracking-[0.3em] text-emerald-700";
const card =
  "rounded-3xl border border-slate-200/70 bg-white/90 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)]";

const fallbackExpectations = [
  "We respond within 1 business day",
  "Strategy call includes a conversion roadmap",
  "Security review available on request",
];

const fallbackCallExpectations = [
  "Walk through your current website and funnel",
  "Identify quick conversion wins",
  "Map a phased rollout plan",
  "Answer security and procurement questions",
];

const fallbackInfoCards = [
  { title: "Email", body: "hello@ingeniumconsulting.net" },
  { title: "Availability", body: "Mon-Fri, 9 am-6 pm" },
  { title: "Global presence", body: "US and EU delivery teams" },
];

function FallbackContactForm() {
  return (
    <form className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          className="w-full rounded-2xl border border-slate-200 bg-slate-50/60 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100"
          placeholder="Full name"
          type="text"
        />
        <input
          className="w-full rounded-2xl border border-slate-200 bg-slate-50/60 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100"
          placeholder="Work email"
          type="email"
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          className="w-full rounded-2xl border border-slate-200 bg-slate-50/60 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100"
          placeholder="Company"
          type="text"
        />
        <input
          className="w-full rounded-2xl border border-slate-200 bg-slate-50/60 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100"
          placeholder="Role"
          type="text"
        />
      </div>
      <textarea
        className="min-h-[140px] w-full rounded-2xl border border-slate-200 bg-slate-50/60 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100"
        placeholder="Tell us about your goals"
      />
      <button
        type="button"
        className="inline-flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-full bg-emerald-600 px-7 py-3.5 text-sm font-semibold text-white opacity-70"
      >
        Portal Form Not Configured
      </button>
      <p className="text-center text-xs text-slate-400">
        Prefer email? Reach us at{" "}
        <span className="font-semibold text-emerald-600">hello@ingeniumconsulting.net</span>
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

  const pageLabel = text(SECTION_KEYS.CONTACT.HERO, BLOCK_KEYS.CONTACT.HERO_LABEL, "Contact");
  const pageTitle = text(
    SECTION_KEYS.CONTACT.HERO,
    BLOCK_KEYS.CONTACT.HERO_TITLE,
    "Book a Website Strategy Call",
  );
  const pageBody = text(
    SECTION_KEYS.CONTACT.HERO,
    BLOCK_KEYS.CONTACT.HERO_BODY,
    "Tell us about your website goals and we will map the conversion plan, timeline, and rollout.",
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
    "What to expect on the call",
  );
  const infoCards = json(
    SECTION_KEYS.CONTACT.INFO,
    getSectionContentBlockKey(PAGE_KEYS.CONTACT, SECTION_KEYS.CONTACT.INFO),
    fallbackInfoCards,
  );
  const ctaTitle = text(
    SECTION_KEYS.CONTACT.CTA,
    BLOCK_KEYS.CONTACT.CTA_TITLE,
    "Want a deeper walkthrough?",
  );
  const ctaBody = text(
    SECTION_KEYS.CONTACT.CTA,
    BLOCK_KEYS.CONTACT.CTA_BODY,
    "We can share a full website roadmap, platform overview, and security packet.",
  );
  const formDescription = text(
    SECTION_KEYS.CONTACT.FORM,
    BLOCK_KEYS.CONTACT.FORM_DESCRIPTION,
    "",
  );

  const infoContentBlockKey = getSectionContentBlockKey(PAGE_KEYS.CONTACT, SECTION_KEYS.CONTACT.INFO);

  return (
    <div className="space-y-24 md:space-y-32">
      <section className="grid items-start gap-12 lg:grid-cols-[1fr,1.1fr]">
        <div>
          <p className={sectionLabel} {...content.attrs(SECTION_KEYS.CONTACT.HERO, BLOCK_KEYS.CONTACT.HERO_LABEL)}>
            {pageLabel}
          </p>
          <h1
            className="mt-6 font-[var(--font-display)] text-4xl font-bold leading-[1.08] tracking-tight text-slate-900 md:text-5xl"
            {...content.attrs(SECTION_KEYS.CONTACT.HERO, BLOCK_KEYS.CONTACT.HERO_TITLE)}
          >
            {pageTitle}
          </h1>
          <p
            className="mt-4 text-lg leading-relaxed text-slate-600"
            {...content.attrs(SECTION_KEYS.CONTACT.HERO, BLOCK_KEYS.CONTACT.HERO_BODY)}
          >
            {pageBody}
          </p>
          <div className="mt-8 space-y-3">
            {expectations.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 text-sm text-slate-600"
                {...content.attrs(SECTION_KEYS.CONTACT.EXPECTATIONS, BLOCK_KEYS.CONTACT.EXPECTATIONS)}
              >
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                {item}
              </div>
            ))}
          </div>

          <div className="mt-10">
            <p
              className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400"
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
                  className="flex items-center gap-3 text-sm text-slate-500"
                  {...content.attrs(
                    SECTION_KEYS.CONTACT.CALL_EXPECTATIONS,
                    BLOCK_KEYS.CONTACT.CALL_EXPECTATIONS,
                  )}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={card}>
          {portalForm ? <PortalContactForm form={portalForm} description={formDescription} /> : <FallbackContactForm />}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {(Array.isArray(infoCards) ? infoCards : fallbackInfoCards).map((item, index) => {
          const title = typeof item?.title === "string" ? item.title : fallbackInfoCards[index]?.title;
          const body = typeof item?.body === "string" ? item.body : fallbackInfoCards[index]?.body;
          const key = `${title ?? "contact-info"}-${index}`;

          if (index === 0) {
            return (
              <div key={key} className={card}>
                <Mail className="h-5 w-5 text-emerald-600" />
                <h3
                  className="mt-4 font-semibold text-slate-900"
                  {...content.attrs(SECTION_KEYS.CONTACT.INFO, infoContentBlockKey)}
                >
                  {title}
                </h3>
                <p
                  className="mt-1 text-sm text-slate-500"
                  {...content.attrs(SECTION_KEYS.CONTACT.INFO, infoContentBlockKey)}
                >
                  {body}
                </p>
              </div>
            );
          }

          if (index === 1) {
            return (
              <div key={key} className={card}>
                <PhoneCall className="h-5 w-5 text-emerald-600" />
                <h3
                  className="mt-4 font-semibold text-slate-900"
                  {...content.attrs(SECTION_KEYS.CONTACT.INFO, infoContentBlockKey)}
                >
                  {title}
                </h3>
                <p
                  className="mt-1 text-sm text-slate-500"
                  {...content.attrs(SECTION_KEYS.CONTACT.INFO, infoContentBlockKey)}
                >
                  {body}
                </p>
              </div>
            );
          }

          return (
            <div key={key} className={card}>
              <MapPin className="h-5 w-5 text-emerald-600" />
              <h3
                className="mt-4 font-semibold text-slate-900"
                {...content.attrs(SECTION_KEYS.CONTACT.INFO, infoContentBlockKey)}
              >
                {title}
              </h3>
              <p
                className="mt-1 text-sm text-slate-500"
                {...content.attrs(SECTION_KEYS.CONTACT.INFO, infoContentBlockKey)}
              >
                {body}
              </p>
            </div>
          );
        })}
      </section>

      <section className="rounded-[2.5rem] bg-emerald-600 px-8 py-16 text-center text-white shadow-[0_25px_60px_rgba(5,150,105,0.35)]">
        <h2
          className="mx-auto max-w-3xl font-[var(--font-display)] text-3xl font-semibold tracking-tight md:text-4xl"
          {...content.attrs(SECTION_KEYS.CONTACT.CTA, BLOCK_KEYS.CONTACT.CTA_TITLE)}
        >
          {ctaTitle}
        </h2>
        <p
          className="mx-auto mt-4 max-w-xl text-emerald-50"
          {...content.attrs(SECTION_KEYS.CONTACT.CTA, BLOCK_KEYS.CONTACT.CTA_BODY)}
        >
          {ctaBody}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            View Case Studies
          </Link>
          <Link
            href="/security"
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
          >
            Request Security Packet
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
