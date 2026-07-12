"use client";

import { RefObject, useEffect, useState } from "react";

/**
 * Returns whether `ref` is intersecting the viewport. Used to pause the WebGL
 * render loop when a scene scrolls offscreen — a meaningful battery/perf win.
 */
export function useInView(ref: RefObject<Element | null>, rootMargin = "200px") {
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, rootMargin]);

  return inView;
}
