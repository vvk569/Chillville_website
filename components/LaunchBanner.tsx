"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiArrowUpRight, FiX } from "react-icons/fi";
import { PROMO, isPromoActive } from "@/lib/promo";
import { EASE_EXPO } from "@/lib/motion";

/**
 * A dismissible, date-gated promo ribbon pinned to the very top of the site.
 *
 * It renders only on the promo's store-local day (lib/promo.ts) and only until
 * the visitor dismisses it. While visible it publishes its height to the
 * `--promo-top` CSS variable so the fixed header and scroll-progress bar sit
 * just beneath it; the variable defaults to 0, so on any other day the header
 * is exactly as before and this component renders nothing.
 */
const dismissKey = () => `cv_promo_dismissed_${PROMO.date}`;

export function LaunchBanner() {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  // Decide visibility on the client (store-local date + per-promo dismissal).
  // `?promo=preview` forces it on (date + dismissal ignored) so the ribbon can
  // be checked on the live site before its day.
  useEffect(() => {
    const preview =
      typeof window !== "undefined" &&
      new URLSearchParams(window.location.search).get("promo") === "preview";
    if (preview) {
      setShow(true);
      return;
    }
    if (!isPromoActive()) return;
    let dismissed = false;
    try {
      dismissed = localStorage.getItem(dismissKey()) === "1";
    } catch {
      /* storage blocked — show it */
    }
    if (!dismissed) setShow(true);
  }, []);

  // Keep the header/progress-bar offset in sync with the ribbon's real height.
  useEffect(() => {
    const root = document.documentElement;
    if (!show) {
      root.style.removeProperty("--promo-top");
      return;
    }
    const el = ref.current;
    if (!el) return;
    const apply = () => root.style.setProperty("--promo-top", `${el.offsetHeight}px`);
    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(el);
    return () => {
      ro.disconnect();
      root.style.removeProperty("--promo-top");
    };
  }, [show]);

  function dismiss() {
    setShow(false);
    try {
      localStorage.setItem(dismissKey(), "1");
    } catch {
      /* ignore */
    }
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          ref={ref}
          role="region"
          aria-label="Announcement"
          initial={{ y: "-100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.7, ease: EASE_EXPO, delay: 0.1 }}
          className="fixed inset-x-0 top-0 z-[90] bg-gradient-to-r from-coral via-caramel to-matcha text-charcoal"
        >
          <div className="relative mx-auto flex max-w-content items-center justify-center gap-x-3 gap-y-1 px-10 py-2 text-center sm:px-14">
            <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5 text-[12px] font-semibold sm:text-sm">
              <span className="font-display uppercase tracking-wide2">{PROMO.eyebrow}</span>
              <span aria-hidden className="opacity-40">
                •
              </span>
              <span>{PROMO.message}</span>
              {PROMO.code && (
                <span className="inline-flex items-center gap-1 rounded-full border border-charcoal/30 px-2 py-0.5 text-[11px] tracking-wide2">
                  code <strong className="font-bold tracking-normal">{PROMO.code}</strong>
                </span>
              )}
            </p>

            <a
              href={PROMO.cta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden shrink-0 items-center gap-1 rounded-full bg-charcoal/90 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-wide2 text-cream transition-transform hover:scale-[1.03] sm:inline-flex"
            >
              {PROMO.cta.label}
              <FiArrowUpRight className="h-3.5 w-3.5" />
            </a>

            <button
              onClick={dismiss}
              aria-label="Dismiss announcement"
              className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-charcoal/70 transition-colors hover:bg-charcoal/10 hover:text-charcoal"
            >
              <FiX className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
