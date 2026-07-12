"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { BobaCup } from "./BobaCup";
import { Cookie } from "./Cookie";
import { ChocolatePiece } from "./ChocolatePiece";
import { Particles } from "./Particles";
import { StudioEnv } from "./StudioEnv";
import { useMousePosition } from "@/hooks/useMousePosition";

/**
 * Hero composition: a hero boba cup that rotates only a few degrees, three
 * cookies orbiting slowly on an elegant path, and a soft parallax rig that
 * eases toward the cursor. Everything is slow and intentional.
 */
export function HeroScene() {
  const pointer = useMousePosition();
  const rig = useRef<THREE.Group>(null);
  const cup = useRef<THREE.Group>(null);
  const orbit = useRef<THREE.Group>(null);
  const cookieRefs = useRef<THREE.Group[]>([]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    // subtle depth: rig eases toward pointer (max ~4°)
    if (rig.current) {
      rig.current.rotation.y = THREE.MathUtils.lerp(
        rig.current.rotation.y,
        pointer.current.x * 0.07,
        0.04
      );
      rig.current.rotation.x = THREE.MathUtils.lerp(
        rig.current.rotation.x,
        -pointer.current.y * 0.04,
        0.04
      );
      rig.current.position.x = THREE.MathUtils.lerp(
        rig.current.position.x,
        pointer.current.x * 0.3,
        0.04
      );
    }

    // cup: gentle few-degree sway + soft float
    if (cup.current) {
      cup.current.rotation.y = Math.sin(t * 0.16) * 0.12;
      cup.current.position.y = Math.sin(t * 0.5) * 0.05;
    }

    // cookies: slow elegant orbit (~75s per revolution)
    if (orbit.current) orbit.current.rotation.y = t * 0.085;
    cookieRefs.current.forEach((c, i) => {
      if (c) {
        c.position.y = Math.sin(t * 0.4 + i * 2.1) * 0.14;
        c.rotation.z = Math.sin(t * 0.3 + i) * 0.15;
      }
    });
  });

  const cookiePositions: [number, number, number][] = [
    [3.1, 0.4, -0.5],
    [-3.0, 1.2, -1.2],
    [-2.4, -1.4, 0.6],
  ];

  return (
    <>
      <StudioEnv />
      <ambientLight intensity={0.35} />
      <directionalLight
        position={[5, 7, 5]}
        intensity={2.4}
        color="#ffe6c2"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0002}
      />
      <directionalLight position={[-6, 3, -4]} intensity={0.8} color="#8fae7b" />

      <Particles />

      <group ref={rig}>
        {/* hero cup */}
        <group ref={cup} position={[0.4, -0.2, 0]}>
          <BobaCup scale={1.25} />
        </group>

        {/* orbiting cookies */}
        <group ref={orbit}>
          {cookiePositions.map((p, i) => (
            <group
              key={i}
              ref={(el) => {
                if (el) cookieRefs.current[i] = el;
              }}
              position={p}
              rotation={[0.5, i, 0.2]}
            >
              <Cookie scale={i === 2 ? 0.55 : 0.7} />
            </group>
          ))}
        </group>

        {/* far chocolate accent */}
        <group position={[2.6, -1.5, -1.5]} rotation={[0.4, -0.5, 0.1]}>
          <ChocolatePiece scale={0.6} />
        </group>
      </group>

      <ContactShadows
        position={[0, -2.4, 0]}
        opacity={0.55}
        scale={16}
        blur={3}
        far={5}
        color="#000000"
        resolution={512}
      />
    </>
  );
}
