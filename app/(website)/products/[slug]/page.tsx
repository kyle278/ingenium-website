import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, PackageSearch } from "lucide-react";
import { getStoreProduct, priceLabel } from "@/lib/commerce/storefront";
import { SITE_URL } from "@/lib/seo";

export const revalidate = 300;
export const dynamicParams = true;

type ProductPageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const result = await getStoreProduct(slug);
  if (result.status !== "ready" || !result.product) return { title: "Ingenium Store | Product" };
  const product = result.product;
  return {
    title: product.seo_title || `${product.title} | Ingenium Store`,
    description: product.seo_description || product.summary || `Explore ${product.title} from Ingenium.`,
    alternates: { canonical: `${SITE_URL}/products/${product.slug}` },
    openGraph: { title: product.seo_title || product.title, description: product.seo_description || product.summary, images: product.images[0]?.url ? [product.images[0].url] : [] },
  };
}

export default async function StoreProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const result = await getStoreProduct(slug);
  if (result.status === "missing") notFound();

  if (result.status !== "ready" || !result.product) {
    return (
      <section className="mineral-panel mx-auto max-w-3xl rounded-[28px] p-8 text-center">
        <PackageSearch className="mx-auto h-8 w-8 text-[var(--color-brand)]" aria-hidden="true" />
        <h1 className="mt-4 type-card-title text-[var(--color-text)]">This product is temporarily unavailable</h1>
        <p className="mt-3 type-body-sm text-[var(--color-text-soft)]">Return to the catalogue or contact us for help.</p>
        <Link href="/products" className="mt-6 inline-flex items-center gap-2 type-action text-[var(--color-brand)]"><ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to store</Link>
      </section>
    );
  }

  const product = result.product;
  const images = product.images;
  const currency = result.currency || "EUR";
  const contactHref = `/contact?product=${encodeURIComponent(product.title)}&source=store`;

  return (
    <div className="space-y-12 pb-10">
      <Link href="/products" className="inline-flex items-center gap-2 type-action text-[var(--color-text-soft)] transition hover:text-[var(--color-brand)]"><ArrowLeft className="h-4 w-4" aria-hidden="true" /> All products</Link>
      <article className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(300px,0.85fr)] lg:items-start">
        <div className="space-y-4">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[32px] border border-[var(--color-line)] bg-[var(--color-panel-low)] shadow-[0_20px_54px_rgba(20,36,61,0.08)]">
            {images[0] ? <Image src={images[0].variants.detail || images[0].url} alt={images[0].alt} fill unoptimized priority sizes="(max-width: 1023px) 100vw, 60vw" className="object-cover" /> : <div className="flex h-full items-center justify-center text-sm text-[var(--color-text-muted)]">Product image coming soon</div>}
          </div>
          {images.length > 1 ? <div className="grid grid-cols-3 gap-3">{images.slice(1, 4).map((image) => <div key={image.id} className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[var(--color-line)] bg-[var(--color-panel-low)]"><Image src={image.variants.card || image.url} alt={image.alt} fill unoptimized sizes="(max-width: 639px) 33vw, 20vw" className="object-cover" /></div>)}</div> : null}
        </div>
        <div className="mineral-panel rounded-[32px] p-7 sm:p-9 lg:sticky lg:top-36">
          <p className="type-page-kicker text-[var(--color-secondary)]">Ingenium Store</p>
          <h1 className="mt-4 type-page-title text-[var(--color-text)]">{product.title}</h1>
          {product.summary ? <p className="mt-5 type-body-lead text-[var(--color-text-soft)]">{product.summary}</p> : null}
          <p className="mt-6 text-xl font-semibold tracking-tight text-[var(--color-brand)]">{priceLabel(product, currency) ?? "Contact us for details"}</p>
          <Link href={contactHref} className="cta-lift mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[linear-gradient(135deg,var(--color-brand),var(--color-brand-strong))] px-5 py-3 type-action text-white shadow-[0_12px_28px_rgba(20,36,61,0.12)]">
            Ask us about this product <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <p className="mt-3 text-center type-body-xs text-[var(--color-text-muted)]">Catalogue enquiries are handled by the Ingenium team.</p>
          {product.description ? <div className="mt-9 border-t border-[var(--color-line)] pt-7"><h2 className="type-card-title-sm text-[var(--color-text)]">Details</h2><div className="mt-3 whitespace-pre-line type-body-sm text-[var(--color-text-soft)]">{product.description}</div></div> : null}
          {Object.keys(product.attributes).length > 0 ? <dl className="mt-7 grid gap-3 border-t border-[var(--color-line)] pt-6 sm:grid-cols-2">{Object.entries(product.attributes).map(([label, value]) => <div key={label} className="rounded-xl bg-white/75 p-3"><dt className="type-detail-kicker text-[var(--color-text-muted)]">{label}</dt><dd className="mt-1 type-body-sm font-medium text-[var(--color-text)]">{value}</dd></div>)}</dl> : null}
        </div>
      </article>
    </div>
  );
}
