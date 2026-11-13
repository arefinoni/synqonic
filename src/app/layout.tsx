import type { Metadata } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ResponsiveContainer } from "@/components/ui/responsive-container";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const socialImage = siteUrl ? [{ url: "/brand/synqonic-logo.png", alt: "SYNQONIC logo" }] : undefined;

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title: {
    default: "SYNQONIC - Question the system. Break assumptions.",
    template: "%s - SYNQONIC",
  },
  description:
    "SYNQONIC is a cybersecurity education, research, media, and community platform.",
  icons: { icon: "/brand/synqonic-logo.png" },
  applicationName: "SYNQONIC",
  keywords: ["cybersecurity", "security education", "security research"],
  alternates: siteUrl ? { canonical: "/" } : undefined,
  openGraph: {
    type: "website",
    siteName: "SYNQONIC",
    title: "SYNQONIC - Question the system. Break assumptions.",
    description: "Cybersecurity education, research, media, and community.",
    images: socialImage,
  },
  twitter: {
    card: "summary",
    title: "SYNQONIC - Question the system. Break assumptions.",
    description: "Cybersecurity education, research, media, and community.",
    images: socialImage,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${jetBrainsMono.variable}`}>
      <body className="flex min-h-screen flex-col antialiased">
        <a
          href="#main-content"
          className="sr-only z-50 rounded bg-accent px-4 py-3 font-medium text-accent-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <ResponsiveContainer>
          <Footer />
        </ResponsiveContainer>
      </body>
    </html>
  );
}
