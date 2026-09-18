import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, PackageSearch } from "lucide-react";
import { buildMetadata, pageSeo } from "@/lib/seo";
import { getStoreCatalogue, priceLabel } from "@/lib/commerce/storefront";

export const revalidate = 300;
export const metadata: Metadata = buildMetadata(pageSeo["/products"]);

type ProductsPageProps = { searchParams: Promise<{ category?: string }> };

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const [{ category: selectedCategory }, catalogue] = await Promise.all([searchParams, getStoreCatalogue()]);
  const category = catalogue.categories.find((item) => item.slug === selectedCategory);
  const products = catalogue.status === "ready"
    ? catalogue.products.filter((product) => !category || product.category_ids.includes(category.id))
    : [];

  return (
    <div className="space-y-14 pb-10">
      <section className="relative overflow-hidden rounded-[36px] border border-[var(--color-line)] bg-[linear-gradient(135deg,rgba(20,36,61,0.98),rgba(23,103,195,0.94))] px-6 py-12 text-white shadow-[0_24px_70px_rgba(20,36,61,0.16)] sm:px-10 md:py-16">
        <div className="absolute -right-12 -top-16 h-72 w-72 rounded-full bg-[rgba(19,183,168,0.24)] blur-[90px]" />
        <div className="relative max-w-3xl">
          <p className="type-page-kicker text-[rgba(220,236,255,0.8)]">Ingenium Store</p>
          <h1 className="mt-4 type-page-title text-white">Tools for building a more connected business.</h1>
          <p className="mt-5 max-w-[62ch] type-body-lead text-[rgba(233,241,252,0.82)]">
            A live catalogue managed through Ingenium Portal. Product details and images are published from the same workspace used to run the store.
          </p>
          {catalogue.status === "ready" ? (
            <p className="mt-5 type-detail-kicker text-[rgba(220,236,255,0.72)]">Catalogue revision {catalogue.revision} · {catalogue.products.length} published {catalogue.products.length === 1 ? "item" : "items"}</p>
          ) : null}
        </div>
      </section>

      {catalogue.status === "unconfigured" ? (
        <section className="mineral-panel rounded-[28px] p-8 text-center">
          <PackageSearch className="mx-auto h-8 w-8 text-[var(--color-brand)]" aria-hidden="true" />
          <h2 className="mt-4 type-card-title text-[var(--color-text)]">The Portal catalogue is being connected</h2>
          <p className="mx-auto mt-3 max-w-[60ch] type-body-sm text-[var(--color-text-soft)]">This store will display products published from Ingenium Portal as soon as the site connection is configured.</p>
        </section>
      ) : catalogue.status === "unavailable" ? (
        <section className="mineral-panel rounded-[28px] p-8 text-center">
          <h2 className="type-card-title text-[var(--color-text)]">The catalogue is temporarily unavailable</h2>
          <p className="mt-3 type-body-sm text-[var(--color-text-soft)]">Please check back shortly or contact our team for product information.</p>
        </section>
      ) : products.length === 0 ? (
        <section className="mineral-panel rounded-[28px] p-8 text-center">
          <PackageSearch className="mx-auto h-8 w-8 text-[var(--color-brand)]" aria-hidden="true" />
          <h2 className="mt-4 type-card-title text-[var(--color-text)]">{category ? `No ${category.title.toLowerCase()} are published yet` : "Products are being added"}</h2>
          <p className="mx-auto mt-3 max-w-[60ch] type-body-sm text-[var(--color-text-soft)]">New products and product changes appear here after they are published in the Portal.</p>
        </section>
      ) : (
        <section className="space-y-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="type-section-kicker text-[var(--color-secondary)]">Published catalogue</p>
              <h2 className="mt-2 type-section-title text-[var(--color-text)]">{category?.title ?? "Explore the collection"}</h2>
            </div>
            <p className="type-body-sm text-[var(--color-text-muted)]">{products.length} {products.length === 1 ? "product" : "products"}</p>
          </div>
          {catalogue.categories.length > 0 ? (
            <nav aria-label="Filter products by category" className="flex flex-wrap gap-2">
              <Link href="/products" className={`rounded-full border px-4 py-2 type-action ${!category ? "border-[var(--color-brand)] bg-[var(--color-brand)] text-white" : "border-[var(--color-line)] bg-white text-[var(--color-text-soft)] hover:border-[var(--color-brand)]"}`}>All products</Link>
              {catalogue.categories.map((item) => (
                <Link key={item.id} href={`/products?category=${encodeURIComponent(item.slug)}`} className={`rounded-full border px-4 py-2 type-action ${category?.id === item.id ? "border-[var(--color-brand)] bg-[var(--color-brand)] text-white" : "border-[var(--color-line)] bg-white text-[var(--color-text-soft)] hover:border-[var(--color-brand)]"}`}>{item.title}</Link>
              ))}
            </nav>
          ) : null}
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => {
              const image = product.images[0];
              return (
                <article key={product.id} className="group overflow-hidden rounded-[28px] border border-[var(--color-line)] bg-[rgba(255,255,255,0.88)] shadow-[0_12px_36px_rgba(20,36,61,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_52px_rgba(20,36,61,0.12)]">
                  <Link href={`/products/${product.slug}`} className="block focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[var(--color-brand)]">
                    <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-panel-low)]">
                      {image ? <Image src={image.variants.card || image.url} alt={image.alt} fill unoptimized sizes="(max-width: 639px) 100vw, (max-width: 1279px) 50vw, 33vw" className="object-cover transition duration-700 group-hover:scale-[1.035]" /> : <div className="flex h-full items-center justify-center text-sm text-[var(--color-text-muted)]">Image coming soon</div>}
                      {product.featured ? <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 type-detail-kicker text-[var(--color-brand)] shadow-sm">Featured</span> : null}
                    </div>
                    <div className="space-y-3 p-5">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="type-card-title-sm text-[var(--color-text)]">{product.title}</h3>
                        <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-[var(--color-brand)] transition group-hover:translate-x-1" aria-hidden="true" />
                      </div>
                      {product.summary ? <p className="line-clamp-3 type-body-sm text-[var(--color-text-soft)]">{product.summary}</p> : null}
                      {catalogue.currency ? <p className="type-action text-[var(--color-brand)]">{priceLabel(product, catalogue.currency)}</p> : null}
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
