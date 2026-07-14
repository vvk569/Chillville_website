"use client";

import dynamic from "next/dynamic";
import { iceCream, shake } from "@/lib/data";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import type { RecipeKey } from "@/components/three/recipes";

const AssembleProduct = dynamic(() => import("@/components/three/AssembleProduct"), { ssr: false });

const cards: { data: typeof iceCream; recipe: RecipeKey; glow: string }[] = [
  { data: iceCream, recipe: "iceCream", glow: "bg-matcha/15" },
  { data: shake, recipe: "shake", glow: "bg-coral/15" },
];

export function Frozen() {
  return (
    <section id="frozen" className="relative overflow-hidden bg-charcoal py-28 sm:py-40">
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[50vh] w-[50vh] -translate-x-1/2 rounded-full bg-matcha/[0.05] blur-[150px]" />

      <div className="relative mx-auto max-w-content px-6 sm:px-10">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <Reveal>
              <span className="text-[11px] uppercase tracking-luxe text-coral">Cold Case</span>
            </Reveal>
            <Heading text={"Ice cream &\nloaded shakes."} className="mt-6 text-5xl sm:text-6xl" />
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-xs text-sm leading-relaxed text-cream/50">
              Churned in-house, blended thick, and finished with the bakery — built
              in front of you.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
          {cards.map(({ data, recipe, glow }) => (
            <Reveal key={data.title} variant="blur">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] border border-white/10 shadow-card bg-[radial-gradient(circle_at_50%_30%,#181510,#0a0908)]">
                <div className={`pointer-events-none absolute left-1/2 top-1/4 h-44 w-44 -translate-x-1/2 rounded-full blur-3xl ${glow}`} />
                <AssembleProduct recipe={recipe} />

                {/* scrim + copy */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-charcoal via-charcoal/70 to-transparent p-7 pt-24">
                  <span className="text-[10px] uppercase tracking-luxe text-caramel">{data.eyebrow}</span>
                  <h3 className="mt-2 font-display text-3xl font-bold leading-tight text-cream sm:text-4xl">
                    {data.title.split("\n").map((l, i) => (
                      <span key={i} className="block">{l}</span>
                    ))}
                  </h3>
                  <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
                    {data.notes.map((n) => (
                      <span key={n.k} className="text-[11px] uppercase tracking-wide2 text-cream/50">{n.v}</span>
                    ))}
                    <span className="font-display text-2xl font-bold text-caramel">${data.price}</span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
