"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Mobile-only floating "Back to Chillville" control for the category pages.
 * The inline breadcrumb at the very top handles the return trip near the top,
 * so this pill stays hidden there and fades in once the user has scrolled down
 * — keeping the way back one tap away at the bottom of a long menu, without a
 * trip back to the top. Desktop is unaffected (md:hidden).
 */
export function BackToChillville() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Reveal after the inline breadcrumb has scrolled out of easy reach.
    const onScroll = () => setShow(window.scrollY > 320);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Link
      href="/"
      aria-label="Back to Chillville"
      className={cn(
        "fixed bottom-5 left-5 z-50 flex items-center gap-2 rounded-full border border-cream/15 bg-charcoal/80 px-4 py-2.5 text-[11px] uppercase tracking-wide2 text-cream/80 shadow-card backdrop-blur-xl transition-all duration-300 ease-expo hover:border-caramel hover:text-caramel md:hidden",
        show
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0",
      )}
    >
      <span aria-hidden>&larr;</span> Back to Chillville
    </Link>
  );
}
