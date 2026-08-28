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
  category: string;
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
    category: "Field note",
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

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}
