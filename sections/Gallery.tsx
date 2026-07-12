"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { lineup } from "@/lib/data";

/**
 * A pinned, horizontally-scrolling menu gallery. Vertical scroll drives the
 * track sideways, introducing a fresh spatial rhythm mid-page.
 */
export function Gallery() {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const el = track.current!;
      const distance = () => el.scrollWidth - window.innerWidth;

      const tween = gsap.to(el, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          pin: true,
          scrub: 1,
          end: () => "+=" + distance(),
          invalidateOnRefresh: true,
        },
      });

      // subtle parallax on each panel's caption as it crosses the viewport
      gsap.utils.toArray<HTMLElement>(".panel-caption").forEach((cap) => {
        gsap.fromTo(
          cap,
          { y: 40 },
          {
            y: -40,
            ease: "none",
            scrollTrigger: {
              trigger: cap,
              containerAnimation: tween,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          }
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative overflow-hidden bg-charcoal-800">
      {/* heading rail */}
      <div className="pointer-events-none absolute left-6 top-10 z-10 sm:left-10">
        <span className="text-[11px] uppercase tracking-luxe text-caramel">The Menu</span>
      </div>

      <div ref={track} className="flex h-screen items-center gap-6 pl-6 pr-[10vw] sm:gap-10 sm:pl-10">
        {/* intro panel */}
        <div className="flex h-[62vh] w-[78vw] shrink-0 flex-col justify-end sm:w-[42vw]">
          <h2 className="font-display text-5xl leading-[0.95] text-cream sm:text-7xl">
            The full
            <br />
            <span className="italic text-caramel">lineup.</span>
          </h2>
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-cream/50">
            Five crafts, one obsession. Scroll sideways through the collection.
          </p>
        </div>

        {lineup.map((item) => (
          <article
            key={item.id}
            className="group relative flex h-[62vh] w-[80vw] shrink-0 overflow-hidden rounded-[2rem] border border-white/10 sm:w-[34vw]"
            style={{
              background: `radial-gradient(120% 80% at 50% 0%, ${item.accent}2e, transparent 60%), linear-gradient(180deg,#161009,#0a0a0a)`,
            }}
          >
            {/* index watermark */}
            <span className="pointer-events-none absolute -right-4 -top-6 select-none font-display text-[10rem] leading-none text-white/[0.04]">
              {item.index}
            </span>

            <div className="panel-caption relative z-10 mt-auto p-8">
              <span
                className="text-[10px] uppercase tracking-luxe"
                style={{ color: item.accent }}
              >
                {item.tag}
              </span>
              <h3 className="mt-3 font-display text-4xl text-cream sm:text-5xl">
                {item.name}
              </h3>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/55">
                {item.note}
              </p>
            </div>

            {/* hover sheen */}
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
              <div className="absolute -inset-x-1/2 top-0 h-full w-1/3 -skew-x-12 bg-white/[0.04] blur-2xl" />
            </div>
          </article>
        ))}

        {/* end cue */}
        <div className="flex h-[62vh] w-[60vw] shrink-0 items-center sm:w-[24vw]">
          <a
            href="#visit"
            className="group flex items-center gap-3 font-display text-3xl text-cream sm:text-4xl"
          >
            <span className="italic text-caramel">Taste it</span>
            <span className="transition-transform duration-500 group-hover:translate-x-2">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
