"use client";

import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { EASE } from "@/lib/motion";

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
          className="relative overflow-hidden border border-foreground/10 p-10 sm:p-14"
        >
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
