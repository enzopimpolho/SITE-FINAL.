import Lenis from "lenis";

let lenis: Lenis | null = null;

export function startSmoothScroll() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {};

  lenis = new Lenis({
    lerp: 0.07,
    wheelMultiplier: 0.9,
    touchMultiplier: 1.4,
  });

  let frame = 0;
  const loop = (time: number) => {
    lenis?.raf(time);
    frame = requestAnimationFrame(loop);
  };
  frame = requestAnimationFrame(loop);

  return () => {
    cancelAnimationFrame(frame);
    lenis?.destroy();
    lenis = null;
  };
}

export function scrollToTop() {
  if (lenis) lenis.scrollTo(0, { immediate: true });
  else window.scrollTo(0, 0);
}
