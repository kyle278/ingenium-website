"use client";

import { usePathname } from "next/navigation";

import { caseStudies } from "@/src/lib/caseStudies";
import { projects } from "@/src/lib/projects";
import {
  ORGANIZATION_NAME,
  PRIVATE_PATHS,
  PRIVATE_PATH_PREFIXES,
  SITE_NAME,
  SITE_URL,
  pageSeo,
} from "@/lib/seo";

type JsonLd = Record<string, unknown>;

const routeLabelMap: Record<string, string> = {
  "/": "Home",
  "/websites": "Acquisition Engine",
  "/platform": "Platform",
  "/agents": "AI Agents",
  "/departments": "AI Departments",
  "/crm": "CRM",
  "/automations": "Automation",
  "/case-studies": "Named Client Case Studies",
  "/projects": "Projects",
  "/security": "Trust and Security",
  "/about": "Why Ingenium",
  "/team": "Team",
  "/contact": "Contact",
};

const servicePages: Record<
  string,
  {
    name: string;
    serviceType: string;
    description: string;
  }
> = {
  "/websites": {
    name: "Ingenium Acquisition Engine",
    serviceType: "Revenue Acquisition Platform",
    description:
      "High-conviction acquisition journeys, proof architecture, and conversion paths wired directly into CRM action.",
  },
  "/platform": {
    name: "Ingenium Revenue Platform",
    serviceType: "Revenue Operations Platform",
    description:
      "Platform architecture connecting acquisition, CRM command, AI agents, automation, and governance.",
  },
  "/agents": {
    name: "Governed AI Agents for Revenue Teams",
    serviceType: "AI Workflow Services",
    description:
      "Governed AI agents for research, drafting, qualification, and operator assistance with approval gates.",
  },
  "/departments": {
    name: "AI Departments for Revenue Teams",
    serviceType: "AI Operations Services",
    description:
      "Department-based AI operations design with human oversight, governance rules, and KPI ownership.",
  },
  "/crm": {
    name: "Ingenium CRM Command Layer",
    serviceType: "CRM Operations Platform",
    description:
      "CRM lifecycle design, routing, migration, and attribution for accountable revenue execution.",
  },
  "/automations": {
    name: "Ingenium Revenue Automation Layer",
    serviceType: "Revenue Automation",
    description:
      "Routing, escalation, follow-up, and enrichment workflows with SLA tracking and rollback controls.",
  },
};

function toAbsoluteUrl(pathname: string) {
  if (!pathname || pathname === "/") {
    return SITE_URL;
  }

  return `${SITE_URL}${pathname}`;
}

function humanizeSegment(segment: string) {
  const raw = segment.replace(/-/g, " ").trim();
  if (!raw) {
    return "Page";
  }

  return raw.replace(/\b\w/g, (match) => match.toUpperCase());
}

function isPrivatePath(pathname: string) {
  return (
    PRIVATE_PATHS.includes(pathname as (typeof PRIVATE_PATHS)[number]) ||
    PRIVATE_PATH_PREFIXES.some((prefix) => pathname.startsWith(prefix))
  );
}

function buildOrganizationSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: ORGANIZATION_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.svg`,
    email: "hello@ingeniumconsulting.net",
    description:
      "Ingenium connects acquisition, CRM execution, AI agents, and automation into one governed revenue platform for ambitious teams.",
    areaServed: ["United States", "Europe"],
    knowsAbout: [
      "Website strategy",
      "CRM implementation",
      "Revenue operations",
      "AI agents",
      "Automation",
      "Technical SEO",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: "hello@ingeniumconsulting.net",
        areaServed: ["US", "EU"],
        availableLanguage: ["English"],
      },
    ],
  };
}

function buildBreadcrumb(pathname: string): JsonLd {
  const segments = pathname.split("/").filter(Boolean);
  const itemListElement = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: SITE_URL,
    },
  ];

  let builtPath = "";

  segments.forEach((segment, index) => {
    builtPath += `/${segment}`;
    itemListElement.push({
      "@type": "ListItem",
      position: index + 2,
      name: routeLabelMap[builtPath] ?? humanizeSegment(segment),
      item: toAbsoluteUrl(builtPath),
    });
  });

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement,
  };
}

function buildHomeSchemas(): JsonLd[] {
  return [
    buildOrganizationSchema(),
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Ingenium",
      url: SITE_URL,
      description:
        "Revenue platform, acquisition engine, CRM command, AI agents, automation, and governance.",
      publisher: {
        "@type": "Organization",
        name: ORGANIZATION_NAME,
      },
    },
  ];
}

function buildServiceSchema(pathname: string): JsonLd | null {
  const service = servicePages[pathname];
  if (!service) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    serviceType: service.serviceType,
    description: service.description,
    provider: {
      "@type": "Organization",
      name: ORGANIZATION_NAME,
      url: SITE_URL,
    },
    areaServed: ["United States", "Europe"],
    url: toAbsoluteUrl(pathname),
  };
}

function buildWebPageSchema(pathname: string): JsonLd | null {
  if (!pageSeo[pathname]) {
    if (!pathname.startsWith("/projects/")) {
      return null;
    }
  }

  const routeSeo = pageSeo[pathname];
  const title = routeSeo?.title ?? routeLabelMap[pathname] ?? humanizeSegment(pathname.split("/").pop() ?? "Page");
  const description =
    routeSeo?.description ??
    "Ingenium page describing a revenue platform, implementation, or proof-led delivery topic.";
  const pageType = routeSeo?.pageType ?? "WebPage";

  return {
    "@context": "https://schema.org",
    "@type": pageType,
    name: title,
    description,
    url: toAbsoluteUrl(pathname),
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
    about: {
      "@type": "Organization",
      name: ORGANIZATION_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: ORGANIZATION_NAME,
      url: SITE_URL,
    },
  };
}

function buildCollectionPageSchema(
  pathname: string,
  name: string,
  description: string,
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url: toAbsoluteUrl(pathname),
    isPartOf: {
      "@type": "WebSite",
      name: "Ingenium",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: ORGANIZATION_NAME,
    },
  };
}

function buildWebsitesFaqSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How long does an acquisition engine rollout take?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most acquisition-engine rollouts launch in 4 to 6 weeks, then continue with ongoing optimization cycles.",
        },
      },
      {
        "@type": "Question",
        name: "Do you connect the website directly to our CRM?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. We connect form capture, lead routing, and attribution into your CRM as part of implementation.",
        },
      },
      {
        "@type": "Question",
        name: "Can you support internal compliance and security reviews?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. We provide documentation and security controls to support procurement and technical reviews.",
        },
      },
      {
        "@type": "Question",
        name: "What happens after launch?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Post-launch includes measurement, experimentation, and monthly conversion optimization reporting.",
        },
      },
    ],
  };
}

function buildCaseStudiesSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Named Client Case Studies",
    itemListElement: caseStudies.map((study, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: study.projectName,
      url: `${SITE_URL}/case-studies#${study.id}`,
    })),
  };
}

function buildProjectsSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Selected Delivery Projects",
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: project.projectName,
      url: `${SITE_URL}/projects/${project.slug}`,
    })),
  };
}

export default function RouteStructuredData() {
  const pathname = usePathname() || "/";

  if (isPrivatePath(pathname)) {
    return null;
  }

  const schemas: JsonLd[] = [buildBreadcrumb(pathname)];

  if (pathname === "/") {
    schemas.push(...buildHomeSchemas());
  }

  const pageSchema = buildWebPageSchema(pathname);
  if (pageSchema) {
    schemas.push(pageSchema);
  }

  const serviceSchema = buildServiceSchema(pathname);
  if (serviceSchema) {
    schemas.push(serviceSchema);
  }

  if (pathname === "/websites") {
    schemas.push(buildWebsitesFaqSchema());
  }

  if (pathname === "/case-studies") {
    schemas.push(
      buildCollectionPageSchema(
        pathname,
        "Named Client Case Studies",
        "Named client delivery examples from Ingenium focused on website structure, proof, trust, and conversion paths.",
      ),
    );
    schemas.push(buildCaseStudiesSchema());
  }

  if (pathname === "/projects") {
    schemas.push(
      buildCollectionPageSchema(
        pathname,
        "Client Projects and Delivery Outcomes",
        "Detailed Ingenium project pages covering website delivery, positioning, and operational proof.",
      ),
    );
    schemas.push(buildProjectsSchema());
  }

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={`${pathname}-jsonld-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
