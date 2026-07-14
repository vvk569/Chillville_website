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
  /** Non-uniform assembled scale (overrides `scale`). */
  scaleVec?: [number, number, number];
};

export type Recipe = {
  /** Whole-assembly viewing tilt. */
  tilt: [number, number, number];
  /** Whole-assembly scale to fill the frame. */
  scale?: number;
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
  scale: 1.12,
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
  scale: 1.05,
  parts: [
    { geo: "cyl", args: [0.8, 0.6, 2.0, 40, 1, true], color: "#ffffff", rough: 0.1, opacity: 0.24, to: [0, 0, 0], from: [-3.4, 1, -1] },
    { geo: "cyl", args: [0.74, 0.58, 1.45, 40], color: "#c69b6d", rough: 0.35, to: [0, -0.25, 0], from: [3.4, -1, -1] },
    ...bobaPearls,
    { geo: "cyl", args: [0.86, 0.84, 0.09, 40], color: "#f6efe1", rough: 0.5, to: [0, 1.02, 0], from: [0, 3.6, 0] },
    { geo: "cyl", args: [0.09, 0.09, 2.6, 20], color: "#8fce74", rough: 0.35, to: [0.2, 1.25, 0], from: [3.2, 3, 1], rot: [0, 0, 0.16] },
  ],
};

/* ── Ice cream cone (rounder, squashed gelato scoops, shorter cone) ─────── */
const iceCream: Recipe = {
  tilt: [0.08, 0, 0],
  scale: 1.18,
  parts: [
    { geo: "cone", args: [0.66, 1.25, 26], color: "#d9a15a", rough: 0.7, to: [0, -0.6, 0], from: [0, -3.6, -1], rot: [Math.PI, 0, 0] },
    { geo: "sphere", args: [0.68, 30, 30], color: "#f2d9b0", rough: 0.45, to: [0, 0.18, 0], from: [-3.4, 1.5, -1], scaleVec: [1, 0.88, 1] },
    { geo: "sphere", args: [0.6, 30, 30], color: "#a4713f", rough: 0.45, to: [0, 0.82, 0], from: [3.4, 1.8, -1], scaleVec: [1, 0.88, 1] },
    { geo: "sphere", args: [0.5, 28, 28], color: "#8fce74", rough: 0.45, to: [0, 1.36, 0], from: [0, 3.6, 1], scaleVec: [1, 0.9, 1] },
    { geo: "sphere", args: [0.14, 18, 18], color: "#c0392b", rough: 0.25, to: [0, 1.78, 0], from: [2.6, 3.4, 0] },
  ],
};

/* ── Loaded shake (swirled whipped dome, cherry lower, cookie topper) ───── */
const shake: Recipe = {
  tilt: [0.05, 0, 0.03],
  scale: 1.1,
  parts: [
    { geo: "cyl", args: [0.64, 0.5, 1.9, 40, 1, true], color: "#ffffff", rough: 0.1, opacity: 0.24, to: [0, 0, 0], from: [-3.4, 1, -1] },
    { geo: "cyl", args: [0.59, 0.48, 1.5, 40], color: "#caa06a", rough: 0.35, to: [0, -0.15, 0], from: [3.4, -1.2, -1] },
    { geo: "halfSphere", args: [0.64, 30, 22], color: "#f6efe1", rough: 0.45, to: [0, 0.95, 0], from: [0, 3.6, 0] },
    { geo: "cone", args: [0.24, 0.5, 20], color: "#f6efe1", rough: 0.45, to: [0, 1.45, 0], from: [0, 4.0, 0] },
    { geo: "sphere", args: [0.15, 18, 18], color: "#c0392b", rough: 0.25, to: [0.02, 1.72, 0], from: [2.8, 3.4, 0] },
    { geo: "cyl", args: [0.34, 0.36, 0.12, 24], color: "#a4713f", rough: 0.7, to: [-0.4, 1.05, 0.22], from: [-3.2, 2.6, 1], rot: [0.5, 0, 0.4] },
    { geo: "cyl", args: [0.07, 0.07, 2.4, 18], color: "#ff7a59", rough: 0.35, to: [0.22, 1.35, 0], from: [3.2, 3, 1], rot: [0, 0, 0.2] },
  ],
};

