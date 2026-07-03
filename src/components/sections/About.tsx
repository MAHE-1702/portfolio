"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

const AvatarScene = dynamic(
  () => import("@/components/three/AvatarScene").then((m) => ({ default: m.AvatarScene })),
  {
    ssr: false,
    loading: () => (
      <div className="h-full min-h-[340px] w-full animate-pulse rounded-2xl bg-primary/5" />
    ),
  }
);

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const TIMELINE = [
  {
    role:     "Flutter & MERN Fullstack Developer",
    company:  "Elevado Softwares Private Limited",
    location: "Coimbatore",
    period:   "Dec 2024 – Present",
    desc:     "Developing full-stack web applications using the MERN stack and cross-platform mobile apps using Flutter. Building RESTful APIs, integrating MongoDB databases, and implementing secure authentication. Collaborating with design and product teams to deliver scalable, high-performance applications.",
  },
  {
    role:     "Fullstack Developer",
    company:  "AidatQ Software Development",
    location: "Coimbatore",
    period:   "Dates TBD", // TODO: add real dates
    desc:     "Worked on the Pinto Admin restaurant management application using the MERN stack. Improved UI/UX using Tailwind CSS and optimized application performance.",
  },
  {
    role:     "MERN Fullstack Developer Intern",
    company:  "Glacier Technology",
    location: "Coimbatore",
    period:   "Dates TBD", // TODO: add real dates
    desc:     "Developed real-time web applications using MongoDB, Express.js, React, and Node.js. Built responsive UI components and enhanced user experience across devices.",
  },
];

const COUNTERS = [
  { to: 8, label: "Projects Completed" },
  { to: 3, label: "Apps Developed" },
  { to: 5, label: "Websites Delivered" },
  { to: 4, label: "Clients Served" },
];

export function About() {
  return (
    <section id="about" className="relative min-h-screen bg-background px-6 py-24 sm:px-8">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-secondary/10 blur-[120px]" />

      <div className="mx-auto max-w-6xl">
        <SectionHeading title="About Me" align="center" />

        {/* Two-column */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 lg:items-start">

          {/* Left — 3D avatar */}
          <motion.div
            className="mx-auto h-[340px] w-full max-w-sm rounded-2xl lg:h-[480px] lg:max-w-none glass-card overflow-hidden"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <AvatarScene />
          </motion.div>

          {/* Right — content */}
          <motion.div
            className="flex flex-col gap-6"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
          >
            {/* Bio */}
            <p className="text-base leading-relaxed text-foreground/75 sm:text-lg">
              I&apos;m Maheshwaran, a Full Stack Web &amp; Flutter Mobile Developer based in
              Coimbatore. I design and ship production-grade web platforms and cross-platform
              mobile apps — from e-commerce and admin systems to GPS-tracked logistics apps —
              using the MERN stack and Flutter. I care about clean architecture, fast UIs,
              and shipping things that actually go live.
            </p>

            {/* Tamil motto */}
            <p className="font-heading text-sm italic text-secondary/80">
              களவும் கற்று மற
            </p>

            {/* Timeline */}
            <div className="relative mt-2 flex flex-col gap-0 pl-5">
              {/* Vertical line */}
              <div className="absolute left-[7px] top-2 bottom-2 w-px bg-primary/20" />

              {TIMELINE.map((item, i) => (
                <motion.div
                  key={i}
                  className="relative pb-8 last:pb-0"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.55, ease: EASE, delay: i * 0.12 }}
                >
                  {/* Dot */}
                  <span className="absolute -left-5 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-primary bg-background" />

                  <div className="glass-card p-4">
                    <p className="text-xs font-semibold text-primary uppercase tracking-wider">
                      {item.period}
                    </p>
                    <h3 className="mt-1 font-heading text-base font-bold text-foreground">
                      {item.role}
                    </h3>
                    <p className="text-sm text-muted">
                      {item.company}, {item.location}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/60">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Animated counters */}
        <motion.div
          className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-4"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
        >
          {COUNTERS.map(({ to, label }) => (
            <AnimatedCounter key={label} to={to} label={label} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
