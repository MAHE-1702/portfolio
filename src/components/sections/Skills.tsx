"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SKILLS } from "@/lib/constants";
import { EASE } from "@/lib/motion";

const CATEGORIES = Object.keys(SKILLS) as Array<keyof typeof SKILLS>;

// Short categories (e.g. Mobile with only 2 items) don't have enough content
// to fill wide viewports even after the usual "duplicate once" loop trick —
// repeating the base list several times per half guarantees the track is
// always comfortably wider than the screen, so the loop never shows a gap.
const REPEATS_PER_HALF = 6;
const SECONDS_PER_ITEM = 3.5;

function MarqueeRow({ category, reverse }: { category: keyof typeof SKILLS; reverse: boolean }) {
  const skills = SKILLS[category];
  const duration = skills.length * REPEATS_PER_HALF * SECONDS_PER_ITEM;

  return (
    <div className="border-t border-foreground/10 py-8">
      <span className="mb-4 block px-6 text-xs font-bold uppercase tracking-widest text-primary sm:px-8">
        {category}
      </span>

      <div className="overflow-hidden">
        <div
          className={`mil-marquee-track flex w-max items-center gap-10 hover:[animation-play-state:paused] ${reverse ? "mil-marquee-reverse" : ""}`}
          style={{ animationDuration: `${duration}s` }}
        >
          {/* Two identical halves (each repeated several times internally) for a seamless loop */}
          {[0, 1].map((half) => (
            <div key={half} className="flex items-center gap-10">
              {Array.from({ length: REPEATS_PER_HALF }).map((_, r) =>
                skills.map((skill) => (
                  <span key={`${r}-${skill}`} className="flex items-center gap-10 whitespace-nowrap">
                    <span className="font-heading text-3xl font-semibold text-foreground/25 transition-colors duration-300 hover:text-foreground sm:text-5xl">
                      {skill}
                    </span>
                    <span className="text-lg text-primary/50">✦</span>
                  </span>
                ))
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="relative overflow-hidden bg-background py-24">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <SectionHeading title="Skills & Technologies" align="center" />
      </div>

      {/* Full-bleed — breaks out of the max-w container to run edge-to-edge */}
      <motion.div
        className="relative left-1/2 w-screen -translate-x-1/2 border-b border-foreground/10"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        {CATEGORIES.map((cat, i) => (
          <MarqueeRow key={cat} category={cat} reverse={i % 2 === 1} />
        ))}
      </motion.div>
    </section>
  );
}
