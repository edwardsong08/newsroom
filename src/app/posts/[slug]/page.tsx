import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost, posts } from "@/lib/posts";

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

  return (
    <article className="article-shell">
      <header className="article-header">
        <p className="eyebrow">{post.category}</p>
        <h1>{post.title}</h1>
        <p className="article-dek">{post.excerpt}</p>
        <div className="article-meta-line">
          <time dateTime={post.date}>{post.displayDate}</time>
          <span aria-hidden="true">·</span>
          <span>{post.readingTime}</span>
          <span aria-hidden="true">·</span>
          <span>Edward Song</span>
        </div>
      </header>

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

      <footer className="article-footer">
        <Link className="text-link" href="/#writing">
          <span aria-hidden="true">←</span> All writing
        </Link>
        <span>Thanks for reading.</span>
      </footer>
    </article>
  );
}
