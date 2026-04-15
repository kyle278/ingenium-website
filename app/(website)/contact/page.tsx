import type { Metadata } from "next";

import { WEBSITE_FORM_NAMES, WEBSITE_FORM_SLUGS } from "@/lib/portalIntegration/forms";
import { getPortalFormBySlug } from "@/lib/portalIntegration/server";
import { buildMetadata, pageSeo } from "@/lib/seo";

import { ButtonLink, SectionIntro, SurfaceCard } from "../components/sitePrimitives";

export const metadata: Metadata = buildMetadata(pageSeo["/contact"]);
export const dynamic = "force-dynamic";

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

export default async function ContactPage() {
  let formResolutionError: string | null = null;

  try {
    await getPortalFormBySlug(WEBSITE_FORM_SLUGS.contact);
  } catch (error) {
    formResolutionError =
      error instanceof Error ? error.message : "Unknown Portal form resolution error.";
  }

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
            Ingenium uses one backend intake, but the public journey is now split by buyer intent so demos, teardown audits, and technical reviews each have a cleaner front end.
          </p>
        </div>
      </section>

      <section>
        <SectionIntro
          eyebrow="Paths"
          title="Three entry points. Three clearer next steps."
        />
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
            eyebrow="What changed"
            title="The public journey is tailored even when the backend stays efficient."
          />
          <div className="mt-8 grid gap-3">
            {[
              "Demo requests now land in a walkthrough-first path.",
              "Teardown requests now land in an audit-first path.",
              "Technical reviews now land in a controls-first path.",
              "Only the clean contact URL is being promoted publicly.",
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-[var(--color-line)] bg-white/72 px-4 py-4 text-sm leading-7 text-[var(--color-text-soft)]">
                {item}
              </div>
            ))}
          </div>
        </SurfaceCard>

        <SurfaceCard dark className="p-8">
          <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.24em] text-cyan-300">
            Ops note
          </p>
          <div className="mt-6 grid gap-3">
            {[
              "Canonical contact hygiene is handled at the page level.",
              "Parameterised contact links are no longer the primary site journey.",
              "Thin or unfinished legacy pages remain noindexed.",
              formResolutionError
                ? `Portal form status: ${formResolutionError}`
                : `Portal form status: ${WEBSITE_FORM_NAMES.contact} is resolving correctly.`,
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/6 px-4 py-4 text-sm text-white/78">
                {item}
              </div>
            ))}
          </div>
        </SurfaceCard>
      </section>
    </div>
  );
}
