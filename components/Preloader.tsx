"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EASE_EXPO } from "@/lib/motion";

/**
 * Opening brand intro. On the first load of a session it plays the Chillville
 * logo animation once (~3s) over the dark background, then dissolves into the
 * homepage. A session flag keeps it from replaying while navigating the site;
 * a safety timeout guarantees the page is revealed even if the clip stalls.
 *
 * Every state below starts the same on the server and the first client render
 * (a bare dark panel, no video), so hydration always matches. The session
 * decision — play, or skip for a returning visitor — is taken in a passive
 * effect that runs only after hydration is complete.
 */
const SEEN_KEY = "cv_intro_seen";

export function Preloader() {
  const [play, setPlay] = useState(false); // mount + play the clip (first view only)
  const [done, setDone] = useState(false); // clip finished → fade the panel away
  const [skip, setSkip] = useState(false); // returning visitor → remove instantly
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    let seen = false;
    try {
      seen = !!sessionStorage.getItem(SEEN_KEY);
    } catch {
      /* storage blocked (private mode) — treat as a fresh view */
    }

    // Returning within the session: don't replay — remove the panel.
    if (seen) {
      setSkip(true);
      return;
    }

    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      /* ignore — the timeout below still reveals the page */
    }

    setPlay(true);
    // Reveal the homepage when the clip ends; the timeout is a safety net for
    // blocked autoplay or an `ended` event that never fires (~3.2s clip).
    const timeout = setTimeout(() => setDone(true), 4200);
    return () => clearTimeout(timeout);
  }, []);

  if (skip) return null;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: EASE_EXPO }}
          // near-black to match the clip's own backdrop, so the contained
          // video letterboxes seamlessly on any aspect ratio
          className="fixed inset-0 z-[100] bg-[#050505]"
        >
          {play && (
            <video
              ref={videoRef}
              className="absolute inset-0 h-full w-full object-contain"
              autoPlay
              muted
              playsInline
              preload="auto"
              aria-hidden
              tabIndex={-1}
              onEnded={() => setDone(true)}
              onError={() => setDone(true)}
            >
              <source src="/videos/chillville_brand_intro.mp4" type="video/mp4" />
            </video>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
