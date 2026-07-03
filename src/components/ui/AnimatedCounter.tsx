"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface Props {
  to:      number;
  label:   string;
  suffix?: string;
}

export function AnimatedCounter({ to, label, suffix = "+" }: Props) {
  const ref     = useRef<HTMLDivElement>(null);
  const inView  = useInView(ref, { once: true, amount: 0.5 });
  const [count, setCount]   = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (!inView) return;
    if (reduced) { setCount(to); return; }

    const duration = 1400; // ms
    const start    = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out quart
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.round(eased * to));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [inView, to, reduced]);

  return (
    <div ref={ref} className="flex flex-col items-center gap-1">
      <span className="font-heading text-4xl font-bold text-primary sm:text-5xl">
        {count}{suffix}
      </span>
      <span className="text-sm font-medium text-muted">{label}</span>
    </div>
  );
}
