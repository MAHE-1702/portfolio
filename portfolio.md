# Mahe's 3D Portfolio — Claude Code Sprint Script

## How to use this

1. `mkdir mahe-portfolio && cd mahe-portfolio`
2. Run `claude` to start a Claude Code session in this folder.
3. Paste **Sprint 0** in full. Let it finish, run `npm run dev`, check it works.
4. Paste **Sprint 1**, check the browser, repeat for each sprint in order.
5. Don't skip ahead — each sprint builds on the previous one's file structure.
6. If a sprint output breaks something, just say "fix the build error: [paste error]" before moving to the next sprint.

Items marked `[ADD LATER]` need real info from you before that sprint — fill them in directly in this file before pasting.

---

## GLOBAL PROJECT BRIEF (reference — included inside Sprint 0)

- **Name:** Maheshwaran Annadurai
- **Title:** Full Stack Web & Flutter Mobile Developer
- **Tagline:** "I build fast, scalable web platforms and cross-platform mobile apps — from idea to production, end to end."
- **Personal motto (Tamil):** "களவும் கற்று மற" (used as a small signature line, not a testimonial)
- **Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS, Framer Motion, Three.js / React Three Fiber, GSAP, Lenis Smooth Scroll
- **Colors:** Primary `#00E5FF` · Secondary `#7C3AED` · Accent `#FF6B00` · Background `#050816`
- **Package manager:** npm
- **3D assets:** procedural only, no external .glb files
- **Images:** placeholders for now (use solid gradient blocks / picsum placeholders, swap later)
- **Contact:** mahedevop@gmail.com · +91 98945 36314 (also WhatsApp) · linkedin.com/in/maheshwarana · github.com/MAHE-1702

---

## SPRINT 0 — Project Setup & Architecture

```
Set up a brand-new premium 3D developer portfolio website. This is Sprint 0 of a multi-sprint build — only do what's listed below, nothing more yet.

PERSON: Maheshwaran Annadurai, Full Stack Web & Flutter Mobile Developer.

TECH STACK (init exactly this):
- Next.js 15 (App Router, TypeScript, src/ directory)
- React 19
- Tailwind CSS
- Framer Motion
- Three.js + @react-three/fiber + @react-three/drei
- GSAP
- Lenis (smooth scroll)
- npm as package manager

TASKS:
1. Initialize the Next.js 15 project with TypeScript, Tailwind, App Router, src/ directory, ESLint.
2. Install: framer-motion, three, @react-three/fiber, @react-three/drei, gsap, lenis, @react-three/postprocessing, zod, react-hook-form, lucide-react.
3. Set up the Tailwind config with this exact design token system as CSS variables AND tailwind theme extension:
   - --color-primary: #00E5FF
   - --color-secondary: #7C3AED
   - --color-accent: #FF6B00
   - --color-background: #050816
   - Add a glassmorphism utility class `.glass-card` (backdrop-blur, semi-transparent background, subtle border using primary color at low opacity).
   - Set up dark theme as the only theme (no light mode toggle needed).
   - Use "Space Grotesk" or "Clash Display" style font for headings (use a free Google Font fallback like "Sora" or "Space Grotesk") and "Inter" for body text. Configure via next/font.
4. Create this exact folder structure under src/:
   ```
   src/
     app/
       layout.tsx
       page.tsx
       globals.css
     components/
       layout/        (Header, Footer, SmoothScrollProvider, CursorFollower)
       sections/       (Hero, About, Services, Skills, Projects, Experience, Testimonials, Stats, Contact)
       three/          (3D scene components go here in later sprints)
       ui/             (Button, GlassCard, MagneticButton, AnimatedCounter, SectionHeading — small reusable pieces)
     lib/
       constants.ts    (put name, contact info, color tokens, nav links here)
       utils.ts
     types/
       index.ts
   ```
5. Create `src/lib/constants.ts` with: SITE_NAME, ROLE_TITLE, TAGLINE, EMAIL, PHONE, WHATSAPP, LINKEDIN_URL, GITHUB_URL — using my real values above. Also export a NAV_LINKS array (Home, About, Services, Skills, Projects, Experience, Testimonials, Contact).
6. Build a `LenisProvider` client component wrapping the app in `layout.tsx` for buttery smooth scroll, respecting `prefers-reduced-motion`.
7. Build a minimal `CursorFollower` component (custom cursor dot + ring that follows mouse with spring physics via Framer Motion) — desktop only, hidden on touch devices.
8. Build a placeholder `Header` (logo/name on left, nav links center/right, mobile hamburger menu with slide-in drawer) and `Footer` (empty for now, just a div with id, will fill in Sprint 4).
9. `page.tsx` should render Header, then empty placeholder `<section>` divs with ids for each section (hero, about, services, skills, projects, experience, testimonials, stats, contact) each just showing the section name as text for now, then Footer.
10. Set up `metadata` in layout.tsx with a basic SEO title/description for Maheshwaran Annadurai's portfolio (we'll do full SEO in a later sprint).
11. Make sure `npm run dev` runs cleanly with zero TypeScript or console errors.

Do not build any real 3D scenes or section content yet — that's later sprints. Just give me a clean, typed, working skeleton with smooth scroll and the design system in place.
```

