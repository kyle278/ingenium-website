import SiteFooter from "./components/SiteFooter";
import SiteNav from "./components/SiteNav";
import RouteStructuredData from "./components/RouteStructuredData";

export const revalidate = 300;

const footerContent = {
  summary:
    "Connected websites. Intelligent growth. Ingenium helps startups and SMEs launch websites, CRM systems, marketing automation, and AI workflows that work together.",
  sitemap: [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/platform", label: "Platform" },
    { href: "/projects", label: "Projects" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ],
  trust: [
    { href: "/data-handling", label: "Data Handling" },
    { href: "/privacy", label: "Privacy" },
    { href: "/security-review", label: "Security Review" },
    { href: "/support", label: "Support" },
    { href: "/implementation-methodology", label: "Methodology" },
  ],
  actions: [
    { href: "/demo", label: "Book Demo" },
    { href: "/contact", label: "Contact Us" },
    { href: "/revenue-systems-teardown", label: "Revenue Systems Teardown" },
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
        <SiteNav />
        <main className="mx-auto max-w-[1280px] px-4 pb-24 pt-10 sm:px-6 md:pt-16 lg:px-8">
          {children}
        </main>
        <SiteFooter content={footerContent} />
      </div>
    </div>
  );
}
