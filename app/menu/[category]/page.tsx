import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { menuCategories, getCategory } from "@/lib/menu";

type Params = { category: string };

/** Pre-render all seven category routes at build time. */
export function generateStaticParams(): Params[] {
  return menuCategories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) return { title: "Menu" };
  return {
    title: cat.name,
    description: cat.blurb,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) notFound();

  return (
    <div className="mx-auto max-w-content px-6 pb-28 pt-32 sm:px-10 sm:pt-40">
      {/* Breadcrumb / back to home */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-[11px] uppercase tracking-wide2 text-cream/50 transition-colors hover:text-caramel"
      >
        <span aria-hidden>&larr;</span> Back to Chillville
      </Link>

      {/* Category title */}
      <header className="mt-8 max-w-2xl">
        <span className="text-[11px] uppercase tracking-luxe text-caramel">
          {cat.eyebrow}
        </span>
        <h1 className="mt-3 font-display text-4xl font-extrabold leading-[1.05] text-cream sm:text-6xl">
          {cat.name}
        </h1>
        <p className="mt-4 text-base text-cream/60 sm:text-lg">{cat.blurb}</p>
      </header>

      {/* Product grid */}
      <ul className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cat.products.map((p) => (
          <li key={p.name}>
            <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-cream/10 bg-cream/[0.02] p-3 transition-colors duration-500 hover:border-caramel/30">
              {/* Image placeholder */}
              <div
                className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-xl border border-cream/10"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${cat.accent}22, transparent 60%), radial-gradient(120% 80% at 50% 0%, ${cat.accent}18, transparent 70%)`,
                }}
              >
                <span className="font-display text-[11px] uppercase tracking-luxe text-cream/35">
                  Photo coming soon
                </span>
              </div>

              {/* Details */}
              <div className="flex flex-1 flex-col px-1 pt-4">
                <div className="flex items-baseline justify-between gap-3">
                  <h2 className="font-display text-lg text-cream">{p.name}</h2>
                  <span className="shrink-0 font-medium text-caramel">${p.price}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-cream/60">
                  {p.description}
                </p>
                <p className="mt-auto pt-4 text-[11px] uppercase tracking-wide2 text-cream/35">
                  {p.ingredients}
                </p>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
