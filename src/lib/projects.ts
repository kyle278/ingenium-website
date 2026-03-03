export interface ProjectMetric {
  value: string;
  label: string;
}

export interface ProjectServiceInsight {
  key: string;
  title: string;
  summary: string;
  highlights: string[];
  metrics: ProjectMetric[];
}

export interface ProjectWebsitePreview {
  heroTitle: string;
  heroSubtitle: string;
  primaryNav: string[];
  trustLine: string;
}

export interface ProjectRecord {
  slug: string;
  projectName: string;
  clientName: string;
  industry: string;
  clientSize: string;
  timeframe: string;
  teaser: string;
  summary: string;
  services: string[];
  insights: string[];
  outcomeMetrics: ProjectMetric[];
  websiteIncluded: boolean;
  websitePreview?: ProjectWebsitePreview;
  serviceInsights: ProjectServiceInsight[];
  stack: string[];
}

const makeWebsiteInsight = (summary: string, m1: ProjectMetric, m2: ProjectMetric): ProjectServiceInsight => ({
  key: "website",
  title: "Website Delivery",
  summary,
  highlights: [
    "Rebuilt conversion flow around buyer intent and proof.",
    "Introduced modular sections for faster iteration.",
  ],
  metrics: [m1, m2],
});

const makeCrmInsight = (summary: string, m1: ProjectMetric, m2: ProjectMetric): ProjectServiceInsight => ({
  key: "crm",
  title: "Custom CRM",
  summary,
  highlights: [
    "Mapped lifecycle stages to real revenue handoffs.",
    "Implemented routing and SLA alerts for speed.",
  ],
  metrics: [m1, m2],
});

const makeAgentInsight = (summary: string, m1: ProjectMetric, m2: ProjectMetric): ProjectServiceInsight => ({
  key: "agents",
  title: "AI Agents",
  summary,
  highlights: [
    "Added governed workflows with human approval gates.",
    "Connected outputs directly to account context in CRM.",
  ],
  metrics: [m1, m2],
});

