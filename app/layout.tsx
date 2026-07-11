// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Providers } from "@/app/providers";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fayaz Rafin",
  description: "My personal portfolio",
  verification: {
    google: "OLQYFZO0ZFj1WdZRo7DlI-fr3xSL2d3Z_OMjzKRbYyQ",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#090807",
  viewportFit: "cover" as const,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Analytics />
      <SpeedInsights />
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen text-[var(--text-raw)]`}
        suppressHydrationWarning
      >
        
        <Providers>
          <div className="site-bg" aria-hidden="true">
            <div className="site-bg__base" />
            <div className="site-bg__glow site-bg__glow--primary" />
            <div className="site-bg__glow site-bg__glow--secondary" />
            <div className="site-bg__grid" />
            <div className="site-bg__scan" />
            <div className="site-bg__grain" />
            <div className="site-bg__vignette" />
          </div>
          <Navbar />
          <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="pt-[max(5rem,calc(env(safe-area-inset-top)+4.5rem))] pb-8 sm:pt-24 sm:pb-12 md:pb-16">
              {children}
            </div>
          </div>
          
          <Footer />
        </Providers>
      </body>
    </html>
    </>
  );
}
