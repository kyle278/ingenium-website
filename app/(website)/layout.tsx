import SiteNav from "./components/SiteNav";
import SiteFooter from "./components/SiteFooter";
import PortalEditorBridge from "./components/PortalEditorBridge";
import { PAGE_KEYS, SECTION_KEYS, getSectionContentBlockKey } from "@/src/lib/content-map";
import { buildEditableAttributes, createPageContentResolver, getPublishedBlocks } from "@/src/lib/portal-content";

export const dynamic = "force-dynamic";

const fallbackNavContent = {
  brand: "Ingenium",
  items: [
    { href: "/websites", label: "Websites" },
    { href: "/platform", label: "Platform" },
    { href: "/case-studies", label: "Case Studies" },
    { href: "/security", label: "Security" },
  ],
  contact_label: "Contact",
  cta_label: "Book a Strategy Call",
};

const fallbackFooterContent = {
  brand: "Ingenium",
  summary:
    "Enterprise websites and AI operations that drive pipeline, backed by CRM, automation, and governance.",
  product_title: "Product",
  product_links: [
    { href: "/websites", label: "Websites" },
    { href: "/platform", label: "Platform" },
    { href: "/agents", label: "AI Agents" },
    { href: "/crm", label: "CRM" },
    { href: "/automations", label: "Automations" },
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
    "Mon-Fri, 9 am-6 pm",
    "US + EU delivery teams",
  ],
  security_link_label: "Security overview",
  legal_line: "\u00a9 2026 Ingenium Digital Consulting. All rights reserved.",
  legal_tagline: "Enterprise website systems",
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
    <div className="relative min-h-screen overflow-hidden bg-[#f6f2eb]">
      <PortalEditorBridge />
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 right-[-4rem] h-72 w-72 rounded-full bg-emerald-200/40 blur-3xl" />
        <div className="absolute top-1/3 left-[-6rem] h-96 w-96 rounded-full bg-amber-200/40 blur-3xl" />
        <div className="absolute bottom-[-10rem] right-1/3 h-80 w-80 rounded-full bg-sky-200/30 blur-3xl" />
      </div>
      <div className="relative">
        <SiteNav content={navContent} editorAttrs={navAttrs} />
        <main className="mx-auto max-w-6xl px-6 pb-24 pt-16 md:pt-24">
          {children}
        </main>
        <SiteFooter content={footerContent} editorAttrs={footerAttrs} />
      </div>
    </div>
  );
}
