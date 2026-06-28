import type { Metadata, Viewport } from "next";
import "./globals.css";
import { inter } from "./fonts";
import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
  title: "Vitaal Thuis",
  description:
    "Een eenvoudige dagelijkse beweegapp voor 50-plussers. Blijf thuis sterk, soepel en in balans in 5 tot 10 minuten per dag.",
  manifest: "/manifest.webmanifest",
  applicationName: "Vitaal Thuis",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  appleWebApp: { capable: true, title: "Vitaal Thuis", statusBarStyle: "default" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#3e6b52",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" className={inter.variable} suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
