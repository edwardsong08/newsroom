import Link from "next/link";
import { posts } from "@/lib/posts";

export default function Home() {
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">Edward’s notebook · Est. 2026</p>
          <h1 id="hero-title">
            Notes from the <em>workbench.</em>
          </h1>
        </div>
        <div className="hero-aside">
          <span className="hero-rule" aria-hidden="true" />
          <p>
            A place for unfinished thoughts about software, systems, creative
            work, and the useful things I notice along the way.
          </p>
          <Link className="text-link" href="/about">
            A little about me <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <section className="writing" id="writing" aria-labelledby="writing-title">
        <div className="section-heading">
          <p className="eyebrow">The latest</p>
          <h2 id="writing-title">Writing</h2>
          <span className="issue-count">{String(posts.length).padStart(2, "0")}</span>
        </div>

        <div className="post-list">
          {posts.map((post, index) => (
            <article className="post-row" key={post.slug}>
              <span className="post-index" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="post-main">
                <div className="post-meta">
                  <span>{post.category}</span>
                  <span aria-hidden="true">·</span>
                  <time dateTime={post.date}>{post.displayDate}</time>
                  <span aria-hidden="true">·</span>
                  <span>{post.readingTime}</span>
                </div>
                <h3>
                  <Link href={`/posts/${post.slug}`}>{post.title}</Link>
                </h3>
                <p>{post.excerpt}</p>
              </div>
              <Link
                className="post-arrow"
                href={`/posts/${post.slug}`}
                aria-label={`Read ${post.title}`}
              >
                <span aria-hidden="true">↗</span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="signoff" aria-label="Publishing note">
        <p className="eyebrow">No algorithm, no schedule</p>
        <p className="signoff-line">
          Just good notes, published when they’re ready.
        </p>
      </section>
    </>
  );
}
