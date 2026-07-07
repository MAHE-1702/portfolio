/**
 * A slowly-tumbling CSS 3D wireframe dodecahedron — the same technique Ashley
 * uses (12 pentagon "faces", each 5 bordered divs arranged via rotateY/
 * translateZ/rotateX, continuously rotated by a CSS keyframe). Pure CSS,
 * no WebGL/Three.js. Purely decorative — hidden from screen readers.
 */

const PENTAGON_TRANSFORMS = [
  "rotateY(0.2turn) translateZ(69px) rotateX(26.5deg)",
  "rotateY(0.4turn) translateZ(69px) rotateX(26.5deg)",
  "rotateY(0.6turn) translateZ(69px) rotateX(26.5deg)",
  "rotateY(0.8turn) translateZ(69px) rotateX(26.5deg)",
  "rotateY(1turn) translateZ(69px) rotateX(26.5deg)",
  "rotateY(0.2turn) translateZ(-69px) rotateX(206.5deg)",
  "rotateY(0.4turn) translateZ(-69px) rotateX(206.5deg)",
  "rotateY(0.6turn) translateZ(-69px) rotateX(206.5deg)",
  "rotateY(0.8turn) translateZ(-69px) rotateX(206.5deg)",
  "rotateY(1turn) translateZ(-69px) rotateX(206.5deg)",
  "translateZ(69px) rotateX(-90deg)",
  "translateZ(-69px) rotateX(90deg)",
] as const;

const BOTTOM_ALIGNED = new Set([5, 6, 7, 8, 9, 11]); // 0-indexed positions 6-10 and 12

const EDGE_ROTATIONS = [
  "rotate(0.2turn)",
  "rotate(0.4turn)",
  "rotate(0.6turn)",
  "rotate(0.8turn)",
  "rotate(1turn)",
] as const;

interface Props {
  className?: string;
}

export function WireframeShape({ className = "" }: Props) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute h-[300px] w-[300px] opacity-20 ${className}`}
    >
      <div className="mil-dodecahedron relative left-[100px] top-[40px] h-[223px] w-[100px]">
        {PENTAGON_TRANSFORMS.map((transform, i) => (
          <div
            key={i}
            className="absolute w-[100px]"
            style={{
              transform,
              ...(BOTTOM_ALIGNED.has(i) ? { bottom: 0 } : {}),
            }}
          >
            {EDGE_ROTATIONS.map((rotate, j) => (
              <div
                key={j}
                className="absolute h-[69px] w-[100px] origin-bottom border-t border-foreground"
                style={{ transform: rotate }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
