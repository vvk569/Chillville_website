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
  date: "2026-11-26",
  /** Short eyebrow (uppercased in the UI). */
  eyebrow: "Holiday Hours",
  /** The headline shoppers read. */
  message: "Closed today for Thanksgiving 🦃 — reopening Friday at 6 AM. Happy Thanksgiving!",
  /** Promo code shoppers enter at Toast checkout (omit/"" to hide). */
  code: "",
  /** Call-to-action button. */
  cta: { label: "Store Hours", href: "/#visit" },
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
