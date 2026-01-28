import type { Metadata } from "next";
import { Cinzel, Cormorant_Garamond, Raleway } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cinzel",
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-raleway",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mazix Mahalel | The Frequency Architect",
  description:
    "Your body is the instrument. Frequency is the music. I don't teach. I transmit. You remember.",
  icons: {
    icon: "/images/favicon.png",
    apple: "/images/favicon.png",
  },
  openGraph: {
    title: "Mazix Mahalel | The Frequency Architect",
    description:
      "Your body is the instrument. Frequency is the music. I don't teach. I transmit. You remember.",
    url: "https://www.mazixmahalel.com",
    type: "website",
    images: [
      {
        url: "https://www.mazixmahalel.com/images/og/mazix-og.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://player.vimeo.com/api/player.js"
          strategy="beforeInteractive"
        />
      </head>
      <body
        className={`${cinzel.variable} ${cormorantGaramond.variable} ${raleway.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
