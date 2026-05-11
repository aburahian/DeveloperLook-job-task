"use client";

import { useEffect, useState } from "react";

export function useMediaQuery(query: string): boolean | undefined {
  const [matches, setMatches] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const m = window.matchMedia(query);
    setMatches(m.matches);
    const onChange = () => setMatches(m.matches);
    m.addEventListener("change", onChange);
    return () => m.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}
