import type { Metadata } from "next";

export const SITE_NAME = "Ingenium";
export const ORGANIZATION_NAME = "Ingenium";
export const ORGANIZATION_LEGAL_NAME = "Ingenium Digital Consulting";
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://ingeniumconsulting.net").replace(
  /\/$/,
  "",
);
export const DEFAULT_DESCRIPTION =
  "Ingenium helps service businesses replace disconnected websites, CRM, automation, reporting, and AI tools with one revenue operating system.";

export const keywordClusters = {
  platform: [
    "revenue operating system",
    "revenue operating system for service businesses",
    "governed revenue platform",
    "revenue systems platform",
    "lean service business platform",
  ],
  websites: [
    "crm connected website",
    "b2b service business website",
    "high intent website journeys",
    "lead capture system",
    "proof led conversion paths",
  ],
  crm: [
    "crm execution system",
    "lead routing for service businesses",
    "crm lifecycle design",
    "pipeline visibility",
    "sales to delivery handoff",
  ],
  ai: [
    "governed ai agents",
    "ai agents for service businesses",
    "human approval ai workflows",
    "ai workflow governance",
    "operational ai agents",
  ],
  automation: [
    "revenue workflow automation",
    "sla driven automation",
    "pipeline automation",
    "lead routing automation",
    "workflow rollback control",
  ],
  governance: [
    "ai governance",
    "audit trail automation",
    "technical review support",
    "role based workflow approvals",
    "secure revenue operations",
  ],
  proof: [
    "service business case studies",
    "revenue systems case studies",
    "platform implementation outcomes",
    "named customer outcomes",
    "proof led product website",
  ],
} as const;

export const aeoQueryThemes = [
  "What does a revenue operating system do for a lean service business?",
  "How do you connect website lead capture, CRM action, automation, AI agents, and reporting?",
  "How do you keep AI agents inside governed workflows?",
  "What should leadership review before trusting the forecast?",
  "How do you reduce sales-to-delivery handoff friction without more tools?",
];

type PageSeoConfig = {
  title: string;
  description: string;
  path: string;
  keywords: string[];
  ogTitle?: string;
  ogDescription?: string;
  noIndex?: boolean;
  pageType?: "WebPage" | "ContactPage" | "CollectionPage";
};

