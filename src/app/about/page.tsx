import type { Metadata } from "next";
import Link from "next/link";
import { desks } from "@/lib/posts";

export const metadata: Metadata = {
  title: "About",
  description: "About Edward Song and The Working Draft.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <article className="about-shell">
      <header className="about-header">
        <div className="about-seal" aria-hidden="true">
          <span>WD</span>
          <span>Est. 2026</span>
        </div>
        <div className="category-folio">
          <span>Editor’s note</span>
          <span>The Working Draft</span>
        </div>
        <p className="section-kicker">About this peculiar paper</p>
        <h1>A record of the work—and the lives around it.</h1>
        <p>
          The Working Draft is Edward Song’s independent journal about
          technology, changing careers, and a considered life.
        </p>
      </header>

      <div className="about-grid">
        <div className="about-copy">
          <p>
            I have moved through different kinds of work: law, teaching,
            writing, and technology. Each field has its own vocabulary, but the
            durable questions travel well. How do we make a strong argument?
            How do we explain something clearly? How do we build tools that
            respect the people using them?
          </p>
          <p>
            This publication is a place to keep those connections visible. Some
            pieces will be practical. Others will be personal. None of them need
            to pretend that a career moves in a straight line.
          </p>
          <p>
            The title is a promise about posture: everything here can be
            reconsidered. The goal is not a permanent hot take. It is a useful
            draft, made clearer by the act of sharing it.
          </p>

          <div className="about-links">
            <a className="read-story" href="https://edsong.xyz" target="_blank" rel="noreferrer">
              Visit edsong.xyz <span aria-hidden="true">↗</span>
            </a>
            <a className="read-story" href="https://github.com/edwardsong08" target="_blank" rel="noreferrer">
              GitHub <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <aside className="about-sidebar" aria-label="Publication coverage">
          <p>Coverage</p>
          <ol>
            {desks.map((desk) => (
              <li key={desk.slug}>
                <span>{desk.number}</span>
                <div>
                  <Link href={`/category/${desk.slug}`}>{desk.label}</Link>
                  <p>{desk.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </aside>
      </div>
    </article>
  );
}
