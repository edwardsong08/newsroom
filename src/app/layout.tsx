import type { Metadata, Viewport } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { desks } from "@/lib/posts";
import "./globals.css";
import "./muggle.css";

const description =
  "The Newsroom is Edward Song’s independent paper about technology, career, and a considered life.";

export const metadata: Metadata = {
  metadataBase: new URL("https://news.edsong.xyz"),
  title: {
    default: "The Newsroom — Edward Song",
    template: "%s — The Newsroom",
  },
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title: "The Newsroom — Edward Song",
    description,
    url: "https://news.edsong.xyz",
    siteName: "The Newsroom",
    type: "website",
    images: [
      {
        url: "/editorial/front-page-engraving.png",
        width: 1536,
        height: 1024,
        alt: "An engraved desk where technology, career, and life meet on the page",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Newsroom — Edward Song",
    description,
    images: ["/editorial/front-page-engraving.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#f2ecdf",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="en"
      className="newsroom-document"
      data-scroll-behavior="smooth"
      data-edition="muggle"
    >
      <body>
        <a className="skip-link" href="#main-content">
          Skip to the story
        </a>
        <div className="site-frame">
          <header className="publication-header">
            <div className="utility-row">
              <span>Edward Song’s independent newsroom</span>
              <span>Vol. I · Issue 01 · Est. 2026</span>
              <div className="utility-actions">
                <a href="https://edsong.xyz" target="_blank" rel="noreferrer">
                  Portfolio <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>

            <div className="masthead-row">
              <Link className="masthead" href="/" aria-label="The Newsroom, home">
                <span className="masthead-words">
                  <span className="masthead-the">The</span>
                  <span>Newsroom</span>
                </span>
              </Link>
              <p>
                Dispatches on technology, changing careers,
                <br />
                and the work of living deliberately.
              </p>
            </div>

            <nav className="section-nav" aria-label="Publication sections">
              <Link href="/">Front Page</Link>
              {desks.map((desk) => (
                <Link href={`/category/${desk.slug}`} key={desk.slug}>
                  {desk.navLabel}
                </Link>
              ))}
              <Link href="/about">People</Link>
              <Link href="/system">How it works</Link>
            </nav>
          </header>

          <main id="main-content">{children}</main>

          <footer className="publication-footer">
            <div className="footer-name">
              <p>The Newsroom</p>
              <span>Original notes. No algorithm. Published when ready.</span>
            </div>
            <nav aria-label="Footer sections">
              {desks.map((desk) => (
                <Link href={`/category/${desk.slug}`} key={desk.slug}>
                  {desk.navLabel}
                </Link>
              ))}
              <Link href="/about">People</Link>
              <Link href="/system">How it works</Link>
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