export const pageSeo: Record<string, PageSeoConfig> = {
  "/": {
    title: "Revenue Operating System for Service Businesses | Ingenium",
    description:
      "Replace disconnected website, CRM, automation, reporting, and AI tools with one revenue operating system for service businesses.",
    path: "/",
    keywords: [...keywordClusters.platform],
  },
  "/platform": {
    title: "Revenue Operating System Platform | Ingenium",
    description:
      "See how Ingenium connects websites, CRM, workflow automation, AI agents, and reporting in one governed revenue operating system.",
    path: "/platform",
    keywords: [...keywordClusters.platform, "shared data model"],
  },
  "/websites": {
    title: "Websites That Work Like Part of the System | Ingenium",
    description:
      "Ingenium turns websites into active revenue infrastructure with high-intent journeys, proof-led conversion, CRM routing, and attribution-ready tracking.",
    path: "/websites",
    keywords: [...keywordClusters.websites],
  },
  "/crm": {
    title: "CRM Execution System | Ingenium",
    description:
      "Turn your CRM into a system people trust with cleaner routing, lifecycle logic, attribution, delivery continuity, and revenue visibility.",
    path: "/crm",
    keywords: [...keywordClusters.crm],
  },
  "/ai-agents": {
    title: "Governed AI Agents for Revenue Teams | Ingenium",
    description:
      "Deploy AI agents inside governed workflows with approvals, task boundaries, audit history, and operational visibility.",
    path: "/ai-agents",
    keywords: [...keywordClusters.ai],
  },
  "/agents": {
    title: "AI Agents Redirect | Ingenium",
    description: "Legacy route redirecting to the governed AI agents page.",
    path: "/agents",
    keywords: ["legacy ai agents route"],
    noIndex: true,
  },
  "/automations": {
    title: "Revenue Workflow Automation | Ingenium",
    description:
      "Ingenium turns important signals into action with timing guarantees, escalation paths, rollback control, and execution visibility.",
    path: "/automations",
    keywords: [...keywordClusters.automation],
  },
  "/security": {
    title: "Security and Governance | Ingenium",
    description:
      "Review role-based access, approval paths, audit trails, AI governance, and technical review support built into the Ingenium operating model.",
    path: "/security",
    keywords: [...keywordClusters.governance],
  },
  "/case-studies": {
    title: "Case Studies | Ingenium",
    description:
      "See named case studies, workflow outcomes, and implementation proof showing how Ingenium improves buyer journeys and operational clarity.",
    path: "/case-studies",
    keywords: [...keywordClusters.proof],
    pageType: "CollectionPage",
  },
  "/implementation": {
    title: "Implementation Model | Ingenium",
    description:
      "Structured rollout for websites, CRM, automation, reporting, and governed AI so teams can launch quickly and keep control.",
    path: "/implementation",
    keywords: [...keywordClusters.platform, "implementation model"],
  },
  "/contact": {
    title: "Contact Ingenium | Revenue Systems for Service Businesses",
    description:
      "Contact Ingenium to discuss your website, CRM, automation, reporting, or AI operating model.",
    path: "/contact",
    keywords: ["book demo", "technical review", "revenue systems teardown", ...keywordClusters.platform],
    pageType: "ContactPage",
  },
  "/demo": {
    title: "Book a Demo | Ingenium",
    description:
      "See how Ingenium connects website leads, CRM execution, automation, reporting, and governed AI support for service businesses.",
    path: "/demo",
    keywords: ["book ingenium demo", "revenue systems demo", ...keywordClusters.platform],
    pageType: "ContactPage",
  },
  "/revenue-systems-teardown": {
    title: "Revenue Systems Teardown | Ingenium",
    description:
      "Request a teardown of the gaps between your website, CRM, automation, delivery handoff, and reporting.",
    path: "/revenue-systems-teardown",
    keywords: ["revenue systems teardown", "crm teardown", "lead routing audit", ...keywordClusters.platform],
    pageType: "ContactPage",
  },
  "/technical-review": {
    title: "Technical Review | Ingenium",
    description:
      "Request a technical review covering architecture, approvals, audit history, and data-handling boundaries.",
    path: "/technical-review",
    keywords: ["technical review", "security review", "workflow approvals", ...keywordClusters.governance],
    pageType: "ContactPage",
  },
  "/projects": {
    title: "Legacy Project Library | Ingenium",
    description: "Legacy project library retained for reference.",
    path: "/projects",
    keywords: ["legacy project library"],
    noIndex: true,
    pageType: "CollectionPage",
  },
  "/about": {
    title: "Legacy About Page | Ingenium",
    description: "Legacy about page retained for reference.",
    path: "/about",
    keywords: ["legacy about page"],
    noIndex: true,
  },
  "/team": {
    title: "Legacy Team Page | Ingenium",
    description: "Legacy team page retained for reference.",
    path: "/team",
    keywords: ["legacy team page"],
    noIndex: true,
  },
  "/departments": {
    title: "Legacy Departments Page | Ingenium",
    description: "Legacy departments page retained for reference.",
    path: "/departments",
    keywords: ["legacy departments page"],
    noIndex: true,
  },
  "/website-brief": {
    title: "Website Project Brief | Ingenium",
    description: "Private client intake form.",
    path: "/website-brief",
    keywords: ["website brief"],
    noIndex: true,
  },
  "/internal/revenue-calculator": {
    title: "Revenue Calculator | Ingenium Internal",
    description: "Internal revenue calculator.",
    path: "/internal/revenue-calculator",
    keywords: ["internal revenue calculator"],
    noIndex: true,
  },
};

export const PAGE_SEO = pageSeo;

export const PRIVATE_PATHS = ["/website-brief"] as const;
export const PRIVATE_PATH_PREFIXES = ["/internal/"] as const;

export const PUBLIC_DISCOVERY_PATHS = Object.entries(pageSeo)
  .filter(([, config]) => !config.noIndex)
  .map(([path]) => path)
  .filter((path) => {
    if (PRIVATE_PATHS.includes(path as (typeof PRIVATE_PATHS)[number])) return false;
    return !PRIVATE_PATH_PREFIXES.some((prefix) => path.startsWith(prefix));
  });

export function buildMetadata(config: PageSeoConfig): Metadata {
  const canonical = config.path === "/" ? SITE_URL : `${SITE_URL}${config.path}`;

  return {
    title: config.title,
    description: config.description,
    keywords: config.keywords,
    alternates: { canonical },
    openGraph: {
      title: config.ogTitle ?? config.title,
      description: config.ogDescription ?? config.description,
      url: canonical,
      siteName: SITE_NAME,
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: config.ogTitle ?? config.title,
      description: config.ogDescription ?? config.description,
    },
    robots: config.noIndex
      ? {
          index: false,
          follow: false,
          nocache: true,
          googleBot: {
            index: false,
            follow: false,
          },
        }
      : undefined,
  };
}
