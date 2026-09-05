import { SmoothScroll } from "@/components/SmoothScroll";
import { Cursor } from "@/components/Cursor";
import { Preloader } from "@/components/Preloader";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Navbar } from "@/components/Navbar";

import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Menu } from "@/sections/Menu";
import { Visit } from "@/sections/Visit";
import { Footer } from "@/sections/Footer";

export default function Home() {
  return (
    <SmoothScroll>
      <Preloader />
      <Cursor />
      <ScrollProgress />
      <Navbar />

      {/* atmosphere layers */}
      <div className="vignette" aria-hidden />
      <div className="film-grain" aria-hidden />

      <main className="relative">
        {/* 1. Home */}
        <Hero />

        {/* 2. About (compact preview → /about) */}
        <About />

        {/* 3. Our Menu */}
        <Menu />

        {/* 4. Visit */}
        <Visit />

        <Footer />
      </main>
    </SmoothScroll>
  );
}
