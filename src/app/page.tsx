import Link from "next/link";
import { DeskPortrait } from "@/components/desk-portrait";
import { LivingPicture } from "@/components/living-picture";
import { desks, getDesk, posts } from "@/lib/posts";

export default function Home() {
  const leadStory = posts[0];
  const leadDesk = getDesk(leadStory.desk);

  return (
    <>
      <div className="front-kicker" aria-label="Front page introduction">
        <span>Late Edition</span>
        <p>A paper for work that crosses categories—and occasionally moves.</p>
        <span>Read by lamplight</span>
      </div>

      <section className="lead-package" aria-labelledby="lead-story-title">
        <LivingPicture
          className="lead-visual"
          src="/editorial/enchanted-pressroom.png"
          alt="A sepia pressroom with a brass calculating machine, legal scales, a chalkboard, drifting pages, and a self-writing pen"
          width={1536}
          height={1024}
          sizes="(max-width: 820px) 100vw, 64vw"
          caption="Technology, judgment, teaching, and writing occupy the pressroom after dark."
          priority
        />

        <article className="lead-story">
          <span className="exclusive-stamp" aria-hidden="true">Uncommonly true</span>
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
            keeping rarely fit inside one job title—or stay politely inside one column.
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
          <h2 id="desk-section-title">Three rooms. One restless mind.</h2>
          <span>Illustrated index</span>
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
          <span>From the editor’s desk</span>
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
            Read the editor’s note <span aria-hidden="true">→</span>
          </Link>
        </div>
        <aside className="editorial-principles" aria-label="Editorial principles">
          <p>House rules</p>
          <ol>
            <li>Experience before certainty</li>
            <li>Clarity before cleverness</li>
            <li>Curiosity before conclusion</li>
          </ol>
        </aside>
      </section>
    </>
  );
}
