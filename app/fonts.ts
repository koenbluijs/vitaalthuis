import { Inter } from "next/font/google";

// Open-aperture, goed leesbaar voor 50/60+. Nooit lichter dan Regular (400).
export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});
