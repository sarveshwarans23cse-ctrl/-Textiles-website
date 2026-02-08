import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ["latin"], variable: '--font-playfair' });

export const metadata: Metadata = {
  title: {
    template: '%s | The Weave House',
    default: 'The Weave House | Premium Silk Sarees',
  },
  description: "Discover the finest collection of Kanchipuram silk sarees, designer textiles, and traditional craftsmanship. Elegant fashion for the modern woman.",
  openGraph: {
    title: "The Weave House",
    description: "Premium Silk Sarees & Textiles",
    url: "https://theweavehouse.com",
    siteName: "The Weave House",
    images: [
      {
        url: "/image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

