import type { Metadata, Viewport } from "next";
import { DM_Sans, Instrument_Serif } from "next/font/google";
import Link from "next/link";
import type { ReactNode } from "react";
import { desks } from "@/lib/posts";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
});

const description =
  "The Working Draft is Edward Song’s independent journal about technology, career, and a considered life.";

export const metadata: Metadata = {
  metadataBase: new URL("https://blog.edsong.xyz"),
  title: {
    default: "The Working Draft — Edward Song",
    template: "%s — The Working Draft",
  },
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title: "The Working Draft — Edward Song",
    description,
    url: "https://blog.edsong.xyz",
    siteName: "The Working Draft",
    type: "website",
    images: [
      {
        url: "/editorial/enchanted-pressroom.png",
        width: 1536,
        height: 1024,
        alt: "An enchanted sepia pressroom joining technology, law, teaching, and writing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Working Draft — Edward Song",
    description,
    images: ["/editorial/enchanted-pressroom.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#d5c197",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${instrumentSerif.variable}`}
      data-scroll-behavior="smooth"
    >
      <body>
        <a className="skip-link" href="#main-content">
          Skip to the story
        </a>
        <div className="site-frame">
          <header className="publication-header">
            <div className="utility-row">
              <span>Edward Song’s independent broadsheet</span>
              <span>Vol. I · No. 01 · Printed after midnight</span>
              <a href="https://edsong.xyz" target="_blank" rel="noreferrer">
                Portfolio <span aria-hidden="true">↗</span>
              </a>
            </div>

            <div className="ink-ticker" aria-label="Publication notice">
              <div>
                <span>The ink is still drying</span>
                <span aria-hidden="true">✦</span>
                <span>Every certainty remains a working draft</span>
                <span aria-hidden="true">✦</span>
                <span>Read closely—the pictures have opinions</span>
              </div>
            </div>

            <div className="masthead-row">
              <Link className="masthead" href="/" aria-label="The Working Draft, home">
                <span className="masthead-ornament" aria-hidden="true">☾</span>
                <span className="masthead-words">
                  <span className="masthead-the">The</span>
                  <span>Working Draft</span>
                </span>
                <span className="masthead-ornament" aria-hidden="true">☽</span>
              </Link>
              <p>
                Dispatches on technology, changing careers,
                <br />
                and other matters that refuse to sit still.
              </p>
            </div>

            <nav className="section-nav" aria-label="Publication sections">
              <Link href="/">Front Page</Link>
              {desks.map((desk) => (
                <Link href={`/category/${desk.slug}`} key={desk.slug}>
                  {desk.navLabel}
                </Link>
              ))}
              <Link href="/about">About</Link>
            </nav>
          </header>

          <main id="main-content">{children}</main>

          <footer className="publication-footer">
            <div className="footer-name">
              <p>The Working Draft</p>
              <span>Original notes. Restless pictures. Published when the lamps are low.</span>
            </div>
            <nav aria-label="Footer sections">
              {desks.map((desk) => (
                <Link href={`/category/${desk.slug}`} key={desk.slug}>
                  {desk.navLabel}
                </Link>
              ))}
              <Link href="/about">About</Link>
            </nav>
            <div className="footer-base">
              <span>© {new Date().getFullYear()} Edward Song</span>
              <a href="https://github.com/edwardsong08" target="_blank" rel="noreferrer">
                GitHub <span aria-hidden="true">↗</span>
              </a>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