---

## SPRINT 1 — Hero Section with 3D Scene

```
Sprint 1: Build the full Hero section for Maheshwaran's portfolio. Work inside the existing project structure from Sprint 0 — don't change the folder architecture.

HERO 3D SCENE — "Particle Morph → Holographic Laptop Reveal" with a big cinematic camera intro:

Build a cinematic 3D hero scene using React Three Fiber + Three.js + GSAP, inside `src/components/three/HeroScene.tsx`, dynamically imported with `next/dynamic` (ssr: false) and a branded loading fallback.

TIMELINE (run once on mount, total ~4-5 seconds, then settle into a calm idle loop):

PHASE 1 — Particle Assembly (0s → ~2s):
- Start with several thousand small particles (instanced points) scattered randomly through 3D space, colors mixing #00E5FF and #7C3AED, fully dark background (#050816).
- Camera starts pulled back and slightly off-axis, like an establishing shot.
- Particles animate from their scattered positions into a 3D arrangement that spells out or outlines "MAHESHWARAN" (or just "MAHE" if full name is too dense to read clearly in particle form — your call on legibility) — use a GSAP timeline or custom lerp animation driving each particle's target position, eased with staggered, slightly randomized timing per particle so it doesn't feel mechanical.
- Camera does a slow dolly-in toward the forming name during this phase.

PHASE 2 — Dissolve & Reveal (~2s → ~3.5s):
- Once the name briefly holds formation (~0.3-0.5s hold), particles burst/scatter outward again and re-converge into a completely different formation: the silhouette/outline of a laptop shape.
- Simultaneously, fade the literal name text formation out of points and fade in the actual 3D laptop geometry (procedural — rounded box base + screen, no external models) underneath, so it feels like the particles "built" the laptop.
- Camera continues its dolly/arc move, ending in a 3/4 angle framing the laptop slightly below eye level (hero shot angle, like a product launch video).

PHASE 3 — Holographic Activation (~3.5s → ~4.5s):
- The laptop's screen "powers on": an emissive shader/animated texture plane on the lid lights up with a glowing UI/code-pattern (animated scrolling lines or grid, primary color #00E5FF), with a quick bright flash/bloom pulse at the moment it activates.
- 2-3 small holographic panel planes (glassy, emissive, secondary color #7C3AED accents) pop up out of the laptop and settle into a slow orbit around it.
- Camera settles into its final resting position here — this is the "hero" framing the rest of the page content will sit over.

PHASE 4 — Idle Loop (4.5s onward, forever):
- Laptop gently floats (slow sine-wave bob) and slowly rotates.
- Orbiting holographic panels continue slow orbit.
- Background particles that didn't form the laptop remain as a sparse ambient field, very slow drift.
- Camera holds still except for a subtle parallax tilt that responds to mouse position (lerp toward cursor offset, small range, never disorienting).
- Use postprocessing (via @react-three/postprocessing) for a subtle bloom on the emissive elements (laptop screen, hologram panels, accent particles) to sell the "glow" — keep bloom intensity tasteful, not blown out.

TECHNICAL REQUIREMENTS:
- Use GSAP for the phase timeline (camera position/rotation tweens, opacity/scale tweens) driving values that feed into useFrame, OR drive it with a single GSAP timeline controlling a "progress" ref read inside useFrame — your choice, whichever is cleaner.
- Particle positions: precompute the "scattered," "name," and "laptop" target position arrays once on mount (useMemo), then interpolate between them per-frame based on timeline progress.
- Respect `prefers-reduced-motion`: if set, skip phases 1-3 entirely and just render the final idle state (laptop + hologram, static camera, no particle assembly animation) immediately.
- Mobile (<768px): skip the full particle-name-morph for performance — just do a simpler fade+scale-in of the laptop directly, keep the idle loop but with fewer particles and no postprocessing bloom (too expensive on mobile GPUs).
- Pause all animation (stop useFrame work) when the hero section scrolls out of view, using an IntersectionObserver.
- Cap pixel ratio at 2, keep total particle count performance-conscious (a few thousand max on desktop, a few hundred on mobile).
- Wrap in `<Suspense>` with a minimal loading fallback (don't block page load — show the rest of the hero text/CTAs immediately even if the 3D scene is still initializing).
- Make it feel like a movie title sequence crossed with an Apple product reveal — confident, smooth easing (no linear motion anywhere), nothing jerky.

2. Create `src/components/sections/Hero.tsx`:
   - Full-viewport-height (100vh) section, background #050816, the HeroScene canvas positioned absolutely covering it (lower z-index), content overlaid on top.
   - Name reveal animation: "Maheshwaran Annadurai" splits into characters/words and animates in (stagger fade+rise) with Framer Motion or GSAP on mount.
   - Below name: a typewriter effect cycling through these roles with a blinking cursor: "Full Stack Developer" → "MERN Developer" → "Flutter Mobile Developer" → "UI/UX Enthusiast". Build this as a small reusable `Typewriter` component in `components/ui/`.
   - Tagline below: "I build fast, scalable web platforms and cross-platform mobile apps — from idea to production, end to end."
   - Two CTA buttons: "View Projects" (primary gradient, scrolls smoothly to #projects) and "Get In Touch" (outlined glass style, scrolls to #contact). Make both magnetic buttons (button text/icon shifts slightly toward cursor on hover within a radius) — build a reusable `MagneticButton` component in `components/ui/`.
   - Scroll indicator at the bottom center: small animated mouse/chevron icon bouncing, with text "Scroll to explore", fades out after user scrolls past hero.
   - All hero text content should fade/parallax slightly on scroll (use Framer Motion's useScroll + useTransform).

3. Ensure everything is responsive: on mobile, the 3D scene should still render but simplified (reduce particle count, maybe hide the orbiting panels) and text should resize/stack cleanly. Use a media query or window-width check to reduce 3D complexity below 768px.

4. Make sure this doesn't break Sprint 0's smooth scroll or layout. Test `npm run dev`.
```

