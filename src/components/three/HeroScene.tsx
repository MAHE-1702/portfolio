"use client";

import { useRef, useMemo, useEffect, useState, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import gsap from "gsap";

// ─── Config ───────────────────────────────────────────────────────────────────

const BG          = "#050816";
const C_PRIMARY   = "#00E5FF";
const C_SECONDARY = "#7C3AED";

const NODES_DESKTOP  = 120;
const NODES_MOBILE   = 60;
const RADIUS_DESKTOP = 2.2;
const RADIUS_MOBILE  = 2.0;
const K_DESKTOP      = 3;     // nearest neighbours per node (desktop)
const K_MOBILE       = 2;     // nearest neighbours per node (mobile)
const THRESH_DESKTOP = 1.4;   // max edge length (desktop)
const THRESH_MOBILE  = 1.6;   // max edge length (mobile)

const PULSE_SPEED = 0.4;      // edge fraction per second
const PULSE_COUNT = 2;        // simultaneous travelling pulses

// ─── Geometry helpers ──────────────────────────────────────────────────────────

// Deterministic node distribution on a sphere surface via the golden angle.
function fibonacciSphere(count: number, radius: number): THREE.Vector3[] {
  const pts: THREE.Vector3[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y     = 1 - (i / (count - 1)) * 2;
    const r     = Math.sqrt(1 - y * y);
    const theta = golden * i;
    pts.push(new THREE.Vector3(
      r * Math.cos(theta) * radius,
      y * radius,
      r * Math.sin(theta) * radius,
    ));
  }
  return pts;
}

// Build deduplicated K-nearest-neighbour edges constrained by a distance threshold.
function buildEdges(nodes: THREE.Vector3[], k: number, threshold: number): [number, number][] {
  const edges: [number, number][] = [];
  const seen = new Set<string>();

  for (let i = 0; i < nodes.length; i++) {
    // Rank all other nodes by distance, keep the closest K within threshold.
    const dists: { j: number; d: number }[] = [];
    for (let j = 0; j < nodes.length; j++) {
      if (i === j) continue;
      const d = nodes[i].distanceTo(nodes[j]);
      if (d < threshold) dists.push({ j, d });
    }
    dists.sort((a, b) => a.d - b.d);

    for (let n = 0; n < Math.min(k, dists.length); n++) {
      const j   = dists[n].j;
      const key = i < j ? `${i}-${j}` : `${j}-${i}`;
      if (seen.has(key)) continue;
      seen.add(key);
      edges.push([i, j]);
    }
  }
  return edges;
}

// ─── Mouse tracker ──────────────────────────────────────────────────────────────

function useMouse() {
  const xy = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const h = (e: MouseEvent) => {
      xy.current.x =  (e.clientX / window.innerWidth  - 0.5) * 2;
      xy.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", h, { passive: true });
    return () => window.removeEventListener("mousemove", h);
  }, []);
  return xy;
}

// ─── Network sphere (nodes + edges + travelling pulses) ─────────────────────────

type NetworkProps = {
  isMobile: boolean;
  paused:   React.MutableRefObject<boolean>;
};

type PulseState = { edge: number; t: number };

