import { LivingVideo } from "@/components/living-video";
import type { DeskSlug } from "@/lib/posts";

const deskPortraitLabels: Record<DeskSlug, string> = {
  technology: "An engineer works carefully on a circuit board",
  career: "A teacher writes a lesson across a chalkboard",
  "life-ideas": "A reader turns through a book between library shelves",
};

const deskPortraitMedia: Record<DeskSlug, { poster: string; video: string }> = {
  technology: {
    poster: "/editorial/living/technology-engineer.jpg",
    video: "/editorial/living/technology-engineer.mp4",
  },
  career: {
    poster: "/editorial/living/career-teacher.jpg",
    video: "/editorial/living/career-teacher.mp4",
  },
  "life-ideas": {
    poster: "/editorial/living/life-reader.jpg",
    video: "/editorial/living/life-reader.mp4",
  },
};

type DeskPortraitProps = {
  desk: DeskSlug;
  number: string;
};

export function DeskPortrait({ desk, number }: DeskPortraitProps) {
  const media = deskPortraitMedia[desk];

  return (
    <div
      className={`desk-portrait desk-portrait-${desk} non-muggle-only`}
      role="img"
      aria-label={deskPortraitLabels[desk]}
    >
      <LivingVideo
        className="desk-portrait-image"
        src={media.video}
        poster={media.poster}
      />
      <span className="desk-portrait-fog" aria-hidden="true" />
      <span className="desk-portrait-number" aria-hidden="true">
        Plate {number}
      </span>
    </div>
  );
}
