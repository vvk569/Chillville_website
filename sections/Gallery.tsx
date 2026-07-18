"use client";

import { lineup } from "@/lib/data";
import { IMG } from "@/lib/images";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { Photo } from "@/components/ui/Photo";

// hand-picked span pattern for a bento-style photo mosaic
const spanById: Record<string, string> = {
  dubai: "col-span-2 row-span-2",
  boba: "col-span-2 row-span-1",
  cookies: "col-span-1 row-span-1",
  icecream: "col-span-1 row-span-1",
  shakes: "col-span-2 row-span-1",
  donuts: "col-span-1 row-span-1",
  croissants: "col-span-1 row-span-1",
};

// render order tuned for visual rhythm, independent of the menu's order
const order = ["dubai", "boba", "cookies", "icecream", "shakes", "donuts", "croissants"];
const tiles = order
  .map((id) => lineup.find((i) => i.id === id))
  .filter((i): i is (typeof lineup)[number] => Boolean(i));

export function Gallery() {
  return (
    <section id="gallery" className="relative overflow-hidden bg-charcoal py-28 sm:py-40">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[50vh] w-[50vh] -translate-x-1/2 rounded-full bg-matcha/[0.05] blur-[150px]" />

      <div className="relative mx-auto max-w-content px-6 sm:px-10">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <Reveal>
              <span className="text-[11px] uppercase tracking-luxe text-caramel">Gallery</span>
            </Reveal>
            <Heading text={"Shot on\nthe pass."} className="mt-6 text-5xl sm:text-6xl" />
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-xs text-sm leading-relaxed text-cream/50">
              A close look at what leaves the counter — no filters, just good
              light and better ingredients.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-flow-dense auto-rows-[150px] grid-cols-2 gap-4 sm:auto-rows-[190px] sm:grid-cols-4 sm:gap-5">
          {tiles.map((item, i) => (
            <Reveal key={item.id} variant="blur" delay={(i % 4) * 0.06} className={spanById[item.id]}>
              <a
                href="#specials"
                className="group relative block h-full w-full overflow-hidden rounded-2xl border border-white/10"
              >
                <Photo
                  sources={IMG[item.img as keyof typeof IMG]}
                  accent={item.accent}
                  alt={`${item.name} — ${item.tag}`}
                  className="absolute inset-0 h-full w-full"
                  imgClassName="group-hover:scale-[1.08]"
                />
                <div className="pointer-events-none absolute bottom-0 left-0 z-10 p-4 sm:p-5">
                  <span
                    className="text-[9px] uppercase tracking-luxe"
                    style={{ color: item.accent }}
                  >
                    {item.tag}
                  </span>
                  <h3 className="mt-1 font-display text-lg font-bold text-cream sm:text-xl">
                    {item.name}
                  </h3>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
