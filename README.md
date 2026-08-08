# Chillville Bakery & Boba

A cinematic, **immersive web experience** for Chillville Bakery & Boba —
handcrafted boba and small-batch bakery, art-directed to feel like an Apple
keynote crossed with a luxury dessert boutique. Not a bakery template.

> Freshly Baked. Perfectly Brewed. _Pure Indulgence._

---

## ✨ Overview

A single-page, scroll-driven luxury experience. The story is carried by motion,
lighting and typography — not paragraphs.

- **Cinematic photographic hero** — a full-bleed, slowly-drifting product shot
  under layered scrims, with a soft cursor image-trail. The headline reveals
  line-by-line; motion is deliberately restrained.
- **Signature product showcases** — Boba, Cookies and the Dubai bar share one
  premium, numbered showcase treatment (large framed imagery + spec-driven
  copy), alternating sides so they read as one intentional set, not cards.
- **Bento-style menu mosaic** — the full seven-item lineup laid out as a
  photographic bento grid in Our Menu, no separate gallery needed.
- **Cohesive warm-dark palette** — every section shares the header's charcoal +
  caramel/cream aesthetic, alternating charcoal shades for quiet definition.
- **Tasteful micro-interactions** — custom two-part cursor, magnetic buttons,
  line-by-line headline reveals, a hairline scroll-progress bar, film grain and
  vignette.
- **Refined motion language** — one shared set of expo-eased, soft, subtle
  transitions (no bounce, no over-rotation). Respects `prefers-reduced-motion`.

### Section flow

A premium 7-section structure, each reachable from the smooth-scrolling nav:

1. **Home** — full-bleed photographic hero
2. **About** — progressive word-reveal ethos statement
3. **Our Menu** — the full seven-item lineup as a bento-style photo mosaic
4. **Signature Specials** — Boba, Cookies and the Dubai bar, each a full
   numbered showcase
5. **Why Chillville** — animated statistics + guest testimonials slider
6. **Visit** — storefront, hours, map, CTAs
7. **Contact** — details, socials, and a message form

Closed out by a **Footer** — socials, contact, newsletter.

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
