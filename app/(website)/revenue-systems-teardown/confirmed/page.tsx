

import { buildManagedMetadata as buildMetadata } from "@/lib/portalIntegration/seo-runtime";


import ConfirmationPage from "../../contact/ConfirmationPage";

export async function generateMetadata() { return buildMetadata({
  title: "Teardown Request Received | Ingenium",
  description: "Your revenue systems teardown request has been received.",
  path: "/revenue-systems-teardown/confirmed",
  keywords: ["teardown request confirmed"],
  noIndex: true,
}); }

export default function RevenueSystemsTeardownConfirmedPage() {
  return (
    <ConfirmationPage
      title="Teardown request received"
      body="We will review the intake, confirm scope, and move your request into the audit handoff. The next step is a prioritised gap review."
      primaryLabel="View Projects"
      primaryHref="/projects"
    />
  );
}
