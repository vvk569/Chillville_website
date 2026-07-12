import type { Variants, Transition } from "framer-motion";

/**
 * Shared motion language. Everything is slow, soft and expo-eased — no bounce,
 * no overshoot. These tokens keep the whole site feeling like one film.
 */
export const EASE_EXPO = [0.16, 1, 0.3, 1] as const;
export const EASE_SMOOTH = [0.65, 0, 0.35, 1] as const;

export const transition = {
  soft: { duration: 1.1, ease: EASE_EXPO } as Transition,
  slow: { duration: 1.5, ease: EASE_EXPO } as Transition,
};

/** Fade + rise, revealed once when scrolled into view. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.1, ease: EASE_EXPO },
  },
};

/** Gentle blur-in for imagery and large blocks. */
export const blurIn: Variants = {
  hidden: { opacity: 0, filter: "blur(14px)", scale: 1.02 },
  show: {
    opacity: 1,
    filter: "blur(0px)",
    scale: 1,
    transition: { duration: 1.4, ease: EASE_EXPO },
  },
};

/** Stagger container for children using `fadeUp`. */
export const stagger = (staggerChildren = 0.12, delayChildren = 0): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren, delayChildren },
  },
});

/** Word / line reveal for headlines. */
export const lineReveal: Variants = {
  hidden: { y: "110%" },
  show: {
    y: "0%",
    transition: { duration: 1.15, ease: EASE_EXPO },
  },
};

/** Shared viewport config so reveals feel consistent everywhere. */
export const viewportOnce = { once: true, margin: "-12% 0px -12% 0px" } as const;
