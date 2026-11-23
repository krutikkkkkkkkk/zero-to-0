import type { Metadata } from "next";
import { Fraunces, Public_Sans } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
});

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Zero to ₹0 — Learn AI. Keep your money.",
  description:
    "An independent AI course marketing parody with five learning themes, practical exercises, and 12 free public YouTube channels.",
  openGraph: {
    title: "Zero to ₹0 — Learn AI. Keep your money.",
    description: "Learn AI from free public tutorials. Keep your ₹10,000.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${fraunces.variable} ${publicSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
