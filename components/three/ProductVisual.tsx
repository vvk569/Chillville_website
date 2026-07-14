"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { Photo } from "@/components/ui/Photo";
import type { RecipeKey } from "@/components/three/recipes";

const AssembleProduct = dynamic(() => import("@/components/three/AssembleProduct"), { ssr: false });

type Props = {
  recipe: RecipeKey;
  /** Real photo URLs/paths. If empty (or all fail) the 3D assembly is shown. */
  sources: readonly string[];
  accent?: string;
  alt: string;
  overlay?: boolean;
};

/**
 * Shows a real product photo when one is provided (and loads), otherwise falls
 * back to the procedural 3D ingredient-assembly. Drop a file in /public/images
 * and point lib/images.ts at it to swap any product to a real photo — no other
 * changes needed.
 */
export function ProductVisual({ recipe, sources, accent, alt, overlay = false }: Props) {
  const [failed, setFailed] = useState(false);

  if (sources.length > 0 && !failed) {
    return (
      <Photo
        sources={sources}
        accent={accent}
        alt={alt}
        overlay={overlay}
        className="absolute inset-0 h-full w-full"
        imgClassName="hover:scale-[1.05]"
        onExhausted={() => setFailed(true)}
      />
    );
  }

  return <AssembleProduct recipe={recipe} />;
}
