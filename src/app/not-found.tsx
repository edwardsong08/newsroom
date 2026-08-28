import Link from "next/link";

export default function NotFound() {
  return (
    <section className="not-found-shell">
      <div className="lost-page-number non-muggle-only" aria-hidden="true">404</div>
      <p className="section-kicker">404 · Stop the presses</p>
      <h1>
        <span className="muggle-only">This story missed the edition.</span>
        <span className="non-muggle-only">This story slipped out of the paper.</span>
      </h1>
      <p>
        <span className="muggle-only">The page may have moved, or the draft may not have made it into print.</span>
        <span className="non-muggle-only">The page may have moved, or the draft may be hiding between editions.</span>
      </p>
      <Link className="read-story" href="/">
        Return to the front page <span aria-hidden="true">→</span>
      </Link>
    </section>
  );
}
