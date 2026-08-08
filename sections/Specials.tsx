"use client";

import { dubai } from "@/lib/data";
import { IMG, IMG_ACCENT, VIDEO } from "@/lib/images";
import { SignatureShowcase } from "@/components/ui/SignatureShowcase";
import { LivePhoto } from "@/components/ui/LivePhoto";

export function Specials() {
  return (
    <SignatureShowcase
      id="dubai"
      index="03"
      eyebrow={dubai.eyebrow}
      title={dubai.title}
      body={dubai.body}
      notes={dubai.notes}
      price={dubai.price}
      accent={IMG_ACCENT.dubai}
      watermark="Dubai"
      bg="bg-charcoal"
      media={
        <LivePhoto
          video={VIDEO.dubai}
          image={IMG.dubai}
          accent={IMG_ACCENT.dubai}
          alt="Dubai pistachio-kunafa chocolate bar"
          className="absolute inset-0"
        />
      }
    />
  );
}
