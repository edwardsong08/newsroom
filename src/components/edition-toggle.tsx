"use client";

import { useCallback, useLayoutEffect, useSyncExternalStore } from "react";

type Edition = "muggle" | "non-muggle";

type EditionChangeDetail = {
  edition: Edition;
};

type TransitionDocument = Document & {
  startViewTransition?: (update: () => void) => {
    finished: Promise<void>;
  };
};

const EDITION_KEY = "working-draft-edition:v1";
const EDITION_EVENT = "working-draft:edition-change";

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

  const chooseEdition = useCallback(
    (nextEdition: Edition) => {
      if (nextEdition === edition) {
        return;
      }

      const root = document.documentElement;
      const transitionDocument = document as TransitionDocument;
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (!transitionDocument.startViewTransition || reduceMotion) {
        applyEdition(nextEdition);
        return;
      }

      root.dataset.editionTurn = `to-${nextEdition}`;
      const transition = transitionDocument.startViewTransition(() => {
        applyEdition(nextEdition);
      });

      void transition.finished.finally(() => {
        delete root.dataset.editionTurn;
      });
    },
    [edition],
  );

  return (
    <div className="edition-rail">
      <span className="edition-label">Edition</span>
      <div className="edition-toggle" role="group" aria-label="Choose edition">
        <button
          type="button"
          aria-pressed={edition === "muggle"}
          onClick={() => chooseEdition("muggle")}
        >
          Muggle
        </button>
        <span aria-hidden="true">/</span>
        <button
          type="button"
          aria-pressed={edition === "non-muggle"}
          onClick={() => chooseEdition("non-muggle")}
        >
          Non-Muggle
        </button>
      </div>
    </div>
  );
}
