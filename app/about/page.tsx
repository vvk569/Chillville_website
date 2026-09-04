import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/sections/Footer";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "The story behind ChillVille — sweet treats, good vibes, and a neighborhood gathering place made to make you smile.",
};

/**
 * Dedicated About Us page (/about). Content is the client-provided copy, kept
 * verbatim and grouped into five sections. Styling mirrors the site's dark,
 * cinematic aesthetic (charcoal ground, cream text, caramel accents).
 */

const intro = {
  paras: [
    "We wanted to create a place where families can stop by for dessert, friends can catch up over boba, students can hang out after school, and anyone can turn an ordinary day into something a little sweeter.",
    "That’s how ChillVille came to life.",
    "Our menu brings together some of the treats we love most — from freshly baked cookies and donuts to refreshing boba, creamy ice cream, indulgent milkshakes, muffins, and specialty desserts.",
    "But ChillVille isn’t just about having lots of choices.",
  ],
  emphasis: "It’s about making those choices worth coming back for.",
};

const smile = {
  paras: [
    "We believe a great dessert starts with good ingredients, thoughtful preparation, and a little creativity.",
    "Whether it’s a warm cookie packed with chocolate chunks, a freshly prepared donut, our House-made delicious Dubai Chocolate, a perfectly mixed boba drink, or an ice cream creation loaded with your favorite toppings, we want every ChillVille treat to feel like something you were excited to order.",
  ],
  lines: [
    "Some will be classics.",
    "Some will be a little unexpected.",
    "And there will always be something new worth trying.",
  ],
};

const gathering = {
  intro:
    "ChillVille is designed to be a neighborhood gathering place — somewhere you can walk in, relax, laugh, celebrate, and stay awhile.",
  lines: [
    "Come after school.",
    "Bring the family.",
    "Meet your friends.",
    "Celebrate the little wins.",
    "Or simply stop by because today feels like a cookie-and-boba kind of day.",
  ],
  outro:
    "Whatever brings you through our doors, we want ChillVille to be a place that feels welcoming, fun, and unmistakably ours.",
};

const promises = [
  {
    title: "Quality First",
    body: "We care about what goes into every treat and how it reaches you. We add NO Preservatives or Stabilizers. Guaranteed. Our Boba Drinks are exclusively Fructose Free too. We definitely care for our customers.",
  },
  {
    title: "Fresh & Delicious",
    body: "From baked treats to drinks and desserts, we’re committed to serving products we’re proud to put the ChillVille name on.",
  },
  {
    title: "Fun Without The Fuss",
    body: "Great desserts don’t need to feel complicated. Pick what you love, customize it your way, and enjoy.",
  },
  {
    title: "Made For Our Community",
    body: "ChillVille was built to become part of the community we serve — a place for families, students, friends, neighbors, and celebrations of every size.",
  },
  {
    title: "Always Something To Discover",
    body: "Seasonal flavors, creative combinations, limited-time treats, and new ideas will keep finding their way onto our menu.",
  },
];

const chill = {
  lines: [
    "Maybe you’re here for the cookies.",
    "Maybe it’s the donuts.",
    "Maybe you already know exactly which boba you’re ordering.",
  ],
  outro:
    "Whatever your favorite turns out to be, we hope ChillVille becomes one of those places you look forward to visiting again and again.",
  emphasis: "Come hungry. Leave happy. And stay awhile.",
};

/** Small caramel eyebrow that indexes each section, matching the site style. */
function Eyebrow({ index, label }: { index: string; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-[11px] tracking-luxe text-caramel">{index}</span>
      <span
        aria-hidden
        className="block h-px w-8 rounded-full bg-caramel/40"
      />
      <span className="text-[11px] uppercase tracking-luxe text-cream/45">
        {label}
      </span>
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-5 font-display text-3xl font-extrabold leading-[1.1] text-cream sm:text-4xl md:text-[2.9rem]">
      {children}
    </h2>
  );
}

