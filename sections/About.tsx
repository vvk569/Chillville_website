"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { about } from "@/lib/data";

const statement =
  "We treat everyday indulgence like couture. Every pour, every crumb, every layer is considered — until the ordinary feels rare.";

export function About() {
  const root = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // words illuminate once, in a soft cascade — reliable, not scrubbed
      gsap.to(".manifesto-word", {
        opacity: 1,
        duration: 0.9,
        stagger: 0.06,
        ease: "power2.out",
        scrollTrigger: { trigger: root.current, start: "top 62%" },
      });

      // background gradient slowly warms as you pass through
      gsap.fromTo(
        root.current,
        { backgroundColor: "#0a0a0a" },
        {
          backgroundColor: "#140f09",
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top bottom",
            end: "center center",
            scrub: true,
          },
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={root}
      className="relative flex flex-col items-center justify-center py-24 sm:py-32"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-caramel/[0.06] blur-[140px]" />
      <div className="relative mx-auto max-w-5xl px-6 text-center sm:px-10">
        <span className="mb-10 inline-block text-[11px] uppercase tracking-luxe text-caramel">
          {about.eyebrow}
        </span>
        <p className="font-display text-3xl leading-[1.25] text-cream sm:text-5xl md:text-[3.4rem] md:leading-[1.2]">
          {statement.split(" ").map((w, i) => (
            <span key={i} className="manifesto-word inline-block opacity-15">
              {w}&nbsp;
            </span>
          ))}
        </p>
        <p className="relative mx-auto mt-10 max-w-xl text-pretty text-sm leading-relaxed text-cream/50 sm:text-base">
          {about.lead}
        </p>
      </div>
    </section>
  );
}
