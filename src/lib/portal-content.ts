import "server-only";

import { unstable_noStore as noStore } from "next/cache";

import { normalizeKeyPart } from "@/src/lib/content-map";
import { createSupabaseAnonClient } from "@/src/lib/supabase";
import type { WebsiteContentBlock } from "@/src/lib/portal-types";
import { portalConnect } from "@/src/portalconnect";

const DEFAULT_PAGE_KEY = "home";
const DEFAULT_SECTION_KEY = "general";
const LEGACY_SECTION_DELIMITERS = /::|>|\/|\|/;
const BLOCK_KEY_DELIMITERS = /::|>|\/|\||\./;

export type NormalizedWebsiteContentBlock = WebsiteContentBlock & {
  page_key: string;
  section_key: string;
  sort_order: number;
};

interface BlockLocation {
  pageKey: string;
  sectionKey: string;
}

export interface EditableAttributes {
  "data-content-block-key": string;
  "data-page-key": string;
  "data-section-key": string;
}

function normalizeBlockKey(blockKey: string | null | undefined) {
  return normalizeKeyPart(blockKey);
}

function toTokens(value: string | null | undefined, splitBy: RegExp) {
  if (!value) {
    return [];
  }

  return value
    .split(splitBy)
    .map((part) => normalizeKeyPart(part))
    .filter(Boolean);
}

function inferLocationFromBlockKey(blockKey: string): BlockLocation | null {
  const tokens = toTokens(blockKey, BLOCK_KEY_DELIMITERS);

  if (tokens.length < 2) {
    return null;
  }

  return {
    pageKey: tokens[0] ?? DEFAULT_PAGE_KEY,
    sectionKey: tokens[1] ?? DEFAULT_SECTION_KEY,
  };
}

function parseLegacySection(section: string | null, blockKey: string): BlockLocation | null {
  const tokens = toTokens(section, LEGACY_SECTION_DELIMITERS);

  if (tokens.length >= 2) {
    return {
      pageKey: tokens[0] ?? DEFAULT_PAGE_KEY,
      sectionKey: tokens[1] ?? DEFAULT_SECTION_KEY,
    };
  }

  if (tokens.length === 1) {
    const inferred = inferLocationFromBlockKey(blockKey);

    return {
      pageKey: tokens[0] ?? DEFAULT_PAGE_KEY,
      sectionKey:
        inferred?.pageKey === tokens[0]
          ? inferred.sectionKey
          : inferred?.sectionKey ?? DEFAULT_SECTION_KEY,
    };
  }

  return null;
}

function resolveLocation(block: WebsiteContentBlock): BlockLocation {
  const explicitPageKey = normalizeKeyPart(block.page_key);
  const explicitSectionKey = normalizeKeyPart(block.section_key);

  if (explicitPageKey && explicitSectionKey) {
    return {
      pageKey: explicitPageKey,
      sectionKey: explicitSectionKey,
    };
  }

  const legacyLocation = parseLegacySection(block.section, block.block_key);

  if (legacyLocation) {
    return legacyLocation;
  }

  const inferredLocation = inferLocationFromBlockKey(block.block_key);

  if (inferredLocation) {
    return inferredLocation;
  }

  return {
    pageKey: DEFAULT_PAGE_KEY,
    sectionKey: DEFAULT_SECTION_KEY,
  };
}

function normalizeBlock(raw: WebsiteContentBlock): NormalizedWebsiteContentBlock {
  const location = resolveLocation(raw);

  return {
    ...raw,
    page_key: location.pageKey,
    section_key: location.sectionKey,
    sort_order: typeof raw.sort_order === "number" ? raw.sort_order : 0,
  };
}

function contentSort(a: NormalizedWebsiteContentBlock, b: NormalizedWebsiteContentBlock) {
  if (a.page_key !== b.page_key) {
    return a.page_key.localeCompare(b.page_key);
  }

  if (a.section_key !== b.section_key) {
    return a.section_key.localeCompare(b.section_key);
  }

  if (a.sort_order !== b.sort_order) {
    return a.sort_order - b.sort_order;
  }

  return a.created_at.localeCompare(b.created_at);
}

