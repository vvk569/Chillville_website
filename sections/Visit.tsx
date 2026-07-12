"use client";

import { FiMapPin, FiPhone, FiClock } from "react-icons/fi";
import { store } from "@/lib/data";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function Visit() {
  return (
    <section id="visit" className="relative bg-charcoal-800 py-28 sm:py-40">
      <div className="mx-auto max-w-content px-6 sm:px-10">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-20">
          {/* storefront / map panel */}
          <Reveal variant="blur">
            <div
              className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10 sm:aspect-[4/3] lg:aspect-[4/5]"
              style={{
                background:
                  "radial-gradient(90% 70% at 30% 20%, rgba(201,162,107,0.22), transparent 55%), linear-gradient(160deg,#1a140d,#0a0a0a 75%)",
              }}
            >
              {/* abstract facade */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <span className="font-display text-3xl tracking-wide2 text-cream">
                  Chillville
                </span>
                <span className="text-[10px] uppercase tracking-luxe text-caramel">
                  Flagship · Arts District
                </span>
              </div>
              {/* faux street grid */}
              <div className="absolute inset-0 opacity-[0.06] [background:repeating-linear-gradient(0deg,transparent_0_38px,#f2e8d8_38px_39px),repeating-linear-gradient(90deg,transparent_0_38px,#f2e8d8_38px_39px)]" />
              {/* location pill */}
              <div className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-2xl border border-white/10 bg-black/50 px-5 py-4 backdrop-blur-xl">
                <span className="flex items-center gap-2 text-sm text-cream/80">
                  <FiMapPin className="text-caramel" /> {store.address}
                </span>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] uppercase tracking-wide2 text-caramel"
                >
                  Map
                </a>
              </div>
            </div>
          </Reveal>

          {/* details */}
          <div className="flex flex-col justify-center">
            <Reveal>
              <span className="text-[11px] uppercase tracking-luxe text-caramel">
                Visit the Store
              </span>
            </Reveal>
            <Heading
              text={"Come for the boba.\nStay for the room."}
              className="mt-6 text-4xl sm:text-5xl md:text-6xl"
            />

            <Reveal delay={0.1}>
              <div className="mt-8 space-y-1 text-cream/60">
                <p>{store.address}</p>
                <p>{store.city}</p>
              </div>
            </Reveal>

            <div className="mt-10 border-y border-white/10">
              <div className="flex items-center gap-2 pt-6 text-[11px] uppercase tracking-luxe text-cream/40">
                <FiClock /> Opening Hours
              </div>
              {store.hours.map((h) => (
                <Reveal key={h.day}>
                  <div className="flex items-center justify-between py-3 text-sm">
                    <span className="text-cream/55">{h.day}</span>
                    <span className="text-cream">{h.time}</span>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.15}>
              <div className="mt-10 flex flex-wrap gap-4">
                <MagneticButton href={`tel:${store.phone.replace(/[^+\d]/g, "")}`}>
                  <FiPhone /> {store.phone}
                </MagneticButton>
                <MagneticButton href="https://maps.google.com" variant="outline">
                  Get Directions
                </MagneticButton>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
