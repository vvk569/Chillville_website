# Chillville Bakery & Boba

A cinematic, **immersive 3D web experience** for Chillville Bakery & Boba —
handcrafted boba and small-batch bakery, art-directed to feel like an Apple
keynote crossed with a luxury dessert boutique. Not a bakery template.

> Freshly Baked. Perfectly Brewed. _Pure Indulgence._

---

## ✨ Overview

A single-page, scroll-driven luxury experience. The story is carried by motion,
lighting and typography — not paragraphs.

- **Cinematic 3D hero** — a physically-lit boba cup (glass transmission,
  studio reflections) with cookies orbiting slowly and a soft cursor-parallax
  rig. Motion is deliberately subtle: the cup sways only a few degrees.
- **Scroll storytelling** — GSAP ScrollTrigger + Lenis drive every scene:
  a progressive word-reveal manifesto with an evolving gradient, parallax
  product showcases, animated counters, and a **pinned 3D craft scene** where
  cookies separate and the boba shifts perspective as you scroll.
- **Boba & Cookies as heroes** — each gets a full art-directed showcase with
  parallax visuals, notes and pricing.
- **Editorial collection list** (Donuts · Croissants · Dubai Chocolate) with an
  accent glow that follows the hovered row — no repetitive cards.
- **Tasteful micro-interactions** — custom two-part cursor, magnetic buttons,
  line-by-line headline reveals, a hairline scroll-progress bar, film grain and
  vignette.
- **Refined motion language** — one shared set of expo-eased, slow, soft
  transitions (no bounce, no over-rotation). Respects `prefers-reduced-motion`.

### Section flow

1. Hero — 3D boba + orbiting cookies
2. Manifesto — progressive word reveal, evolving gradient
3. Signature Boba — cinematic showcase
4. Signature Cookies — cinematic showcase
5. Collection — editorial interactive list
6. Craft — pinned, scroll-driven 3D scene
7. Why Chillville — animated statistics
8. Testimonials — animated slider
9. Visit — storefront, hours, map, CTAs
10. Footer — socials, contact, newsletter

---

## 🧱 Tech Stack

| Layer          | Choice                                             |
| -------------- | -------------------------------------------------- |
| Framework      | [Next.js 15](https://nextjs.org) (App Router, RSC) |
| Language       | TypeScript                                         |
| Styling        | Tailwind CSS (custom luxury design tokens)         |
| 3D             | three.js · @react-three/fiber · @react-three/drei  |
| Scroll motion  | GSAP + ScrollTrigger                               |
| UI motion      | Framer Motion                                      |
| Smooth scroll  | Lenis                                              |
| Icons          | React Icons                                        |
| Fonts          | Fraunces (display) · Inter (sans)                  |
| Deployment     | Vercel                                             |

### Palette

| Token       | Hex       | Use                     |
| ----------- | --------- | ----------------------- |
| `charcoal`  | `#0a0a0a` | Primary background      |
| `cream`     | `#f2e8d8` | Text / warm accents     |
| `chocolate` | `#3a2418` | Rich tones              |
| `caramel`   | `#c9a26b` | Soft highlight / accent |
| `matcha`    | `#8fae7b` | Elegant green accent    |

---

## 📁 Structure

```
chillville/
├── app/                    # App Router: layout, page, globals, SEO routes
├── components/
│   ├── three/              # R3F scenes, procedural meshes, studio lighting
│   ├── ui/                 # Heading, Reveal, MagneticButton
│   ├── visuals/            # Art-directed CSS boba glass & cookie stack
│   ├── Navbar / Cursor / Preloader / ScrollProgress / SmoothScroll
├── sections/               # One file per scene
├── hooks/                  # useMousePosition, useIsomorphicLayoutEffect
└── lib/                    # data (content), gsap, motion tokens, utils
```

---

## 🚀 Setup

**Requirements:** Node.js 18.18+ (20+ recommended) and npm.

```bash
npm install       # install dependencies
npm run dev       # http://localhost:3000
npm run build     # production build
npm run start     # serve the production build
npm run lint      # lint
```

No environment variables are required.

---

## ▲ Deployment (Vercel)

Zero-config on Vercel.

1. Push this repo to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new) — Next.js is
   auto-detected (build `next build`, install `npm install`).
3. Deploy.

Or via CLI:

```bash
npm i -g vercel
vercel           # preview
vercel --prod    # production
```

> After deploying, update `siteUrl` in `app/layout.tsx` and the URLs in
> `app/robots.ts` / `app/sitemap.ts` to your production domain.

---

## 🎨 Customizing

- **Content** (copy, products, hours, socials): `lib/data.ts`
- **Motion language** (easings, variants): `lib/motion.ts`
- **Colors / type / keyframes**: `tailwind.config.ts`
- **3D products**: `components/three/` (swap primitives, or load a real `.glb`
  via drei's `useGLTF`)

---

## 📈 Performance

- three.js + R3F are dynamically imported (`ssr: false`) — the initial HTML is
  light and the 3D bundle loads only on the client.
- Static prerendering, `image/avif`/`webp`, font `display: swap`, capped `dpr`
  and particle counts, and reduced-motion fallbacks keep Lighthouse scores high.

---

Crafted with obsession in Los Angeles.
