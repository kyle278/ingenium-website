import SiteNav from "./components/SiteNav";
import SiteFooter from "./components/SiteFooter";
import PortalEditorBridge from "./components/PortalEditorBridge";
import RouteStructuredData from "./components/RouteStructuredData";
import { PAGE_KEYS, SECTION_KEYS, getSectionContentBlockKey } from "@/src/lib/content-map";
import { buildEditableAttributes, createPageContentResolver, getPublishedBlocks } from "@/src/lib/portal-content";

export const dynamic = "force-dynamic";

const fallbackNavContent = {
  brand: "Ingenium",
  items: [
    { href: "/websites", label: "Websites" },
    { href: "/platform", label: "Platform" },
    { href: "/agents", label: "AI Agents" },
    { href: "/crm", label: "CRM" },
    { href: "/case-studies", label: "Case Studies" },
    { href: "/security", label: "Security" },
  ],
  contact_label: "Contact",
  cta_label: "Book a Strategy Call",
};

const fallbackFooterContent = {
  brand: "Ingenium",
  summary:
    "Enterprise web design agency building conversion systems — website, CRM, AI agents, and automation — to grow your pipeline.",
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
    { href: "/case-studies", label: "Case Studies" },
    { href: "/security", label: "Security" },
    { href: "/contact", label: "Contact" },
  ],
  contact_title: "Get in touch",
  contact_items: [
    "hello@ingeniumconsulting.net",
    "Mon–Fri, 9 am–6 pm EST",
    "US + EU delivery teams",
  ],
  security_link_label: "Security overview",
  legal_line: "\u00a9 2026 Ingenium Digital Consulting. All rights reserved.",
  legal_tagline: "Enterprise conversion systems",
  tags: ["Websites", "AI Agents", "CRM", "Automations"],
};

export default async function WebsiteLayout({ children }: { children: React.ReactNode }) {
  let navContent = fallbackNavContent;
  let footerContent = fallbackFooterContent;

  try {
    const blocks = await getPublishedBlocks();
    const sharedContent = createPageContentResolver(PAGE_KEYS.SHARED, blocks);

    navContent = sharedContent.json(
      SECTION_KEYS.SHARED.NAV,
      getSectionContentBlockKey(PAGE_KEYS.SHARED, SECTION_KEYS.SHARED.NAV),
      fallbackNavContent,
    );

    footerContent = sharedContent.json(
      SECTION_KEYS.SHARED.FOOTER,
      getSectionContentBlockKey(PAGE_KEYS.SHARED, SECTION_KEYS.SHARED.FOOTER),
      fallbackFooterContent,
    );
  } catch (error) {
    console.error("Failed to load shared portal content. Using fallback copy.", error);
  }

  const navAttrs = buildEditableAttributes(
    PAGE_KEYS.SHARED,
    SECTION_KEYS.SHARED.NAV,
    getSectionContentBlockKey(PAGE_KEYS.SHARED, SECTION_KEYS.SHARED.NAV),
  );
  const footerAttrs = buildEditableAttributes(
    PAGE_KEYS.SHARED,
    SECTION_KEYS.SHARED.FOOTER,
    getSectionContentBlockKey(PAGE_KEYS.SHARED, SECTION_KEYS.SHARED.FOOTER),
  );

  return (
    <div className="relative min-h-screen bg-slate-950">
      <PortalEditorBridge />
      <RouteStructuredData />

      {/* Ambient glow effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="ambient-drift-a absolute -top-40 right-[-8rem] h-96 w-96 rounded-full bg-emerald-500/8 blur-[100px]" />
        <div className="ambient-drift-b absolute top-1/3 left-[-10rem] h-[500px] w-[500px] rounded-full bg-cyan-500/5 blur-[120px]" />
        <div className="ambient-drift-c absolute bottom-[-12rem] right-1/4 h-80 w-80 rounded-full bg-emerald-500/5 blur-[100px]" />
      </div>

      <div className="relative">
        <SiteNav content={navContent} editorAttrs={navAttrs} />
        <main className="mx-auto max-w-7xl px-4 pb-24 pt-12 sm:px-6 md:pt-20">
          {children}
        </main>
        <SiteFooter content={footerContent} editorAttrs={footerAttrs} />
      </div>
    </div>
  );
}
