"use client";

import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { IMG, IMG_ACCENT, VIDEO } from "@/lib/images";
import { LivePhoto } from "@/components/ui/LivePhoto";

const DubaiStoryCanvas = dynamic(() => import("@/components/three/DubaiStoryCanvas"), { ssr: false });

const acts = [
  { no: "01", title: "The kunafa", body: "Crisp kunafa pastry, shredded fine and toasted golden." },
  { no: "02", title: "Pistachio, ground smooth", body: "Roasted pistachios milled down into a silk-smooth paste." },
  { no: "03", title: "Enrobed in couverture", body: "Single-origin chocolate poured and looped over the top." },
  { no: "04", title: "The Dubai bar", body: "Sealed, set, and finished with pistachio and 24k gold." },
];

export function DubaiStory() {
  const root = useRef<HTMLDivElement>(null);
  const progress = useRef(0);
  const photo = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: root.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress;
          progress.current = p;
          const idx = p < 0.26 ? 0 : p < 0.5 ? 1 : p < 0.76 ? 2 : 3;
          setActive(idx);
          // cross-dissolve to the real photo at the very end
          if (photo.current) {
            photo.current.style.opacity = String(Math.min(1, Math.max(0, (p - 0.9) / 0.1)));
          }
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="dubai" ref={root} className="relative h-[420vh] bg-charcoal">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        {/* 3D sequence */}
        <div className="absolute inset-0 z-0">
          <DubaiStoryCanvas progress={progress} />
        </div>

        {/* cross-dissolve to the real kunafa video/photo */}
        <div ref={photo} className="pointer-events-none absolute inset-0 z-[2] overflow-hidden opacity-0" style={{ transition: "opacity 0.1s linear" }}>
          <LivePhoto
            video={VIDEO.dubai}
            image={IMG.dubai}
            accent={IMG_ACCENT.dubai}
            alt="Dubai pistachio-kunafa chocolate bar"
            className="absolute inset-0"
          />
          {/* legibility scrim over the media */}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/75 via-charcoal/10 to-transparent" />
        </div>

        <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-charcoal via-charcoal/10 to-transparent" />

        {/* narration */}
        <div className="relative z-10 mx-auto w-full max-w-content px-6 sm:px-10">
          <span className="mb-8 inline-block text-[11px] uppercase tracking-luxe text-matcha">
            The Dubai Bar · Made from scratch
          </span>
          <div className="relative h-52 max-w-lg">
            {acts.map((a, i) => (
              <div
                key={a.no}
                className="absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{ opacity: active === i ? 1 : 0, transform: `translateY(${active === i ? 0 : 26}px)` }}
              >
                <div className="font-display text-sm text-caramel/70">{a.no}</div>
                <h3 className="mt-3 font-display text-4xl font-bold leading-tight text-cream sm:text-5xl">{a.title}</h3>
                <p className="mt-5 text-lg leading-relaxed text-cream/60">{a.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex gap-2">
            {acts.map((_, i) => (
              <span
                key={i}
                className="h-[3px] rounded-full transition-all duration-500"
                style={{ width: active === i ? 44 : 18, background: active === i ? "#8fce74" : "rgba(242,232,216,0.18)" }}
              />
            ))}
          </div>

          <p className="mt-10 text-xs uppercase tracking-luxe text-cream/30">Scroll to watch it come together</p>
        </div>
      </div>
    </section>
  );
}
