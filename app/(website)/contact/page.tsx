import Link from "next/link";
import { ArrowUpRight, CheckCircle2, Mail, MapPin, PhoneCall } from "lucide-react";

import PortalContactForm from "@/app/(website)/contact/PortalContactForm";
import { getActiveFormBySlug, getPublishedContentBlockMap } from "@/lib/portal/queries";
import type { WebsiteContentBlock } from "@/lib/portal/types";
import { hasPortalConnectionConfig } from "@/portalconnect";

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

function getContentText(
  blockMap: Record<string, WebsiteContentBlock>,
  key: string,
  fallbackText: string,
) {
  const block = blockMap[key];

  if (!block) {
    return fallbackText;
  }

  if (typeof block.content === "string" && block.content.trim().length > 0) {
    return block.content;
  }

  if (typeof block.content_json === "string" && block.content_json.trim().length > 0) {
    return block.content_json;
  }

  return fallbackText;
}

function getContentList(
  blockMap: Record<string, WebsiteContentBlock>,
  key: string,
  fallbackList: string[],
) {
  const block = blockMap[key];

  if (!block) {
    return fallbackList;
  }

  if (Array.isArray(block.content_json)) {
    const items = block.content_json
      .filter((item): item is string => typeof item === "string")
      .map((item) => item.trim())
      .filter(Boolean);

    if (items.length > 0) {
      return items;
    }
  }

  if (typeof block.content === "string") {
    const items = block.content
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);

    if (items.length > 0) {
      return items;
    }
  }

  return fallbackList;
}

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
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          className="w-full rounded-2xl border border-slate-200 bg-slate-50/60 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100"
          placeholder="Company website"
          type="url"
        />
        <select className="w-full rounded-2xl border border-slate-200 bg-slate-50/60 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100">
          <option>Budget range</option>
          <option>$25k-$50k</option>
          <option>$50k-$100k</option>
          <option>$100k-$250k</option>
          <option>$250k+</option>
        </select>
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
  const contactFormSlug = process.env.CONTACT_FORM_SLUG ?? "contact";
  const hasSupabaseConfig = Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY);
  let portalForm = null;
  let blockMap: Record<string, WebsiteContentBlock> = {};

  if (hasSupabaseConfig && hasPortalConnectionConfig()) {
    try {
      const [form, contentBlocks] = await Promise.all([
        getActiveFormBySlug(contactFormSlug),
        getPublishedContentBlockMap("contact"),
      ]);
      portalForm = form;
      blockMap = contentBlocks;
    } catch (error) {
      console.error("Portal connection failed for contact page:", error);
    }
  }

  const pageLabel = getContentText(blockMap, "contact.hero.label", "Contact");
  const pageTitle = getContentText(blockMap, "contact.hero.title", "Book a Website Strategy Call");
  const pageBody = getContentText(
    blockMap,
    "contact.hero.body",
    "Tell us about your website goals and we will map the conversion plan, timeline, and rollout.",
  );
  const expectations = getContentList(
    blockMap,
    "contact.expectations",
    fallbackExpectations,
  );
  const callExpectations = getContentList(
    blockMap,
    "contact.call_expectations",
    fallbackCallExpectations,
  );
  const ctaTitle = getContentText(blockMap, "contact.cta.title", "Want a deeper walkthrough?");
  const ctaBody = getContentText(
    blockMap,
    "contact.cta.body",
    "We can share a full website roadmap, platform overview, and security packet.",
  );

  return (
    <div className="space-y-24 md:space-y-32">
      <section className="grid items-start gap-12 lg:grid-cols-[1fr,1.1fr]">
        <div>
          <p className={sectionLabel}>{pageLabel}</p>
          <h1 className="mt-6 font-[var(--font-display)] text-4xl font-bold leading-[1.08] tracking-tight text-slate-900 md:text-5xl">
            {pageTitle}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">{pageBody}</p>
          <div className="mt-8 space-y-3">
            {expectations.map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm text-slate-600">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                {item}
              </div>
            ))}
          </div>

          <div className="mt-10">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
              What to expect on the call
            </p>
            <div className="mt-4 space-y-3">
              {callExpectations.map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-slate-500">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={card}>{portalForm ? <PortalContactForm form={portalForm} /> : <FallbackContactForm />}</div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className={card}>
          <Mail className="h-5 w-5 text-emerald-600" />
          <h3 className="mt-4 font-semibold text-slate-900">Email</h3>
          <p className="mt-1 text-sm text-slate-500">hello@ingeniumconsulting.net</p>
        </div>
        <div className={card}>
          <PhoneCall className="h-5 w-5 text-emerald-600" />
          <h3 className="mt-4 font-semibold text-slate-900">Availability</h3>
          <p className="mt-1 text-sm text-slate-500">Mon-Fri, 9 am-6 pm</p>
        </div>
        <div className={card}>
          <MapPin className="h-5 w-5 text-emerald-600" />
          <h3 className="mt-4 font-semibold text-slate-900">Global presence</h3>
          <p className="mt-1 text-sm text-slate-500">US and EU delivery teams</p>
        </div>
      </section>

      <section className="rounded-[2.5rem] bg-emerald-600 px-8 py-16 text-center text-white shadow-[0_25px_60px_rgba(5,150,105,0.35)]">
        <h2 className="mx-auto max-w-3xl font-[var(--font-display)] text-3xl font-semibold tracking-tight md:text-4xl">
          {ctaTitle}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-emerald-50">{ctaBody}</p>
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
