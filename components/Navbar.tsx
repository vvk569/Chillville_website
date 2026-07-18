"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { nav } from "@/lib/data";
import { cn } from "@/lib/utils";
import { EASE_EXPO } from "@/lib/motion";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: EASE_EXPO, delay: 2.4 }}
      className={cn(
        "fixed inset-x-0 top-0 z-[70] transition-colors duration-700",
        scrolled ? "bg-charcoal/60 backdrop-blur-xl" : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex max-w-content items-center justify-between px-6 py-5 sm:px-10">
        <a href="#top" className="flex flex-col leading-none" data-cursor>
          <span className="font-display text-lg tracking-wide2 text-cream">Chillville</span>
          <span className="mt-0.5 text-[9px] uppercase tracking-luxe text-caramel">
            Bakery &amp; Boba
          </span>
        </a>

        <ul className="hidden items-center gap-6 lg:gap-9 md:flex">
          {nav.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="group relative text-xs uppercase tracking-wide2 text-cream/70 transition-colors hover:text-cream"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-caramel transition-all duration-500 ease-expo group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#visit"
          className="hidden rounded-full border border-cream/20 px-5 py-2 text-xs uppercase tracking-wide2 text-cream transition-colors duration-500 hover:border-caramel hover:text-caramel md:inline-block"
        >
          Reserve
        </a>

        <button
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
          className="flex h-8 w-8 flex-col items-center justify-center gap-[5px] md:hidden"
        >
          <span className={cn("h-px w-6 bg-cream transition-all duration-300", open && "translate-y-[6px] rotate-45")} />
          <span className={cn("h-px w-6 bg-cream transition-all duration-300", open && "opacity-0")} />
          <span className={cn("h-px w-6 bg-cream transition-all duration-300", open && "-translate-y-[6px] -rotate-45")} />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 top-[68px] z-[60] bg-charcoal/95 backdrop-blur-2xl md:hidden"
          >
            <ul className="flex flex-col gap-1 px-8 py-10">
              {nav.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.08 * i, duration: 0.6, ease: EASE_EXPO }}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-cream/10 py-5 font-display text-3xl text-cream"
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
