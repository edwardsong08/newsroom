import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How the newsroom works",
  description: "How The Newsroom is designed over the 4ME OS personal brain and vault.",
  alternates: { canonical: "/system" },
};

export default function SystemPage() {
  return (
    <article className="about-shell system-shell">
      <header className="about-header">
        <div className="about-seal" aria-hidden="true"><span>NR</span><span>Guide 001</span></div>
        <div className="category-folio"><span>The system</span><span>Newsroom design</span></div>
        <p className="section-kicker"><span>Start here</span></p>
        <h1>A small paper, with a serious filing room.</h1>
        <p>The Newsroom is an editorial layer that sits over the 4ME OS brain and vault: selective context in, careful work out.</p>
      </header>

      <div className="system-guide">
        <section><p className="section-kicker">The foundation</p><h2>4ME OS is the brain. The Newsroom is one way to use it.</h2><p>4ME OS is the self-hosted coordination layer for Edward’s approved knowledge: sources, provenance, privacy tiers, timelines, and durable decisions. The Newsroom does not own that life vault. It requests a narrow, permissioned packet and turns that context into journalism, indexes, and next steps.</p></section>
        <section><p className="section-kicker">The handoff</p><h2>Every assignment leaves a trail.</h2><ol className="system-checklist"><li><strong>Scope.</strong> Name the purpose, sources, privacy ceiling, and owner.</li><li><strong>Prepare.</strong> Compose a small packet instead of dumping an entire life archive into a prompt.</li><li><strong>Work.</strong> Let the smallest useful panel research, outline, write, edit, and challenge the draft.</li><li><strong>Verify.</strong> Check claims, permissions, accessibility, metadata, and placement.</li><li><strong>Release.</strong> Publish only after Edward approves, then record what changed and where it lives.</li></ol></section>
        <section><p className="section-kicker">The boundary</p><h2>Helpful is not the same as entitled.</h2><p>No source is ingested merely because it is readable. Obsidian, ChatGPT, Codex, search indexes, and future clients are adapters or views; 4ME OS remains the governed source of truth. Uncertainty stays visible, and private material stays private.</p></section>
        <section className="system-links"><p className="section-kicker">The working documents</p><h2>A living system, not a black box.</h2><p>The public paper is the friendly front door. The detailed contracts, taxonomy, archive rules, role scopes, and audit format live in the repository and evolve with the project.</p><a className="read-story" href="https://github.com/edwardsong08/newsroom" target="_blank" rel="noreferrer">Open the Newsroom repository <span aria-hidden="true">↗</span></a><Link className="read-story" href="/about">Meet the people <span aria-hidden="true">→</span></Link></section>
      </div>
    </article>
  );
}
