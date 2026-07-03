"use client";

import { useRef, useEffect, useState, Suspense } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Text, OrbitControls } from "@react-three/drei";

// ─── Data (exported — used by Skills.tsx for the mobile tag cloud) ────────────

export const SKILLS = {
  Frontend: ["React", "Next.js", "JavaScript", "TypeScript", "Redux", "Tailwind CSS"],
  Backend:  ["Node.js", "Express.js", "MongoDB", "PostgreSQL", "REST API", "JWT"],
  Mobile:   ["Flutter", "React Native"],
  Tools:    ["Docker", "Git", "AWS", "Vercel", "Linux"],
} as const;

export const CATEGORY_COLORS: Record<string, string> = {
  Frontend: "#00E5FF",
  Backend:  "#7C3AED",
  Mobile:   "#FF6B00",
  Tools:    "#64748b",
};

// ─── Fibonacci sphere distribution ───────────────────────────────────────────

function fibonacciSphere(n: number, i: number, r: number): [number, number, number] {
  const golden = Math.PI * (3 - Math.sqrt(5));
  const y      = 1 - (i / (n - 1)) * 2;
  const radius = Math.sqrt(1 - y * y);
  const theta  = golden * i;
  return [r * radius * Math.cos(theta), r * y, r * radius * Math.sin(theta)];
}

type SkillEntry = {
  label:    string;
  category: string;
  pos:      [number, number, number];
};

function buildEntries(): SkillEntry[] {
  const all: { label: string; category: string }[] = [];
  for (const [cat, skills] of Object.entries(SKILLS)) {
    for (const s of skills) all.push({ label: s, category: cat });
  }
  return all.map((s, i) => ({
    ...s,
    pos: fibonacciSphere(all.length, i, 2.5),
  }));
}

const ENTRIES = buildEntries();

// ─── Individual skill label ───────────────────────────────────────────────────

function SkillLabel({
  entry,
  activeCategory,
}: {
  entry:          SkillEntry;
  activeCategory: string | null;
}) {
  const active  = activeCategory === null || activeCategory === entry.category;
  const color   = CATEGORY_COLORS[entry.category] ?? "#64748b";

  return (
    <Text
      position={entry.pos}
      fontSize={0.2}
      color={color}
      anchorX="center"
      anchorY="middle"
      outlineWidth={0.008}
      outlineColor="#050816"
      fillOpacity={active ? 1 : 0.1}
    >
      {entry.label}
    </Text>
  );
}

// ─── Scene ────────────────────────────────────────────────────────────────────

function SceneContent({ activeCategory }: { activeCategory: string | null }) {
  const { gl } = useThree();
  const paused  = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { paused.current = !e.isIntersecting; },
      { threshold: 0 }
    );
    obs.observe(gl.domElement);
    return () => obs.disconnect();
  }, [gl.domElement]);

  return (
    <>
      <ambientLight intensity={0.6} />
      {ENTRIES.map((entry, i) => (
        <SkillLabel key={i} entry={entry} activeCategory={activeCategory} />
      ))}
      <OrbitControls
        autoRotate
        autoRotateSpeed={1.2}
        enableZoom={false}
        enablePan={false}
        makeDefault
      />
    </>
  );
}

// ─── Public export ────────────────────────────────────────────────────────────

interface Props {
  activeCategory: string | null;
}

export function SkillSphere({ activeCategory }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) {
    return <div className="h-full w-full animate-pulse rounded-xl bg-primary/5" />;
  }

  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 55 }}
      dpr={[1, 2]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        <SceneContent activeCategory={activeCategory} />
      </Suspense>
    </Canvas>
  );
}
