"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { testimonials } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";
import { EASE_EXPO } from "@/lib/motion";

export function Testimonials() {
  const [[index, dir], setState] = useState<[number, number]>([0, 0]);
  const timer = useRef<ReturnType<typeof setInterval>>(undefined);

  const paginate = useCallback((d: number) => {
    setState(([i]) => [(i + d + testimonials.length) % testimonials.length, d]);
  }, []);

  useEffect(() => {
    timer.current = setInterval(() => paginate(1), 6000);
    return () => clearInterval(timer.current);
  }, [paginate]);

  const t = testimonials[index];

  return (
    <section className="relative overflow-hidden bg-charcoal py-28 sm:py-40">
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-caramel/10 blur-[130px]" />

      <div className="mx-auto max-w-4xl px-6 text-center sm:px-10">
        <Reveal>
          <span className="text-[11px] uppercase tracking-luxe text-caramel">
            Guest Stories
          </span>
        </Reveal>

        <div className="relative mt-12 min-h-[280px]">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.figure
              key={index}
              custom={dir}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.9, ease: EASE_EXPO }}
              className="flex flex-col items-center"
            >
              <blockquote className="max-w-3xl font-display text-2xl italic leading-relaxed text-cream sm:text-4xl sm:leading-relaxed">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-10">
                <div className="text-sm text-cream">{t.name}</div>
                <div className="mt-1 text-[11px] uppercase tracking-luxe text-caramel/80">
                  {t.role}
                </div>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex items-center justify-center gap-6">
          <button
            aria-label="Previous"
            onClick={() => paginate(-1)}
            className="text-cream/50 transition-colors hover:text-caramel"
          >
            <FiArrowLeft size={22} />
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <span
                key={i}
                className="h-[3px] rounded-full transition-all duration-500"
                style={{
                  width: index === i ? 34 : 12,
                  background: index === i ? "#c9a26b" : "rgba(242,232,216,0.2)",
                }}
              />
            ))}
          </div>
          <button
            aria-label="Next"
            onClick={() => paginate(1)}
            className="text-cream/50 transition-colors hover:text-caramel"
          >
            <FiArrowRight size={22} />
          </button>
        </div>
      </div>
    </section>
  );
}
