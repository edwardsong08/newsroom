import type { Metadata } from "next";
import { DM_Sans, Instrument_Serif } from "next/font/google";
import Link from "next/link";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://blog.edsong.xyz"),
  title: {
    default: "Edward Song — Notes from the workbench",
    template: "%s — Edward Song",
  },
  description:
    "Notes on building useful things, learning in public, and paying attention.",
  openGraph: {
    title: "Edward Song — Notes from the workbench",
    description:
      "Notes on building useful things, learning in public, and paying attention.",
    url: "https://blog.edsong.xyz",
    siteName: "Edward Song",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Edward Song — Notes from the workbench",
    description:
      "Notes on building useful things, learning in public, and paying attention.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${instrumentSerif.variable}`}
      data-scroll-behavior="smooth"
    >
      <body>
        <div className="site-frame">
          <header className="site-header">
            <Link className="wordmark" href="/" aria-label="Edward Song, home">
              <span className="wordmark-mark" aria-hidden="true">
                ES
              </span>
              <span>Edward Song</span>
            </Link>
            <nav className="site-nav" aria-label="Primary navigation">
              <Link href="/#writing">Writing</Link>
              <Link href="/about">About</Link>
              <a href="https://edsong.xyz" target="_blank" rel="noreferrer">
                Main site <span aria-hidden="true">↗</span>
              </a>
            </nav>
          </header>
          <main>{children}</main>
          <footer className="site-footer">
            <p>© {new Date().getFullYear()} Edward Song</p>
            <p>Made with care and a little curiosity.</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
