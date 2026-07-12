"use client";

import { useMemo } from "react";
import type { ThreeElements } from "@react-three/fiber";
import * as THREE from "three";

type Props = {
  tea?: string;
} & ThreeElements["group"];

/**
 * A premium boba cup — clear glass (physical transmission), a milk-tea fill,
 * a cluster of glossy pearls, a domed lid and a wide matcha straw. Static by
 * design; the parent handles the slow, few-degree rotation.
 */
export function BobaCup({ tea = "#c69b6d", ...props }: Props) {
  const pearls = useMemo(() => {
    const items: [number, number, number][] = [];
    for (let i = 0; i < 22; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = Math.random() * 0.62;
      items.push([
        Math.cos(a) * r,
        -0.92 + Math.random() * 0.28,
        Math.sin(a) * r,
      ]);
    }
    return items;
  }, []);

  return (
    <group {...props}>
      {/* glass wall */}
      <mesh castShadow>
        <cylinderGeometry args={[0.82, 0.62, 2.2, 64, 1, true]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transmission={0.96}
          transparent
          opacity={0.5}
          roughness={0.06}
          thickness={0.6}
          ior={1.45}
          clearcoat={1}
          clearcoatRoughness={0.08}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* base */}
      <mesh position={[0, -1.08, 0]}>
        <cylinderGeometry args={[0.62, 0.6, 0.06, 64]} />
        <meshPhysicalMaterial color="#ffffff" transmission={0.9} transparent opacity={0.4} roughness={0.1} />
      </mesh>

      {/* milk-tea liquid */}
      <mesh position={[0, -0.28, 0]}>
        <cylinderGeometry args={[0.76, 0.6, 1.5, 64]} />
        <meshStandardMaterial color={tea} roughness={0.35} metalness={0.05} />
      </mesh>

      {/* pearls */}
      {pearls.map((p, i) => (
        <mesh key={i} position={p} castShadow>
          <sphereGeometry args={[0.14, 20, 20]} />
          <meshStandardMaterial color="#22150e" roughness={0.28} metalness={0.15} />
        </mesh>
      ))}

      {/* domed lid */}
      <mesh position={[0, 1.02, 0]} castShadow>
        <cylinderGeometry args={[0.86, 0.84, 0.08, 64]} />
        <meshStandardMaterial color="#f2e8d8" roughness={0.5} />
      </mesh>
      <mesh position={[0, 1.14, 0]}>
        <sphereGeometry args={[0.84, 48, 32, 0, Math.PI * 2, 0, Math.PI / 2.4]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transmission={0.9}
          transparent
          opacity={0.35}
          roughness={0.08}
          clearcoat={1}
        />
      </mesh>

      {/* straw */}
      <mesh position={[0.2, 1.3, 0.02]} rotation={[0, 0, 0.16]} castShadow>
        <cylinderGeometry args={[0.1, 0.1, 2.6, 24]} />
        <meshStandardMaterial color="#8fae7b" roughness={0.35} metalness={0.05} />
      </mesh>
    </group>
  );
}
