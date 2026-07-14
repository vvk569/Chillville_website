"use client";

import { useRef } from "react";
import { cookies } from "@/lib/data";
import { IMG, IMG_ACCENT } from "@/lib/images";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { ProductVisual } from "@/components/three/ProductVisual";

export function SignatureCookies() {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <section id="cookies" ref={ref} className="relative overflow-hidden bg-charcoal-800 py-28 sm:py-40">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-chocolate/25 to-transparent" />

      <div className="mx-auto grid max-w-content grid-cols-1 items-center gap-16 px-6 sm:px-10 lg:grid-cols-12">
        {/* assembling 3D product */}
        <Reveal variant="blur" className="lg:col-span-6">
          <div className="relative aspect-[5/4] w-full overflow-hidden rounded-[2rem] border border-white/10 shadow-card bg-[radial-gradient(circle_at_50%_35%,#211711,#0b0a08)]">
            <div className="pointer-events-none absolute left-1/2 top-1/3 h-40 w-40 -translate-x-1/2 rounded-full bg-coral/15 blur-3xl" />
            <ProductVisual recipe="cookie" sources={IMG.cookies} accent={IMG_ACCENT.cookies} alt="Molten chocolate-chip cookies" />
            <div className="absolute bottom-5 left-5 z-10 rounded-full border border-white/15 bg-black/40 px-4 py-2 text-[11px] uppercase tracking-luxe text-cream/80 backdrop-blur">
              Watch it come together · ${cookies.price}
            </div>
          </div>
        </Reveal>

        {/* copy */}
        <div className="lg:col-span-6 lg:pl-10">
          <Reveal>
            <span className="text-[11px] uppercase tracking-luxe text-caramel">{cookies.eyebrow}</span>
          </Reveal>
          <Heading text={cookies.title} className="mt-6 text-5xl sm:text-6xl md:text-7xl" />
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-md text-pretty leading-relaxed text-cream/60">{cookies.body}</p>
          </Reveal>

          <div className="mt-10 flex flex-wrap gap-3">
            {cookies.notes.map((n, i) => (
              <Reveal key={n.k} delay={0.1 + i * 0.08}>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4">
                  <div className="text-[10px] uppercase tracking-wide2 text-cream/40">{n.k}</div>
                  <div className="mt-1 text-sm text-cream">{n.v}</div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="mt-10 flex items-baseline gap-3">
              <span className="text-[11px] uppercase tracking-luxe text-cream/40">From</span>
              <span className="font-display text-4xl font-bold text-caramel">${cookies.price}</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
