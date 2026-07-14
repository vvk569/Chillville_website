/**
 * Assembly "recipes" — each product is a set of procedural 3D parts. Every part
 * has a scattered start transform (`from`) and an assembled end transform
 * (`to`). The <AssembleScene> lerps parts from scattered → assembled as the
 * section scrolls into view, so ingredients fly in and reassemble into the
 * finished product. No external image assets required.
 */

export type Geo = "cyl" | "sphere" | "halfSphere" | "dodeca" | "cone" | "box" | "torus";

export type Part = {
  geo: Geo;
  args: (number | boolean)[];
  color: string;
  rough?: number;
  metal?: number;
  opacity?: number;
  to: [number, number, number];
  from: [number, number, number];
  rot?: [number, number, number];
  scale?: number;
};

export type Recipe = {
  /** Whole-assembly viewing tilt. */
  tilt: [number, number, number];
  parts: Part[];
};

// deterministic scatter position around a radius
const scatter = (i: number, r = 3.4): [number, number, number] => {
  const a = i * 2.399963; // golden angle
  return [
    Math.cos(a) * r,
    ((i % 5) - 2) * 1.3 + Math.sin(a) * 0.6,
    Math.sin(a) * r * 0.7 - 1.5,
  ];
};

/* ── Chocolate-chip cookie ─────────────────────────────────────────────── */
const cookieChips: Part[] = Array.from({ length: 11 }, (_, i) => {
  const a = (i / 11) * Math.PI * 2;
  const rad = 0.28 + (i % 3) * 0.24;
  return {
    geo: "dodeca" as Geo,
    args: [0.12, 0],
    color: "#2b1810",
    rough: 0.45,
    metal: 0.1,
    to: [Math.cos(a) * rad, 0.17, Math.sin(a) * rad],
    from: scatter(i + 2, 3.8),
    rot: [Math.random(), Math.random(), Math.random()],
  };
});

const cookie: Recipe = {
  tilt: [-0.6, 0, 0.15],
  parts: [
    {
      geo: "cyl",
      args: [1.05, 1.08, 0.32, 48, 3],
      color: "#c58f52",
      rough: 0.9,
      to: [0, 0, 0],
      from: [0, 3.2, -1],
      scale: 1,
    },
    ...cookieChips,
  ],
};

/* ── Boba ──────────────────────────────────────────────────────────────── */
const bobaPearls: Part[] = Array.from({ length: 12 }, (_, i) => {
  const a = i * 1.7;
  const r = 0.15 + (i % 4) * 0.14;
  return {
    geo: "sphere" as Geo,
    args: [0.13, 16, 16],
    color: "#22150e",
    rough: 0.3,
    metal: 0.15,
    to: [Math.cos(a) * r, -0.85 + (i % 3) * 0.12, Math.sin(a) * r],
    from: scatter(i + 5, 3.6),
  };
});

const boba: Recipe = {
  tilt: [0.05, 0, 0.04],
  parts: [
    { geo: "cyl", args: [0.8, 0.6, 2.0, 40, 1, true], color: "#ffffff", rough: 0.1, opacity: 0.24, to: [0, 0, 0], from: [-3.4, 1, -1] },
    { geo: "cyl", args: [0.74, 0.58, 1.45, 40], color: "#c69b6d", rough: 0.35, to: [0, -0.25, 0], from: [3.4, -1, -1] },
    ...bobaPearls,
    { geo: "cyl", args: [0.86, 0.84, 0.09, 40], color: "#f6efe1", rough: 0.5, to: [0, 1.02, 0], from: [0, 3.6, 0] },
    { geo: "cyl", args: [0.09, 0.09, 2.6, 20], color: "#8fce74", rough: 0.35, to: [0.2, 1.25, 0], from: [3.2, 3, 1], rot: [0, 0, 0.16] },
  ],
};

/* ── Ice cream cone ────────────────────────────────────────────────────── */
const iceCream: Recipe = {
  tilt: [0.1, 0, 0],
  parts: [
    { geo: "cone", args: [0.62, 1.5, 24], color: "#d9a15a", rough: 0.7, to: [0, -0.75, 0], from: [0, -3.6, -1], rot: [Math.PI, 0, 0] },
    { geo: "sphere", args: [0.64, 28, 28], color: "#f2d9b0", rough: 0.5, to: [0, 0.15, 0], from: [-3.4, 1.5, -1] },
    { geo: "sphere", args: [0.56, 28, 28], color: "#a4713f", rough: 0.5, to: [0, 0.9, 0], from: [3.4, 1.8, -1] },
    { geo: "sphere", args: [0.42, 24, 24], color: "#8fce74", rough: 0.5, to: [0, 1.5, 0], from: [0, 3.6, 1] },
    { geo: "sphere", args: [0.14, 16, 16], color: "#c0392b", rough: 0.3, to: [0, 1.95, 0], from: [2.6, 3.4, 0] },
  ],
};

/* ── Loaded shake ──────────────────────────────────────────────────────── */
const shake: Recipe = {
  tilt: [0.05, 0, 0.03],
  parts: [
    { geo: "cyl", args: [0.62, 0.5, 1.9, 40, 1, true], color: "#ffffff", rough: 0.1, opacity: 0.24, to: [0, 0, 0], from: [-3.4, 1, -1] },
    { geo: "cyl", args: [0.57, 0.48, 1.5, 40], color: "#caa06a", rough: 0.35, to: [0, -0.15, 0], from: [3.4, -1.2, -1] },
    { geo: "halfSphere", args: [0.62, 28, 20], color: "#f6efe1", rough: 0.5, to: [0, 0.95, 0], from: [0, 3.6, 0] },
    { geo: "sphere", args: [0.16, 16, 16], color: "#c0392b", rough: 0.3, to: [0, 1.55, 0], from: [2.8, 3.4, 0] },
    { geo: "cyl", args: [0.34, 0.36, 0.12, 24], color: "#a4713f", rough: 0.7, to: [-0.35, 1.15, 0.2], from: [-3.2, 2.6, 1], rot: [0.5, 0, 0.4] },
    { geo: "cyl", args: [0.07, 0.07, 2.4, 18], color: "#ff7a59", rough: 0.35, to: [0.2, 1.3, 0], from: [3.2, 3, 1], rot: [0, 0, 0.2] },
  ],
};

export const RECIPES = { cookie, boba, iceCream, shake } as const;
export type RecipeKey = keyof typeof RECIPES;
