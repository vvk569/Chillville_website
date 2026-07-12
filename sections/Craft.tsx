"use client";

import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { craftSteps } from "@/lib/data";

const CraftCanvas = dynamic(() => import("@/components/three/CraftCanvas"), {
  ssr: false,
});

export function Craft() {
  const root = useRef<HTMLDivElement>(null);
  const progress = useRef(0);
  const [active, setActive] = useState(0);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: root.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          progress.current = self.progress;
          setActive(
            Math.min(
              craftSteps.length - 1,
              Math.floor(self.progress * craftSteps.length)
            )
          );
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="craft" ref={root} className="relative h-[320vh] bg-charcoal">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <CraftCanvas progress={progress} />
        </div>
        <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-charcoal via-charcoal/20 to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-content px-6 sm:px-10">
          <span className="mb-8 inline-block text-[11px] uppercase tracking-luxe text-caramel">
            The Craft
          </span>

          <div className="relative h-56 max-w-lg">
            {craftSteps.map((s, i) => (
              <div
                key={s.no}
                className="absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  opacity: active === i ? 1 : 0,
                  transform: `translateY(${active === i ? 0 : 28}px)`,
                }}
              >
                <div className="font-display text-sm text-caramel/70">{s.no}</div>
                <h3 className="mt-3 font-display text-4xl leading-tight text-cream sm:text-5xl">
                  {s.title}
                </h3>
                <p className="mt-5 text-lg leading-relaxed text-cream/60">{s.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex gap-2">
            {craftSteps.map((_, i) => (
              <span
                key={i}
                className="h-[3px] rounded-full transition-all duration-500"
                style={{
                  width: active === i ? 44 : 18,
                  background: active === i ? "#c9a26b" : "rgba(242,232,216,0.18)",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
