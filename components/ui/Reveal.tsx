"use client";

import { motion, type Variants } from "framer-motion";
import { ReactNode } from "react";
import { fadeUp, blurIn, viewportOnce } from "@/lib/motion";

type Props = {
  children: ReactNode;
  variant?: "fade" | "blur";
  delay?: number;
  className?: string;
  as?: "div" | "span" | "li" | "p";
};

const map: Record<string, Variants> = { fade: fadeUp, blur: blurIn };

/** Reveals its children once on scroll-in, using the shared motion language. */
export function Reveal({ children, variant = "fade", delay = 0, className, as = "div" }: Props) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      variants={map[variant]}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}
