import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";
import { revalidatePath, revalidateTag } from "next/cache";

export type StoreImage = { id: string; url: string; alt: string; width: number; height: number; variants: Record<string, string> };
export type StoreProduct = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  description: string;
  seo_title: string;
  seo_description: string;
  price_display: "show" | "enquiry" | "hide";
  featured: boolean;
  attributes: Record<string, string>;
  category_ids: string[];
  images: StoreImage[];
  variants: Array<{ id: string; title: string; sku: string; options: Record<string, string>; price: number | null; compare_at_price: number | null; available: boolean }>;
};
export type StoreCategory = { id: string; title: string; slug: string; position: number };
type Manifest = { schema_version: number; revision: number; base: string; pages: number; total: number; slugs: string[]; store: { public_key: string; currency: string; mode: string } };
type StorePage = { items: StoreProduct[]; page: number; pages: number; total: number };
type CatalogueState = { status: "unconfigured" | "unavailable" | "ready"; revision?: number; currency?: string; products: StoreProduct[]; categories: StoreCategory[] };

const publicKey = process.env.INGENIUM_COMMERCE_SITE_KEY?.trim() || "";
const edgeOrigin = (process.env.INGENIUM_COMMERCE_EDGE_ORIGIN || "https://edge.ingeniumconsulting.net").replace(/\/$/, "");
const portalOrigin = (process.env.INGENIUM_COMMERCE_PORTAL_ORIGIN || "https://portal.ingeniumconsulting.net").replace(/\/$/, "");
const cacheTag = `ingenium-commerce:${publicKey}`;

async function json<T>(url: string, revalidate = 10): Promise<T | null> {
  try {
    const response = await fetch(url, { next: { revalidate, tags: [cacheTag] }, signal: AbortSignal.timeout(8000) });
    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

async function manifest() {
  if (!publicKey) return null;
  return json<Manifest>(`${edgeOrigin}/storefront/v1/sites/${encodeURIComponent(publicKey)}/manifest.json`);
}

export async function getStoreCatalogue(): Promise<CatalogueState> {
  if (!publicKey) return { status: "unconfigured", products: [], categories: [] };
  const current = await manifest();
  if (!current?.base || current.store?.public_key !== publicKey) return { status: "unavailable", products: [], categories: [] };
  const [pages, categories] = await Promise.all([
    Promise.all(Array.from({ length: current.pages }, (_, index) => json<StorePage>(`${edgeOrigin}${current.base}/products/pages/${index + 1}.json`))),
    json<StoreCategory[]>(`${edgeOrigin}${current.base}/categories.json`),
  ]);
  if (pages.some((page) => !page)) return { status: "unavailable", revision: current.revision, currency: current.store.currency, products: [], categories: [] };
  const products = pages.flatMap((page) => page?.items ?? []).sort((a, b) => Number(b.featured) - Number(a.featured) || a.title.localeCompare(b.title));
  return { status: "ready", revision: current.revision, currency: current.store.currency, products, categories: categories ?? [] };
}

export async function getStoreProduct(slug: string) {
  if (!publicKey) return { status: "unconfigured" as const, product: null, currency: null };
  const current = await manifest();
  if (!current?.base || current.store?.public_key !== publicKey) return { status: "unavailable" as const, product: null, currency: null };
  if (!current.slugs.includes(slug)) return { status: "missing" as const, product: null, currency: current.store.currency };
  const product = await json<StoreProduct>(`${edgeOrigin}${current.base}/products/${encodeURIComponent(slug)}.json`);
  return product ? { status: "ready" as const, product, currency: current.store.currency } : { status: "unavailable" as const, product: null, currency: current.store.currency };
}

export function priceLabel(product: StoreProduct, currency: string) {
  if (product.price_display === "hide") return null;
  if (product.price_display === "enquiry") return "Price on request";
  const prices = product.variants.map((variant) => variant.price).filter((price): price is number => price !== null);
  if (!prices.length) return "Contact us for pricing";
  return prices.length > 1
    ? `From ${new Intl.NumberFormat("en-IE", { style: "currency", currency }).format(Math.min(...prices) / 100)}`
    : new Intl.NumberFormat("en-IE", { style: "currency", currency }).format(prices[0] / 100);
}

function safeEqual(left: string, right: string) {
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function handleStoreRevalidation(request: Request) {
  const secret = process.env.INGENIUM_COMMERCE_REVALIDATION_SECRET || "";
  const serverCredential = process.env.INGENIUM_COMMERCE_SERVER_CREDENTIAL || "";
  if (!publicKey || !secret || !serverCredential) return new Response("Store connection is not configured", { status: 503 });
  const reader = request.body?.getReader();
  if (!reader) return new Response("Body required", { status: 400 });
  const chunks: Uint8Array[] = [];
  let byteLength = 0;
  for (;;) {
    const { value, done } = await reader.read();
    if (done) break;
    byteLength += value.byteLength;
    if (byteLength > 128_000) {
      await reader.cancel();
      return new Response("Payload too large", { status: 413 });
    }
    chunks.push(value);
  }
  const text = Buffer.concat(chunks).toString("utf8");
  const timestamp = request.headers.get("x-ingenium-timestamp") || "";
  const signature = request.headers.get("x-ingenium-signature") || "";
  const expected = createHmac("sha256", secret).update(`${timestamp}.${text}`).digest("hex");
  if (!/^\d+$/.test(timestamp) || Math.abs(Date.now() - Number(timestamp)) > 300_000 || !safeEqual(signature, expected)) {
    return new Response("Invalid signature", { status: 401 });
  }
  let event: { nonce?: unknown; revision?: unknown; site_key?: unknown; full_refresh?: unknown; paths?: unknown };
  try { event = JSON.parse(text); } catch { return new Response("Invalid JSON", { status: 400 }); }
  if (event.site_key !== publicKey || typeof event.nonce !== "string" || !Number.isSafeInteger(event.revision) || !Array.isArray(event.paths) || event.paths.length > 203 || event.paths.some((path) => typeof path !== "string" || !/^\/(?!\/)[^\\]*$/.test(path))) {
    return new Response("Invalid publication", { status: 400 });
  }
  const bypass = process.env.VERCEL_AUTOMATION_BYPASS_SECRET;
  const receiptResponse = await fetch(`${portalOrigin}/api/storefront/v1/revalidation-receipts`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${serverCredential}`,
      "Content-Type": "application/json",
      ...(bypass ? { "x-vercel-protection-bypass": bypass } : {}),
    },
    body: JSON.stringify({ nonce: event.nonce, revision: event.revision }),
    cache: "no-store",
    signal: AbortSignal.timeout(10_000),
  });
  const receipt = await receiptResponse.json().catch(() => null) as { accepted?: boolean } | null;
  if (!receiptResponse.ok || !receipt?.accepted) return new Response("Duplicate or superseded publication", { status: 409 });
  revalidateTag(cacheTag, { expire: 0 });
  if (event.full_refresh === true) revalidatePath("/", "layout");
  for (const path of event.paths) revalidatePath(path as string);
  return Response.json({ site_key: publicKey, revision: event.revision }, { headers: { "Cache-Control": "no-store" } });
}

export function storeSiteKey() { return publicKey; }
