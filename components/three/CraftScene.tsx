"use client";

import { MutableRefObject, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { BobaCup } from "./BobaCup";
import { Cookie } from "./Cookie";
import { StudioEnv } from "./StudioEnv";

type Props = { progress: MutableRefObject<number> };

/**
 * A single continuous scene driven by scroll progress (0→1):
 *  - the boba cup slowly changes perspective
 *  - three stacked cookies separate elegantly
 * Motion is eased every frame so scrubbing never feels harsh.
 */
export function CraftScene({ progress }: Props) {
  const cup = useRef<THREE.Group>(null);
  const cookies = useRef<THREE.Group[]>([]);
  const eased = useRef(0);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    // ease toward the scroll target so it always feels soft
    eased.current = THREE.MathUtils.lerp(eased.current, progress.current, 0.08);
    const p = eased.current;

    // subtle camera dolly + drift for cinematic depth
    state.camera.position.z = THREE.MathUtils.lerp(9.2, 7.6, p);
    state.camera.position.y = 0.5 + Math.sin(p * Math.PI) * 0.4;
    state.camera.lookAt(0, 0, 0);

    if (cup.current) {
      cup.current.rotation.y = -0.4 + p * Math.PI * 0.7;
      cup.current.position.x = THREE.MathUtils.lerp(-2.6, -1.6, p);
      cup.current.position.y = Math.sin(t * 0.5) * 0.05 - 0.2;
    }

    cookies.current.forEach((c, i) => {
      if (!c) return;
      const spread = (i - 1) * p * 2.1;
      c.position.y = spread + Math.sin(t * 0.4 + i) * 0.06;
      c.position.x = 2.4 + (i - 1) * p * 0.5;
      c.rotation.y = t * 0.1 + i;
      c.rotation.x = 0.9 - p * 0.6;
    });
  });

  return (
    <>
      <StudioEnv />
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 7, 4]} intensity={2.2} color="#ffe6c2" castShadow shadow-mapSize={[1024, 1024]} />
      <directionalLight position={[-5, 2, -3]} intensity={0.7} color="#8fae7b" />

      <group ref={cup}>
        <BobaCup scale={1.15} />
      </group>

      {[0, 1, 2].map((i) => (
        <group
          key={i}
          ref={(el) => {
            if (el) cookies.current[i] = el;
          }}
          position={[2.4, 0, 0]}
          rotation={[0.9, 0, 0.1]}
        >
          <Cookie scale={0.62} />
        </group>
      ))}

      <ContactShadows position={[0, -2.6, 0]} opacity={0.5} scale={18} blur={3} far={6} />
    </>
  );
}
