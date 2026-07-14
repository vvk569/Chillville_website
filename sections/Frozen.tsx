"use client";

import { iceCream, shake } from "@/lib/data";
import { IMG, IMG_ACCENT } from "@/lib/images";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { Photo } from "@/components/ui/Photo";
import { Tilt3D } from "@/components/ui/Tilt3D";

const cards = [
  { data: iceCream, sources: IMG.iceCream, accent: IMG_ACCENT.iceCream },
  { data: shake, sources: IMG.shake, accent: IMG_ACCENT.shake },
];

export function Frozen() {
  return (
    <section id="frozen" className="relative overflow-hidden bg-charcoal py-28 sm:py-40">
      <div className="pointer-events-none absolute left-1/2 top-1/3 -z-0 h-[50vh] w-[50vh] -translate-x-1/2 rounded-full bg-caramel/[0.06] blur-[150px]" />

      <div className="relative mx-auto max-w-content px-6 sm:px-10">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <Reveal>
              <span className="text-[11px] uppercase tracking-luxe text-caramel">
                Cold Case
              </span>
            </Reveal>
            <Heading text={"Ice cream &\nloaded shakes."} className="mt-6 text-5xl sm:text-6xl" />
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-xs text-sm leading-relaxed text-cream/50">
              Churned in-house, blended thick, and finished with the bakery — the
              coldest way to end a visit.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
          {cards.map(({ data, sources, accent }) => (
            <Reveal key={data.title} variant="blur">
              <Tilt3D className="group aspect-[4/5] w-full overflow-hidden rounded-[2rem] border border-white/10 shadow-card">
                <Photo
                  sources={sources}
                  accent={accent}
                  alt={data.title.replace("\n", " ")}
                  className="absolute inset-0 h-full w-full"
                  imgClassName="group-hover:scale-[1.05]"
                />

                {/* copy overlaid on the photo */}
                <div className="absolute inset-x-0 bottom-0 z-10 p-7 [transform:translateZ(50px)]">
                  <span className="text-[10px] uppercase tracking-luxe text-caramel">
                    {data.eyebrow}
                  </span>
                  <h3 className="mt-2 font-display text-3xl leading-tight text-cream sm:text-4xl">
                    {data.title.split("\n").map((l, i) => (
                      <span key={i} className="block">
                        {l}
                      </span>
                    ))}
                  </h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-cream/70">
                    {data.body}
                  </p>
                  <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
                    {data.notes.map((n) => (
                      <span key={n.k} className="text-[11px] uppercase tracking-wide2 text-cream/50">
                        {n.v}
                      </span>
                    ))}
                    <span className="font-display text-2xl text-caramel">${data.price}</span>
                  </div>
                </div>
              </Tilt3D>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