/* ── Glazed donut ──────────────────────────────────────────────────────── */
const donutSprinkles: Part[] = Array.from({ length: 14 }, (_, i) => {
  const a = (i / 14) * Math.PI * 2;
  const r = 0.82;
  const cols = ["#f6efe1", "#8fce74", "#ff7a59", "#7c6cff", "#e3ab6b"];
  return {
    geo: "box" as Geo,
    args: [0.05, 0.05, 0.17],
    color: cols[i % cols.length],
    rough: 0.4,
    to: [Math.cos(a) * r, Math.sin(a) * r, 0.4],
    from: scatter(i + 3, 3.8),
    rot: [Math.random() * 3, Math.random() * 3, Math.random() * 3],
  };
});

const donut: Recipe = {
  tilt: [-0.95, 0, 0.12],
  scale: 1.25,
  parts: [
    { geo: "torus", args: [0.85, 0.4, 20, 44], color: "#d8a765", rough: 0.85, to: [0, 0, 0], from: [0, 3.2, -1] },
    { geo: "torus", args: [0.85, 0.43, 20, 44], color: "#e3ab6b", rough: 0.3, metal: 0.1, to: [0, 0, 0.06], from: [0, -3.4, -1] },
    ...donutSprinkles,
  ],
};

/* ── Croissant (stylized laminated crescent) ───────────────────────────── */
const croissantSegments: Part[] = Array.from({ length: 6 }, (_, i) => {
  const a = Math.PI * 0.15 + (i / 5) * Math.PI * 0.95;
  const r = 0.8;
  return {
    geo: "sphere" as Geo,
    args: [0.26, 20, 20],
    color: "#e0ab6a",
    rough: 0.7,
    to: [Math.cos(a) * r, Math.sin(a) * r, 0],
    from: scatter(i + 4, 3.4),
    scaleVec: [1, 1, 0.8],
  };
});

const croissant: Recipe = {
  tilt: [-0.5, 0, 0.4],
  scale: 1.35,
  parts: [
    { geo: "torus", args: [0.8, 0.32, 18, 40, Math.PI * 1.25], color: "#d9a15a", rough: 0.7, to: [0, 0, 0], from: [0, 3, -1] },
    ...croissantSegments,
    { geo: "sphere", args: [0.16, 16, 16], color: "#caa05a", rough: 0.7, to: [0.78, 0.18, 0], from: [3.4, 1.4, 0], scaleVec: [1.4, 1, 0.8] },
    { geo: "sphere", args: [0.16, 16, 16], color: "#caa05a", rough: 0.7, to: [-0.78, 0.18, 0], from: [-3.4, 1.4, 0], scaleVec: [1.4, 1, 0.8] },
  ],
};

/* ── Dubai chocolate bar ───────────────────────────────────────────────── */
const dubaiSegments: Part[] = [-0.44, 0, 0.44].flatMap((x, xi) =>
  [-0.24, 0.24].map((z, zi) => ({
    geo: "box" as Geo,
    args: [0.36, 0.1, 0.36],
    color: "#8fce74",
    rough: 0.4,
    to: [x, 0.24, z] as [number, number, number],
    from: scatter(xi * 2 + zi + 2, 3.4),
  }))
);

const dubai: Recipe = {
  tilt: [-0.5, -0.35, 0.05],
  scale: 1.12,
  parts: [
    { geo: "box", args: [1.5, 0.4, 1.0], color: "#3a2418", rough: 0.35, metal: 0.3, to: [0, 0, 0], from: [0, 3.2, -1] },
    ...dubaiSegments,
    { geo: "sphere", args: [0.06, 14, 14], color: "#e3ab6b", rough: 0.2, metal: 0.8, to: [-0.2, 0.34, 0.1], from: [-3, 2.4, 1] },
    { geo: "sphere", args: [0.06, 14, 14], color: "#e3ab6b", rough: 0.2, metal: 0.8, to: [0.3, 0.34, -0.15], from: [3, 2.6, 1] },
    { geo: "box", args: [0.5, 0.4, 0.55], color: "#3a2418", rough: 0.35, metal: 0.3, to: [1.15, -0.1, 0.35], from: [3.6, -1.5, 1], rot: [0.2, 0.5, 0.1] },
  ],
};

export const RECIPES = { cookie, boba, iceCream, shake, donut, croissant, dubai } as const;
export type RecipeKey = keyof typeof RECIPES;
