import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./sections/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          DEFAULT: "#0a0a0a",
          800: "#100f0d",
          700: "#14110c",
          600: "#1a1611",
        },
        cream: {
          DEFAULT: "#f2e8d8",
          dim: "#cabfae",
        },
        chocolate: {
          DEFAULT: "#3a2418",
          light: "#5a3825",
        },
        caramel: "#c9a26b",
        matcha: "#8fae7b",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        luxe: "0.24em",
        wide2: "0.14em",
      },
      maxWidth: {
        content: "1240px",
      },
      transitionTimingFunction: {
        expo: "cubic-bezier(0.16, 1, 0.3, 1)",
        smooth: "cubic-bezier(0.65, 0, 0.35, 1)",
      },
      keyframes: {
        "drift-slow": {
          "0%, 100%": { transform: "translate3d(0,0,0)" },
          "50%": { transform: "translate3d(0,-12px,0)" },
        },
        "sheen": {
          "0%": { transform: "translateX(-120%)" },
          "100%": { transform: "translateX(220%)" },
        },
        "marquee": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "drift-slow": "drift-slow 9s cubic-bezier(0.45,0,0.55,1) infinite",
        marquee: "marquee 48s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
