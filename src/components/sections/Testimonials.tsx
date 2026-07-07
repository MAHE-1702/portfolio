"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EASE } from "@/lib/motion";

import "swiper/css";

// TODO: replace with real client testimonials
const TESTIMONIALS = [
  {
    quote:
      "Maheshwaran delivered our platform ahead of schedule with clean, maintainable code. His attention to detail and communication throughout the project were outstanding.",
    name: "Arjun Mehta",
    role: "Project Manager",
    company: "TechVentures",
  },
  {
    quote:
      "We brought Mahe in to build our mobile app from scratch. He understood our vision immediately and shipped a polished Flutter app that our users love. Highly recommend.",
    name: "Priya Nair",
    role: "Startup Founder",
    company: "NovaBuild",
  },
  {
    quote:
      "The admin dashboard Mahe built for us handles thousands of records without a hitch. Rock-solid backend logic and a UI our team actually enjoys using every day.",
    name: "Karthik Sundaram",
    role: "Product Lead",
    company: "DataStack",
  },
] as const;

export function Testimonials() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section
      id="testimonials"
      className="mil-soft relative bg-background px-6 py-24 sm:px-8"
    >
      <div className="mx-auto max-w-3xl">
        <SectionHeading title="Testimonials" subtitle="What clients say" align="center" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <Quote size={36} className="mx-auto mb-6 text-primary" aria-hidden="true" />

          <Swiper
            modules={[Navigation]}
            onSwiper={(s) => { swiperRef.current = s; }}
            spaceBetween={40}
            slidesPerView={1}
          >
            {TESTIMONIALS.map((t) => (
              <SwiperSlide key={t.name}>
                <div className="flex flex-col items-center gap-6 pb-4 text-center">
                  <blockquote className="text-lg leading-relaxed text-foreground/80 sm:text-xl">
                    “{t.quote}”
                  </blockquote>
                  <figcaption className="flex flex-col">
                    <span className="font-heading text-base font-semibold text-foreground">
                      {t.name}
                    </span>
                    <span className="text-sm text-muted">
                      {t.role} · {t.company}
                    </span>
                  </figcaption>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="mt-8 flex items-center justify-center gap-6">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-foreground/20 text-foreground/60 transition hover:border-primary/60 hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-foreground/20 text-foreground/60 transition hover:border-primary/60 hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
