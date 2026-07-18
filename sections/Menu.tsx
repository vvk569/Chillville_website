"use client";

import { lineup, boba, cookies, iceCream, shake, menuIntro } from "@/lib/data";
import { IMG } from "@/lib/images";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { Photo } from "@/components/ui/Photo";

const priceById: Record<string, string> = {
  boba: boba.price,
  cookies: cookies.price,
  icecream: iceCream.price,
  shakes: shake.price,
};

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

// render order tuned for visual rhythm, independent of the lineup's data order
const order = ["dubai", "boba", "cookies", "icecream", "shakes", "donuts", "croissants"];
const tiles = order
  .map((id) => lineup.find((i) => i.id === id))
  .filter((i): i is (typeof lineup)[number] => Boolean(i));

export function Menu() {
  return (
    <section id="menu" className="relative overflow-hidden bg-charcoal-800 py-28 sm:py-40">
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[50vh] w-[50vh] -translate-x-1/2 rounded-full bg-caramel/[0.05] blur-[150px]" />

      <div className="relative mx-auto max-w-content px-6 sm:px-10">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <Reveal>
              <span className="text-[11px] uppercase tracking-luxe text-coral">{menuIntro.eyebrow}</span>
            </Reveal>
            <Heading text={menuIntro.title} className="mt-6 text-5xl sm:text-6xl" />
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-xs text-sm leading-relaxed text-cream/50">{menuIntro.body}</p>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-flow-dense auto-rows-[210px] grid-cols-2 gap-4 sm:auto-rows-[260px] sm:grid-cols-4 sm:gap-5">
          {tiles.map((item, i) => {
            const price = priceById[item.id];
            return (
              <Reveal key={item.id} variant="blur" delay={(i % 4) * 0.06} className={spanById[item.id]}>
                <a
                  href="#specials"
                  className="group relative block h-full w-full overflow-hidden rounded-[1.5rem] border border-white/10 shadow-card"
                >
                  <Photo
                    sources={IMG[item.img as keyof typeof IMG]}
                    accent={item.accent}
                    alt={`${item.name} — ${item.tag}`}
                    className="absolute inset-0 h-full w-full"
                    imgClassName="group-hover:scale-[1.06]"
                  />

                  <span className="pointer-events-none absolute -right-2 -top-4 z-10 select-none font-display text-6xl leading-none text-white/10 sm:text-7xl">
                    {item.index}
                  </span>

                  <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 p-5">
                    <span
                      className="text-[9px] uppercase tracking-luxe"
                      style={{ color: item.accent }}
                    >
                      {item.tag}
                    </span>
                    <h3 className="mt-2 font-display text-xl font-bold leading-tight text-cream sm:text-2xl">
                      {item.name}
                    </h3>
                    {price && (
                      <span className="mt-2 block font-display text-sm font-semibold text-caramel">
                        From ${price}
                      </span>
                    )}
                  </div>
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
