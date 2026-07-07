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
import { EASE } from "@/lib/motion";

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
    <section id="services" className="mil-dark relative bg-background px-6 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="What I Build"
          subtitle="End-to-end services from design system to production deploy."
          align="center"
        />

        <div className="grid grid-cols-1 divide-y divide-foreground/10 border-t border-foreground/10 sm:grid-cols-2 lg:grid-cols-3 lg:divide-x">
          {SERVICES.map(({ icon: Icon, title, desc }, i) => (
            <motion.a
              key={title}
              href="#contact"
              className="group flex flex-col gap-4 p-8 transition-colors duration-300 hover:bg-foreground/[0.03]"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55, ease: EASE, delay: i * 0.05 }}
            >
              <Icon size={26} className="text-primary" />

              <h3 className="font-heading text-lg font-semibold text-foreground">
                {title}
              </h3>

              <p className="flex-1 text-sm leading-relaxed text-muted">
                {desc}
              </p>

              <span className="h-px w-8 bg-primary transition-all duration-300 group-hover:w-16" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
