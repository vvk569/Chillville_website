"use client";

import { MutableRefObject, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { Recipe, Part } from "./recipes";
import { useMousePosition } from "@/hooks/useMousePosition";

function geometry(part: Part) {
  const a = part.args;
  switch (part.geo) {
    case "cyl":
      return <cylinderGeometry args={a as any} />;
    case "sphere":
      return <sphereGeometry args={a as any} />;
    case "halfSphere":
      return <sphereGeometry args={[a[0], a[1], a[2], 0, Math.PI * 2, 0, Math.PI / 2] as any} />;
    case "dodeca":
      return <dodecahedronGeometry args={a as any} />;
    case "cone":
      return <coneGeometry args={a as any} />;
    case "box":
      return <boxGeometry args={a as any} />;
    case "torus":
      return <torusGeometry args={a as any} />;
  }
}

const lerp = THREE.MathUtils.lerp;
const smooth = (t: number) => t * t * (3 - 2 * t);

export function AssembleScene({
  recipe,
  target,
}: {
  recipe: Recipe;
  target: MutableRefObject<number>;
}) {
  const pointer = useMousePosition();
  const group = useRef<THREE.Group>(null);
  const meshes = useRef<THREE.Mesh[]>([]);
  const eased = useRef(0);

  // deterministic scatter rotations so parts tumble as they fly in
  const starts = useMemo(
    () =>
      recipe.parts.map((_, i) => [
        Math.sin(i * 12.9898) * 3,
        Math.cos(i * 78.233) * 3,
        Math.sin(i * 39.42) * 3,
      ]),
    [recipe]
  );

  useFrame((state, delta) => {
    // ease the whole assembly toward its target (in-view = 1)
    eased.current = lerp(eased.current, target.current, 1 - Math.pow(0.001, delta));
    const p = eased.current;
    const n = recipe.parts.length;

    recipe.parts.forEach((part, i) => {
      const m = meshes.current[i];
      if (!m) return;
      // staggered per-part progress
      const delay = (i / n) * 0.4;
      const pe = smooth(THREE.MathUtils.clamp((p - delay) / 0.6, 0, 1));

      m.position.set(
        lerp(part.from[0], part.to[0], pe),
        lerp(part.from[1], part.to[1], pe),
        lerp(part.from[2], part.to[2], pe)
      );
      const fr = part.rot ?? [0, 0, 0];
      m.rotation.set(
        lerp(starts[i][0], fr[0], pe),
        lerp(starts[i][1], fr[1], pe),
        lerp(starts[i][2], fr[2], pe)
      );
      if (part.scaleVec) {
        m.scale.set(
          lerp(0.35, part.scaleVec[0], pe),
          lerp(0.35, part.scaleVec[1], pe),
          lerp(0.35, part.scaleVec[2], pe)
        );
      } else {
        m.scale.setScalar(lerp(0.35, part.scale ?? 1, pe));
      }
    });

    if (group.current) {
      const t = state.clock.elapsedTime;
      // idle drift + subtle cursor parallax
      group.current.rotation.y = t * 0.14 + pointer.current.x * 0.25;
      group.current.rotation.x = recipe.tilt[0] + Math.sin(t * 0.4) * 0.04 - pointer.current.y * 0.12;
      group.current.rotation.z = recipe.tilt[2];
      group.current.position.y = Math.sin(t * 0.5) * 0.06;
    }
  });

  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 6, 5]} intensity={2.3} color="#ffe6c2" castShadow shadow-mapSize={[1024, 1024]} />
      <directionalLight position={[-5, 2, -3]} intensity={0.8} color="#8fce74" />
      <pointLight position={[0, 1, 5]} intensity={1.3} color="#ff7a59" />

      <group ref={group} rotation={recipe.tilt} scale={recipe.scale ?? 1}>
        {recipe.parts.map((part, i) => (
          <mesh
            key={i}
            ref={(el) => {
              if (el) meshes.current[i] = el;
            }}
            castShadow
            receiveShadow
          >
            {geometry(part)}
            <meshStandardMaterial
              color={part.color}
              roughness={part.rough ?? 0.5}
              metalness={part.metal ?? 0}
              transparent={part.opacity !== undefined}
              opacity={part.opacity ?? 1}
              side={part.opacity !== undefined ? THREE.DoubleSide : THREE.FrontSide}
            />
          </mesh>
        ))}
      </group>

      <ContactShadows position={[0, -2, 0]} opacity={0.5} scale={12} blur={2.6} far={4} />
    </>
  );
}
