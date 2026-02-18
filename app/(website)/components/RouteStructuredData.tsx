"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";

type JsonLd = Record<string, unknown>;

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://ingeniumconsulting.net").replace(/\/$/, "");

const routeLabelMap: Record<string, string> = {
  "/": "Home",
  "/websites": "Websites",
  "/platform": "Platform",
  "/agents": "AI Agents",
  "/departments": "AI Departments",
  "/crm": "CRM",
  "/automations": "Automations",
  "/case-studies": "Case Studies",
  "/security": "Security",
  "/about": "About",
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
    name: "Enterprise Website Redesign Services",
    serviceType: "Enterprise Web Design",
    description:
      "Conversion-focused enterprise website redesign services with CRM integration and revenue attribution.",
  },
  "/platform": {
    name: "Website CRM AI Platform Services",
    serviceType: "Revenue Operations Platform",
    description:
      "Platform implementation connecting website performance, CRM, AI agents, and automation workflows.",
  },
  "/agents": {
    name: "AI Agents for Marketing and Sales",
    serviceType: "AI Workflow Services",
    description:
      "Governed AI agents for marketing and sales workflows with approval gates and measurable outcomes.",
  },
  "/departments": {
    name: "AI Departments for Revenue Teams",
    serviceType: "AI Operations Services",
    description:
      "Department-based AI operations design with human oversight, governance rules, and KPI ownership.",
  },
  "/crm": {
    name: "CRM Implementation and RevOps Services",
    serviceType: "CRM Implementation",
    description:
      "CRM implementation, migration, and revenue operations services for clean data and accurate forecasting.",
  },
  "/automations": {
    name: "Marketing and Lead Routing Automation Services",
    serviceType: "Marketing Automation",
    description:
      "Marketing and sales workflow automation with lead routing, SLA tracking, and rollback controls.",
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
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Ingenium Digital Consulting",
      url: SITE_URL,
      logo: `${SITE_URL}/logo.svg`,
      sameAs: [],
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "sales",
          email: "hello@ingeniumconsulting.net",
          areaServed: "US",
          availableLanguage: ["English"],
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Ingenium",
      url: SITE_URL,
      publisher: {
        "@type": "Organization",
        name: "Ingenium Digital Consulting",
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
      name: "Ingenium Digital Consulting",
      url: SITE_URL,
    },
    areaServed: "United States",
    url: toAbsoluteUrl(pathname),
  };
}

function buildWebsitesFaqSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How long does an enterprise website redesign take?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most redesign programs launch in 4 to 6 weeks, then continue with ongoing optimization cycles.",
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
    name: "Enterprise Website Case Studies",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Fintech SaaS Website Rebuild" },
      { "@type": "ListItem", position: 2, name: "Healthcare Platform Conversion Program" },
      { "@type": "ListItem", position: 3, name: "Enterprise Services Revenue Site" },
      { "@type": "ListItem", position: 4, name: "B2B Technology Pipeline Website" },
    ],
  };
}

export default function RouteStructuredData() {
  const pathname = usePathname() || "/";

  const schemas = useMemo(() => {
    const items: JsonLd[] = [buildBreadcrumb(pathname)];

    if (pathname === "/") {
      items.push(...buildHomeSchemas());
    }

    const serviceSchema = buildServiceSchema(pathname);
    if (serviceSchema) {
      items.push(serviceSchema);
    }

    if (pathname === "/websites") {
      items.push(buildWebsitesFaqSchema());
    }

    if (pathname === "/case-studies") {
      items.push(buildCaseStudiesSchema());
    }

    return items;
  }, [pathname]);

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
