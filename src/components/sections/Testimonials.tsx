"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AmbientOrbs } from "@/components/ui/AmbientOrbs";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

// TODO: replace with real client testimonials
const TESTIMONIALS = [
  {
    quote:
      "Maheshwaran delivered our platform ahead of schedule with clean, maintainable code. His attention to detail and communication throughout the project were outstanding.",
    name: "Arjun Mehta",
    role: "Project Manager",
    company: "TechVentures",
    initials: "AM",
    color: "#00E5FF",
  },
  {
    quote:
      "We brought Mahe in to build our mobile app from scratch. He understood our vision immediately and shipped a polished Flutter app that our users love. Highly recommend.",
    name: "Priya Nair",
    role: "Startup Founder",
    company: "NovaBuild",
    initials: "PN",
    color: "#7C3AED",
  },
  {
    quote:
      "The admin dashboard Mahe built for us handles thousands of records without a hitch. Rock-solid backend logic and a UI our team actually enjoys using every day.",
    name: "Karthik Sundaram",
    role: "Product Lead",
    company: "DataStack",
    initials: "KS",
    color: "#FF6B00",
  },
] as const;

export function Testimonials() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  return (
    <section
      id="testimonials"
      className="relative min-h-screen bg-background px-6 py-24 sm:px-8"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-0 top-1/4 h-96 w-96 rounded-full bg-secondary/10 blur-[150px]" />
      <AmbientOrbs />

      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionHeading
          title="Testimonials"
          subtitle="What clients say"
          align="center"
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: EASE, delay: i * 0.12 }}
              className={i === 2 ? "md:col-span-2 lg:col-span-1" : ""}
            >
              {/* Idle float — phase staggered per card so they don't sync.
                  Disabled entirely under prefers-reduced-motion. */}
              <motion.figure
                animate={reduced ? undefined : { y: [0, -10, 0] }}
                transition={
                  reduced
                    ? undefined
                    : {
                        repeat: Infinity,
                        duration: 3 + i * 0.8,
                        ease: "easeInOut",
                      }
                }
                className="glass-card flex h-full flex-col gap-5 p-6 transition-colors duration-300 hover:border-primary/40"
              >
                <Quote
                  size={32}
                  className="shrink-0 opacity-80"
                  style={{ color: t.color }}
                  aria-hidden="true"
                />

                <blockquote className="flex-1 text-sm leading-relaxed text-foreground/75">
                  “{t.quote}”
                </blockquote>

                <figcaption className="flex items-center gap-3 border-t border-primary/10 pt-4">
                  <span
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-heading text-sm font-bold text-background"
                    style={{ backgroundColor: t.color }}
                    aria-hidden="true"
                  >
                    {t.initials}
                  </span>
                  <span className="flex flex-col">
                    <span className="font-heading text-sm font-bold text-foreground">
                      {t.name}
                    </span>
                    <span className="text-xs text-muted">
                      {t.role} · {t.company}
                    </span>
                  </span>
                </figcaption>
              </motion.figure>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
