"use client";

import { FiArrowRight } from "react-icons/fi";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";

/**
 * Compact About preview on the homepage — a few verbatim lines from the About
 * Us copy plus a link to the full /about page. The complete story lives on
 * /about; this is only a teaser.
 */
export function About() {
  return (
    <section id="about" className="relative overflow-x-clip py-24 sm:py-32">
      {/* ambient warm glow, matching the About page */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[54vh] w-[54vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-caramel/[0.06] blur-[150px]" />

      <div className="relative mx-auto max-w-3xl px-6 text-center sm:px-10">
        <Reveal>
          <span className="inline-block text-[11px] uppercase tracking-luxe text-caramel">
            Our Story
          </span>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="mt-6 font-display text-4xl font-extrabold leading-[1.05] text-cream sm:text-5xl md:text-[3.4rem]">
            Welcome to ChillVille
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-4 font-display text-xl text-caramel sm:text-2xl">
            Sweet Treats. Good Vibes. Great Moments.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mx-auto mt-7 max-w-xl text-pretty text-base leading-relaxed text-cream/65 sm:text-lg">
            ChillVille was created with a simple idea: the best treats should
            come with a great experience.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-10">
            <MagneticButton href="/about" variant="outline">
              Read Our Story
              <FiArrowRight aria-hidden className="transition-transform duration-500 ease-expo group-hover:translate-x-1" />
            </MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
