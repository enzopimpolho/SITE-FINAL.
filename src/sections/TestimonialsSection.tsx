import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import Reveal from "../components/Reveal";
import { testimonials } from "../data/testimonials";
import { useMotionPause } from "../lib/motion";

const AUTO_ADVANCE_MS = 7000;
const total = testimonials.length;

const controlClass =
  "flex h-12 w-12 items-center justify-center rounded-full border border-white/[0.18] transition-colors hover:border-accent-ink hover:text-accent-ink";

export default function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  const [stopped, setStopped] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const { paused: motionPaused } = useMotionPause();

  const rotating = !stopped && !hovered && !focused && !motionPaused;

  useEffect(() => {
    if (!rotating) return;
    const timer = window.setInterval(() => setIndex((prev) => (prev + 1) % total), AUTO_ADVANCE_MS);
    return () => window.clearInterval(timer);
  }, [rotating, index]);

  // Manual navigation ends auto-rotation for good (WAI carousel pattern).
  const go = (step: number) => {
    setStopped(true);
    setIndex((prev) => (prev + step + total) % total);
  };
  const testimonial = testimonials[index];

  return (
    <section
      id="depoimentos"
      aria-labelledby="depoimentos-titulo"
      className="bg-ink-900"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
      }}
    >
      <div className="container-x section-y flex flex-col gap-7 lg:items-center lg:gap-10 lg:text-center">
        <Reveal>
          <h2 id="depoimentos-titulo" className="label">
            (05) — Depoimentos
          </h2>
        </Reveal>

        <div
          aria-live={rotating ? "off" : "polite"}
          className="flex min-h-[340px] items-start lg:min-h-[340px] lg:w-full lg:max-w-[1040px] lg:items-center lg:justify-center"
        >
          <AnimatePresence mode="wait">
            <motion.figure
              key={testimonial.name}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
              exit={{ opacity: 0, y: -12, transition: { duration: 0.45, ease: [0.7, 0, 0.84, 0] } }}
              className="flex flex-col gap-7 lg:items-center lg:gap-10"
            >
              <blockquote className="text-balance font-serif text-[29px] leading-[1.22] text-fog-50 lg:text-[46px] lg:leading-[1.18]">
                “{testimonial.quote}”
              </blockquote>
              <figcaption className="flex items-center gap-3.5 text-left">
                <span
                  aria-hidden="true"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-ink/15 text-sm font-semibold text-accent-ink"
                >
                  {testimonial.initials}
                </span>
                <span className="flex flex-col gap-0.5">
                  <span className="text-base font-medium">{testimonial.name}</span>
                  <span className="text-sm text-fog-400">{testimonial.role}</span>
                </span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-3">
          <button type="button" onClick={() => go(-1)} aria-label="Depoimento anterior" className={controlClass}>
            <ChevronLeft size={18} aria-hidden="true" />
          </button>
          <span className="min-w-16 text-center font-mono text-[13px] text-fog-400">
            <span className="sr-only">Depoimento </span>
            {String(index + 1).padStart(2, "0")}
            <span aria-hidden="true"> / </span>
            <span className="sr-only"> de </span>
            {String(total).padStart(2, "0")}
          </span>
          <button type="button" onClick={() => go(1)} aria-label="Próximo depoimento" className={controlClass}>
            <ChevronRight size={18} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => setStopped((prev) => !prev)}
            aria-label={stopped ? "Retomar troca automática" : "Pausar troca automática"}
            className={`${controlClass} ml-2`}
          >
            {stopped ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}
          </button>
        </div>
      </div>
    </section>
  );
}
