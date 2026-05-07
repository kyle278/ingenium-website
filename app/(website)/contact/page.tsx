import type { Metadata } from "next";

import {
  ORGANIZATION_ADDRESS,
  ORGANIZATION_PHONE,
  ORGANIZATION_SAME_AS,
  buildMetadata,
  pageSeo,
} from "@/lib/seo";

import PageReviewMeta from "../components/PageReviewMeta";
import { ButtonLink, SectionIntro, SurfaceCard } from "../components/sitePrimitives";

export const metadata: Metadata = buildMetadata(pageSeo["/contact"]);

const routes = [
  {
    title: "Book Demo",
    body: "See the operating model, the workflow handoff, and where your team fits.",
    href: "/demo",
  },
  {
    title: "Revenue Systems Teardown",
    body: "Map the gaps between your website, CRM, automation, delivery handoff, and reporting.",
    href: "/revenue-systems-teardown",
  },
  {
    title: "Technical Review",
    body: "Give technical stakeholders a clear route into architecture, controls, and review material.",
    href: "/technical-review",
  },
];

export default function ContactPage() {
  return (
    <div className="space-y-20 pb-8 md:space-y-28">
      <section className="pt-4">
        <div className="max-w-4xl">
          <p className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.28em] text-[var(--color-brand)]">
            Contact
          </p>
          <h1 className="mt-6 max-w-4xl font-[var(--font-display)] text-5xl font-semibold tracking-[-0.06em] text-[var(--color-text)] sm:text-6xl">
            Choose the buying path that matches the question you need answered.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--color-text-soft)]">
            Three entry points. Three clearer next steps. If you are unsure, a quick call will point you to the right
            route.
          </p>
          <PageReviewMeta />
        </div>
      </section>

      <section>
        <SectionIntro eyebrow="Paths" title="Book a demo, request a teardown, or start a technical review." />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {routes.map((route) => (
            <SurfaceCard key={route.title} className="panel-hover p-6">
              <p className="font-[var(--font-display)] text-xl font-semibold tracking-[-0.03em] text-[var(--color-text)]">
                {route.title}
              </p>
              <p className="mt-3 text-sm leading-7 text-[var(--color-text-soft)]">{route.body}</p>
              <div className="mt-4">
                <ButtonLink action={{ label: route.title, href: route.href }} variant="tertiary" />
              </div>
            </SurfaceCard>
          ))}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <SurfaceCard className="p-8">
          <SectionIntro
            eyebrow="Why connect"
            title="A quick conversation helps us map your current tools and growth plan."
          />
          <div className="mt-8 grid gap-3">
            {[
              "Website, CRM, marketing automation, and AI can be scoped together.",
              "You get a clearer recommendation instead of a generic sales call.",
              "The next step matches your buying stage and stakeholder needs.",
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-[var(--color-line)] bg-white/72 px-4 py-4 text-sm leading-7 text-[var(--color-text-soft)]">
                {item}
              </div>
            ))}
          </div>
        </SurfaceCard>

        <SurfaceCard dark className="p-8">
          <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.24em] text-cyan-300">
            Support info
          </p>
          <div className="mt-6 grid gap-3">
            {[
              "Email: hello@ingeniumconsulting.net",
              `Phone: ${ORGANIZATION_PHONE}`,
              `Office: ${ORGANIZATION_ADDRESS.streetAddress}, ${ORGANIZATION_ADDRESS.addressLocality}, ${ORGANIZATION_ADDRESS.postalCode}, Ireland`,
              "We reply to new enquiries within 1 business day.",
              "Primary route for demos and project discussions: /demo",
              "Technical stakeholder route: /technical-review",
              "If a form is unavailable, email hello@ingeniumconsulting.net and we will route the next step manually.",
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/6 px-4 py-4 text-sm text-white/78">
                {item}
              </div>
            ))}
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <a
              href={ORGANIZATION_SAME_AS[0]}
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl border border-white/10 bg-white/6 px-4 py-4 text-sm text-white/78 transition hover:text-white"
            >
              Google Business Profile
            </a>
            <a
              href={ORGANIZATION_SAME_AS[1]}
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl border border-white/10 bg-white/6 px-4 py-4 text-sm text-white/78 transition hover:text-white"
            >
              Company LinkedIn
            </a>
          </div>
        </SurfaceCard>
      </section>
    </div>
  );
}
