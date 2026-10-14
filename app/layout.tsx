import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { TopBar } from "@/components/TopBar";
import { DepthGauge } from "@/components/DepthGauge";
import { RevealObserver } from "@/components/RevealObserver";
import { site } from "@/data/site";
import "@/styles/globals.css";

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});
const sans = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });

const title = `${site.name}: builds in computer vision, C++ and the full stack`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: `%s · ${site.name}` },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.links.github }],
  creator: site.name,
  keywords: [
    "TehSaad",
    "computer science student",
    "AI developer",
    "computer vision",
    "MediaPipe",
    "OpenCV",
    "C++",
    "Qt",
    "Next.js",
    "full-stack developer",
    "portfolio",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title,
    description: site.description,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title, description: site.description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0c0c0a",
  colorScheme: "dark",
};

const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  jobTitle: site.role,
  address: { "@type": "PostalAddress", addressLocality: "Islamabad", addressCountry: "PK" },
  sameAs: [site.links.github, site.links.linkedin].filter(Boolean),
  knowsAbout: ["Computer Vision", "Machine Learning", "Python", "C++", "Qt", "Full-Stack Development"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        {/* Reveal-on-scroll only hides content once we know JS is running. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
        />
      </head>
      <body>
        <a
          href="#main"
          className="label sr-only z-[200] bg-signal px-3 py-2 text-ink focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <TopBar />
        <DepthGauge />
        {children}
        <RevealObserver />
      </body>
    </html>
  );
}
