import { orderUrl } from "@/lib/data";

/**
 * Site-wide promo ribbon config.
 *
 * The ribbon shows ONLY on `date` (a single store-local calendar day, America/
 * Chicago) and disappears on its own afterwards — no redeploy needed to take it
 * down. To run another promo later, just change `date` and the copy here.
 *
 * Set `date` to "" to disable the ribbon entirely.
 */
export const PROMO = {
  /** Store-local day the promo is live, "YYYY-MM-DD" (America/Chicago). */
  date: "2026-11-08",
  /** Short eyebrow (uppercased in the UI). */
  eyebrow: "Grand Launch",
  /** The headline shoppers read. */
  message: "10% off everything — today only",
  /** Promo code shoppers enter at Toast checkout (omit/"" to hide). */
  code: "LAUNCH10",
  /** Call-to-action button. */
  cta: { label: "Order Online", href: orderUrl },
} as const;

const STORE_TZ = "America/Chicago";

/** Current store-local day as "YYYY-MM-DD". */
export function storeDateNow(): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: STORE_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  return `${get("year")}-${get("month")}-${get("day")}`;
}

/** True only during the promo's store-local calendar day. */
export function isPromoActive(): boolean {
  return Boolean(PROMO.date) && storeDateNow() === PROMO.date;
}
