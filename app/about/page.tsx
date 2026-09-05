import type { Metadata } from "next";
import Link from "next/link";
import {
  FiShield,
  FiFeather,
  FiSmile,
  FiUsers,
  FiCompass,
  FiArrowRight,
} from "react-icons/fi";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/sections/Footer";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "The story behind ChillVille — sweet treats, good vibes, and a neighborhood gathering place made to make you smile.",
};

/**
 * Dedicated About Us page (/about). The client-provided copy is kept verbatim
 * and presented as a polished, scrollable brand page: an image hero, alternating
 * image/text sections, a full-width banner, animated Promise cards, and a closing
 * band — all in the site's dark, cinematic aesthetic (charcoal, cream, caramel).
 * Existing ChillVille photography is used as supporting visuals, never dominant.
 */

// ── Content (verbatim) ──────────────────────────────────────────────────────
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
    icon: FiShield,
    title: "Quality First",
    body: "We care about what goes into every treat and how it reaches you. We add NO Preservatives or Stabilizers. Guaranteed. Our Boba Drinks are exclusively Fructose Free too. We definitely care for our customers.",
  },
  {
    icon: FiFeather,
    title: "Fresh & Delicious",
    body: "From baked treats to drinks and desserts, we’re committed to serving products we’re proud to put the ChillVille name on.",
  },
  {
    icon: FiSmile,
    title: "Fun Without The Fuss",
    body: "Great desserts don’t need to feel complicated. Pick what you love, customize it your way, and enjoy.",
  },
  {
    icon: FiUsers,
    title: "Made For Our Community",
    body: "ChillVille was built to become part of the community we serve — a place for families, students, friends, neighbors, and celebrations of every size.",
  },
  {
    icon: FiCompass,
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

// ── Small building blocks ───────────────────────────────────────────────────
function Eyebrow({ index, label }: { index: string; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-[11px] tracking-luxe text-caramel">{index}</span>
      <span aria-hidden className="block h-px w-8 rounded-full bg-caramel/40" />
      <span className="text-[11px] uppercase tracking-luxe text-cream/45">
        {label}
      </span>
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-5 font-display text-2xl font-extrabold leading-[1.12] text-cream sm:text-3xl md:text-4xl">
      {children}
    </h2>
  );
}

function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <figure className="relative mt-9 max-w-2xl border-l-2 border-caramel/60 pl-6">
      <p className="font-display text-xl leading-snug text-cream sm:text-2xl">
        {children}
      </p>
    </figure>
  );
}

function Divider() {
  return (
    <hr aria-hidden className="my-16 h-px border-0 bg-cream/10 sm:my-24" />
  );
}

