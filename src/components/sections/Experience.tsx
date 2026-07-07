"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EASE } from "@/lib/motion";

const EXPERIENCE = [
  {
    role:     "Flutter & MERN Fullstack Developer",
    company:  "Elevado Softwares Private Limited",
    location: "Coimbatore",
    period:   "Dec 2024 – Present",
    type:     "Full-time",
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
    bullets: [
      "Developed real-time web applications using MongoDB, Express.js, React, and Node.js.",
      "Built responsive UI components and improved cross-device user experience.",
      "Participated in code reviews and agile sprint planning.",
    ],
  },
] as const;

function ExperienceRow({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: (typeof EXPERIENCE)[number];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-foreground/10">
      <button
        type="button"
        onClick={onToggle}
        className="group flex w-full items-start gap-6 py-8 text-left"
        aria-expanded={isOpen}
      >
        <span className="hidden font-heading text-lg text-foreground/20 sm:block">
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="flex-1">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
            <h3 className="font-heading text-2xl font-semibold text-foreground transition-colors duration-300 group-hover:text-primary sm:text-3xl">
              {item.role}
            </h3>
            <span className="text-sm text-muted">{item.period}</span>
          </div>
          <p className="mt-1 text-sm text-muted">
            {item.company}, {item.location} · {item.type}
          </p>
        </div>

        <span
          className={`mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-foreground/20 text-foreground/60 transition-all duration-300 group-hover:border-primary group-hover:text-primary ${isOpen ? "rotate-45" : ""}`}
        >
          <Plus size={16} />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="overflow-hidden"
          >
            <ul className="flex flex-col gap-2 pb-8 pl-0 sm:pl-12">
              {item.bullets.map((b, i) => (
                <li key={i} className="flex gap-3 text-sm leading-relaxed text-foreground/70">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                  {b}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Experience() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="experience" className="relative bg-background px-6 py-24 sm:px-8">
      <div className="mx-auto max-w-4xl">
        <SectionHeading title="Experience" subtitle="Where I've worked" align="center" />

        <motion.div
          className="border-t border-foreground/10"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          {EXPERIENCE.map((item, i) => (
            <ExperienceRow
              key={item.role}
              item={item}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
