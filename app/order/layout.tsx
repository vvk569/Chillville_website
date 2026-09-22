import { Navbar } from "@/components/Navbar";

/**
 * Shell for the pickup-ordering route: the existing Chillville header plus the
 * site's atmosphere layers over the charcoal body background (matches /menu).
 */
export default function OrderLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="vignette" aria-hidden />
      <div className="film-grain" aria-hidden />
      <main className="relative min-h-screen">{children}</main>
    </>
  );
}
