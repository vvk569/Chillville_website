"use client";

import { boba } from "@/lib/data";
import { IMG, IMG_ACCENT } from "@/lib/images";
import { SignatureShowcase } from "@/components/ui/SignatureShowcase";
import { ProductVisual } from "@/components/three/ProductVisual";

export function SignatureBoba() {
  return (
    <SignatureShowcase
      id="boba"
      index="01"
      eyebrow={boba.eyebrow}
      title={boba.title}
      body={boba.body}
      notes={boba.notes}
      price={boba.price}
      accent={IMG_ACCENT.boba}
      watermark="Boba"
      bg="bg-charcoal"
      media={
        <ProductVisual
          recipe="boba"
          sources={IMG.boba}
          accent={IMG_ACCENT.boba}
          alt="Brown-sugar boba"
        />
      }
    />
  );
}
