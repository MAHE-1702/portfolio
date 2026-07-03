"use client";

import { useRef, useState, useEffect, type ReactNode } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

interface Props {
  children:   ReactNode;
  className?: string;
}

const SPRING = { stiffness: 180, damping: 20, mass: 0.6 };
const MAX_TILT = 12; // degrees

export function TiltCard({ children, className = "" }: Props) {
  const ref         = useRef<HTMLDivElement>(null);
  const [touch, setTouch] = useState(false);

  // Detect touch devices — disable tilt
  useEffect(() => {
    setTouch(window.matchMedia("(hover: none)").matches);
  }, []);

  const rawX = useSpring(0, SPRING);
  const rawY = useSpring(0, SPRING);

  const rotateX = useTransform(rawY, [-1, 1], [ MAX_TILT, -MAX_TILT]);
  const rotateY = useTransform(rawX, [-1, 1], [-MAX_TILT,  MAX_TILT]);

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (touch || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    rawX.set(((e.clientX - rect.left) / rect.width  - 0.5) * 2);
    rawY.set(((e.clientY - rect.top)  / rect.height - 0.5) * 2);
  }

  function onMouseLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={touch ? {} : { rotateX, rotateY, transformStyle: "preserve-3d", perspective: "800px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