/** Rounded, bordered image frame with a soft bottom gradient. */
function Frame({
  src,
  alt,
  className,
  priority,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-cream/10",
        className
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-transparent to-transparent" />
    </div>
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
        {/* ══ HERO · Welcome to ChillVille ════════════════════════════════ */}
        <section
          id="welcome"
          className="relative flex min-h-[82vh] items-end scroll-mt-24"
        >
          {/* backdrop image + cinematic overlays */}
          <div className="absolute inset-0 -z-10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/cookies.jpg"
              alt="A freshly baked ChillVille cookie"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-charcoal/40" />
            <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 to-transparent" />
          </div>

          <div className="mx-auto w-full max-w-content px-6 pb-16 pt-36 sm:px-10 sm:pb-24 sm:pt-44">
            <Reveal>
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-[11px] uppercase tracking-wide2 text-cream/60 transition-colors hover:text-caramel"
              >
                <span aria-hidden>&larr;</span> Back to Chillville
              </Link>
            </Reveal>
            <Reveal delay={0.05}>
              <span className="mt-8 block text-[11px] uppercase tracking-luxe text-caramel">
                Our Story
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="mt-4 max-w-3xl font-display text-4xl font-extrabold leading-[1.04] text-cream sm:text-6xl">
                Welcome to ChillVille
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-5 font-display text-lg text-caramel sm:text-2xl">
                Sweet Treats. Good Vibes. Great Moments.
              </p>
            </Reveal>
            <Reveal delay={0.22}>
              <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-cream/80 sm:text-lg">
                ChillVille was created with a simple idea:{" "}
                <em className="not-italic text-cream">
                  the best treats should come with a great experience.
                </em>
              </p>
            </Reveal>
          </div>
        </section>

        <div className="mx-auto max-w-content px-6 pb-28 sm:px-10">
          {/* ══ 01 · Welcome (intro) — text left, image right ═════════════ */}
          <section className="grid grid-cols-1 gap-10 pt-20 sm:pt-28 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <div className="max-w-2xl space-y-5 text-pretty text-base leading-relaxed text-cream/70 sm:text-lg">
                {intro.paras.map((p, i) => (
                  <Reveal key={i} delay={i * 0.05} as="p">
                    {p}
                  </Reveal>
                ))}
              </div>
              <Reveal delay={0.15}>
                <PullQuote>{intro.emphasis}</PullQuote>
              </Reveal>
            </div>
            <div className="lg:col-span-5">
              <Reveal variant="blur" delay={0.1}>
                <Frame
                  src="/menu%20pics/Boba/Boba_BrownSugar_Menu.jpg"
                  alt="Brown sugar boba, hand-shaken"
                  className="aspect-[4/5] w-full lg:sticky lg:top-28"
                />
              </Reveal>
            </div>
          </section>

          <Divider />

          {/* ══ 02 · Made to Make You Smile — image left, text right ══════ */}
          <section id="craft" className="scroll-mt-24">
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
              <div className="lg:col-span-5 lg:order-1 order-2">
                <Reveal variant="blur">
                  <Frame
                    src="/menu%20pics/Cookies/oreo-cream-bliss_R_cookie_menu.jpg"
                    alt="An Oreo cream cookie, freshly baked"
                    className="aspect-[4/3] w-full"
                  />
                </Reveal>
              </div>
              <div className="lg:col-span-7 lg:order-2 order-1">
                <Reveal>
                  <Eyebrow index="02" label="Our Craft" />
                </Reveal>
                <Reveal delay={0.05}>
                  <SectionHeading>Made to Make You Smile</SectionHeading>
                </Reveal>
                <div className="mt-6 max-w-xl space-y-5 text-pretty text-base leading-relaxed text-cream/70 sm:text-lg">
                  {smile.paras.map((p, i) => (
                    <Reveal key={i} delay={0.1 + i * 0.05} as="p">
                      {p}
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
            {/* three short beats as chips */}
            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {smile.lines.map((l, i) => (
                <Reveal key={i} delay={0.1 + i * 0.08}>
                  <div className="flex h-full items-center gap-3 rounded-xl border border-cream/10 bg-cream/[0.02] px-5 py-4 transition-colors duration-500 hover:border-caramel/30">
                    <span
                      aria-hidden
                      className="h-1.5 w-1.5 shrink-0 rounded-full bg-caramel"
                    />
                    <span className="font-display text-base text-cream/90 sm:text-lg">
                      {l}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          <Divider />

          {/* ══ 03 · More Than a Dessert Shop — banner + invitations ══════ */}
          <section id="place" className="scroll-mt-24">
            <div className="max-w-3xl">
              <Reveal>
                <Eyebrow index="03" label="The Place" />
              </Reveal>
              <Reveal delay={0.05}>
                <SectionHeading>More Than a Dessert Shop</SectionHeading>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-6 text-pretty text-base leading-relaxed text-cream/70 sm:text-lg">
                  {gathering.intro}
                </p>
              </Reveal>
            </div>

            {/* full-width food animation (replaces the static banner) — bare,
                controls-free, muted autoplay loop; keeps its native aspect ratio */}
            <Reveal variant="blur" delay={0.1}>
              {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
              <video
                className="mt-9 block w-full rounded-2xl"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="ChillVille food animation"
              >
                <source src="/videos/about-dessert-shop.mp4" type="video/mp4" />
              </video>
            </Reveal>

            {/* invitations grid */}
            <ul className="mt-9 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {gathering.lines.map((l, i) => (
                <Reveal key={i} delay={0.08 + i * 0.06} as="li">
                  <div className="group flex items-start gap-3 rounded-xl border border-cream/10 bg-cream/[0.02] px-5 py-4 transition-colors duration-500 hover:border-caramel/30">
                    <FiArrowRight
                      aria-hidden
                      className="mt-1 shrink-0 text-caramel transition-transform duration-500 ease-expo group-hover:translate-x-1"
                    />
                    <span className="font-display text-base text-cream/90 sm:text-lg">
                      {l}
                    </span>
                  </div>
                </Reveal>
              ))}
            </ul>
            <Reveal delay={0.18}>
              <p className="mt-8 max-w-2xl text-pretty text-base leading-relaxed text-cream/70 sm:text-lg">
                {gathering.outro}
              </p>
            </Reveal>
          </section>

          <Divider />

          {/* ══ 04 · The ChillVille Promise — five animated cards ═════════ */}
          <section id="promise" className="scroll-mt-24">
            <div className="max-w-3xl">
              <Reveal>
                <Eyebrow index="04" label="Our Promise" />
              </Reveal>
              <Reveal delay={0.05}>
                <SectionHeading>The ChillVille Promise</SectionHeading>
              </Reveal>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {promises.map((p, i) => {
                const Icon = p.icon;
                return (
                  <Reveal key={p.title} delay={i * 0.07}>
                    <article className="group flex h-full flex-col rounded-2xl border border-cream/10 bg-cream/[0.02] p-6 transition-all duration-500 hover:-translate-y-1 hover:border-caramel/40 hover:bg-cream/[0.04]">
                      <div className="flex items-center justify-between">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-caramel/25 bg-caramel/[0.08] text-caramel transition-colors duration-500 group-hover:border-caramel/50">
                          <Icon aria-hidden className="h-4 w-4" />
                        </span>
                        <span className="font-display text-sm text-cream/25">
                          0{i + 1}
                        </span>
                      </div>
                      <h3 className="mt-5 text-xs font-semibold uppercase tracking-wide2 text-caramel">
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
                  </Reveal>
                );
              })}
            </div>
          </section>

          <Divider />

          {/* ══ 05 · Come Chill With Us — closing, image band ════════════ */}
          <section id="chill" className="scroll-mt-24">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
              <div className="lg:col-span-7">
                <Reveal>
                  <Eyebrow index="05" label="Come Say Hi" />
                </Reveal>
                <Reveal delay={0.05}>
                  <SectionHeading>Come Chill With Us</SectionHeading>
                </Reveal>
                <ul className="mt-8 space-y-3">
                  {chill.lines.map((l, i) => (
                    <Reveal key={i} delay={0.1 + i * 0.07} as="li">
                      <div className="flex items-center gap-4">
                        <span
                          aria-hidden
                          className="h-px w-6 shrink-0 rounded-full bg-caramel/50"
                        />
                        <span className="font-display text-lg text-cream/90 sm:text-xl">
                          {l}
                        </span>
                      </div>
                    </Reveal>
                  ))}
                </ul>
                <Reveal delay={0.28}>
                  <p className="mt-8 max-w-2xl text-pretty text-base leading-relaxed text-cream/70 sm:text-lg">
                    {chill.outro}
                  </p>
                </Reveal>
                <Reveal delay={0.34}>
                  <PullQuote>{chill.emphasis}</PullQuote>
                </Reveal>
              </div>
              <div className="lg:col-span-5">
                <Reveal variant="blur" delay={0.1}>
                  <Frame
                    src="/menu%20pics/Icecream%20Shakes/shake_salted-caramel_menu.jpg"
                    alt="A salted-caramel ChillVille shake"
                    className="aspect-[4/5] w-full"
                  />
                </Reveal>
              </div>
            </div>

            {/* sign-off band */}
            <Reveal variant="blur" delay={0.05}>
              <div className="relative mt-14 overflow-hidden rounded-2xl border border-cream/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/menu%20pics/Cookies/dubai_R_cookie_menu.jpg"
                  alt="ChillVille Dubai chocolate cookie"
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-charcoal/80" />
                <div className="relative px-8 py-16 text-center sm:px-10 sm:py-20">
                  <p className="font-display text-2xl font-extrabold text-cream sm:text-3xl">
                    Welcome to ChillVille
                  </p>
                  <p className="mt-2 font-display text-lg text-caramel sm:text-xl">
                    Sweet Treats. Good Vibes.
                  </p>
                  <Link
                    href="/#menu"
                    className="group mt-8 inline-flex items-center gap-2.5 rounded-full border border-cream/25 px-6 py-2.5 text-xs uppercase tracking-wide2 text-cream transition-colors duration-500 hover:border-caramel hover:text-caramel"
                  >
                    Explore the menu
                    <FiArrowRight
                      aria-hidden
                      className="transition-transform duration-500 ease-expo group-hover:translate-x-1"
                    />
                  </Link>
                </div>
              </div>
            </Reveal>
          </section>
        </div>

        <Footer />
      </main>
    </>
  );
}
