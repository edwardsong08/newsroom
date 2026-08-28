import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "About Edward Song and this blog.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <section className="about-shell">
      <div className="about-intro">
        <p className="eyebrow">About this place</p>
        <h1>Hello, I’m Edward.</h1>
      </div>
      <div className="about-copy">
        <p>
          I build things for the web and write to make sense of what I learn.
          This is my slower, quieter corner of the internet—a home for ideas
          that deserve more room than a status update.
        </p>
        <p>
          I’m interested in useful software, thoughtful systems, and the small
          decisions that make work feel considered. The notes here are a record
          of experiments, open questions, and lessons from the workbench.
        </p>
        <p>
          If you want the broader picture, my main site and GitHub are good
          places to continue.
        </p>
        <div className="about-links">
          <a className="text-link" href="https://edsong.xyz" target="_blank" rel="noreferrer">
            edsong.xyz <span aria-hidden="true">↗</span>
          </a>
          <a className="text-link" href="https://github.com/edwardsong08" target="_blank" rel="noreferrer">
            GitHub <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
