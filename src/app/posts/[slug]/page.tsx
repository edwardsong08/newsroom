import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDesk, getPost, posts } from "@/lib/posts";

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(
  props: PostPageProps,
): Promise<Metadata> {
  const { slug } = await props.params;
  const post = getPost(slug);

  if (!post) {
    return { title: "Post not found" };
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/posts/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      url: `/posts/${post.slug}`,
    },
  };
}

export default async function PostPage(props: PostPageProps) {
  const { slug } = await props.params;
  const post = getPost(slug);

  if (!post) {
    notFound();
  }

  const desk = getDesk(post.desk);

  return (
    <article className="article-shell">
      <header className="article-header">
        <div className="article-folio">
          <Link href={`/category/${post.desk}`}>{desk?.label}</Link>
          <span>{post.kicker}</span>
          <span>The Working Draft</span>
        </div>
        <h1>{post.title}</h1>
        <p className="article-dek">{post.excerpt}</p>
        <div className="article-meta-line">
          <span>By Edward Song</span>
          <time dateTime={post.date}>Published {post.displayDate}</time>
          <span>{post.readingTime}</span>
        </div>
      </header>

      <div className="article-layout">
        <aside className="article-rail" aria-label="Article details">
          <p>From desk {desk?.number}</p>
          <Link href={`/category/${post.desk}`}>{desk?.label}</Link>
          <span>
            Notes and essays filed from experience, revised in public.
          </span>
        </aside>

        <div className="article-body">
          {post.sections.map((section, index) => (
            <section className="article-section" key={section.heading ?? index}>
              {section.heading ? <h2>{section.heading}</h2> : null}
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}
        </div>
      </div>

      <footer className="article-footer">
        <Link className="read-story" href={`/category/${post.desk}`}>
          <span aria-hidden="true">←</span> More from {desk?.label}
        </Link>
        <span>End of article · Thanks for reading</span>
      </footer>
    </article>
  );
}
