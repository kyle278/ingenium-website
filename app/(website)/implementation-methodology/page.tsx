import type { Metadata } from "next";

import { buildMetadata, pageSeo } from "@/lib/seo";

import PolicyPage from "../components/PolicyPage";

export const metadata: Metadata = buildMetadata(pageSeo["/implementation-methodology"]);

export default function ImplementationMethodologyPage() {
  return (
    <PolicyPage
      eyebrow="Implementation Methodology"
      title="How Ingenium plans and delivers connected operating systems."
      summary="Ingenium implementation work is designed around discovery, scope control, build quality, review, launch, and post-launch support. The exact method depends on the project size, stack, and client constraints."
      updatedLabel="Last reviewed: 7 May 2026"
      sections={[
        {
          title: "Discovery and scope",
          body: "Implementation starts by understanding the current website, CRM, lead capture, automation, reporting, and handoff process. The goal is to identify where the system breaks down before designing the replacement path.",
          items: [
            "Map the current customer journey and internal ownership points.",
            "Identify data sources, forms, CRM objects, automations, and reporting needs.",
            "Separate must-have launch scope from later improvements.",
            "Confirm approval owners, access needs, risks, and dependencies.",
          ],
        },
        {
          title: "Build and review",
          body: "Build work should progress through visible review points. That keeps design, content, data, routing, automation, and reporting decisions aligned before launch.",
          items: [
            "Design and content review before final implementation.",
            "Workflow and CRM logic review before production use.",
            "Testing for forms, routing, notifications, tracking, and key pages.",
            "Security and data-handling checks for sensitive workflow paths.",
          ],
        },
        {
          title: "Launch and improvement",
          body: "Launch is treated as the start of operational use, not the end of the work. Post-launch review should check whether the system is capturing the right signals and whether the team can act on them.",
          items: [
            "Launch readiness review for critical pages, forms, workflows, and reporting.",
            "Fallback or rollback assumptions where relevant.",
            "Post-launch issue triage and refinement.",
            "Measurement review using analytics, CRM data, support feedback, and search visibility where available.",
          ],
        },
      ]}
    />
  );
}
