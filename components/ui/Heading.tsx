"use client";

import { motion } from "framer-motion";
import { lineReveal, stagger, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Props = {
  /** Use "\n" to break the heading into individually-revealed lines. */
  text: string;
  className?: string;
  delay?: number;
};

/**
 * A display heading that reveals line-by-line from behind a clip mask — the
 * signature headline motion used across the site.
 */
export function Heading({ text, className, delay = 0 }: Props) {
  const lines = text.split("\n");
  return (
    <motion.h2
      className={cn("font-display font-bold leading-[0.98] tracking-tight text-cream", className)}
      variants={stagger(0.12, delay)}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
    >
      {lines.map((line, i) => (
        <span key={i} className="clip-line">
          <motion.span variants={lineReveal} className="block">
            {line}
          </motion.span>
        </span>
      ))}
    </motion.h2>
  );
}
