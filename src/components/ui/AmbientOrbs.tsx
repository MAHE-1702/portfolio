"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Props {
  /** Extra classes applied to the absolutely-positioned wrapper. */
  className?: string;
}

type Orb = {
  color:   string;
  size:    number;
  top:     string;
  left:    string;
  opacity: number;
  duration: number;
  x: [number, number, number];
  y: [number, number, number];
};

/** A handful of slow-drifting blurred orbs that desync via differing durations. */
const ORBS: Orb[] = [
  {
    color: "#00E5FF", size: 440, top: "6%", left: "10%", opacity: 0.09,
    duration: 16, x: [0, 40, -25], y: [0, -30, 20],
  },
  {
    color: "#7C3AED", size: 500, top: "52%", left: "68%", opacity: 0.08,
    duration: 20, x: [0, -55, 30], y: [0, 35, -20],
  },
  {
    color: "#FF6B00", size: 340, top: "70%", left: "18%", opacity: 0.06,
    duration: 13, x: [0, 35, -40], y: [0, -28, 30],
  },
  {
    color: "#00E5FF", size: 300, top: "22%", left: "74%", opacity: 0.07,
    duration: 18, x: [0, -32, 18], y: [0, 26, -22],
  },
];

/**
 * Decorative ambient background. Renders blurred gradient orbs that drift
 * slowly and infinitely. Purely decorative (`aria-hidden`, no pointer events).
 * Renders static when the user prefers reduced motion.
 */
export function AmbientOrbs({ className = "" }: Props) {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 z-0 overflow-hidden ${className}`}
    >
      {ORBS.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-[120px]"
          style={{
            width: orb.size,
            height: orb.size,
            top: orb.top,
            left: orb.left,
            backgroundColor: orb.color,
            opacity: orb.opacity,
          }}
          animate={reduced ? undefined : { x: orb.x, y: orb.y }}
          transition={
            reduced
              ? undefined
              : {
                  duration: orb.duration,
                  repeat: Infinity,
                  repeatType: "reverse" as const,
                  ease: "easeInOut",
                }
          }
        />
      ))}
    </div>
  );
}
