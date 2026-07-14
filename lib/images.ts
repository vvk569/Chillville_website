/**
 * Central image registry — the ONE place to manage photography.
 *
 * Photos load directly in the visitor's browser from a keyword stock-photo
 * service (chosen for reliability: this build environment can't reach curated
 * stock hosts to verify URLs). Each slot is an array of candidate URLs tried in
 * order; if they all fail, the <Photo> component shows a branded gradient
 * instead of a broken image.
 *
 * ── To use YOUR OWN photos ──────────────────────────────────────────────
 *   1. Drop files into /public/images (e.g. boba.jpg, cookies.jpg)
 *   2. Replace a slot below with a local path, e.g.  boba: ["/images/boba.jpg"]
 * Nothing else needs to change.
 * ────────────────────────────────────────────────────────────────────────
 */

const flick = (tags: string, lock: number, w = 1100, h = 1400) =>
  `https://loremflickr.com/${w}/${h}/${tags}?lock=${lock}`;

export const IMG = {
  boba: [flick("bubbletea", 21), flick("boba", 5)],
  cookies: [flick("cookie", 32), flick("cookies", 7)],
  iceCream: [flick("icecream", 43), flick("gelato", 9)],
  shake: [flick("milkshake", 54), flick("smoothie", 11)],
  donuts: [flick("donut", 65, 1000, 1200), flick("doughnut", 3, 1000, 1200)],
  croissants: [flick("croissant", 76, 1000, 1200), flick("pastry", 4, 1000, 1200)],
  dubai: [flick("chocolate", 87, 1000, 1200), flick("chocolatebar", 6, 1000, 1200)],
  storefront: [flick("bakery", 98, 1600, 1200), flick("cafe", 12, 1600, 1200)],
} as const;

/** Accent colors used for each slot's gradient fallback (brand palette). */
export const IMG_ACCENT: Record<keyof typeof IMG, string> = {
  boba: "#c9a26b",
  cookies: "#a4713f",
  iceCream: "#d9b486",
  shake: "#c58f6a",
  donuts: "#d9b486",
  croissants: "#c7a978",
  dubai: "#8fae7b",
  storefront: "#c9a26b",
};
