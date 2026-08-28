import Link from "next/link";

export default function NotFound() {
  return (
    <section className="not-found-shell">
      <div className="lost-page-number" aria-hidden="true">404</div>
      <p className="section-kicker">404 · Stop the presses</p>
      <h1>This story slipped out of the paper.</h1>
      <p>The page may have moved, or the draft may be hiding between editions.</p>
      <Link className="read-story" href="/">
        Return to the front page <span aria-hidden="true">→</span>
      </Link>
    </section>
  );
}
