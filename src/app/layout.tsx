import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
import ScrollToTop from "@/components/layout/ScrollToTop";
import Providers from "@/components/Providers";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Arnas Collection | Zarif Tesettür Modası",
  description: "Zarif ve modern tesettür koleksiyonumuzu keşfedin. Kaliteli ikili takımlar, tunikler, elbiseler ve gömlekler.",
  keywords: "tesettür giyim, ikili takım, tunik, elbise, gömlek, tesettür moda",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${playfair.variable} ${inter.variable} antialiased bg-white`}
      >
        <Providers>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <FloatingWhatsApp />
          <ScrollToTop />
        </Providers>
      </body>
    </html>
  );
}

