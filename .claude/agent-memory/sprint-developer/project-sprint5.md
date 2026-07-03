---
name: project-sprint5
description: "MahePortfolio Sprint 5 — polish pass: word mask-reveal headings, PageLoader, AmbientOrbs, reduced-motion + 3D/magnetic audits"
metadata:
  type: project
---

Sprint 5 (polish pass) complete. No sections rebuilt — only enhancements.

**Why:** Sprint 5 was a polish-only pass over the finished page (Sprints 0–4).

**How to apply:** Reusables added here (`AmbientOrbs`, `PageLoader`) and the reduced-motion pattern are available for any future section work.

## Files changed
- `src/components/ui/SectionHeading.tsx` — title now splits into words; each word slides up from an `overflow-hidden` clip via Framer `staggerChildren` (0.1) + `wordVariants` (y 110%→0%, 0.65s EASE). Accent bar + subtitle also animate. Honors `prefers-reduced-motion` (renders static, `initial={false}`).
- `src/components/layout/PageLoader.tsx` — NEW. Full-screen splash, "Maheshwaran" gradient text + progress bar filling 0→100% over 1.5s, fades out at 1.8s via `AnimatePresence`. Once-per-session via `sessionStorage("loaded")`. Returns null under reduced-motion. Wired into `layout.tsx` before `{children}`.
- `src/components/ui/AmbientOrbs.tsx` — NEW. 4 blurred drifting gradient orbs (`blur-[120px]`, low opacity, `aria-hidden`, `pointer-events-none`, wrapper `absolute inset-0 z-0`). Infinite `repeatType:"reverse"` drift, desynced durations 13–20s. Static under reduced-motion. Added to Services, Skills, Testimonials (each content wrapper bumped to `relative z-10`).
- `src/components/sections/Testimonials.tsx` — idle float now gated on `reduced` (animate/transition → undefined when reduced).

## Audits (no code change — already correct)
- 3D perf: HeroScene, AvatarScene, SkillSphere all already have IntersectionObserver pause + `dpr={[1,2]}`. (Minor note: SkillSphere sets a `paused` ref that nothing consumes since OrbitControls autorotates autonomously — left as-is per "skip if present".)
- MagneticButton: already on all primary CTAs (Hero x2, Footer back-to-top, Contact submit). Did NOT convert Footer social icons / Contact contact-rows — `MagneticButton`'s fixed pill styling (`px-8 py-3.5`, gradient/glass variants) is incompatible with the 44px circular icon buttons; converting would break their design.

## Key patterns
- Reduced-motion gate used everywhere: `useState(false)` + `useEffect(() => setReduced(matchMedia("(prefers-reduced-motion: reduce)").matches))`, then `animate={reduced ? undefined : {...}}` and `transition={reduced ? undefined : {...}}`.
- Framer `repeatType: "reverse" as const` needed inline to satisfy the `RepeatType` union under strict TS.
- Word mask-reveal: outer `<span overflow-hidden pb-[0.12em]>` (pb prevents descender clipping) wrapping inner `motion.span` translateY.

## Status
`npx tsc --noEmit` → 0 errors. `GET http://localhost:3000/` → 200.
