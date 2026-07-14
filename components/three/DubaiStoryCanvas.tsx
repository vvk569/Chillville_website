"use client";

import { MutableRefObject, Suspense, useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { DubaiStoryScene } from "./DubaiStoryScene";
import { useInView } from "@/hooks/useInView";

export default function DubaiStoryCanvas({ progress }: { progress: MutableRefObject<number> }) {
  const wrap = useRef<HTMLDivElement>(null);
  const near = useInView(wrap, "200px");
  const [mobile, setMobile] = useState(false);
  useEffect(() => setMobile(window.innerWidth < 768), []);

  return (
    <div ref={wrap} className="absolute inset-0">
      <Canvas
        shadows={!mobile}
        dpr={mobile ? [1, 1.3] : [1, 1.8]}
        frameloop={near ? "always" : "never"}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance", toneMapping: THREE.ACESFilmicToneMapping }}
        camera={{ position: [0, 0.3, 8.4], fov: 42 }}
        className="!absolute inset-0"
      >
        <Suspense fallback={null}>
          <DubaiStoryScene progress={progress} />
        </Suspense>
      </Canvas>
    </div>
  );
}
