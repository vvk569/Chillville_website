"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { nav } from "@/lib/data";
import { menuCategories, menuFavorites } from "@/lib/menu";
import { cn } from "@/lib/utils";
import { EASE_EXPO } from "@/lib/motion";

/** Chevron used by both the desktop trigger and the mobile accordion. */
function Chevron({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 12 12"
      fill="none"
      className={className}
    >
      <path d="M2.5 4.5L6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Small star used to mark the featured "Chillville Favorites" row. */
function Star({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 14 14" fill="currentColor" className={className}>
      <path d="M7 1l1.8 3.65 4.03.59-2.92 2.84.69 4.02L7 10.85 3.4 12.1l.69-4.02L1.17 5.24l4.03-.59L7 1z" />
    </svg>
  );
}


export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  // Desktop MENU dropdown + mobile MENU accordion. Only the MENU item uses these.
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  // Section links smooth-scroll on the homepage (Lenis intercepts "#..."),
  // and navigate back to the homepage section from any other route.
  const sectionHref = (hash: string) => (pathname === "/" ? hash : `/${hash}`);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      setMenuOpen(false); // don't leave the dropdown floating while the page moves
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  // Collapse the mobile submenu whenever the overlay closes.
  useEffect(() => {
    if (!open) setMobileMenuOpen(false);
  }, [open]);

  // Escape closes the desktop dropdown.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const openDropdown = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMenuOpen(true);
  };
  // Small grace period so moving the cursor toward the panel doesn't close it.
  const closeDropdownSoon = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMenuOpen(false), 140);
  };

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
          {nav.map((l) =>
            l.href === "#menu" ? (
              <li
                key={l.href}
                className="relative"
                onMouseEnter={openDropdown}
                onMouseLeave={closeDropdownSoon}
              >
                <button
                  type="button"
                  aria-haspopup="true"
                  aria-expanded={menuOpen}
                  aria-controls="menu-dropdown"
                  onClick={() => setMenuOpen((v) => !v)}
                  onFocus={openDropdown}
                  className="group relative flex items-center gap-1.5 text-xs uppercase tracking-wide2 text-cream/70 transition-colors hover:text-cream"
                >
                  {l.label}
                  <Chevron
                    className={cn(
                      "h-2.5 w-2.5 text-cream/50 transition-transform duration-300 ease-expo",
                      menuOpen && "rotate-180 text-caramel"
                    )}
                  />
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-caramel transition-all duration-500 ease-expo group-hover:w-full" />
                </button>

                <AnimatePresence>
                  {menuOpen && (
                    <motion.div
                      id="menu-dropdown"
                      role="menu"
                      aria-label="Menu categories"
                      // x is kept in the animated transform so Framer's inline
                      // transform doesn't clobber a Tailwind -translate-x-1/2.
                      initial={{ opacity: 0, y: 12, scale: 0.98, x: "-50%" }}
                      animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
                      exit={{ opacity: 0, y: 8, scale: 0.98, x: "-50%" }}
                      transition={{ duration: 0.28, ease: EASE_EXPO }}
                      className="absolute left-1/2 top-full z-[80] mt-4 w-[min(90vw,34rem)] origin-top"
                    >
                      <div className="overflow-hidden rounded-2xl border border-cream/10 bg-charcoal/95 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.75)] backdrop-blur-2xl">
                        {/* Chillville Favorites — featured/popular picks */}
                        <div className="border-b border-cream/10 bg-gradient-to-r from-caramel/[0.09] to-transparent px-5 py-4">
                          <div className="flex items-center gap-1.5">
                            <Star className="h-2.5 w-2.5 text-caramel" />
                            <span className="text-[10px] uppercase tracking-luxe text-caramel">
                              Chillville Favorites
                            </span>
                          </div>
                          <div className="mt-3 grid grid-cols-3 gap-2">
                            {menuFavorites.map((f) => (
                              <Link
                                key={f.name}
                                role="menuitem"
                                href={`/menu/${f.slug}`}
                                onClick={() => setMenuOpen(false)}
                                className="group/fav rounded-xl border border-cream/10 bg-cream/[0.03] px-3 py-2.5 transition-colors hover:border-caramel/40 hover:bg-cream/[0.06] focus-visible:border-caramel/40 focus-visible:outline-none"
                              >
                                <span className="block text-[13px] font-medium leading-tight text-cream/90 transition-colors group-hover/fav:text-cream">
                                  {f.name}
                                </span>
                                <span className="mt-1 block text-[10px] uppercase tracking-wide2 text-cream/40">
                                  {f.note}
                                </span>
                              </Link>
                            ))}
                          </div>
                        </div>

                        {/* All categories */}
                        <div className="flex items-center justify-between px-5 pt-3.5 pb-1">
                          <span className="text-[10px] uppercase tracking-luxe text-cream/45">
                            All categories
                          </span>
                          <span className="text-[10px] uppercase tracking-wide2 text-cream/30">
                            {menuCategories.length}
                          </span>
                        </div>
                        <ul className="grid grid-cols-2 gap-0.5 p-2 pt-1">
                          {menuCategories.map((c) => (
                            <li key={c.slug} role="none">
                              <Link
                                role="menuitem"
                                href={`/menu/${c.slug}`}
                                onClick={() => setMenuOpen(false)}
                                className="group/item flex items-start gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-cream/[0.05] focus-visible:bg-cream/[0.05] focus-visible:outline-none"
                              >
                                <span
                                  aria-hidden
                                  className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full"
                                  style={{ backgroundColor: c.accent }}
                                />
                                <span className="flex flex-col">
                                  <span className="text-sm font-medium text-cream/90 transition-colors group-hover/item:text-cream">
                                    {c.name}
                                  </span>
                                  <span className="text-[11px] uppercase tracking-wide2 text-cream/40">
                                    {c.products.length > 0
                                      ? `${c.products.length} items`
                                      : "Coming soon"}
                                  </span>
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            ) : (
              <li key={l.href}>
                <a
                  href={sectionHref(l.href)}
                  className="group relative text-xs uppercase tracking-wide2 text-cream/70 transition-colors hover:text-cream"
                >
                  {l.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-caramel transition-all duration-500 ease-expo group-hover:w-full" />
                </a>
              </li>
            )
          )}
        </ul>

        <a
          href="#visit"
          className="hidden rounded-full border border-cream/20 px-5 py-2 text-xs uppercase tracking-wide2 text-cream transition-colors duration-500 hover:border-caramel hover:text-caramel md:inline-block"
        >
          Order Online
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
            className="fixed inset-0 top-[68px] z-[60] overflow-y-auto bg-charcoal/95 backdrop-blur-2xl md:hidden"
          >
            <ul className="flex flex-col gap-1 px-8 py-10">
              {nav.map((l, i) =>
                l.href === "#menu" ? (
                  <motion.li
                    key={l.href}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.08 * i, duration: 0.6, ease: EASE_EXPO }}
                  >
                    <button
                      type="button"
                      aria-expanded={mobileMenuOpen}
                      aria-controls="menu-accordion"
                      onClick={() => setMobileMenuOpen((v) => !v)}
                      className="flex w-full items-center justify-between border-b border-cream/10 py-5 font-display text-3xl text-cream"
                    >
                      {l.label}
                      <Chevron
                        className={cn(
                          "h-4 w-4 text-caramel transition-transform duration-300 ease-expo",
                          mobileMenuOpen && "rotate-180"
                        )}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {mobileMenuOpen && (
                        <motion.ul
                          id="menu-accordion"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: EASE_EXPO }}
                          className="overflow-hidden"
                        >
                          <li className="pt-3 pb-1">
                            <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-luxe text-caramel">
                              <Star className="h-2.5 w-2.5" />
                              Chillville Favorites
                            </span>
                          </li>
                          {menuFavorites.map((f) => (
                            <li key={f.name}>
                              <Link
                                href={`/menu/${f.slug}`}
                                onClick={() => {
                                  setOpen(false);
                                  setMobileMenuOpen(false);
                                }}
                                className="flex items-center gap-3 border-b border-cream/5 py-3 pl-1 text-cream/80 transition-colors hover:text-cream"
                              >
                                <Star aria-hidden className="h-3 w-3 shrink-0 text-caramel" />
                                <span className="text-base">{f.name}</span>
                                <span className="ml-auto text-[10px] uppercase tracking-wide2 text-cream/30">
                                  {f.note}
                                </span>
                              </Link>
                            </li>
                          ))}
                          <li className="pt-4 pb-1">
                            <span className="text-[10px] uppercase tracking-luxe text-cream/45">
                              All categories
                            </span>
                          </li>
                          {menuCategories.map((c) => (
                            <li key={c.slug}>
                              <Link
                                href={`/menu/${c.slug}`}
                                onClick={() => {
                                  setOpen(false);
                                  setMobileMenuOpen(false);
                                }}
                                className="flex items-center gap-3 border-b border-cream/5 py-3.5 pl-1 text-cream/75 transition-colors hover:text-cream"
                              >
                                <span
                                  aria-hidden
                                  className="h-1.5 w-1.5 shrink-0 rounded-full"
                                  style={{ backgroundColor: c.accent }}
                                />
                                <span className="text-base">{c.name}</span>
                                <span className="ml-auto text-[10px] uppercase tracking-wide2 text-cream/30">
                                  {c.products.length > 0
                                    ? `${c.products.length} items`
                                    : "Coming soon"}
                                </span>
                              </Link>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </motion.li>
                ) : (
                  <motion.li
                    key={l.href}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.08 * i, duration: 0.6, ease: EASE_EXPO }}
                  >
                    <a
                      href={sectionHref(l.href)}
                      onClick={() => setOpen(false)}
                      className="block border-b border-cream/10 py-5 font-display text-3xl text-cream"
                    >
                      {l.label}
                    </a>
                  </motion.li>
                )
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
