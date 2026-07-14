"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { boba } from "@/lib/data";
import { IMG, IMG_ACCENT } from "@/lib/images";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { Photo } from "@/components/ui/Photo";
import { Tilt3D } from "@/components/ui/Tilt3D";

export function SignatureBoba() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const yVisual = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  const yGhost = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);

  return (
    <section
      id="boba"
      ref={ref}
      className="relative overflow-hidden bg-charcoal py-28 sm:py-40"
    >
      <motion.span
        style={{ y: yGhost }}
        aria-hidden
        className="pointer-events-none absolute -right-6 top-10 select-none font-display text-[26vw] leading-none text-white/[0.025]"
      >
        Boba
      </motion.span>

      <div className="mx-auto grid max-w-content grid-cols-1 items-center gap-16 px-6 sm:px-10 lg:grid-cols-2">
        {/* copy */}
        <div className="order-2 lg:order-1">
          <Reveal>
            <span className="text-[11px] uppercase tracking-luxe text-caramel">
              {boba.eyebrow}
            </span>
          </Reveal>
          <Heading text={boba.title} className="mt-6 text-5xl sm:text-6xl md:text-7xl" />
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-md text-pretty leading-relaxed text-cream/60">
              {boba.body}
            </p>
          </Reveal>

          <div className="mt-10 divide-y divide-white/10 border-y border-white/10">
            {boba.notes.map((n, i) => (
              <Reveal key={n.k} delay={0.1 + i * 0.08}>
                <div className="flex items-center justify-between py-4">
                  <span className="text-[11px] uppercase tracking-wide2 text-cream/40">
                    {n.k}
                  </span>
                  <span className="text-sm text-cream">{n.v}</span>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="mt-10 flex items-baseline gap-3">
              <span className="text-[11px] uppercase tracking-luxe text-cream/40">From</span>
              <span className="font-display text-4xl text-caramel">${boba.price}</span>
            </div>
          </Reveal>
        </div>

        {/* photograph */}
        <Reveal variant="blur" className="order-1 lg:order-2">
          <motion.div style={{ y: yVisual }}>
            <Tilt3D className="group aspect-[4/5] w-full overflow-hidden rounded-[2rem] border border-white/10 shadow-card">
              <Photo
                sources={IMG.boba}
                accent={IMG_ACCENT.boba}
                alt="Brown-sugar boba with tapioca pearls and an oat-milk cap"
                className="absolute inset-0 h-full w-full"
                imgClassName="group-hover:scale-[1.06]"
              />
              <div className="absolute bottom-5 left-5 z-10 rounded-full border border-white/15 bg-black/40 px-4 py-2 text-[11px] uppercase tracking-luxe text-cream/80 backdrop-blur [transform:translateZ(60px)]">
                Signature Pour · ${boba.price}
              </div>
            </Tilt3D>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
