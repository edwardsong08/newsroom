import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { desks, getDesk, getPostsByDesk } from "@/lib/posts";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return desks.map((desk) => ({ slug: desk.slug }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const desk = getDesk(slug);

  if (!desk) {
    return { title: "Desk not found" };
  }

  return {
    title: desk.label,
    description: desk.description,
    alternates: { canonical: `/category/${desk.slug}` },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const desk = getDesk(slug);

  if (!desk) {
    notFound();
  }

  const deskPosts = getPostsByDesk(desk.slug);
  const otherDesks = desks.filter((item) => item.slug !== desk.slug);

  return (
    <div className="category-shell">
      <header className="category-header">
        <div className="category-folio">
          <span>Desk {desk.number}</span>
          <span>The Working Draft</span>
        </div>
        <p className="section-kicker">Coverage</p>
        <h1>{desk.label}</h1>
        <p className="category-description">{desk.description}</p>
        <p className="category-manifesto">{desk.manifesto}</p>
      </header>

      {desk.series ? (
        <section className="series-section" aria-labelledby="series-title">
          <div className="section-rule-heading compact">
            <p>Recurring series</p>
            <h2 id="series-title">Past work, kept in view.</h2>
            <span>{String(desk.series.length).padStart(2, "0")}</span>
          </div>
          <div className="series-grid">
            {desk.series.map((series, index) => (
              <article key={series.name}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{series.name}</h3>
                <p>{series.description}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <section className="category-stories" aria-labelledby="stories-title">
        <div className="section-rule-heading compact">
          <p>Filed here</p>
          <h2 id="stories-title">Latest dispatches</h2>
          <span>{String(deskPosts.length).padStart(2, "0")}</span>
        </div>

        {deskPosts.length > 0 ? (
          <div className="archive-list">
            {deskPosts.map((post, index) => (
              <article className="archive-row" key={post.slug}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <p>
                    {post.kicker} · <time dateTime={post.date}>{post.displayDate}</time>
                  </p>
                  <h3>
                    <Link href={`/posts/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p>{post.excerpt}</p>
                </div>
                <Link href={`/posts/${post.slug}`} aria-label={`Read ${post.title}`}>
                  <span aria-hidden="true">↗</span>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-edition">
            <p className="empty-mark" aria-hidden="true">
              ¶
            </p>
            <div>
              <h3>The file is open.</h3>
              <p>
                No dispatches have been published from this desk yet. The beat is
                defined; the first story will arrive when it is ready.
              </p>
            </div>
          </div>
        )}
      </section>

      <nav className="next-desks" aria-label="Explore other desks">
        <p>Elsewhere in this edition</p>
        {otherDesks.map((item) => (
          <Link href={`/category/${item.slug}`} key={item.slug}>
            <span>{item.number}</span>
            {item.label}
            <span aria-hidden="true">→</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
