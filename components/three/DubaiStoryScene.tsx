"use client";

import { MutableRefObject, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { StudioEnv } from "./StudioEnv";
import { useMousePosition } from "@/hooks/useMousePosition";

const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
const smooth = (t: number) => t * t * (3 - 2 * t);
const phase = (p: number, a: number, b: number) => smooth(clamp01((p - a) / (b - a)));
const lerp = THREE.MathUtils.lerp;

/**
 * A 4-act, scroll-scrubbed "how the Dubai bar is made" sequence:
 *   1 Burst  — kunafa strands + pistachios explode outward
 *   2 Paste  — pistachios rush in and flatten into a pistachio slab
 *   3 Pour   — a glossy chocolate ribbon draws itself over the top
 *   4 Set    — the bar settles with gold + pistachio drizzle
 * Everything is driven by `progress` (0→1) eased each frame.
 */
export function DubaiStoryScene({ progress }: { progress: MutableRefObject<number> }) {
  const pointer = useMousePosition();
  const root = useRef<THREE.Group>(null);
  const eased = useRef(0);

  const kunafa = useRef<THREE.Mesh[]>([]);
  const pistachio = useRef<THREE.Mesh[]>([]);
  const paste = useRef<THREE.Mesh>(null);
  const chocTop = useRef<THREE.Mesh>(null);
  const ribbon = useRef<THREE.Mesh>(null);
  const gold = useRef<THREE.Mesh[]>([]);
  const drizzle = useRef<THREE.Mesh[]>([]);

  const KUNAFA = 30;
  const PISTACHIO = 20;

  // deterministic scatter directions / targets
  const kData = useMemo(
    () =>
      Array.from({ length: KUNAFA }, (_, i) => {
        const a = i * 2.399963;
        const y = Math.acos(1 - (2 * (i + 0.5)) / KUNAFA);
        return {
          dir: new THREE.Vector3(Math.sin(y) * Math.cos(a), Math.cos(y) * 0.7, Math.sin(y) * Math.sin(a)),
          gather: new THREE.Vector3((Math.random() - 0.5) * 1.35, 0.14, (Math.random() - 0.5) * 0.82),
          len: 0.32 + Math.random() * 0.4,
          spin: new THREE.Vector3(Math.random(), Math.random(), Math.random()),
        };
      }),
    []
  );
  const pData = useMemo(
    () =>
      Array.from({ length: PISTACHIO }, (_, i) => {
        const a = i * 1.7;
        return {
          dir: new THREE.Vector3(Math.cos(a), (i % 5) - 2, Math.sin(a)).normalize(),
          spin: new THREE.Vector3(Math.random(), Math.random(), Math.random()),
        };
      }),
    []
  );

  // chocolate ribbon curve (a descending loop)
  const ribbonGeo = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 60; i++) {
      const t = i / 60;
      const ang = t * Math.PI * 4;
      const r = 0.75 * (1 - t * 0.5);
      pts.push(new THREE.Vector3(Math.cos(ang) * r, 1.4 - t * 1.2, Math.sin(ang) * r));
    }
    const curve = new THREE.CatmullRomCurve3(pts);
    return new THREE.TubeGeometry(curve, 140, 0.07, 10, false);
  }, []);
  const ribbonIndexCount = (ribbonGeo.index?.count ?? 0);

  useFrame((state) => {
    eased.current = lerp(eased.current, progress.current, 0.09);
    const p = eased.current;
    const t = state.clock.elapsedTime;

    const ph1 = phase(p, 0.02, 0.26); // burst
    const ph2 = phase(p, 0.24, 0.5); // paste
    const ph3 = phase(p, 0.5, 0.76); // pour
    const ph4 = phase(p, 0.74, 0.96); // set

    // kunafa strands
    kunafa.current.forEach((m, i) => {
      if (!m) return;
      const d = kData[i];
      const burst = d.dir.clone().multiplyScalar(1.2 + ph1 * 1.9);
      const pos = burst.lerp(d.gather, ph2);
      pos.y -= ph3 * 0.06;
      m.position.copy(pos);
      const appear = phase(p, 0.02, 0.12);
      const s = appear * (1 - ph3 * 0.9);
      m.scale.setScalar(Math.max(0.0001, s));
      m.rotation.set(d.spin.x + t * 0.4, d.spin.y + t * 0.3, d.spin.z);
    });

    // pistachios: burst in, then shrink into the paste
    pistachio.current.forEach((m, i) => {
      if (!m) return;
      const d = pData[i];
      const burst = d.dir.clone().multiplyScalar(1.4 + ph1 * 1.8);
      const center = new THREE.Vector3((Math.random() - 0.5) * 0.2, 0.1, (Math.random() - 0.5) * 0.2);
      const pos = burst.lerp(center, ph2);
      m.position.copy(pos);
      const appear = phase(p, 0.02, 0.14);
      m.scale.setScalar(Math.max(0.0001, appear * (1 - ph2)));
      m.rotation.set(d.spin.x + t * 0.6, d.spin.y + t * 0.5, d.spin.z);
    });

    // pistachio paste slab grows in during act 2
    if (paste.current) {
      const s = Math.max(0.0001, ph2);
      paste.current.scale.set(s, s, s);
    }

    // chocolate ribbon draws on during act 3, then fades as it's absorbed
    if (ribbon.current) {
      const drawP = ph3;
      ribbonGeo.setDrawRange(0, Math.floor(ribbonIndexCount * drawP));
      ribbon.current.visible = drawP > 0.001;
      ribbon.current.position.y = lerp(0.5, 0.15, ph3);
      ribbon.current.rotation.y = t * 0.8;
      const mat = ribbon.current.material as THREE.MeshStandardMaterial;
      mat.opacity = 1 - phase(p, 0.78, 0.94);
    }

    // chocolate top layer forms over the paste (act 3 → 4)
    if (chocTop.current) {
      const grow = Math.max(0.0001, Math.max(ph3, ph4));
      chocTop.current.scale.set(grow, Math.max(0.0001, phase(p, 0.55, 0.85)), grow);
    }

    // gold + pistachio drizzle in act 4
    gold.current.forEach((m) => m && m.scale.setScalar(Math.max(0.0001, ph4)));
    drizzle.current.forEach((m) => m && m.scale.setScalar(Math.max(0.0001, ph4)));

    // whole assembly: tilt to reveal the top, gentle idle + cursor parallax
    if (root.current) {
      root.current.rotation.y = t * 0.12 + pointer.current.x * 0.25;
      root.current.rotation.x = -0.32 + Math.sin(t * 0.4) * 0.03 - pointer.current.y * 0.12;
    }
    // camera dolly in as it resolves
    state.camera.position.z = lerp(8.4, 6.8, smooth(p));
    state.camera.lookAt(0, 0.1, 0);
  });

  return (
    <>
      <StudioEnv />
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 7, 5]} intensity={2.4} color="#ffe6c2" castShadow shadow-mapSize={[2048, 2048]} />
      <directionalLight position={[-5, 3, -3]} intensity={1} color="#8fce74" />
      <pointLight position={[0, 2, 5]} intensity={1.6} color="#ff7a59" />

      <group ref={root} rotation={[-0.32, 0, 0]}>
        {/* kunafa strands */}
        {kData.map((_, i) => (
          <mesh key={`k${i}`} ref={(el) => { if (el) kunafa.current[i] = el; }} castShadow>
            <cylinderGeometry args={[0.022, 0.022, kData[i].len, 6]} />
            <meshStandardMaterial color="#d9a15a" roughness={0.6} />
          </mesh>
        ))}

        {/* pistachios */}
        {pData.map((_, i) => (
          <mesh key={`p${i}`} ref={(el) => { if (el) pistachio.current[i] = el; }} castShadow>
            <dodecahedronGeometry args={[0.12, 0]} />
            <meshStandardMaterial color="#8fce74" roughness={0.5} />
          </mesh>
        ))}

        {/* pistachio paste slab (the filling) */}
        <mesh ref={paste} position={[0, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.55, 0.24, 0.98]} />
          <meshStandardMaterial color="#9ccf6e" roughness={0.5} />
        </mesh>

        {/* chocolate top layer */}
        <mesh ref={chocTop} position={[0, 0.2, 0]} castShadow>
          <boxGeometry args={[1.55, 0.18, 0.98]} />
          <meshStandardMaterial color="#3a2418" roughness={0.28} metalness={0.35} />
        </mesh>

        {/* flowing chocolate ribbon */}
        <mesh ref={ribbon} geometry={ribbonGeo}>
          <meshStandardMaterial color="#3a2418" roughness={0.22} metalness={0.4} transparent />
        </mesh>

        {/* gold drizzle flecks */}
        {[[-0.4, 0.32, 0.1], [0.3, 0.32, -0.2], [0.55, 0.32, 0.25], [-0.1, 0.32, 0.3], [0.0, 0.32, -0.35]].map((pos, i) => (
          <mesh key={`g${i}`} ref={(el) => { if (el) gold.current[i] = el; }} position={pos as [number, number, number]}>
            <sphereGeometry args={[0.05, 14, 14]} />
            <meshStandardMaterial color="#e3ab6b" roughness={0.2} metalness={0.85} />
          </mesh>
        ))}

        {/* pistachio drizzle lines on top */}
        {[-0.35, 0.05, 0.4].map((x, i) => (
          <mesh key={`d${i}`} ref={(el) => { if (el) drizzle.current[i] = el; }} position={[x, 0.31, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.018, 0.018, 0.8, 6]} />
            <meshStandardMaterial color="#8fce74" roughness={0.4} />
          </mesh>
        ))}
      </group>

      <ContactShadows position={[0, -1.1, 0]} opacity={0.5} scale={10} blur={2.6} far={4} />
    </>
  );
}
