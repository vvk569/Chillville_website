"use client";

import { motion } from "framer-motion";
import { FiArrowDownRight } from "react-icons/fi";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { EASE_EXPO } from "@/lib/motion";

// begin after the preloader lifts away
const BASE = 2.5;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: BASE } },
};

// one shared, subtle fade + rise for every line in the left column
const rise = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE_EXPO } },
};

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-end overflow-hidden sm:items-center"
    >
      {/* cinematic Kunafa · Boba video backdrop — the visual focus. Covers the
          hero without stretching; the poster shows instantly and stays as the
          fallback if the video is slow to load or unsupported. */}
      <div className="absolute inset-0 z-0 bg-charcoal">
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/images/kunafa.jpg"
          aria-hidden="true"
          tabIndex={-1}
        >
          <source src="/videos/kunafa_boba.mp4" type="video/mp4" />
        </video>
      </div>

      {/* readability gradients — anchored to the text so the product stays clear.
          Top: nav legibility. Desktop: left-weighted, fading out before the
          product on the right. Mobile: bottom-weighted, leaving the top open. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-44 bg-gradient-to-b from-charcoal/70 to-transparent" />
      <div className="pointer-events-none absolute inset-0 z-[1] hidden bg-gradient-to-r from-charcoal/85 via-charcoal/35 to-transparent sm:block" />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-charcoal/90 via-charcoal/25 to-transparent sm:hidden" />

      {/* left content column — video stays visible in the centre/right */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto w-full max-w-content px-6 pb-24 sm:px-10 sm:pb-0"
      >
        <div className="max-w-lg sm:max-w-[46%]">
          <motion.div variants={rise} className="mb-6 flex items-center gap-4">
            <span className="h-px w-12 bg-caramel/70" />
            <span className="text-[11px] uppercase tracking-luxe text-caramel">
              Arts District · Los Angeles
            </span>
          </motion.div>

          <h1 className="font-display text-4xl/[1.18] font-extrabold tracking-[-0.02em] text-cream sm:text-5xl/[1.18] lg:text-6xl/[1.18]">
            <motion.span variants={rise} className="block">
              Freshly Baked.
            </motion.span>
            <motion.span variants={rise} className="block">
              Perfectly Brewed.
            </motion.span>
            <motion.span
              variants={rise}
              className="block bg-gradient-to-r from-coral via-caramel to-matcha bg-clip-text text-transparent"
            >
              Pure Indulgence.
            </motion.span>
          </h1>

          <motion.p
            variants={rise}
            className="mt-7 max-w-md text-pretty text-base leading-relaxed text-cream/65"
          >
            Handcrafted boba and small-batch bakery, made the slow way — designed
            to feel like the unveiling of something rare.
          </motion.p>

          <motion.div variants={rise} className="mt-9 flex flex-wrap items-center gap-4">
            <MagneticButton href="#menu">
              Explore Menu <FiArrowDownRight />
            </MagneticButton>
            <MagneticButton href="#visit" variant="outline">
              Visit Store
            </MagneticButton>
          </motion.div>
        </div>
      </motion.div>

      {/* scroll cue — desktop only, so it never crowds the mobile copy */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: BASE + 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-luxe text-cream/40 sm:flex"
      >
        Scroll
        <span className="relative h-12 w-px overflow-hidden bg-cream/15">
          <span className="absolute inset-x-0 top-0 h-1/2 animate-[drift-slow_2.4s_ease-in-out_infinite] bg-caramel" />
        </span>
      </motion.div>
    </section>
  );
}
