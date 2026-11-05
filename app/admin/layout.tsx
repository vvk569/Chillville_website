import type { Metadata } from "next";

/** The admin area is private — never index it or follow links into it. */
export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-[100svh] bg-charcoal text-cream">{children}</div>;
}
