"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectModal, type Project } from "@/components/ui/ProjectModal";
import { EASE } from "@/lib/motion";

interface ProjectEntry extends Project {
  category: string;
  tall: boolean;
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
  },
];

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
      className="group mb-8 block w-full break-inside-avoid text-left"
    >
      <div
        ref={frameRef}
        className={`relative overflow-hidden bg-foreground/[0.04] ${project.tall ? "aspect-[4/5]" : "aspect-[16/10]"}`}
      >
        {/* TODO: replace with a real project screenshot */}
        <motion.div
          className="absolute inset-[-8%] flex items-center justify-center bg-gradient-to-br from-foreground/[0.06] to-transparent"
          style={{ y: imageY }}
        >
          <span className="select-none font-heading text-6xl font-bold text-foreground/10 transition-transform duration-700 ease-out group-hover:scale-110">
            {project.title.split(" ").slice(0, 2).map((w) => w[0]).join("")}
          </span>
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
    <section id="projects" className="relative overflow-hidden bg-background px-6 py-24 sm:px-8">
      {/* Decorative guide lines — reinforces the wireframe/blueprint motif */}
      <div className="pointer-events-none absolute inset-y-0 left-1/3 hidden w-px bg-foreground/[0.06] lg:block" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-y-0 left-2/3 hidden w-px bg-foreground/[0.06] lg:block" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeading title="Projects" subtitle="Things I've built" align="center" />

        <motion.div
          className="columns-1 gap-8 md:columns-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          {PROJECTS.map((project, i) => (
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

      <ProjectModal project={modalProject} onClose={() => setModalProject(null)} />
    </section>
  );
}
