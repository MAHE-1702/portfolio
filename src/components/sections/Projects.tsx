"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import { ExternalLink, GitBranch } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ProjectModal, type Project } from "@/components/ui/ProjectModal";
import { EASE } from "@/lib/motion";

interface ProjectEntry extends Project {
  category: string;
  tall: boolean;
  featured: boolean;
}

const PROJECTS: ProjectEntry[] = [
  {
    id:          1,
    category:    "Web App",
    title:       "Kriyaa Astrology Platform",
    tech:        ["React.js", "Vite", "JavaScript"],
    description: "A responsive astrology consultation platform with service pages, consultation booking workflows, and reusable React components, optimized for seamless UX across devices.",
    liveUrl:     "https://kriyaastrology.in",
    githubUrl:   null,
    color:       "#FF9800",
    tall:        true,
    featured:    true,
  },
  {
    id:          2,
    category:    "E-Commerce",
    title:       "House of Madras — E-Commerce",
    tech:        ["PHP", "Laravel", "MySQL"],
    description: "A full e-commerce platform with product catalog management, order processing, customer management, and secure authentication, with optimized database queries for scalability.",
    liveUrl:     "https://houseofmadras.com",
    githubUrl:   null,
    color:       "#FF9800",
    tall:        false,
    featured:    true,
  },
  {
    id:          3,
    category:    "Admin Panel",
    title:       "Pinto Admin — Restaurant Management",
    tech:        ["MERN Stack", "Tailwind CSS"],
    description: "An admin application for restaurant management, with UI/UX improvements via Tailwind CSS and optimized application performance.",
    liveUrl:     null,
    githubUrl:   null,
    color:       "#FF9800",
    tall:        false,
    featured:    false,
  },
  {
    id:          4,
    category:    "Mobile App",
    title:       "Diet Planner Mobile App",
    tech:        ["Flutter", "REST APIs"],
    description: "A cross-platform diet planning app with meal planning, nutrition tracking, and API integrations, published on the Google Play Store.",
    liveUrl:     null,
    githubUrl:   null,
    color:       "#FF9800",
    tall:        true,
    featured:    false,
  },
  {
    id:          5,
    category:    "Mobile App",
    title:       "Dairy Delivery Agent App",
    tech:        ["Flutter", "REST APIs", "Location Services"],
    description: "A delivery partner mobile app to track and manage dairy product deliveries to multiple companies in real time, with route tracking and delivery status updates.",
    liveUrl:     null,
    githubUrl:   null,
    color:       "#FF9800",
    tall:        true,
    featured:    false,
  },
  {
    id:          6,
    category:    "Mobile App",
    title:       "Travel Logistics Application",
    tech:        ["Flutter", "MERN Stack", "GPS Tracking"],
    description: "A logistics mobile app for heavy vehicle load tracking with real-time GPS monitoring, multi-account access, and load status updates.",
    liveUrl:     null,
    githubUrl:   null,
    color:       "#FF9800",
    tall:        false,
    featured:    true,
  },
  {
    id:          7,
    category:    "Web App",
    title:       "Alites Cybersecurity Website",
    tech:        ["React.js", "Vite", "JavaScript"],
    description: "A modern cybersecurity company website with responsive UI, service showcases, and performance-optimized frontend architecture.",
    liveUrl:     "https://alites.vercel.app",
    githubUrl:   null,
    color:       "#FF9800",
    tall:        false,
    featured:    true,
  },
  {
    id:          8,
    category:    "Admin Panel",
    title:       "Niraa Event Management",
    tech:        ["Vite", "MERN Stack"],
    description: "An event management website with a full admin panel for managing events, bookings, and inquiries, with secure authentication and responsive design.",
    liveUrl:     null,
    githubUrl:   null,
    color:       "#FF9800",
    tall:        true,
    featured:    false,
  },
];

