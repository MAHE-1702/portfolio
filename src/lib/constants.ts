export const SITE_NAME = "Maheshwaran Annadurai";
export const ROLE_TITLE = "Full Stack Web & Flutter Mobile Developer";
export const TAGLINE =
  "I build fast, scalable web platforms and cross-platform mobile apps — from idea to production, end to end.";

export const EMAIL = "mahedevop@gmail.com";
export const PHONE = "+91 98945 36314";
export const WHATSAPP = "https://wa.me/919894536314";
export const LINKEDIN_URL = "https://www.linkedin.com/in/maheshwarana/";
export const GITHUB_URL = "https://github.com/MAHE-1702";

export const HERO_ROLES = [
  "Full Stack Developer",
  "MERN Developer",
  "Flutter Mobile Developer",
  "UI/UX Enthusiast",
] as const;

export const COLOR_TOKENS = {
  primary: "#00E5FF",
  secondary: "#7C3AED",
  accent: "#FF6B00",
  background: "#050816",
  foreground: "#e2e8f0",
} as const;

export const SKILLS = {
  Frontend: ["React", "Next.js", "JavaScript", "TypeScript", "Redux", "Tailwind CSS"],
  Backend:  ["Node.js", "Express.js", "MongoDB", "PostgreSQL", "REST API", "JWT"],
  Mobile:   ["Flutter", "React Native"],
  Tools:    ["Docker", "Git", "AWS", "Vercel", "Linux"],
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
] as const;

export type NavLinkItem = (typeof NAV_LINKS)[number];
