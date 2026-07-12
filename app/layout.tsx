import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const siteUrl = "https://chillville.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Chillville Bakery & Boba — Freshly Baked. Perfectly Brewed.",
    template: "%s · Chillville",
  },
  description:
    "Handcrafted boba and small-batch bakery in the LA Arts District. Brown-sugar boba, molten Valrhona cookies, donuts, croissants and Dubai chocolate — a cinematic, luxury experience.",
  keywords: [
    "boba",
    "bubble tea",
    "cookies",
    "bakery",
    "Dubai chocolate",
    "donuts",
    "croissants",
    "Los Angeles cafe",
    "luxury bakery",
  ],
  authors: [{ name: "Chillville Bakery & Boba" }],
  openGraph: {
    title: "Chillville Bakery & Boba",
    description:
      "Handcrafted boba and small-batch bakery — a cinematic, luxury digital flagship.",
    url: siteUrl,
    siteName: "Chillville Bakery & Boba",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chillville Bakery & Boba",
    description: "Handcrafted boba and small-batch bakery — a cinematic experience.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Bakery",
  name: "Chillville Bakery & Boba",
  description:
    "Handcrafted boba and small-batch bakery in the LA Arts District — brown-sugar boba, molten Valrhona cookies, donuts, croissants and Dubai chocolate.",
  servesCuisine: ["Bakery", "Bubble Tea", "Dessert"],
  priceRange: "$$",
  url: siteUrl,
  telephone: "+1-213-555-0147",
  address: {
    "@type": "PostalAddress",
    streetAddress: "27 Marigold Lane, Arts District",
    addressLocality: "Los Angeles",
    addressRegion: "CA",
    postalCode: "90013",
    addressCountry: "US",
  },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"], opens: "08:00", closes: "21:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Friday", opens: "08:00", closes: "23:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "09:00", closes: "23:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Sunday", opens: "09:00", closes: "20:00" },
  ],
  sameAs: ["https://instagram.com", "https://tiktok.com", "https://facebook.com"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
