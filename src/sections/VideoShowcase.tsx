import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import AnimatedCounter from "@/components/AnimatedCounter";
import Reveal from "@/components/Reveal";
import { useMotionPause } from "@/lib/motion";

const stats = [
  { label: "projetos entregues", value: 120, suffix: "+" },
  { label: "anos de experiência", value: 8, suffix: "" },
  { label: "de satisfação", value: 98, suffix: "%" },
];

export default function VideoShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoSrc] = useState(() =>
    window.matchMedia("(max-width: 767px)").matches ? "/videos/hero-720.mp4" : "/videos/hero-1080.mp4"
  );
  const inView = useInView(sectionRef, { amount: 0.25 });
  const reduceMotion = useReducedMotion();
  const { paused } = useMotionPause();

  // Decoding the video is the heaviest thing on the page, so only run it while the section is visible.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (inView && !paused) video.play().catch(() => {});
    else if (!video.paused) video.pause();
  }, [inView, paused]);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const videoY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="apresentacao-titulo"
      className="relative flex min-h-[100svh] items-end overflow-hidden lg:min-h-[860px]"
    >
      <motion.video
        ref={videoRef}
        style={reduceMotion ? undefined : { y: videoY, scale: 1.25 }}
        className="absolute inset-0 h-full w-full object-cover object-[64%_center] will-change-transform"
        src={videoSrc}
        poster="/videos/hero-poster.webp"
        loop
        muted
        playsInline
        preload="metadata"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,8,12,0.55)_0%,rgba(7,8,12,0.55)_30%,rgba(7,8,12,0.92)_62%,#07080c_100%)] md:bg-[linear-gradient(90deg,rgba(7,8,12,0.95)_0%,rgba(7,8,12,0.8)_36%,rgba(7,8,12,0.2)_72%,rgba(7,8,12,0.4)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-ink-950 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 hidden h-80 bg-gradient-to-t from-ink-950 to-transparent md:block" />

      <div className="container-x relative flex w-full flex-col pb-24 pt-40 md:pb-12">
        <Reveal className="flex max-w-[960px] flex-col items-start gap-5 md:gap-7">
          <p className="label text-accent-ink">Sites e sistemas sob medida · São Paulo</p>
          <h2
            id="apresentacao-titulo"
            className="text-balance text-[40px] font-medium leading-[1.04] tracking-[-0.04em] md:text-6xl lg:text-7xl"
          >
            Projetamos e desenvolvemos sites, e-commerces e sistemas{" "}
            <span className="serif-em">sob medida.</span>
          </h2>
          <p className="max-w-[520px] text-base leading-relaxed text-fog-300 md:text-[19px]">
            Tecnologia moderna, prazos previsíveis e foco total em resultado.
          </p>
          <Link to="/portfolio" className="btn-ghost">
            Ver portfólio
            <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </Reveal>

        <Reveal delay={0.15} className="mt-10 border-t border-white/[0.12] pt-4 md:mt-16 md:pt-[22px]">
          <dl className="grid grid-cols-3 gap-3 md:flex md:items-baseline md:gap-14 md:pr-16">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col-reverse justify-end md:flex-row-reverse md:items-baseline md:gap-2.5"
              >
                <dt className="text-xs text-fog-400 md:text-[13px]">{stat.label}</dt>
                <dd className="text-[26px] font-medium tracking-[-0.03em] md:text-[30px]">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