---

## SPRINT 2 — About, Services & Skills Sections

```
Sprint 2: Build the About, Services, and Skills sections. Work inside the existing project — keep the same architecture and design tokens from previous sprints.

=== ABOUT SECTION (src/components/sections/About.tsx) ===
1. Two-column layout (stacks on mobile): left = 3D rotating avatar, right = content.
2. `src/components/three/AvatarScene.tsx`: a procedural abstract avatar — NOT a realistic human model. Build an interesting abstract geometric "avatar" representation: e.g. a low-poly distorted icosahedron/sphere with a glowing wireframe overlay and a subtle inner glowing core, using primary/secondary colors, continuously slow-rotating, with mouse-hover speeding up rotation slightly. Keep it abstract/artistic, not a face/figure.
3. Career timeline (vertical, animated reveal on scroll via Framer Motion's whileInView) using this real data:
   - Flutter & MERN Fullstack Developer — Elevado Softwares Private Limited, Coimbatore — Dec 2024 – Present. "Developing full-stack web applications using the MERN stack and cross-platform mobile apps using Flutter. Building RESTful APIs, integrating MongoDB databases, and implementing secure authentication. Collaborating with design and product teams to deliver scalable, high-performance applications."
   - Fullstack Developer — AidatQ Software Development, Coimbatore — [ADD DATES]. "Worked on the Pinto Admin restaurant management application using the MERN stack. Improved UI/UX using Tailwind CSS and optimized application performance."
   - MERN Fullstack Developer Intern — Glacier Technology, Coimbatore — [ADD DATES]. "Developed real-time web applications using MongoDB, Express.js, React, and Node.js. Built responsive UI components and enhanced user experience across devices."
4. Professional summary paragraph: "I'm Maheshwaran, a Full Stack Web & Flutter Mobile Developer based in Coimbatore. I design and ship production-grade web platforms and cross-platform mobile apps — from e-commerce and admin systems to GPS-tracked logistics apps — using the MERN stack and Flutter. I care about clean architecture, fast UIs, and shipping things that actually go live." Add the personal line "களவும் கற்று மற" subtly styled as a signature/motto under the summary (small, italic, secondary color).
5. Animated counters component (reusable `AnimatedCounter` in components/ui/, counts up when scrolled into view) — use placeholder numbers for now, we wire real stats in Sprint 4.

=== SERVICES SECTION (src/components/sections/Services.tsx) ===
1. Grid of 3D tilt glassmorphism cards (use `.glass-card` utility) for these 7 services:
   - Website Development
   - Mobile App Development
   - MERN Stack Development
   - E-Commerce Development
   - Admin Dashboard Development
   - API Development
   - SEO Optimization
2. Each card: icon (use lucide-react icons, pick fitting ones), title, 1-2 line description, and a subtle border glow on hover.
3. Build a reusable `TiltCard` wrapper component (components/ui/) using Framer Motion's mouse-position tracking to apply a 3D perspective tilt (rotateX/rotateY) following cursor position within the card bounds, with a smooth spring return to flat on mouse leave. Reuse this for the Services cards.
4. Responsive grid: 3 columns desktop, 2 tablet, 1 mobile.

=== SKILLS SECTION (src/components/sections/Skills.tsx) ===
1. Interactive 3D skill sphere: `src/components/three/SkillSphere.tsx` — arrange skill name labels (as HTML via drei's `<Html>` or as billboarded text via drei's `<Text>`) on the surface of an invisible sphere, slowly auto-rotating, and rotates faster/follows drag on user mouse interaction (use drei's `<OrbitControls>` with autoRotate, enableZoom={false}, enablePan={false}).
2. Skills to place on the sphere, grouped by color (Frontend = primary color, Backend = secondary color, Mobile = accent color, Tools = a muted neutral):
   - Frontend: React, Next.js, JavaScript, TypeScript, Redux, Tailwind CSS
   - Backend: Node.js, Express.js, MongoDB, PostgreSQL, REST API, JWT
   - Mobile: Flutter, React Native
   - Tools: Docker, Git, AWS, Vercel, Linux
3. Below/beside the sphere, also render a simple legend/filter — clicking a category (Frontend/Backend/Mobile/Tools) highlights only that group's labels on the sphere (others dim).
4. Mobile fallback: if 3D sphere is too heavy or hard to interact with via touch on small screens, render a clean animated tag-cloud/grid fallback instead (still grouped and color-coded) below a certain breakpoint — your judgment on threshold, but make sure mobile UX doesn't feel broken.

Test responsiveness and `npm run dev` after this sprint, make sure no console errors and scroll performance still feels smooth.
```

