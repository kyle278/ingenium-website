import SiteNav from "./components/SiteNav";
import SiteFooter from "./components/SiteFooter";
import RouteStructuredData from "./components/RouteStructuredData";

export const revalidate = 300;

const navContent = {
  brand: "Ingenium",
  items: [
    { href: "/platform", label: "Platform" },
    { href: "/websites", label: "Acquisition Engine" },
    { href: "/crm", label: "CRM" },
    { href: "/agents", label: "AI Agents" },
    { href: "/automations", label: "Automation" },
    { href: "/case-studies", label: "Case Studies" },
    { href: "/security", label: "Security" },
    { href: "/about", label: "Why Ingenium" },
    { href: "/contact", label: "Contact" },
  ],
  cta_label: "Book a Strategy Call",
  cta_href: "/contact",
};

const footerContent = {
  brand: "Ingenium",
  summary:
    "Ingenium is the revenue platform and implementation partner that connects acquisition, CRM, AI execution, and automation into one accountable growth system.",
  product_title: "Platform",
  product_links: [
    { href: "/platform", label: "Platform" },
    { href: "/websites", label: "Acquisition Engine" },
    { href: "/crm", label: "CRM Command" },
    { href: "/agents", label: "AI Agents" },
    { href: "/automations", label: "Automation Layer" },
    { href: "/security", label: "Trust & Governance" },
  ],
  company_title: "Proof & Company",
  company_links: [
    { href: "/about", label: "About" },
    { href: "/case-studies", label: "Case Studies" },
    { href: "/security", label: "Security" },
    { href: "/contact", label: "Contact" },
  ],
  contact_title: "Get in touch",
  contact_items: [
    "Architecture review and rollout planning",
    "US and EU buying teams supported",
    "Portal onboarding and implementation available",
  ],
  security_link_label: "Security overview",
  legal_line: "\u00a9 2026 Ingenium Digital Consulting. All rights reserved.",
  legal_tagline: "Revenue platform and implementation partner",
  tags: ["Platform", "CRM", "AI Agents", "Automation"],
};

export default function WebsiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen bg-slate-950">
      <RouteStructuredData />

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="ambient-drift-a absolute -top-40 right-[-8rem] h-96 w-96 rounded-full bg-emerald-500/8 blur-[100px]" />
        <div className="ambient-drift-b absolute top-1/3 left-[-10rem] h-[500px] w-[500px] rounded-full bg-cyan-500/5 blur-[120px]" />
        <div className="ambient-drift-c absolute bottom-[-12rem] right-1/4 h-80 w-80 rounded-full bg-emerald-500/5 blur-[100px]" />
      </div>

      <div className="relative">
        <SiteNav content={navContent} />
        <main className="mx-auto max-w-7xl px-4 pb-24 pt-12 sm:px-6 md:pt-20">
          {children}
        </main>
        <SiteFooter content={footerContent} />
      </div>
    </div>
  );
}
