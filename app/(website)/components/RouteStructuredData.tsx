"use client";

import { usePathname } from "next/navigation";

import {
  ORGANIZATION_ADDRESS,
  ORGANIZATION_ALTERNATE_NAME,
  ORGANIZATION_EMAIL,
  ORGANIZATION_NAME,
  ORGANIZATION_LEGAL_NAME,
  ORGANIZATION_PHONE,
  ORGANIZATION_SAME_AS,
  PRIVATE_PATHS,
  PRIVATE_PATH_PREFIXES,
  SITE_NAME,
  SITE_URL,
  pageSeo,
} from "@/lib/seo";
import { LAST_REVIEWED_ISO } from "@/lib/review";

type JsonLd = Record<string, unknown>;

const routeLabelMap: Record<string, string> = {
  "/": "Home",
  "/services": "Services",
  "/platform": "Platform",
  "/websites": "Websites",
  "/crm": "CRM",
  "/ai-agents": "AI Agents",
  "/automations": "Automations",
  "/security": "Security",
  "/security-review": "Security Review",
  "/data-handling": "Data Handling",
  "/privacy": "Privacy",
  "/support": "Support",
  "/implementation-methodology": "Implementation Methodology",
  "/case-studies": "Projects",
  "/implementation": "Implementation",
  "/projects": "Projects",
  "/about": "About",
  "/team": "Team",
  "/contact": "Contact",
  "/demo": "Demo",
  "/revenue-systems-teardown": "Revenue Systems Teardown",
  "/technical-review": "Technical Review",
};

function normalizePathname(pathname: string) {
  if (pathname === "/index") {
    return "/";
  }

  const trimmed = pathname.replace(/\/+$/, "");
  return trimmed.length > 0 ? trimmed : "/";
}

function formatSegmentLabel(segment: string) {
  return segment
    .split("-")
    .map((part) => (part.length > 0 ? `${part.charAt(0).toUpperCase()}${part.slice(1)}` : part))
    .join(" ");
}

function toAbsoluteUrl(pathname: string) {
  return pathname && pathname !== "/" ? `${SITE_URL}${pathname}` : SITE_URL;
}

function isPrivatePath(pathname: string) {
  return (
    PRIVATE_PATHS.includes(pathname as (typeof PRIVATE_PATHS)[number]) ||
    PRIVATE_PATH_PREFIXES.some((prefix) => pathname.startsWith(prefix))
  );
}

function buildBreadcrumb(pathname: string): JsonLd {
  const normalizedPathname = normalizePathname(pathname);
  const segments = normalizedPathname.split("/").filter(Boolean);
  const items = [{ "@type": "ListItem", position: 1, name: "Home", item: SITE_URL }];
  let builtPath = "";

  segments.forEach((segment, index) => {
    builtPath += `/${segment}`;
    items.push({
      "@type": "ListItem",
      position: index + 2,
      name: routeLabelMap[builtPath] ?? formatSegmentLabel(segment),
      item: toAbsoluteUrl(builtPath),
    });
  });

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${toAbsoluteUrl(normalizedPathname)}#breadcrumb`,
    itemListElement: items,
  };
}

function buildOrganizationSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: ORGANIZATION_NAME,
    alternateName: ORGANIZATION_ALTERNATE_NAME,
    legalName: ORGANIZATION_LEGAL_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.svg`,
    email: ORGANIZATION_EMAIL,
    telephone: ORGANIZATION_PHONE,
    address: {
      "@type": "PostalAddress",
      ...ORGANIZATION_ADDRESS,
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales and support",
      email: ORGANIZATION_EMAIL,
      telephone: ORGANIZATION_PHONE,
      url: `${SITE_URL}/contact`,
    },
    areaServed: ["Ireland", "United Kingdom", "United States"],
    sameAs: [...ORGANIZATION_SAME_AS],
    description:
      "Ingenium Digital Consulting builds connected websites, CRM systems, marketing automation, and AI workflows for startups and SMEs.",
  };
}

function buildWebSiteSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

function buildWebPageSchema(pathname: string): JsonLd | null {
  const normalizedPathname = normalizePathname(pathname);
  const config = pageSeo[normalizedPathname];
  if (!config || config.noIndex) return null;

  return {
    "@context": "https://schema.org",
    "@type": config.pageType ?? "WebPage",
    "@id": `${toAbsoluteUrl(normalizedPathname)}#webpage`,
    name: config.title,
    description: config.description,
    url: toAbsoluteUrl(normalizedPathname),
    dateModified: LAST_REVIEWED_ISO,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    breadcrumb: { "@id": `${toAbsoluteUrl(normalizedPathname)}#breadcrumb` },
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

function buildServiceSchema(pathname: string): JsonLd | null {
  const normalizedPathname = normalizePathname(pathname);
  const services: Record<string, { name: string; description: string }> = {
    "/platform": {
      name: "Ingenium Revenue Operating System",
      description: "Governed platform connecting websites, CRM, AI agents, automation, and reporting.",
    },
    "/websites": {
      name: "Ingenium Websites",
      description: "High-intent website journeys connected directly to CRM execution and routing.",
    },
    "/crm": {
      name: "Ingenium CRM Execution",
      description: "CRM operating model for routing, attribution, ownership, and delivery continuity.",
    },
    "/ai-agents": {
      name: "Ingenium AI Agents",
      description: "Governed AI agents operating inside workflow, approval, and audit boundaries.",
    },
    "/automations": {
      name: "Ingenium Automations",
      description: "SLA-driven automation with escalation, rollback control, and execution visibility.",
    },
    "/security": {
      name: "Ingenium Governance",
      description: "Role-based access, approval paths, audit history, and technical review support.",
    },
    "/demo": {
      name: "Ingenium Demo",
      description: "A guided platform walkthrough for service businesses evaluating their revenue operating model.",
    },
    "/revenue-systems-teardown": {
      name: "Revenue Systems Teardown",
      description: "An audit of the gaps between website, CRM, automation, handoff, and reporting.",
    },
    "/technical-review": {
      name: "Technical Review",
      description: "Architecture, governance, and data-handling review for technical stakeholders.",
    },
  };

  const service = services[normalizedPathname];
  if (!service) return null;

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${toAbsoluteUrl(normalizedPathname)}#service`,
    name: service.name,
    description: service.description,
    provider: { "@id": `${SITE_URL}/#organization` },
    url: toAbsoluteUrl(normalizedPathname),
    dateModified: LAST_REVIEWED_ISO,
  };
}

export default function RouteStructuredData() {
  const pathname = usePathname() || "/";

  if (isPrivatePath(pathname)) return null;

  const schemas = [buildBreadcrumb(pathname), buildOrganizationSchema(), buildWebSiteSchema()];
  const pageSchema = buildWebPageSchema(pathname);
  const serviceSchema = buildServiceSchema(pathname);

  if (pageSchema) schemas.push(pageSchema);
  if (serviceSchema) schemas.push(serviceSchema);

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
