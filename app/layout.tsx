import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ozyo Global DMC – Global Turizm Çözümleri",
  description:
    "Avrupa, Amerika, Uzak Doğu ve Orta Doğu'da DMC, MICE, prodüksiyon ve lokasyon hizmetleri. 7/24 profesyonel destek.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}
