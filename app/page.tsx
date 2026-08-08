import { SmoothScroll } from "@/components/SmoothScroll";
import { Cursor } from "@/components/Cursor";
import { Preloader } from "@/components/Preloader";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Navbar } from "@/components/Navbar";

import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Menu } from "@/sections/Menu";
import { SignatureSpecialsIntro } from "@/sections/SignatureSpecials";
import { SignatureBoba } from "@/sections/SignatureBoba";
import { SignatureCookies } from "@/sections/SignatureCookies";
import { Specials } from "@/sections/Specials";
import { Numbers } from "@/sections/Numbers";
import { Testimonials } from "@/sections/Testimonials";
import { Visit } from "@/sections/Visit";
import { Contact } from "@/sections/Contact";
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

        {/* 2. About */}
        <About />

        {/* 3. Our Menu */}
        <Menu />

        {/* 4. Signature Specials — Boba, Cookies & the Dubai bar */}
        <div id="specials">
          <SignatureSpecialsIntro />
          <SignatureBoba />
          <SignatureCookies />
          <Specials />
        </div>

        {/* 5. Why Chillville */}
        <div id="why">
          <Numbers />
          <Testimonials />
        </div>

        {/* 6. Visit */}
        <Visit />

        {/* 7. Contact */}
        <Contact />

        <Footer />
      </main>
    </SmoothScroll>
  );
}
