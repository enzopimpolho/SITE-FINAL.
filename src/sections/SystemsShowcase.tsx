import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Reveal from "../components/Reveal";
import { useMotionPause } from "@/lib/motion";

export const DEMO_ERP = "https://nextgen-erp-eosin.vercel.app/demo";

// Telas reais do Nextgen ERP (demo pública, dados fictícios)
const TELAS = [
  { src: "/sistemas/erp-estoque.webp", nome: "Estoque" },
  { src: "/sistemas/erp-pedidos.webp", nome: "Pedidos" },
  { src: "/sistemas/erp-financeiro.webp", nome: "Financeiro" },
];

const tipos = ["Dashboards", "CRMs", "Portais", "Painéis internos", "Integrações", "Ferramentas sob medida"];

export default function SystemsShowcase({ label = "04 — Sistemas" }: { label?: string }) {
  const [atual, setAtual] = useState(0);
  const reduceMotion = useReducedMotion();
  const { paused } = useMotionPause();

  // troca lenta entre telas reais; parada com movimento reduzido ou pausa global
  useEffect(() => {
    if (reduceMotion || paused) return;
    const t = setInterval(() => setAtual((i) => (i + 1) % TELAS.length), 5000);
    return () => clearInterval(t);
  }, [reduceMotion, paused]);

  return (
    <section aria-labelledby="sistemas-titulo" className="section-y overflow-hidden">
      <div className="container-x grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-7 lg:-ml-4 xl:-ml-12">
          <figure>
            <div className="relative aspect-[1600/964] overflow-hidden rounded-md border border-white/[0.1] bg-ink-900 shadow-[0_40px_120px_-40px_rgba(47,91,255,0.25)]">
              <AnimatePresence initial={false}>
                <motion.img
                  key={TELAS[atual]!.src}
                  src={TELAS[atual]!.src}
                  alt={`Tela de ${TELAS[atual]!.nome} do Nextgen ERP`}
                  width={1600}
                  height={964}
                  loading="lazy"
                  decoding="async"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.2 }}
                  className="absolute inset-0 h-full w-full object-cover object-left-top"
                />
              </AnimatePresence>
            </div>
            <figcaption className="mt-4 flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] uppercase tracking-[0.16em] text-fog-500">
              <span>Nextgen ERP — {TELAS[atual]!.nome}</span>
              <span className="flex gap-2" aria-hidden="true">
                {TELAS.map((t, i) => (
                  <span key={t.nome} className={`h-px w-6 transition-colors duration-500 ${i === atual ? "bg-accent-ink" : "bg-white/15"}`} />
                ))}
              </span>
            </figcaption>
          </figure>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-5">
          <p className="label mb-5">{label}</p>
          <h2 id="sistemas-titulo" className="text-[34px] font-medium leading-[1.04] tracking-[-0.035em] md:text-5xl">
            Sistemas feitos <span className="text-fog-500">para o seu processo.</span>
          </h2>
          <p className="mt-5 max-w-[440px] text-base leading-relaxed text-fog-400">
            Não fazemos só landing pages. O Nextgen ERP — pedidos, estoque, logística e financeiro em um só
            sistema — é um exemplo do que construímos.
          </p>
          <ul className="mt-8 grid grid-cols-2 border-t border-white/[0.08]">
            {tipos.map((t, i) => (
              <li key={t} className="flex items-baseline gap-3 border-b border-white/[0.08] py-3 text-[15px] text-fog-200">
                <span className="font-mono text-[10px] text-fog-600">{String(i + 1).padStart(2, "0")}</span>
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
            <a href={DEMO_ERP} target="_blank" rel="noopener noreferrer" className="arrow-shift link-underline flex items-center gap-2 text-sm text-fog-50">
              Abrir demonstração do ERP <ArrowUpRight size={14} aria-hidden="true" />
              <span className="sr-only">(abre em nova aba)</span>
            </a>
            <Link to="/sistemas" className="arrow-shift link-underline flex items-center gap-2 text-sm text-fog-400 hover:text-fog-50">
              Sobre os sistemas <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
