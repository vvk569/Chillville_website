"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { FiArrowDownRight } from "react-icons/fi";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ImageTrail } from "@/components/ui/image-trail";
import { Photo } from "@/components/ui/Photo";
import { IMG, IMG_ACCENT } from "@/lib/images";
import { EASE_EXPO } from "@/lib/motion";

// brand-themed tiles that trail the cursor across the hero
const trailTiles = [
  { emoji: "🧋", accent: "#c9a26b" },
  { emoji: "🍪", accent: "#a4713f" },
  { emoji: "🍩", accent: "#d9b486" },
  { emoji: "🥐", accent: "#c7a978" },
  { emoji: "🍫", accent: "#8fae7b" },
];

// begin after the preloader lifts away
const BASE = 2.5;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: BASE } },
};
const line = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 1.2, ease: EASE_EXPO } },
};
const soft = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease: EASE_EXPO } },
};

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  return (
    <section
      id="top"
      ref={heroRef}
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden"
    >
      {/* cinematic gradient stage */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(120%_100%_at_70%_20%,#1c160f_0%,#0a0a0a_60%)]" />
      {/* vibrant ambient blobs */}
      <div className="pointer-events-none absolute -left-20 top-1/4 -z-10 h-[42vh] w-[42vh] rounded-full bg-matcha/20 blur-[130px]" />
      <div className="pointer-events-none absolute -right-16 bottom-10 -z-10 h-[38vh] w-[38vh] rounded-full bg-coral/20 blur-[130px]" />

      {/* photographic backdrop — a real shot, drifting slowly so it feels alive */}
      <div className="absolute inset-0 z-0">
        <Photo
          sources={IMG.hero}
          accent={IMG_ACCENT.hero}
          alt="Freshly poured brown-sugar boba on the Chillville counter"
          priority
          overlay={false}
          className="h-full w-full"
          imgClassName="live-zoom"
        />
      </div>

      {/* legibility veils — enough to carry the headline, light enough to keep
          the photograph readable. Copy spans the full width on mobile, so it
          needs a flat scrim there and a directional one from sm up. */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-charcoal/70 sm:hidden" />
      <div className="pointer-events-none absolute inset-0 z-[1] hidden bg-gradient-to-r from-charcoal/85 via-charcoal/45 to-charcoal/20 sm:block" />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-charcoal/40 via-transparent to-charcoal" />

      {/* brand-themed cursor image-trail (sits above the veil, below the copy) */}
      <div className="pointer-events-none absolute inset-0 z-[2]">
        <ImageTrail containerRef={heroRef} interval={110} rotationRange={18}>
          {trailTiles.map((t) => (
            <div
              key={t.emoji}
              className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 shadow-[0_20px_45px_-20px_rgba(0,0,0,0.85)] backdrop-blur-sm sm:h-20 sm:w-20"
              style={{
                background: `radial-gradient(120% 120% at 30% 20%, ${t.accent}cc, #14110c 85%)`,
              }}
            >
              <span className="text-2xl sm:text-3xl">{t.emoji}</span>
            </div>
          ))}
        </ImageTrail>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto w-full max-w-content px-6 sm:px-10"
      >
        <motion.div variants={soft} className="mb-8 flex items-center gap-4">
          <span className="h-px w-12 bg-caramel/70" />
          <span className="text-[11px] uppercase tracking-luxe text-caramel">
            Arts District · Los Angeles
          </span>
        </motion.div>

        <h1 className="font-display font-extrabold text-[15vw] leading-[0.86] tracking-[-0.03em] text-cream sm:text-[11vw] lg:text-[8.5vw]">
          <span className="clip-line">
            <motion.span variants={line} className="block">
              Freshly Baked.
            </motion.span>
          </span>
          <span className="clip-line">
            <motion.span variants={line} className="block">
              Perfectly Brewed.
            </motion.span>
          </span>
          <span className="clip-line">
            <motion.span
              variants={line}
              className="block bg-gradient-to-r from-coral via-caramel to-matcha bg-clip-text text-transparent"
            >
              Pure Indulgence.
            </motion.span>
          </span>
        </h1>

        <div className="mt-10 flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
          <motion.p variants={soft} className="max-w-md text-pretty text-base leading-relaxed text-cream/60">
            Handcrafted boba and small-batch bakery, made the slow way — designed
            to feel like the unveiling of something rare.
          </motion.p>

          <motion.div variants={soft} className="flex flex-wrap items-center gap-4">
            <MagneticButton href="#menu">
              Explore Menu <FiArrowDownRight />
            </MagneticButton>
            <MagneticButton href="#visit" variant="outline">
              Visit Store
            </MagneticButton>
          </motion.div>
        </div>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: BASE + 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-luxe text-cream/40"
      >
        Scroll
        <span className="relative h-12 w-px overflow-hidden bg-cream/15">
          <span className="absolute inset-x-0 top-0 h-1/2 animate-[drift-slow_2.4s_ease-in-out_infinite] bg-caramel" />
        </span>
      </motion.div>
    </section>
  );
}
