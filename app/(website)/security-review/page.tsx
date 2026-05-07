import type { Metadata } from "next";

import { buildMetadata, pageSeo } from "@/lib/seo";

import PolicyPage from "../components/PolicyPage";

export const metadata: Metadata = buildMetadata(pageSeo["/security-review"]);

export default function SecurityReviewPage() {
  return (
    <PolicyPage
      eyebrow="Security Review"
      title="Security review process for connected website and CRM work."
      summary="Ingenium supports practical security review before and during implementation. The process is designed to clarify access, approvals, auditability, data boundaries, deployment assumptions, and operational risk."
      updatedLabel="Last reviewed: 7 May 2026"
      sections={[
        {
          title: "What a review covers",
          body: "A security review focuses on the controls that matter for the project scope. It does not claim certification unless a separate certification or audit has been completed and explicitly documented.",
          items: [
            "System access, roles, permission boundaries, and approval ownership.",
            "Data flows between website forms, CRM records, automation tools, analytics, and reporting.",
            "AI-assisted workflow boundaries, human review points, and customer-facing action controls.",
            "Deployment, rollback, monitoring, and incident communication assumptions.",
          ],
        },
        {
          title: "Client responsibilities",
          body: "Client teams remain responsible for their own production systems, user access decisions, customer data obligations, and approval of sensitive workflow changes unless a written agreement says otherwise.",
          items: [
            "Confirm who may grant or revoke access.",
            "Review sensitive configuration before launch.",
            "Provide accurate information about existing systems and constraints.",
            "Notify Ingenium quickly about suspected security or data issues connected to the work.",
          ],
        },
        {
          title: "Review output",
          body: "The output is usually a practical record of assumptions, risks, recommendations, and next steps. The exact format depends on the project, stage, and review depth requested.",
          items: [
            "Current-state observations and implementation risks.",
            "Recommended controls, approval points, and access changes.",
            "Questions that need client, vendor, or legal confirmation.",
            "Launch readiness notes for stakeholders.",
          ],
        },
      ]}
    />
  );
}
