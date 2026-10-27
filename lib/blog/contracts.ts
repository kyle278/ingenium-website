import { z } from "zod";

export const BLOG_VERSION = 1;
export const BLOG_BASE_PATH = "/blog";
export const slugSchema = z
  .string()
  .min(1)
  .max(120)
  .regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "Use lowercase words separated by hyphens.",
  )
  .refine(
    (v) =>
      ![
        "category",
        "tag",
        "author",
        "page",
        "search",
        "feed",
        "preview",
        "api",
      ].includes(v),
    "This URL is reserved.",
  );
export function blogSlug(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 120);
}
export const safeUrl = z
  .string()
  .max(2000)
  .refine((value) => {
    if (!value) return true;
    if (
      value.startsWith("/") &&
      !value.startsWith("//") &&
      !/[\\\u0000-\u001f]/.test(value)
    )
      return true;
    try {
      const u = new URL(value);
      return (
        ["https:", "mailto:", "tel:"].includes(u.protocol) &&
        !u.username &&
        !u.password
      );
    } catch {
      return false;
    }
  }, "Use an HTTPS URL or a relative website path.");
export const blockSchema = z
  .object({
    id: z.string().uuid(),
    type: z.enum([
      "paragraph",
      "heading",
      "list",
      "quote",
      "image",
      "callout",
      "cta",
      "table",
      "divider",
      "code",
    ]),
    text: z.string().max(50000).default(""),
    level: z.number().int().min(2).max(4).default(2),
    ordered: z.boolean().default(false),
    media_id: z.string().uuid().optional(),
    alt: z.string().max(1000).default(""),
    decorative: z.boolean().default(false),
    caption: z.string().max(1000).default(""),
    href: safeUrl.default(""),
    label: z.string().max(200).default(""),
  })
  .strict();
export const seoSchema = z
  .object({
    title: z.string().max(250).default(""),
    description: z.string().max(500).default(""),
    canonical: z
      .union([
        z.literal(""),
        z.url().refine((v) => new URL(v).protocol === "https:"),
      ])
      .default(""),
    noindex: z.boolean().default(false),
    social_title: z.string().max(250).default(""),
    social_description: z.string().max(500).default(""),
    social_media_id: z.string().uuid().optional(),
    focus_topic: z.string().max(200).default(""),
  })
  .strict();
export const articleSchema = z
  .object({
    title: z.string().max(200).default(""),
    slug: z.union([z.literal(""), slugSchema]).default(""),
    excerpt: z.string().max(500).default(""),
    body: z
      .object({ version: z.literal(1), blocks: z.array(blockSchema).max(2000) })
      .strict()
      .default({ version: 1, blocks: [] }),
    author_ids: z.array(z.string().uuid()).max(5).default([]),
    category_ids: z.array(z.string().uuid()).max(5).default([]),
    tag_ids: z.array(z.string().uuid()).max(10).default([]),
    cover_media_id: z.string().uuid().optional(),
    cover_alt: z.string().max(1000).default(""),
    featured: z.boolean().default(false),
    related_ids: z.array(z.string().uuid()).max(6).default([]),
    seo: seoSchema.default(() => seoSchema.parse({})),
    notes: z.string().max(10000).default(""),
    locale: z.literal("en").default("en"),
  })
  .strict()
  .refine(
    (v) => JSON.stringify(v).length <= 1048576,
    "Article exceeds the 1 MB limit.",
  );
export const entitySchema = z
  .object({
    name: z.string().min(1).max(200),
    slug: slugSchema,
    description: z.string().max(5000).default(""),
    url: safeUrl.default(""),
    media_id: z.string().uuid().optional(),
    seo: seoSchema.default(() => seoSchema.parse({})),
  })
  .strict();
export const settingsSchema = z
  .object({
    enabled: z.boolean(),
    title: z.string().min(1).max(200),
    description: z.string().max(500),
    base_path: z
      .string()
      .regex(
        /^\/[a-z0-9]+(?:-[a-z0-9]+)*$/,
        "Use one path such as /blog or /insights.",
      ),
    timezone: z.string().refine((v) => {
      try {
        new Intl.DateTimeFormat("en", { timeZone: v });
        return true;
      } catch {
        return false;
      }
    }),
    independent_review: z.boolean(),
    title_suffix: z.string().max(100),
  })
  .strict();
export type Article = z.infer<typeof articleSchema>;
export type BlogBlock = z.infer<typeof blockSchema>;
export type BlogSeo = z.infer<typeof seoSchema>;
export type EntityData = z.infer<typeof entitySchema>;
export type BlogConfig = z.infer<typeof settingsSchema>;
export type PublicMedia = {
  id: string;
  url: string;
  width: number;
  height: number;
  alt: string;
};
export type PublicEntity = Omit<EntityData, "seo"> & {
  seo: Omit<BlogSeo, "focus_topic">;
  id: string;
  kind: "author" | "category" | "tag";
};
export type PublishedArticle = Omit<
  Article,
  "notes" | "author_ids" | "category_ids" | "tag_ids" | "seo"