function readBlockTextValue(block: NormalizedWebsiteContentBlock | undefined) {
  if (!block) {
    return null;
  }

  if (typeof block.content === "string" && block.content.trim().length > 0) {
    return block.content;
  }

  if (typeof block.content_json === "string" && block.content_json.trim().length > 0) {
    return block.content_json;
  }

  return null;
}

function readBlockListValue(block: NormalizedWebsiteContentBlock | undefined) {
  if (!block) {
    return null;
  }

  if (Array.isArray(block.content_json)) {
    const items = block.content_json
      .map((item) => (typeof item === "string" ? item.trim() : ""))
      .filter(Boolean);

    if (items.length > 0) {
      return items;
    }
  }

  if (typeof block.content === "string" && block.content.trim().length > 0) {
    const items = block.content
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);

    if (items.length > 0) {
      return items;
    }
  }

  return null;
}

function logMissingBlock(pageKey: string, sectionKey: string, blockKey: string) {
  if (process.env.NODE_ENV !== "production") {
    console.warn(
      `[portal-content] Missing block "${blockKey}" for ${pageKey}/${sectionKey}. Rendering fallback text.`,
    );
  }
}

export function buildEditableAttributes(
  pageKey: string,
  sectionKey: string,
  blockKey: string,
): EditableAttributes {
  return {
    "data-content-block-key": blockKey,
    "data-page-key": normalizeKeyPart(pageKey) || DEFAULT_PAGE_KEY,
    "data-section-key": normalizeKeyPart(sectionKey) || DEFAULT_SECTION_KEY,
  };
}

export async function getPublishedBlocks(): Promise<NormalizedWebsiteContentBlock[]> {
  noStore();

  const supabase = createSupabaseAnonClient();
  const { data, error } = await supabase
    .from("website_content_blocks")
    .select("*")
    .eq("account_id", portalConnect.account_id)
    .eq("site_id", portalConnect.site_id)
    .eq("is_published", true)
    .order("page_key", { ascending: true })
    .order("section_key", { ascending: true })
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error(`Failed to load website content blocks: ${error.message}`);
  }

  return (data ?? []).map((row) => normalizeBlock(row as WebsiteContentBlock)).sort(contentSort);
}

export async function getSectionBlocks(pageKey: string, sectionKey: string) {
  const normalizedPageKey = normalizeKeyPart(pageKey) || DEFAULT_PAGE_KEY;
  const normalizedSectionKey = normalizeKeyPart(sectionKey) || DEFAULT_SECTION_KEY;
  const blocks = await getPublishedBlocks();

  return blocks.filter(
    (block) =>
      normalizeKeyPart(block.page_key) === normalizedPageKey &&
      normalizeKeyPart(block.section_key) === normalizedSectionKey,
  );
}

export async function getBlockContent(
  pageKey: string,
  sectionKey: string,
  blockKey: string,
  fallback = "",
) {
  const sectionBlocks = await getSectionBlocks(pageKey, sectionKey);
  const normalizedBlockKey = normalizeBlockKey(blockKey);
  const block = sectionBlocks.find(
    (item) => normalizeBlockKey(item.block_key) === normalizedBlockKey,
  );
  const textValue = readBlockTextValue(block);

  if (textValue !== null) {
    return textValue;
  }

  logMissingBlock(pageKey, sectionKey, blockKey);
  return fallback;
}

export async function getBlockJson<T>(
  pageKey: string,
  sectionKey: string,
  blockKey: string,
  fallback: T,
) {
  const sectionBlocks = await getSectionBlocks(pageKey, sectionKey);
  const normalizedBlockKey = normalizeBlockKey(blockKey);
  const block = sectionBlocks.find(
    (item) => normalizeBlockKey(item.block_key) === normalizedBlockKey,
  );

  if (!block) {
    logMissingBlock(pageKey, sectionKey, blockKey);
    return fallback;
  }

  if (block.content_json !== null && block.content_json !== undefined) {
    return block.content_json as T;
  }

  if (typeof block.content === "string" && block.content.trim().length > 0) {
    try {
      return JSON.parse(block.content) as T;
    } catch {
      logMissingBlock(pageKey, sectionKey, blockKey);
      return fallback;
    }
  }

  logMissingBlock(pageKey, sectionKey, blockKey);
  return fallback;
}

