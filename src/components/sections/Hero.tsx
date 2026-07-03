"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import { ChevronDown } from "lucide-react";
import { SITE_NAME, TAGLINE } from "@/lib/constants";
import { Typewriter } from "@/components/ui/Typewriter";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { HeroSceneFallback } from "@/components/three/HeroScene";

// Dynamically import 3D scene — no SSR, shows fallback while module loads
const HeroScene = dynamic(
  () => import("@/components/three/HeroScene").then((m) => ({ default: m.HeroScene })),
  { ssr: false, loading: () => <HeroSceneFallback /> }
);

const NAME_WORDS = SITE_NAME.split(" ");

// Cubic bezier typed as tuple so Framer Motion v12 accepts it
const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const wordVariants = {
  hidden:  { opacity: 0, y: 44 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.72, ease: EASE },
  },
} as const;

const fadeUp = (delay: number) => ({
  initial:    { opacity: 0, y: 22 },
  animate:    { opacity: 1, y: 0  },
  transition: { delay, duration: 0.62, ease: EASE },
});

export function Hero() {
  const sectionRef  = useRef<HTMLElement>(null);
  const [showHint, setShowHint] = useState(true);

  const { scrollYProgress } = useScroll({
    target:  sectionRef,
    offset:  ["start start", "end start"],
  });
  const contentY       = useTransform(scrollYProgress, [0, 1],   ["0%", "28%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  useEffect(() => {
    const onScroll = () => setShowHint(window.scrollY < 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen overflow-hidden"
      style={{ backgroundColor: "#050816" }}
    >
      {/* ── 3-D background ── */}
      <HeroScene />

      {/* ── Overlay content ── */}
      <motion.div
        className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        {/* Name — staggered word reveal */}
        <motion.div
          className="mb-5 flex flex-wrap justify-center gap-x-5"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.13 } } }}
        >
          {NAME_WORDS.map((word, i) => (
            <motion.span
              key={i}
              className="font-heading text-5xl font-bold leading-tight text-foreground drop-shadow-lg sm:text-6xl md:text-7xl lg:text-8xl"
              variants={wordVariants}
            >
              {word}
            </motion.span>
          ))}
        </motion.div>

        {/* Role typewriter */}
        <motion.div className="mb-6" {...fadeUp(0.6)}>
          <Typewriter />
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="mb-10 max-w-xl text-base leading-relaxed text-foreground/55 sm:text-lg"
          {...fadeUp(0.82)}
        >
          {TAGLINE}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-4"
          {...fadeUp(1.02)}
        >
          <MagneticButton variant="primary" onClick={() => scrollTo("projects")}>
            View Projects
          </MagneticButton>
          <MagneticButton variant="glass" onClick={() => scrollTo("contact")}>
            Get In Touch
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* ── Scroll hint ── */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 select-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 1.6, duration: 0.5 }}
          >
            <span className="text-[10px] font-semibold tracking-[0.22em] text-foreground/35 uppercase">
              Scroll to explore
            </span>
            <motion.div
              animate={{ y: [0, 9, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              <ChevronDown size={18} className="text-primary/50" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
