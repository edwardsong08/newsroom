import Image from "next/image";
import type { DeskSlug } from "@/lib/posts";

const deskPortraitLabels: Record<DeskSlug, string> = {
  technology: "Mechanical instruments flicker in an old workshop",
  career: "Books, scales, and a turning manuscript share a study",
  "life-ideas": "A moonlit observatory waits beyond an open journal",
};

type DeskPortraitProps = {
  desk: DeskSlug;
  number: string;
};

export function DeskPortrait({ desk, number }: DeskPortraitProps) {
  return (
    <div className={`desk-portrait desk-portrait-${desk}`}>
      <Image
        className="desk-portrait-image"
        src="/editorial/enchanted-desks.png"
        alt={deskPortraitLabels[desk]}
        width={1821}
        height={864}
        sizes="(max-width: 780px) 100vw, 34vw"
      />
      <span className="desk-portrait-fog" aria-hidden="true" />
      <span className="desk-portrait-number" aria-hidden="true">
        Plate {number}
      </span>
    </div>
  );
}
