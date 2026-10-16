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
  prices?: Record<string, number>; // optional add-on price (USD) per option
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
  options: ["No Boba", "Regular Tapioca Boba", "White Crystal Boba", "Brown Crystal Boba"],
  default: "Regular Tapioca Boba",
  prices: {
    "Regular Tapioca Boba": 0.89,
    "White Crystal Boba": 0.99,
    "Brown Crystal Boba": 0.99,
  },
};
const MILK: ModifierGroup = {
  id: "milk",
  label: "Milk",
  options: ["Regular Whole Milk", "Almond Milk", "Oat Milk"],
};
// Cloud/foam is an optional add-on — "No Foam/Cloud" is the default; each foam is $1.19.
const CLOUD: ModifierGroup = {
  id: "cloud",
  label: "Cloud / Foam (optional)",
  options: ["No Foam/Cloud", "Cheese Foam/Cloud", "Matcha Cheese Foam/Cloud", "Non-Dairy Foam/Cloud"],
  default: "No Foam/Cloud",
  prices: {
    "Cheese Foam/Cloud": 1.19,
    "Matcha Cheese Foam/Cloud": 1.19,
    "Non-Dairy Foam/Cloud": 1.19,
  },
};
// Fruit Teas: boba is a paid add-on only — defaults to no boba.
const FRUIT_BOBA: ModifierGroup = {
  id: "boba",
  label: "Boba",
  options: [
    "No Boba",
    "Mango Popping Boba",
    "Strawberry Popping Boba",
    "Passion Fruit Popping Boba",
    "Peach Popping Boba",
    "Lychee Popping Boba",
    "Regular Tapioca Boba",
  ],
  prices: {
    "Mango Popping Boba": 1.19,
    "Strawberry Popping Boba": 1.19,
    "Passion Fruit Popping Boba": 1.19,
    "Peach Popping Boba": 1.19,
    "Lychee Popping Boba": 1.19,
    "Regular Tapioca Boba": 0.89,
  },
  default: "No Boba",
};

/**
 * Which drinks get a customization flow, keyed by category slug + sub-category.
 * Boba Milk Teas ask sugar → ice → boba → milk; Matcha Mood adds a cloud/foam
 * question; Fruit Teas ask only for a (paid) boba add-on.
 */
function modifiersFor(slug: string, subCategory?: string): ModifierGroup[] | undefined {
  if (slug !== "boba") return undefined;
  if (subCategory === "Milk Teas") return [SUGAR, ICE, BOBA, MILK];
  if (subCategory === "Matcha Varieties") return [SUGAR, ICE, BOBA, MILK, CLOUD];
  if (subCategory === "Fruit Teas") return [FRUIT_BOBA];
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
