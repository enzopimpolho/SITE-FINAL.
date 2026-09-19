import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight, Pause, Play, Sparkles } from "lucide-react";
import GlassVideo from "@/components/GlassVideo";
import SplitText from "@/components/SplitText";
import { useMotionPause } from "@/lib/motion";

const ease = [0.16, 1, 0.3, 1] as const;

export default function ShaderHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { paused, toggle } = useMotionPause();

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative flex h-[100svh] min-h-[640px] items-center overflow-hidden bg-[radial-gradient(90%_70%_at_45%_65%,#1b2f9e_0%,#0c1446_45%,#07080c_85%)]"
    >
      <GlassVideo />
      {/* escurece o vídeo para o título continuar legível sobre os reflexos claros */}
      <div aria-hidden="true" className="absolute inset-0 bg-ink-950/55" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(55%_45%_at_50%_50%,rgba(7,8,12,0.6)_0%,rgba(7,8,12,0)_100%)]"
      />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink-950 to-transparent" />

      <motion.div
        style={reduceMotion ? undefined : { y: contentY, opacity: contentOpacity }}
        className="container-x relative flex flex-col items-center gap-6 pt-16 text-center md:gap-8"
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease }}
          className="flex items-center gap-2 rounded-full border border-accent-ink/30 bg-ink-950/50 px-4 py-2 text-xs text-fog-100 md:text-sm"
        >
          <Sparkles size={14} className="text-accent-ink" aria-hidden="true" />
          Sites e sistemas sob medida · São Paulo
        </motion.p>

        <SplitText
          as="h1"
          delay={0.15}
          className="max-w-[1080px] text-balance text-[44px] font-medium leading-[1.02] tracking-[-0.04em] md:text-7xl lg:text-[96px] lg:leading-[0.98]"
          text="Sites e sistemas web de alta performance para o seu negócio."
          highlight={(word) =>
            ["alta", "performance"].includes(word) ? (
              <span className="bg-gradient-to-r from-accent-ink via-[#9fb4ff] to-[#67e8f9] bg-clip-text font-serif text-[1.12em] font-normal italic tracking-[-0.01em] text-transparent">
                {word}
              </span>
            ) : (
              word
            )
          }
        />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7, ease }}
          className="max-w-[560px] text-base leading-relaxed text-fog-200 md:text-lg"
        >
          Sites, sistemas web e aplicações digitais sob medida para empresas que querem crescer com
          tecnologia.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.85, ease }}
          className="flex w-full flex-col gap-2.5 sm:w-auto sm:flex-row sm:gap-3"
        >
          <Link to="/contato" className="btn-primary">
            Solicitar orçamento
            <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
          <Link to="/portfolio" className="btn-ghost">
            Ver portfólio
          </Link>
        </motion.div>
      </motion.div>

      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 items-center gap-2.5 font-mono text-xs uppercase tracking-[0.14em] text-fog-400 md:flex"
      >
        <ArrowDown size={14} aria-hidden="true" />
        Role para explorar
      </motion.span>

      <button
        type="button"
        onClick={toggle}
        aria-label={paused ? "Retomar animações" : "Pausar animações"}
        className="absolute right-4 top-[92px] z-10 flex h-11 items-center gap-2 rounded-full border border-white/20 bg-ink-950/70 px-3.5 text-xs font-medium text-fog-100 transition-colors hover:border-accent-ink hover:text-accent-ink md:right-10 md:top-28 lg:right-20"
      >
        {paused ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
        <span aria-hidden="true" className="hidden md:inline">
          {paused ? "Retomar animações" : "Pausar animações"}
        </span>
      </button>
    </section>
  );
}
