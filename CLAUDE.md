# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

"maheportfolio" — a personal developer portfolio for Maheshwaran Annadurai, built with Next.js 15 (App Router, `src/` dir, Turbopack), React 19, TypeScript (strict), Tailwind CSS 4, and Framer Motion. Also uses Lenis (smooth scroll), react-hook-form + zod, lucide-react, swiper (testimonial carousel).

The site's visual design is a from-scratch match of the purchased "Ashley" HTML template (`E:\portfolio\template\ashley\`) rebuilt as React components with the user's real content — see "Design system" below. There is **no WebGL/Three.js and no GSAP** in this project; all animation is Framer Motion.

Full project brief and the sprint-by-sprint build plan (Sprint 0 onward) live in `portfolio.md` at the repo root — read it before starting new feature work. **Sprint-based development is the active workflow.** Note: `.claude/agents/sprint-developer.md` and `.claude/agents/hero-scene-architect.md` predate the Ashley redesign and reference a deleted `src/components/three/HeroScene.tsx` — `hero-scene-architect` no longer applies to this codebase.

## Repo layout gotcha

This repo (`E:\portfolio\portfolio`) is nested one level inside an outer, otherwise-empty git repo (`E:\portfolio`) that has no commits and isn't a real submodule relationship — it can be ignored. This inner directory is the actual project, with its own GitHub remote (`github.com/MAHE-1702/portfolio.git`) on branch `main`. Always run npm commands from here, not from the outer folder.

## Stale path warning

`.claude/agents/sprint-developer.md` and `.claude/agents/hero-scene-architect.md` hardcode the project root as `F:\MahePortfolio\` and reference a memory path under `C:\Users\Mahe\.claude\projects\F--MahePortfolio\memory\`. The project has since moved to `E:\portfolio\portfolio`. Treat those paths as stale — use the actual current project root instead when those agents run.

## Commands

Run from `portfolio/` (this directory):
- `npm run dev` — `next dev --turbopack`
- `npm run build` — `next build --turbopack`
- `npm run start`
- `npm run lint` — ESLint (flat config, `next/core-web-vitals` + `next/typescript`, no custom rule overrides)

There is no test framework, no CI (`.github/workflows` doesn't exist), and no dedicated formatter (no Prettier/Biome) — ESLint via `npm run lint` is the only code-quality check. `npx tsc --noEmit` is a useful ad-hoc type-check when needed.

## Design system (Ashley-based)

Defined in `src/app/globals.css` under `@theme` (Tailwind v4 CSS-first config — there is no `tailwind.config.js`). Monochrome + single accent, matching the Ashley template's `_variables.scss`:
- `--color-primary` / `--color-accent`: `#FF9800`. `--color-secondary`: `#E65100` (deeper amber, for gradient depth only).
- Light sections are the `:root` default: `--color-background: #FFFFFF`, `--color-foreground: #0D0D0D`, `--color-muted: #808080`.
- **Dark sections** get a `.mil-dark` wrapper class, which re-declares `--color-background`/`--color-foreground`/`--color-muted` to their dark values *within its scope*. Because every component already reads color via `bg-background`/`text-foreground`/`text-muted`, adding or removing `.mil-dark` on a section's outer element is the only thing needed to flip it dark — don't add per-component dark-mode variants.
- `.mil-soft` wrapper class gives a slightly off-white (`#F5F5F5`) light variant, for visual separation between adjacent light sections.
- Font is Outfit (`next/font/google`, weights 300–700) for both `--font-heading` and `--font-sans` — set in `layout.tsx`.
- Shared animation easing curve lives in `src/lib/motion.ts` (`EASE`, matching Ashley's `cubic-bezier(0, 0, 0.3642, 1)`) — import it rather than redeclaring a local easing constant.
- `.glass-card` utility (defined via `@utility` in `globals.css`) is the standard glassmorphism treatment for cards/panels — reuse it rather than hand-rolling backdrop-blur styles.
- Hero/About portrait images are placeholder gradient blocks with a `TODO: replace with a real photo` comment — swap in real photos when available.

## Conventions

- Path alias `@/*` → `./src/*`.
- Reduced-motion gating pattern used throughout animated components: track `matchMedia('(prefers-reduced-motion: reduce)')` in a `useEffect`-set boolean state, then pass `animate={reduced ? undefined : {...}}` (see `SectionHeading.tsx`, `PageLoader.tsx` for examples). Follow this pattern for new animated components.
