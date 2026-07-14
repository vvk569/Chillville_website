"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { AssembleScene } from "./AssembleScene";
import { RECIPES, RecipeKey } from "./recipes";
import { useInView } from "@/hooks/useInView";

/**
 * A self-contained product that assembles from scattered ingredients when it
 * scrolls into view (and disassembles when it leaves, so it replays). Renders
 * only while near the viewport for performance.
 */
export default function AssembleProduct({ recipe }: { recipe: RecipeKey }) {
  const wrap = useRef<HTMLDivElement>(null);
  const near = useInView(wrap, "300px"); // gate the render loop
  const target = useRef(0); // 0 = scattered, 1 = assembled
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    setMobile(window.innerWidth < 768);
    const el = wrap.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        target.current = e.isIntersecting ? 1 : 0;
      },
      { threshold: 0.01, rootMargin: "-18% 0px -18% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={wrap} className="absolute inset-0">
      <Canvas
        shadows={!mobile}
        dpr={mobile ? [1, 1.3] : [1, 1.75]}
        frameloop={near ? "always" : "never"}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance", toneMapping: THREE.ACESFilmicToneMapping }}
        camera={{ position: [0, 0.4, 7.6], fov: 42 }}
        className="!absolute inset-0"
      >
        <Suspense fallback={null}>
          <AssembleScene recipe={RECIPES[recipe]} target={target} />
        </Suspense>
      </Canvas>
    </div>
  );
}
