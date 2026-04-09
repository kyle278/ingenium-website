import type { Metadata } from "next";

export const SITE_NAME = "Ingenium";
export const ORGANIZATION_NAME = "Ingenium Digital Consulting";
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://ingeniumconsulting.net").replace(
  /\/$/,
  "",
);
export const DEFAULT_DESCRIPTION =
  "Ingenium is a revenue platform implementation partner connecting website acquisition, CRM execution, AI agents, automation, and governance into one accountable growth system.";

export const keywordClusters = {
  platform: [
    "revenue platform",
    "revenue platform implementation partner",
    "revenue operations consulting",
    "RevOps implementation partner",
    "revenue systems consulting",
    "go to market systems integration",
  ],
  websites: [
    "B2B website strategy",
    "conversion focused website",
    "acquisition engine",
    "CRM connected website",
    "website conversion optimization for B2B",
  ],
  crm: [
    "CRM implementation consultant",
    "CRM migration services",
    "RevOps CRM consulting",
    "lead routing and attribution",
    "CRM lifecycle design",
  ],
  ai: [
    "AI agents for revenue teams",
    "governed AI agents",
    "AI operations consulting",
    "AI departments",
    "human approved AI workflows",
  ],
  automation: [
    "revenue automation consulting",
    "lead routing automation",
    "sales workflow automation",
    "marketing and sales automation",
    "workflow SLA automation",
  ],
  governance: [
    "AI governance consulting",
    "enterprise AI security",
    "security review for AI systems",
    "compliance ready automation",
    "governed AI implementation",
  ],
  proof: [
    "revenue platform case studies",
    "B2B website case studies",
    "CRM implementation examples",
    "AI workflow examples",
    "conversion architecture examples",
  ],
} as const;

export const aeoQueryThemes = [
  "What does a revenue platform implementation partner do?",
  "How do you connect a website, CRM, AI agents, and automation into one system?",
  "How do you implement AI agents safely for a revenue team?",
  "What should procurement review before approving AI automation?",
  "How do you prove ROI from website, CRM, and automation work?",
];

type PageSeoConfig = {
  title: string;
  description: string;
  path: string;
  keywords: string[];
  ogTitle?: string;
  ogDescription?: string;
  noIndex?: boolean;
  pageType?: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage";
};

