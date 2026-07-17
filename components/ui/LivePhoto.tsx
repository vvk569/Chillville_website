"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  /** Candidate looping video URLs, tried first. */
  video?: readonly string[];
  /** Candidate image URLs, used if no video loads. */
  image: readonly string[];
  alt: string;
  /** Apply a slow cinematic "living photo" zoom to the still image. */
  live?: boolean;
  accent?: string;
  className?: string;
};

/**
 * Shows a looping product video if one exists, otherwise the still photo (with
 * an optional slow "living" zoom so a still still feels alive), otherwise a
 * branded gradient. Resolution is preloaded so there's no flicker.
 */
export function LivePhoto({ video, image, alt, live = true, accent = "#8fce74", className }: Props) {
  const [vid, setVid] = useState<string | null | undefined>(video && video.length ? undefined : null);
  const [img, setImg] = useState<string | null | undefined>(undefined);

  // 1) probe for a playable video
  useEffect(() => {
    let cancelled = false;
    if (!video || video.length === 0) {
      setVid(null);
      return;
    }
    (async () => {
      for (const src of video) {
        const ok = await new Promise<boolean>((res) => {
          const v = document.createElement("video");
          v.muted = true;
          v.preload = "auto";
          v.onloadeddata = () => res(true);
          v.onerror = () => res(false);
          v.src = src;
        });
        if (cancelled) return;
        if (ok) {
          setVid(src);
          return;
        }
      }
      if (!cancelled) setVid(null);
    })();
    return () => {
      cancelled = true;
    };
  }, [video]);

  // 2) if no video, probe for an image
  useEffect(() => {
    let cancelled = false;
    if (vid === undefined || vid) return; // still checking video, or video won
    if (!image || image.length === 0) {
      setImg(null);
      return;
    }
    (async () => {
      for (const src of image) {
        const ok = await new Promise<boolean>((res) => {
          const im = new Image();
          im.onload = () => res(true);
          im.onerror = () => res(false);
          im.src = src;
        });
        if (cancelled) return;
        if (ok) {
          setImg(src);
          return;
        }
      }
      if (!cancelled) setImg(null);
    })();
    return () => {
      cancelled = true;
    };
  }, [vid, image]);

  if (vid) {
    return (
      <video
        src={vid}
        autoPlay
        loop
        muted
        playsInline
        className={cn("h-full w-full object-cover", className)}
      />
    );
  }

  if (img) {
    return (
      <img
        src={img}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={cn("h-full w-full object-cover", live && "live-zoom", className)}
      />
    );
  }

  // still checking, or nothing available → soft gradient
  return (
    <div
      className={cn("h-full w-full", className)}
      style={{ background: `radial-gradient(circle at 50% 30%, ${accent}22, #0f0d0a 80%)` }}
    />
  );
}
