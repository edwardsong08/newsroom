import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "People",
  description: "Meet Edward Song and the human–AI newsroom roster behind The Newsroom.",
  alternates: { canonical: "/about" },
};

const coreTeam = [
  ["ES", "Edward Song", "Publisher · human editor", "The author of lived experience, the source of final opinions, and the person who decides what is ready to print."],
  ["PS", "Personal Systems Director", "Front door · coordinator", "Turns a conversation into a scoped assignment, names the right people, and returns the finished handoff to Edward."],
  ["ME", "Managing Editor", "Newsroom lead", "Keeps desks, drafts, questions, and approvals moving without letting the process outrun the author."],
  ["HI", "Historian & Index Keeper", "Memory · navigation", "Maintains human-readable timelines, maps, and indexes so the archive remains welcoming to people as well as machines."],
  ["KE", "Knowledge Engineer", "Retrieval · provenance", "Normalizes approved notes, tracks authority and freshness, and keeps search helpful without making it the source of truth."],
  ["PC", "Privacy & Fact Desk", "Trust · verification", "Checks consent, sensitivity, dates, quotations, links, and claims before they can travel into a public story."],
];

const editorialPanel = [
  ["Development", "Finds the real question and the human stakes."],
  ["Structure", "Makes sure the sequence earns its conclusion."],
  ["Voice", "Protects the declared author’s sound and point of view."],
  ["Counterpoint", "Invites a fair, intelligent skeptic into the room."],
  ["Copy", "Makes every sentence clearer, tighter, and more precise."],
  ["Proof", "Performs the last quiet pass before publication."],
];

export default function PeoplePage() {
  return (
    <article className="about-shell people-shell">
      <header className="about-header">
        <div className="about-seal" aria-hidden="true"><span>ES</span><span>Est. 2026</span></div>
        <div className="category-folio"><span>The people</span><span>The Newsroom</span></div>
        <p className="section-kicker"><span>Meet the newsroom</span></p>
        <h1>A paper is a chorus.</h1>
        <p>One human voice at the center, with a careful cast of editors, researchers, and writers around it.</p>
      </header>

      <div className="about-grid people-grid">
        <div className="about-copy">
          <p>
            I have moved through different kinds of work—law, teaching, writing,
            and technology—and this paper is a place to keep those connections
            visible. The people listed here are clear roles with clear boundaries,
            so collaboration never has to become mysterious.
          </p>
          <p>
            Some colleagues are permanent desks. Others are invited for one
            assignment: a sensitivity reader, research librarian, legal-risk
            reader, or scene curator. Each receives only the approved packet it
            needs, and every durable decision leaves a record.
          </p>
          <div className="about-links">
            <Link className="read-story" href="/system">See how the system is designed <span aria-hidden="true">→</span></Link>
            <a className="read-story" href="https://edsong.xyz" target="_blank" rel="noreferrer">Visit edsong.xyz <span aria-hidden="true">↗</span></a>
          </div>
        </div>

        <aside className="about-sidebar" aria-label="Newsroom roster">
          <p>Permanent desks</p>
          <ol>{coreTeam.map(([mark, name, role, description]) => <li key={name}><span>{mark}</span><div><strong>{name}</strong><em>{role}</em><p>{description}</p></div></li>)}</ol>
        </aside>
      </div>

      <section className="people-panel" aria-labelledby="people-panel-title">
        <div><p className="section-kicker">The editorial board</p><h2 id="people-panel-title">Different questions make better work.</h2></div>
        <div className="people-role-grid">{editorialPanel.map(([name, description], index) => <div key={name}><span>0{index + 1}</span><strong>{name} editor</strong><p>{description}</p></div>)}</div>
      </section>

      <section className="writers-note" aria-labelledby="writers-note-title">
        <p className="section-kicker">The writers’ room</p>
        <h2 id="writers-note-title">Edward writes the lived record. Disclosed AI columnists may write beside him.</h2>
        <p>Any invented columnist is labeled as such, works from an approved brief, and has no fabricated biography. A guest human writer joins only with consent and an agreed byline.</p>
      </section>
    </article>
  );
}
