import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { processSteps } from "../data/process";

export default function ProcessSteps() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 45%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 60, damping: 22 });
  const [reached, setReached] = useState(1);

  useEffect(() => {
    if (reduceMotion) {
      setReached(processSteps.length);
      return;
    }
    const update = (value: number) =>
      setReached(processSteps.filter((_, i) => value >= i / processSteps.length).length);
    update(progress.get());
    return progress.on("change", update);
  }, [progress, reduceMotion]);

  const fill = reduceMotion ? 1 : progress;

  return (
    <div ref={ref} className="relative pl-11 lg:pl-0">
      <div
        aria-hidden="true"
        className="absolute bottom-3 left-[11px] top-3 w-px bg-white/[0.12] lg:bottom-auto lg:left-0 lg:right-0 lg:top-[11px] lg:h-px lg:w-auto"
      />
      <motion.div
        aria-hidden="true"
        style={{ scaleY: fill }}
        className="absolute bottom-3 left-[10px] top-3 w-[3px] origin-top rounded-full bg-accent-ink shadow-[0_0_16px_rgba(142,162,255,0.55)] lg:hidden"
      />
      <motion.div
        aria-hidden="true"
        style={{ scaleX: fill }}
        className="absolute left-0 right-0 top-[10px] hidden h-[3px] origin-left rounded-full bg-accent-ink shadow-[0_0_18px_rgba(142,162,255,0.55)] lg:block"
      />

      <ol className="relative grid gap-8 lg:grid-cols-4 lg:gap-6">
        {processSteps.map((step, index) => {
          const on = index < reached;
          return (
            <li key={step.title} className="relative flex flex-col gap-1.5 lg:gap-3.5">
              <span
                aria-hidden="true"
                className={`absolute -left-11 top-0.5 h-6 w-6 rounded-full shadow-[0_0_0_6px_#07080c] transition-colors duration-500 lg:static ${
                  on ? "bg-accent-ink" : "border border-white/30 bg-ink-950"
                }`}
              />
              <div className="flex items-baseline gap-3 lg:mt-[18px] lg:flex-col lg:gap-3.5">
                <span
                  aria-hidden="true"
                  className={`font-serif text-[28px] italic leading-none transition-colors duration-500 lg:text-[44px] ${
                    on ? "text-accent-ink" : "text-fog-500"
                  }`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-[22px] font-medium tracking-[-0.02em] lg:text-2xl">{step.title}</h3>
              </div>
              <p className="text-base leading-relaxed text-fog-400 lg:text-[15.5px]">{step.description}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
