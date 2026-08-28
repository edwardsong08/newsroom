import Link from "next/link";

export default function NotFound() {
  return (
    <section className="not-found-shell">
      <p className="eyebrow">404 · Off the map</p>
      <h1>Nothing on this page—yet.</h1>
      <p>The note you’re looking for may have moved or never made it to the workbench.</p>
      <Link className="text-link" href="/">
        Return home <span aria-hidden="true">→</span>
      </Link>
    </section>
  );
}
