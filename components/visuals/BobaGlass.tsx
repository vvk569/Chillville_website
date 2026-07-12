"use client";

import { cn } from "@/lib/utils";

/**
 * A crafted, art-directed boba glass built purely in CSS — layered milk-tea
 * gradient, tiger-stripe caramel, an oat-milk cap, a pearl cluster and a soft
 * specular highlight. Lightweight and crisp at any size.
 */
export function BobaGlass({ className }: { className?: string }) {
  return (
    <div className={cn("relative aspect-[3/4] w-full max-w-[380px]", className)}>
      {/* ambient glow */}
      <div className="absolute inset-0 rounded-[40%] bg-caramel/20 blur-3xl" />

      {/* glass body */}
      <div className="absolute inset-x-[14%] bottom-[4%] top-[10%] overflow-hidden rounded-b-[2.4rem] rounded-t-2xl border border-white/15 bg-white/[0.04] backdrop-blur-[2px]">
        {/* milk tea */}
        <div className="absolute inset-x-0 bottom-0 top-[22%] bg-gradient-to-b from-[#d7ad76] via-[#c1935f] to-[#7c5533]">
          {/* tiger stripes */}
          <div className="absolute inset-0 opacity-40 [background:repeating-linear-gradient(115deg,transparent_0_10px,rgba(58,36,24,0.55)_10px_16px)]" />
        </div>

        {/* oat-milk cap */}
        <div className="absolute inset-x-0 top-[16%] h-[16%] bg-gradient-to-b from-[#f6efe1] to-[#e7d6bb]" />

        {/* pearls */}
        <div className="absolute inset-x-[10%] bottom-[6%] flex flex-wrap justify-center gap-[6%]">
          {Array.from({ length: 12 }).map((_, i) => (
            <span
              key={i}
              className="block h-[14px] w-[14px] rounded-full bg-[#1c110a] shadow-[inset_-2px_-2px_3px_rgba(255,255,255,0.15)]"
            />
          ))}
        </div>

        {/* specular highlight */}
        <div className="absolute left-[12%] top-[8%] h-[70%] w-[10%] rounded-full bg-white/20 blur-md" />
      </div>

      {/* lid */}
      <div className="absolute inset-x-[10%] top-[6%] h-[7%] rounded-full border border-white/15 bg-white/10 backdrop-blur-sm" />

      {/* straw */}
      <div className="absolute left-[54%] top-[-2%] h-[46%] w-[9px] rotate-[10deg] rounded-full bg-gradient-to-b from-matcha to-[#5f764f]" />
    </div>
  );
}
