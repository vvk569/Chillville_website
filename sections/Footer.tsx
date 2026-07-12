"use client";

import { useState } from "react";
import { FiInstagram, FiFacebook, FiArrowRight } from "react-icons/fi";
import { FaTiktok } from "react-icons/fa";
import { nav, socials, store } from "@/lib/data";

const iconMap: Record<string, React.ReactNode> = {
  instagram: <FiInstagram />,
  facebook: <FiFacebook />,
  tiktok: <FaTiktok />,
};

export function Footer() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSent(true);
    setEmail("");
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-charcoal pt-24">
      {/* oversized marquee wordmark */}
      <div className="pointer-events-none select-none overflow-hidden py-6">
        <div className="animate-marquee whitespace-nowrap font-display text-[16vw] leading-none text-white/[0.028]">
          Chillville · Bakery · Boba · Chillville · Bakery · Boba ·&nbsp;
        </div>
      </div>

      <div className="mx-auto max-w-content px-6 pb-12 sm:px-10">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-12">
          {/* newsletter */}
          <div className="md:col-span-6">
            <h3 className="font-display text-3xl text-cream sm:text-4xl">
              Join the inner circle.
            </h3>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream/55">
              Drop alerts, secret-menu invites and first dibs on seasonal
              collections.
            </p>
            <form onSubmit={submit} className="mt-8 flex max-w-md items-center gap-3 border-b border-white/20 pb-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="w-full bg-transparent text-sm text-cream outline-none placeholder:text-cream/30"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="flex items-center gap-2 whitespace-nowrap text-[11px] uppercase tracking-wide2 text-caramel transition-colors hover:text-cream"
              >
                {sent ? "Joined ✓" : (<>Subscribe <FiArrowRight /></>)}
              </button>
            </form>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-[11px] uppercase tracking-luxe text-cream/40">Explore</h4>
            <ul className="mt-6 space-y-3 text-sm">
              {nav.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-cream/60 transition-colors hover:text-cream">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-[11px] uppercase tracking-luxe text-cream/40">Contact</h4>
            <ul className="mt-6 space-y-3 text-sm text-cream/60">
              <li>{store.address}</li>
              <li>{store.city}</li>
              <li>
                <a href={`mailto:${store.email}`} className="hover:text-cream">{store.email}</a>
              </li>
            </ul>
            <div className="mt-6 flex gap-4 text-lg text-cream/60">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="transition-colors hover:text-caramel"
                >
                  {iconMap[s.icon]}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-[11px] uppercase tracking-wide2 text-cream/35 sm:flex-row">
          <p>© {new Date().getFullYear()} Chillville Bakery &amp; Boba</p>
          <p>Crafted with obsession in Los Angeles</p>
        </div>
      </div>
    </footer>
  );
}
