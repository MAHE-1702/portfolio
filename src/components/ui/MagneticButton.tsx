"use client";

import { useRef, type ReactNode } from "react";
import { motion, useSpring } from "framer-motion";

type Variant = "primary" | "glass";

interface Props {
  children: ReactNode;
  variant?: Variant;
  onClick?: () => void;
  href?: string;
  className?: string;
}

const SPRING = { stiffness: 260, damping: 22, mass: 0.4 };

export function MagneticButton({
  children,
  variant = "primary",
  onClick,
  href,
  className = "",
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useSpring(0, SPRING);
  const y = useSpring(0, SPRING);

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!containerRef.current) return;
    const r = containerRef.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width  / 2)) * 0.38);
    y.set((e.clientY - (r.top  + r.height / 2)) * 0.38);
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const variantCls =
    variant === "primary"
      ? "bg-gradient-to-r from-primary to-secondary text-background font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/40"
      : "glass-card text-foreground border border-primary/25 hover:border-primary/50";

  const inner = (
    <motion.span
      style={{ x, y }}
      className={`inline-flex items-center justify-center rounded-full px-8 py-3.5 text-sm font-semibold transition-shadow duration-300 ${variantCls} ${className}`}
    >
      {children}
    </motion.span>
  );

  return (
    <div
      ref={containerRef}
      className="inline-flex"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {href ? (
        <a href={href} className="rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">
          {inner}
        </a>
      ) : (
        <button
          type="button"
          onClick={onClick}
          className="rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
        >
          {inner}
        </button>
      )}
    </div>
  );
}
