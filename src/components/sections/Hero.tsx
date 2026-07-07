"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { SITE_NAME, TAGLINE } from "@/lib/constants";
import { Typewriter } from "@/components/ui/Typewriter";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { WireframeShape } from "@/components/ui/WireframeShape";
import { EASE } from "@/lib/motion";

const fadeUp = (delay: number) => ({
  initial:    { opacity: 0, y: 22 },
  animate:    { opacity: 1, y: 0  },
  transition: { delay, duration: 0.62, ease: EASE },
});

export function Hero() {
  const sectionRef  = useRef<HTMLElement>(null);
  const [showHint, setShowHint] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  const { scrollYProgress } = useScroll({
    target:  sectionRef,
    offset:  ["start start", "end start"],
  });
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const photoY          = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  useEffect(() => {
    const onScroll = () => setShowHint(window.scrollY < 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="mil-dark relative flex min-h-screen items-center overflow-hidden bg-background px-6 py-32 sm:px-8"
    >
      {/* Background video */}
      {!reducedMotion && (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/bgvdeo.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
      )}
      {/* Dark overlay for text contrast */}
      <div className="absolute inset-0 bg-background/70" />

      <WireframeShape className="right-[5%] top-[-40px] hidden lg:block" />

      <motion.div
        className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-16 lg:grid-cols-2"
        style={{ opacity: contentOpacity }}
      >
        {/* Left — greeting, name, tagline, CTAs */}
        <div>
          <motion.p className="mb-4 text-base text-muted" {...fadeUp(0.1)}>
            Hello! My name is
          </motion.p>

          <motion.h1
            className="mb-6 font-heading text-5xl font-semibold leading-[1.05] text-foreground sm:text-6xl lg:text-[5.375rem]"
            {...fadeUp(0.22)}
          >
            {SITE_NAME}
          </motion.h1>

          <motion.div className="mb-6" {...fadeUp(0.4)}>
            <Typewriter />
          </motion.div>

          <motion.p
            className="mb-10 max-w-md text-base leading-relaxed text-foreground/60 sm:text-lg"
            {...fadeUp(0.52)}
          >
            {TAGLINE}
          </motion.p>

          <motion.div className="flex flex-wrap gap-4" {...fadeUp(0.66)}>
            <MagneticButton variant="primary" onClick={() => scrollTo("projects")}>
              View Projects
            </MagneticButton>
            <MagneticButton variant="glass" onClick={() => scrollTo("contact")}>
              Get In Touch
            </MagneticButton>
          </motion.div>
        </div>

        {/* Right — portrait frame */}
        {/* <motion.div
          className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl lg:max-w-none"
          style={{ y: photoY }}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
        >
        
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/25 via-foreground/10 to-transparent backdrop-blur-md">
            <span className="select-none font-heading text-8xl font-bold text-foreground/15">
              {SITE_NAME.split(" ").map((w) => w[0]).join("")}
            </span>
          </div>
        </motion.div> */}
        <motion.div
  className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl lg:max-w-none"
  style={{ y: photoY }}
  initial={{ opacity: 0, scale: 0.94 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
>
  <img
    src="/mahe.png" // Replace with your image path
    alt="Maheshwaran"
    className="h-full w-full object-cover opacity-60"
  />
</motion.div>
      </motion.div>

      {/* Scroll hint */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 select-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 1.4, duration: 0.5 }}
          >
            <span className="text-[10px] font-semibold tracking-[0.22em] text-muted uppercase">
              Scroll down
            </span>
            <motion.div
              animate={{ y: [0, 9, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              <ChevronDown size={18} className="text-primary/70" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
