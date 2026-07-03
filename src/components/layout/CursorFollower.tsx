"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CursorFollower() {
  const [active, setActive] = useState(false);

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  const dotX = useSpring(rawX, { damping: 20, stiffness: 500, mass: 0.2 });
  const dotY = useSpring(rawY, { damping: 20, stiffness: 500, mass: 0.2 });
  const ringX = useSpring(rawX, { damping: 28, stiffness: 200, mass: 0.5 });
  const ringY = useSpring(rawY, { damping: 28, stiffness: 200, mass: 0.5 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setActive(true);

    function onMove(e: MouseEvent) {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
    }
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [rawX, rawY]);

  if (!active) return null;

  return (
    <>
      {/* Inner dot — snappy, mix-blend-difference for contrast */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-3 w-3 rounded-full bg-primary mix-blend-difference"
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
      />
      {/* Outer ring — lags behind for spring physics feel */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9998] h-9 w-9 rounded-full border border-primary/50"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
      />
    </>
  );
}
