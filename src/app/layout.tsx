import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

// Cormorant Garamond stands in for Simeiz — a true light-weight (300)
// high-contrast display serif with gorgeous italics, 80px "whisper" included.
const playfair = Cormorant_Garamond({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "LFRDCA Technologies — Data, AI & Analytics Engineering",
  description:
    "LFRDCA Technologies is an AI-powered information technology company in Noida, India — crafting data platforms, artificial intelligence, analytics and cloud solutions that help brands appear as unique as they are.",
  keywords: [
    "LFRDCA Technologies",
    "artificial intelligence",
    "data analytics",
    "data science",
    "machine learning",
    "cloud devops",
    "IT services Noida",
  ],
  authors: [{ name: "Satyam RojhaX & associates" }],
  icons: { icon: "/logo.svg" },
  openGraph: {
    title: "LFRDCA Technologies",
    description:
      "An AI-powered IT company — data, intelligence, analytics and everything in between.",
    siteName: "LFRDCA Technologies",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f5f5f3",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${manrope.variable} font-sans antialiased bg-paper text-ink`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
