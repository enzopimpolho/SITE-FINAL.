import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

interface MotionPause {
  paused: boolean;
  toggle: () => void;
}

const MotionPauseContext = createContext<MotionPause>({ paused: false, toggle: () => {} });

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Global stop for looping motion (hero video, marquee, testimonial rotation) — WCAG 2.2.2 Pause, Stop, Hide.
export function MotionPauseProvider({ children }: { children: ReactNode }) {
  const [paused, setPaused] = useState(prefersReducedMotion);

  useEffect(() => {
    document.documentElement.dataset.motion = paused ? "paused" : "running";
  }, [paused]);

  const value = useMemo(() => ({ paused, toggle: () => setPaused((prev) => !prev) }), [paused]);

  return <MotionPauseContext.Provider value={value}>{children}</MotionPauseContext.Provider>;
}

export function useMotionPause() {
  return useContext(MotionPauseContext);
}
