"use client";

import { specialsIntro } from "@/lib/data";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";

/** Shared intro header that sits above the three cinematic showcases. */
export function SignatureSpecialsIntro() {
  return (
    <div className="relative overflow-hidden bg-charcoal pt-28 sm:pt-36">
      <div className="mx-auto max-w-content px-6 text-center sm:px-10">
        <Reveal>
          <span className="text-[11px] uppercase tracking-luxe text-caramel">
            {specialsIntro.eyebrow}
          </span>
        </Reveal>
        <Heading
          text={specialsIntro.title}
          className="mx-auto mt-6 max-w-2xl text-5xl sm:text-6xl md:text-7xl"
        />
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-cream/50">
            {specialsIntro.body}
          </p>
        </Reveal>
      </div>
    </div>
  );
}
