"use client";

import { useRef, useEffect, useState, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

const C_PRIMARY   = "#00E5FF";
const C_SECONDARY = "#7C3AED";
const BG          = "#050816";

// ─── Avatar mesh ─────────────────────────────────────────────────────────────

function Avatar({
  hovered,
  reduced,
  paused,
}: {
  hovered: boolean;
  reduced: boolean;
  paused:  React.MutableRefObject<boolean>;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const speed    = useRef(0);

  useFrame((_, delta) => {
    if (paused.current || !groupRef.current) return;
    if (reduced) return;

    // Smoothly accelerate/decelerate rotation speed
    const target = hovered ? 2.2 : 0.45;
    speed.current += (target - speed.current) * Math.min(delta * 4, 1);
    groupRef.current.rotation.y += delta * speed.current * 0.5;
    groupRef.current.rotation.x += delta * speed.current * 0.15;
  });

  return (
    <group ref={groupRef}>
      {/* Solid icosahedron */}
      <mesh>
        <icosahedronGeometry args={[1.1, 1]} />
        <meshStandardMaterial
          color={C_PRIMARY}
          emissive={C_PRIMARY}
          emissiveIntensity={0.18}
          metalness={0.6}
          roughness={0.25}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Wireframe overlay */}
      <mesh>
        <icosahedronGeometry args={[1.12, 1]} />
        <meshBasicMaterial
          color={C_PRIMARY}
          wireframe
          transparent
          opacity={0.55}
        />
      </mesh>

      {/* Outer shell (secondary color) */}
      <mesh>
        <icosahedronGeometry args={[1.35, 0]} />
        <meshStandardMaterial
          color={C_SECONDARY}
          emissive={C_SECONDARY}
          emissiveIntensity={0.08}
          transparent
          opacity={0.18}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Inner glowing core */}
      <mesh>
        <sphereGeometry args={[0.55, 16, 16]} />
        <meshStandardMaterial
          color={C_SECONDARY}
          emissive={C_SECONDARY}
          emissiveIntensity={0.9}
          transparent
          opacity={0.75}
        />
      </mesh>
    </group>
  );
}

// ─── Scene wrapper ────────────────────────────────────────────────────────────

function SceneContent({
  hovered,
  reduced,
  isMobile,
}: {
  hovered: boolean;
  reduced: boolean;
  isMobile: boolean;
}) {
  const { gl } = useThree();
  const paused = useRef(false);

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
      <ambientLight intensity={0.2} />
      <pointLight position={[3, 3, 3]}  color={C_PRIMARY}   intensity={4} distance={12} decay={2} />
      <pointLight position={[-3, -2, 2]} color={C_SECONDARY} intensity={3} distance={10} decay={2} />

      <Avatar hovered={hovered} reduced={reduced} paused={paused} />

      {!isMobile && !reduced && (
        <EffectComposer>
          <Bloom intensity={1.2} luminanceThreshold={0.1} luminanceSmoothing={0.9} radius={0.6} />
        </EffectComposer>
      )}
    </>
  );
}

// ─── Public export ────────────────────────────────────────────────────────────

export function AvatarScene() {
  const [mounted,  setMounted]  = useState(false);
  const [reduced,  setReduced]  = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hovered,  setHovered]  = useState(false);

  useEffect(() => {
    setMounted(true);
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    setIsMobile(window.innerWidth < 768);
  }, []);

  if (!mounted) {
    return <div className="h-full w-full animate-pulse rounded-xl bg-primary/5" />;
  }

  return (
    <div
      className="h-full w-full"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Canvas
        camera={{ position: [0, 0, 3.8], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, powerPreference: "high-performance" }}
      >
        <color attach="background" args={[BG]} />
        <Suspense fallback={null}>
          <SceneContent hovered={hovered} reduced={reduced} isMobile={isMobile} />
        </Suspense>
      </Canvas>
    </div>
  );
}
