/**
 * Menu categories — the single source of truth for the MENU dropdown and the
 * `/menu/[category]` pages.
 *
 * Product NAMES are taken verbatim from the client's Excel
 * ("Menu List for Website & App.xlsx") and are the only real data we have.
 * The Excel has no prices, descriptions or ingredients, so the pages show the
 * name plus a placeholder ingredients line and a placeholder image; real
 * ingredients/photos will be supplied later. Prices are intentionally omitted.
 */

export type MenuProduct = {
  name: string; // exact product name from the Excel
  subCategory?: string; // real Excel sub-group (e.g. "Milk Teas"), when present
};

export type MenuCategory = {
  slug: string;
  name: string; // label used in the dropdown and as the page title
  accent: string; // warm accent used for the dot / placeholder tint (styling only)
  products: MenuProduct[];
};

export const menuCategories: MenuCategory[] = [
  {
    slug: "boba",
    name: "Boba",
    accent: "#c9a26b",
    products: [
      { name: "Royal Milk Tea", subCategory: "Milk Teas" },
      { name: "Jasmine Green Tea", subCategory: "Milk Teas" },
      { name: "Osmanthus Oolong", subCategory: "Milk Teas" },
      { name: "Brown Sugar Boba", subCategory: "Milk Teas" },
      { name: "Taro Milk Tea", subCategory: "Milk Teas" },
      { name: "cookies and cream milk Tea", subCategory: "Milk Teas" },
      { name: "Black sesame milk Tea", subCategory: "Milk Teas" },
      { name: "Badam milk Tea", subCategory: "Milk Teas" },
      { name: "Blue Pea Butterfly Tea", subCategory: "Milk Teas" },
      { name: "Fruit Flavored juice", subCategory: "Fruit Teas" },
      { name: "Fruit flavored Tea", subCategory: "Fruit Teas" },
      { name: "Tropical Fruit Tea", subCategory: "Fruit Teas" },
      { name: "Strawberry Fruit Tea", subCategory: "Fruit Teas" },
      { name: "Mango Fruit Tea", subCategory: "Fruit Teas" },
      { name: "Pineapple Fruit Tea", subCategory: "Fruit Teas" },
      { name: "Matcha Latte", subCategory: "Matcha Varieties" },
      { name: "Double Matcha Cloud", subCategory: "Matcha Varieties" },
      { name: "Strawberry Matcha Latte", subCategory: "Matcha Varieties" },
      { name: "Matcha Cheese Latte", subCategory: "Matcha Varieties" },
      { name: "Matcha Red Bean Smoothie", subCategory: "Matcha Varieties" },
      { name: "Coconut Matcha Cloud", subCategory: "Matcha Varieties" },
      { name: "Mango Coco Pomelo", subCategory: "Pomelo Sago" },
      { name: "Strawberry Kiwi Sago", subCategory: "Pomelo Sago" },
      { name: "Berry Slush", subCategory: "Slushies" },
      { name: "Tropical Slush", subCategory: "Slushies" },
      { name: "Watermelon Slush", subCategory: "Slushies" },
    ],
  },
  {
    slug: "cookies",
    name: "Cookies",
    accent: "#a4713f",
    products: [
      { name: "Classic Chocolate Chip", subCategory: "Regular" },
      { name: "Pistachio Delight", subCategory: "Regular" },
      { name: "Cookies & Cream", subCategory: "Regular" },
      { name: "Rainbow Sprinkle", subCategory: "Regular" },
      { name: "Red Velvet", subCategory: "Regular" },
      { name: "M & M", subCategory: "Regular" },
      { name: "ChillVille Walnut Luxe", subCategory: "ChillVille Royale" },
      { name: "Nutella Lava Burst", subCategory: "ChillVille Royale" },
      { name: "Biscoff Lava Bliss", subCategory: "ChillVille Royale" },
      { name: "Dubai Chocolate", subCategory: "ChillVille Royale" },
      { name: "Oreo Cream Bliss", subCategory: "ChillVille Royale" },
      { name: "Red Velvet Cream Bliss", subCategory: "ChillVille Royale" },
    ],
  },
  {
    slug: "donuts",
    name: "Donuts",
    accent: "#d9b486",
    products: [
      { name: "Classic" },
      { name: "Rainbow Sprinkles" },
      { name: "Coconut Flakes" },
      { name: "M & M" },
      { name: "Oreo" },
      { name: "Marshmallow" },
      { name: "S'mores" },
      { name: "Pretzel" },
      { name: "Birthday cake" },
      { name: "Strawberry Short cake" },
      { name: "Blueberry Glaze" },
      { name: "Cherry Glaze" },
      { name: "Gummy bears" },
      { name: "Cinammon Sugar" },
    ],
  },
  {
    // Empty in the Excel — kept as a category per the client's list.
    // Products / photos to be supplied later.
    slug: "ice-creams",
    name: "Ice Creams",
    accent: "#cbb892",
    products: [],
  },
  {
    slug: "ice-cream-shakes",
    name: "Ice Cream Shakes",
    accent: "#c58f6a",
    products: [
      { name: "Classic Vanilla Bean" },
      { name: "Ultimate Chocolate Fudge" },
      { name: "Cookies & Cream Dream" },
      { name: "Nutella Hazelnut" },
      { name: "Lotus Biscoff" },
      { name: "Strawberry Cheesecake" },
      { name: "Brownie Explosion" },
      { name: "Peanut Butter Cup" },
      { name: "Salted Caramel Pretzel" },
      { name: "Mint Cookies" },
      { name: "Dubai Chocolate Pistachio" },
      { name: "ChillVille Cookie Monster" },
    ],
  },
  {
    slug: "muffins",
    name: "Muffins",
    accent: "#c7a978",
    products: [
      { name: "Nutella Muffin" },
      { name: "Triple Chocolate Muffin" },
      { name: "Brown Butter Chocochip Muffin" },
      { name: "Blueberry CreamCheese Muffin" },
      { name: "Lemon Poppyseed Muffin" },
    ],
  },
];

/**
 * "Chillville Favorites" — one signature pick per non-empty category, shown as
 * a highlighted band above the six categories in the dropdown. Names are real
 * Excel items; Boba's pick ("Matcha Cheese Latte") was specified by the client,
 * the rest are the branded / signature items and can be swapped on request.
 * Ice Creams has no items yet, so it has no favorite.
 */
export type MenuFavorite = {
  name: string; // real Excel product name
  note: string; // which category it belongs to
  slug: string; // category page it links to
};

export const menuFavorites: MenuFavorite[] = [
  { name: "Matcha Cheese Latte", note: "Boba", slug: "boba" },
  { name: "ChillVille Walnut Luxe", note: "Cookies", slug: "cookies" },
  { name: "S'mores", note: "Donuts", slug: "donuts" },
  { name: "ChillVille Cookie Monster", note: "Ice Cream Shakes", slug: "ice-cream-shakes" },
  { name: "Triple Chocolate Muffin", note: "Muffins", slug: "muffins" },
];

export function getCategory(slug: string): MenuCategory | undefined {
  return menuCategories.find((c) => c.slug === slug);
}
