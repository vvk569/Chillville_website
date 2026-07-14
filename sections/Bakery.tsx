"use client";

import { collection } from "@/lib/data";
import { IMG, IMG_ACCENT } from "@/lib/images";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { ProductVisual } from "@/components/three/ProductVisual";
import type { RecipeKey } from "@/components/three/recipes";

// map collection items to their assembly recipes
const recipeFor: Record<string, RecipeKey> = {
  donuts: "donut",
  croissants: "croissant",
  dubai: "dubai",
};

export function Bakery() {
  return (
    <section id="collection" className="relative overflow-hidden bg-charcoal-800 py-28 sm:py-40">
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[50vh] w-[50vh] -translate-x-1/2 rounded-full bg-caramel/[0.05] blur-[150px]" />

      <div className="relative mx-auto max-w-content px-6 sm:px-10">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <Reveal>
              <span className="text-[11px] uppercase tracking-luxe text-coral">From the Bakery</span>
            </Reveal>
            <Heading text={"Laminated,\nfried & tempered."} className="mt-6 text-5xl sm:text-6xl" />
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-xs text-sm leading-relaxed text-cream/50">
              Three more obsessions — each one built from scratch, right in front
              of you.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
          {collection.filter((c) => c.id !== "dubai").map((c) => (
            <Reveal key={c.id} variant="blur">
              <div
                className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] border border-white/10 shadow-card"
                style={{ background: `radial-gradient(circle at 50% 28%, ${c.accent}22, #0b0a08 78%)` }}
              >
                <ProductVisual
                  recipe={recipeFor[c.id]}
                  sources={IMG[c.id as keyof typeof IMG] ?? []}
                  accent={IMG_ACCENT[c.id as keyof typeof IMG]}
                  alt={c.name}
                />

                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-charcoal-800 via-charcoal-800/70 to-transparent p-7 pt-20">
                  <span className="font-display text-sm text-cream/40">{c.index}</span>
                  <h3 className="mt-1 font-display text-3xl font-bold text-cream">{c.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-cream/55">{c.detail}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
