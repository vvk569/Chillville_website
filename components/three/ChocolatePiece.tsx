"use client";

import type { ThreeElements } from "@react-three/fiber";
import * as THREE from "three";

/** A glossy gold-dusted chocolate square (the Dubai bar). Static. */
export function ChocolatePiece({
  color = "#3a2418",
  ...props
}: { color?: string } & ThreeElements["group"]) {
  return (
    <group {...props}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.4, 0.4, 0.95]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.4} />
      </mesh>
      {[-0.42, 0, 0.42].map((x) =>
        [-0.24, 0.24].map((z) => (
          <mesh key={`${x}-${z}`} position={[x, 0.22, z]} castShadow>
            <boxGeometry args={[0.32, 0.07, 0.32]} />
            <meshStandardMaterial color="#c9a26b" roughness={0.35} metalness={0.6} />
          </mesh>
        ))
      )}
    </group>
  );
}
