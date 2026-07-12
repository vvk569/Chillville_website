"use client";

import { useMemo } from "react";
import type { ThreeElements } from "@react-three/fiber";
import * as THREE from "three";

/**
 * A warm, baked cookie with an irregular domed top and folded chocolate chunks.
 * Static; the parent orbits it slowly.
 */
export function Cookie(props: ThreeElements["group"]) {
  const { geometry, chips } = useMemo(() => {
    // gently perturb a low-poly sphere-cap for an organic baked surface
    const geo = new THREE.CylinderGeometry(1, 1.02, 0.34, 40, 3);
    const pos = geo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);
      if (y > 0.1) {
        pos.setY(i, y + (Math.random() - 0.5) * 0.06);
      }
      pos.setX(i, pos.getX(i) + (Math.random() - 0.5) * 0.02);
    }
    geo.computeVertexNormals();

    const c: [number, number, number][] = [];
    for (let i = 0; i < 10; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = Math.random() * 0.78;
      c.push([Math.cos(a) * r, 0.18, Math.sin(a) * r]);
    }
    return { geometry: geo, chips: c };
  }, []);

  return (
    <group {...props}>
      <mesh geometry={geometry} castShadow receiveShadow>
        <meshStandardMaterial color="#b9854d" roughness={0.9} metalness={0} />
      </mesh>
      {chips.map((c, i) => (
        <mesh key={i} position={c} rotation={[Math.random(), Math.random(), 0]} castShadow>
          <dodecahedronGeometry args={[0.12, 0]} />
          <meshStandardMaterial color="#2c1a10" roughness={0.45} metalness={0.1} />
        </mesh>
      ))}
    </group>
  );
}
