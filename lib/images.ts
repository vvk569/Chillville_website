/**
 * Central image registry — the ONE place to manage photography.
 *
 * ── ZERO-CONFIG PHOTOS ────────────────────────────────────────────────────
 * Every product is pre-wired. To use a real photo, just drop a file into
 * /public/images with the matching name (any of .jpg/.jpeg/.png/.webp):
 *
 *     boba.jpg   cookies.jpg   icecream.jpg   shake.jpg
 *     donuts.jpg   croissants.jpg   dubai.jpg   storefront.jpg
 *
 * If the file exists it's shown; if not, the 3D ingredient-assembly is shown
 * automatically (storefront falls back to a branded gradient). No code edits.
 * ──────────────────────────────────────────────────────────────────────────
 */

const exts = (name: string) =>
  [".jpg", ".jpeg", ".png", ".webp"].map((e) => `/images/${name}${e}`);

export const IMG = {
  boba: exts("boba"),
  cookies: exts("cookies"),
  iceCream: exts("icecream"),
  shake: exts("shake"),
  donuts: exts("donuts"),
  croissants: exts("croissants"),
  dubai: exts("dubai"),
  storefront: exts("storefront"),
};

/** Accent colors used for each slot's gradient fallback (brand palette). */
export const IMG_ACCENT: Record<keyof typeof IMG, string> = {
  boba: "#e3ab6b",
  cookies: "#a4713f",
  iceCream: "#d9b486",
  shake: "#ff7a59",
  donuts: "#e3ab6b",
  croissants: "#c7a978",
  dubai: "#8fce74",
  storefront: "#ff7a59",
};
