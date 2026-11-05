import { menuCategories, type MenuCategory } from "./menu";
import { fetchMenuFromFirestore } from "./menu-firestore";

/**
 * Server-only menu source. Reads from the shared Firestore when a Firebase
 * credential is configured (lib/firebase-admin.ts), otherwise returns the
 * bundled static menu. This module (and its firebase-admin dependency) must
 * only be imported from Server Components / route handlers — never from a
 * client component. Client code imports the static data from "@/lib/menu".
 */
export async function getMenu(): Promise<MenuCategory[]> {
  return (await fetchMenuFromFirestore()) ?? menuCategories;
}

export async function getCategoryAsync(slug: string): Promise<MenuCategory | undefined> {
  return (await getMenu()).find((c) => c.slug === slug);
}
