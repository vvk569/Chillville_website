"use client";

import { useEffect, useRef } from "react";

export type Pointer = { x: number; y: number };

/**
 * Tracks the pointer as a normalised (-1 → 1) value via a ref so high-frequency
 * mouse moves never trigger React re-renders. Read `ref.current` inside a rAF /
 * useFrame loop.
 */
export function useMousePosition() {
  const pointer = useRef<Pointer>({ x: 0, y: 0 });

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", handle, { passive: true });
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  return pointer;
}
