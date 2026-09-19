import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Pause, Play } from "lucide-react";
import HeroVideo from "@/components/HeroVideo";
import { useMotionPause } from "@/lib/motion";

const ease = [0.16, 1, 0.3, 1] as const;
const areas = ["Sites", "Sistemas", "Automações", "Integrações"];

/** Hero cinematográfico: vídeo abstrato ao fundo, texto alinhado à esquerda como protagonista. */
export default function ShaderHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { paused, toggle } = useMotionPause();

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  // parallax muito leve: o vídeo desce devagar, o texto sobe e some
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const entrada = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease },
        };

  return (
    <section
      ref={sectionRef}
      aria-labelledby="hero-titulo"
      className="relative flex h-[100svh] min-h-[620px] flex-col overflow-hidden bg-ink-950"
    >
      <motion.div style={reduceMotion ? undefined : { y: videoY }} className="absolute inset-0">
        <HeroVideo className="scale-[1.04]" />
      </motion.div>

      {/* overlays: escuro à esquerda (texto), vídeo visível à direita; topo e base fecham no fundo */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,6,10,0.97)_0%,rgba(5,6,10,0.86)_34%,rgba(5,6,10,0.25)_70%,rgba(5,6,10,0.3)_100%)] max-md:bg-[linear-gradient(90deg,rgba(5,6,10,0.9)_0%,rgba(5,6,10,0.7)_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,6,10,0.85)_0%,rgba(5,6,10,0)_22%,rgba(5,6,10,0)_62%,rgba(5,6,10,1)_100%)]"
      />


      <motion.div
        style={reduceMotion ? undefined : { y: contentY, opacity: contentOpacity }}
        className="container-x relative z-10 mt-auto pb-16 md:pb-20 lg:pb-24"
      >
        <motion.h1
          id="hero-titulo"
          {...entrada(0.05)}
          className="max-w-[980px] text-[44px] font-medium leading-[0.98] tracking-[-0.045em] sm:text-6xl md:text-7xl lg:text-[104px]"
        >
          Sites e sistemas que <span className="text-[#aabdff]">movem negócios.</span>
        </motion.h1>

        <motion.p
          {...entrada(0.2)}
          className="mt-6 max-w-[520px] text-base leading-relaxed text-fog-300 md:mt-8 md:text-lg"
        >
          Desenvolvimento web sob medida para empresas que precisam de velocidade, automação e escala.
        </motion.p>

        <motion.div {...entrada(0.3)} className="mt-8 flex flex-col gap-3 sm:flex-row md:mt-10">
          <Link to="/contato" className="btn-primary">
            Solicitar orçamento
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <Link to="/portfolio" className="btn-ghost">
            Ver projetos
          </Link>
        </motion.div>

        <motion.div
          {...entrada(0.45)}
          className="mt-12 flex items-center justify-between gap-6 border-t border-white/[0.08] pt-4 max-md:pr-16 md:mt-16"
        >
          <p className="font-mono text-[13px] text-fog-400">
            {areas.join("  /  ")}
          </p>
          <button
            type="button"
            onClick={toggle}
            aria-pressed={paused}
            aria-label={paused ? "Retomar animações" : "Pausar animações"}
            className="flex h-9 w-9 shrink-0 items-center justify-center text-fog-500 transition-colors hover:text-fog-50"
          >
            {paused ? <Play size={12} aria-hidden="true" /> : <Pause size={12} aria-hidden="true" />}
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