---

## SPRINT 3 — Projects Showcase & Experience Timeline

```
Sprint 3: Build the Projects 3D carousel and Experience timeline sections.

=== PROJECTS SECTION (src/components/sections/Projects.tsx) ===

Build a 3D carousel (horizontal, drag/swipe + arrow button navigation, center card scaled up and in focus, side cards smaller/dimmed — classic coverflow style using Framer Motion's drag + transforms, no need for raw Three.js here unless you want extra polish) showing these real projects:

1. **Kriyaa Astrology Platform**
   - Tech: React.js, Vite, JavaScript
   - Description: "A responsive astrology consultation platform with service pages, consultation booking workflows, and reusable React components, optimized for seamless UX across devices."
   - Live demo: https://kriyaastrology.in
   - GitHub: N/A [ADD LATER if available]

2. **House of Madras — E-Commerce Platform**
   - Tech: PHP, Laravel, MySQL
   - Description: "A full e-commerce platform with product catalog management, order processing, customer management, and secure authentication, with optimized database queries for scalability."
   - Live demo: https://houseofmadras.com
   - GitHub: N/A [ADD LATER if available]

3. **Pinto Admin — Restaurant Management System**
   - Tech: MERN Stack, Tailwind CSS
   - Description: "An admin application for restaurant management, with UI/UX improvements via Tailwind CSS and optimized application performance."
   - Live demo: N/A [ADD LATER if available]
   - GitHub: N/A [ADD LATER if available]

4. **Diet Planner Mobile App**
   - Tech: Flutter, REST APIs
   - Description: "A cross-platform diet planning app with meal planning, nutrition tracking, and API integrations, published on the Google Play Store."
   - Live demo: [ADD Play Store link if available]
   - GitHub: N/A [ADD LATER if available]

5. **Dairy Delivery Agent App**
   - Tech: Flutter, REST APIs, Location Services
   - Description: "A delivery partner mobile app to track and manage dairy product deliveries to multiple companies in real time, with route tracking and delivery status updates."
   - Live demo: N/A [ADD LATER if available]
   - GitHub: N/A [ADD LATER if available]

6. **Travel Logistics Application**
   - Tech: Flutter, MERN Stack, GPS Tracking
   - Description: "A logistics mobile app for heavy vehicle load tracking with real-time GPS monitoring, multi-account access, and load status updates."
   - Live demo: N/A [ADD LATER if available]
   - GitHub: N/A [ADD LATER if available]

7. **Alites Cybersecurity Website** (bonus project)
   - Tech: React.js, Vite, JavaScript
   - Description: "A modern cybersecurity company website with responsive UI, service showcases, and performance-optimized frontend architecture."
   - Live demo: https://alites.vercel.app
   - GitHub: N/A [ADD LATER if available]

8. **Niraa Event Management Platform** (bonus project)
   - Tech: Vite, MERN Stack
   - Description: "An event management website with a full admin panel for managing events, bookings, and inquiries, with secure authentication and responsive design."
   - Live demo: N/A [ADD LATER if available]
   - GitHub: N/A [ADD LATER if available]

REQUIREMENTS for each card:
- Large preview image area (use a placeholder: gradient block with project initials, or picsum.photos placeholder image — clearly mark as `/* TODO: replace with real screenshot */`)
- Tech stack shown as small pill badges
- "Live Demo" button (opens in new tab, disable/hide gracefully if URL is "N/A")
- "GitHub" button (same N/A handling)
- "Case Study" button that opens a modal (build `ProjectModal` component) with a larger layout: bigger image, full description, tech stack, and the two link buttons again
- Card has glassmorphism styling, glow border in primary color when focused/center in carousel

Make carousel touch-swipeable on mobile, and keyboard accessible (arrow keys move focus, Enter opens modal on focused card).

=== EXPERIENCE TIMELINE (src/components/sections/Experience.tsx) ===

Note: this can either be a standalone deeper version of the About timeline or you can choose to merge them — your call, but if you keep both, make this one slightly more detailed (e.g. include 2-3 bullet achievements per role instead of one paragraph). Use the same 3 roles as Sprint 2 (Elevado Softwares, AidatQ, Glacier Technology) with the same data, but render as a vertical timeline with alternating left/right entries on desktop (stacked on mobile), a vertical progress line that fills as user scrolls (Framer Motion useScroll + scaleY), and each entry reveals with a slide+fade on scroll into view.

Test thoroughly: `npm run dev`, check carousel drag on a resized/mobile viewport, check modal open/close, check timeline scroll animation.
```