> & {
  id: string;
  revision_id: string;
  published_at: string;
  modified_at: string;
  url: string;
  authors: PublicEntity[];
  categories: PublicEntity[];
  tags: PublicEntity[];
  media: Record<string, PublicMedia>;
  seo: Omit<BlogSeo, "focus_topic">;
};
export type BlogPost = {
  id: string;
  site_id: string;
  draft: Article;
  draft_version: number;
  live_revision_id: string | null;
  review_revision_id: string | null;
  review_state: string;
  schedule_revision_id: string | null;
  scheduled_at: string | null;
  schedule_timezone: string | null;
  schedule_error: string | null;
  first_published_at: string | null;
  archived_at: string | null;
  updated_at: string;
  published_version: number | null;
};
export type BlogEntity = {
  id: string;
  kind: "author" | "category" | "tag";
  draft: EntityData;
  published: EntityData | null;
  version: number;
  archived_at: string | null;
};
export type BlogMedia = {
  id: string;
  file_name: string;
  width: number;
  height: number;
  byte_size: number;
  alt: string;
  public_url: string | null;
  created_at: string;
};
export type BlogRelease = {
  id: string;
  generation: number;
  kind: string;
  post_id: string | null;
  revision_id: string | null;
  status: string;
  attempts: number;
  error: string | null;
  created_at: string;
  verified_at: string | null;
  paths: string[];
};
export type BlogWorkspace = {
  site: {
    id: string;
    organisation_id: string;
    name: string;
    domain: string;
    status: string;
  };
  sites: { id: string; name: string; domain: string }[];
  settings: BlogConfig & {
    public_key: string;
    generation: number;
    version: number;
    callback_url: string | null;
    has_secret: boolean;
    last_worker_at: string | null;
  };
  role: string;
  posts: BlogPost[];
  entities: BlogEntity[];
  media: BlogMedia[];
  releases: BlogRelease[];
  post?: BlogPost;
  revisions?: {
    id: string;
    created_at: string;
    data: Article;
    published: PublishedArticle | null;
    kind: string;
    source_version: number;
  }[];
  activity?: {
    id: string;
    action: string;
    created_at: string;
    detail: Record<string, unknown>;
  }[];
  total: number;
  page: number;
};
export function articleWarnings(article: Article): string[] {
  return [
    !article.excerpt && "Add an excerpt for lists and search previews.",
    !article.seo.description && !article.excerpt && "Add a search description.",
    article.title.length > 65 &&
      "The title may be shortened in search results.",
    article.seo.noindex &&
      "This public article asks search engines not to index it.",
    !!article.seo.canonical &&
      "Check the alternate canonical destination before publishing.",
  ].filter(Boolean) as string[];
}
export function validatePublication(article: Article) {
  if (!article.title.trim()) throw new Error("Add an article title.");
  slugSchema.parse(article.slug);
  if (!article.body.blocks.some((b) => b.text.trim() || b.type === "image"))
    throw new Error("Add article content before publishing.");
  if (!article.author_ids.length)
    throw new Error("Select an author before publishing.");
  if (article.cover_media_id && !article.cover_alt.trim())
    throw new Error("Add cover image alt text.");
  for (const b of article.body.blocks) {
    if (b.type === "image" && (!b.media_id || (!b.decorative && !b.alt.trim())))
      throw new Error(
        "Choose an image and add alt text, or mark it decorative.",
      );
    if (b.type === "cta" && (!b.href || !b.label.trim()))
      throw new Error("Add a link and label to every call to action.");
  }
}
/** Convert entered wall time to one unambiguous instant, rejecting DST gaps/folds. */
export function scheduledInstant(local: string, timezone: string): string {
  if (!/^\d{4}-\d\d-\d\dT\d\d:\d\d$/.test(local))
    throw new Error("Choose a date and time.");
  const target = Date.parse(local + "Z");
  const format = new Intl.DateTimeFormat("sv-SE", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  });
  const offsets = new Set<number>();
  for (const hours of [-36, -12, 0, 12, 36]) {
    const t = target + hours * 3600000;
    offsets.add(Date.parse(format.format(t).replace(" ", "T") + "Z") - t);
  }
  const matches = [...offsets]
    .map((offset) => target - offset)
    .filter((t) => format.format(t).replace(" ", "T") === local);
  if (matches.length !== 1)
    throw new Error(
      matches.length
        ? "This time occurs twice during the clock change. Choose an unambiguous time."
        : "This local time does not exist during the clock change.",
    );
  if (matches[0] <= Date.now())
    throw new Error("Choose a future publication time.");
  return new Date(matches[0]).toISOString();
}
