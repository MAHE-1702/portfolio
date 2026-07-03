"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

/**
 * Branded first-visit loading overlay.
 *
 * Shows a full-screen splash with the site name and a progress bar that fills
 * over ~1.5s, then fades out. Only displays once per browser session
 * (tracked via `sessionStorage`). Skipped entirely when the user prefers
 * reduced motion.
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

    // Hard cap — fade out after the bar has filled (~1.5s + buffer).
    const timer = window.setTimeout(finish, 1800);

    return () => window.clearTimeout(timer);
  }, []);

  // Reduced-motion users never see the loader.
  if (reduced) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="page-loader"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <motion.span
            className="bg-gradient-to-r from-primary to-secondary bg-clip-text font-heading text-4xl font-bold tracking-tight text-transparent sm:text-6xl"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            Maheshwaran
          </motion.span>

          {/* Progress bar */}
          <div className="mt-7 h-[2px] w-44 overflow-hidden rounded-full bg-foreground/10 sm:w-56">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
