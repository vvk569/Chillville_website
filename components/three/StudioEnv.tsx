"use client";

import { Environment, Lightformer } from "@react-three/drei";

/**
 * A procedural studio environment built from Lightformers — warm cinematic key,
 * a cool matcha rim and soft fill. Fully self-contained (no external HDR fetch),
 * so it renders offline and keeps reflections physically believable.
 */
export function StudioEnv() {
  return (
    <Environment resolution={256} frames={1}>
      {/* warm key */}
      <Lightformer
        form="rect"
        intensity={3.2}
        color="#ffd9a8"
        position={[4, 5, 4]}
        scale={[8, 8, 1]}
        target={[0, 0, 0]}
      />
      {/* soft fill */}
      <Lightformer
        form="rect"
        intensity={1.1}
        color="#f2e8d8"
        position={[-5, 2, 3]}
        scale={[6, 10, 1]}
        target={[0, 0, 0]}
      />
      {/* matcha rim from behind */}
      <Lightformer
        form="rect"
        intensity={1.6}
        color="#8fae7b"
        position={[-3, 3, -6]}
        scale={[5, 6, 1]}
        target={[0, 0, 0]}
      />
      {/* subtle top glow */}
      <Lightformer
        form="circle"
        intensity={1.4}
        color="#c9a26b"
        position={[0, 6, 1]}
        scale={[5, 5, 1]}
        target={[0, 0, 0]}
      />
    </Environment>
  );
}
