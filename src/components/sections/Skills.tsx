"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AmbientOrbs } from "@/components/ui/AmbientOrbs";
import { SKILLS, CATEGORY_COLORS } from "@/components/three/SkillSphere";

const SkillSphere = dynamic(
  () => import("@/components/three/SkillSphere").then((m) => ({ default: m.SkillSphere })),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full animate-pulse rounded-xl bg-primary/5" />
    ),
  }
);

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];
const CATEGORIES = Object.keys(SKILLS) as Array<keyof typeof SKILLS>;

export function Skills() {
  const [active,   setActive]   = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section id="skills" className="relative min-h-screen bg-background px-6 py-24 sm:px-8">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -left-24 bottom-1/4 h-80 w-80 rounded-full bg-accent/8 blur-[120px]" />
      <AmbientOrbs />

      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionHeading title="Skills & Technologies" align="center" />

        {/* Category filter tabs */}
        <motion.div
          className="mb-10 flex flex-wrap justify-center gap-3"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          <button
            onClick={() => setActive(null)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 border
              ${active === null
                ? "border-primary bg-primary/15 text-primary"
                : "border-primary/20 text-muted hover:border-primary/40 hover:text-foreground"
              }`}
          >
            All
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(active === cat ? null : cat)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 border`}
              style={{
                borderColor: active === cat ? CATEGORY_COLORS[cat] + "66" : "rgba(0,229,255,0.15)",
                color: active === cat ? CATEGORY_COLORS[cat] : undefined,
                backgroundColor: active === cat ? CATEGORY_COLORS[cat] + "18" : undefined,
              }}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Desktop: sphere + legend | Mobile: tag cloud */}
        {isMobile ? (
          <MobileTagCloud active={active} />
        ) : (
          <motion.div
            className="flex min-h-[500px] flex-col gap-8 lg:flex-row lg:items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            {/* Sphere */}
            <div className="h-[420px] w-full lg:h-[520px] lg:w-3/5">
              <SkillSphere activeCategory={active} />
            </div>

            {/* Legend */}
            <div className="flex flex-col gap-4 lg:w-2/5">
              {CATEGORIES.map((cat) => (
                <motion.div
                  key={cat}
                  className={`glass-card rounded-xl p-4 transition-all duration-300 cursor-pointer
                    ${active === cat ? "border-primary/50 shadow-md shadow-primary/10" : "opacity-70 hover:opacity-100"}`}
                  onClick={() => setActive(active === cat ? null : cat)}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: CATEGORY_COLORS[cat] }}
                    />
                    <span className="font-heading text-sm font-bold text-foreground">{cat}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {SKILLS[cat as keyof typeof SKILLS].map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full px-2.5 py-0.5 text-xs font-medium"
                        style={{
                          backgroundColor: CATEGORY_COLORS[cat] + "18",
                          color: CATEGORY_COLORS[cat],
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

// ─── Mobile tag cloud ─────────────────────────────────────────────────────────

function MobileTagCloud({ active }: { active: string | null }) {
  const EASE2 = [0.22, 1, 0.36, 1] as [number, number, number, number];

  return (
    <div className="flex flex-col gap-6">
      {CATEGORIES.map((cat, ci) => {
        const show = active === null || active === cat;
        return (
          <motion.div
            key={cat}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: show ? 1 : 0.25, y: 0 }}
            transition={{ duration: 0.4, ease: EASE2, delay: ci * 0.06 }}
          >
            <p
              className="mb-2 text-xs font-bold uppercase tracking-widest"
              style={{ color: CATEGORY_COLORS[cat] }}
            >
              {cat}
            </p>
            <div className="flex flex-wrap gap-2">
              {SKILLS[cat as keyof typeof SKILLS].map((skill) => (
                <span
                  key={skill}
                  className="rounded-full px-3 py-1 text-sm font-medium"
                  style={{
                    backgroundColor: CATEGORY_COLORS[cat] + "18",
                    color: CATEGORY_COLORS[cat],
                    border: `1px solid ${CATEGORY_COLORS[cat]}33`,
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
