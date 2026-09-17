import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import SplitText from "../components/SplitText";
import AnimatedCounter from "../components/AnimatedCounter";

const stats = [
  { label: "projetos entregues", value: 120, suffix: "+" },
  { label: "anos de experiência", value: 8, suffix: "" },
  { label: "de satisfação", value: 98, suffix: "%" },
];

const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoSrc] = useState(() =>
    window.matchMedia("(max-width: 767px)").matches ? "/videos/hero-720.mp4" : "/videos/hero-1080.mp4"
  );
  const inView = useInView(sectionRef);
  const reduceMotion = useReducedMotion();

  // Decoding the video is the heaviest thing on the page, so only run it while the hero is visible.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (inView && !reduceMotion) video.play().catch(() => {});
    else if (!video.paused) video.pause();
  }, [inView, reduceMotion]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={sectionRef} className="relative h-[100svh] min-h-[720px] overflow-hidden lg:min-h-[860px]">
      <motion.video
        ref={videoRef}
        style={{ y: videoY, scale: 1.1 }}
        className="absolute inset-0 h-full w-full object-cover object-[64%_center] will-change-transform"
        src={videoSrc}
        poster="/videos/hero-poster.jpg"
        autoPlay={!reduceMotion}
        loop
        muted
        playsInline
        preload="metadata"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,8,12,0.55)_0%,rgba(7,8,12,0.55)_30%,rgba(7,8,12,0.92)_62%,#07080c_100%)] md:bg-[linear-gradient(90deg,rgba(7,8,12,0.95)_0%,rgba(7,8,12,0.8)_36%,rgba(7,8,12,0.2)_72%,rgba(7,8,12,0.4)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 hidden h-80 bg-gradient-to-t from-ink-950 to-transparent md:block" />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="container-x relative flex h-full flex-col justify-end pb-24 md:pb-12"
      >
        <div className="flex max-w-[1060px] flex-col items-start gap-4 md:gap-7">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease }}
            className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.16em] text-accent-ink md:text-xs"
          >
            <span className="h-[7px] w-[7px] rounded-full bg-accent-ink" />
            <span className="hidden sm:inline">Sites e sistemas</span> sob medida · São Paulo
          </motion.span>

          <SplitText
            as="h1"
            delay={0.15}
            className="text-[44px] font-medium leading-[1.02] tracking-[-0.04em] md:text-[64px] lg:text-[80px] lg:leading-none"
            text="Sites e sistemas web de alta performance para o seu negócio."
            highlight={(word) =>
              ["alta", "performance"].includes(word) ? <span className="serif-em">{word}</span> : word
            }
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7, ease }}
            className="max-w-[520px] text-base leading-relaxed text-fog-300 md:text-[19px]"
          >
            A Nextgen projeta e desenvolve sites institucionais, e-commerces e sistemas sob medida
            com tecnologia moderna, prazos previsíveis e foco total em resultado.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.85, ease }}
            className="flex w-full flex-col gap-2.5 sm:w-auto sm:flex-row sm:gap-3"
          >
            <Link to="/contato" className="btn-primary">
              Solicitar orçamento
              <ArrowUpRight size={16} />
            </Link>
            <Link to="/portfolio" className="btn-ghost">
              Ver portfólio
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.1 }}
          className="mt-8 flex items-end justify-between border-t border-white/[0.12] pt-4 md:mt-16 md:pt-[22px]"
        >
          <span className="hidden items-center gap-2.5 font-mono text-xs uppercase tracking-[0.14em] text-fog-400 md:flex">
            <ArrowDown size={14} />
            Role para explorar
          </span>
          <dl className="grid w-full grid-cols-3 gap-3 md:flex md:w-auto md:items-baseline md:gap-14 md:pr-16">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col md:flex-row md:items-baseline md:gap-2.5">
                <dt className="text-[26px] font-medium tracking-[-0.03em] md:text-[30px]">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </dt>
                <dd className="text-xs text-fog-400 md:text-[13px]">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </motion.div>
    </section>
  );
}
