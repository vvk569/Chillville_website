import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { menuCategories, getCategory, type MenuProduct } from "@/lib/menu";

type Params = { category: string };

/** Pre-render all six category routes at build time. */
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
    description: `Chillville ${cat.name} menu.`,
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

  // Group products by their Excel sub-section, preserving order. Categories
  // without sub-sections collapse into a single unlabelled group.
  const groupBySub = (items: MenuProduct[]) => {
    const groups: { sub?: string; items: MenuProduct[] }[] = [];
    for (const p of items) {
      const last = groups[groups.length - 1];
      if (last && last.sub === p.subCategory) last.items.push(p);
      else groups.push({ sub: p.subCategory, items: [p] });
    }
    return groups;
  };

  // Split into items that already have a final menu photo (top) and the rest
  // (below a divider). Only Boba flags `matched` today, so every other category
  // keeps a single group and shows no divider.
  const matchedGroups = groupBySub(cat.products.filter((p) => p.matched));
  const unmatchedGroups = groupBySub(cat.products.filter((p) => !p.matched));
  const showDivider = matchedGroups.length > 0 && unmatchedGroups.length > 0;

  const renderGroups = (
    gs: { sub?: string; items: MenuProduct[] }[],
    keyPrefix: string,
  ) =>
    gs.map((group, gi) => (
      <section key={`${keyPrefix}-${group.sub ?? gi}`}>
        {group.sub && (
          // Prominent, premium section headings (Boba, Cookies, …).
          <div className="mb-7">
            <h2 className="font-display text-lg font-semibold uppercase tracking-wide2 text-caramel sm:text-xl">
              {group.sub}
            </h2>
            <span
              aria-hidden
              className="mt-2.5 block h-0.5 w-10 rounded-full bg-caramel/50"
            />
          </div>
        )}
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {group.items.map((p) => (
            <li key={p.image ?? p.name}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-cream/10 bg-cream/[0.02] p-3 transition-colors duration-500 hover:border-caramel/30">
                {/* Product image (falls back to a placeholder) */}
                <div
                  className={`relative flex items-center justify-center overflow-hidden rounded-xl border border-cream/10 ${
                    p.fit === "contain" ? "aspect-[16/9]" : "aspect-[4/3]"
                  }`}
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${cat.accent}22, transparent 60%), radial-gradient(120% 80% at 50% 0%, ${cat.accent}18, transparent 70%)`,
                  }}
                >
                  {p.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      className={`absolute inset-0 h-full w-full ${
                        p.fit === "contain" ? "object-contain p-2" : "object-cover"
                      }`}
                    />
                  ) : (
                    <span className="font-display text-[11px] uppercase tracking-luxe text-cream/35">
                      Photo coming soon
                    </span>
                  )}
                </div>

                {/* Details */}
                <div className="flex flex-1 flex-col px-1 pt-4">
                  <h2 className="font-display text-lg text-cream">{p.name}</h2>
                  <p className="mt-auto pt-4 text-[11px] uppercase tracking-wide2 text-cream/35">
                    Ingredients coming soon
                  </p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </section>
    ));

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
          Our Menu
        </span>
        <h1 className="mt-3 font-display text-4xl font-extrabold leading-[1.05] text-cream sm:text-6xl">
          {cat.name}
        </h1>
      </header>

      {cat.products.length === 0 ? (
        // Empty category — no items in the source yet.
        <div className="mt-14 rounded-2xl border border-cream/10 bg-cream/[0.02] px-6 py-20 text-center">
          <p className="font-display text-xl text-cream/70">Menu coming soon</p>
          <p className="mt-2 text-sm text-cream/40">
            We&rsquo;re still plating this one. Check back shortly.
          </p>
        </div>
      ) : (
        /* Products grouped by their Excel sub-section */
        <div className="mt-14 space-y-16">
          {renderGroups(matchedGroups, "matched")}

          {showDivider && (
            // Small divider between photographed items and the rest.
            <hr
              aria-hidden
              className="mx-auto h-px w-24 border-0 bg-cream/15"
            />
          )}

          {renderGroups(unmatchedGroups, "unmatched")}
        </div>
      )}
    </div>
  );
}
