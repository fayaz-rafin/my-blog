// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Providers } from "@/app/providers";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import PixelBlast from "@/components/pixel-blast";

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black min-h-screen`}
        suppressHydrationWarning
      >
        
        <Providers>
          {/* Global background */}
          <div className="fixed inset-0 -z-10">
            <PixelBlast
              className="w-full h-full"
              color="#8B5CF6"
              pixelSize={4}
              patternScale={2.25}
              patternDensity={1}
              pixelSizeJitter={0.2}
              enableRipples
              rippleIntensityScale={0.9}
              rippleThickness={0.15}
              rippleSpeed={0.35}
              liquid
              liquidStrength={0.06}
              liquidRadius={1}
              liquidWobbleSpeed={4.5}
              edgeFade={0.0}
              noiseAmount={0.08}
              variant="diamond"
              transparent={false}
            />
          </div>
          {/* Move the Navbar outside the content container */}
          <Navbar />
          {/* Content container separate from Navbar */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-8 sm:py-12 md:py-16 space-y-16 md:space-y-24">
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
