"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EASE_EXPO } from "@/lib/motion";

/**
 * A quiet, editorial preloader. A counter fills, the wordmark settles, then the
 * whole panel lifts away to reveal the hero.
 */
export function Preloader() {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const start = performance.now();
    const duration = 1800;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(eased * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setDone(true), 250);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ y: "-100%" }}
          transition={{ duration: 1, ease: EASE_EXPO }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-charcoal"
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE_EXPO }}
            className="text-center"
          >
            <div className="font-display text-3xl tracking-wide2 text-cream">Chillville</div>
            <div className="mt-2 text-[10px] uppercase tracking-luxe text-caramel">
              Bakery &amp; Boba
            </div>
          </motion.div>

          <div className="absolute bottom-10 left-0 right-0 px-10">
            <div className="mx-auto flex max-w-content items-end justify-between">
              <span className="text-[10px] uppercase tracking-luxe text-cream/40">
                Loading the experience
              </span>
              <span className="font-display text-2xl tabular-nums text-cream/80">
                {count}
              </span>
            </div>
            <div className="mx-auto mt-4 h-px max-w-content overflow-hidden bg-cream/10">
              <div
                className="h-full bg-caramel transition-[width] duration-100 ease-linear"
                style={{ width: `${count}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
