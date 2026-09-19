import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { useMotionPause } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Vídeo de fundo com formas de vidro azul (loop de 10s).
 * Só decodifica enquanto visível, respeita a pausa global de animações e
 * prefers-reduced-motion (fica na imagem de capa) e usa 720p no celular.
 */
export default function GlassVideo({ className }: { className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const inView = useInView(videoRef, { margin: "100px 0px" });
  const reduceMotion = useReducedMotion();
  const { paused } = useMotionPause();
  const [src] = useState(() =>
    window.matchMedia("(max-width: 767px)").matches ? "/videos/glass-720.mp4" : "/videos/glass-1080.mp4",
  );

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (inView && !paused && !reduceMotion) video.play().catch(() => {});
    else if (!video.paused) video.pause();
  }, [inView, paused, reduceMotion]);

  return (
    <video
      ref={videoRef}
      aria-hidden="true"
      className={cn("absolute inset-0 h-full w-full object-cover", className)}
      src={src}
      poster="/videos/glass-poster.webp"
      loop
      muted
      playsInline
      preload="metadata"
    />
  );
}
