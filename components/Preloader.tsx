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
            <>
              {/* MOBILE — ambient fill. A 16:9 clip can't fill a tall phone
                  screen at cover scale without cropping the centred logo. So a
                  zoomed copy of the same clip fills the screen edge-to-edge (no
                  black bars, no rectangular boundary), and the sharp foreground
                  below rides on top of it. Hidden on desktop (md+). */}
              <video
                className="absolute inset-0 h-full w-full scale-110 object-cover blur-2xl brightness-[0.72] md:hidden"
                autoPlay
                muted
                playsInline
                preload="auto"
                aria-hidden
                tabIndex={-1}
              >
                <source src="/videos/chillville-intro.mp4" type="video/mp4" />
              </video>
              {/* MOBILE — sharp foreground sized to the clip's own 16:9 box and
                  centred, so the complete "Chillville / BAKERY & BOBA" wording
                  shows smaller with comfortable side margins. The box edges are
                  feathered so the sharp scene melts into the full-screen fill
                  with no visible rectangle. Hidden on desktop. */}
              <video
                className="absolute inset-0 m-auto h-auto w-[90vw] max-w-[620px] object-cover md:hidden"
                style={{
                  aspectRatio: "16 / 9",
                  WebkitMaskImage:
                    "radial-gradient(closest-side, #000 80%, transparent 100%)",
                  maskImage:
                    "radial-gradient(closest-side, #000 80%, transparent 100%)",
                }}
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
              {/* DESKTOP — unchanged: the contained clip already fills the
                  ~16:9 viewport, no fill layer, no scaling, no mask. */}
              <video
                ref={videoRef}
                className="absolute inset-0 hidden h-full w-full object-contain md:block"
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
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
