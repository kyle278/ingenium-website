export interface CaseStudyRecord {
  id: string;
  projectName: string;
  client: string;
  industry: string;
  size: string;
  stage: string;
  serviceLines: string[];
  relatedProjectSlug?: string;
  websiteUrl?: string;
  challenge: string;
  intervention: string;
  deliveredAssets: string[];
  buildMetrics: {
    value: string;
    label: string;
  }[];
  stack: string[];
}

export const caseStudies: CaseStudyRecord[] = [
  {
    id: "carlow-hearing",
    projectName: "Carlow Hearing Conversion Architecture",
    client: "Carlow Hearing",
    industry: "Healthcare / Audiology",
    size: "Independent clinic, Carlow",
    stage: "Educational service website for patients comparing brands, pricing, and grant options",
    serviceLines: ["Website Build", "Conversion Strategy", "Marketing Automation"],
    relatedProjectSlug: "carlow-hearing-service-led-clinic-website",
    challenge:
      "Patients needed more than a contact page. They were comparing hearing-aid brands, trying to understand the PRSI grant, and looking for reassurance before they ever picked up the phone.",
    intervention:
      "Ingenium structured the site around the patient decision journey: clinic reassurance, services, device education, pricing clarity, testimonials, and a dedicated PRSI grant route.",
    deliveredAssets: [
      "Homepage, services, pricing, testimonials, and contact routes aligned as one patient journey.",
      "Four hearing-aid brand pages for Oticon, Phonak, Signia, and Unitron.",
      "Dedicated PRSI grant page for higher-intent funding-related enquiries.",
    ],
    buildMetrics: [
      { value: "14", label: "Live routes" },
      { value: "4", label: "Brand pages" },
      { value: "1", label: "Grant journey" },
    ],
    stack: ["Next.js", "App Router", "Tailwind CSS", "TypeScript"],
  },
  {
    id: "kenny-construction",
    projectName: "Kenny Construction Project Library",
    client: "Kenny Construction Limited",
    industry: "Construction",
    size: "Regional contractor",
    stage: "Service and trust-led website for homeowners evaluating major project work",
    serviceLines: ["Website Build", "Revenue Operations", "CRM Structure"],
    relatedProjectSlug: "kenny-construction-limited-website-rebuild",
    websiteUrl : "https://kenny-construction-six.vercel.app",
    challenge:
      "A contractor site has to do more than look polished. Prospects need service clarity, visible project proof, and confidence in site discipline before they are willing to start a conversation.",
    intervention:
      "Ingenium paired the service architecture with a reusable project library, six named project detail pages, and a dedicated safety and quality section that handles trust objections earlier.",
    deliveredAssets: [
      "Projects hub supported by six detailed project pages.",
      "Focused service tracks for new builds, renovations, and vacant-home grant work.",
      "Safety and quality route added to strengthen proof beyond aesthetics alone.",
    ],
    buildMetrics: [
      { value: "17", label: "Live routes" },
      { value: "6", label: "Project pages" },
      { value: "3", label: "Service tracks" },
    ],
    stack: ["Next.js", "App Router", "Tailwind CSS", "TypeScript"],
  },
  {
    id: "holland-pianos",
    projectName: "Holland Pianos Service Catalogue",
    client: "Holland Pianos Ireland",
    industry: "Retail & Specialist Services",
    size: "National piano retailer and service team",
    stage: "Deep catalogue and enquiry system for a premium specialist business",
    serviceLines: ["Website Build", "CRM Structure", "Revenue Operations"],
    relatedProjectSlug: "holland-pianos-ireland-premium-service-website",
    websiteUrl : "https://holland-pianos.vercel.app",
    challenge:
      "This was not a simple brochure build. Buyers needed to browse instruments, compare service types, understand the company's expertise, and move into the right enquiry path without confusion.",
    intervention:
      "Ingenium built a fuller information architecture with product hubs, service subpages, sales enquiry flow, and expertise proof across history, team, and qualifications pages.",
    deliveredAssets: [
      "Piano category hubs for upright and grand ranges.",
      "Dedicated service pages for sales, tuning, restoration, moving, and hire.",
      "Supporting trust content across history, qualifications, and team pages.",
    ],
    buildMetrics: [
      { value: "17", label: "website pages" },
      { value: "5", label: "Service subpages" },
      { value: "2", label: "Piano category hubs" },
    ],
    stack: ["Next.js", "App Router", "Tailwind CSS", "TypeScript"],
  },
  {
    id: "farrell-contract-cleaning",
    projectName: "Farrell Contract Cleaning Lead System",
    client: "Farrell Contract Cleaning",
    industry: "Commercial Cleaning",
    size: "Regional service provider, Leinster",
    stage: "Service segmentation and quote system for residential and commercial demand",
    serviceLines: ["Website Build", "Automations", "Marketing Automation", "Revenue Operations"],
    relatedProjectSlug: "farrell-contract-cleaning-quote-flow-website",
    websiteUrl : "https://farrell-contractcleaning-website.vercel.app",
    challenge:
      "The site needed to separate residential, commercial, and industrial work clearly while still making it easy for quote-ready visitors and returning customers to self-serve.",
    intervention:
      "Ingenium reorganized the site around service segmentation, introduced a dedicated quote path, and added a separate pay-invoice route so acquisition and operations were both supported.",
    deliveredAssets: [
      "Residential, commercial, and industrial demand segmented more clearly.",
      "Dedicated quote route for higher-intent sales conversations.",
      "Invoice payment path added for returning-customer utility.",
    ],
    buildMetrics: [
      { value: "7", label: "Website Pages" },
      { value: "1", label: "Quote path" },
      { value: "1", label: "Payment path" },
    ],
    stack: ["Next.js", "App Router", "Tailwind CSS", "TypeScript"],
  }, 
];

export function getCaseStudyById(id: string) {
  return caseStudies.find((study) => study.id === id);
}

export function getCaseStudyByProjectSlug(projectSlug: string) {
  return caseStudies.find((study) => study.relatedProjectSlug === projectSlug);
}