// const PROJECTS: ProjectEntry[] = [
//   {
//     id: 1,
//     category: "Web App",
//     title: "",
//     image: "/projects/Kriyaa astrology.png",
//     tech: [],
//     description: "",
//     liveUrl: "https://kriyaastrology.in",
//     githubUrl: null,
//     color: "#FF9800",
//     tall: false,
//     featured: true,
//   },
//   {
//     id: 2,
//     category: "E-Commerce",
//     title: "",
//     tech: [],
//     description: "",
//     liveUrl: "https://houseofmadras.com",
//     githubUrl: null,
//     color: "#FF9800",
//     tall: false,
//     featured: true,
//   },
//   {
//     id: 3,
//     category: "Admin Panel",
//     title: "",
//     tech: [],
//     description: "",
//     liveUrl: null,
//     githubUrl: null,
//     color: "#FF9800",
//     tall: false,
//     featured: false,
//   },
//   {
//     id: 4,
//     category: "Mobile App",
//     title: "",
//     image: "/projects/mission 2040.webp",
//     tech: [],
//     description: "",
//     liveUrl: null,
//     githubUrl: null,
//     color: "#FF9800",
//     tall: true,
//     featured: false,
//   },
//   {
//     id: 5,
//     category: "Mobile App",
//     title: "",
//     tech: [],
//     description: "",
//     liveUrl: null,
//     githubUrl: null,
//     color: "#FF9800",
//     tall: true,
//     featured: false,
//   },
//   {
//     id: 6,
//     category: "Mobile App",
//     title: "",
//     tech: [],
//     description: "",
//     liveUrl: null,
//     githubUrl: null,
//     color: "#FF9800",
//     tall: false,
//     featured: false,
//   },
//   {
//     id: 7,
//     category: "Web App",
//     title: "",
//     image: "/projects/alites.png",
//     tech: [],
//     description: "",
//     liveUrl: "https://alites.vercel.app",
//     githubUrl: null,
//     color: "#FF9800",
//     tall: true,
//     featured: true,
//   },
//   {
//     id: 8,
//     category: "Admin Panel",
//     title: "",
//     image: "/projects/Niraaeventmanagement.png",
//     tech: [],
//     description: "",
//     liveUrl: null,
//     githubUrl: null,
//     color: "#FF9800",
//     tall: true,
//     featured: true,
//   },
// ];

const FEATURED = PROJECTS.filter((p) => p.featured);
const REST = PROJECTS.filter((p) => !p.featured);

// ─── Featured sticky-stack panels ──────────────────────────────────────────────

