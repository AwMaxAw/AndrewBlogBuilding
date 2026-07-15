import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LiquidGlassFilter from "@/components/LiquidGlassFilter";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "Andrew's Blog",
    template: "%s | Andrew's Blog",
  },
  description: "A personal blog about technology, design, and everyday life.",
  keywords: ["blog", "technology", "design", "frontend", "Next.js", "React"],
  authors: [{ name: "Andrew" }],
  creator: "Andrew",
  publisher: "Andrew",
  metadataBase: new URL("https://andrew-blog-building.vercel.app"),
  openGraph: {
    title: "Andrew's Blog",
    description: "A personal blog about technology, design, and everyday life.",
    type: "website",
    siteName: "Andrew's Blog",
  },
  twitter: {
    card: "summary",
    title: "Andrew's Blog",
    description: "A personal blog about technology, design, and everyday life.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

function generateStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Andrew's Blog",
    "description": "A personal blog about technology, design, and everyday life.",
    "author": {
      "@type": "Person",
      "name": "Andrew",
    },
    "publisher": {
      "@type": "Person",
      "name": "Andrew",
    },
    "url": "https://andrew-blog-building.vercel.app",
    "image": "https://andrew-blog-building.vercel.app/opengraph-image",
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${playfairDisplay.variable} ${inter.variable} font-sans antialiased min-h-screen flex flex-col`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateStructuredData()),
          }}
        />
        <LiquidGlassFilter />
        <Navbar />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
