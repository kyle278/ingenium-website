import type { Metadata } from "next";

import { buildMetadata, pageSeo } from "@/lib/seo";

import PolicyPage from "../components/PolicyPage";

export const metadata: Metadata = buildMetadata(pageSeo["/data-handling"]);

export default function DataHandlingPage() {
  return (
    <PolicyPage
      eyebrow="Data Handling"
      title="How Ingenium handles business and customer data."
      summary="Ingenium works with website, CRM, automation, reporting, and AI workflow data. This page explains the basic boundaries used when handling that information during discovery, implementation, support, and review."
      updatedLabel="Last reviewed: 7 May 2026"
      sections={[
        {
          title: "Data we may handle",
          body: "Depending on the project, Ingenium may handle contact records, lead source data, form submissions, workflow notes, pipeline stages, campaign events, reporting exports, and technical configuration details.",
          items: [
            "Contact and enquiry information supplied through forms or client systems.",
            "CRM fields, lifecycle stages, ownership rules, and pipeline activity.",
            "Automation triggers, message templates, journey states, and campaign performance data.",
            "Technical settings needed to connect websites, forms, analytics, CRM, and automation tools.",
          ],
        },
        {
          title: "Purpose limitation",
          body: "Data is used to deliver the agreed work, diagnose implementation issues, improve workflow reliability, support reporting, and respond to client requests. Ingenium does not need unrestricted access to every system to complete most projects.",
          items: [
            "Access should be limited to the systems and records needed for the task.",
            "Sensitive changes should be reviewed by the client before they affect customers.",
            "Test data should be used where production data is not required.",
            "Client instructions and signed scopes override general examples on this page.",
          ],
        },
        {
          title: "Retention and removal",
          body: "Project files, implementation notes, and support records may be retained where needed for delivery continuity, troubleshooting, and business records. Clients can ask for removal of unnecessary working copies when a project or support request is complete.",
          items: [
            "Production systems remain under the client's control unless separately agreed.",
            "Temporary exports should be removed when they are no longer needed.",
            "Access should be revoked when support or implementation access is no longer required.",
            "Retention needs can vary by contract, system, and legal obligation.",
          ],
        },
      ]}
    />
  );
}
