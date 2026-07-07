"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SKILLS } from "@/lib/constants";
import { EASE } from "@/lib/motion";

const CATEGORIES = Object.keys(SKILLS) as Array<keyof typeof SKILLS>;

function MarqueeRow({ category, reverse }: { category: keyof typeof SKILLS; reverse: boolean }) {
  const skills = SKILLS[category];
  const duration = skills.length * 3.5;

  return (
    <div className="border-t border-foreground/10 py-8">
      <span className="mb-4 block px-1 text-xs font-bold uppercase tracking-widest text-primary">
        {category}
      </span>

      <div className="overflow-hidden">
        <div
          className={`mil-marquee-track flex w-max items-center gap-10 hover:[animation-play-state:paused] ${reverse ? "mil-marquee-reverse" : ""}`}
          style={{ animationDuration: `${duration}s` }}
        >
          {/* Duplicated twice for a seamless loop */}
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center gap-10">
              {skills.map((skill) => (
                <span key={skill} className="flex items-center gap-10 whitespace-nowrap">
                  <span className="font-heading text-3xl font-semibold text-foreground/25 transition-colors duration-300 hover:text-foreground sm:text-5xl">
                    {skill}
                  </span>
                  <span className="text-lg text-primary/50">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="relative bg-background px-6 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading title="Skills & Technologies" align="center" />

        <motion.div
          className="border-b border-foreground/10"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          {CATEGORIES.map((cat, i) => (
            <MarqueeRow key={cat} category={cat} reverse={i % 2 === 1} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
