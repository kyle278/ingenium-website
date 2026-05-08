import { PORTAL_PROJECTS_ENDPOINT, PORTAL_SITE_ID } from "./public";

export const PORTAL_PROJECTS_REVALIDATE_SECONDS = 300;
const DEFAULT_OUTCOME_METRIC_COUNT = 3;
const DEFAULT_SERVICE_INSIGHT_COUNT = 3;

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

export interface PortalRenderableText {
  text: string;
  missing: boolean;
  requiredFields: string[];
}

export interface PortalRenderableListItem extends PortalRenderableText {
  key: string;
}

export interface PortalRenderableMetric {
  key: string;
  value: PortalRenderableText;
  label: PortalRenderableText;
  missing: boolean;
  requiredFields: string[];
}

export interface PortalRenderableServiceInsight {
  key: string;
  title: PortalRenderableText;
  summary: PortalRenderableText;
  highlights: PortalRenderableListItem[];
  metrics: PortalRenderableMetric[];
}

export interface PortalRenderableWebsiteStatus {
  value: "live" | "mockup" | null;
  label: string;
  description: string;
  className: string;
  missing: boolean;
  requiredFields: string[];
}

export interface PortalProjectPresentation {
  projectName: PortalRenderableText;
  clientName: PortalRenderableText;
  industry: PortalRenderableText;
  clientSize: PortalRenderableText;
  timeframe: PortalRenderableText;
  deliveryDate: PortalRenderableText;
  teaser: PortalRenderableText;
  summary: PortalRenderableText;
  services: PortalRenderableListItem[];
  insights: PortalRenderableListItem[];
  outcomeMetrics: PortalRenderableMetric[];
  websiteStatus: PortalRenderableWebsiteStatus;
  websiteUrl: string | null;
  challenge: PortalRenderableText;
  intervention: PortalRenderableText;
  deliveredAssets: PortalRenderableListItem[];
  stack: PortalRenderableListItem[];
  serviceInsights: PortalRenderableServiceInsight[];
}

const TITLE_KEYS = ["project_name", "name", "title"] as const;
const CLIENT_KEYS = ["client_name", "client", "organisation_name"] as const;
const SUMMARY_KEYS = [
  "project_description",
  "description",
  "summary",
  "overview",
  "teaser",
] as const;
const WEBSITE_URL_KEYS = ["website_url", "project_url", "live_url", "url"] as const;
const INDUSTRY_KEYS = ["industry"] as const;
const CLIENT_SIZE_KEYS = ["client_size"] as const;
const TIMEFRAME_KEYS = ["timeframe"] as const;
const DELIVERY_DATE_KEYS = ["delivery_date", "project_end_date", "end_date"] as const;
const TEASER_KEYS = ["teaser"] as const;
const SUMMARY_LAYOUT_KEYS = [
  "summary",
  "project_description",
  "description",
  "overview",
] as const;
const SERVICES_KEYS = ["services"] as const;
const INSIGHTS_KEYS = ["insights"] as const;
const STACK_KEYS = ["stack"] as const;
const WEBSITE_STATUS_KEYS = ["website_status"] as const;
const CHALLENGE_KEYS = ["challenge"] as const;
const INTERVENTION_KEYS = ["intervention"] as const;
const DELIVERED_ASSETS_KEYS = ["delivered_assets"] as const;

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

