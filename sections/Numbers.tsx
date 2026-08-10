"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { stats } from "@/lib/data";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";

// a restrained echo of the hero's coral → caramel → matcha gradient
const COLORS = ["#ff7a59", "#e3ab6b", "#8fce74", "#e3ab6b"];

export function Numbers() {
  const root = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const end = Number(el.dataset.count);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: end,
          duration: 1.8,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
          onUpdate: () => (el.textContent = Math.round(obj.v).toString()),
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative overflow-hidden bg-charcoal-800 py-20 sm:py-28">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[46vh] w-[46vh] -translate-x-1/2 rounded-full bg-caramel/[0.05] blur-[150px]" />

      <div className="relative mx-auto max-w-content px-6 sm:px-10">
        <div className="max-w-3xl">
          <Reveal>
            <span className="text-[11px] uppercase tracking-luxe text-caramel">
              Why Chillville
            </span>
          </Reveal>
          <Heading text={"Small batch.\nBig obsession."} className="mt-6 text-4xl sm:text-6xl" />
        </div>

        <div className="mt-12 grid grid-cols-2 gap-5 sm:gap-6 md:mt-16 md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-7 transition-transform duration-500 ease-expo hover:-translate-y-1">
                <div
                  className="flex items-start font-display text-6xl font-bold sm:text-7xl"
                  style={{ color: COLORS[i % COLORS.length] }}
                >
                  <span data-count={s.value}>0</span>
                  <span>{s.suffix}</span>
                </div>
                <p className="mt-4 text-xs font-medium uppercase tracking-wide2 text-cream/45">
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
