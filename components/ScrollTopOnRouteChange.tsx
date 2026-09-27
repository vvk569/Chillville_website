"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { markInternalNav } from "@/lib/nav-history";

/**
 * Guarantees the intended scroll behaviour across the whole app:
 *
 * - Forward navigation to a new page (Home → About, Menu → Boba, "Back to
 *   Chillville", …) always opens at the very top.
 * - Back / forward navigation is left to the browser + Next.js, so the previous
 *   scroll position is restored (return exactly where you were).
 *
 * Next.js does this by default, but Lenis (home) and some mobile browsers can
 * leave the old position; this makes the "top on forward nav" case explicit and
 * reliable without touching the restore-on-back path. Anchor navigations
 * (`/#menu`, `/#visit`) are skipped so their in-page scroll still works.
 */
export function ScrollTopOnRouteChange() {
  const pathname = usePathname();
  const lastPopAt = useRef(0);
  const isInitial = useRef(true);

  useEffect(() => {
    // Back / forward gestures fire popstate just before the route resolves.
    const onPopState = () => {
      lastPopAt.current = Date.now();
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    if (isInitial.current) {
      isInitial.current = false; // don't fight the browser on first load
      return;
    }
    markInternalNav(); // a client-side navigation happened this session
    // An anchor navigation manages its own scroll target — leave it alone.
    if (window.location.hash) return;
    // A very recent popstate means this was back/forward — restore, don't reset.
    if (Date.now() - lastPopAt.current < 300) return;

    // Forward navigation → open the new page at the top (native + Lenis).
    window.scrollTo(0, 0);
    const lenis = (
      window as unknown as {
        __lenis?: { scrollTo: (target: number, opts?: { immediate?: boolean }) => void };
      }
    ).__lenis;
    lenis?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return null;
}
