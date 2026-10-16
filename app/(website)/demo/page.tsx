

import { WEBSITE_FORM_NAMES, WEBSITE_FORM_SLUGS } from "@/lib/portalIntegration/forms";
import { buildManagedMetadata as buildMetadata } from "@/lib/portalIntegration/seo-runtime";
import {  pageSeo } from "@/lib/seo";

import IntakePathPage from "../contact/IntakePathPage";
import { intakePaths } from "../contact/pathContent";

export async function generateMetadata() { return buildMetadata(pageSeo["/demo"]); }

export default function DemoPage() {
  return (
    <IntakePathPage
      config={intakePaths.demo}
      formName={WEBSITE_FORM_NAMES.contact}
      formSlug={WEBSITE_FORM_SLUGS.contact}
    />
  );
}
