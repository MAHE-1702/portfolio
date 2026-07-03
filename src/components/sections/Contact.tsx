"use client";

import { useRef, useState } from "react";
import {
  motion,
  useAnimationControls,
  useSpring,
  useTransform,
} from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Mail,
  Phone,
  MessageCircle,
  Briefcase,
  GitBranch,
  Send,
  CheckCircle2,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MagneticButton } from "@/components/ui/MagneticButton";
import {
  EMAIL,
  PHONE,
  WHATSAPP,
  LINKEDIN_URL,
  GITHUB_URL,
} from "@/lib/constants";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Enter a valid email"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(20, "Message must be at least 20 characters"),
});

type FormValues = z.infer<typeof schema>;

const CONTACT_ROWS = [
  { icon: Mail, label: EMAIL, href: `mailto:${EMAIL}`, ariaLabel: "Email" },
  {
    icon: Phone,
    label: PHONE,
    href: `tel:${PHONE.replace(/\s+/g, "")}`,
    ariaLabel: "Phone",
  },
  { icon: MessageCircle, label: "Chat on WhatsApp", href: WHATSAPP, ariaLabel: "WhatsApp" },
  { icon: Briefcase, label: "linkedin.com/in/maheshwarana", href: LINKEDIN_URL, ariaLabel: "LinkedIn" },
  { icon: GitBranch, label: "github.com/MAHE-1702", href: GITHUB_URL, ariaLabel: "GitHub" },
] as const;

// Gentle tilt — max ~6deg (softer than the standard TiltCard ±12deg)
const SPRING = { stiffness: 150, damping: 22, mass: 0.6 };
const MAX_TILT = 6;

function GentleTilt({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const rawX = useSpring(0, SPRING);
  const rawY = useSpring(0, SPRING);
  const rotateX = useTransform(rawY, [-1, 1], [MAX_TILT, -MAX_TILT]);
  const rotateY = useTransform(rawX, [-1, 1], [-MAX_TILT, MAX_TILT]);

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    rawX.set(((e.clientX - rect.left) / rect.width - 0.5) * 2);
    rawY.set(((e.clientY - rect.top) / rect.height - 0.5) * 2);
  }

  function onMouseLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: "1000px" }}
    >
      {children}
    </motion.div>
  );
}

export function Contact() {
  const controls = useAnimationControls();
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  function onValid(data: FormValues) {
    // TODO: wire up real email service (Resend / EmailJS / Next.js API route)
    console.log("Contact form submission:", data);
    setSent(true);
  }

  function onInvalid() {
    controls.start({
      x: [0, -8, 8, -4, 4, 0],
      transition: { duration: 0.4 },
    });
  }

  return (
    <section
      id="contact"
      className="relative min-h-screen bg-background px-6 py-24 sm:px-8"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute right-0 top-1/3 h-96 w-96 rounded-full bg-primary/8 blur-[150px]" />

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start">
        {/* Left column — info */}
        <div>
          <SectionHeading title="Get In Touch" align="left" />

          <p className="mb-8 max-w-md text-base leading-relaxed text-foreground/70">
            Have a project in mind or want to collaborate? I&apos;d love to hear
            from you. Drop a message or reach out directly.
          </p>

          <ul className="flex flex-col gap-3">
            {CONTACT_ROWS.map(({ icon: Icon, label, href, ariaLabel }) => {
              const external = href.startsWith("http");
              return (
                <li key={ariaLabel}>
                  <a
                    href={href}
                    aria-label={ariaLabel}
                    {...(external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="group flex items-center gap-3 rounded-xl border border-primary/15 bg-background/40 px-4 py-3 text-sm text-foreground/80 backdrop-blur-sm transition duration-300 hover:translate-x-1 hover:border-primary/40 hover:text-primary"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                      <Icon size={18} />
                    </span>
                    <span className="truncate">{label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Right column — form */}
        <GentleTilt>
          <motion.div
            animate={controls}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="glass-card p-6 sm:p-8"
          >
            {sent ? (
              <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
                <CheckCircle2 size={56} className="text-green-400" />
                <p className="font-heading text-lg font-bold text-foreground">
                  Message captured — I&apos;ll get back to you soon! 🚀
                </p>
                <p className="text-sm text-muted">
                  Thanks for reaching out.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onValid, onInvalid)}
                noValidate
                className="flex flex-col gap-5"
              >
                <div>
                  <label htmlFor="name" className="sr-only">
                    Your name
                  </label>
                  <input
                    id="name"
                    {...register("name")}
                    placeholder="Your name"
                    className="w-full rounded-xl border border-primary/15 bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted/50 backdrop-blur-sm transition focus:border-primary/50 focus:outline-none"
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-400">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="sr-only">
                    Your email
                  </label>
                  <input
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-primary/15 bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted/50 backdrop-blur-sm transition focus:border-primary/50 focus:outline-none"
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-400">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="subject" className="sr-only">
                    Subject
                  </label>
                  <input
                    id="subject"
                    {...register("subject")}
                    placeholder="Subject"
                    className="w-full rounded-xl border border-primary/15 bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted/50 backdrop-blur-sm transition focus:border-primary/50 focus:outline-none"
                  />
                  {errors.subject && (
                    <p className="mt-1 text-xs text-red-400">
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="sr-only">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    {...register("message")}
                    placeholder="Tell me about your project..."
                    className="w-full resize-none rounded-xl border border-primary/15 bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted/50 backdrop-blur-sm transition focus:border-primary/50 focus:outline-none"
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-red-400">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <div className="mt-1 [&>div]:w-full [&_button]:w-full [&_span]:w-full">
                  <MagneticButton
                    variant="primary"
                    onClick={handleSubmit(onValid, onInvalid)}
                  >
                    <span className="flex items-center justify-center gap-2">
                      <Send size={16} />
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </span>
                  </MagneticButton>
                </div>
              </form>
            )}
          </motion.div>
        </GentleTilt>
      </div>
    </section>
  );
}