function NetworkSphere({ isMobile, paused }: NetworkProps) {
  const netRef    = useRef<THREE.Group>(null);
  const instRef   = useRef<THREE.InstancedMesh>(null);
  const pulseRefs = useRef<(THREE.Mesh | null)[]>([]);

  const N      = isMobile ? NODES_MOBILE   : NODES_DESKTOP;
  const radius = isMobile ? RADIUS_MOBILE  : RADIUS_DESKTOP;
  const k      = isMobile ? K_MOBILE       : K_DESKTOP;
  const thresh = isMobile ? THRESH_MOBILE  : THRESH_DESKTOP;

  // Nodes + edges + line geometry are built once per breakpoint.
  const { nodes, edges, lineGeo } = useMemo(() => {
    const nodes = fibonacciSphere(N, radius);
    const edges = buildEdges(nodes, k, thresh);

    const positions = new Float32Array(edges.length * 2 * 3);
    for (let e = 0; e < edges.length; e++) {
      const [a, b] = edges[e];
      positions[e * 6]     = nodes[a].x;
      positions[e * 6 + 1] = nodes[a].y;
      positions[e * 6 + 2] = nodes[a].z;
      positions[e * 6 + 3] = nodes[b].x;
      positions[e * 6 + 4] = nodes[b].y;
      positions[e * 6 + 5] = nodes[b].z;
    }
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    return { nodes, edges, lineGeo };
  }, [N, radius, k, thresh]);

  // Initial pulse states — staggered start offsets, spread across distinct edges.
  const pulses = useRef<PulseState[]>(
    Array.from({ length: PULSE_COUNT }, (_, i) => ({
      edge: edges.length ? Math.floor((i / PULSE_COUNT) * edges.length) : 0,
      t:    (i / PULSE_COUNT),
    })),
  );

  // Reset pulse edges whenever the edge set changes (breakpoint switch).
  useEffect(() => {
    pulses.current = Array.from({ length: PULSE_COUNT }, (_, i) => ({
      edge: edges.length ? Math.floor((i / PULSE_COUNT) * edges.length) : 0,
      t:    (i / PULSE_COUNT),
    }));
  }, [edges]);

  // Place node instances (matrix + per-instance colour) once on mount.
  useEffect(() => {
    const mesh = instRef.current;
    if (!mesh) return;

    const dummy = new THREE.Object3D();
    const cp    = new THREE.Color(C_PRIMARY);
    const cs    = new THREE.Color(C_SECONDARY);

    for (let i = 0; i < nodes.length; i++) {
      dummy.position.copy(nodes[i]);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      // Deterministic accent: every 5th node is secondary (~20%).
      mesh.setColorAt(i, i % 5 === 0 ? cs : cp);
    }
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [nodes]);

  // Dispose generated line geometry on unmount / rebuild.
  useEffect(() => () => lineGeo.dispose(), [lineGeo]);

  // Reusable vectors to avoid per-frame allocation.
  const tmpA = useMemo(() => new THREE.Vector3(), []);
  const tmpB = useMemo(() => new THREE.Vector3(), []);

  useFrame((_, delta) => {
    if (paused.current) return;

    // Cohesive organic rotation of the whole structure.
    if (netRef.current) {
      netRef.current.rotation.y += delta * 0.12;
      netRef.current.rotation.x += delta * 0.04;
    }

    // Advance travelling pulses along their edges.
    for (let i = 0; i < pulses.current.length; i++) {
      const p   = pulses.current[i];
      const ref = pulseRefs.current[i];
      if (!ref || edges.length === 0) continue;

      p.t += delta * PULSE_SPEED;
      if (p.t >= 1) {
        p.t = 0;
        p.edge = Math.floor(Math.random() * edges.length); // hop to a new edge
      }

      const [a, b] = edges[p.edge];
      tmpA.copy(nodes[a]);
      tmpB.copy(nodes[b]);
      ref.position.lerpVectors(tmpA, tmpB, p.t);
    }
  });

  return (
    <group ref={netRef}>
      {/* Nodes */}
      <instancedMesh ref={instRef} args={[undefined, undefined, N]}>
        <sphereGeometry args={[0.045, 6, 6]} />
        <meshStandardMaterial
          vertexColors
          emissive={"#ffffff"}
          emissiveIntensity={0.6}
          metalness={0.3}
          roughness={0.4}
        />
      </instancedMesh>

      {/* Edges */}
      <lineSegments geometry={lineGeo}>
        <lineBasicMaterial color={C_PRIMARY} transparent opacity={0.22} />
      </lineSegments>

      {/* Travelling signal pulses */}
      {pulses.current.map((_, i) => (
        <mesh key={i} ref={(el) => { pulseRefs.current[i] = el; }}>
          <sphereGeometry args={[0.028, 4, 4]} />
          <meshStandardMaterial
            color={C_PRIMARY}
            emissive={C_PRIMARY}
            emissiveIntensity={2.0}
          />
        </mesh>
      ))}
    </group>
  );
}

// ─── Camera rig (kinetic swing-through intro + idle parallax) ───────────────────

type CameraRigProps = {
  isMobile: boolean;
  reduced:  boolean;
  mouse:    React.MutableRefObject<{ x: number; y: number }>;
  paused:   React.MutableRefObject<boolean>;
};

function CameraRig({ isMobile, reduced, mouse, paused }: CameraRigProps) {
  const { camera } = useThree();
  const camPos  = useRef(new THREE.Vector3(-8, 3, 10));
  const settled = useRef(false);

  useEffect(() => {
    // Reduced motion: snap straight to the settled resting position.
    if (reduced) {
      camPos.current.set(1.5, 0.8, 5.5);
      settled.current = true;
      return;
    }

    // Mobile: a single, shorter, cheaper swing.
    if (isMobile) {
      const obj = { x: -5, y: 2, z: 7 };
      const tl  = gsap.timeline();
      tl.to(obj, {
        x: 1.5, y: 0.8, z: 5.5, duration: 1.8, ease: "power3.out",
        onUpdate: () => camPos.current.set(obj.x, obj.y, obj.z),
      }).call(() => { settled.current = true; });
      return () => { tl.kill(); };
    }

    // Desktop: accelerate INTO the swing, then snap hard to rest.
    const obj = { x: -8, y: 3, z: 10 };
    const tl  = gsap.timeline();
    tl.to(obj, {
      x: 4, y: 1, z: 5, duration: 1.4, ease: "power3.in",
      onUpdate: () => camPos.current.set(obj.x, obj.y, obj.z),
    }).to(obj, {
      x: 1.5, y: 0.8, z: 5.5, duration: 1.2, ease: "power4.out",
      onUpdate: () => camPos.current.set(obj.x, obj.y, obj.z),
    }).call(() => { settled.current = true; });

    return () => { tl.kill(); };
  }, [reduced, isMobile]);

  const target = useMemo(() => new THREE.Vector3(), []);

  useFrame(() => {
    if (paused.current) return;

    if (settled.current) {
      // Idle: subtle mouse parallax layered onto the resting position.
      target.set(
        camPos.current.x + mouse.current.x * 0.25,
        camPos.current.y + mouse.current.y * 0.15,
        camPos.current.z,
      );
      camera.position.lerp(target, 0.04);
    } else {
      // During the swing: track the GSAP-driven position exactly.
      camera.position.copy(camPos.current);
    }
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// ─── Scene content (lights + network + camera + bloom) ──────────────────────────

type SceneProps = { isMobile: boolean; reduced: boolean };

function SceneContent({ isMobile, reduced }: SceneProps) {
  const { gl } = useThree();
  const mouse  = useMouse();
  const paused = useRef(false);

  // Pause all animation when the hero scrolls out of view.
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { paused.current = !e.isIntersecting; },
      { threshold: 0 },
    );
    obs.observe(gl.domElement);
    return () => obs.disconnect();
  }, [gl.domElement]);

  return (
    <>
      <ambientLight intensity={0.15} />
      {/* Inner glow at the sphere core. */}
      <pointLight position={[0, 0, 0]} color={C_PRIMARY}   intensity={4}   distance={8}  decay={2} />
      <pointLight position={[5, 3, 4]} color={C_SECONDARY} intensity={2.5} distance={18} decay={2} />

      <CameraRig isMobile={isMobile} reduced={reduced} mouse={mouse} paused={paused} />
      <NetworkSphere isMobile={isMobile} paused={paused} />

      {!isMobile && (
        <EffectComposer>
          <Bloom
            intensity={1.4}
            luminanceThreshold={0.05}
            luminanceSmoothing={0.85}
            radius={0.6}
          />
        </EffectComposer>
      )}
    </>
  );
}

// ─── Loading skeleton shown during dynamic import ─────────────────────────────

export function HeroSceneFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: BG }}>
      <div className="flex flex-col items-center gap-3">
        <div className="h-12 w-12 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
        <span className="font-heading text-xs tracking-[0.3em] text-primary/40 uppercase">
          Initialising
        </span>
      </div>
    </div>
  );
}

// ─── Public export ────────────────────────────────────────────────────────────

export function HeroScene() {
  const [mounted,  setMounted]  = useState(false);
  const [reduced,  setReduced]  = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    setIsMobile(window.innerWidth < 768);
  }, []);

  if (!mounted) return <HeroSceneFallback />;

  return (
    <div className="absolute inset-0" aria-hidden role="presentation">
      <Canvas
        camera={{ position: [-8, 3, 10], fov: 52, near: 0.1, far: 100 }}
        dpr={[1, 2]}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        frameloop="always"
      >
        <color attach="background" args={[BG]} />
        <Suspense fallback={null}>
          <SceneContent isMobile={isMobile} reduced={reduced} />
        </Suspense>
      </Canvas>
    </div>
  );
}
