"use client";

import { useState, useEffect } from "react";
import { HERO_ROLES } from "@/lib/constants";

type Phase = "typing" | "pausing" | "erasing";

export function Typewriter() {
  const [displayed, setDisplayed] = useState("");
  const [roleIdx, setRoleIdx]     = useState(0);
  const [phase, setPhase]         = useState<Phase>("typing");
  const [reduced, setReduced]     = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // Static fallback for reduced-motion users
  useEffect(() => {
    if (reduced) setDisplayed(HERO_ROLES[0]);
  }, [reduced]);

  useEffect(() => {
    if (reduced) return;

    const role = HERO_ROLES[roleIdx];
    let t: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (displayed.length < role.length) {
        t = setTimeout(() => setDisplayed(role.slice(0, displayed.length + 1)), 58);
      } else {
        t = setTimeout(() => setPhase("pausing"), 1600);
      }
    } else if (phase === "pausing") {
      t = setTimeout(() => setPhase("erasing"), 500);
    } else {
      if (displayed.length > 0) {
        t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 32);
      } else {
        setRoleIdx((i) => (i + 1) % HERO_ROLES.length);
        setPhase("typing");
      }
    }

    return () => clearTimeout(t);
  }, [displayed, phase, roleIdx, reduced]);

  return (
    <p className="flex items-center gap-1 font-heading text-xl font-semibold text-primary sm:text-2xl md:text-3xl">
      <span aria-live="polite">{displayed}</span>
      <span
        className="inline-block h-6 w-0.5 animate-pulse bg-primary sm:h-7"
        aria-hidden
      />
    </p>
  );
}
