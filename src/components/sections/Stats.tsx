"use client";

import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const STATS = [
  { to: 8, label: "Projects Completed", suffix: "+" },
  { to: 3, label: "Apps on Play Store", suffix: "+" },
  { to: 5, label: "Websites Delivered", suffix: "+" },
  { to: 4, label: "Companies Worked With", suffix: "+" },
] as const;

export function Stats() {
  return (
    <section
      id="stats"
      className="relative bg-background px-6 py-24 sm:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="glass-card relative overflow-hidden p-10 sm:p-14"
        >
          {/* Ambient glows inside the panel */}
          <div className="pointer-events-none absolute -left-10 -top-10 h-56 w-56 rounded-full bg-primary/10 blur-[120px]" />
          <div className="pointer-events-none absolute -bottom-10 -right-10 h-56 w-56 rounded-full bg-secondary/10 blur-[120px]" />

          <div className="relative grid grid-cols-2 gap-y-12 gap-x-6 lg:grid-cols-4">
            {STATS.map((stat) => (
              <AnimatedCounter
                key={stat.label}
                to={stat.to}
                label={stat.label}
                suffix={stat.suffix}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
