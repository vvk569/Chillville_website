"use client";

import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  /** Candidate image URLs, tried in order. */
  sources: readonly string[];
  alt: string;
  /** Gradient fallback color if every source fails. */
  accent?: string;
  className?: string;
  imgClassName?: string;
  /** Darkening overlay for text legibility over the image. */
  overlay?: boolean;
  priority?: boolean;
  /** Called when every source has failed to load. */
  onExhausted?: () => void;
};

/**
 * Resilient image: tries each source in turn, and if they all fail it settles
 * on a branded gradient — so the site never shows a broken-image icon. Uses a
 * subtle zoom-on-hover and a lazy native <img> for performance.
 */
export function Photo({
  sources,
  alt,
  accent = "#c9a26b",
  className,
  imgClassName,
  overlay = true,
  priority = false,
  onExhausted,
}: Props) {
  const [idx, setIdx] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const exhausted = idx >= sources.length;

  useEffect(() => {
    if (exhausted) onExhausted?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exhausted]);

  // A cached image can finish loading before this ref/onLoad attaches, so
  // the "load" event never fires — check `.complete` the moment it mounts.
  const imgRef = useCallback((img: HTMLImageElement | null) => {
    if (img?.complete && img.naturalWidth > 0) setLoaded(true);
  }, []);

  return (
    <div
      className={cn("relative overflow-hidden bg-charcoal-800", className)}
      style={{
        background: `radial-gradient(120% 120% at 50% 0%, ${accent}2e, #0f0d0a 80%)`,
      }}
    >
      {!exhausted && (
        <img
          key={sources[idx]}
          ref={imgRef}
          src={sources[idx]}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => {
            setLoaded(false);
            setIdx((i) => i + 1);
          }}
          className={cn(
            "h-full w-full object-cover transition-[transform,opacity] duration-[1.2s] ease-out",
            loaded ? "opacity-100" : "opacity-0",
            imgClassName
          )}
        />
      )}

      {/* graceful branded placeholder when no source loads */}
      {exhausted && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="h-16 w-16 rounded-full opacity-40 blur-xl"
            style={{ background: accent }}
          />
        </div>
      )}

      {overlay && (
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/75 via-charcoal/10 to-transparent" />
      )}
      {/* film grain unifies disparate photos into one cohesive look */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay bg-[url('data:image/svg+xml,%3Csvg%20viewBox=%270%200%20200%20200%27%20xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter%20id=%27n%27%3E%3CfeTurbulence%20type=%27fractalNoise%27%20baseFrequency=%270.8%27%20numOctaves=%274%27/%3E%3C/filter%3E%3Crect%20width=%27100%25%27%20height=%27100%25%27%20filter=%27url(%23n)%27/%3E%3C/svg%3E')]" />
    </div>
  );
}
