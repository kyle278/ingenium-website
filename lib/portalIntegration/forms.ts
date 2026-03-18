export const WEBSITE_FORM_SLUGS = {
  contact: "contact",
  websiteProjectBrief: "website-project-brief",
} as const;

export type WebsiteFormSlug = (typeof WEBSITE_FORM_SLUGS)[keyof typeof WEBSITE_FORM_SLUGS];

export const WEBSITE_FORM_DESCRIPTIONS: Record<WebsiteFormSlug, string> = {
  contact: "Main website contact form",
  [WEBSITE_FORM_SLUGS.websiteProjectBrief]: "Private website project brief form for clients",
};

export const WEBSITE_FORM_NAMES: Record<WebsiteFormSlug, string> = {
  contact: "Contact Form",
  [WEBSITE_FORM_SLUGS.websiteProjectBrief]: "Website Project Brief",
};
