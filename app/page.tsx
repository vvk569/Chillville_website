import { SmoothScroll } from "@/components/SmoothScroll";
import { Cursor } from "@/components/Cursor";
import { Preloader } from "@/components/Preloader";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Navbar } from "@/components/Navbar";

import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Craft } from "@/sections/Craft";
import { Menu } from "@/sections/Menu";
import { SignatureSpecialsIntro } from "@/sections/SignatureSpecials";
import { SignatureBoba } from "@/sections/SignatureBoba";
import { SignatureCookies } from "@/sections/SignatureCookies";
import { DubaiStory } from "@/sections/DubaiStory";
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

        {/* 2. About Us */}
        <About />
        <Craft />

        {/* 3. Our Menu */}
        <Menu />

        {/* 4. Signature Specials */}
        <div id="specials">
          <SignatureSpecialsIntro />
          <SignatureBoba />
          <SignatureCookies />
          <DubaiStory />
        </div>

        {/* 5. Why Chillville */}
        <div id="why">
          <Numbers />
          <Testimonials />
        </div>

        {/* 6. Visit Us */}
        <Visit />

        {/* 7. Contact Us */}
        <Contact />

        <Footer />
      </main>
    </SmoothScroll>
  );
}
