export const deskSlugs = ["technology", "career", "life-ideas"] as const;

export type DeskSlug = (typeof deskSlugs)[number];

export type DeskSeries = {
  name: string;
  description: string;
};

export type Desk = {
  slug: DeskSlug;
  number: string;
  label: string;
  navLabel: string;
  description: string;
  manifesto: string;
  series?: DeskSeries[];
};

export const desks: Desk[] = [
  {
    slug: "technology",
    number: "01",
    label: "Technology",
    navLabel: "Technology",
    description:
      "Software, systems, tools, and the practical decisions behind building useful things.",
    manifesto:
      "A technology desk for the work beneath the launch: tradeoffs, experiments, failures, and the small choices that make a system hold together.",
  },
  {
    slug: "career",
    number: "02",
    label: "Career",
    navLabel: "Career",
    description:
      "Lessons carried between different kinds of work—and what each profession leaves behind.",
    manifesto:
      "Career is the broad desk. Law, teaching, and writing live inside it as recurring series, so each past life can develop a voice without turning the navigation into a filing cabinet.",
    series: [
      {
        name: "Law",
        description: "Judgment, evidence, institutions, and the discipline of an argument.",
      },
      {
        name: "Teaching",
        description: "Clarity, patience, attention, and what it means to help someone learn.",
      },
      {
        name: "Writing",
        description: "Language as craft: structure, revision, voice, and the work of being understood.",
      },
    ],
  },
  {
    slug: "life-ideas",
    number: "03",
    label: "Life & Ideas",
    navLabel: "Life & Ideas",
    description:
      "Personal essays about attention, habits, meaning, and the ideas worth carrying around.",
    manifesto:
      "Room for the questions that do not belong to a job title: how to pay attention, how to change, and how to build a life that feels considered.",
  },
];

export type PostSection = {
  heading?: string;
  paragraphs: string[];
};

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  displayDate: string;
  readingTime: string;
  desk: DeskSlug;
  kicker: string;
  sections: PostSection[];
};

export const posts: Post[] = [
  {
    slug: "a-place-to-think-in-public",
    title: "A place to think in public",
    excerpt:
      "Why this corner of the internet exists, and what I hope to leave here over time.",
    date: "2026-08-28",
    displayDate: "August 28, 2026",
    readingTime: "2 min read",
    desk: "life-ideas",
    kicker: "Editor’s note",
    sections: [
      {
        paragraphs: [
          "The best work usually leaves a trail: a decision that was harder than it looked, a small idea that changed the shape of a project, or a question worth carrying into the next one. This blog is where I plan to keep that trail.",
          "I want it to be useful without pretending to be definitive. Expect notes from things I am building, lessons that arrived a little late, and occasional detours into whatever has my attention.",
        ],
      },
      {
        heading: "What belongs here",
        paragraphs: [
          "Mostly: software, systems, design, and the craft of making useful things. But a workbench is interesting because unrelated tools end up beside one another, so I am leaving the edges deliberately open.",
          "The plan is simple—notice carefully, explain clearly, and publish when there is something worth sharing. Welcome in.",
        ],
      },
    ],
  },
];

export function getDesk(slug: string) {
  return desks.find((desk) => desk.slug === slug);
}

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}

export function getPostsByDesk(slug: DeskSlug) {
  return posts.filter((post) => post.desk === slug);
}
