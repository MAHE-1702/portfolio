"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, GitBranch } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectModal, type Project } from "@/components/ui/ProjectModal";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

// ─── Data ─────────────────────────────────────────────────────────────────────

const PROJECTS: Project[] = [
  {
    id:          1,
    title:       "Kriyaa Astrology Platform",
    tech:        ["React.js", "Vite", "JavaScript"],
    description: "A responsive astrology consultation platform with service pages, consultation booking workflows, and reusable React components, optimized for seamless UX across devices.",
    liveUrl:     "https://kriyaastrology.in",
    githubUrl:   null,
    color:       "#7C3AED",
  },
  {
    id:          2,
    title:       "House of Madras — E-Commerce",
    tech:        ["PHP", "Laravel", "MySQL"],
    description: "A full e-commerce platform with product catalog management, order processing, customer management, and secure authentication, with optimized database queries for scalability.",
    liveUrl:     "https://houseofmadras.com",
    githubUrl:   null,
    color:       "#FF6B00",
  },
  {
    id:          3,
    title:       "Pinto Admin — Restaurant Management",
    tech:        ["MERN Stack", "Tailwind CSS"],
    description: "An admin application for restaurant management, with UI/UX improvements via Tailwind CSS and optimized application performance.",
    liveUrl:     null,
    githubUrl:   null,
    color:       "#00E5FF",
  },
  {
    id:          4,
    title:       "Diet Planner Mobile App",
    tech:        ["Flutter", "REST APIs"],
    description: "A cross-platform diet planning app with meal planning, nutrition tracking, and API integrations, published on the Google Play Store.",
    liveUrl:     null,
    githubUrl:   null,
    color:       "#10B981",
  },
  {
    id:          5,
    title:       "Dairy Delivery Agent App",
    tech:        ["Flutter", "REST APIs", "Location Services"],
    description: "A delivery partner mobile app to track and manage dairy product deliveries to multiple companies in real time, with route tracking and delivery status updates.",
    liveUrl:     null,
    githubUrl:   null,
    color:       "#7C3AED",
  },
  {
    id:          6,
    title:       "Travel Logistics Application",
    tech:        ["Flutter", "MERN Stack", "GPS Tracking"],
    description: "A logistics mobile app for heavy vehicle load tracking with real-time GPS monitoring, multi-account access, and load status updates.",
    liveUrl:     null,
    githubUrl:   null,
    color:       "#00E5FF",
  },
  {
    id:          7,
    title:       "Alites Cybersecurity Website",
    tech:        ["React.js", "Vite", "JavaScript"],
    description: "A modern cybersecurity company website with responsive UI, service showcases, and performance-optimized frontend architecture.",
    liveUrl:     "https://alites.vercel.app",
    githubUrl:   null,
    color:       "#EF4444",
  },
  {
    id:          8,
    title:       "Niraa Event Management",
    tech:        ["Vite", "MERN Stack"],
    description: "An event management website with a full admin panel for managing events, bookings, and inquiries, with secure authentication and responsive design.",
    liveUrl:     null,
    githubUrl:   null,
    color:       "#F59E0B",
  },
];

// ─── Single project card ──────────────────────────────────────────────────────

interface CardProps {
  project:    Project;
  isActive:   boolean;
  onCaseStudy: () => void;
}