---

## SPRINT 4 — Testimonials, Stats & Contact

```
Sprint 4: Build Testimonials, Stats, Contact, and the real Footer.

=== TESTIMONIALS SECTION (src/components/sections/Testimonials.tsx) ===
No real testimonials provided yet, so use 3 realistic placeholder testimonials (clearly mark in a code comment `// TODO: replace with real client testimonials`), e.g. generic praise about reliability, communication, and code quality from a "Project Manager," "Startup Founder," and "Product Lead" — keep them tasteful, not over-the-top.
Render as floating 3D-ish cards: glassmorphism cards with a subtle continuous float animation (Framer Motion, different phase offset per card so they don't move in sync), arranged in a row (desktop) that wraps/stacks on mobile, each with a quote icon, the quote text, name, role, and a simple avatar placeholder (initials in a colored circle).

=== STATS SECTION (src/components/sections/Stats.tsx) ===
Use the reusable AnimatedCounter from Sprint 2 to show 4 stats, animating from 0 when scrolled into view:
- Projects Completed: 8 [ADJUST IF YOU HAVE A REAL NUMBER]
- Apps Developed: 3 [ADJUST IF YOU HAVE A REAL NUMBER]
- Websites Delivered: 5 [ADJUST IF YOU HAVE A REAL NUMBER]
- Clients/Companies Served: 4 [ADJUST IF YOU HAVE A REAL NUMBER]
Lay out as 4 columns (desktop) / 2x2 grid (mobile), large bold numbers in primary color with a "+" suffix, label underneath, subtle glassmorphism background panel for the whole section.

=== CONTACT SECTION (src/components/sections/Contact.tsx) ===
1. Two-column layout: left = contact info + social links, right = form.
2. Contact info (real data):
   - Email: mahedevop@gmail.com (mailto: link)
   - Phone: +91 98945 36314 (tel: link)
   - WhatsApp: https://wa.me/919894536314 (with a WhatsApp icon button)
   - LinkedIn: https://www.linkedin.com/in/maheshwarana/
   - GitHub: https://github.com/MAHE-1702
   Render each as an icon + label row, icon buttons should be magnetic-hover (reuse MagneticButton) and glow in their respective brand-ish accent on hover (or just primary color, your call for consistency).
3. Contact form: name, email, subject, message fields, glassmorphism container giving it a "3D form panel" feel (subtle tilt-on-mouse-move like the TiltCard, but gentle since it's a form — maybe just on the panel container, not per-field). Use react-hook-form + zod for validation (required fields, valid email format, min message length). Show inline error messages with a shake animation on invalid submit. On valid submit, since there's no backend yet, just show a success toast/message state ("Message captured — I'll get back to you soon!") and log the payload to console — note in a code comment where to wire up a real email service (e.g., Resend, EmailJS, or a Next.js API route) later.
4. Make every field and button keyboard accessible with visible focus states.

=== FOOTER (src/components/layout/Footer.tsx) ===
Replace the Sprint 0 placeholder with a real animated footer:
- Name/logo, short tagline repeat, the 4 social icons (GitHub, LinkedIn, Email, WhatsApp) with hover scale+glow.
- Quick nav links repeating the header nav.
- Bottom row: "© [current year] Maheshwaran Annadurai. Built with Next.js, Three.js & a lot of coffee." with a small animated accent underline that draws in on scroll-into-view.
- A "back to top" magnetic button bottom-right that smooth-scrolls to hero.

Test `npm run dev`, submit the contact form with invalid and valid data to confirm validation works, check all social/contact links open correctly.
```

---

## SPRINT 5 — Animation Polish & Page-Wide Interactions

```
Sprint 5: Polish pass — add the remaining cinematic touches across the whole site. Don't rebuild sections, just enhance what exists.

1. **Scroll-triggered text reveal**: audit every section heading (SectionHeading component in components/ui/ — create if it doesn't exist as a shared component) so each one animates in with a consistent style: characters or words mask-reveal upward with a slight stagger, triggered via Framer Motion's whileInView, viewport={{ once: true, amount: 0.3 }}.
2. **Parallax**: add subtle scroll-based parallax (different scroll speeds for foreground content vs background decorative elements) to at least Hero, About, and Projects sections using useScroll + useTransform.
3. **Page transitions**: since this is a single-page scroller, "page transition" here means a smooth animated route loader — add a brief branded loading screen (logo/name with a progress bar or animated loader using the primary/secondary gradient) shown on first load while 3D assets and fonts initialize, fading out once ready.
4. **Magnetic buttons audit**: confirm every CTA/button site-wide uses the MagneticButton component consistently (Hero CTAs, Contact submit, social icons, back-to-top).
5. **Floating objects / ambient motion**: add a few subtle ambient floating decorative blurred gradient orbs (CSS, primary/secondary/accent colors, low opacity, slow drift via Framer Motion or CSS animation) behind 2-3 sections (e.g. Services, Skills, Testimonials) for visual depth without hurting performance.
6. **Reduced motion**: confirm every animation respects `prefers-reduced-motion: reduce` — disable or shorten non-essential motion (parallax, floating orbs, magnetic effects) for users with that preference, while keeping core content visible/functional.
7. **3D performance pass**: across HeroScene, AvatarScene, and SkillSphere — ensure they pause rendering when their section is scrolled out of the viewport (use an IntersectionObserver to toggle a "paused" prop that stops the useFrame loop or unmounts the Canvas), and confirm pixel ratio is capped (max 2) and particle/instance counts are reasonable for mid-range laptops and phones.
8. Run a full visual QA pass yourself: scroll through the entire site, fix any layout shift, z-index, or animation timing issues you notice.
```

---

## SPRINT 6 — SEO, Accessibility & Performance Hardening

```
Sprint 6: Final hardening pass for SEO, accessibility, and performance before deployment.

1. **SEO**:
   - Fill out complete `metadata` in `app/layout.tsx`: title, description, keywords, Open Graph tags (og:title, og:description, og:image — generate a simple branded placeholder OG image or note where to add a real one), Twitter card tags, canonical URL placeholder.
   - Add `app/sitemap.ts` and `app/robots.ts` (Next.js 15 conventions) with the single-page route.
   - Add JSON-LD structured data (Person schema) in the layout with Maheshwaran's name, job title "Full Stack Web & Flutter Mobile Developer," and the real social URLs (LinkedIn, GitHub) as `sameAs`.
   - Ensure every section has exactly one semantic heading hierarchy (h1 in Hero only, h2 for section titles, h3 for sub-items) — audit and fix if needed.

2. **Accessibility**:
   - Audit color contrast for text against #050816 background and glass card backgrounds — adjust opacity/text colors where contrast fails WCAG AA.
   - Ensure all interactive elements (buttons, links, form fields, carousel, modal) are keyboard-navigable with visible focus rings, and modal traps focus + closes on Escape.
   - Add proper `alt` text placeholders on all images, `aria-label`s on icon-only buttons (social icons, hamburger menu, carousel arrows), and a "Skip to main content" link for keyboard users.
   - Ensure the custom cursor and 3D-only decorative elements are marked `aria-hidden="true"` so they don't confuse screen readers.

3. **Performance**:
   - Convert all section components below the Hero fold to dynamic imports with `next/dynamic` and loading skeletons where it makes sense (especially the 3D-heavy ones: AvatarScene, SkillSphere).
   - Audit images — confirm `next/image` is used everywhere with proper sizing, and lazy loading is default-on for below-fold images.
   - Run `npm run build` and fix any build warnings, especially around bundle size for the three.js / r3f chunks — confirm they're code-split and not bloating the main bundle.
   - Double check fonts are loaded via `next/font` (no external font CDN blocking render).

4. Give me a final summary: confirm `npm run build` succeeds cleanly, list any remaining manual TODOs (like the [ADD LATER] items from earlier sprints), and confirm the site is ready for deployment.
```

---

## SPRINT 7 — Vercel Deployment

```
Sprint 7: Prepare and document deployment to Vercel.

1. Add a `vercel.json` if any custom config is needed (likely minimal for a standard Next.js 15 app — only add if there's a genuine need, e.g. custom headers for caching the 3D/static assets).
2. Create a `.env.example` file documenting any environment variables referenced in the contact form section (e.g. placeholders for RESEND_API_KEY or EMAILJS keys, even if unused for now) so it's clear what to fill in before going live with real email sending.
3. Write a `DEPLOYMENT.md` file in the project root with step-by-step instructions to:
   - Push this project to a new GitHub repo (github.com/MAHE-1702)
   - Import it into Vercel via the GitHub integration
   - Set the production domain
   - Confirm build command (`npm run build`) and output settings are auto-detected correctly
   - Note where to add environment variables in the Vercel dashboard if the contact form gets wired to a real email service later
4. Do a final `npm run build` to confirm zero errors, then summarize the full project: folder structure, all sections built, and the running list of [ADD LATER] TODOs (real screenshots, missing demo/GitHub links, missing employment dates, real stats numbers, real testimonials) that I still need to fill in myself.
```

---

## Your outstanding TODOs (fill in before/after running the sprints)

- [ ] Employment dates for AidatQ Software Development role
- [ ] Employment dates for Glacier Technology internship
- [ ] GitHub repo links for any of the 8 projects (if public)
- [ ] Live demo links for: Pinto Admin, Diet Planner app, Dairy Delivery Agent app, Travel Logistics app, Niraa Event Management
- [ ] Real project screenshots to replace placeholders
- [ ] Real stats numbers (Projects Completed / Apps Developed / Websites Delivered / Clients Served) if the estimates in Sprint 4 are off
- [ ] Real client testimonials to replace placeholders in Sprint 4
- [ ] OG image for social sharing (Sprint 6)