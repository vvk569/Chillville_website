"use client";

import { useRef, ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline";
  className?: string;
};

/**
 * A tactile, magnetic button. It eases toward the cursor within its bounds and
 * fills on hover — premium but restrained (no bounce).
 */
export function MagneticButton({ href, children, variant = "solid", className }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${x * 0.22}px, ${y * 0.28}px)`;
  };
  const reset = () => {
    if (ref.current) ref.current.style.transform = "translate(0,0)";
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={cn(
        "group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-8 py-4 text-sm tracking-wide2 transition-[transform] duration-500 ease-expo",
        variant === "solid"
          ? "bg-gradient-to-r from-coral to-caramel text-charcoal font-semibold"
          : "border border-cream/25 text-cream",
        className
      )}
    >
      <span className="relative z-10 flex items-center gap-3">{children}</span>
      {/* fill sweep */}
      <span
        className={cn(
          "absolute inset-0 z-0 origin-bottom scale-y-0 transition-transform duration-500 ease-expo group-hover:scale-y-100",
          variant === "solid" ? "bg-cream" : "bg-cream/[0.06]"
        )}
      />
    </motion.a>
  );
}
