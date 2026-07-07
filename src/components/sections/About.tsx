"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Quote, Code2, Smartphone, Layers, Rocket } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SITE_NAME } from "@/lib/constants";
import { EASE } from "@/lib/motion";

const FOCUS_AREAS = [
  { icon: Code2,      label: "Full-Stack Web (MERN)" },
  { icon: Smartphone, label: "Cross-Platform Mobile (Flutter)" },
  { icon: Layers,     label: "Clean Architecture" },
  { icon: Rocket,     label: "Ship to Production" },
] as const;

export function About() {
  const photoRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target:  photoRef,
    offset:  ["start end", "end start"],
  });
  const photoScale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);

  return (
    <section id="about" className="relative bg-background px-6 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading title="About Me" align="center" />

        {/* Two-column */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 lg:items-start">

          {/* Left — portrait photo */}
          <motion.div
            ref={photoRef}
            className="relative mx-auto h-[340px] w-full max-w-sm overflow-hidden rounded-2xl lg:h-[480px] lg:max-w-none"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            {/* TODO: replace with a real photo */}
            <motion.div
              className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/20 via-muted/10 to-transparent"
              style={{ scale: photoScale }}
            >
              <span className="select-none font-heading text-7xl font-bold text-foreground/15">
                {SITE_NAME.split(" ").map((w) => w[0]).join("")}
              </span>
            </motion.div>
          </motion.div>

          {/* Right — content */}
          <motion.div
            className="flex flex-col gap-8"
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

            {/* Pull-quote — personal motto */}
            <div className="relative border-l-2 border-primary/40 pl-6">
              <Quote size={28} className="mb-2 text-primary/60" aria-hidden="true" />
              <p className="font-heading text-2xl italic leading-snug text-foreground sm:text-3xl">
                களவும் கற்று மற
              </p>
              <p className="mt-2 text-sm text-muted">
                Know every path, but choose the right one.
              </p>
            </div>

            {/* Focus areas */}
            <div className="grid grid-cols-1 gap-4 border-t border-foreground/10 pt-6 sm:grid-cols-2">
              {FOCUS_AREAS.map(({ icon: Icon, label }, i) => (
                <motion.div
                  key={label}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, ease: EASE, delay: i * 0.08 }}
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-foreground/15 text-primary">
                    <Icon size={18} />
                  </span>
                  <span className="text-sm font-medium text-foreground/80">{label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
