import type { Metadata } from "next";

function resolveSiteUrl() {
  const fallback = "https://www.ingeniumconsulting.net";
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim() || fallback;

  try {
    const url = new URL(raw);

    if (url.hostname === "ingeniumconsulting.net") {
      url.hostname = "www.ingeniumconsulting.net";
    }

    return url.origin.replace(/\/$/, "");
  } catch {
    return fallback;
  }
}

export const SITE_NAME = "Ingenium Consulting";
export const ORGANIZATION_NAME = "Ingenium Digital Consulting";
export const ORGANIZATION_ALTERNATE_NAME = "Ingenium Consulting";
export const ORGANIZATION_LEGAL_NAME = "Ingenium Digital Consulting";
export const ORGANIZATION_PHONE = "+353 85 830 2554";
export const ORGANIZATION_EMAIL = "hello@ingeniumconsulting.net";
export const ORGANIZATION_ADDRESS = {
  streetAddress: "87 Barrowvale, Graiguecullen",
  addressLocality: "Carlow",
  postalCode: "R93 P8D4",
  addressCountry: "IE",
} as const;
export const ORGANIZATION_SAME_AS = [
  "https://share.google/ehEnUKclDy5MII9Gh",
  "https://www.linkedin.com/company/ingeniumconsulting",
] as const;
export const SITE_URL = resolveSiteUrl();
export const DEFAULT_DESCRIPTION =
  "Ingenium Consulting builds connected websites, CRM systems, marketing automation, and AI workflows for startups and SMEs.";
export const DEFAULT_SOCIAL_IMAGE = `${SITE_URL}/opengraph-image`;

