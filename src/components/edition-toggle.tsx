"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

type Edition = "muggle" | "non-muggle";

type EditionChangeDetail = {
  edition: Edition;
};

type PageFlipEvent = {
  data: number | string | { page: number; mode: string };
};

type PageFlipInstance = {
  destroy: () => void;
  flipNext: (corner?: "top" | "bottom") => void;
  flipPrev: (corner?: "top" | "bottom") => void;
  loadFromImages: (images: string[]) => void;
  on: (event: string, callback: (event: PageFlipEvent) => void) => void;
};

const EDITION_KEY = "working-draft-edition:v1";
const EDITION_EVENT = "working-draft:edition-change";
const FLIP_DURATION = 1800;

function readStoredEdition(): Edition {
  try {
    return localStorage.getItem(EDITION_KEY) === "non-muggle"
      ? "non-muggle"
      : "muggle";
  } catch {
    return "muggle";
  }
}

function readEdition(): Edition {
  if (typeof document === "undefined") {
    return "muggle";
  }

  return document.documentElement.dataset.edition === "non-muggle"
    ? "non-muggle"
    : "muggle";
}

function subscribeToEdition(callback: () => void) {
  window.addEventListener(EDITION_EVENT, callback);
  return () => window.removeEventListener(EDITION_EVENT, callback);
}

function applyEdition(edition: Edition) {
  document.documentElement.dataset.edition = edition;
  try {
    localStorage.setItem(EDITION_KEY, edition);
  } catch {
    // The edition still changes for this visit when storage is unavailable.
  }
  window.dispatchEvent(
    new CustomEvent<EditionChangeDetail>(EDITION_EVENT, {
      detail: { edition },
    }),
  );
}

function waitForImage(src: string) {
  return new Promise<void>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve();
    image.onerror = () => reject(new Error("The page image could not be prepared."));
    image.src = src;
  });
}

