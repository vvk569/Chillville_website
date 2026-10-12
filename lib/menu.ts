/**
 * Menu categories — the single source of truth for the MENU dropdown and the
 * `/menu/[category]` pages.
 *
 * The lineup mirrors the two in-store menu boards (Cookies/Donuts/Muffins/
 * Cheesecakes/Chocolates and Boba/Ice Cream/Milkshakes). Prices come from those
 * boards via the optional `price` field. Items that were on the site but not on
 * either board have been removed so the website matches what the store sells.
 * A few items carry no price where the board prices them another way (e.g. ice
 * cream is priced by scoop size, not per flavor). Photos/ingredients for
 * placeholder items will be supplied later.
 */

export type MenuProduct = {
  name: string; // exact product name from the Excel / board
  subCategory?: string; // real sub-group (e.g. "Milk Teas"), when present
  image?: string; // path under /public to an existing product photo, when available
  matched?: boolean; // true = has a final menu photo; rendered in the top group above the divider
  fit?: "cover" | "contain"; // image fit inside the card; defaults to "cover". "contain" shows the whole image (letterboxed)
  ingredients?: string; // short ingredients line shown under the image (replaces the placeholder when set)
  price?: number; // menu price in USD, when known (from the in-store board)
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
      // --- Matched: Classic Milk Teas with final menu photos. ---
      // Board prices: Classic Milk Teas $5.99–$7.19.
      { name: "Royal Milk Tea", subCategory: "Milk Teas", image: "/menu%20pics/Boba/Boba_RoyalMilkTea_Menu.jpg", matched: true, ingredients: "Black tea · milk · brown sugar · tapioca pearls", price: 5.99 },
      { name: "Jasmin milk tea", subCategory: "Milk Teas", image: "/menu%20pics/Boba/Boba_JasmineMilkTea_Menu.jpg", matched: true, ingredients: "Jasmine green tea · milk · sweetener · tapioca pearls", price: 5.99 },
      { name: "Osmanthus Oolong", subCategory: "Milk Teas", image: "/menu%20pics/Boba/Boba_OsmanthusOolangMilkTea_menu.jpg", matched: true, ingredients: "Osmanthus oolong tea · milk · sweetener · tapioca pearls", price: 5.99 },
      { name: "Brown Sugar Boba", subCategory: "Milk Teas", image: "/menu%20pics/Boba/Boba_BrownSugar_Menu.jpg", matched: true, ingredients: "Black tea · milk · brown sugar syrup · tapioca pearls", price: 7.19 },
      { name: "Taro Milk Tea", subCategory: "Milk Teas", image: "/menu%20pics/Boba/Boba_TaroMilkTea_Menu.jpg", matched: true, ingredients: "Taro · milk · tea · sweetener · tapioca pearls", price: 6.89 },
      { name: "cookies and cream milk Tea", subCategory: "Milk Teas", image: "/menu%20pics/Boba/Boba_Cookies%26Cream_Menu.jpg", matched: true, ingredients: "Milk tea · milk · crushed chocolate cookies · sweetener · tapioca pearls", price: 6.89 },
      { name: "Black sesame milk Tea", subCategory: "Milk Teas", image: "/menu%20pics/Boba/Boba_BlackSesame_Menu.jpg", matched: true, ingredients: "Black sesame · milk · tea · sweetener · tapioca pearls", price: 6.89 },
      { name: "Blue Pea Butterfly Tea", subCategory: "Milk Teas", image: "/menu%20pics/Boba/Boba_BluePeaButterfly_Menu.jpg", matched: true, ingredients: "Butterfly pea tea · milk · sweetener · tapioca pearls", price: 6.89 },
      // --- Unmatched: no final photo yet; shown below the divider. ---
      // Thai Milk Tea added from the board (Classic Milk Teas $5.99).
      { name: "Thai Milk Tea", subCategory: "Milk Teas", ingredients: "Thai tea · milk · sweetener · tapioca pearls", price: 5.99 },
      // Fruit Tea $6.25 — Lychee/Passion Fruit/Peach added from the board.
      { name: "Strawberry Fruit Tea", subCategory: "Fruit Teas", image: "/images/Boba/fruit_tea/strawberry_fruit_tea.jpg", ingredients: "Strawberry · fruit tea · sweetener · ice", price: 6.25 },
      { name: "Pineapple Fruit Tea", subCategory: "Fruit Teas", image: "/menu%20pics/Boba/pineapple_fruit_tea.png", ingredients: "Pineapple · fruit tea · sweetener · ice", price: 6.25 },
      { name: "Lychee Fruit Tea", subCategory: "Fruit Teas", ingredients: "Lychee · fruit tea · sweetener · ice", price: 6.25 },
      { name: "Passion Fruit Tea", subCategory: "Fruit Teas", ingredients: "Passion fruit · fruit tea · sweetener · ice", price: 6.25 },
      { name: "Peach Fruit Tea", subCategory: "Fruit Teas", ingredients: "Peach · fruit tea · sweetener · ice", price: 6.25 },
      // Matcha Mood $7.29.
      { name: "Matcha Latte", subCategory: "Matcha Varieties", image: "/menu%20pics/Boba/Matcha%20Latte.jpg", ingredients: "Matcha · milk · sweetener · ice", price: 7.29 },
      { name: "Double Matcha Cloud", subCategory: "Matcha Varieties", image: "/menu%20pics/Boba/Double%20Matcha%20Cloud.jpg", ingredients: "Matcha · milk · matcha cream foam · sweetener · ice", price: 7.29 },
      { name: "Strawberry Matcha Latte", subCategory: "Matcha Varieties", image: "/menu%20pics/Boba/Strawberry%20Matcha%20Latte.jpg", ingredients: "Strawberry · matcha · milk · sweetener · ice", price: 7.29 },
      { name: "Matcha Cheese Latte", subCategory: "Matcha Varieties", image: "/menu%20pics/Boba/Matcha%20Cheese%20Latte.jpg", ingredients: "Matcha · milk · cheese cream foam · sweetener · ice", price: 7.29 },
      { name: "Coconut Matcha Cloud", subCategory: "Matcha Varieties", image: "/menu%20pics/Boba/Coconut%20Matcha%20Cloud.jpg", ingredients: "Matcha · milk · coconut cream · coconut flakes · sweetener · ice", price: 7.29 },
      // Premium Teas $7.89.
      { name: "Mango Coco Pomelo", subCategory: "Pomelo Sago", image: "/menu%20pics/Boba/Mango%20Coco%20Pomelo.jpg", ingredients: "Mango · coconut milk · pomelo · sago pearls · sweetener", price: 7.89 },
      { name: "Strawberry Kiwi Sago", subCategory: "Pomelo Sago", image: "/menu%20pics/Boba/Strawberry%20Kiwi%20Sago.jpg", ingredients: "Strawberry · kiwi · sago pearls · fruit juice · sweetener", price: 7.89 },
      // Extras / toppings from the board.
      { name: "Popping Boba", subCategory: "Extras", ingredients: "Mango · Passion Fruit · Orange · Peach · Strawberry", price: 1.19 },
      { name: "Jelly", subCategory: "Extras", ingredients: "Mango · Coffee", price: 0.69 },
      { name: "Crystal Boba", subCategory: "Extras", ingredients: "White Crystal · Brown Crystal", price: 0.99 },
      { name: "Tapioca Pearls", subCategory: "Extras", ingredients: "classic chewy pearls", price: 0.89 },
    ],
  },
  {
    slug: "cookies",
    name: "Cookies",
    accent: "#a4713f",
    products: [
      // Board: Regular Cookies $3.99, ChillVille Royale $5.25.
      { name: "Biscoff Lava", image: "/menu%20pics/Cookies/Biscoff-lava_R_cookie_menu.jpg", matched: true, ingredients: "Biscoff cookie · Biscoff spread · butter · brown sugar", price: 5.25 },
      { name: "Chocolate Chip", image: "/menu%20pics/Cookies/chocolate-chip_cookie_menu.jpg", matched: true, ingredients: "chocolate chips · butter · brown sugar · vanilla", price: 3.99 },
      { name: "Cookies & Cream", image: "/menu%20pics/Cookies/cookie%26creame_cookie_menu.jpg", matched: true, ingredients: "crushed Oreo cookies · white chocolate · butter · cream", price: 3.99 },
      { name: "Dubai", image: "/menu%20pics/Cookies/dubai_R_cookie_menu.jpg", matched: true, ingredients: "pistachio cream · kataifi pastry · chocolate · butter", price: 5.25 },
      { name: "M&M", image: "/menu%20pics/Cookies/m%26m_cookie_menu.jpg", matched: true, ingredients: "M&M candies · chocolate chips · butter · brown sugar", price: 3.99 },
      { name: "Nutella Lava Burst", image: "/menu%20pics/Cookies/nutella-lava-burst_R_cookie_menu.jpg", matched: true, ingredients: "Nutella · chocolate chips · butter · brown sugar", price: 5.25 },
      { name: "Pistachio", image: "/menu%20pics/Cookies/pistachio_cookie_menu.jpg", matched: true, ingredients: "pistachios · pistachio cream · butter · brown sugar", price: 3.99 },
      { name: "Rainbow Sprinkle", image: "/menu%20pics/Cookies/rainbow-sprinkle_cookie_menu.jpg", matched: true, ingredients: "rainbow sprinkles · white chocolate · butter · brown sugar", price: 3.99 },
      { name: "Red Velvet", image: "/menu%20pics/Cookies/redvelvet_cookie_menu.jpg", matched: true, ingredients: "red velvet · white chocolate chips · cocoa · butter · cream cheese", price: 3.99 },
    ],
  },
  {
    slug: "donuts",
    name: "Donuts",
    accent: "#d9b486",
    products: [
      // --- Matched: items with final menu photos. ---
      // Board: Regular Donuts $1.89 (Classic $0.99), Premium Donuts $2.19.
      { name: "Rainbow Sprinkles", image: "/menu%20pics/Donut/Donut_Sprinkle_Menu.jpg", matched: true, ingredients: "vanilla glaze · rainbow sprinkles", price: 1.89 },
      { name: "M & M", image: "/menu%20pics/Donut/Donut_M%26M_Menu.jpg", matched: true, ingredients: "chocolate glaze · M&M candies", price: 1.89 },
      { name: "Oreo", image: "/menu%20pics/Donut/Donut_Oreo_Menu.jpg", matched: true, ingredients: "vanilla glaze · crushed Oreo cookies", price: 2.19 },
      { name: "Marshmallow", image: "/menu%20pics/Donut/Donut_Marshmellow_Menu.jpg", matched: true, ingredients: "vanilla glaze · marshmallows · chocolate drizzle", price: 1.89 },
      { name: "Pretzel", image: "/menu%20pics/Donut/Donut_Pretzel_Menu.jpg", matched: true, ingredients: "chocolate glaze · pretzel pieces · caramel drizzle · sea salt", price: 1.89 },
      { name: "Strawberry Short cake", image: "/menu%20pics/Donut/Donut_StrawberryShortcake_Menu.jpg", matched: true, ingredients: "strawberry glaze · strawberries · shortcake crumbs · cream", price: 2.19 },
      { name: "Gummy bears", image: "/menu%20pics/Donut/Donut_Gummybear_Menu.jpg", matched: true, ingredients: "vanilla glaze · gummy bears · rainbow sprinkles", price: 1.89 },
      // --- Unmatched: board flavors without a final photo yet. ---
      { name: "Classic", image: "/menu%20pics/Donut/classic_donut.png", ingredients: "vanilla glaze · powdered sugar", price: 0.99 },
      { name: "Fruity Pebbles", ingredients: "vanilla glaze · Fruity Pebbles cereal", price: 1.89 },
      { name: "Strawberry Glaze", ingredients: "strawberry glaze", price: 1.89 },
      { name: "Honey Glaze", ingredients: "honey glaze", price: 1.89 },
      { name: "Biscoff", ingredients: "Biscoff glaze · Biscoff spread · Biscoff crumbs", price: 2.19 },
      { name: "Pistachio", ingredients: "pistachio glaze · pistachio cream · chopped pistachios", price: 2.19 },
      // Donut boxes (bundles) — board pricing. Shown as a labelled sub-section.
      { name: "6 Count Box", subCategory: "Donut Boxes", ingredients: "6 donuts · mix & match", price: 9.99 },
      { name: "12 Count Box", subCategory: "Donut Boxes", ingredients: "12 donuts · mix & match", price: 17.99 },
      { name: "12 Count Half & Half", subCategory: "Donut Boxes", ingredients: "6 regular + 6 premium", price: 19.99 },
    ],
  },
  {
    slug: "ice-cream-shakes",
    name: "Milkshakes",
    accent: "#c58f6a",
    products: [
      // Board: MILKSHAKES — exactly the 8 listed, flat $8.49. Each mapped to an
      // existing shake photo; ingredient lines are simple milkshake descriptions.
      { name: "Classic Vanilla", image: "/menu%20pics/Icecream%20Shakes/classic_vanilla_bean_shake.png", matched: true, ingredients: "vanilla bean · milk · ice cream", price: 8.49 },
      { name: "Oreo Cookies & Cream", image: "/menu%20pics/Icecream%20Shakes/shake_cookie%26creame_menu.jpg", matched: true, ingredients: "Oreo cookies · milk · ice cream · cream", price: 8.49 },
      { name: "Chocolate", image: "/menu%20pics/Icecream%20Shakes/Ultimate%20Chocolate%20Fudge.png", matched: true, ingredients: "chocolate · cocoa · milk · ice cream", price: 8.49 },
      { name: "Pistachio", image: "/menu%20pics/Icecream%20Shakes/shake_pistachio_menu.jpg", matched: true, ingredients: "pistachio · milk · ice cream", price: 8.49 },
      { name: "Salted Caramel", image: "/menu%20pics/Icecream%20Shakes/shake_salted-caramel_menu.jpg", matched: true, ingredients: "salted caramel · milk · ice cream · sea salt", price: 8.49 },
      { name: "Strawberry Cheesecake", image: "/menu%20pics/Icecream%20Shakes/shake_strawberry-cheesecake_menu.jpg", matched: true, ingredients: "strawberries · cream cheese · graham · milk · ice cream", price: 8.49 },
      { name: "Nutella Chocolate", image: "/menu%20pics/Icecream%20Shakes/shake_nutella-chocolate_menu.jpg", matched: true, ingredients: "Nutella · chocolate · hazelnut · milk · ice cream", price: 8.49 },
      { name: "Lotus Biscoff", image: "/menu%20pics/Icecream%20Shakes/shake_biscoff_menu.jpg", matched: true, ingredients: "Lotus Biscoff · Biscoff spread · milk · ice cream", price: 8.49 },
    ],
  },
  {
    slug: "ice-cream",
    name: "Ice Cream",
    accent: "#d6a07e",
    products: [
      // Scoop ice cream (board: ICE CREAM). Priced by cup size, not per flavor —
      // the Scoops group carries the prices; flavors are a chooser. No photos yet.
      { name: "Single Scoop", subCategory: "Scoops", ingredients: "small", price: 3.99 },
      { name: "Double Scoop", subCategory: "Scoops", ingredients: "medium", price: 4.99 },
      { name: "Triple Scoop", subCategory: "Scoops", ingredients: "large", price: 5.99 },
      // Flavors — pick any, priced by the scoop above. (Peanut Butter Cup removed.)
      { name: "Cotton Candy", subCategory: "Flavors", ingredients: "available by the scoop" },
      { name: "Krazy Kolors", subCategory: "Flavors", ingredients: "available by the scoop" },
      { name: "Birthday Cake", subCategory: "Flavors", ingredients: "available by the scoop" },
      { name: "Cookies 'n Cream", subCategory: "Flavors", ingredients: "available by the scoop" },
      { name: "Home Made Vanilla", subCategory: "Flavors", ingredients: "available by the scoop" },
      { name: "Dutch Chocolate", subCategory: "Flavors", ingredients: "available by the scoop" },
      { name: "Goey Butter Cake", subCategory: "Flavors", ingredients: "available by the scoop" },
      { name: "Mint Chocolate Chip", subCategory: "Flavors", ingredients: "available by the scoop" },
      { name: "Mocha Almond Fudge", subCategory: "Flavors", ingredients: "available by the scoop" },
      { name: "Butter Pecan", subCategory: "Flavors", ingredients: "available by the scoop" },
      { name: "Pistachio Almond", subCategory: "Flavors", ingredients: "available by the scoop" },
      // Specials.
      { name: "Banana Boat", subCategory: "Specials", ingredients: "bananas · three scoops · toppings · whipped cream · cherries", price: 10.99 },
    ],
  },
  {
    slug: "muffins",
    name: "Muffins",
    accent: "#c7a978",
    products: [
      // Board: Regular Muffins $3.99 (Lemon Poppy Seed), Jumbo Muffins $5.69.
      { name: "Lemon Poppy Seed", subCategory: "Regular", image: "/menu%20pics/Muffin/Lemon-poppy-seed_Muffin_Menu.jpg", matched: true, ingredients: "lemon zest · lemon juice · poppy seeds · butter", price: 3.99 },
      { name: "Blueberry Cream Cheese Jumbo", subCategory: "Jumbo", image: "/menu%20pics/Muffin/BlueBerryCreameCheese_Jumbo_Muffin_Menu.jpg", matched: true, ingredients: "blueberries · cream cheese · butter · vanilla", price: 5.69 },
      { name: "Nutella Chocochip Jumbo", subCategory: "Jumbo", image: "/menu%20pics/Muffin/NutellaChocoChip_Jumbo_Muffin_menu.jpg", matched: true, ingredients: "Nutella · chocolate chips · butter · brown sugar", price: 5.69 },
      { name: "Triple Chocolate Fudge Jumbo", subCategory: "Jumbo", image: "/menu%20pics/Muffin/TripleChocolateFudge_Jumbo_Menu.jpg", matched: true, ingredients: "cocoa · chocolate chips · chocolate chunks · butter", price: 5.69 },
    ],
  },
  {
    slug: "cheesecakes",
    name: "Cheesecakes",
    accent: "#cf9f66",
    products: [
      // From the in-store menu board. No photos on disk yet, so cards show the
      // "Photo coming soon" placeholder. Ingredient lines inferred from the flavor.
      { name: "Plain", ingredients: "cream cheese · graham cracker crust · vanilla", price: 6.49 },
      { name: "Biscoff", ingredients: "cream cheese · Biscoff spread · Biscoff crumbs · graham crust", price: 7.99 },
      { name: "Pistachio", ingredients: "cream cheese · pistachio · graham crust", price: 7.99 },
      { name: "Blueberry", ingredients: "cream cheese · blueberries · graham crust", price: 7.19 },
      { name: "Strawberry", ingredients: "cream cheese · strawberries · graham crust", price: 7.19 },
    ],
  },
  {
    slug: "chocolates",
    name: "Chocolates",
    accent: "#9d6b3f",
    products: [
      // From the in-store menu board. No photos on disk yet, so cards show the
      // "Photo coming soon" placeholder. Ingredient lines inferred from the flavor.
      { name: "Dubai Chocolate Large", ingredients: "pistachio cream · kataifi pastry · milk chocolate", price: 20.00 },
      { name: "Dubai Chocolate Small", ingredients: "pistachio cream · kataifi pastry · milk chocolate", price: 10.00 },
    ],
  },
];

/**
 * "Chillville Favorites" — one signature pick per category. Currently an unused
 * export (no component renders it), kept in sync with real products anyway.
 */
export type MenuFavorite = {
  name: string; // real product name
  note: string; // which category it belongs to
  slug: string; // category page it links to
};

export const menuFavorites: MenuFavorite[] = [
  { name: "Matcha Cheese Latte", note: "Boba", slug: "boba" },
  { name: "Nutella Lava Burst", note: "Cookies", slug: "cookies" },
  { name: "Strawberry Short cake", note: "Donuts", slug: "donuts" },
  { name: "Lotus Biscoff", note: "Milkshakes", slug: "ice-cream-shakes" },
  { name: "Triple Chocolate Fudge Jumbo", note: "Muffins", slug: "muffins" },
];

export function getCategory(slug: string): MenuCategory | undefined {
  return menuCategories.find((c) => c.slug === slug);
}
