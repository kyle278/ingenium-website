import { PORTAL_PROJECTS_ENDPOINT, PORTAL_SITE_ID } from "./public";

export const PORTAL_PROJECTS_REVALIDATE_SECONDS = 300;

export type PortalProjectFieldValue = string | number | boolean | string[] | null;

export interface PortalProjectField {
  key: string;
  label: string;
  value: PortalProjectFieldValue;
  sourceKind: "default" | "custom";
}

export interface PortalProjectRecord {
  id: string;
  slug: string;
  published: boolean;
  updatedAt: string;
  websiteData: PortalProjectField[];
  websiteDataMap: Record<string, PortalProjectFieldValue>;
}

type PortalProjectsListResponse = {
  ok: boolean;
  site_id: string;
  count: number;
  projects: PortalProjectRecord[];
};

type PortalProjectsDetailResponse = {
  ok: boolean;
  site_id: string;
  project: PortalProjectRecord;
};

const TITLE_KEYS = ["project_name", "name", "title"] as const;
const CLIENT_KEYS = ["client_name", "client", "organisation_name"] as const;
const SUMMARY_KEYS = [
  "project_description",
  "description",
  "summary",
  "overview",
  "teaser",
] as const;
const WEBSITE_URL_KEYS = [
  "website_url",
  "project_url",
  "live_url",
  "url",
] as const;

function isNonEmptyString(value: PortalProjectFieldValue | undefined): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function humanizeSlug(slug: string) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");
}

function looksLikeHttpUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function looksLikeIsoDate(value: string) {
  return /^\d{4}-\d{2}-\d{2}(T.*)?$/.test(value.trim());
}

function readStringByKeys(
  project: PortalProjectRecord,
  keys: readonly string[]
): string | null {
  for (const key of keys) {
    const value = project.websiteDataMap[key];
    if (isNonEmptyString(value)) {
      return value.trim();
    }
  }
  return null;
}

function findFieldByKeys(
  project: PortalProjectRecord,
  keys: readonly string[]
): PortalProjectField | null {
  for (const key of keys) {
    const field = project.websiteData.find((candidate) => candidate.key === key);
    if (field) {
      return field;
    }
  }
  return null;
}

async function fetchPortalJson<T>(query: URLSearchParams): Promise<T> {
  const url = `${PORTAL_PROJECTS_ENDPOINT}?${query.toString()}`;
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
    },
    next: {
      revalidate: PORTAL_PROJECTS_REVALIDATE_SECONDS,
    },
  });

  if (!response.ok) {
    throw new Error(`Portal projects request failed with status ${response.status}`);
  }

  return (await response.json()) as T;
}

export async function listPortalProjects(): Promise<PortalProjectRecord[]> {
  if (!PORTAL_SITE_ID) return [];

  try {
    const query = new URLSearchParams({
      site_id: PORTAL_SITE_ID,
    });
    const payload = await fetchPortalJson<PortalProjectsListResponse>(query);
    return Array.isArray(payload.projects) ? payload.projects : [];
  } catch (error) {
    console.error("Failed to load portal projects list", error);
    return [];
  }
}

export async function getPortalProjectBySlug(
  slug: string
): Promise<PortalProjectRecord | null> {
  if (!PORTAL_SITE_ID || !slug.trim()) return null;

  try {
    const query = new URLSearchParams({
      site_id: PORTAL_SITE_ID,
      slug,
    });
    const payload = await fetchPortalJson<PortalProjectsDetailResponse>(query);
    return payload.project ?? null;
  } catch (error) {
    console.error(`Failed to load portal project '${slug}'`, error);
    return null;
  }
}

export function getPortalProjectTitle(project: PortalProjectRecord) {
  return readStringByKeys(project, TITLE_KEYS) ?? humanizeSlug(project.slug);
}

export function getPortalProjectClientName(project: PortalProjectRecord) {
  return readStringByKeys(project, CLIENT_KEYS);
}

export function getPortalProjectSummary(project: PortalProjectRecord) {
  const mapped = readStringByKeys(project, SUMMARY_KEYS);
  if (mapped) return mapped;

  const firstLongTextField = project.websiteData.find(
    (field) =>
      isNonEmptyString(field.value) &&
      field.value.trim().length > 80 &&
      !TITLE_KEYS.includes(field.key as (typeof TITLE_KEYS)[number]) &&
      !CLIENT_KEYS.includes(field.key as (typeof CLIENT_KEYS)[number])
  );

  const firstLongTextValue = firstLongTextField?.value;
  return isNonEmptyString(firstLongTextValue) ? firstLongTextValue.trim() : null;
}

export function getPortalProjectWebsiteUrl(project: PortalProjectRecord) {
  const urlField = findFieldByKeys(project, WEBSITE_URL_KEYS);
  if (urlField && isNonEmptyString(urlField.value) && looksLikeHttpUrl(urlField.value)) {
    return urlField.value.trim();
  }

  const fallback = project.websiteData.find(
    (field) =>
      typeof field.value === "string" &&
      /url|website/i.test(`${field.key} ${field.label}`) &&
      looksLikeHttpUrl(field.value)
  );

  const fallbackValue = fallback?.value;
  return isNonEmptyString(fallbackValue) ? fallbackValue.trim() : null;
}

export function formatPortalProjectFieldValue(value: PortalProjectFieldValue) {
  if (value === null) return "-";
  if (Array.isArray(value)) return value.join(", ");
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (typeof value === "number") return new Intl.NumberFormat("en-IE").format(value);
  if (looksLikeIsoDate(value)) {
    const date = new Date(value);
    if (!Number.isNaN(date.getTime())) {
      return new Intl.DateTimeFormat("en-IE", { dateStyle: "long" }).format(date);
    }
  }
  return value;
}

export function getPortalProjectPreviewFields(project: PortalProjectRecord) {
  const summaryField = findFieldByKeys(project, SUMMARY_KEYS);

  return project.websiteData.filter((field) => {
    if (TITLE_KEYS.includes(field.key as (typeof TITLE_KEYS)[number])) return false;
    if (CLIENT_KEYS.includes(field.key as (typeof CLIENT_KEYS)[number])) return false;
    if (summaryField?.key === field.key) return false;
    if (WEBSITE_URL_KEYS.includes(field.key as (typeof WEBSITE_URL_KEYS)[number])) return false;
    if (typeof field.value === "string" && field.value.trim().length > 90) return false;
    return field.value !== null;
  });
}

export function getPortalProjectDetailFields(project: PortalProjectRecord) {
  const titleField = findFieldByKeys(project, TITLE_KEYS);
  const summaryField = findFieldByKeys(project, SUMMARY_KEYS);
  const clientField = findFieldByKeys(project, CLIENT_KEYS);
  const websiteUrlField = findFieldByKeys(project, WEBSITE_URL_KEYS);

  return project.websiteData.filter((field) => {
    if (titleField?.key === field.key) return false;
    if (summaryField?.key === field.key) return false;
    if (clientField?.key === field.key) return false;
    if (websiteUrlField?.key === field.key) return false;
    return field.value !== null;
  });
}
