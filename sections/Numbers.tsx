"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { stats } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";

// playful per-stat accent colors
const COLORS = ["#ff7a59", "#8fce74", "#e3ab6b", "#7c6cff"];

export function Numbers() {
  const root = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const end = Number(el.dataset.count);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: end,
          duration: 2.2,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
          onUpdate: () => (el.textContent = Math.round(obj.v).toString()),
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative bg-sand py-28 text-charcoal sm:py-36">
      <div className="mx-auto max-w-content px-6 sm:px-10">
        <div className="max-w-3xl">
          <Reveal>
            <span className="text-[11px] uppercase tracking-luxe text-coral">
              Why Chillville
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 font-display text-4xl font-bold leading-[1.02] tracking-tight text-charcoal sm:text-6xl">
              Small batch.
              <br />
              Big obsession.
            </h2>
          </Reveal>
        </div>

        <div className="mt-20 grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="rounded-3xl border border-charcoal/10 bg-white/50 p-7 transition-transform duration-500 ease-expo hover:-translate-y-1">
                <div
                  className="flex items-start font-display text-6xl font-bold sm:text-7xl"
                  style={{ color: COLORS[i % COLORS.length] }}
                >
                  <span data-count={s.value}>0</span>
                  <span>{s.suffix}</span>
                </div>
                <p className="mt-4 text-xs font-medium uppercase tracking-wide2 text-charcoal/55">
                  {s.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
