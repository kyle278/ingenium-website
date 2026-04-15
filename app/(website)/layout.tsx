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
          description: "Conversion architecture that captures better enquiries and feeds the CRM cleanly.",
        },
        {
          href: "/crm",
          label: "CRM",
          description: "Record design, pipeline discipline, and handoff continuity in one operating layer.",
        },
        {
          href: "/ai-agents",
          label: "AI Agents",
          description: "Governed AI support with approvals, review paths, and audit history.",
        },
        {
          href: "/automations",
          label: "Automations",
          description: "Trigger-owner-escalation logic that keeps the work moving.",
        },
      ],
    },
    { href: "/case-studies", label: "Proof" },
    { href: "/security", label: "Security" },
    { href: "/implementation", label: "Implementation" },
    { href: "/contact", label: "Contact" },
  ],
  primaryCta: { label: "Book Demo", href: "/demo" },
  secondaryCta: { label: "See the Platform", href: "/platform" },
};

const footerContent = {
  summary:
    "Ingenium helps service businesses run acquisition, CRM execution, handoff, reporting, and governed AI support in one accountable operating system.",
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
    { href: "/demo", label: "Book Demo" },
    { href: "/platform", label: "See the Platform" },
    { href: "/revenue-systems-teardown", label: "Get a Revenue Systems Teardown" },
  ],
};

export default function WebsiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[var(--color-bg)]">
      <RouteStructuredData />

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="ambient-drift-a absolute -top-24 right-[-5rem] h-72 w-72 rounded-full bg-[rgba(0,87,191,0.08)] blur-[100px]" />
        <div className="ambient-drift-b absolute top-[24%] left-[-8rem] h-96 w-96 rounded-full bg-[rgba(0,103,102,0.08)] blur-[120px]" />
        <div className="ambient-drift-c absolute bottom-[-10rem] right-[18%] h-80 w-80 rounded-full bg-[rgba(24,28,31,0.05)] blur-[100px]" />
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
