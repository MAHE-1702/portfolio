"use client";

import { motion } from "framer-motion";
import { GitBranch, Briefcase, Mail, MessageCircle, ArrowUp } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import {
  NAV_LINKS,
  SITE_NAME,
  TAGLINE,
  LINKEDIN_URL,
  GITHUB_URL,
  EMAIL,
  WHATSAPP,
} from "@/lib/constants";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const SOCIALS = [
  { icon: GitBranch, label: "GitHub", href: GITHUB_URL },
  { icon: Briefcase, label: "LinkedIn", href: LINKEDIN_URL },
  { icon: Mail, label: "Email", href: `mailto:${EMAIL}` },
  { icon: MessageCircle, label: "WhatsApp", href: WHATSAPP },
] as const;

export function Footer() {
  function scrollToTop() {
    document
      .getElementById("hero")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <footer
      id="footer"
      className="relative border-t border-primary/10 bg-background px-6 pb-8 pt-16 sm:px-8"
      aria-label="Site footer"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-2/3 -translate-x-1/2 rounded-full bg-primary/5 blur-[120px]" />

      <div className="mx-auto max-w-6xl">
        {/* Top row */}
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <a
              href="#hero"
              className="bg-gradient-to-r from-primary to-secondary bg-clip-text font-heading text-2xl font-bold text-transparent"
            >
              {SITE_NAME}
            </a>
            <p className="mt-3 text-sm leading-relaxed text-muted">{TAGLINE}</p>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            {SOCIALS.map(({ icon: Icon, label, href }) => {
              const external = href.startsWith("http");
              return (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-primary/20 bg-background/50 text-foreground/70 transition-all duration-300 hover:scale-110 hover:border-primary/50 hover:text-primary hover:shadow-lg hover:shadow-primary/20"
                >
                  <Icon size={18} />
                </a>
              );
            })}
          </div>
        </div>

        {/* Quick nav */}
        <nav
          aria-label="Footer navigation"
          className="mt-10 flex flex-wrap gap-x-6 gap-y-2"
        >
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="text-sm text-muted transition-colors duration-200 hover:text-primary"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Animated accent underline */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="mt-10 h-px origin-left bg-gradient-to-r from-primary via-secondary to-transparent"
        />

        {/* Bottom bar */}
        <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} {SITE_NAME}. Built with Next.js,
            Three.js &amp; a lot of coffee.
          </p>

          <MagneticButton variant="glass" onClick={scrollToTop}>
            <span className="flex items-center gap-2">
              <ArrowUp size={16} />
              Back to top
            </span>
          </MagneticButton>
        </div>
      </div>
    </footer>
  );
}