function readStringByKeys(project: PortalProjectRecord, keys: readonly string[]) {
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

function splitTextList(value: string) {
  return value
    .split(/\r?\n|,|;/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeTextValue(value: PortalProjectFieldValue) {
  if (value === null) return null;

  if (Array.isArray(value)) {
    const items = value.map((item) => item.trim()).filter(Boolean);
    return items.length > 0 ? items.join(", ") : null;
  }

  const formatted = formatPortalProjectFieldValue(value);
  const text = typeof formatted === "string" ? formatted.trim() : String(formatted).trim();
  return text.length > 0 ? text : null;
}

function normalizeListValue(value: PortalProjectFieldValue) {
  if (Array.isArray(value)) {
    return value.map((item) => item.trim()).filter(Boolean);
  }

  if (typeof value === "string") {
    const split = splitTextList(value);
    return split.length > 0 ? split : [value.trim()].filter(Boolean);
  }

  const normalized = normalizeTextValue(value);
  return normalized ? [normalized] : [];
}

function missingWebsiteFieldMessage(requiredFields: readonly string[]) {
  if (requiredFields.length === 1) {
    return `Add website field: ${requiredFields[0]}`;
  }

  return `Add website fields: ${requiredFields.join(", ")}`;
}

function buildRenderableText(
  text: string,
  missing: boolean,
  requiredFields: readonly string[]
): PortalRenderableText {
  return {
    text,
    missing,
    requiredFields: [...requiredFields],
  };
}

function buildMissingRenderableText(requiredFields: readonly string[]) {
  return buildRenderableText(missingWebsiteFieldMessage(requiredFields), true, requiredFields);
}

function buildTextField(project: PortalProjectRecord, keys: readonly string[]) {
  const field = findFieldByKeys(project, keys);
  if (!field) return buildMissingRenderableText(keys);

  const text = normalizeTextValue(field.value);
  if (!text) return buildMissingRenderableText(keys);

  return buildRenderableText(text, false, [field.key]);
}

function buildListField(project: PortalProjectRecord, keys: readonly string[]) {
  const field = findFieldByKeys(project, keys);
  if (!field) {
    return [
      {
        key: `missing-${keys.join("-")}`,
        ...buildMissingRenderableText(keys),
      },
    ] satisfies PortalRenderableListItem[];
  }

  const items = normalizeListValue(field.value);
  if (items.length === 0) {
    return [
      {
        key: `missing-${keys.join("-")}`,
        ...buildMissingRenderableText(keys),
      },
    ] satisfies PortalRenderableListItem[];
  }

  return items.map((item, index) => ({
    key: `${field.key}-${index}`,
    ...buildRenderableText(item, false, [field.key]),
  }));
}

function buildMetricCard(project: PortalProjectRecord, index: number): PortalRenderableMetric {
  const valueKey = `outcome_metric_${index}_value`;
  const labelKey = `outcome_metric_${index}_label`;
  const value = buildTextField(project, [valueKey]);
  const label = buildTextField(project, [labelKey]);
  const missingFields = [
    ...(value.missing ? value.requiredFields : []),
    ...(label.missing ? label.requiredFields : []),
  ];

  return {
    key: `outcome-metric-${index}`,
    value,
    label,
    missing: missingFields.length > 0,
    requiredFields: missingFields,
  };
}

function buildServiceInsightMetric(
  project: PortalProjectRecord,
  insightIndex: number,
  metricIndex: number
): PortalRenderableMetric {
  const valueKey = `service_insight_${insightIndex}_metric_${metricIndex}_value`;
  const labelKey = `service_insight_${insightIndex}_metric_${metricIndex}_label`;
  const value = buildTextField(project, [valueKey]);
  const label = buildTextField(project, [labelKey]);
  const missingFields = [
    ...(value.missing ? value.requiredFields : []),
    ...(label.missing ? label.requiredFields : []),
  ];

  return {
    key: `service-insight-${insightIndex}-metric-${metricIndex}`,
    value,
    label,
    missing: missingFields.length > 0,
    requiredFields: missingFields,
  };
}

function buildServiceInsightCard(
  project: PortalProjectRecord,
  index: number
): PortalRenderableServiceInsight {
  return {
    key: `service-insight-${index}`,
    title: buildTextField(project, [`service_insight_${index}_title`]),
    summary: buildTextField(project, [`service_insight_${index}_summary`]),
    highlights: buildListField(project, [`service_insight_${index}_highlights`]),
    metrics: [
      buildServiceInsightMetric(project, index, 1),
      buildServiceInsightMetric(project, index, 2),
    ],
  };
}

function collectIndexedFieldNumbers(project: PortalProjectRecord, pattern: RegExp) {
  const matches = new Set<number>();

  for (const field of project.websiteData) {
    const match = field.key.match(pattern);
    if (!match?.[1]) continue;

    const index = Number(match[1]);
    if (Number.isInteger(index) && index > 0) {
      matches.add(index);
    }
  }

  return Array.from(matches).sort((left, right) => left - right);
}

function buildWebsiteStatus(project: PortalProjectRecord): PortalRenderableWebsiteStatus {
  const field = findFieldByKeys(project, WEBSITE_STATUS_KEYS);
  const rawValue = field ? normalizeTextValue(field.value)?.toLowerCase() ?? null : null;

  if (rawValue === "live") {
    return {
      value: "live",
      label: "Live Website",
      description: "This project includes a live website.",
      className: "bg-emerald-100 text-emerald-700",
      missing: false,
      requiredFields: [field?.key ?? WEBSITE_STATUS_KEYS[0]],
    };
  }

  if (rawValue === "mockup") {
    return {
      value: "mockup",
      label: "Mockup Website",
      description: "This project is currently shown as a mockup or concept view.",
      className: "bg-amber-100 text-amber-700",
      missing: false,
      requiredFields: [field?.key ?? WEBSITE_STATUS_KEYS[0]],
    };
  }

  return {
    value: null,
    label: missingWebsiteFieldMessage(WEBSITE_STATUS_KEYS),
    description: "Add website_status with value live or mockup.",
    className: "border border-dashed border-amber-300 bg-amber-50 text-amber-700",
    missing: true,
    requiredFields: [...WEBSITE_STATUS_KEYS],
  };
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

export async function getPortalProjectBySlug(slug: string): Promise<PortalProjectRecord | null> {
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
  if (typeof value === "string" && looksLikeIsoDate(value)) {
    const date = new Date(value);
    if (!Number.isNaN(date.getTime())) {
      return new Intl.DateTimeFormat("en-IE", { dateStyle: "long" }).format(date);
    }
  }

  return value;
}

export function getPortalProjectPresentation(project: PortalProjectRecord): PortalProjectPresentation {
  const metricIndexes = collectIndexedFieldNumbers(project, /^outcome_metric_(\d+)_/);
  const outcomeMetricCount = Math.max(DEFAULT_OUTCOME_METRIC_COUNT, metricIndexes.length);

  const insightIndexes = collectIndexedFieldNumbers(project, /^service_insight_(\d+)_/);
  const serviceInsightCount = Math.max(DEFAULT_SERVICE_INSIGHT_COUNT, insightIndexes.length);

  return {
    projectName: buildTextField(project, TITLE_KEYS),
    clientName: buildTextField(project, CLIENT_KEYS),
    industry: buildTextField(project, INDUSTRY_KEYS),
    clientSize: buildTextField(project, CLIENT_SIZE_KEYS),
    timeframe: buildTextField(project, TIMEFRAME_KEYS),
    deliveryDate: buildTextField(project, DELIVERY_DATE_KEYS),
    teaser: buildTextField(project, TEASER_KEYS),
    summary: buildTextField(project, SUMMARY_LAYOUT_KEYS),
    services: buildListField(project, SERVICES_KEYS),
    insights: buildListField(project, INSIGHTS_KEYS),
    outcomeMetrics: Array.from({ length: outcomeMetricCount }, (_, index) =>
      buildMetricCard(project, index + 1)
    ),
    websiteStatus: buildWebsiteStatus(project),
    websiteUrl: getPortalProjectWebsiteUrl(project),
    challenge: buildTextField(project, CHALLENGE_KEYS),
    intervention: buildTextField(project, INTERVENTION_KEYS),
    deliveredAssets: buildListField(project, DELIVERED_ASSETS_KEYS),
    stack: buildListField(project, STACK_KEYS),
    serviceInsights: Array.from({ length: serviceInsightCount }, (_, index) =>
      buildServiceInsightCard(project, index + 1)
    ),
  };
}
