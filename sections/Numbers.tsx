"use client";

import { useRef } from "react";
import type { IconType } from "react-icons";
import { PiOvenLight } from "react-icons/pi";
import { IoPeopleOutline } from "react-icons/io5";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";

type Card = {
  value: number;
  suffix: string;
  label: string;
  desc: string;
  Icon: IconType;
  /** 100% carries the coral→caramel gradient; 5★ stays solid gold. */
  gradient?: boolean;
};

const cards: Card[] = [
  {
    value: 100,
    suffix: "%",
    label: "Baked fresh daily",
    desc: "Every item is baked fresh every day using premium ingredients for unmatched taste.",
    Icon: PiOvenLight,
    gradient: true,
  },
  {
    value: 5,
    suffix: "★",
    label: "Guest rating",
    desc: "Loved by thousands of customers for our quality, taste, and experience.",
    Icon: IoPeopleOutline,
  },
];

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

        <div className="mt-12 grid grid-cols-1 gap-5 sm:gap-6 md:mt-16 md:grid-cols-2">
          {cards.map((c, i) => (
            <Reveal key={c.label} delay={i * 0.1} className="h-full">
              <div className="flex h-full items-center gap-6 rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-8 transition-transform duration-500 ease-expo hover:-translate-y-1 sm:p-10">
                <div className="min-w-0 flex-1">
                  <div
                    className={`flex items-start font-display text-6xl font-bold leading-none sm:text-7xl ${
                      c.gradient
                        ? "bg-gradient-to-br from-[#ff7a59] to-[#e3ab6b] bg-clip-text text-transparent"
                        : "text-caramel"
                    }`}
                  >
                    <span data-count={c.value}>0</span>
                    <span>{c.suffix}</span>
                  </div>
                  <p className="mt-5 text-xs font-medium uppercase tracking-wide2 text-cream/45">
                    {c.label}
                  </p>
                  <p className="mt-3 max-w-xs text-sm leading-relaxed text-cream/60">{c.desc}</p>
                </div>
                <c.Icon aria-hidden className="shrink-0 text-caramel/55" size={72} />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
