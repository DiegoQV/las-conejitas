import type { Metadata } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";

import { AgeGate } from "@/components/layout/age-gate";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { FloatingWhatsApp } from "@/components/ui/floating-whatsapp";
import { siteIdentity } from "@/data/site";
import { absoluteUrl, siteUrl } from "@/lib/seo";

import "./globals.css";

const displayFont = localFont({
  variable: "--font-display",
  src: "../../public/fonts/bebas-neue-latin.woff2",
  weight: "400",
  style: "normal",
  display: "swap",
});

const bodyFont = localFont({
  variable: "--font-body",
  src: "../../public/fonts/manrope-latin.woff2",
  weight: "300 700",
  style: "normal",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${siteIdentity.name} | ${siteIdentity.descriptor} en ${siteIdentity.city}`,
  description:
    "Gran Regional Night Club: entretenimiento nocturno para mayores de 18 años en Chachapoyas, Amazonas.",
  applicationName: siteIdentity.name,
  alternates: {
    canonical: "/",
  },
  keywords: [
    "Gran Regional",
    "Night Club",
    "Chachapoyas",
    "Amazonas",
    "entretenimiento nocturno",
    "bar en Chachapoyas",
    "night club en Amazonas",
    "Las Conejitas Chachapoyas",
  ],
  openGraph: {
    title: `${siteIdentity.name} | ${siteIdentity.descriptor}`,
    description:
      "Entretenimiento nocturno para mayores de 18 años en Chachapoyas.",
    locale: "es_PE",
    type: "website",
    siteName: siteIdentity.name,
    url: absoluteUrl("/"),
    images: [
      {
        url: absoluteUrl("/images/og-image.webp"),
        width: 1200,
        height: 630,
        alt: `${siteIdentity.name} ${siteIdentity.descriptor} en ${siteIdentity.city}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [absoluteUrl("/images/og-image.webp")],
    title: `${siteIdentity.name} | ${siteIdentity.descriptor}`,
    description:
      "Entretenimiento nocturno para mayores de 18 años en Chachapoyas.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="es" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body>
        <AgeGate />
        <Navbar />
        <ScrollProgress />
        {children}
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
