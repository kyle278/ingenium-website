import type { Metadata } from "next";

import { WEBSITE_FORM_NAMES, WEBSITE_FORM_SLUGS } from "@/lib/portalIntegration/forms";
import { getPortalFormBySlug } from "@/lib/portalIntegration/server";
import { buildMetadata, pageSeo } from "@/lib/seo";

import { ButtonLink, SectionIntro, SurfaceCard } from "../components/sitePrimitives";
import ContactForm from "./ContactForm";

export const metadata: Metadata = buildMetadata(pageSeo["/contact"]);
export const dynamic = "force-dynamic";

const routes = [
  {
    title: "Book Demo",
    body: "Best for product evaluation and fit.",
    intent: "book-demo",
  },
  {
    title: "Revenue Systems Teardown",
    body: "Best for diagnosing leakage and rollout priorities.",
    intent: "revenue-systems-teardown",
  },
  {
    title: "Technical Review",
    body: "Best for architecture, security, and stakeholder review.",
    intent: "technical-review",
  },
];

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
    <div className="space-y-24 pb-8 md:space-y-32">
      <section className="grid items-start gap-8 pt-6 lg:grid-cols-[0.95fr,1.05fr]">
        <div>
          <p className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.28em] text-[var(--color-brand)]">
            Contact
          </p>
          <h1 className="mt-6 max-w-4xl font-[var(--font-display)] text-5xl font-semibold tracking-[-0.06em] text-[var(--color-text)] sm:text-6xl">
            See the platform. Then decide the right path.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--color-text-soft)]">
            Start with a demo, a teardown, or a technical review depending on where you are in the buying process.
          </p>

          <div className="mt-10 grid gap-4">
            {routes.map((route) => (
              <SurfaceCard key={route.title} className="panel-hover p-6">
                <p className="font-[var(--font-display)] text-xl font-semibold tracking-[-0.03em] text-[var(--color-text)]">
                  {route.title}
                </p>
                <p className="mt-3 text-sm leading-7 text-[var(--color-text-soft)]">{route.body}</p>
                <div className="mt-4">
                  <ButtonLink action={{ label: route.title, href: `/contact?intent=${route.intent}` }} variant="tertiary" />
                </div>
              </SurfaceCard>
            ))}
          </div>
        </div>

        <SurfaceCard className="p-6 sm:p-8">
          <SectionIntro
            eyebrow="Route request"
            title="Short first step, full Portal tracking retained."
            body="Name, work email, and your biggest growth challenge first. The rest helps us prepare the right follow-up."
          />

          <div className="mt-6 rounded-2xl border border-[var(--color-line)] bg-white/72 px-4 py-4 text-sm text-[var(--color-text-soft)]">
            Response within 1 business day. Technical review and teardown paths route through the same team with clear next steps.
          </div>

          <div className="mt-6">
            {contactForm ? (
              <ContactForm formId={contactForm.id} formSlug={contactForm.slug} formName={contactForm.name} />
            ) : (
              <div className="rounded-[28px] border border-rose-200 bg-rose-50 p-6">
                <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.22em] text-rose-500">
                  Form configuration required
                </p>
                <p className="mt-4 text-sm leading-7 text-slate-700">
                  Upsert the Portal form named <strong>{WEBSITE_FORM_NAMES.contact}</strong> with slug{" "}
                  <strong>{WEBSITE_FORM_SLUGS.contact}</strong>, then reload this page.
                </p>
                {formResolutionError ? (
                  <p className="mt-3 text-xs text-rose-500">{formResolutionError}</p>
                ) : null}
              </div>
            )}
          </div>
        </SurfaceCard>
      </section>

      <section>
        <SectionIntro
          eyebrow="What happens next"
          title="You leave with a clearer path, not a vague follow-up."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            "Current-state leakage and workflow friction identified",
            "Recommended rollout path across website, CRM, AI, and automation",
            "Technical and stakeholder review path if required",
          ].map((item) => (
            <SurfaceCard key={item} className="panel-hover p-6 text-sm leading-7 text-[var(--color-text-soft)]">
              {item}
            </SurfaceCard>
          ))}
        </div>
      </section>
    </div>
  );
}
