/**
 * Central image registry — the ONE place to manage photography.
 *
 * NOTE ON PLACEHOLDERS
 * This build environment can't reach stock-photo hosts (Unsplash/Pexels/etc are
 * blocked by network policy), and keyword photo services returned irrelevant,
 * low-quality images. So every slot below is EMPTY on purpose — the <Photo>
 * component renders a clean, on-brand gradient placeholder instead of a random
 * or broken image.
 *
 * ── Drop in your OWN photos (recommended, looks best) ─────────────────────
 *   1. Put files in /public/images  (e.g. boba.jpg, cookies.jpg, icecream.jpg)
 *   2. Point the slot at them:        boba: ["/images/boba.jpg"],
 * You can also paste any hosted image URL(s). Multiple entries are tried in
 * order; the gradient shows only if none load.
 * ──────────────────────────────────────────────────────────────────────────
 */

export const IMG = {
  boba: [] as string[],
  cookies: [] as string[],
  iceCream: [] as string[],
  shake: [] as string[],
  donuts: [] as string[],
  croissants: [] as string[],
  dubai: [] as string[],
  storefront: [] as string[],
};

/** Accent colors used for each slot's gradient placeholder (brand palette). */
export const IMG_ACCENT: Record<keyof typeof IMG, string> = {
  boba: "#e3ab6b",
  cookies: "#a4713f",
  iceCream: "#8fce74",
  shake: "#ff7a59",
  donuts: "#e3ab6b",
  croissants: "#c7a978",
  dubai: "#8fce74",
  storefront: "#ff7a59",
};
