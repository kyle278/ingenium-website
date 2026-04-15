import type { Metadata } from "next";

import { WEBSITE_FORM_NAMES, WEBSITE_FORM_SLUGS } from "@/lib/portalIntegration/forms";
import { getPortalFormBySlug } from "@/lib/portalIntegration/server";
import { buildMetadata, pageSeo } from "@/lib/seo";

import IntakePathPage from "../contact/IntakePathPage";
import { intakePaths } from "../contact/pathContent";

export const metadata: Metadata = buildMetadata(pageSeo["/revenue-systems-teardown"]);
export const dynamic = "force-dynamic";

export default async function RevenueSystemsTeardownPage() {
  const contactForm = await getPortalFormBySlug(WEBSITE_FORM_SLUGS.contact).catch(() => null);

  if (!contactForm) {
    throw new Error(`Unable to resolve ${WEBSITE_FORM_NAMES.contact}.`);
  }

  return (
    <IntakePathPage
      config={intakePaths["revenue-systems-teardown"]}
      formId={contactForm.id}
      formSlug={contactForm.slug}
      formName={contactForm.name}
    />
  );
}
