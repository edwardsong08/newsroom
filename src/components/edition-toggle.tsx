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
  loadFromImages: (images: string[]) => void;
  on: (event: string, callback: (event: PageFlipEvent) => void) => void;
  turnToPage: (page: number) => void;
};

type ViewportFrame = {
  height: number;
  key: string;
  scrollX: number;
  scrollY: number;
  width: number;
};

type EditionSnapshots = Record<Edition, string>;

const EDITION_KEY = "working-draft-edition:v1";
const EDITION_EVENT = "working-draft:edition-change";
const FLIP_DURATION = 1350;

let transitionAssetsPromise: Promise<
  [typeof import("html2canvas"), typeof import("page-flip")]
> | null = null;

function loadTransitionAssets() {
  transitionAssetsPromise ??= Promise.all([
    import("html2canvas"),
    import("page-flip"),
  ]);
  return transitionAssetsPromise;
}

function getViewportFrame(): ViewportFrame {
  const height = document.documentElement.clientHeight;
  const width = document.documentElement.clientWidth;
  const scrollX = window.scrollX;
  const scrollY = window.scrollY;

  return {
    height,
    key: `${width}x${height}@${scrollX},${scrollY}`,
    scrollX,
    scrollY,
    width,
  };
}

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
  const finishTimer = useRef<number | null>(null);
  const isMounted = useRef(true);
  const snapshotCache = useRef<{
    key: string;
    promise: Promise<EditionSnapshots>;
  } | null>(null);
  const edition = useSyncExternalStore<Edition>(
    subscribeToEdition,
    readEdition,
    () => "muggle",
  );

  const clearTimers = useCallback(() => {
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
      viewport: ViewportFrame,
    ) => {
      await document.fonts.ready;

      const canvas = await html2canvas(document.documentElement, {
        backgroundColor: null,
        height: viewport.height,
        logging: false,
        scale: Math.min(window.devicePixelRatio, 1.5),
        scrollX: viewport.scrollX,
        scrollY: viewport.scrollY,
        useCORS: true,
        width: viewport.width,
        x: viewport.scrollX,
        y: viewport.scrollY,
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

  const prepareSnapshots = useCallback(
    (
      html2canvas: typeof import("html2canvas").default,
      viewport: ViewportFrame,
    ) => {
      if (snapshotCache.current?.key === viewport.key) {
        return snapshotCache.current.promise;
      }

      const promise = Promise.all([
        captureEdition("muggle", html2canvas, viewport),
        captureEdition("non-muggle", html2canvas, viewport),
      ]).then(async ([muggle, nonMuggle]) => {
        await Promise.all([waitForImage(muggle), waitForImage(nonMuggle)]);
        return { muggle, "non-muggle": nonMuggle };
      });

      snapshotCache.current = { key: viewport.key, promise };
      void promise.catch(() => {
        if (snapshotCache.current?.promise === promise) {
          snapshotCache.current = null;
        }
      });
      return promise;
    },
    [captureEdition],
  );

  useEffect(() => {
    let disposed = false;
    const warmTimer = window.setTimeout(() => {
      void loadTransitionAssets()
        .then(([{ default: html2canvas }]) => {
          if (!disposed) {
            return prepareSnapshots(html2canvas, getViewportFrame());
          }
        })
        .catch(() => {
          // A click can retry preparation if idle warming is unavailable.
        });
    }, 450);

    return () => {
      disposed = true;
      window.clearTimeout(warmTimer);
    };
  }, [prepareSnapshots]);

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
        const [{ default: html2canvas }, { PageFlip }] =
          await loadTransitionAssets();
        const viewport = getViewportFrame();
        const snapshots = await prepareSnapshots(html2canvas, viewport);
        const currentImage = snapshots[edition];
        const nextImage = snapshots[nextEdition];

        if (!isMounted.current) {
          return;
        }

        host.replaceChildren();
        const mount = document.createElement("div");
        mount.className = "edition-pageflip-mount";
        mount.style.width = `${viewport.width}px`;
        mount.style.height = `${viewport.height}px`;
        host.append(mount);

        const images = [currentImage, nextImage];
        const renderer = new PageFlip(mount, {
          autoSize: false,
          disableFlipByClick: true,
          drawShadow: true,
          flippingTime: FLIP_DURATION,
          height: viewport.height,
          maxShadowOpacity: 0.72,
          mobileScrollSupport: false,
          showCover: false,
          showPageCorners: false,
          size: "fixed",
          startPage: 0,
          useMouseEvents: false,
          usePortrait: true,
          width: viewport.width,
        }) as PageFlipInstance;

        pageFlip.current = renderer;
        let flipStarted = false;
        let flipRequested = false;

        const startFlip = () => {
          if (flipRequested || !isMounted.current) {
            return;
          }

          flipRequested = true;
          renderer.turnToPage(0);

          window.requestAnimationFrame(() => {
            window.requestAnimationFrame(() => {
              renderer.flipNext("top");
            });
          });
        };

        renderer.on("changeState", (event) => {
          if (event.data === "flipping") {
            flipStarted = true;
          }
          if (event.data === "read" && flipStarted) {
            applyEdition(nextEdition);
            clearPageFlip();
          }
        });

        renderer.on("init", startFlip);

        renderer.loadFromImages(images);
        document.documentElement.dataset.editionTurn = `to-${nextEdition}`;

        finishTimer.current = window.setTimeout(() => {
          applyEdition(nextEdition);
          clearPageFlip();
        }, FLIP_DURATION + 450);

        window.setTimeout(startFlip, 80);
      } catch {
        applyEdition(nextEdition);
        clearPageFlip();
      }
    },
    [clearPageFlip, edition, isTurning, prepareSnapshots],
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
