"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cookies } from "@/lib/data";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { CookieStack } from "@/components/visuals/CookieStack";

export function SignatureCookies() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const yVisual = useTransform(scrollYProgress, [0, 1], ["-10%", "14%"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [8, -8]);

  return (
    <section
      id="cookies"
      ref={ref}
      className="relative overflow-hidden bg-charcoal-800 py-28 sm:py-40"
    >
      {/* warm floor glow */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-chocolate/25 to-transparent" />

      <div className="mx-auto grid max-w-content grid-cols-1 items-center gap-16 px-6 sm:px-10 lg:grid-cols-12">
        {/* visual */}
        <motion.div
          style={{ y: yVisual, rotate }}
          className="flex justify-center lg:col-span-6"
        >
          <div className="animate-drift-slow">
            <CookieStack />
          </div>
        </motion.div>

        {/* copy */}
        <div className="lg:col-span-6 lg:pl-10">
          <Reveal>
            <span className="text-[11px] uppercase tracking-luxe text-caramel">
              {cookies.eyebrow}
            </span>
          </Reveal>
          <Heading text={cookies.title} className="mt-6 text-5xl sm:text-6xl md:text-7xl" />
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-md text-pretty leading-relaxed text-cream/60">
              {cookies.body}
            </p>
          </Reveal>

          <div className="mt-10 flex flex-wrap gap-3">
            {cookies.notes.map((n, i) => (
              <Reveal key={n.k} delay={0.1 + i * 0.08}>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4">
                  <div className="text-[10px] uppercase tracking-wide2 text-cream/40">
                    {n.k}
                  </div>
                  <div className="mt-1 text-sm text-cream">{n.v}</div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="mt-10 flex items-baseline gap-3">
              <span className="text-[11px] uppercase tracking-luxe text-cream/40">From</span>
              <span className="font-display text-4xl text-caramel">${cookies.price}</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
