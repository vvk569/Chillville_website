"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Photo } from "@/components/ui/Photo";
import type { RecipeKey } from "@/components/three/recipes";

const AssembleProduct = dynamic(() => import("@/components/three/AssembleProduct"), { ssr: false });

type Props = {
  recipe: RecipeKey;
  /** Candidate photo URLs/paths. The first that actually loads is used;
   * if none load, the 3D ingredient-assembly is shown. */
  sources: readonly string[];
  accent?: string;
  alt: string;
  overlay?: boolean;
};

/**
 * Resolves a real product photo without flashing: it preloads the candidate
 * sources and only swaps to the photo once one confirms it exists. Until then
 * (and if none exist) it shows the 3D ingredient-assembly.
 */
export function ProductVisual({ recipe, sources, accent = "#c9a26b", alt, overlay = false }: Props) {
  // undefined = still checking, null = no photo, string = the photo to use
  const [resolved, setResolved] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;
    if (!sources || sources.length === 0) {
      setResolved(null);
      return;
    }
    (async () => {
      for (const src of sources) {
        const ok = await new Promise<boolean>((res) => {
          const im = new Image();
          im.onload = () => res(true);
          im.onerror = () => res(false);
          im.src = src;
        });
        if (cancelled) return;
        if (ok) {
          setResolved(src);
          return;
        }
      }
      if (!cancelled) setResolved(null);
    })();
    return () => {
      cancelled = true;
    };
  }, [sources]);

  // while checking: soft branded placeholder (no 3D mount, no flicker)
  if (resolved === undefined) {
    return (
      <div
        className="absolute inset-0"
        style={{ background: `radial-gradient(circle at 50% 30%, ${accent}22, #0f0d0a 80%)` }}
      />
    );
  }

  if (resolved) {
    return (
      <Photo
        sources={[resolved]}
        accent={accent}
        alt={alt}
        overlay={overlay}
        className="absolute inset-0 h-full w-full"
        imgClassName="hover:scale-[1.05]"
      />
    );
  }

  return <AssembleProduct recipe={recipe} />;
}
