"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/** A sparse field of slow, warm dust motes for atmospheric depth. */
export function Particles({ count = 140 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  // halve the field on small screens for a smoother mobile frame rate
  const n = useMemo(
    () => (typeof window !== "undefined" && window.innerWidth < 768 ? Math.round(count / 2) : count),
    [count]
  );

  const positions = useMemo(() => {
    const arr = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 16;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return arr;
  }, [n]);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = t * 0.012;
    ref.current.position.y = Math.sin(t * 0.14) * 0.24;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={n}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#d9b486"
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
