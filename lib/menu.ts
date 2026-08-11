/**
 * Menu categories — the source of truth for the MENU dropdown links and the
 * `/menu/[category]` pages. Products are temporary dummy items (placeholders)
 * until real catalog data + photography are wired in.
 */

export type MenuProduct = {
  name: string;
  description: string;
  ingredients: string;
  price: string; // dollars, without the "$" (rendered by the page)
};

export type MenuCategory = {
  slug: string;
  name: string; // short label used in the dropdown
  tag: string; // short descriptor shown under the name in the dropdown
  eyebrow: string; // small kicker above the page title
  blurb: string; // one-line intro on the category page
  accent: string; // warm accent used for the dot / placeholder tint
  products: MenuProduct[];
};

export const menuCategories: MenuCategory[] = [
  {
    slug: "boba",
    name: "Boba",
    tag: "Hand-shaken",
    eyebrow: "The Signature Pour",
    blurb: "Pearls cooked fresh every hour, poured over a cold milk cloud.",
    accent: "#c9a26b",
    products: [
      {
        name: "Brown Sugar Boba",
        description: "Muscovado pearls that tiger-stripe the glass, over an oat-milk cloud.",
        ingredients: "Ceylon black tea · muscovado pearls · barista oat milk",
        price: "8",
      },
      {
        name: "Matcha Latte Boba",
        description: "Ceremonial matcha whisked to order with chewy tapioca.",
        ingredients: "Ceremonial matcha · tapioca pearls · whole milk",
        price: "8",
      },
      {
        name: "Taro Milk Tea",
        description: "Stone-ground taro, silky, faintly floral and sweet.",
        ingredients: "Fresh taro · black tea · condensed milk",
        price: "7",
      },
      {
        name: "Strawberry Oolong",
        description: "Fresh strawberry purée over roasted oolong with popping boba.",
        ingredients: "Roasted oolong · strawberry purée · popping boba",
        price: "8",
      },
    ],
  },
  {
    slug: "dubai-chocolates",
    name: "Dubai Chocolates",
    tag: "24k finish",
    eyebrow: "The Viral Bar, Elevated",
    blurb: "Crisp kunafa and pistachio cream sealed in single-origin couverture.",
    accent: "#8fae7b",
    products: [
      {
        name: "Classic Dubai Bar",
        description: "The one everyone talks about — kunafa and pistachio, sealed in dark couverture.",
        ingredients: "Shredded kunafa · pistachio cream · dark couverture",
        price: "14",
      },
      {
        name: "Pistachio Gold Bar",
        description: "Our richest pistachio bar, finished with edible 24k gold leaf.",
        ingredients: "Pistachio cream · toasted kunafa · 24k gold leaf",
        price: "16",
      },
      {
        name: "Milk Kunafa Bar",
        description: "Creamy milk chocolate against shatter-crisp kunafa and tahini.",
        ingredients: "Milk couverture · kunafa · tahini",
        price: "13",
      },
    ],
  },
  {
    slug: "cookies",
    name: "Cookies",
    tag: "Molten centre",
    eyebrow: "Baked to Order",
    blurb: "Three-day fermented dough, browned butter, pulled while the middle still flows.",
    accent: "#a4713f",
    products: [
      {
        name: "Molten Valrhona",
        description: "72-hour dough with a molten 64% single-origin centre.",
        ingredients: "72h dough · browned butter · Valrhona 64%",
        price: "5",
      },
      {
        name: "Double Chocolate",
        description: "Deep cocoa dough packed with dark chocolate chunks and sea salt.",
        ingredients: "Cocoa dough · dark chunks · flaked sea salt",
        price: "5",
      },
      {
        name: "Pistachio White",
        description: "White chocolate folded through roasted pistachio.",
        ingredients: "Cultured butter · white chocolate · pistachio",
        price: "5",
      },
      {
        name: "Biscoff Butter",
        description: "Brown-butter dough with a caramelised Biscoff swirl.",
        ingredients: "Brown butter · Biscoff spread · vanilla",
        price: "5",
      },
    ],
  },
  {
    slug: "donuts",
    name: "Donuts",
    tag: "Glazed to glass",
    eyebrow: "Fried to Order",
    blurb: "Brioche rings, fried the moment you order and lacquered in seasonal glazes.",
    accent: "#d9b486",
    products: [
      {
        name: "Glazed Brioche",
        description: "The classic ring in a clean vanilla-glass glaze.",
        ingredients: "Brioche dough · vanilla glaze",
        price: "4",
      },
      {
        name: "Pistachio Cream",
        description: "Split and filled with slow-set pistachio custard.",
        ingredients: "Brioche · pistachio custard · crushed pistachio",
        price: "5",
      },
      {
        name: "Chocolate Hazelnut",
        description: "A molten gianduja centre under toasted hazelnut.",
        ingredients: "Brioche · gianduja · toasted hazelnut",
        price: "5",
      },
    ],
  },
  {
    slug: "ice-creams",
    name: "Ice Creams",
    tag: "Slow-churned",
    eyebrow: "Churned In-House",
    blurb: "Custard bases steeped overnight and churned to order — dense and glossy.",
    accent: "#d9b486",
    products: [
      {
        name: "Madagascar Vanilla",
        description: "Overnight custard flecked with real vanilla bean.",
        ingredients: "Jersey cream · vanilla bean · egg yolk",
        price: "6",
      },
      {
        name: "Burnt Caramel",
        description: "Deep, smoky caramel with a whisper of sea salt.",
        ingredients: "Custard base · burnt caramel · sea salt",
        price: "6",
      },
      {
        name: "Black Sesame",
        description: "Nutty, toasted and glossy — a house favourite.",
        ingredients: "Custard base · black sesame paste",
        price: "6",
      },
      {
        name: "Roasted Pistachio",
        description: "Slow-churned around real roasted pistachio paste.",
        ingredients: "Custard base · pistachio paste",
        price: "7",
      },
    ],
  },
  {
    slug: "milkshakes",
    name: "Milkshakes",
    tag: "Thick & loaded",
    eyebrow: "Blended Thick",
    blurb: "Our own ice cream blended thick and crowned with the good stuff.",
    accent: "#c58f6a",
    products: [
      {
        name: "Cookie Dough Shake",
        description: "Vanilla ice cream blended thick, crowned with a warm cookie.",
        ingredients: "House vanilla ice cream · cookie · whipped cream",
        price: "9",
      },
      {
        name: "Dubai Chocolate Shake",
        description: "Kunafa and pistachio blended into chocolate ice cream.",
        ingredients: "Chocolate ice cream · kunafa · pistachio",
        price: "11",
      },
      {
        name: "Strawberry Donut Shake",
        description: "Strawberry shake finished with a glazed donut on top.",
        ingredients: "Strawberry ice cream · glazed donut · berry sauce",
        price: "10",
      },
    ],
  },
  {
    slug: "croissants-muffins",
    name: "Croissants & Muffins",
    tag: "108 layers",
    eyebrow: "Laminated by Hand",
    blurb: "French butter, a three-day lamination, and muffins baked every morning.",
    accent: "#c7a978",
    products: [
      {
        name: "Butter Croissant",
        description: "108 honeycombed layers of cultured French butter.",
        ingredients: "French T55 · cultured butter",
        price: "5",
      },
      {
        name: "Almond Croissant",
        description: "Filled and topped with almond frangipane and flaked almonds.",
        ingredients: "Croissant · frangipane · flaked almonds",
        price: "6",
      },
      {
        name: "Blueberry Muffin",
        description: "Buttermilk crumb bursting with fresh blueberries.",
        ingredients: "Buttermilk batter · fresh blueberries",
        price: "5",
      },
      {
        name: "Double Chocolate Muffin",
        description: "Rich cocoa crumb studded with dark chocolate chunks.",
        ingredients: "Cocoa batter · dark chocolate chunks",
        price: "5",
      },
    ],
  },
];

/** Featured/popular picks shown in the dropdown's "Chillville Favorites" band. */
export type MenuFavorite = {
  name: string;
  note: string;
  slug: string; // which category page it links to
};

export const menuFavorites: MenuFavorite[] = [
  { name: "Brown Sugar Boba", note: "Signature pour", slug: "boba" },
  { name: "Dubai Chocolate", note: "24k finish", slug: "dubai-chocolates" },
  { name: "Molten Cookie", note: "Baked to order", slug: "cookies" },
];

export function getCategory(slug: string): MenuCategory | undefined {
  return menuCategories.find((c) => c.slug === slug);
}
