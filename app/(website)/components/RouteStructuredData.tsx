"use client";

import { usePathname } from "next/navigation";

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
  "/platform": "Platform",
  "/websites": "Websites",
  "/crm": "CRM",
  "/ai-agents": "AI Agents",
  "/automations": "Automations",
  "/security": "Security",
  "/case-studies": "Case Studies",
  "/implementation": "Implementation",
  "/contact": "Contact",
};

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
  const segments = pathname.split("/").filter(Boolean);
  const items = [{ "@type": "ListItem", position: 1, name: "Home", item: SITE_URL }];
  let builtPath = "";

  segments.forEach((segment, index) => {
    builtPath += `/${segment}`;
    items.push({
      "@type": "ListItem",
      position: index + 2,
      name: routeLabelMap[builtPath] ?? segment,
      item: toAbsoluteUrl(builtPath),
    });
  });

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items,
  };
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
      "Ingenium is the revenue operating system for lean service businesses, connecting website lead capture, CRM execution, workflow automation, delivery visibility, reporting, and governed AI agents.",
  };
}

function buildWebPageSchema(pathname: string): JsonLd | null {
  const config = pageSeo[pathname];
  if (!config || config.noIndex) return null;

  return {
    "@context": "https://schema.org",
    "@type": config.pageType ?? "WebPage",
    name: config.title,
    description: config.description,
    url: toAbsoluteUrl(pathname),
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
    publisher: { "@type": "Organization", name: ORGANIZATION_NAME, url: SITE_URL },
  };
}

function buildServiceSchema(pathname: string): JsonLd | null {
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
  };

  const service = services[pathname];
  if (!service) return null;

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    provider: { "@type": "Organization", name: ORGANIZATION_NAME, url: SITE_URL },
    url: toAbsoluteUrl(pathname),
  };
}

export default function RouteStructuredData() {
  const pathname = usePathname() || "/";

  if (isPrivatePath(pathname)) return null;

  const schemas = [buildBreadcrumb(pathname), buildOrganizationSchema()];
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