export const keywordClusters = {
  platform: [
    "connected website platform",
    "website crm integration",
    "marketing automation platform",
    "ai workflow platform",
    "digital growth platform",
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
  "How do you connect a website to a CRM and marketing automation?",
  "What does a connected website and CRM system do for a growing business?",
  "How can AI workflows support lead follow-up and reporting?",
  "What should startups and SMEs review before rebuilding their website stack?",
  "How do you replace disconnected sales and marketing tools with one system?",
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
    title: "Connected Websites, CRM, Marketing and AI | Ingenium",
    description:
      "Launch a connected website that works with your CRM, marketing tools, and AI. Ingenium builds digital growth systems for startups and SMEs.",
    path: "/",
    keywords: [...keywordClusters.platform],
  },
  "/platform": {
    title: "Connected Growth Platform | Ingenium",
    description:
      "See how Ingenium connects website capture, CRM workflows, marketing activation, reporting, and AI support in one operating layer.",
    path: "/platform",
    keywords: [...keywordClusters.platform, "crm marketing ai platform"],
  },
  "/services": {
    title: "Website, CRM, Automation and AI Services | Ingenium",
    description:
      "Ingenium builds websites and CRM systems first, then connects automation and AI where they improve follow-up, migration clarity, and delivery continuity.",
    path: "/services",
    keywords: [
      "website development services",
      "crm integration services",
      "marketing automation services",
      "ai workflow services",
      ...keywordClusters.platform,
    ],
  },
  "/websites": {
    title: "CRM-Connected Website Development | Ingenium Consulting",
    description:
      "Ingenium builds and rebuilds CRM-connected websites that capture better leads, support your brand, and connect directly to reporting and follow-up.",
    path: "/websites",
    keywords: [...keywordClusters.websites],
  },
  "/crm": {
    title: "Custom CRM Integration | Ingenium Consulting",
    description:
      "Set up, migrate, or rebuild a CRM workspace with cleaner lead routing, lifecycle logic, reporting, and handoff continuity across your business.",
    path: "/crm",
    keywords: [...keywordClusters.crm],
  },
  "/ai-agents": {
    title: "AI-Enabled Workflows | Ingenium Consulting",
    description:
      "Use AI-enabled workflows for follow-up, summaries, recommendations, and reporting with context from your website, CRM, and marketing system.",
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
    title: "Marketing Automation and Follow-Up Flows | Ingenium Consulting",
    description:
      "Connect email, SMS, nurture journeys, and follow-up flows to your CRM so campaigns launch from live business data.",
    path: "/automations",
    keywords: [...keywordClusters.automation],
  },
  "/security": {
    title: "Security and Reliability | Ingenium",
    description:
      "Review the visible controls, approval paths, audit history, and technical review support built into the Ingenium platform.",
    path: "/security",
    keywords: [...keywordClusters.governance],
  },
  "/data-handling": {
    title: "Data Handling | Ingenium Consulting",
    description:
      "Review how Ingenium handles business, customer, CRM, automation, reporting, and workflow data during implementation and support.",
    path: "/data-handling",
    keywords: ["data handling", "crm data handling", "workflow data boundaries", ...keywordClusters.governance],
  },
  "/privacy": {
    title: "Privacy Notice | Ingenium Consulting",
    description:
      "Read Ingenium's basic privacy notice for website visitors, business enquiries, form submissions, and project conversations.",
    path: "/privacy",
    keywords: ["privacy notice", "website privacy", "business enquiry privacy", ...keywordClusters.governance],
  },
  "/security-review": {
    title: "Security Review Process | Ingenium Consulting",
    description:
      "See how Ingenium reviews access, approvals, data flows, AI workflow boundaries, deployment assumptions, and operational risks.",
    path: "/security-review",
    keywords: ["security review process", "technical security review", ...keywordClusters.governance],
  },
  "/support": {
    title: "Support Process | Ingenium Consulting",
    description:
      "Review Ingenium's basic support process for active website, CRM, automation, reporting, and AI workflow clients.",
    path: "/support",
    keywords: ["support process", "website support", "crm support", "automation support", ...keywordClusters.platform],
  },
  "/implementation-methodology": {
    title: "Implementation Methodology | Ingenium Consulting",
    description:
      "See how Ingenium scopes, builds, reviews, launches, and improves connected websites, CRM systems, automations, and AI workflows.",
    path: "/implementation-methodology",
    keywords: ["implementation methodology", "website crm implementation", ...keywordClusters.platform],
  },
  "/case-studies": {
    title: "Legacy Case Studies Redirect | Ingenium",
    description: "Legacy case studies hub redirecting to the canonical projects library.",
    path: "/case-studies",
    keywords: [...keywordClusters.proof],
    pageType: "CollectionPage",
    noIndex: true,
  },
  "/implementation": {
    title: "Implementation and Rollout | Ingenium",
    description:
      "See how Ingenium maps gaps, rebuilds the operating path, and launches connected website, CRM, marketing, and AI systems with control.",
    path: "/implementation",
    keywords: [...keywordClusters.platform, "implementation model"],
  },
  "/contact": {
    title: "Contact Ingenium | Connected Website and CRM Partner",
    description:
      "Contact Ingenium to discuss your website, CRM, marketing automation, or AI implementation and choose the right next step.",
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
    title: "Project Library | Ingenium Consulting",
    description:
      "Browse Ingenium project examples showing website delivery, service positioning, CRM-connected journeys, proof structure, and conversion improvements.",
    path: "/projects",
    keywords: [
      "ingenium projects",
      "website project examples",
      "crm connected website examples",
      ...keywordClusters.proof,
    ],
    pageType: "CollectionPage",
  },
  "/about": {
    title: "About Ingenium Consulting",
    description: "Learn how Ingenium helps startups and SMEs grow with connected websites, CRM systems, marketing automation, and AI workflows.",
    path: "/about",
    keywords: [
      "about ingenium consulting",
      "website crm automation agency",
      "connected growth partner",
    ],
  },
  "/team": {
    title: "Meet the Team | Ingenium Consulting",
    description:
      "Meet the Ingenium Consulting team behind strategy, sales, development, and design for connected websites, CRM systems, automation, and AI delivery.",
    path: "/team",
    keywords: [
      "ingenium team",
      "meet the team",
      "founder led delivery",
      "website crm automation team",
      "service business consulting team",
    ],
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
  const socialImage = {
    url: DEFAULT_SOCIAL_IMAGE,
    width: 1200,
    height: 630,
    alt: `${SITE_NAME} social preview`,
  };

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
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title: config.ogTitle ?? config.title,
      description: config.ogDescription ?? config.description,
      images: [socialImage.url],
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