export function EditionToggle() {
  const [isTurning, setIsTurning] = useState(false);
  const pageFlipHost = useRef<HTMLDivElement>(null);
  const pageFlip = useRef<PageFlipInstance | null>(null);
  const swapTimer = useRef<number | null>(null);
  const finishTimer = useRef<number | null>(null);
  const isMounted = useRef(true);
  const edition = useSyncExternalStore<Edition>(
    subscribeToEdition,
    readEdition,
    () => "muggle",
  );

  const clearTimers = useCallback(() => {
    if (swapTimer.current !== null) {
      window.clearTimeout(swapTimer.current);
      swapTimer.current = null;
    }
    if (finishTimer.current !== null) {
      window.clearTimeout(finishTimer.current);
      finishTimer.current = null;
    }
  }, []);

  const clearPageFlip = useCallback(() => {
    clearTimers();
    try {
      pageFlip.current?.destroy();
    } catch {
      // The temporary renderer may already have removed itself.
    }
    pageFlip.current = null;
    pageFlipHost.current?.replaceChildren();
    delete document.documentElement.dataset.editionTurn;
    if (isMounted.current) {
      setIsTurning(false);
    }
  }, [clearTimers]);

  useLayoutEffect(() => {
    const nextEdition = readStoredEdition();

    if (readEdition() !== nextEdition) {
      document.documentElement.dataset.edition = nextEdition;
    }

    window.dispatchEvent(
      new CustomEvent<EditionChangeDetail>(EDITION_EVENT, {
        detail: { edition: nextEdition },
      }),
    );
  }, []);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
      clearTimers();
      try {
        pageFlip.current?.destroy();
      } catch {
        // The temporary renderer may already have removed itself.
      }
      delete document.documentElement.dataset.editionTurn;
    };
  }, [clearTimers]);

  const captureEdition = useCallback(
    async (
      targetEdition: Edition,
      html2canvas: typeof import("html2canvas").default,
    ) => {
      await document.fonts.ready;

      const canvas = await html2canvas(document.documentElement, {
        backgroundColor: null,
        height: window.innerHeight,
        logging: false,
        scale: Math.min(window.devicePixelRatio, 1.5),
        scrollX: window.scrollX,
        scrollY: window.scrollY,
        useCORS: true,
        width: window.innerWidth,
        x: window.scrollX,
        y: window.scrollY,
        onclone: (clonedDocument) => {
          clonedDocument.documentElement.dataset.edition = targetEdition;
          delete clonedDocument.documentElement.dataset.editionTurn;

          clonedDocument
            .querySelectorAll(".edition-rail, .edition-pageflip-layer")
            .forEach((element) => element.setAttribute("data-html2canvas-ignore", "true"));

          clonedDocument.querySelectorAll("video").forEach((video) => {
            const poster = video.getAttribute("poster");
            if (!poster) {
              return;
            }

            const image = clonedDocument.createElement("img");
            image.className = video.className;
            image.src = poster;
            image.alt = "";
            video.replaceWith(image);
          });

          const style = clonedDocument.createElement("style");
          style.textContent =
            "*,*::before,*::after{animation-play-state:paused!important;caret-color:transparent!important}";
          clonedDocument.head.append(style);
        },
      });

      return canvas.toDataURL("image/jpeg", 0.94);
    },
    [],
  );

  const chooseEdition = useCallback(
    async (nextEdition: Edition) => {
      if (nextEdition === edition || isTurning) {
        return;
      }

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reduceMotion) {
        applyEdition(nextEdition);
        return;
      }

      const host = pageFlipHost.current;
      if (!host) {
        applyEdition(nextEdition);
        return;
      }

      setIsTurning(true);

      try {
        const [{ default: html2canvas }, { PageFlip }] = await Promise.all([
          import("html2canvas"),
          import("page-flip"),
        ]);

        const [currentImage, nextImage] = await Promise.all([
          captureEdition(edition, html2canvas),
          captureEdition(nextEdition, html2canvas),
        ]);

        if (!isMounted.current) {
          return;
        }

        await Promise.all([waitForImage(currentImage), waitForImage(nextImage)]);

        host.replaceChildren();
        const mount = document.createElement("div");
        mount.className = "edition-pageflip-mount";
        host.append(mount);

        const isForward = nextEdition === "non-muggle";
        const images = isForward
          ? [currentImage, nextImage]
          : [nextImage, currentImage];
        const renderer = new PageFlip(mount, {
          autoSize: false,
          disableFlipByClick: true,
          drawShadow: true,
          flippingTime: FLIP_DURATION,
          height: window.innerHeight,
          maxShadowOpacity: 0.72,
          mobileScrollSupport: false,
          showCover: false,
          showPageCorners: false,
          size: "fixed",
          startPage: isForward ? 0 : 1,
          useMouseEvents: false,
          usePortrait: true,
          width: window.innerWidth,
        }) as PageFlipInstance;

        pageFlip.current = renderer;
        let flipStarted = false;

        renderer.on("changeState", (event) => {
          if (event.data === "flipping") {
            flipStarted = true;
          }
          if (event.data === "read" && flipStarted) {
            applyEdition(nextEdition);
            clearPageFlip();
          }
        });

        renderer.loadFromImages(images);
        document.documentElement.dataset.editionTurn = `to-${nextEdition}`;

        swapTimer.current = window.setTimeout(() => {
          applyEdition(nextEdition);
          swapTimer.current = null;
        }, FLIP_DURATION * 0.52);

        finishTimer.current = window.setTimeout(() => {
          applyEdition(nextEdition);
          clearPageFlip();
        }, FLIP_DURATION + 450);

        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => {
            if (isForward) {
              renderer.flipNext("top");
            } else {
              renderer.flipPrev("top");
            }
          });
        });
      } catch {
        applyEdition(nextEdition);
        clearPageFlip();
      }
    },
    [captureEdition, clearPageFlip, edition, isTurning],
  );

  return (
    <>
      <div className="edition-rail">
        <span className="edition-label">Edition</span>
        <div
          className="edition-toggle"
          role="group"
          aria-label="Choose edition"
          aria-busy={isTurning}
        >
          <button
            type="button"
            aria-pressed={edition === "muggle"}
            disabled={isTurning}
            onClick={() => chooseEdition("muggle")}
          >
            Muggle
          </button>
          <span aria-hidden="true">/</span>
          <button
            type="button"
            aria-pressed={edition === "non-muggle"}
            disabled={isTurning}
            onClick={() => chooseEdition("non-muggle")}
          >
            Non-Muggle
          </button>
        </div>
      </div>

      <div
        ref={pageFlipHost}
        className="edition-pageflip-layer"
        aria-hidden="true"
        onWheel={(event) => event.preventDefault()}
        onTouchMove={(event) => event.preventDefault()}
      />
    </>
  );
}
