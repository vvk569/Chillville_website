import { menuCategories } from "./menu";

/**
 * Website analytics — shared types and helpers for the anonymous pageview
 * tracking and the admin dashboard that reads it back.
 *
 * Privacy: we store only a page path, an anonymous per-tab session id, the
 * referrer host (not the full URL), and a timestamp. No cookies, no IP, no
 * personal data, no third-party analytics.
 */

/** Firestore collection the pageview beacons are written to. */
export const ANALYTICS_COLLECTION = process.env.ANALYTICS_COLLECTION || "pageviews";

/** The store's local timezone — "times of day" are reported in this zone. */
export const STORE_TZ = "America/Chicago";

/** One pageview, as stored in Firestore (ts added server-side as a Timestamp). */
export type PageviewDoc = {
  path: string; // e.g. "/menu/boba"
  sid: string; // anonymous session id (sessionStorage), not tied to a person
  ref: string | null; // referrer host only, or null
  day: string; // "YYYY-MM-DD" in STORE_TZ, precomputed for cheap grouping
  hour: number; // 0–23 in STORE_TZ, precomputed
};

/** Store-local calendar day ("YYYY-MM-DD") and hour (0–23) for a given instant. */
export function storeDayAndHour(d: Date): { day: string; hour: number } {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: STORE_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    hour12: false,
  }).formatToParts(d);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const day = `${get("year")}-${get("month")}-${get("day")}`;
  // Intl can emit "24" for midnight in some runtimes; normalise to 0.
  const hour = Number(get("hour")) % 24;
  return { day, hour };
}

/** Today's store-local "YYYY-MM-DD". */
export function storeToday(): string {
  return storeDayAndHour(new Date()).day;
}

/** Shift a "YYYY-MM-DD" string by n days (calendar math, timezone-agnostic). */
export function addDays(ymd: string, n: number): string {
  const [y, m, d] = ymd.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  dt.setUTCDate(dt.getUTCDate() + n);
  return dt.toISOString().slice(0, 10);
}

const YMD = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Resolve a {from,to} date range from query params, defaulting to the last
 * `defaultDays` days (inclusive) ending today. Always returns from <= to.
 */
export function resolveRange(
  fromParam?: string,
  toParam?: string,
  defaultDays = 14,
): { from: string; to: string } {
  const today = storeToday();
  const to = toParam && YMD.test(toParam) ? toParam : today;
  const from = fromParam && YMD.test(fromParam) ? fromParam : addDays(to, -(defaultDays - 1));
  return from <= to ? { from, to } : { from: to, to: from };
}

/** Inclusive list of "YYYY-MM-DD" days from `from` to `to` (capped for safety). */
export function daysInRange(from: string, to: string, cap = 400): string[] {
  const out: string[] = [];
  let cur = from;
  while (cur <= to && out.length < cap) {
    out.push(cur);
    cur = addDays(cur, 1);
  }
  return out;
}

const slugToName = new Map(menuCategories.map((c) => [c.slug, c.name]));

/** A human label for a tracked path, used in the "top pages" breakdown. */
export function labelForPath(path: string): string {
  if (path === "/" || path === "") return "Home";
  if (path === "/about") return "About";
  if (path === "/order") return "Order (→ Toast)";
  const menu = path.match(/^\/menu\/([a-z0-9-]+)/i);
  if (menu) return `Menu · ${slugToName.get(menu[1]) ?? menu[1]}`;
  return path;
}

/** Is this path a menu-category page? (the "product interest" signal) */
export function menuSlugForPath(path: string): string | null {
  const m = path.match(/^\/menu\/([a-z0-9-]+)/i);
  return m && slugToName.has(m[1]) ? m[1] : null;
}
