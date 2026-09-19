import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { useMotionPause } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Vídeo abstrato do hero (/public/hero-bg.mp4, loop de 10s).
 * - 720p em telas pequenas; 1080p no desktop
 * - só decodifica enquanto visível; pausa com o botão global de animações
 * - prefers-reduced-motion ou falha de carregamento: fica na imagem estática
 */
export default function HeroVideo({ className }: { className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const inView = useInView(videoRef, { margin: "100px 0px" });
  const reduceMotion = useReducedMotion();
  const { paused } = useMotionPause();
  const [falhou, setFalhou] = useState(false);
  const [src] = useState(() =>
    window.matchMedia("(max-width: 767px)").matches ? "/hero-bg-720.mp4" : "/hero-bg.mp4",
  );
  const estatico = reduceMotion || falhou;

  useEffect(() => {
    const video = videoRef.current;
    if (!video || estatico) return;
    if (inView && !paused) video.play().catch(() => {});
    else if (!video.paused) video.pause();
  }, [inView, paused, estatico]);

  return (
    <div aria-hidden="true" className={cn("absolute inset-0 bg-ink-950", className)}>
      {/* fallback estático: aparece enquanto o vídeo carrega, se falhar ou com movimento reduzido */}
      <img
        src="/hero-bg.webp"
        alt=""
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {!estatico && (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src={src}
          poster="/hero-bg.webp"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onError={() => setFalhou(true)}
        />
      )}
    </div>
  );
}