export default function AboutPage() {
  return (
    <>
      <Navbar />

      {/* atmosphere layers (match the homepage / menu pages) */}
      <div className="vignette" aria-hidden />
      <div className="film-grain" aria-hidden />

      <main className="relative min-h-screen overflow-x-clip">
        <div className="mx-auto max-w-content px-6 pb-28 pt-32 sm:px-10 sm:pt-40">
          {/* Breadcrumb back home */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-wide2 text-cream/50 transition-colors hover:text-caramel"
          >
            <span aria-hidden>&larr;</span> Back to Chillville
          </Link>

          {/* ── Section 01 · Welcome to ChillVille (hero) ───────────────── */}
          <section className="relative mt-10">
            <div className="pointer-events-none absolute -left-10 -top-24 -z-0 h-[46vh] w-[46vh] rounded-full bg-caramel/[0.07] blur-[150px]" />
            <div className="relative max-w-3xl">
              <span className="text-[11px] uppercase tracking-luxe text-caramel">
                Our Story
              </span>
              <h1 className="mt-4 font-display text-4xl font-extrabold leading-[1.05] text-cream sm:text-6xl md:text-[4.2rem] md:leading-[1.02]">
                Welcome to ChillVille
              </h1>
              <p className="mt-5 font-display text-xl text-caramel sm:text-2xl">
                Sweet Treats. Good Vibes. Great Moments.
              </p>
              <p className="mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-cream/80 sm:text-xl">
                ChillVille was created with a simple idea:{" "}
                <em className="not-italic text-cream">
                  the best treats should come with a great experience.
                </em>
              </p>
              <div className="mt-6 max-w-2xl space-y-5 text-pretty text-base leading-relaxed text-cream/65 sm:text-lg">
                {intro.paras.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <p className="mt-8 max-w-2xl font-display text-2xl leading-snug text-cream sm:text-3xl">
                {intro.emphasis}
              </p>
            </div>
          </section>

          <Divider />

          {/* ── Section 02 · Made to Make You Smile ─────────────────────── */}
          <section className="max-w-3xl">
            <Eyebrow index="02" label="Our Craft" />
            <SectionHeading>Made to Make You Smile</SectionHeading>
            <div className="mt-7 space-y-5 text-pretty text-base leading-relaxed text-cream/70 sm:text-lg">
              {smile.paras.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <ul className="mt-8 space-y-2.5">
              {smile.lines.map((l, i) => (
                <li
                  key={i}
                  className="font-display text-xl text-cream/90 sm:text-2xl"
                >
                  {l}
                </li>
              ))}
            </ul>
          </section>

          <Divider />

          {/* ── Section 03 · More Than a Dessert Shop ───────────────────── */}
          <section className="max-w-3xl">
            <Eyebrow index="03" label="The Place" />
            <SectionHeading>More Than a Dessert Shop</SectionHeading>
            <p className="mt-7 text-pretty text-base leading-relaxed text-cream/70 sm:text-lg">
              {gathering.intro}
            </p>
            <ul className="mt-8 space-y-2.5">
              {gathering.lines.map((l, i) => (
                <li
                  key={i}
                  className="font-display text-xl text-cream/90 sm:text-2xl"
                >
                  {l}
                </li>
              ))}
            </ul>
            <p className="mt-8 max-w-2xl text-pretty text-base leading-relaxed text-cream/70 sm:text-lg">
              {gathering.outro}
            </p>
          </section>

          <Divider />

          {/* ── Section 04 · The ChillVille Promise ─────────────────────── */}
          <section>
            <div className="max-w-3xl">
              <Eyebrow index="04" label="Our Promise" />
              <SectionHeading>The ChillVille Promise</SectionHeading>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {promises.map((p) => (
                <article
                  key={p.title}
                  className="flex h-full flex-col rounded-2xl border border-cream/10 bg-cream/[0.02] p-6 transition-colors duration-500 hover:border-caramel/30"
                >
                  <h3 className="text-xs font-semibold uppercase tracking-wide2 text-caramel">
                    {p.title}
                  </h3>
                  <span
                    aria-hidden
                    className="mt-3 block h-px w-8 rounded-full bg-caramel/40"
                  />
                  <p className="mt-4 text-pretty text-sm leading-relaxed text-cream/70">
                    {p.body}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <Divider />

          {/* ── Section 05 · Come Chill With Us ─────────────────────────── */}
          <section className="relative">
            <div className="pointer-events-none absolute -right-10 top-10 -z-0 h-[42vh] w-[42vh] rounded-full bg-matcha/[0.06] blur-[150px]" />
            <div className="relative max-w-3xl">
              <Eyebrow index="05" label="Come Say Hi" />
              <SectionHeading>Come Chill With Us</SectionHeading>
              <ul className="mt-8 space-y-2.5">
                {chill.lines.map((l, i) => (
                  <li
                    key={i}
                    className="font-display text-xl text-cream/90 sm:text-2xl"
                  >
                    {l}
                  </li>
                ))}
              </ul>
              <p className="mt-8 max-w-2xl text-pretty text-base leading-relaxed text-cream/70 sm:text-lg">
                {chill.outro}
              </p>
              <p className="mt-10 font-display text-3xl leading-snug text-caramel sm:text-4xl">
                {chill.emphasis}
              </p>

              {/* Sign-off */}
              <div className="mt-14 border-t border-cream/10 pt-10">
                <p className="font-display text-2xl font-extrabold text-cream sm:text-3xl">
                  Welcome to ChillVille
                </p>
                <p className="mt-2 font-display text-lg text-caramel sm:text-xl">
                  Sweet Treats. Good Vibes.
                </p>
                <Link
                  href="/#menu"
                  className="mt-8 inline-block rounded-full border border-cream/20 px-6 py-2.5 text-xs uppercase tracking-wide2 text-cream transition-colors duration-500 hover:border-caramel hover:text-caramel"
                >
                  Explore the menu
                </Link>
              </div>
            </div>
          </section>
        </div>

        <Footer />
      </main>
    </>
  );
}

/** Thin full-width rule used between sections. */
function Divider() {
  return (
    <hr
      aria-hidden
      className="my-16 h-px border-0 bg-cream/10 sm:my-20"
    />
  );
}
