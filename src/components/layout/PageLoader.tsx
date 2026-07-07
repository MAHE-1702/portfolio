"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "@/lib/motion";

const LINES = [
  { text: "Building", thin: true },
  { text: "Digital", thin: false },
  { text: "Experiences", thin: true },
] as const;

const lineVariants = {
  hidden:  { y: "110%" },
  visible: { y: "0%" },
};

/**
 * Branded first-visit loading overlay, matching the Ashley template's
 * preloader technique: a staggered thin/bold line reveal plus a wipe-reveal
 * wordmark, rather than a literal progress bar. Only displays once per
 * browser session (tracked via `sessionStorage`). Skipped entirely when the
 * user prefers reduced motion.
 */
export function PageLoader() {
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      setReduced(true);
      return;
    }

    // Only show on the first visit of the session.
    if (sessionStorage.getItem("loaded") === "1") return;

    setVisible(true);

    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      sessionStorage.setItem("loaded", "1");
      setVisible(false);
    };

    const timer = window.setTimeout(finish, 2400);

    return () => window.clearTimeout(timer);
  }, []);

  // Reduced-motion users never see the loader.
  if (reduced) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="page-loader"
          className="mil-dark fixed inset-0 z-[100] flex flex-col items-center justify-center gap-10 bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          {/* Staggered thin/bold line reveal */}
          <div className="flex flex-col items-center">
            {LINES.map((line, i) => (
              <div key={line.text} className="overflow-hidden">
                <motion.p
                  className={`font-heading text-2xl leading-tight text-foreground sm:text-3xl ${
                    line.thin ? "font-light" : "font-bold"
                  }`}
                  variants={lineVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.6, ease: EASE, delay: 0.15 + i * 0.12 }}
                >
                  {line.text}
                </motion.p>
              </div>
            ))}
          </div>

          {/* Wipe-reveal wordmark */}
          <div className="relative overflow-hidden">
            <span className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
              Maheshwaran.
            </span>
            <motion.span
              className="mt-2 block text-sm italic tracking-wide text-muted sm:text-base"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              Know every path, but choose the right one.
            </motion.span>
            <motion.div
              className="absolute inset-0 origin-left bg-primary"
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.55 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
