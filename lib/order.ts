/**
 * Orderable catalog for the no-payment pickup flow (`/order`).
 *
 * Derived from `lib/menu.ts` (the single source of truth for products). We take
 * NAMES only — the menu intentionally carries no prices, and for a pay-at-pickup
 * order none are needed: the guest picks items, Toast holds the prices, and the
 * store rings up the itemised list at pickup.
 *
 * Some drinks also carry CUSTOMIZATION modifiers (sugar / ice / boba / milk).
 * When an item has `modifiers`, the order UI asks the guest to choose before
 * adding it to the cart, and the choices ride along on the emailed ticket.
 */

import { menuCategories } from "@/lib/menu";

export type ModifierGroup = {
  id: string; // stable key used in selections and on the ticket
  label: string; // shown as the question heading, e.g. "Sugar level"
  options: string[]; // choices, shown in this order
  default?: string; // pre-selected choice; falls back to options[0]
};

export type OrderItem = {
  id: string; // stable, unique: "<catSlug>:<name-slug>"
  name: string;
  category: string; // human label, e.g. "Ice Cream Shakes"
  image?: string;
  modifiers?: ModifierGroup[]; // customization questions, when the item takes them
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

/* ---------- Customization option sets ---------- */

const SUGAR: ModifierGroup = {
  id: "sugar",
  label: "Sugar level",
  options: ["0%", "25%", "50%", "75%", "100%"],
  default: "100%",
};
const ICE: ModifierGroup = {
  id: "ice",
  label: "Ice level",
  options: ["Regular", "Less"],
};
const BOBA: ModifierGroup = {
  id: "boba",
  label: "Boba",
  options: ["Regular Tapioca Boba", "White Crystal Boba", "Brown Crystal Boba"],
};
const MILK: ModifierGroup = {
  id: "milk",
  label: "Milk",
  options: ["Regular Whole Milk", "Almond Milk", "Oat Milk"],
};

/**
 * Which drinks get a customization flow, keyed by category slug + sub-category.
 * Boba Milk Teas ask sugar → ice → boba → milk. Matcha and Fruit Teas can be
 * added here later with their own option sets.
 */
function modifiersFor(slug: string, subCategory?: string): ModifierGroup[] | undefined {
  if (slug === "boba" && subCategory === "Milk Teas") {
    return [SUGAR, ICE, BOBA, MILK];
  }
  return undefined;
}

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
      modifiers: modifiersFor(c.slug, p.subCategory),
    })),
  }));

/** Server-trusted lookup so the API never relies on client-supplied names. */
export const orderItemsById: Record<string, OrderItem> = Object.fromEntries(
  orderCategories.flatMap((c) => c.items.map((i) => [i.id, i])),
);
