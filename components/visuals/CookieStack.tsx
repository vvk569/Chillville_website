"use client";

import { cn } from "@/lib/utils";

/** A single art-directed cookie (radial dough gradient + folded chunks). */
function CookieDisc({ size = 220, className }: { size?: number; className?: string }) {
  const chips = [
    [30, 40], [62, 30], [46, 60], [70, 62], [24, 66], [55, 46], [38, 26],
  ];
  return (
    <div
      className={cn("relative rounded-full", className)}
      style={{
        width: size,
        height: size,
        background:
          "radial-gradient(circle at 40% 35%, #cf9c5f 0%, #b9854d 45%, #8f5f33 100%)",
        boxShadow:
          "inset -10px -14px 26px rgba(58,36,24,0.55), inset 8px 10px 20px rgba(255,240,220,0.25), 0 30px 60px -30px rgba(0,0,0,0.9)",
      }}
    >
      {chips.map(([x, y], i) => (
        <span
          key={i}
          className="absolute rounded-[40%] bg-[#2a1810]"
          style={{
            left: `${x}%`,
            top: `${y}%`,
            width: size * 0.09,
            height: size * 0.075,
            transform: `rotate(${i * 40}deg)`,
            boxShadow: "inset -1px -1px 2px rgba(255,255,255,0.15)",
          }}
        />
      ))}
    </div>
  );
}

/** A softly staggered stack of cookies for the signature showcase. */
export function CookieStack({ className }: { className?: string }) {
  return (
    <div className={cn("relative aspect-square w-full max-w-[420px]", className)}>
      <div className="absolute inset-0 rounded-full bg-caramel/15 blur-3xl" />
      <CookieDisc size={260} className="absolute left-[6%] top-[10%] rotate-[-8deg]" />
      <CookieDisc size={210} className="absolute right-[4%] top-[2%] rotate-[6deg] opacity-95" />
      <CookieDisc size={230} className="absolute bottom-[2%] left-[24%] rotate-[3deg]" />
    </div>
  );
}
