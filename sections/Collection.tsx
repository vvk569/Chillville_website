"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { collection } from "@/lib/data";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { viewportOnce, EASE_EXPO } from "@/lib/motion";

export function Collection() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="collection" className="relative overflow-hidden bg-charcoal py-28 sm:py-40">
      {/* accent glow that follows the hovered row */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[70vh] w-[70vh] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[160px]"
        animate={{
          backgroundColor:
            active !== null ? `${collection[active].accent}22` : "#00000000",
        }}
        transition={{ duration: 0.8, ease: EASE_EXPO }}
      />

      <div className="relative mx-auto max-w-content px-6 sm:px-10">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <Reveal>
              <span className="text-[11px] uppercase tracking-luxe text-caramel">
                The Full Collection
              </span>
            </Reveal>
            <Heading text={"Beyond the\nsignatures."} className="mt-6 text-5xl sm:text-6xl" />
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-xs text-sm leading-relaxed text-cream/50">
              Three more obsessions, each made with the same refusal to cut a
              corner.
            </p>
          </Reveal>
        </div>

        {/* editorial list */}
        <div className="mt-16 border-t border-white/10">
          {collection.map((c, i) => (
            <motion.a
              key={c.id}
              href="#visit"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 1, ease: EASE_EXPO, delay: i * 0.06 }}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              className="group grid grid-cols-12 items-center gap-4 border-b border-white/10 py-8 transition-colors duration-500 sm:py-10"
            >
              <span className="col-span-2 font-display text-sm text-cream/40 sm:text-base">
                {c.index}
              </span>
              <div className="col-span-7">
                <h3
                  className="font-display text-3xl text-cream transition-transform duration-500 ease-expo group-hover:translate-x-3 sm:text-5xl md:text-6xl"
                  style={{ color: active === i ? c.accent : undefined }}
                >
                  {c.name}
                </h3>
                {/* detail reveals on hover (desktop) */}
                <div className="hidden overflow-hidden md:block">
                  <p
                    className="max-w-md text-sm leading-relaxed text-cream/50 transition-all duration-700 ease-expo"
                    style={{
                      maxHeight: active === i ? 60 : 0,
                      opacity: active === i ? 1 : 0,
                      transform: `translateY(${active === i ? 12 : 0}px)`,
                    }}
                  >
                    {c.detail}
                  </p>
                </div>
              </div>
              <div className="col-span-3 hidden text-right text-sm text-cream/50 md:block">
                {c.line}
              </div>
              <span className="col-span-1 flex justify-end text-cream/40 transition-all duration-500 group-hover:translate-x-1 group-hover:text-caramel">
                <FiArrowUpRight size={24} />
              </span>
              {/* detail line for small screens */}
              <p className="col-span-12 mt-2 text-sm text-cream/50 md:hidden">{c.detail}</p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
