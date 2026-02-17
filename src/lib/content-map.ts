export const PAGE_KEYS = {
  SHARED: "shared",
  HOME: "home",
  ABOUT: "about",
  WEBSITES: "websites",
  PLATFORM: "platform",
  AGENTS: "agents",
  DEPARTMENTS: "departments",
  AUTOMATIONS: "automations",
  CRM: "crm",
  CASE_STUDIES: "case_studies",
  SECURITY: "security",
  CONTACT: "contact",
} as const;

export const SECTION_KEYS = {
  SHARED: {
    NAV: "nav",
    FOOTER: "footer",
  },
  HOME: {
    HERO: "hero",
    OUTCOMES: "outcomes",
    INDUSTRIES: "industries",
    PROBLEM: "problem",
    SYSTEM: "system",
    PROCESS: "process",
    PROOF: "proof",
    SECURITY: "security",
    CTA: "cta",
  },
  ABOUT: {
    HERO: "hero",
    WORK: "work",
    GLOBAL: "global",
    CTA: "cta",
  },
  WEBSITES: {
    HERO: "hero",
    ENGINE: "engine",
    DIFFERENTIATORS: "differentiators",
    DELIVERABLES: "deliverables",
    PROCESS: "process",
    READINESS: "readiness",
    PROOF: "proof",
    FAQ: "faq",
    CTA: "cta",
  },
  PLATFORM: {
    HERO: "hero",
    MODULES: "modules",
    ROLES: "roles",
    INTEGRATIONS: "integrations",
    CTA: "cta",
  },
  AGENTS: {
    HERO: "hero",
    CAPABILITIES: "capabilities",
    GOVERNANCE: "governance",
    IMPACT: "impact",
    CTA: "cta",
  },
  DEPARTMENTS: {
    HERO: "hero",
    DEPARTMENTS: "departments",
    GOVERNANCE: "governance",
    STRUCTURE: "structure",
    CTA: "cta",
  },
  AUTOMATIONS: {
    HERO: "hero",
    WORKFLOWS: "workflows",
    GOVERNANCE: "governance",
    CONNECTED: "connected",
    CTA: "cta",
  },
  CRM: {
    HERO: "hero",
    FOUNDATION: "foundation",
    MIGRATION: "migration",
    CTA: "cta",
  },
  CASE_STUDIES: {
    HERO: "hero",
    FILTERS: "filters",
    CASE_LIST: "case_list",
    CTA: "cta",
  },
  SECURITY: {
    HERO: "hero",
    CONTROLS: "controls",
    GOVERNANCE: "governance",
    CTA: "cta",
  },
  CONTACT: {
    HERO: "hero",
    EXPECTATIONS: "expectations",
    CALL_EXPECTATIONS: "call_expectations",
    INFO: "info",
    CTA: "cta",
    FORM: "form",
  },
} as const;

export const BLOCK_NAMES = {
  CONTENT: "content",
  LABEL: "label",
  TITLE: "title",
  BODY: "body",
  ITEMS: "items",
  CTA_TITLE: "cta_title",
  CTA_BODY: "cta_body",
  FORM_DESCRIPTION: "form_description",
} as const;

export function normalizeKeyPart(value: string | null | undefined) {
  if (!value) {
    return "";
  }

  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .replace(/_+/g, "_");
}

export function buildBlockKey(pageKey: string, sectionKey: string, blockName: string) {
  return `${normalizeKeyPart(pageKey)}.${normalizeKeyPart(sectionKey)}.${normalizeKeyPart(blockName)}`;
}

export function getSectionContentBlockKey(pageKey: string, sectionKey: string) {
  return buildBlockKey(pageKey, sectionKey, BLOCK_NAMES.CONTENT);
}

export const BLOCK_KEYS = {
  CONTACT: {
    HERO_LABEL: buildBlockKey(PAGE_KEYS.CONTACT, SECTION_KEYS.CONTACT.HERO, BLOCK_NAMES.LABEL),
    HERO_TITLE: buildBlockKey(PAGE_KEYS.CONTACT, SECTION_KEYS.CONTACT.HERO, BLOCK_NAMES.TITLE),
    HERO_BODY: buildBlockKey(PAGE_KEYS.CONTACT, SECTION_KEYS.CONTACT.HERO, BLOCK_NAMES.BODY),
    EXPECTATIONS: "contact.expectations",
    CALL_EXPECTATIONS: "contact.call_expectations",
    CTA_TITLE: buildBlockKey(PAGE_KEYS.CONTACT, SECTION_KEYS.CONTACT.CTA, BLOCK_NAMES.TITLE),
    CTA_BODY: buildBlockKey(PAGE_KEYS.CONTACT, SECTION_KEYS.CONTACT.CTA, BLOCK_NAMES.BODY),
    FORM_DESCRIPTION: buildBlockKey(
      PAGE_KEYS.CONTACT,
      SECTION_KEYS.CONTACT.FORM,
      BLOCK_NAMES.FORM_DESCRIPTION,
    ),
  },
} as const;
