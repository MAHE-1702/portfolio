"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, GitBranch } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { EASE } from "@/lib/motion";

export interface Project {
  id:          number;
  title:       string;
  tech:        readonly string[];
  description: string;
  liveUrl:     string | null;
  githubUrl:   string | null;
  color:       string;
}

interface Props {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: Props) {
  const modalRef  = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  // Save trigger element so focus can be restored on close
  useEffect(() => {
    if (project) {
      triggerRef.current = document.activeElement as HTMLElement;
    }
  }, [project]);

  // Escape key + body scroll lock
  useEffect(() => {
    if (!project) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      triggerRef.current?.focus();
    };
  }, [project, onClose]);

  // Focus trap
  useEffect(() => {
    if (!project || !modalRef.current) return;

    const FOCUSABLE =
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const elements = Array.from(
      modalRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)
    );
    const first = elements[0];
    const last  = elements[elements.length - 1];

    first?.focus();

    const trap = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    document.addEventListener("keydown", trap);
    return () => document.removeEventListener("keydown", trap);
  }, [project]);

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            aria-hidden
          />

          {/* Modal panel */}
          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            className="fixed inset-x-4 top-1/2 z-50 mx-auto max-w-2xl -translate-y-1/2 rounded-2xl glass-card p-0 shadow-2xl shadow-primary/10 sm:inset-x-8"
            initial={{ opacity: 0, scale: 0.92, y: "-45%" }}
            animate={{ opacity: 1, scale: 1, y: "-50%" }}
            exit={{ opacity: 0, scale: 0.94, y: "-46%" }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            {/* Hero gradient */}
            <div
              className="relative h-48 w-full rounded-t-2xl sm:h-56"
              style={{
                background: `linear-gradient(135deg, ${project.color}55 0%, ${project.color}22 100%)`,
              }}
            >
              {/* Project initials */}
              <span className="absolute inset-0 flex items-center justify-center font-heading text-5xl font-bold text-foreground/20 select-none">
                {project.title
                  .split(" ")
                  .slice(0, 2)
                  .map((w) => w[0])
                  .join("")}
              </span>

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-background/60 text-foreground/70 backdrop-blur-sm transition hover:bg-background/80 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8">
              <h2
                id="modal-title"
                className="font-heading text-2xl font-bold text-foreground sm:text-3xl"
              >
                {project.title}
              </h2>

              {/* Tech badges */}
              <div className="mt-3 flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-full px-3 py-1 text-xs font-semibold"
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

              <p className="mt-4 text-sm leading-relaxed text-foreground/65 sm:text-base">
                {project.description}
              </p>

              {/* Action buttons */}
              <div className="mt-6 flex flex-wrap gap-3">
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
                <MagneticButton variant="glass" onClick={onClose}>
                  Close
                </MagneticButton>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
