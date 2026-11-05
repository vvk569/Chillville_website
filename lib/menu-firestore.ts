import { getDb } from "./firebase-admin";
import { menuCategories as staticCategories, type MenuCategory, type MenuProduct } from "./menu";

/**
 * Reads the menu from the shared Firestore (the same `menuItems` / `categories`
 * the app uses), and adapts the canonical docs into the website's MenuCategory
 * shape. Returns `null` when Firestore isn't configured or has no data, so
 * callers fall back to the bundled static menu.
 *
 * Point at the staging copy during the transition with
 * `MENU_COLLECTION_SUFFIX=_v2`; leave unset to read the live collections.
 * Images are resolved from the bundled site photos by name until they're
 * centralised in Firebase Storage.
 */
const SUFFIX = process.env.MENU_COLLECTION_SUFFIX ?? "";

// name → local site image, from the current bundled menu (keyed per category).
const imageByKey = new Map<string, string>();
for (const c of staticCategories) {
  for (const p of c.products) {
    if (p.image) imageByKey.set(`${c.slug}|${p.name}`, p.image);
  }
}

type ItemDoc = {
  categorySlug?: string;
  name?: string;
  subcategory?: string | null;
  description?: string;
  priceInCents?: number;
  imageUrl?: string;
  isAvailable?: boolean;
  sortOrder?: number;
};
type CatDoc = { slug?: string; name?: string; accent?: string; order?: number; active?: boolean };

export async function fetchMenuFromFirestore(): Promise<MenuCategory[] | null> {
  const db = getDb();
  if (!db) return null;
  try {
    const [catsSnap, itemsSnap] = await Promise.all([
      db.collection(`categories${SUFFIX}`).get(),
      db.collection(`menuItems${SUFFIX}`).get(),
    ]);
    if (catsSnap.empty || itemsSnap.empty) return null;

    const cats = (catsSnap.docs.map((d) => d.data() as CatDoc))
      .filter((c) => c.active !== false)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

    const items = (itemsSnap.docs.map((d) => d.data() as ItemDoc))
      .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));

    const byCat = new Map<string, MenuProduct[]>();
    for (const it of items) {
      if (it.isAvailable === false || !it.categorySlug || !it.name) continue;
      const slug = it.categorySlug;
      const product: MenuProduct = {
        name: it.name,
        subCategory: it.subcategory ?? undefined,
        image: imageByKey.get(`${slug}|${it.name}`) ?? (it.imageUrl || undefined),
        ingredients: it.description || undefined,
        price: typeof it.priceInCents === "number" && it.priceInCents > 0 ? it.priceInCents / 100 : undefined,
      };
      (byCat.get(slug) ?? byCat.set(slug, []).get(slug)!).push(product);
    }

    const result = cats
      .filter((c): c is CatDoc & { slug: string } => Boolean(c.slug))
      .map((c) => ({
        slug: c.slug,
        name: c.name ?? c.slug,
        accent: c.accent ?? "#c9a26b",
        products: byCat.get(c.slug) ?? [],
      }))
      .filter((c) => c.products.length > 0);

    return result.length ? result : null;
  } catch (e) {
    console.error("Firestore menu read failed; falling back to static menu:", e);
    return null;
  }
}
