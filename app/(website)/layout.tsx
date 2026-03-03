import SiteNav from "./components/SiteNav";
import SiteFooter from "./components/SiteFooter";
import RouteStructuredData from "./components/RouteStructuredData";

export const revalidate = 300;

const navContent = {
  brand: "Ingenium",
  items: [
    { href: "/websites", label: "Websites" },
    { href: "/platform", label: "Platform" },
    { href: "/agents", label: "AI Agents" },
    { href: "/crm", label: "CRM" },
    { href: "/team", label: "Team" },
    { href: "/case-studies", label: "Case Studies" },
    { href: "/security", label: "Security" },
  ],
  contact_label: "Contact",
  cta_label: "Book a Strategy Call",
};

const footerContent = {
  brand: "Ingenium",
  summary:
    "Enterprise web design agency building conversion systems - website, CRM, AI agents, and automation - to grow your pipeline.",
  product_title: "Services",
  product_links: [
    { href: "/websites", label: "Website Redesign" },
    { href: "/platform", label: "Platform" },
    { href: "/agents", label: "AI Agents" },
    { href: "/crm", label: "CRM Implementation" },
    { href: "/automations", label: "Automations" },
    { href: "/departments", label: "AI Departments" },
  ],
  company_title: "Company",
  company_links: [
    { href: "/about", label: "About" },
    { href: "/team", label: "Team" },
    { href: "/case-studies", label: "Case Studies" },
    { href: "/security", label: "Security" },
    { href: "/contact", label: "Contact" },
  ],
  contact_title: "Get in touch",
  contact_items: [
    "hello@ingeniumconsulting.net",
    "Mon-Fri, 9 am-6 pm EST",
    "US + EU delivery teams",
  ],
  security_link_label: "Security overview",
  legal_line: "\u00a9 2026 Ingenium Digital Consulting. All rights reserved.",
  legal_tagline: "Enterprise conversion systems",
  tags: ["Websites", "AI Agents", "CRM", "Automations"],
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
