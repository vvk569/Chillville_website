import { useEffect, useLayoutEffect } from "react";

/**
 * useLayoutEffect warns during SSR — swap to useEffect on the server so GSAP
 * setup code stays warning-free.
 */
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
