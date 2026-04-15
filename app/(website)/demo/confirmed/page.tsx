import type { Metadata } from "next";

import { buildMetadata } from "@/lib/seo";

import ConfirmationPage from "../../contact/ConfirmationPage";

export const metadata: Metadata = buildMetadata({
  title: "Demo Request Received | Ingenium",
  description: "Your demo request has been received.",
  path: "/demo/confirmed",
  keywords: ["demo request confirmed"],
  noIndex: true,
});

export default function DemoConfirmedPage() {
  return (
    <ConfirmationPage
      title="Demo request received"
      body="We will follow up to confirm fit, timing, and the walkthrough format. The next step is a scheduler confirmation and platform demo."
      primaryLabel="Review the Platform"
      primaryHref="/platform"
    />
  );
}
