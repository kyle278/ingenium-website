import type { Metadata } from "next";

import { WEBSITE_FORM_NAMES, WEBSITE_FORM_SLUGS } from "@/lib/portalIntegration/forms";
import { buildMetadata, pageSeo } from "@/lib/seo";

import IntakePathPage from "../contact/IntakePathPage";
import { intakePaths } from "../contact/pathContent";

export const metadata: Metadata = buildMetadata(pageSeo["/demo"]);

export default function DemoPage() {
  return (
    <IntakePathPage
      config={intakePaths.demo}
      formName={WEBSITE_FORM_NAMES.contact}
      formSlug={WEBSITE_FORM_SLUGS.contact}
    />
  );
}
