/**
 * Orderable catalog for the no-payment pickup flow (`/order`).
 *
 * Derived from `lib/menu.ts` (the single source of truth for products). We take
 * NAMES only — the menu intentionally carries no prices, and for a pay-at-pickup
 * order none are needed: the guest picks items, Toast holds the prices, and the
 * store rings up the itemised list at pickup. Add prices here later (Phase 2)
 * when online payment is enabled.
 */

import { menuCategories } from "@/lib/menu";

export type OrderItem = {
  id: string; // stable, unique: "<catSlug>:<name-slug>"
  name: string;
  category: string; // human label, e.g. "Ice Cream Shakes"
  image?: string;
};

export type OrderCategory = {
  slug: string;
  name: string;
  accent: string;
  items: OrderItem[];
};

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const orderCategories: OrderCategory[] = menuCategories
  .filter((c) => c.products.length > 0)
  .map((c) => ({
    slug: c.slug,
    name: c.name,
    accent: c.accent,
    items: c.products.map((p) => ({
      id: `${c.slug}:${slugify(p.name)}`,
      name: p.name,
      category: c.name,
      image: p.image,
    })),
  }));

/** Server-trusted lookup so the API never relies on client-supplied names. */
export const orderItemsById: Record<string, OrderItem> = Object.fromEntries(
  orderCategories.flatMap((c) => c.items.map((i) => [i.id, i])),
);
