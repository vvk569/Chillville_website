import { SmoothScroll } from "@/components/SmoothScroll";
import { Cursor } from "@/components/Cursor";
import { Preloader } from "@/components/Preloader";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Navbar } from "@/components/Navbar";

import { Hero } from "@/sections/Hero";
import { Manifesto } from "@/sections/Manifesto";
import { SignatureBoba } from "@/sections/SignatureBoba";
import { SignatureCookies } from "@/sections/SignatureCookies";
import { Collection } from "@/sections/Collection";
import { Gallery } from "@/sections/Gallery";
import { Craft } from "@/sections/Craft";
import { Numbers } from "@/sections/Numbers";
import { Testimonials } from "@/sections/Testimonials";
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
        <Hero />
        <Manifesto />
        <SignatureBoba />
        <SignatureCookies />
        <Collection />
        <Gallery />
        <Craft />
        <Numbers />
        <Testimonials />
        <Visit />
        <Footer />
      </main>
    </SmoothScroll>
  );
}
