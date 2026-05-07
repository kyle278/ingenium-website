import type { Metadata } from "next";

import { buildMetadata, pageSeo } from "@/lib/seo";

import PolicyPage from "../components/PolicyPage";

export const metadata: Metadata = buildMetadata(pageSeo["/privacy"]);

export default function PrivacyPage() {
  return (
    <PolicyPage
      eyebrow="Privacy"
      title="Privacy notice for Ingenium website visitors and enquiries."
      summary="This basic privacy notice explains how Ingenium may collect and use information from website visitors, form submissions, and business enquiries. It is a practical public summary, not a replacement for a client-specific data processing agreement."
      updatedLabel="Last reviewed: 7 May 2026"
      sections={[
        {
          title: "Information collected",
          body: "Ingenium may collect information that visitors submit directly, along with technical and usage information generated when the website is used.",
          items: [
            "Name, email address, phone number, company name, and message content submitted through forms.",
            "Project, service, or review details supplied during enquiry or intake.",
            "Basic website usage data such as pages viewed, referral source, device information, and form events where analytics are enabled.",
            "Business correspondence created when visitors contact Ingenium directly.",
          ],
        },
        {
          title: "How information is used",
          body: "Information is used to respond to enquiries, prepare demos or reviews, provide requested services, improve the website, maintain records, and protect the website and business systems from abuse.",
          items: [
            "Responding to contact, demo, technical review, and teardown requests.",
            "Preparing project scopes, implementation recommendations, and support replies.",
            "Improving website performance, page clarity, and lead routing.",
            "Maintaining security, troubleshooting issues, and preserving business records.",
          ],
        },
        {
          title: "Sharing and third-party systems",
          body: "Ingenium may use service providers for hosting, analytics, forms, CRM, email, automation, and support operations. Information is shared only where needed to operate the website, respond to enquiries, or deliver agreed services.",
          items: [
            "Website hosting and infrastructure providers.",
            "CRM, email, form, analytics, and automation platforms.",
            "Professional advisers or authorities where required by law.",
            "Client-approved implementation tools used during delivery.",
          ],
        },
        {
          title: "Your choices",
          body: "Visitors can ask Ingenium to review, correct, or remove enquiry information where applicable. Some records may need to be retained for legitimate business, security, contractual, or legal reasons.",
          items: [
            "Use the contact page for privacy requests.",
            "Avoid sending unnecessary sensitive information through website forms.",
            "Client project data should be handled through the agreed project or support route.",
            "Browser or device settings may control some cookie and analytics behavior.",
          ],
        },
      ]}
    />
  );
}
