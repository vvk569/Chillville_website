"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import * as THREE from "three";
import { HeroScene } from "./HeroScene";
import { useInView } from "@/hooks/useInView";

/** Client-only hero Canvas. Loaded via next/dynamic with ssr:false. */
export default function HeroCanvas() {
  const wrap = useRef<HTMLDivElement>(null);
  const inView = useInView(wrap);
  const isMobile =
    typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <div ref={wrap} className="absolute inset-0">
      <Canvas
        shadows={!isMobile}
        dpr={isMobile ? [1, 1.3] : [1, 1.75]}
        frameloop={inView ? "always" : "never"}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
        }}
        camera={{ position: [0, 0, 9.5], fov: 40 }}
        className="!absolute inset-0"
      >
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      </Canvas>
    </div>
  );
}
