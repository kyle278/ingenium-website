import "server-only";

type WebsiteContentBlock = {
  block_key: string;
  content: string | null;
  content_json: unknown | null;
};

type WebsiteContentResponse = {
  blocks?: WebsiteContentBlock[];
};

type ContentMap = Record<string, WebsiteContentBlock>;

type WebsiteContentApi = {
  text: (key: string, fallback: string) => string;
  lines: (key: string, fallback: string[]) => string[];
  json: <T>(key: string, fallback: T) => T;
  has: (key: string) => boolean;
};

const EMPTY: WebsiteContentApi = {
  text: (_key, fallback) => fallback,
  lines: (_key, fallback) => fallback,
  json: (_key, fallback) => fallback,
  has: () => false,
};

function normalizeLines(value: string | null | undefined): string[] {
  if (!value) return [];
  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function buildApi(map: ContentMap): WebsiteContentApi {
  return {
    text: (key, fallback) => {
      const value = map[key]?.content?.trim();
      return value ? value : fallback;
    },
    lines: (key, fallback) => {
      const lines = normalizeLines(map[key]?.content ?? null);
      return lines.length ? lines : fallback;
    },
    json: (key, fallback) => {
      const value = map[key]?.content_json;
      return value !== null && value !== undefined ? (value as typeof fallback) : fallback;
    },
    has: (key) => Boolean(map[key]?.content || map[key]?.content_json),
  };
}

export async function getWebsiteContent(): Promise<WebsiteContentApi> {
  const siteId = process.env.WEBSITE_SITE_ID;
  const apiKey = process.env.WEBSITE_API_KEY;

  if (!siteId || !apiKey) {
    return EMPTY;
  }

  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const url = new URL("/api/websites/content", baseUrl);
    url.searchParams.set("siteId", siteId);
    url.searchParams.set("apiKey", apiKey);

    const res = await fetch(url.toString(), { cache: "no-store" });
    if (!res.ok) {
      return EMPTY;
    }

    const data = (await res.json()) as WebsiteContentResponse;
    const blocks = data.blocks ?? [];
    const map = blocks.reduce<ContentMap>((acc, block) => {
      acc[block.block_key] = block;
      return acc;
    }, {});

    return buildApi(map);
  } catch {
    return EMPTY;
  }
}
