export const WEBSITE_FORM_SLUGS = {
  contact: "contact",
} as const;

export type WebsiteFormSlug = (typeof WEBSITE_FORM_SLUGS)[keyof typeof WEBSITE_FORM_SLUGS];

export const WEBSITE_FORM_DESCRIPTIONS: Record<WebsiteFormSlug, string> = {
  contact: "Main website contact form",
};

export const WEBSITE_FORM_NAMES: Record<WebsiteFormSlug, string> = {
  contact: "Contact Form",
};
