"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

// ─── Data ─────────────────────────────────────────────────────────────────────

const EXPERIENCE = [
  {
    role:     "Flutter & MERN Fullstack Developer",
    company:  "Elevado Softwares Private Limited",
    location: "Coimbatore",
    period:   "Dec 2024 – Present",
    type:     "Full-time",
    color:    "#00E5FF",
    bullets: [
      "Developed full-stack web applications using the MERN stack (MongoDB, Express, React, Node.js).",
      "Built and deployed cross-platform mobile apps using Flutter for iOS and Android.",
      "Designed and implemented RESTful APIs with JWT authentication and role-based access control.",
      "Collaborated with design and product teams to deliver scalable, high-performance applications on schedule.",
    ],
  },
  {
    role:     "Fullstack Developer",
    company:  "AidatQ Software Development",
    location: "Coimbatore",
    period:   "Dates TBD", // TODO: add real dates
    type:     "Full-time",
    color:    "#7C3AED",
    bullets: [
      "Worked on Pinto Admin, a restaurant management application built with the MERN stack.",
      "Improved UI/UX using Tailwind CSS, reducing user task completion time.",
      "Optimized MongoDB queries and Express middleware, improving API response times.",
    ],
  },
  {
    role:     "MERN Fullstack Developer Intern",
    company:  "Glacier Technology",
    location: "Coimbatore",
    period:   "Dates TBD", // TODO: add real dates
    type:     "Internship",
    color:    "#FF6B00",
    bullets: [
      "Developed real-time web applications using MongoDB, Express.js, React, and Node.js.",
      "Built responsive UI components and improved cross-device user experience.",
      "Participated in code reviews and agile sprint planning.",
    ],
  },
] as const;

// ─── Entry card ───────────────────────────────────────────────────────────────

interface EntryProps {
  item:    (typeof EXPERIENCE)[number];
  index:   number;
}

function TimelineEntry({ item, index }: EntryProps) {
  const isOdd  = index % 2 === 1;
  const slideX = isOdd ? -60 : 60;

  return (
    // Desktop: grid of 3 columns [left | dot-col | right]
    // Mobile: single column with left-offset dot
    <div className="relative grid grid-cols-1 lg:grid-cols-[1fr,56px,1fr] lg:gap-x-6">

      {/* ── Left cell (desktop) ── */}
      <div className="hidden lg:flex lg:items-start lg:justify-end lg:py-2">
        {isOdd && (
          <motion.div
            initial={{ opacity: 0, x: -slideX }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="w-full max-w-sm"
          >
            <EntryCard item={item} />
          </motion.div>
        )}
      </div>

      {/* ── Centre dot (desktop) + left dot (mobile) ── */}
      <div className="flex justify-center lg:py-5">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 shadow-lg"
          style={{
            borderColor:    item.color,
            backgroundColor: `${item.color}18`,
            boxShadow:      `0 0 14px ${item.color}44`,
          }}
        >
          <span className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
        </div>
      </div>

      {/* ── Right cell (desktop) / Main cell (mobile) ── */}
      <div className="py-2 lg:flex lg:items-start">
        {/* Mobile: always show card here */}
        <motion.div
          className={`w-full max-w-sm lg:hidden`}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <EntryCard item={item} />
        </motion.div>

        {/* Desktop: even entries go to right, odd entries skip (they go to left) */}
        {!isOdd && (
          <motion.div
            className="hidden w-full max-w-sm lg:block"
            initial={{ opacity: 0, x: slideX }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <EntryCard item={item} />
          </motion.div>
        )}
      </div>
    </div>
  );
}

function EntryCard({ item }: { item: (typeof EXPERIENCE)[number] }) {
  return (
    <div className="glass-card flex flex-col gap-3 p-5">
      {/* Period + type */}
      <div className="flex flex-wrap items-center gap-2">
        <span
          className="rounded-full px-3 py-0.5 text-xs font-bold"
          style={{
            backgroundColor: `${item.color}22`,
            color: item.color,
            border: `1px solid ${item.color}44`,
          }}
        >
          {item.period}
        </span>
        <span className="glass-card rounded-full px-3 py-0.5 text-xs font-medium text-muted">
          {item.type}
        </span>
      </div>

      <h3 className="font-heading text-base font-bold text-foreground leading-snug">
        {item.role}
      </h3>

      <p className="text-sm text-muted">
        {item.company}, {item.location}
      </p>

      <ul className="flex flex-col gap-1.5 border-t border-primary/10 pt-3">
        {item.bullets.map((b, i) => (
          <li key={i} className="flex gap-2 text-sm leading-relaxed text-foreground/65">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: item.color }} />
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target:  sectionRef,
    offset:  ["start center", "end center"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 80, damping: 30 });

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative min-h-screen bg-background px-6 py-24 sm:px-8"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -left-24 top-1/3 h-80 w-80 rounded-full bg-primary/6 blur-[120px]" />

      <div className="mx-auto max-w-4xl">
        <SectionHeading
          title="Experience"
          subtitle="Where I've worked"
          align="center"
        />

        {/* Timeline container */}
        <div className="relative">
          {/* Background track line (desktop only) */}
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-primary/10 lg:block" />

          {/* Animated progress fill */}
          <motion.div
            className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 origin-top bg-gradient-to-b from-primary via-secondary to-accent lg:block"
            style={{ scaleY }}
          />

          {/* Entries */}
          <div className="flex flex-col gap-6 pl-12 lg:gap-8 lg:pl-0">
            {EXPERIENCE.map((item, i) => (
              <TimelineEntry key={i} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
