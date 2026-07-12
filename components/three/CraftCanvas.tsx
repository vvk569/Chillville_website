"use client";

import { MutableRefObject, Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { CraftScene } from "./CraftScene";
import { useInView } from "@/hooks/useInView";

export default function CraftCanvas({
  progress,
}: {
  progress: MutableRefObject<number>;
}) {
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
        camera={{ position: [0, 0.5, 9], fov: 40 }}
        className="!absolute inset-0"
      >
        <Suspense fallback={null}>
          <CraftScene progress={progress} />
        </Suspense>
      </Canvas>
    </div>
  );
}
