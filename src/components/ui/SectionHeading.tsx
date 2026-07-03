"use client";

import { useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

interface Props {
  title:     string;
  subtitle?: string;
  align?:    "left" | "center";
}

const containerVariants: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const wordVariants: Variants = {
  hidden:  { y: "110%" },
  visible: { y: "0%", transition: { duration: 0.65, ease: EASE } },
};

export function SectionHeading({ title, subtitle, align = "center" }: Props) {
  const centered = align === "center";
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const words = title.split(" ");

  return (
    <div className={centered ? "mb-12 text-center" : "mb-12 text-left"}>
      <motion.h2
        className="font-heading text-3xl font-bold leading-[1.15] text-foreground sm:text-4xl md:text-5xl"
        aria-label={title}
        variants={reduced ? undefined : containerVariants}
        initial={reduced ? false : "hidden"}
        whileInView={reduced ? undefined : "visible"}
        viewport={{ once: true, amount: 0.4 }}
      >
        <span
          className={`flex flex-wrap gap-x-[0.28em] ${centered ? "justify-center" : "justify-start"}`}
        >
          {words.map((word, i) => (
            <span
              key={i}
              aria-hidden="true"
              className="inline-flex overflow-hidden pb-[0.12em]"
            >
              <motion.span
                className="inline-block will-change-transform"
                variants={reduced ? undefined : wordVariants}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </span>
      </motion.h2>

      {/* Gradient accent bar */}
      <motion.div
        className={`mt-3 h-1 w-16 origin-left rounded-full bg-gradient-to-r from-primary to-secondary${centered ? " mx-auto" : ""}`}
        initial={reduced ? false : { scaleX: 0 }}
        whileInView={reduced ? undefined : { scaleX: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
      />

      {subtitle && (
        <motion.p
          className={`mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg${centered ? " mx-auto" : ""}`}
          initial={reduced ? false : { opacity: 0, y: 16 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, ease: EASE, delay: 0.2 }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
