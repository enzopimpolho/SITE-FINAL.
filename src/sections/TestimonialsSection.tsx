import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Reveal from "../components/Reveal";
import { testimonials } from "../data/testimonials";

const AUTO_ADVANCE_MS = 7000;
const total = testimonials.length;

export default function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => setIndex((prev) => (prev + 1) % total), AUTO_ADVANCE_MS);
    return () => window.clearInterval(timer);
  }, [paused, index]);

  const go = (step: number) => setIndex((prev) => (prev + step + total) % total);
  const testimonial = testimonials[index];

  return (
    <section
      id="depoimentos"
      className="bg-ink-900"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="container-x section-y flex flex-col gap-7 lg:items-center lg:gap-10 lg:text-center">
        <Reveal>
          <span className="label">(05) — Depoimentos</span>
        </Reveal>

        <div className="flex min-h-[340px] items-start lg:min-h-[340px] lg:w-full lg:max-w-[1040px] lg:items-center lg:justify-center">
          <AnimatePresence mode="wait">
            <motion.figure
              key={testimonial.name}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-7 lg:items-center lg:gap-10"
            >
              <blockquote className="text-balance font-serif text-[29px] leading-[1.22] text-fog-50 lg:text-[46px] lg:leading-[1.18]">
                “{testimonial.quote}”
              </blockquote>
              <figcaption className="flex items-center gap-3.5 text-left">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-ink/15 text-sm font-semibold text-accent-ink">
                  {testimonial.initials}
                </span>
                <span className="flex flex-col gap-0.5">
                  <span className="text-[15px] font-medium lg:text-base">{testimonial.name}</span>
                  <span className="text-[13px] text-fog-400 lg:text-sm">{testimonial.role}</span>
                </span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-5">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Depoimento anterior"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/[0.18] transition-colors hover:border-accent-ink hover:text-accent-ink"
          >
            <ChevronLeft size={18} />
          </button>
          <span className="min-w-16 text-center font-mono text-[13px] text-fog-400" aria-live="polite">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Próximo depoimento"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/[0.18] transition-colors hover:border-accent-ink hover:text-accent-ink"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
