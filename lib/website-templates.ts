export const TEMPLATE_INDUSTRIES = [
  { id: "cleaning", name: "Cleaning", description: "Domestic, commercial and specialist cleaning." },
  { id: "laundry", name: "Laundry and dry cleaning", description: "Laundry services, garment care and collection." },
  { id: "landscaping", name: "Landscaping", description: "Garden design, landscaping and outdoor spaces." },
  { id: "painting", name: "Painting and decorating", description: "Interior and exterior painting and decorating." },
  { id: "property-maintenance", name: "Property maintenance", description: "Repairs, upkeep and property care." },
  { id: "carpentry", name: "Carpentry", description: "Bespoke joinery, fitted furniture and woodwork." },
  { id: "exterior-cleaning", name: "Exterior cleaning", description: "Pressure washing, roofs, gutters and exterior care." },
] as const;

export type TemplateIndustry = (typeof TEMPLATE_INDUSTRIES)[number]["id"];
export type WebsiteTemplate = {
  id: string;
  industry: TemplateIndustry;
  title: string;
  description: string;
  /** A screenshot of the actual website, stored in public/template-previews/. */
  image: string;
  url: string;
};

// Temporary, clearly labelled demo mockups for testing the gallery access flow.
// Replace these with supplied client-approved template URLs and screenshots.
export const WEBSITE_TEMPLATES: WebsiteTemplate[] = [
  { id: "demo-cleaning", industry: "cleaning", title: "Clear & Co. (demo)", description: "A fresh, calm cleaning website. Fictional business; demonstration mockup.", image: "/template-previews/cleaning-demo.png", url: "https://www.ingeniumconsulting.net/template-previews/cleaning" },
  { id: "demo-landscaping", industry: "landscaping", title: "Evergreen Studio (demo)", description: "An earthy, garden-led landscaping website. Fictional business; demonstration mockup.", image: "/template-previews/landscaping-demo.png", url: "https://www.ingeniumconsulting.net/template-previews/landscaping" },
  { id: "demo-carpentry", industry: "carpentry", title: "Grain Workshop (demo)", description: "A warm, crafted carpentry website. Fictional business; demonstration mockup.", image: "/template-previews/carpentry-demo.png", url: "https://www.ingeniumconsulting.net/template-previews/carpentry" },
];
export const TEMPLATE_ACCESS_KEY = "ingenium-template-access-v1";
export const TEMPLATE_FREE_VIEWS = 2;
export type TemplateAccess = { viewed: string[]; unlocked: boolean };

export function readTemplateAccess(raw: string | null): TemplateAccess {
  try {
    const data = JSON.parse(raw || "null");
    return { viewed: Array.isArray(data?.viewed) ? [...new Set<string>(data.viewed.filter((id: unknown) => typeof id === "string" && id.length < 160))].slice(0, 100) : [], unlocked: data?.unlocked === true };
  } catch { return { viewed: [], unlocked: false }; }
}

export function canViewTemplate(access: TemplateAccess, id: string) {
  return access.unlocked || access.viewed.includes(id) || access.viewed.length < TEMPLATE_FREE_VIEWS;
}

export function templateInterest(viewed: string[], next: WebsiteTemplate, templates: WebsiteTemplate[]) {
  const selected = [...new Set([...viewed, next.id])];
  const industries = TEMPLATE_INDUSTRIES.filter(industry => templates.some(template => selected.includes(template.id) && template.industry === industry.id)).map(industry => industry.name);
  return { industries, titles: templates.filter(template => selected.includes(template.id)).map(template => template.title) };
}
