import SiteFooter from "./components/SiteFooter";
import SiteNav from "./components/SiteNav";
import RouteStructuredData from "./components/RouteStructuredData";

export const revalidate = 300;

const navContent = {
  brand: "Ingenium",
  items: [
    { href: "/platform", label: "Platform" },
    { href: "/websites", label: "Websites" },
    { href: "/crm", label: "CRM" },
    { href: "/ai-agents", label: "AI Agents" },
    { href: "/automations", label: "Automations" },
    { href: "/security", label: "Security" },
    { href: "/case-studies", label: "Case Studies" },
    { href: "/implementation", label: "Implementation" },
    { href: "/contact", label: "Contact" },
  ],
  primaryCta: { label: "Book Demo", href: "/contact?intent=book-demo" },
  secondaryCta: { label: "See the Platform", href: "/platform" },
};

const footerContent = {
  summary:
    "Ingenium connects lead capture, CRM execution, workflow automation, delivery visibility, reporting, and AI agents in one governed operating layer.",
  sitemap: [
    { href: "/", label: "Home" },
    { href: "/platform", label: "Platform" },
    { href: "/websites", label: "Websites" },
    { href: "/crm", label: "CRM" },
    { href: "/ai-agents", label: "AI Agents" },
    { href: "/automations", label: "Automations" },
    { href: "/security", label: "Security" },
    { href: "/case-studies", label: "Case Studies" },
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
