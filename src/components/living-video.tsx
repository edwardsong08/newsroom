"use client";

import { useEffect, useRef } from "react";

const EDITION_EVENT = "working-draft:edition-change";

const registeredVideos = new Set<HTMLVideoElement>();
let reducedMotionQuery: MediaQueryList | null = null;
let removeGlobalListeners: (() => void) | null = null;

function synchronizeVideo(video: HTMLVideoElement) {
  const shouldPlay =
    document.documentElement.dataset.edition === "non-muggle" &&
    document.visibilityState === "visible" &&
    !reducedMotionQuery?.matches;

  if (shouldPlay) {
    void video.play().catch(() => {
      // The poster remains a complete fallback if autoplay is unavailable.
    });
    return;
  }

  video.pause();
  if (video.readyState > 0) {
    video.currentTime = 0;
  }
}

function synchronizeRegisteredVideos() {
  registeredVideos.forEach(synchronizeVideo);
}

function installGlobalListeners() {
  if (removeGlobalListeners) {
    return;
  }

  reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  reducedMotionQuery.addEventListener("change", synchronizeRegisteredVideos);
  window.addEventListener(EDITION_EVENT, synchronizeRegisteredVideos);
  document.addEventListener("visibilitychange", synchronizeRegisteredVideos);

  removeGlobalListeners = () => {
    reducedMotionQuery?.removeEventListener(
      "change",
      synchronizeRegisteredVideos,
    );
    window.removeEventListener(EDITION_EVENT, synchronizeRegisteredVideos);
    document.removeEventListener(
      "visibilitychange",
      synchronizeRegisteredVideos,
    );
    reducedMotionQuery = null;
    removeGlobalListeners = null;
  };
}

type LivingVideoProps = {
  className?: string;
  poster: string;
  preload?: "none" | "metadata" | "auto";
  src: string;
};

export function LivingVideo({
  className = "",
  poster,
  preload = "metadata",
  src,
}: LivingVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    registeredVideos.add(video);
    installGlobalListeners();
    synchronizeVideo(video);

    return () => {
      registeredVideos.delete(video);
      video.pause();

      if (registeredVideos.size === 0) {
        removeGlobalListeners?.();
      }
    };
  }, []);

  return (
    <video
      ref={videoRef}
      className={`living-video ${className}`.trim()}
      muted
      loop
      playsInline
      poster={poster}
      preload={preload}
      aria-hidden="true"
      tabIndex={-1}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
