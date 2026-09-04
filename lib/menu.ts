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
  image?: string; // path under /public to an existing product photo, when available
  matched?: boolean; // true = has a final menu photo; rendered in the top group above the divider
  fit?: "cover" | "contain"; // image fit inside the card; defaults to "cover". "contain" shows the whole image (letterboxed)
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
      // --- Matched: items with final menu photos (public/menu pics/Boba). ---
      { name: "Royal Milk Tea", subCategory: "Milk Teas", image: "/menu%20pics/Boba/Boba_RoyalMilkTea_Menu.jpg", matched: true },
      { name: "Jasmin milk tea", subCategory: "Milk Teas", image: "/menu%20pics/Boba/Boba_JasmineMilkTea_Menu.jpg", matched: true },
      { name: "Osmanthus Oolong", subCategory: "Milk Teas", image: "/menu%20pics/Boba/Boba_OsmanthusOolangMilkTea_menu.jpg", matched: true },
      { name: "Brown Sugar Boba", subCategory: "Milk Teas", image: "/menu%20pics/Boba/Boba_BrownSugar_Menu.jpg", matched: true },
      { name: "Taro Milk Tea", subCategory: "Milk Teas", image: "/menu%20pics/Boba/Boba_TaroMilkTea_Menu.jpg", matched: true },
      { name: "cookies and cream milk Tea", subCategory: "Milk Teas", image: "/menu%20pics/Boba/Boba_Cookies%26Cream_Menu.jpg", matched: true },
      { name: "Black sesame milk Tea", subCategory: "Milk Teas", image: "/menu%20pics/Boba/Boba_BlackSesame_Menu.jpg", matched: true },
      { name: "Blue Pea Butterfly Tea", subCategory: "Milk Teas", image: "/menu%20pics/Boba/Boba_BluePeaButterfly_Menu.jpg", matched: true },
      // --- Unmatched: kept for now, shown below the divider, images unchanged. ---
      { name: "Badam milk Tea", subCategory: "Milk Teas", image: "/images/Boba/milk_tea/Badam_Milk_Tea.jpg" },
      { name: "Fruit Flavored juice", subCategory: "Fruit Teas", image: "/images/Boba/fruit_tea/fruit_flavored_juice.jpg" },
      { name: "Fruit flavored Tea", subCategory: "Fruit Teas", image: "/images/Boba/fruit_tea/fruit_flavored_tea.jpg" },
      { name: "Tropical Fruit Tea", subCategory: "Fruit Teas", image: "/images/Boba/fruit_tea/tropical_fruit_tea.jpg" },
      { name: "Strawberry Fruit Tea", subCategory: "Fruit Teas", image: "/images/Boba/fruit_tea/strawberry_fruit_tea.jpg" },
      { name: "Mango Fruit Tea", subCategory: "Fruit Teas", image: "/images/Boba/fruit_tea/mango_fruit_tea.jpg" },
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
      // One card per cookie, using the polished _cookie_menu render. The square
      // duplicate shots and the marketing images (logo, social poster) are left
      // out of the menu but remain on disk. Display names cleaned from filenames.
      { name: "Biscoff Lava", image: "/menu%20pics/Cookies/Biscoff-lava_R_cookie_menu.jpg", matched: true },
      { name: "Chocolate Chip", image: "/menu%20pics/Cookies/chocolate-chip_cookie_menu.jpg", matched: true },
      { name: "Cookies & Cream", image: "/menu%20pics/Cookies/cookie%26creame_cookie_menu.jpg", matched: true },
      { name: "Dubai", image: "/menu%20pics/Cookies/dubai_R_cookie_menu.jpg", matched: true },
      { name: "M&M", image: "/menu%20pics/Cookies/m%26m_cookie_menu.jpg", matched: true },
      { name: "Nutella Lava Burst", image: "/menu%20pics/Cookies/nutella-lava-burst_R_cookie_menu.jpg", matched: true },
      { name: "Oreo Cream Bliss", image: "/menu%20pics/Cookies/oreo-cream-bliss_R_cookie_menu.jpg", matched: true },
      { name: "Pistachio", image: "/menu%20pics/Cookies/pistachio_cookie_menu.jpg", matched: true },
      { name: "Rainbow Sprinkle", image: "/menu%20pics/Cookies/rainbow-sprinkle_cookie_menu.jpg", matched: true },
      { name: "Red Velvet", image: "/menu%20pics/Cookies/redvelvet_cookie_menu.jpg", matched: true },
      { name: "Red Velvet Cream Bliss", image: "/menu%20pics/Cookies/redvelvel-creame-bliss_R_cookie_menu.jpg", matched: true },
      { name: "Walnut Luxe", image: "/menu%20pics/Cookies/walnut-Luxe_R_cookie_menu.jpg", matched: true },
    ],
  },
  {
    slug: "donuts",
    name: "Donuts",
    accent: "#d9b486",
    products: [
      // --- Matched: items with final menu photos (public/menu pics/Donut). ---
      { name: "Rainbow Sprinkles", image: "/menu%20pics/Donut/Donut_Sprinkle_Menu.jpg", matched: true },
      { name: "Coconut Flakes", image: "/menu%20pics/Donut/Donut_Coconut-Flakes_Menu.jpg", matched: true },
      { name: "M & M", image: "/menu%20pics/Donut/Donut_M%26M_Menu.jpg", matched: true },
      { name: "Oreo", image: "/menu%20pics/Donut/Donut_Oreo_Menu.jpg", matched: true },
      { name: "Marshmallow", image: "/menu%20pics/Donut/Donut_Marshmellow_Menu.jpg", matched: true },
      { name: "S'mores", image: "/menu%20pics/Donut/Donut_Smores_Menu.jpg", matched: true },
      { name: "Pretzel", image: "/menu%20pics/Donut/Donut_Pretzel_Menu.jpg", matched: true },
      { name: "Birthday cake", image: "/menu%20pics/Donut/Donut_Birthdaycake_Menu.jpg", matched: true },
      { name: "Strawberry Short cake", image: "/menu%20pics/Donut/Donut_StrawberryShortcake_Menu.jpg", matched: true },
      { name: "Blueberry Glaze", image: "/menu%20pics/Donut/Donut_BlueberryGlaze_Menu.jpg", matched: true },
      { name: "Cherry Glaze", image: "/menu%20pics/Donut/Donut_CherryGlaze_Menu.jpg", matched: true },
      { name: "Gummy bears", image: "/menu%20pics/Donut/Donut_Gummybear_Menu.jpg", matched: true },
      // --- Unmatched: kept for now, shown below the divider. ---
      { name: "Classic" },
      { name: "Cinammon Sugar" },
    ],
  },
  {
    slug: "ice-cream-shakes",
    name: "Ice Cream Shakes",
    accent: "#c58f6a",
    products: [
      // --- Matched: items with final menu photos (public/menu pics/Icecream Shakes). ---
      { name: "Cookies & Cream Dream", image: "/menu%20pics/Icecream%20Shakes/shake_cookie%26creame_menu.jpg", matched: true },
      { name: "Nutella Hazelnut", image: "/menu%20pics/Icecream%20Shakes/shake_nutella-chocolate_menu.jpg", matched: true },
      { name: "Lotus Biscoff", image: "/menu%20pics/Icecream%20Shakes/shake_biscoff_menu.jpg", matched: true },
      { name: "Strawberry Cheesecake", image: "/menu%20pics/Icecream%20Shakes/shake_strawberry-cheesecake_menu.jpg", matched: true },
      { name: "Salted Caramel Pretzel", image: "/menu%20pics/Icecream%20Shakes/shake_salted-caramel_menu.jpg", matched: true },
      { name: "Dubai Chocolate Pistachio", image: "/menu%20pics/Icecream%20Shakes/shake_pistachio_menu.jpg", matched: true },
      // --- Unmatched: kept for now, shown below the divider. ---
      { name: "Classic Vanilla Bean" },
      { name: "Ultimate Chocolate Fudge" },
      { name: "Brownie Explosion" },
      { name: "Peanut Butter Cup" },
      { name: "Mint Cookies" },
      { name: "ChillVille Cookie Monster" },
    ],
  },
  {
    slug: "muffins",
    name: "Muffins",
    accent: "#c7a978",
    products: [
      // Every image in public/menu pics/Muffin, one card each (regular + Jumbo
      // per flavor). Display names cleaned from filenames (extension/underscores
      // dropped, filler words like "Muffin"/"Menu" removed, "Creame" -> "Cream").
      { name: "Blueberry Cream Cheese", image: "/menu%20pics/Muffin/Blueberry-creame-cheese_Muffin_Menu.jpg", matched: true },
      { name: "Blueberry Cream Cheese Jumbo", image: "/menu%20pics/Muffin/BlueBerryCreameCheese_Jumbo_Muffin_Menu.jpg", matched: true },
      { name: "Brown Butter Chocochip", image: "/menu%20pics/Muffin/BrownButterchocoChip_Muffin_Menu.jpg", matched: true },
      { name: "Brown Butter Chocochip Jumbo", image: "/menu%20pics/Muffin/BrownButterChocochip_Jumbo_Muffin.jpg", matched: true },
      { name: "Lemon Poppy Seed", image: "/menu%20pics/Muffin/Lemon-poppy-seed_Muffin_Menu.jpg", matched: true },
      { name: "Nutella Chocochip", image: "/menu%20pics/Muffin/Nutella_chocochip_Muffin_Menu.jpg", matched: true },
      { name: "Nutella Chocochip Jumbo", image: "/menu%20pics/Muffin/NutellaChocoChip_Jumbo_Muffin_menu.jpg", matched: true },
      { name: "Triple Chocolate Fudge", image: "/menu%20pics/Muffin/TripleChocolate-Fudge_Muffiin_Menu.jpg", matched: true },
      { name: "Triple Chocolate Fudge Jumbo", image: "/menu%20pics/Muffin/TripleChocolateFudge_Jumbo_Menu.jpg", matched: true },
    ],
  },
];

/**
 * "Chillville Favorites" — one signature pick per category, shown as a
 * highlighted band above the categories in the dropdown. Names are real Excel
 * items; Boba's pick ("Matcha Cheese Latte") was specified by the client, the
 * rest are the branded / signature items and can be swapped on request.
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
