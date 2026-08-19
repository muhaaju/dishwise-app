import type { Metadata } from "next";
import { Playfair_Display, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ShoppingCart from "@/components/customer/ShoppingCart";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DishWise - Order Direct, Save More",
  description: "Compare restaurant prices with delivery apps and save money by ordering direct for pickup",
  keywords: ["restaurant", "food ordering", "pickup", "save money", "Kochi"],
  authors: [{ name: "DishWise" }],
  openGraph: {
    title: "DishWise - Order Direct, Save More",
    description: "Compare restaurant prices with delivery apps and save money by ordering direct for pickup",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased bg-background text-text">
        {children}
        <ShoppingCart />
      </body>
    </html>
  );
}