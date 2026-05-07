import type { Metadata } from "next";

import { buildMetadata, pageSeo } from "@/lib/seo";

import PolicyPage from "../components/PolicyPage";

export const metadata: Metadata = buildMetadata(pageSeo["/support"]);

export default function SupportPage() {
  return (
    <PolicyPage
      eyebrow="Support"
      title="Support process for Ingenium websites, CRM systems, and workflows."
      summary="This page sets out the basic support model for active Ingenium clients. Specific retainers, service levels, emergency routes, and response expectations should be agreed in writing."
      updatedLabel="Last reviewed: 7 May 2026"
      sections={[
        {
          title: "Support scope",
          body: "Support may cover websites, forms, CRM workflows, automation journeys, reporting, AI workflow configuration, and implementation questions connected to an active project or agreed support arrangement.",
          items: [
            "Bug investigation and troubleshooting.",
            "Form, routing, CRM, automation, and reporting issues.",
            "Small content or configuration updates where included in scope.",
            "Guidance on workflow use, review steps, and operational handoff.",
          ],
        },
        {
          title: "Support requests",
          body: "Good support requests include the affected page or system, what happened, what was expected, urgency, screenshots where useful, and any recent changes that might be related.",
          items: [
            "Use the agreed client channel where one exists.",
            "Use the contact page for general support questions if no channel exists.",
            "Avoid sending passwords or unnecessary sensitive customer data.",
            "Mark urgent production issues clearly and explain the business impact.",
          ],
        },
        {
          title: "Response expectations",
          body: "Response times depend on the active agreement, issue severity, business hours, and whether third-party vendors are involved. Without a written service level, support is handled on a commercially reasonable basis.",
          items: [
            "Critical production issues should be separated from routine requests.",
            "Vendor outages, DNS changes, payment platforms, and third-party APIs may require outside action.",
            "Feature requests may need a separate scope, estimate, or delivery slot.",
            "Post-launch support should include review of access and ownership.",
          ],
        },
      ]}
    />
  );
}
