"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { stats } from "@/lib/data";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";

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
    <section ref={root} className="relative bg-charcoal-800 py-28 sm:py-36">
      <div className="mx-auto max-w-content px-6 sm:px-10">
        <div className="max-w-3xl">
          <Reveal>
            <span className="text-[11px] uppercase tracking-luxe text-caramel">
              Why Chillville
            </span>
          </Reveal>
          <Heading
            text={"Luxury is just\nrelentless attention."}
            className="mt-6 text-4xl sm:text-6xl"
          />
        </div>

        <div className="mt-20 grid grid-cols-2 gap-x-8 gap-y-14 md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div>
                <div className="flex items-start font-display text-6xl text-cream sm:text-7xl">
                  <span data-count={s.value}>0</span>
                  <span className="text-caramel">{s.suffix}</span>
                </div>
                <div className="mt-4 h-px w-10 bg-caramel/50" />
                <p className="mt-4 text-xs uppercase tracking-wide2 text-cream/45">
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