export const pageSeo: Record<string, PageSeoConfig> = {
  "/": {
    title: "Revenue Platform Implementation Partner | Ingenium",
    description:
      "Ingenium helps ambitious teams connect website acquisition, CRM execution, AI agents, automation, and governance into one accountable revenue platform.",
    path: "/",
    keywords: [...keywordClusters.platform, "CRM AI automation integration"],
    ogTitle: "Revenue Platform Implementation Partner | Ingenium",
    ogDescription:
      "One governed revenue platform for acquisition, CRM execution, AI agents, automation, and measurable growth.",
  },
  "/platform": {
    title: "Revenue Platform Architecture | Ingenium",
    description:
      "See how Ingenium designs revenue platform architecture across acquisition, CRM, AI agents, automation, and governance for growing teams.",
    path: "/platform",
    keywords: [...keywordClusters.platform, "revenue platform architecture"],
  },
  "/websites": {
    title: "B2B Website Strategy | Ingenium",
    description:
      "Ingenium builds B2B acquisition engines with conversion-focused website strategy, CRM-connected forms, proof architecture, and measurable pipeline intent.",
    path: "/websites",
    keywords: [...keywordClusters.websites, "website conversion system"],
  },
  "/crm": {
    title: "CRM Implementation Consultant | Ingenium",
    description:
      "Ingenium delivers CRM implementation, migration, lifecycle design, routing, and attribution so revenue teams can trust pipeline action and reporting.",
    path: "/crm",
    keywords: [...keywordClusters.crm, "CRM operating model"],
  },
  "/agents": {
    title: "Governed AI Agents for Revenue Teams | Ingenium",
    description:
      "Deploy governed AI agents for research, drafting, qualification, and operator assistance with approval gates, auditability, and production controls.",
    path: "/agents",
    keywords: [...keywordClusters.ai, "AI implementation partner"],
  },
  "/departments": {
    title: "AI Departments Operating Model | Ingenium",
    description:
      "Design AI departments with KPI ownership, human oversight, governance rules, and role-based escalation for safe revenue operations at scale.",
    path: "/departments",
    keywords: [
      "AI departments",
      "AI operations consulting",
      "AI organization design",
      "AI governance for teams",
      "AI operating model",
    ],
  },
  "/automations": {
    title: "Revenue Automation Consulting | Ingenium",
    description:
      "Ingenium builds revenue automation for lead routing, follow-up, escalation, and workflow timing with SLA visibility and rollback control.",
    path: "/automations",
    keywords: [...keywordClusters.automation, "revenue workflow design"],
  },
  "/security": {
    title: "AI Governance Consulting | Ingenium",
    description:
      "Support procurement, compliance, and stakeholder review with AI governance consulting, enterprise security controls, and auditable automation design.",
    path: "/security",
    keywords: [...keywordClusters.governance, "procurement readiness for AI"],
  },
  "/about": {
    title: "Why Ingenium | Revenue Platform Implementation Partner",
    description:
      "Ingenium is a revenue platform implementation partner for teams that need website, CRM, AI, automation, and governance to ship as one system.",
    path: "/about",
    keywords: [...keywordClusters.platform, "implementation partner"],
    pageType: "AboutPage",
  },
  "/team": {
    title: "Ingenium Leadership Team",
    description:
      "Meet the Ingenium leadership team across technical architecture, sales strategy, delivery, and brand systems.",
    path: "/team",
    keywords: ["Ingenium team", "technical architecture leadership", "sales strategy leadership"],
  },
  "/contact": {
    title: "Revenue Systems Strategy Review | Ingenium",
    description:
      "Book a strategy review to map revenue leaks, rollout priorities, governance needs, and the fastest route to a stronger website, CRM, AI, and automation system.",
    path: "/contact",
    keywords: [
      "revenue systems strategy review",
      "RevOps consultation",
      "CRM and AI implementation consultation",
      "platform strategy review",
    ],
    pageType: "ContactPage",
  },
  "/case-studies": {
    title: "Revenue Platform and Website Case Studies | Ingenium",
    description:
      "Review named Ingenium case studies covering website conversion structure, CRM-connected journeys, proof systems, and measurable delivery outcomes.",
    path: "/case-studies",
    keywords: [...keywordClusters.proof, "named client case studies"],
    pageType: "CollectionPage",
  },
  "/projects": {
    title: "Client Projects and Delivery Outcomes | Ingenium",
    description:
      "Explore Ingenium client projects across website delivery, conversion architecture, service messaging, and proof-led customer journeys.",
    path: "/projects",
    keywords: ["client website projects", "conversion architecture examples", "website redesign portfolio"],
    pageType: "CollectionPage",
  },
  "/website-brief": {
    title: "Website Project Brief | Ingenium",
    description: "Private client intake form for collecting the details needed to plan a new website build with Ingenium.",
    path: "/website-brief",
    keywords: ["website brief", "private client intake"],
    noIndex: true,
  },
  "/internal/revenue-calculator": {
    title: "Revenue Exit Calculator | Ingenium Internal",
    description: "Internal revenue planning calculator for project and MRR growth forecasting.",
    path: "/internal/revenue-calculator",
    keywords: ["internal revenue calculator"],
    noIndex: true,
  },
};

export const PAGE_SEO = pageSeo;

export const PRIVATE_PATHS = ["/website-brief"] as const;

export const PRIVATE_PATH_PREFIXES = ["/internal/"] as const;

export const PUBLIC_DISCOVERY_PATHS = Object.keys(pageSeo).filter((path) => {
  if (PRIVATE_PATHS.includes(path as (typeof PRIVATE_PATHS)[number])) {
    return false;
  }

  return !PRIVATE_PATH_PREFIXES.some((prefix) => path.startsWith(prefix));
});

export function buildMetadata(config: PageSeoConfig): Metadata {
  const canonical = config.path === "/" ? "/" : config.path;

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
