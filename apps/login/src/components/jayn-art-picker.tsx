"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "jayn-auth-art";

export type JaynArt = {
  slug: string;
  band?: string;
  column?: string;
};

export const JAYN_ART: [JaynArt, ...JaynArt[]] = [
  { slug: "dreamer", band: "center 55%", column: "62% center" },
  { slug: "harvest", band: "center 45%" },
  { slug: "beard", band: "center 20%" },
  { slug: "bloom", band: "center 35%", column: "70% center" },
  { slug: "gilded", band: "center 20%" },
];

export function useJaynArtChoice(): [JaynArt, () => void] {
  const [art, setArt] = useState<JaynArt>(JAYN_ART[0]);

  useEffect(() => {
    try {
      const stored = JAYN_ART.find((candidate) => candidate.slug === localStorage.getItem(STORAGE_KEY));
      if (stored) setArt(stored);
    } catch {
      // Storage can be unavailable in private browsing. The default still works.
    }
  }, []);

  function cycle() {
    setArt((current) => {
      const next = JAYN_ART[(JAYN_ART.indexOf(current) + 1) % JAYN_ART.length] ?? JAYN_ART[0];
      try {
        localStorage.setItem(STORAGE_KEY, next.slug);
      } catch {
        // Keep the in-memory selection when storage is unavailable.
      }
      return next;
    });
  }

  return [art, cycle];
}

export function JaynArtPicker({ art, onCycle }: { art: JaynArt; onCycle: () => void }) {
  const label = `Showing the ${art.slug} portrait — show the next one`;

  return (
    <div className="jayn-art-picker">
      <button type="button" className="jayn-chrome-control" onClick={onCycle} aria-label={label} title={label}>
        {art.slug} {JAYN_ART.indexOf(art) + 1}/{JAYN_ART.length}
      </button>
    </div>
  );
}
