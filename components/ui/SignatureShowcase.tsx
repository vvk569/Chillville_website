"use client";

import { ReactNode, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";

type Note = { k: string; v: string };

type Props = {
  id: string;
  /** Sequence label, e.g. "01". */
  index: string;
  eyebrow: string;
  /** Use "\n" to break the display title into revealed lines. */
  title: string;
  body: string;
  notes: Note[];
  price?: string;
  priceLabel?: string;
  /** Per-product tint used for the index, hairline, glow and price. */
  accent: string;
  /** Oversized faint product name set behind the frame. */
  watermark: string;
  /** The visual — fills an absolutely-positioned frame. */
  media: ReactNode;
  /** When true, the image sits on the left (copy on the right) at lg+. */
  reverse?: boolean;
  bg?: string;
};

/**
 * The flagship product treatment: a large editorial frame paired with a
 * numbered, spec-driven copy column. Shared by Boba, Cookies and the Dubai
 * special so the three read as one premium, intentional set.
 */
export function SignatureShowcase({
  id,
  index,
  eyebrow,
  title,
  body,
  notes,
  price,
  priceLabel = "From",
  accent,
  watermark,
  media,
  reverse = false,
  bg = "bg-charcoal",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yGhost = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);

  return (
    <section id={id} ref={ref} className={`relative overflow-hidden ${bg} py-20 sm:py-28`}>
      {/* oversized faint product name */}
      <motion.span
        style={{ y: yGhost }}
        aria-hidden
        className={`pointer-events-none absolute top-10 select-none font-display text-[22vw] font-bold leading-none text-white/[0.022] ${
          reverse ? "left-[-4%]" : "right-[-4%]"
        }`}
      >
        {watermark}
      </motion.span>

      {/* ambient product-accent glow */}
      <div
        className="pointer-events-none absolute top-1/3 h-[46vh] w-[46vh] rounded-full blur-[150px]"
        style={{ background: `${accent}1f`, [reverse ? "right" : "left"]: "-8%" } as React.CSSProperties}
      />

      <div className="relative mx-auto grid max-w-content grid-cols-1 items-center gap-12 px-6 sm:px-10 lg:grid-cols-2 lg:gap-16">
        {/* media */}
        <Reveal variant="blur" className={reverse ? "lg:order-2" : "lg:order-1"}>
          <div
            className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.75rem] border border-white/10 shadow-card"
            style={{ background: `radial-gradient(circle at 50% 30%, ${accent}1f, #0b0a08 80%)` }}
          >
            {media}
            <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] ring-1 ring-inset ring-white/[0.06]" />
          </div>
        </Reveal>

        {/* copy */}
        <div className={reverse ? "lg:order-1" : "lg:order-2"}>
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="font-display text-sm font-semibold" style={{ color: accent }}>
                {index}
              </span>
              <span className="h-px w-10" style={{ background: `${accent}66` }} />
              <span className="text-[11px] uppercase tracking-luxe text-caramel">{eyebrow}</span>
            </div>
          </Reveal>

          <Heading text={title} className="mt-6 text-5xl sm:text-6xl md:text-[3.8rem]" />

          <Reveal delay={0.08}>
            <p className="mt-7 max-w-md text-pretty leading-relaxed text-cream/60">{body}</p>
          </Reveal>

          <div className="mt-9 divide-y divide-white/10 border-y border-white/10">
            {notes.map((n, i) => (
              <Reveal key={n.k} delay={0.08 + i * 0.06}>
                <div className="flex items-center justify-between py-3.5">
                  <span className="text-[11px] uppercase tracking-wide2 text-cream/40">{n.k}</span>
                  <span className="text-sm text-cream">{n.v}</span>
                </div>
              </Reveal>
            ))}
          </div>

          {price && (
            <Reveal delay={0.14}>
              <div className="mt-9 flex items-baseline gap-3">
                <span className="text-[11px] uppercase tracking-luxe text-cream/40">{priceLabel}</span>
                <span className="font-display text-4xl font-bold text-caramel">${price}</span>
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
