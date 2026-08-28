import Image from "next/image";
import { LivingVideo } from "@/components/living-video";

type LivingPictureProps = {
  alt: string;
  caption: string;
  className?: string;
  height: number;
  priority?: boolean;
  poster?: string;
  sizes: string;
  src: string;
  videoSrc?: string;
  width: number;
};

export function LivingPicture({
  alt,
  caption,
  className = "",
  height,
  poster,
  priority = false,
  sizes,
  src,
  videoSrc,
  width,
}: LivingPictureProps) {
  return (
    <figure className={`living-picture ${className}`.trim()}>
      <div className="living-picture-frame">
        {videoSrc && poster ? (
          <LivingVideo
            className="living-picture-image"
            src={videoSrc}
            poster={poster}
            preload={priority ? "auto" : "metadata"}
          />
        ) : (
          <Image
            className="living-picture-image"
            src={src}
            alt={alt}
            width={width}
            height={height}
            sizes={sizes}
            priority={priority}
          />
        )}
        <span className="living-picture-haze" aria-hidden="true" />
        <span className="living-picture-scratch" aria-hidden="true" />
        <span className="living-picture-corners" aria-hidden="true" />
      </div>
      <figcaption>
        <span>{caption}</span>
        <span className="living-picture-status">
          <span aria-hidden="true">●</span> Living plate
        </span>
      </figcaption>
    </figure>
  );
}
