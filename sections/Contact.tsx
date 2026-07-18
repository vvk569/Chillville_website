"use client";

import { useState } from "react";
import { FiMapPin, FiPhone, FiMail, FiArrowRight } from "react-icons/fi";
import { contact, store, socials } from "@/lib/data";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSent(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-charcoal py-28 sm:py-40">
      <div className="pointer-events-none absolute -left-16 bottom-0 h-[45vh] w-[45vh] rounded-full bg-coral/[0.06] blur-[150px]" />

      <div className="relative mx-auto max-w-content px-6 sm:px-10">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-10">
          {/* intro + details */}
          <div className="lg:col-span-5">
            <Reveal>
              <span className="text-[11px] uppercase tracking-luxe text-caramel">{contact.eyebrow}</span>
            </Reveal>
            <Heading text={contact.title} className="mt-6 text-4xl sm:text-5xl md:text-6xl" />
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-sm text-pretty leading-relaxed text-cream/60">{contact.body}</p>
            </Reveal>

            <div className="mt-10 space-y-5 border-t border-white/10 pt-8">
              <Reveal delay={0.12}>
                <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="flex items-start gap-3 text-sm text-cream/70 transition-colors hover:text-cream">
                  <FiMapPin className="mt-0.5 shrink-0 text-caramel" />
                  <span>{store.address}, {store.city}</span>
                </a>
              </Reveal>
              <Reveal delay={0.16}>
                <a href={`tel:${store.phone.replace(/[^+\d]/g, "")}`} className="flex items-center gap-3 text-sm text-cream/70 transition-colors hover:text-cream">
                  <FiPhone className="shrink-0 text-caramel" />
                  <span>{store.phone}</span>
                </a>
              </Reveal>
              <Reveal delay={0.2}>
                <a href={`mailto:${store.email}`} className="flex items-center gap-3 text-sm text-cream/70 transition-colors hover:text-cream">
                  <FiMail className="shrink-0 text-caramel" />
                  <span>{store.email}</span>
                </a>
              </Reveal>
            </div>

            <Reveal delay={0.24}>
              <div className="mt-10 flex gap-5 text-sm">
                {socials.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="text-cream/50 transition-colors hover:text-caramel">
                    {s.label}
                  </a>
                ))}
              </div>
            </Reveal>
          </div>

          {/* form */}
          <Reveal variant="blur" className="lg:col-span-7">
            <form onSubmit={submit} className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 sm:p-10">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <label className="block">
                  <span className="text-[10px] uppercase tracking-wide2 text-cream/40">Name</span>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    placeholder="Your name"
                    className="mt-3 w-full border-b border-white/15 bg-transparent pb-3 text-sm text-cream outline-none transition-colors placeholder:text-cream/25 focus:border-caramel"
                  />
                </label>
                <label className="block">
                  <span className="text-[10px] uppercase tracking-wide2 text-cream/40">Email</span>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    placeholder="you@email.com"
                    className="mt-3 w-full border-b border-white/15 bg-transparent pb-3 text-sm text-cream outline-none transition-colors placeholder:text-cream/25 focus:border-caramel"
                  />
                </label>
              </div>

              <label className="mt-6 block">
                <span className="text-[10px] uppercase tracking-wide2 text-cream/40">Message</span>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  placeholder="Tell us what's on your mind"
                  className="mt-3 w-full resize-none border-b border-white/15 bg-transparent pb-3 text-sm text-cream outline-none transition-colors placeholder:text-cream/25 focus:border-caramel"
                />
              </label>

              <button
                type="submit"
                className="group mt-8 flex items-center gap-3 rounded-full bg-gradient-to-r from-coral to-caramel px-8 py-4 text-sm font-semibold tracking-wide2 text-charcoal transition-transform duration-500 ease-expo hover:-translate-y-0.5"
              >
                {sent ? "Message sent ✓" : (<>Send Message <FiArrowRight className="transition-transform duration-500 group-hover:translate-x-1" /></>)}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