function ProjectCard({ project, isActive, onCaseStudy }: CardProps) {
  return (
    <div
      className="glass-card flex h-full flex-col overflow-hidden rounded-2xl transition-shadow duration-300"
      style={
        isActive
          ? { boxShadow: `0 0 40px ${project.color}30, 0 0 0 1px ${project.color}40` }
          : {}
      }
    >
      {/* Gradient image placeholder */}
      <div
        className="relative flex h-44 shrink-0 items-center justify-center sm:h-52"
        style={{
          background: `linear-gradient(135deg, ${project.color}40 0%, ${project.color}18 100%)`,
        }}
      >
        <span className="select-none font-heading text-5xl font-bold text-foreground/20">
          {project.title
            .split(" ")
            .slice(0, 2)
            .map((w) => w[0])
            .join("")}
        </span>
        {/* TODO: replace gradient with real project screenshot */}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="font-heading text-lg font-bold leading-tight text-foreground line-clamp-2">
          {project.title}
        </h3>

        {/* Tech badges */}
        <div className="flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded-full px-2.5 py-0.5 text-xs font-medium"
              style={{
                backgroundColor: `${project.color}18`,
                color: project.color,
                border: `1px solid ${project.color}33`,
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="mt-auto flex flex-wrap gap-2 pt-2">
          {project.liveUrl !== null && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-full border border-primary/30 px-3 py-1.5 text-xs font-semibold text-primary transition hover:bg-primary/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
            >
              <ExternalLink size={12} />
              Live Demo
            </a>
          )}
          {project.githubUrl !== null && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-full border border-foreground/20 px-3 py-1.5 text-xs font-semibold text-foreground/70 transition hover:bg-foreground/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
            >
              <GitBranch size={12} />
              GitHub
            </a>
          )}
          <button
            onClick={onCaseStudy}
            className="rounded-full border border-secondary/40 px-3 py-1.5 text-xs font-semibold text-secondary transition hover:bg-secondary/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
          >
            Case Study
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Carousel ─────────────────────────────────────────────────────────────────

const CARD_W_DESKTOP = 360;
const CARD_W_MOBILE  = 300;
const CARD_STEP      = 0.9; // fraction of card width between card centres

export function Projects() {
  const [activeIdx,     setActiveIdx]     = useState(0);
  const [modalProject,  setModalProject]  = useState<Project | null>(null);
  const [isMobile,      setIsMobile]      = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  const N       = PROJECTS.length;
  const cardW   = isMobile ? CARD_W_MOBILE : CARD_W_DESKTOP;
  const stepPx  = cardW * CARD_STEP;

  const prev = useCallback(() => setActiveIdx((i) => Math.max(i - 1, 0)),     []);
  const next = useCallback(() => setActiveIdx((i) => Math.min(i + 1, N - 1)), []);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft")  prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  // Touch/pointer swipe detection
  const pointerStart = useRef<number | null>(null);
  const SWIPE_THR = 50;

  function onPointerDown(e: React.PointerEvent) {
    pointerStart.current = e.clientX;
  }
  function onPointerUp(e: React.PointerEvent) {
    if (pointerStart.current === null) return;
    const dx = e.clientX - pointerStart.current;
    pointerStart.current = null;
    if (Math.abs(dx) < SWIPE_THR) return;
    if (dx < 0) next(); else prev();
  }

  const trackH = isMobile ? 380 : 430;

  return (
    <section id="projects" className="relative min-h-screen bg-background px-6 py-24 sm:px-8">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute right-0 top-1/4 h-96 w-96 rounded-full bg-secondary/8 blur-[140px]" />

      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="Projects"
          subtitle="Things I've built"
          align="center"
        />

        {/* Carousel wrapper */}
        <div
          className="relative select-none overflow-hidden rounded-2xl"
          style={{ height: trackH }}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
        >
          {/* Cards */}
          <div className="absolute inset-0 flex items-center justify-center">
            {PROJECTS.map((project, i) => {
              const diff   = i - activeIdx;
              const visible = Math.abs(diff) <= 2;
              if (!visible) return null;

              const x       = diff * stepPx;
              const scale   = diff === 0 ? 1 : 0.87;
              const opacity = diff === 0 ? 1 : Math.abs(diff) === 1 ? 0.6 : 0.3;
              const zIndex  = N - Math.abs(diff);

              return (
                <motion.div
                  key={project.id}
                  className="absolute"
                  animate={{ x, scale, opacity }}
                  transition={{ duration: 0.4, ease: EASE }}
                  style={{ zIndex, width: cardW, height: trackH - 20 }}
                >
                  <ProjectCard
                    project={project}
                    isActive={diff === 0}
                    onCaseStudy={() => setModalProject(project)}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Controls */}
        <div className="mt-8 flex items-center justify-center gap-6">
          <button
            onClick={prev}
            disabled={activeIdx === 0}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-primary/25 text-foreground/60 transition hover:border-primary/60 hover:text-primary disabled:cursor-not-allowed disabled:opacity-30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
            aria-label="Previous project"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Dot indicators */}
          <div className="flex gap-2">
            {PROJECTS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIdx(i)}
                aria-label={`Go to project ${i + 1}`}
                className="h-2 rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
                style={{
                  width:           i === activeIdx ? 24 : 8,
                  backgroundColor: i === activeIdx ? "#00E5FF" : "rgba(255,255,255,0.2)",
                }}
              />
            ))}
          </div>

          <button
            onClick={next}
            disabled={activeIdx === N - 1}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-primary/25 text-foreground/60 transition hover:border-primary/60 hover:text-primary disabled:cursor-not-allowed disabled:opacity-30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
            aria-label="Next project"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Case study modal */}
      <ProjectModal
        project={modalProject}
        onClose={() => setModalProject(null)}
      />
    </section>
  );
}