function FeaturedPanel({
  project,
  index,
  total,
  onCaseStudy,
}: {
  project: ProjectEntry;
  index: number;
  total: number;
  onCaseStudy: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // The whole panel recedes — shrinks and blurs like a photo sliding behind
  // the next one — once the next panel starts covering it (progress > 0.5).
  const scale     = useTransform(scrollYProgress, [0.5, 1], [1, 0.85]);
  const blurPx    = useTransform(scrollYProgress, [0.5, 1], [0, 12]);
  const filter    = useMotionTemplate`blur(${blurPx}px)`;
  const dim       = useTransform(scrollYProgress, [0.5, 1], [0, 0.35]);
  const dark      = index % 2 === 1;

  return (
    <div
      ref={ref}
      className={`sticky top-0 flex h-screen w-full items-end overflow-hidden bg-background ${dark ? "mil-dark" : ""}`}
      style={{ zIndex: index + 1 }}
    >
      <motion.div className="absolute inset-0 flex items-end" style={{ scale, filter }}>
        {project.image ? (
          <>
            <Image src={project.image} alt={project.title} fill priority={index === 0} className="object-cover" />
            {/* Scrim so the text panel stays readable over a busy photo */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/10" />
          </>
        ) : (
          // TODO: replace with a real project screenshot
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/15 via-foreground/[0.03] to-transparent">
            <span className="select-none font-heading text-[10rem] font-bold leading-none text-foreground/[0.05] sm:text-[18rem]">
              {project.title.split(" ").slice(0, 2).map((w) => w[0]).join("")}
            </span>
          </div>
        )}

        <div className="relative z-10 w-full px-6 pb-16 sm:px-8 sm:pb-20">
          <div className="mx-auto max-w-6xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              {project.category}
            </span>
            <h3 className="mt-3 max-w-2xl font-heading text-4xl font-bold leading-[1.05] text-foreground sm:text-6xl">
              {project.title}
            </h3>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-foreground/70 sm:text-base">
              {project.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span key={t} className="rounded-full border border-foreground/15 px-3 py-1 text-xs text-foreground/70">
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {project.liveUrl !== null && (
                <MagneticButton variant="primary" href={project.liveUrl}>
                  <ExternalLink size={15} className="mr-2" />
                  Live Demo
                </MagneticButton>
              )}
              {project.githubUrl !== null && (
                <MagneticButton variant="glass" href={project.githubUrl}>
                  <GitBranch size={15} className="mr-2" />
                  GitHub
                </MagneticButton>
              )}
              <MagneticButton variant="glass" onClick={onCaseStudy}>
                Case Study
              </MagneticButton>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Dims slightly as the next panel begins covering this one */}
      <motion.div className="pointer-events-none absolute inset-0 bg-background" style={{ opacity: dim }} />

      <span className="absolute right-6 top-6 font-heading text-sm text-foreground/30 sm:right-8 sm:top-8">
        {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </span>
    </div>
  );
}

// ─── "More projects" grid card ─────────────────────────────────────────────────

function ProjectCard({ project, onCaseStudy }: { project: ProjectEntry; onCaseStudy: () => void }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target:  frameRef,
    offset:  ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <button
      type="button"
      onClick={onCaseStudy}
      className="group block w-full text-left"
    >
      <div
        ref={frameRef}
        className={`relative overflow-hidden bg-foreground/[0.04] ${project.tall ? "aspect-[4/5]" : "aspect-[16/10]"}`}
      >
        <motion.div className="absolute inset-[-8%]" style={{ y: imageY }}>
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
          ) : (
            // TODO: replace with a real project screenshot
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-foreground/[0.06] to-transparent">
              <span className="select-none font-heading text-6xl font-bold text-foreground/10 transition-transform duration-700 ease-out group-hover:scale-110">
                {project.title.split(" ").slice(0, 2).map((w) => w[0]).join("")}
              </span>
            </div>
          )}
        </motion.div>

        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-background/90 via-background/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="flex w-full items-center justify-between p-5 text-foreground">
            <span className="text-xs font-semibold uppercase tracking-widest">View case study</span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-foreground/40 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
              →
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <span className="text-xs font-semibold uppercase tracking-widest text-primary">
          {project.category}
        </span>
        <span className="h-px flex-1 bg-foreground/10" />
      </div>
      <h3 className="mt-2 font-heading text-xl font-semibold text-foreground sm:text-2xl">
        {project.title}
      </h3>
    </button>
  );
}

export function Projects() {
  const [modalProject, setModalProject] = useState<Project | null>(null);

  return (
    <>
      {/* Featured — sticky-stacking full-viewport panels.
          No ancestor here may have overflow set, or position:sticky breaks. */}
      <section id="projects" className="relative bg-background px-6 pt-24 sm:px-8">
        <div className="mx-auto max-w-6xl pb-16">
          <SectionHeading title="Projects" subtitle="Featured work" align="center" />
        </div>

        <div className="relative">
          {FEATURED.map((project, i) => (
            <FeaturedPanel
              key={project.id}
              project={project}
              index={i}
              total={FEATURED.length}
              onCaseStudy={() => setModalProject(project)}
            />
          ))}
        </div>
      </section>

      {/* More projects — compact masonry grid */}
      <section className="relative overflow-hidden bg-background px-6 py-24 sm:px-8">
        <div className="pointer-events-none absolute inset-y-0 left-1/3 hidden w-px bg-foreground/[0.06] lg:block" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-y-0 left-2/3 hidden w-px bg-foreground/[0.06] lg:block" aria-hidden="true" />

        <div className="relative mx-auto max-w-6xl">
          <h3 className="mb-12 text-center font-heading text-2xl font-semibold text-foreground sm:text-3xl">
            More Projects
          </h3>

          <motion.div
            className="grid grid-cols-1 items-start gap-8 md:grid-cols-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            {REST.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.55, ease: EASE, delay: (i % 4) * 0.08 }}
                className={i % 2 === 1 ? "md:mt-16" : ""}
              >
                <ProjectCard project={project} onCaseStudy={() => setModalProject(project)} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <ProjectModal project={modalProject} onClose={() => setModalProject(null)} />
    </>
  );
}
