"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUp } from "lucide-react";
import { NAV_LINKS, SITE_NAME, EMAIL } from "@/lib/constants";
import { WireframeShape } from "@/components/ui/WireframeShape";
import { EASE } from "@/lib/motion";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > window.innerHeight * 0.6);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the overlay menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);
  const [firstName] = SITE_NAME.split(" ");

  return (
    <>
      {/* Persistent corner frame — logo top-left, hamburger top-right.
          Fixed white + mix-blend-difference so it stays legible over any
          section color underneath, regardless of scroll position (a fixed
          element can't read the CSS variables of whatever section it's
          currently floating over). */}
      <div className="fixed left-0 right-0 top-0 z-40 flex items-center justify-between px-6 py-5 mix-blend-difference sm:px-8">
        <a
          href="#hero"
          className="font-heading text-xl font-bold text-white transition-opacity duration-200 hover:opacity-70"
        >
          {firstName}.
        </a>

        <button
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/40 text-white transition-opacity hover:opacity-70"
          onClick={() => setIsMenuOpen((v) => !v)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mil-overlay-menu"
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Back-to-top corner link */}
      <AnimatePresence>
        {showBackToTop && !isMenuOpen && (
          <motion.a
            href="#hero"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-foreground/20 bg-background/80 text-foreground backdrop-blur-sm transition-colors hover:border-primary/60 hover:text-primary sm:right-8"
            aria-label="Back to top"
          >
            <ArrowUp size={18} />
          </motion.a>
        )}
      </AnimatePresence>

      {/* Full-screen overlay menu — used at all breakpoints */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            id="mil-overlay-menu"
            key="overlay-menu"
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mil-dark fixed inset-0 z-50 flex flex-col justify-center overflow-hidden bg-background px-8 sm:px-16"
            aria-label="Main navigation"
          >
            <WireframeShape className="right-[10%] top-[-60px] hidden sm:block" />

            <ul className="flex flex-col gap-2">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.05, duration: 0.5, ease: EASE }}
                >
                  <a
                    href={link.href}
                    onClick={closeMenu}
                    className="font-heading text-4xl font-semibold text-foreground/80 transition-colors duration-200 hover:text-primary sm:text-6xl"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>

            <motion.a
              href={`mailto:${EMAIL}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-12 text-sm text-muted transition-colors hover:text-primary"
            >
              {EMAIL}
            </motion.a>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
