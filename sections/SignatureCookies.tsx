"use client";

import { cookies } from "@/lib/data";
import { IMG, IMG_ACCENT } from "@/lib/images";
import { SignatureShowcase } from "@/components/ui/SignatureShowcase";
import { ProductVisual } from "@/components/three/ProductVisual";

export function SignatureCookies() {
  return (
    <SignatureShowcase
      id="cookies"
      index="02"
      eyebrow={cookies.eyebrow}
      title={cookies.title}
      body={cookies.body}
      notes={cookies.notes}
      price={cookies.price}
      accent={IMG_ACCENT.cookies}
      watermark="Cookies"
      bg="bg-charcoal-800"
      reverse
      media={
        <ProductVisual
          recipe="cookie"
          sources={IMG.cookies}
          accent={IMG_ACCENT.cookies}
          alt="Molten chocolate-chip cookies"
        />
      }
    />
  );
}
