import SiteFooter from "./components/SiteFooter";
import SiteNav from "./components/SiteNav";
import RouteStructuredData from "./components/RouteStructuredData";

export const revalidate = 300;

const navContent = {
  brand: "Ingenium",
  items: [
    { href: "/platform", label: "Platform" },
    {
      label: "Solutions",
      description: "Explore the core parts of the Ingenium platform for marketing, sales, operations, and delivery teams.",
      children: [
        {
          href: "/websites",
          label: "Websites",
          description: "Turn your website into a lead capture and conversion system that feeds the CRM.",
        },
        {
          href: "/crm",
          label: "CRM",
          description: "Keep pipeline, ownership, follow-up, and delivery handoff in one working system.",
        },
        {
          href: "/ai-agents",
          label: "AI Agents",
          description: "Use custom AI agents for prep work, summaries, monitoring, and guided next steps.",
        },
        {
          href: "/automations",
          label: "Automations",
          description: "Run routing, escalation, lifecycle, and SLA workflows without fragile glue.",
        },
      ],
    },
    { href: "/case-studies", label: "Proof" },
    { href: "/security", label: "Security" },
    { href: "/implementation", label: "Implementation" },
    { href: "/contact", label: "Contact" },
  ],
  primaryCta: { label: "Book Demo", href: "/contact?intent=book-demo" },
  secondaryCta: { label: "See the Platform", href: "/platform" },
};

const footerContent = {
  summary:
    "Ingenium brings website lead capture, CRM work, automations, reporting, and custom AI agents into one connected platform for modern service businesses.",
  sitemap: [
    { href: "/", label: "Home" },
    { href: "/platform", label: "Platform" },
    { href: "/websites", label: "Websites" },
    { href: "/crm", label: "CRM" },
    { href: "/ai-agents", label: "AI Agents" },
    { href: "/automations", label: "Automations" },
    { href: "/case-studies", label: "Proof" },
    { href: "/security", label: "Security" },
    { href: "/implementation", label: "Implementation" },
    { href: "/contact", label: "Contact" },
  ],
  actions: [
    { href: "/contact?intent=book-demo", label: "Book Demo" },
    { href: "/platform", label: "See the Platform" },
    { href: "/contact?intent=revenue-systems-teardown", label: "Get a Revenue Systems Teardown" },
  ],
};

export default function WebsiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[var(--color-bg)]">
      <RouteStructuredData />

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="ambient-drift-a absolute -top-24 right-[-5rem] h-72 w-72 rounded-full bg-[rgba(18,121,255,0.10)] blur-[100px]" />
        <div className="ambient-drift-b absolute top-[24%] left-[-8rem] h-96 w-96 rounded-full bg-[rgba(14,165,164,0.08)] blur-[120px]" />
        <div className="ambient-drift-c absolute bottom-[-10rem] right-[18%] h-80 w-80 rounded-full bg-[rgba(22,32,51,0.06)] blur-[100px]" />
      </div>

      <div className="relative">
        <SiteNav content={navContent} />
        <main className="mx-auto max-w-[1280px] px-4 pb-24 pt-10 sm:px-6 md:pt-16 lg:px-8">
          {children}
        </main>
        <SiteFooter content={footerContent} />
      </div>
    </div>
  );
}
