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

const EDITION_KEY = "working-draft-edition:v1";
const EDITION_EVENT = "working-draft:edition-change";
const TURN_DURATION = 1240;
const TURN_MIDPOINT = TURN_DURATION / 2;

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

export function EditionToggle() {
  const [isTurning, setIsTurning] = useState(false);
  const swapTimer = useRef<number | null>(null);
  const finishTimer = useRef<number | null>(null);
  const edition = useSyncExternalStore(
    subscribeToEdition,
    readEdition,
    () => "muggle",
  );

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
    return () => {
      if (swapTimer.current !== null) {
        window.clearTimeout(swapTimer.current);
      }
      if (finishTimer.current !== null) {
        window.clearTimeout(finishTimer.current);
      }
      delete document.documentElement.dataset.editionTurn;
    };
  }, []);

  const chooseEdition = useCallback(
    (nextEdition: Edition) => {
      if (nextEdition === edition || isTurning) {
        return;
      }

      const root = document.documentElement;
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reduceMotion) {
        applyEdition(nextEdition);
        return;
      }

      root.dataset.editionTurn = `to-${nextEdition}`;
      setIsTurning(true);

      swapTimer.current = window.setTimeout(() => {
        applyEdition(nextEdition);
        swapTimer.current = null;
      }, TURN_MIDPOINT);

      finishTimer.current = window.setTimeout(() => {
        delete root.dataset.editionTurn;
        setIsTurning(false);
        finishTimer.current = null;
      }, TURN_DURATION);
    },
    [edition, isTurning],
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

      <div className="edition-turn-layer" aria-hidden="true">
        <div className="edition-turn-sheet">
          <span className="edition-turn-imprint">The Working Draft</span>
          <span className="edition-turn-fold" />
        </div>
      </div>
    </>
  );
}
