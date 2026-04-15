import type { Metadata } from "next";

import { buildMetadata } from "@/lib/seo";

import ConfirmationPage from "../../contact/ConfirmationPage";

export const metadata: Metadata = buildMetadata({
  title: "Technical Review Request Received | Ingenium",
  description: "Your technical review request has been received.",
  path: "/technical-review/confirmed",
  keywords: ["technical review confirmed"],
  noIndex: true,
});

export default function TechnicalReviewConfirmedPage() {
  return (
    <ConfirmationPage
      title="Technical review request received"
      body="We will confirm the review scope and prepare the relevant architecture or security material. The next step is a security pack or architecture briefing."
      primaryLabel="Review Security"
      primaryHref="/security"
    />
  );
}
