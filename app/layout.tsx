import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: {
    default: "ApexMetrics — Market Intelligence Without the Noise",
    template: "%s | ApexMetrics"
  },
  description: "Stocks, market context, watchlists and scenario-based portfolio tools in one clean financial command center.",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    title: "ApexMetrics — Market Intelligence",
    description: "See the market and understand what could move it."
  },
  twitter: {
    card: "summary_large_image",
    title: "ApexMetrics — Market Intelligence",
    description: "See the market and understand what could move it."
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
