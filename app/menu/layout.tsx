import { Navbar } from "@/components/Navbar";

/**
 * Shared shell for every /menu/* category page: the existing Chillville header
 * plus the site's atmosphere layers over the charcoal body background.
 */
export default function MenuLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />

      {/* atmosphere layers (match the homepage) */}
      <div className="vignette" aria-hidden />
      <div className="film-grain" aria-hidden />

      <main className="relative min-h-screen">{children}</main>
    </>
  );
}
