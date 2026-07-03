"use client";

import { motion } from "framer-motion";
import {
  Globe,
  Smartphone,
  Layers,
  ShoppingCart,
  LayoutDashboard,
  Zap,
  TrendingUp,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TiltCard } from "@/components/ui/TiltCard";
import { AmbientOrbs } from "@/components/ui/AmbientOrbs";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const SERVICES = [
  {
    icon:  Globe,
    title: "Website Development",
    desc:  "Modern, responsive websites built with React and Next.js, optimized for speed and conversion.",
  },
  {
    icon:  Smartphone,
    title: "Mobile App Development",
    desc:  "Cross-platform iOS and Android apps with Flutter — one codebase, native performance.",
  },
  {
    icon:  Layers,
    title: "MERN Stack Development",
    desc:  "Full-stack JavaScript applications with MongoDB, Express, React, and Node.js.",
  },
  {
    icon:  ShoppingCart,
    title: "E-Commerce Development",
    desc:  "End-to-end online stores with product management, payments, and order tracking.",
  },
  {
    icon:  LayoutDashboard,
    title: "Admin Dashboard Development",
    desc:  "Custom admin panels and internal tools with real-time data, charts, and role-based access.",
  },
  {
    icon:  Zap,
    title: "API Development",
    desc:  "RESTful and GraphQL APIs designed for scalability, security, and third-party integration.",
  },
  {
    icon:  TrendingUp,
    title: "SEO Optimization",
    desc:  "Technical SEO audits and performance optimization to boost rankings and Core Web Vitals.",
  },
] as const;

export function Services() {
  return (
    <section id="services" className="relative min-h-screen bg-background px-6 py-24 sm:px-8">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute right-0 top-1/3 h-96 w-96 rounded-full bg-primary/8 blur-[140px]" />
      <AmbientOrbs />

      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionHeading
          title="What I Build"
          subtitle="End-to-end services from design system to production deploy."
          align="center"
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55, ease: EASE, delay: i * 0.07 }}
            >
              <TiltCard className="group h-full">
                <div
                  className="glass-card flex h-full flex-col gap-4 p-6 transition-all duration-300
                    hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <Icon size={24} className="text-primary" />
                  </div>

                  <h3 className="font-heading text-lg font-bold text-foreground">
                    {title}
                  </h3>

                  <p className="flex-1 text-sm leading-relaxed text-foreground/60">
                    {desc}
                  </p>

                  {/* Bottom accent bar — reveals on hover */}
                  <div className="h-px w-0 rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-500 group-hover:w-full" />
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