export const projects: ProjectRecord[] = [
  {
    slug: "northstar-pay-growth-platform",
    projectName: "Northstar Pay Growth Platform",
    clientName: "Northstar Pay",
    industry: "Fintech SaaS",
    clientSize: "Series B, 140 employees",
    timeframe: "8 weeks",
    teaser: "Website rebuild + CRM + AI SDR support for cleaner handoffs.",
    summary:
      "Northstar Pay needed a clearer path from web intent to sales action. We rebuilt the site, aligned CRM lifecycle stages, and added AI-assisted prep for SDR teams.",
    services: ["Website Rebuild", "Custom CRM", "AI Agents", "Automation"],
    insights: [
      "Persona pages improved qualified form starts.",
      "Routing logic removed manual lead assignment bottlenecks.",
      "Pre-call context quality improved rep readiness.",
    ],
    outcomeMetrics: [
      { value: "+28%", label: "Qualified demo rate" },
      { value: "42s", label: "Lead-to-rep routing" },
      { value: "2.1x", label: "Pipeline from web" },
    ],
    websiteIncluded: true,
    websitePreview: {
      heroTitle: "Payments Infrastructure for Multi-Entity Finance Teams",
      heroSubtitle: "Role-specific journeys for CFO, RevOps, and Product leaders.",
      primaryNav: ["Platform", "Security", "Integrations", "Pricing"],
      trustLine: "Trusted by 400+ finance teams",
    },
    serviceInsights: [
      makeWebsiteInsight("Reframed key pages around high-intent finance use cases.", { value: "+31%", label: "Form-start rate" }, { value: "-36%", label: "Bounce on paid traffic" }),
      makeCrmInsight("Built a custom scoring and assignment model for deal complexity.", { value: "97%", label: "Field health" }, { value: "8m", label: "Median first response" }),
      makeAgentInsight("Deployed SDR briefing agent with review checkpoints.", { value: "-29%", label: "Prep time" }, { value: "+18%", label: "Call-to-opportunity" }),
    ],
    stack: ["Next.js", "HubSpot", "Segment", "OpenAI", "Vercel"],
  },
  {
    slug: "meridian-health-demand-engine",
    projectName: "Meridian Health Demand Engine",
    clientName: "Meridian Health",
    industry: "Healthcare Platform",
    clientSize: "Series C, 320 employees",
    timeframe: "10 weeks",
    teaser: "Consolidated web properties with governed CRM and AI follow-up workflows.",
    summary:
      "Meridian had fragmented buyer journeys across multiple sites. We unified the experience and tied engagement data to CRM attribution and governed follow-up operations.",
    services: ["Website Rebuild", "CRM Integration", "AI Governance", "Automation"],
    insights: [
      "Compliance-first messaging improved enterprise trust.",
      "Security inquiry response became consistently faster.",
      "Unified taxonomy improved campaign reporting quality.",
    ],
    outcomeMetrics: [
      { value: "+24%", label: "Enterprise conversion" },
      { value: "2.4x", label: "Security-page engagement" },
      { value: "-33%", label: "Sales cycle length" },
    ],
    websiteIncluded: true,
    websitePreview: {
      heroTitle: "Clinical Data Workflows with Enterprise Governance",
      heroSubtitle: "Security, interoperability, and measurable outcomes.",
      primaryNav: ["Solutions", "Compliance", "Case Studies", "Contact"],
      trustLine: "Built for regulated procurement teams",
    },
    serviceInsights: [
      makeWebsiteInsight("Merged three microsites into one conversion architecture.", { value: "+19%", label: "MQL quality score" }, { value: "-41%", label: "Content duplication" }),
      makeCrmInsight("Connected web behavior to opportunity and routing models.", { value: "99%", label: "Attribution completeness" }, { value: "11m", label: "Security response SLA" }),
      makeAgentInsight("Added governed drafting agent for technical follow-up.", { value: "+22%", label: "Proposal speed" }, { value: "-26%", label: "Drafting hours" }),
    ],
    stack: ["Next.js", "Salesforce", "Marketo", "Snowflake", "Vercel"],
  },
  {
    slug: "arclight-security-enterprise-rebuild",
    projectName: "Arclight Security Enterprise Rebuild",
    clientName: "Arclight Security",
    industry: "B2B Cybersecurity",
    clientSize: "Growth stage, 95 employees",
    timeframe: "7 weeks",
    teaser: "Positioning reset and conversion redesign for enterprise buyers.",
    summary:
      "Arclight needed enterprise-grade trust and a stronger conversion pathway. We rebuilt the website narrative and aligned lead handling with custom CRM routing.",
    services: ["Website Repositioning", "Custom CRM", "RevOps Automation"],
    insights: [
      "Architecture proof blocks increased buyer confidence.",
      "Multi-stakeholder forms improved qualification depth.",
      "Risk-based routing reduced reassignment churn.",
    ],
    outcomeMetrics: [
      { value: "+33%", label: "SQL conversion" },
      { value: "1.8x", label: "Pipeline velocity" },
      { value: "-21%", label: "Lead reassignments" },
    ],
    websiteIncluded: true,
    websitePreview: {
      heroTitle: "Threat Operations Without Tool Sprawl",
      heroSubtitle: "Faster detection, cleaner handoff, accountable governance.",
      primaryNav: ["Platform", "Architecture", "Security", "Demo"],
      trustLine: "Used by security teams across finance and SaaS",
    },
    serviceInsights: [
      makeWebsiteInsight("Reorganized paths for SOC, CISO, and IT buyers.", { value: "+27%", label: "Demo completion rate" }, { value: "-18%", label: "Top-funnel friction" }),
      makeCrmInsight("Introduced buying-committee and risk-aware routing model.", { value: "54s", label: "Assignment latency" }, { value: "+16%", label: "Forecast confidence" }),
    ],
    stack: ["Next.js", "HubSpot", "Clay", "n8n", "Vercel"],
  },
  {
    slug: "pilotgrid-logistics-revenue-system",
    projectName: "PilotGrid Logistics Revenue System",
    clientName: "PilotGrid Logistics",
    industry: "Logistics Technology",
    clientSize: "Mid-market, 210 employees",
    timeframe: "9 weeks",
    teaser: "RFQ conversion redesign with AI-assisted quote context and routing.",
    summary:
      "PilotGrid needed better conversion and cleaner quote operations. We redesigned the RFQ experience, connected enriched data to CRM, and deployed support agents for handoff quality.",
    services: ["Website Rebuild", "CRM Implementation", "AI Agents"],
    insights: [
      "Progressive RFQ logic reduced long-form abandonment.",
      "Agent-generated context improved specialist handoffs.",
      "Backlog age dropped after SLA automation.",
    ],
    outcomeMetrics: [
      { value: "+21%", label: "RFQ completion" },
      { value: "2.0x", label: "Qualified opportunities" },
      { value: "-38%", label: "Backlog age" },
    ],
    websiteIncluded: true,
    websitePreview: {
      heroTitle: "Freight Intelligence for Complex Supply Chains",
      heroSubtitle: "From inbound request to routed specialist in minutes.",
      primaryNav: ["Solutions", "Industries", "Resources", "Get Quote"],
      trustLine: "Serving global shippers across multiple verticals",
    },
    serviceInsights: [
      makeWebsiteInsight("Built modular RFQ experiences by shipment complexity.", { value: "+25%", label: "Form completion" }, { value: "+14%", label: "Average lead score" }),
      makeCrmInsight("Implemented lifecycle model for enterprise quote workflows.", { value: "63s", label: "Quote routing speed" }, { value: "-31%", label: "Manual triage" }),
      makeAgentInsight("Added scoped quote-brief generation with approval steps.", { value: "-24%", label: "Prep time per quote" }, { value: "+12%", label: "Specialist win rate" }),
    ],
    stack: ["Next.js", "Salesforce", "Clearbit", "OpenAI", "Vercel"],
  },
  {
    slug: "velora-legal-digital-growth",
    projectName: "Velora Legal Digital Growth",
    clientName: "Velora Legal",
    industry: "Professional Services",
    clientSize: "Regional enterprise, 180 employees",
    timeframe: "6 weeks",
    teaser: "Practice-area conversion strategy with CRM intake redesign.",
    summary:
      "Velora wanted stronger qualified inbound for corporate and compliance practice areas. We rebuilt journeys and aligned intake routing to matter type and urgency.",
    services: ["Website Redesign", "CRM Lifecycle Design", "Automation"],
    insights: [
      "Practice-led landing pages improved fit on inquiries.",
      "Matter-type routing reduced internal lag.",
      "Attribution clarified top-converting content.",
    ],
    outcomeMetrics: [
      { value: "+18%", label: "Qualified inquiries" },
      { value: "2.3x", label: "Corporate practice leads" },
      { value: "-29%", label: "Handoff delays" },
    ],
    websiteIncluded: true,
    websitePreview: {
      heroTitle: "Corporate Counsel for High-Stakes Decisions",
      heroSubtitle: "Outcome-focused advisory for enterprise legal teams.",
      primaryNav: ["Practices", "Industries", "Insights", "Consultation"],
      trustLine: "Advising regulated and growth organizations",
    },
    serviceInsights: [
      makeWebsiteInsight("Refocused value narrative by practice and buyer role.", { value: "+26%", label: "Consultation quality" }, { value: "-17%", label: "Unqualified submissions" }),
      makeCrmInsight("Automated assignment to partners by expertise and territory.", { value: "74s", label: "Assignment speed" }, { value: "+15%", label: "Call readiness" }),
    ],
    stack: ["Next.js", "HubSpot", "GA4", "n8n", "Vercel"],
  },
  {
    slug: "quarry-cloud-product-led-rebuild",
    projectName: "Quarry Cloud Product-Led Rebuild",
    clientName: "Quarry Cloud",
    industry: "Developer Tools SaaS",
    clientSize: "Series A, 70 employees",
    timeframe: "5 weeks",
    teaser: "PLG and enterprise-assisted funnel branching with CRM attribution.",
    summary:
      "Quarry needed self-serve growth without losing enterprise deal quality. We built dual-path conversion journeys and unified attribution across product and sales motions.",
    services: ["Website Rebuild", "Conversion Strategy", "CRM Attribution"],
    insights: [
      "Branching flows reduced friction for trial users.",
      "Enterprise pathways improved opportunity quality.",
      "Attribution improved budget decisions by channel.",
    ],
    outcomeMetrics: [
      { value: "+34%", label: "Trial-to-demo assists" },
      { value: "1.7x", label: "Enterprise lead quality" },
      { value: "+22%", label: "Pipeline visibility" },
    ],
    websiteIncluded: true,
    websitePreview: {
      heroTitle: "Ship Faster with Observability That Scales",
      heroSubtitle: "PLG motion for builders, clear path for enterprise buyers.",
      primaryNav: ["Product", "Docs", "Enterprise", "Start Free"],
      trustLine: "Used by engineering teams from startup to enterprise",
    },
    serviceInsights: [
      makeWebsiteInsight("Implemented dual-track journeys for PLG and enterprise.", { value: "+29%", label: "Activation quality" }, { value: "+13%", label: "Demo assist rate" }),
      makeCrmInsight("Mapped product events and form signals into one lifecycle.", { value: "95%", label: "Lifecycle mapping" }, { value: "-19%", label: "Unattributed opps" }),
    ],
    stack: ["Next.js", "HubSpot", "PostHog", "Segment", "Vercel"],
  },
  {
    slug: "harbor-hr-revops-modernization",
    projectName: "Harbor HR RevOps Modernization",
    clientName: "Harbor HR",
    industry: "HR Technology",
    clientSize: "Mid-market, 160 employees",
    timeframe: "8 weeks",
    teaser: "Lead quality improvements through website, CRM cleanup, and AI checks.",
    summary:
      "Harbor had inconsistent lead quality and scoring logic. We rebuilt high-intent pages, cleaned lifecycle data, and introduced AI support for qualification checks.",
    services: ["Website Refresh", "CRM Cleanup", "AI Qualification Agent"],
    insights: [
      "Adaptive forms improved AE-accepted lead quality.",
      "AI checks reduced low-context submissions.",
      "Shared lifecycle reporting improved sales-marketing alignment.",
    ],
    outcomeMetrics: [
      { value: "+23%", label: "AE-accepted leads" },
      { value: "-27%", label: "Duplicate records" },
      { value: "2x", label: "Alignment score" },
    ],
    websiteIncluded: true,
    websitePreview: {
      heroTitle: "People Ops Platform for Distributed Teams",
      heroSubtitle: "From recruiting workflows to workforce analytics in one system.",
      primaryNav: ["Platform", "Use Cases", "Resources", "Request Demo"],
      trustLine: "Supporting HR leaders across growth and enterprise teams",
    },
    serviceInsights: [
      makeWebsiteInsight("Improved qualification depth through adaptive field logic.", { value: "+20%", label: "Demo intent quality" }, { value: "-15%", label: "Unqualified follow-up" }),
      makeCrmInsight("Normalized lifecycle stages and SLA tracking.", { value: "93%", label: "Scoring consistency" }, { value: "9m", label: "Median assignment" }),
      makeAgentInsight("Added qualification guardrail agent before SDR assignment.", { value: "-32%", label: "Low-quality tasks" }, { value: "+11%", label: "Meeting show rate" }),
    ],
    stack: ["Next.js", "Salesforce", "Clearbit", "OpenAI", "Vercel"],
  },
  {
    slug: "atlas-industrial-enterprise-conversion",
    projectName: "Atlas Industrial Enterprise Conversion",
    clientName: "Atlas Industrial Systems",
    industry: "Industrial Technology",
    clientSize: "Enterprise division, 600+ employees",
    timeframe: "11 weeks",
    teaser: "Global conversion program with regional governance and shared routing.",
    summary:
      "Atlas needed one conversion system across multiple regions. We delivered a global website framework with localized content controls and centralized pipeline reporting.",
    services: ["Global Website Program", "CRM Routing", "Governance Automation"],
    insights: [
      "Regional templates improved speed and consistency.",
      "Shared attribution enabled cleaner campaign comparison.",
      "Governance workflow reduced regulated content delays.",
    ],
    outcomeMetrics: [
      { value: "+17%", label: "Global conversion average" },
      { value: "-35%", label: "Publish cycle time" },
      { value: "+26%", label: "Pipeline reporting depth" },
    ],
    websiteIncluded: true,
    websitePreview: {
      heroTitle: "Industrial Systems for Operational Resilience",
      heroSubtitle: "Localized demand generation with centralized governance.",
      primaryNav: ["Industries", "Products", "Resources", "Talk to Engineering"],
      trustLine: "Delivered across North America, EMEA, and APAC",
    },
    serviceInsights: [
      makeWebsiteInsight("Implemented global templates with local content workflows.", { value: "+14%", label: "Launch speed" }, { value: "+19%", label: "Localized conversion" }),
      makeCrmInsight("Connected regional routing to parent-account structures.", { value: "88s", label: "Cross-region assignment" }, { value: "+21%", label: "Strategic account coverage" }),
    ],
    stack: ["Next.js", "Salesforce", "Marketo", "BigQuery", "Vercel"],
  },
  {
    slug: "lumen-learning-growth-operations",
    projectName: "Lumen Learning Growth Operations",
    clientName: "Lumen Learning",
    industry: "Education Technology",
    clientSize: "Growth stage, 120 employees",
    timeframe: "6 weeks",
    teaser: "Multi-audience website conversion with behavior-based automations.",
    summary:
      "Lumen served multiple buyer groups with one generic funnel. We rebuilt audience pathways, connected behavior triggers, and improved lifecycle visibility in CRM.",
    services: ["Website Rebuild", "Automation", "CRM Optimization"],
    insights: [
      "Audience segmentation increased engagement depth.",
      "Behavior triggers improved follow-up speed.",
      "Attribution improved channel-level planning.",
    ],
    outcomeMetrics: [
      { value: "+22%", label: "Demo requests" },
      { value: "-44%", label: "First-touch lag" },
      { value: "+18%", label: "Organic pipeline" },
    ],
    websiteIncluded: true,
    websitePreview: {
      heroTitle: "Learning Operations Platform for Modern Institutions",
      heroSubtitle: "Built for administrators, educators, and student services.",
      primaryNav: ["Solutions", "Institutions", "Resources", "Request Demo"],
      trustLine: "Trusted by districts and universities",
    },
    serviceInsights: [
      makeWebsiteInsight("Added role-based architecture and conversion pathways.", { value: "+27%", label: "Session depth" }, { value: "+16%", label: "High-intent CTA clicks" }),
      makeCrmInsight("Improved lifecycle mapping for institutional buying teams.", { value: "96%", label: "Data completeness" }, { value: "+14%", label: "Forecast consistency" }),
    ],
    stack: ["Next.js", "HubSpot", "Segment", "n8n", "Vercel"],
  },
  {
    slug: "summit-retail-b2b-platform",
    projectName: "Summit Retail B2B Platform",
    clientName: "Summit Retail Systems",
    industry: "Retail Technology",
    clientSize: "Mid-market, 240 employees",
    timeframe: "9 weeks",
    teaser: "B2B commerce growth project with conversion and CRM orchestration.",
    summary:
      "Summit needed stronger enterprise conversion and better channel visibility. We rebuilt journey architecture and connected CRM workflows to product and partner complexity.",
    services: ["Website Rebuild", "Custom CRM", "Analytics", "Automation"],
    insights: [
      "Use-case storytelling improved enterprise demo quality.",
      "Dedicated quote and demo paths reduced mixed-intent noise.",
      "Attribution dashboards clarified partner performance.",
    ],
    outcomeMetrics: [
      { value: "+26%", label: "Enterprise demos" },
      { value: "-31%", label: "Unqualified inbound" },
      { value: "2.0x", label: "Partner pipeline visibility" },
    ],
    websiteIncluded: true,
    websitePreview: {
      heroTitle: "Retail Operations Platform for Multi-Store Enterprises",
      heroSubtitle: "Automation, visibility, and margin control.",
      primaryNav: ["Platform", "Use Cases", "Partners", "Book Demo"],
      trustLine: "Supporting national and regional retail chains",
    },
    serviceInsights: [
      makeWebsiteInsight("Reframed site around measurable retail outcomes.", { value: "+23%", label: "Calculator-to-demo conversion" }, { value: "+12%", label: "Average lead score" }),
      makeCrmInsight("Built channel-aware routing and ownership rules.", { value: "68s", label: "Lead assignment" }, { value: "+17%", label: "Forecast accuracy" }),
      makeAgentInsight("Added alerting and handoff support for high-value accounts.", { value: "-22%", label: "Stalled opportunities" }, { value: "+9%", label: "Close efficiency" }),
    ],
    stack: ["Next.js", "Salesforce", "Tableau", "n8n", "Vercel"],
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