export async function getBlockList(
  pageKey: string,
  sectionKey: string,
  blockKey: string,
  fallback: string[],
) {
  const sectionBlocks = await getSectionBlocks(pageKey, sectionKey);
  const normalizedBlockKey = normalizeBlockKey(blockKey);
  const block = sectionBlocks.find(
    (item) => normalizeBlockKey(item.block_key) === normalizedBlockKey,
  );
  const listValue = readBlockListValue(block);

  if (listValue !== null) {
    return listValue;
  }

  logMissingBlock(pageKey, sectionKey, blockKey);
  return fallback;
}

function findResolverBlock(
  sectionBlocks: NormalizedWebsiteContentBlock[],
  pageKey: string,
  sectionKey: string,
  blockKey: string,
) {
  const normalizedSectionKey = normalizeKeyPart(sectionKey) || DEFAULT_SECTION_KEY;
  const normalizedBlockKey = normalizeBlockKey(blockKey);
  const normalizedPageKey = normalizeKeyPart(pageKey) || DEFAULT_PAGE_KEY;
  const directMatch = sectionBlocks.find(
    (block) => normalizeBlockKey(block.block_key) === normalizedBlockKey,
  );

  if (directMatch) {
    return directMatch;
  }

  const scopedMatch = sectionBlocks.find(
    (block) =>
      normalizeBlockKey(block.block_key) ===
      normalizeBlockKey(`${normalizedPageKey}.${normalizedSectionKey}.${blockKey}`),
  );

  if (scopedMatch) {
    return scopedMatch;
  }

  return sectionBlocks.find((block) => {
    const normalizedCandidate = normalizeBlockKey(block.block_key);

    return (
      normalizedCandidate.endsWith(`_${normalizedSectionKey}_${normalizedBlockKey}`) ||
      normalizedCandidate.endsWith(`_${normalizedBlockKey}`)
    );
  });
}

export function createPageContentResolver(
  pageKey: string,
  blocks: NormalizedWebsiteContentBlock[],
) {
  const normalizedPageKey = normalizeKeyPart(pageKey) || DEFAULT_PAGE_KEY;
  const pageBlocks = blocks.filter(
    (block) => normalizeKeyPart(block.page_key) === normalizedPageKey,
  );

  function getSectionBlocks(sectionKey: string) {
    const normalizedSectionKey = normalizeKeyPart(sectionKey) || DEFAULT_SECTION_KEY;

    return pageBlocks.filter(
      (block) => normalizeKeyPart(block.section_key) === normalizedSectionKey,
    );
  }

  function getBlock(sectionKey: string, blockKey: string) {
    return findResolverBlock(getSectionBlocks(sectionKey), normalizedPageKey, sectionKey, blockKey);
  }

  function text(sectionKey: string, blockKey: string, fallback: string) {
    const value = readBlockTextValue(getBlock(sectionKey, blockKey));

    if (value !== null) {
      return value;
    }

    logMissingBlock(normalizedPageKey, sectionKey, blockKey);
    return fallback;
  }

  function list(sectionKey: string, blockKey: string, fallback: string[]) {
    const value = readBlockListValue(getBlock(sectionKey, blockKey));

    if (value !== null) {
      return value;
    }

    logMissingBlock(normalizedPageKey, sectionKey, blockKey);
    return fallback;
  }

  function json<T>(sectionKey: string, blockKey: string, fallback: T) {
    const block = getBlock(sectionKey, blockKey);

    if (block?.content_json !== null && block?.content_json !== undefined) {
      return block.content_json as T;
    }

    if (typeof block?.content === "string" && block.content.trim().length > 0) {
      try {
        return JSON.parse(block.content) as T;
      } catch {
        logMissingBlock(normalizedPageKey, sectionKey, blockKey);
      }
    } else {
      logMissingBlock(normalizedPageKey, sectionKey, blockKey);
    }

    return fallback;
  }

  function attrs(sectionKey: string, blockKey: string) {
    return buildEditableAttributes(normalizedPageKey, sectionKey, blockKey);
  }

  return {
    attrs,
    text,
    list,
    json,
  };
}
