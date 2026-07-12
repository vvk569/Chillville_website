/**
 * Central content store. Copy is intentionally sparse and editorial — the
 * design carries the story, the words only punctuate it.
 */

export const nav = [
  { label: "Boba", href: "#boba" },
  { label: "Cookies", href: "#cookies" },
  { label: "Collection", href: "#collection" },
  { label: "Craft", href: "#craft" },
  { label: "Visit", href: "#visit" },
];

/** The two heroes of the menu get full cinematic showcases. */
export const boba = {
  eyebrow: "The Signature Pour",
  title: "Brown Sugar,\nslow poured.",
  body: "Pearls cooked fresh every hour and caramelised in muscovado until they tiger-stripe the glass. Finished with a cold oat-milk cloud and a whisper of smoked syrup.",
  notes: [
    { k: "Base", v: "Ceylon black / Ceremonial matcha" },
    { k: "Pearls", v: "Muscovado, cooked hourly" },
    { k: "Milk", v: "Barista oat or Jersey whole" },
  ],
  price: "8",
};

export const cookies = {
  eyebrow: "Baked to Order",
  title: "A molten\ncentre, always.",
  body: "Three-day fermented dough, browned butter, and shards of 64% Valrhona folded through by hand. Pulled from the oven the moment the edges crackle and the middle still flows.",
  notes: [
    { k: "Dough", v: "72-hour cold ferment" },
    { k: "Butter", v: "Cultured, browned in-house" },
    { k: "Chocolate", v: "Valrhona 64% single-origin" },
  ],
  price: "5",
};

/** The full lineup, used by the pinned horizontal gallery. */
export type LineupItem = {
  id: string;
  index: string;
  name: string;
  tag: string;
  note: string;
  accent: string;
};

export const lineup: LineupItem[] = [
  { id: "boba", index: "01", name: "Boba", tag: "Hand-shaken", note: "Brown-sugar pearls, cooked hourly, poured over a cold oat-milk cloud.", accent: "#c9a26b" },
  { id: "cookies", index: "02", name: "Cookies", tag: "Molten centre", note: "72-hour dough, browned butter, shards of 64% Valrhona.", accent: "#a4713f" },
  { id: "donuts", index: "03", name: "Donuts", tag: "Glazed to glass", note: "Brioche rings, fried to order, lacquered in seasonal glazes.", accent: "#d9b486" },
  { id: "croissants", index: "04", name: "Croissants", tag: "108 layers", note: "French T55, cultured butter, a three-day lamination.", accent: "#c7a978" },
  { id: "dubai", index: "05", name: "Dubai Chocolate", tag: "24k finish", note: "Crisp kunafa and pistachio cream in single-origin couverture.", accent: "#8fae7b" },
];

export type Collection = {
  id: string;
  index: string;
  name: string;
  line: string;
  detail: string;
  accent: string;
};

export const collection: Collection[] = [
  {
    id: "donuts",
    index: "01",
    name: "Donuts",
    line: "Brioche rings, glazed to glass.",
    detail:
      "Fried to order in small batches and lacquered with seasonal glazes — burnt honey, pistachio cream, black-sesame.",
    accent: "#c9a26b",
  },
  {
    id: "croissants",
    index: "02",
    name: "Croissants",
    line: "One hundred and eight layers.",
    detail:
      "French T55, cultured butter, a three-day lamination. A shattering, honeycomb crumb worth the wait.",
    accent: "#d9b486",
  },
  {
    id: "dubai",
    index: "03",
    name: "Dubai Chocolate",
    line: "Kunafa, pistachio, edible gold.",
    detail:
      "The viral bar, elevated. Crisp kunafa and pistachio cream sealed in single-origin couverture, dusted in 24k.",
    accent: "#8fae7b",
  },
];

export const craftSteps = [
  {
    no: "01",
    title: "Sourced without compromise",
    body: "Valrhona couverture, cultured French butter, single-origin pistachio, ceremonial-grade matcha.",
  },
  {
    no: "02",
    title: "Made the slow way",
    body: "Doughs ferment for days. Pearls are cooked by hand, hourly. Nothing is rushed, nothing is pre-mixed.",
  },
  {
    no: "03",
    title: "Served at its peak",
    body: "Baked and shaken to order, plated with intent. Everything leaves the pass at the exact right moment.",
  },
];

export type Stat = { value: number; suffix: string; label: string };

export const stats: Stat[] = [
  { value: 72, suffix: "h", label: "Dough fermentation" },
  { value: 100, suffix: "%", label: "Baked fresh daily" },
  { value: 24, suffix: "k", label: "Karat gold finish" },
  { value: 5, suffix: "★", label: "Guest rating" },
];

export type Testimonial = { quote: string; name: string; role: string };

export const testimonials: Testimonial[] = [
  {
    quote:
      "The brown-sugar boba genuinely stopped conversation. It looks like it was art-directed, and it tastes even better.",
    name: "Amara Okafor",
    role: "Food Editor, Saveur",
  },
  {
    quote:
      "That molten cookie is the best I've had in the city. Chillville treats a five-dollar cookie like a couture piece.",
    name: "Devon Reyes",
    role: "Creative Director",
  },
  {
    quote:
      "Every detail — the pour, the lighting, the box — feels designed. This is a flagship, not a café.",
    name: "Yuki Tanaka",
    role: "Pastry Consultant",
  },
];

export const store = {
  address: "27 Marigold Lane, Arts District",
  city: "Los Angeles, CA 90013",
  hours: [
    { day: "Mon — Thu", time: "08:00 — 21:00" },
    { day: "Friday", time: "08:00 — 23:00" },
    { day: "Saturday", time: "09:00 — 23:00" },
    { day: "Sunday", time: "09:00 — 20:00" },
  ],
  phone: "+1 (213) 555-0147",
  email: "hello@chillville.cafe",
};

export const socials = [
  { label: "Instagram", handle: "@chillville", href: "https://instagram.com", icon: "instagram" },
  { label: "TikTok", handle: "@chillville", href: "https://tiktok.com", icon: "tiktok" },
  { label: "Facebook", handle: "/chillvillecafe", href: "https://facebook.com", icon: "facebook" },
];
