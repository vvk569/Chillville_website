"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EASE_EXPO } from "@/lib/motion";

/**
 * Full-screen entry intro. It plays the ~1.8s Chillville animation once per
 * fresh page load, then dissolves into the site — which is already rendered
 * underneath, so nothing waits on it and the hand-off is seamless. A module
 * flag survives client-side (SPA) navigation, so the intro never replays while
 * moving around the site; a safety timeout guarantees the page is revealed even
 * if the clip stalls or autoplay is blocked.
 *
 * Every state starts identical on the server and the first client render (a
 * bare dark panel, no video), so hydration always matches; the play / skip
 * decision is taken in a passive effect that runs after hydration.
 */

// Resets on every full page load; persists across in-app navigation.
let hasPlayed = false;

export function Preloader() {
  const [play, setPlay] = useState(false); // mount + play the clip
  const [done, setDone] = useState(false); // clip finished → fade the panel away
  const [skip, setSkip] = useState(false); // internal navigation → remove instantly
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    // Already shown this page load (an internal navigation) — don't replay.
    if (hasPlayed) {
      setSkip(true);
      return;
    }
    hasPlayed = true;

    setPlay(true);
    // Reveal the site when the clip ends; the timeout is a safety net for
    // blocked autoplay or an `ended` event that never fires (~1.8s clip).
    const timeout = setTimeout(() => setDone(true), 2500);
    return () => clearTimeout(timeout);
  }, []);

  if (skip) return null;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: EASE_EXPO }}
          className="fixed inset-0 z-[100] bg-black"
        >
          {play && (
            <video
              ref={videoRef}
              // Mobile portrait is far taller than the 16:9 clip, so `contain`
              // left black bars top and bottom. `object-cover` fills the whole
              // phone screen edge-to-edge (cropping the outer sides; the centred
              // logo stays visible). Desktop is ~16:9, so it keeps `contain` and
              // is unchanged.
              className="absolute inset-0 h-full w-full object-cover md:object-contain"
              autoPlay
              muted
              playsInline
              preload="auto"
              aria-hidden
              tabIndex={-1}
              onEnded={() => setDone(true)}
              onError={() => setDone(true)}
            >
              <source src="/videos/chillville-intro.mp4" type="video/mp4" />
            </video>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
