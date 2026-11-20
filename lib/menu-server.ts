import { unstable_cache } from "next/cache";
import { menuCategories, type MenuCategory } from "./menu";
import { fetchMenuFromFirestore } from "./menu-firestore";

/**
 * Server-only menu source. Reads from the shared Firestore when a Firebase
 * credential is configured (lib/firebase-admin.ts), otherwise returns the
 * bundled static menu. This module (and its firebase-admin dependency) must
 * only be imported from Server Components / route handlers — never from a
 * client component. Client code imports the static data from "@/lib/menu".
 *
 * The Firestore fetch is wrapped in `unstable_cache` so the ENTIRE site shares
 * a single read result, refreshed at most once every 30 minutes — regardless of
 * traffic or how many menu pages render. Without this, every page re-read the
 * whole collection every few minutes and blew Firestore's free daily read quota
 * (which made both the site's menu reads and the Toast sync fail with
 * "Quota exceeded"). The Toast sync writes at most every 2 hours, so a 30-minute
 * cache keeps the menu plenty fresh while staying far under quota.
 */
const getCachedMenu = unstable_cache(
  async (): Promise<MenuCategory[]> =>
    (await fetchMenuFromFirestore()) ?? menuCategories,
  ["chillville-menu-v1"],
  { revalidate: 1800, tags: ["menu"] }
);

export async function getMenu(): Promise<MenuCategory[]> {
  return getCachedMenu();
}

export async function getCategoryAsync(slug: string): Promise<MenuCategory | undefined> {
  return (await getMenu()).find((c) => c.slug === slug);
}
