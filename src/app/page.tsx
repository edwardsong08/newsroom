import Image from "next/image";
import Link from "next/link";
import { DeskPortrait } from "@/components/desk-portrait";
import { desks, getDesk, posts } from "@/lib/posts";

export default function Home() {
  const leadStory = posts[0];
  const leadDesk = getDesk(leadStory.desk);

  return (
    <>
      <div className="front-kicker" aria-label="Front page introduction">
        <span>Front Page</span>
        <p>One place for work that crosses categories.</p>
        <span>Read slowly</span>
      </div>

      <section className="lead-package" aria-labelledby="lead-story-title">
        <figure className="lead-visual">
          <div className="lead-image-frame">
            <Image
              className="lead-image"
              src="/editorial/front-page-engraving.png"
              alt="A newspaper engraving bringing together a computer workbench, legal scales, a classroom chalkboard, and a writer’s notebook"
              width={1536}
              height={1024}
              sizes="(max-width: 820px) 100vw, 64vw"
              priority
            />
          </div>
          <figcaption>
            Technology, judgment, teaching, and writing share the same workbench.
            <span> Original illustration for The Newsroom.</span>
          </figcaption>
        </figure>

        <article className="lead-story">
          <div className="story-label">
            <Link href={`/category/${leadStory.desk}`}>{leadDesk?.label}</Link>
            <span>{leadStory.kicker}</span>
          </div>
          <h1 id="lead-story-title">
            <Link href={`/posts/${leadStory.slug}`}>{leadStory.title}</Link>
          </h1>
          <p className="lead-dek">{leadStory.excerpt}</p>
          <p className="lead-standfirst">
            The first edition begins with a simple premise: the lessons worth
            keeping rarely fit inside one job title.
          </p>
          <div className="byline-row">
            <span>By Edward Song</span>
            <time dateTime={leadStory.date}>{leadStory.displayDate}</time>
            <span>{leadStory.readingTime}</span>
          </div>
          <Link className="read-story" href={`/posts/${leadStory.slug}`}>
            Continue reading <span aria-hidden="true">→</span>
          </Link>
        </article>
      </section>

      <section className="desk-section" aria-labelledby="desk-section-title">
        <div className="section-rule-heading">
          <p>The desks</p>
          <h2 id="desk-section-title">
            Three lenses. One life.
          </h2>
          <span>Coverage</span>
        </div>

        <div className="desk-grid">
          {desks.map((desk) => (
            <article className={`desk-card desk-${desk.slug}`} key={desk.slug}>
              <DeskPortrait desk={desk.slug} number={desk.number} />
              <div className="desk-card-top">
                <span>{desk.number}</span>
                <span>Desk</span>
              </div>
              <h3>
                <Link href={`/category/${desk.slug}`}>{desk.label}</Link>
              </h3>
              <p>{desk.description}</p>
              {desk.series ? (
                <ul className="series-list" aria-label="Career series">
                  {desk.series.map((series) => (
                    <li key={series.name}>{series.name}</li>
                  ))}
                </ul>
              ) : (
                <span className="desk-folio" aria-hidden="true">
                  ES / {desk.number}
                </span>
              )}
              <Link className="desk-link" href={`/category/${desk.slug}`}>
                Visit the desk <span aria-hidden="true">↗</span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="editorial-note" aria-labelledby="editorial-note-title">
        <div className="editorial-note-label">
          <span>Editorial</span>
          <span>No. 001</span>
        </div>
        <div className="editorial-note-copy">
          <p className="section-kicker">Why these sections</p>
          <h2 id="editorial-note-title">
            A career is not a straight line. The publication should not pretend
            otherwise.
          </h2>
          <p>
            Technology gets its own desk because it is the work of the present.
            Career holds the accumulated lessons of law, teaching, and writing.
            Life &amp; Ideas keeps room for everything a résumé cannot explain.
          </p>
          <Link className="read-story" href="/about">
            Meet the people <span aria-hidden="true">→</span>
          </Link>
        </div>
        <aside className="editorial-principles" aria-label="Editorial principles">
          <p>Filed under</p>
          <ol>
            <li>Experience before certainty</li>
            <li>Clarity before cleverness</li>
            <li>Curiosity before conclusion</li>
          </ol>
        </aside>
      </section>

      <section className="system-intro" aria-labelledby="system-intro-title">
        <div className="system-intro-heading">
          <p className="section-kicker">A friendly field guide</p>
          <h2 id="system-intro-title">The short version of how this newsroom works.</h2>
        </div>
        <div className="system-intro-copy">
          <p>
            Think of The Newsroom as a small paper with a very good filing room.
            Edward brings the lived experience and the final say; a cast of
            specialized AI colleagues helps sort context, ask better questions,
            shape drafts, and check the details before anything is printed.
          </p>
          <div className="system-steps" aria-label="Newsroom workflow">
            <div><span>01</span><strong>Gather</strong><p>A request arrives with a clear purpose and a deliberately narrow source scope.</p></div>
            <div><span>02</span><strong>Make sense</strong><p>Researchers, editors, and fact-checkers turn approved context into a useful assignment.</p></div>
            <div><span>03</span><strong>Publish carefully</strong><p>Placement, accessibility, provenance, and Edward’s approval are checked before release.</p></div>
          </div>
          <Link className="read-story" href="/system">See how the system is designed <span aria-hidden="true">→</span></Link>
        </div>
      </section>
    </>
  );
}
