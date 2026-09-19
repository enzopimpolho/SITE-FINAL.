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

const tipos = ["Dashboards", "CRMs", "Painéis administrativos", "Portais", "Integrações", "Ferramentas internas"];
// o que existe de fato por trás do Nextgen ERP
const camadas = ["Web application", "Database", "Authentication", "API", "Analytics"];

export default function SystemsShowcase({ comLinkPagina = true }: { comLinkPagina?: boolean }) {
  const [atual, setAtual] = useState(0);
  const reduceMotion = useReducedMotion();
  const { paused } = useMotionPause();

  // troca lenta entre telas reais; parada com movimento reduzido ou pausa global
  useEffect(() => {
    if (reduceMotion || paused) return;
    const t = setInterval(() => setAtual((i) => (i + 1) % TELAS.length), 6000);
    return () => clearInterval(t);
  }, [reduceMotion, paused]);

  const tela = TELAS[atual]!;

  return (
    <section aria-labelledby="sistemas-titulo" className="section-y">
      <div className="container-x grid gap-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-6">
          <h2 id="sistemas-titulo" className="text-[34px] font-medium leading-[1.04] tracking-[-0.035em] md:text-5xl lg:text-[64px]">
            Sistemas feitos
            <br /> <span className="text-fog-500">para o seu processo.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.08} className="lg:col-span-5 lg:col-start-8 lg:self-end">
          <p className="max-w-[440px] text-base leading-relaxed text-fog-400">
            Não fazemos só landing pages. O Nextgen ERP — pedidos, estoque, logística e financeiro em um só
            sistema — é um exemplo do que construímos.
          </p>
          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[15px] text-fog-200">
            {tipos.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </Reveal>
      </div>

      {/* o dashboard é o protagonista: largura total do container */}
      <Reveal className="container-x mt-14 md:mt-20">
        <figure>
          <div className="relative aspect-[4/5] overflow-hidden rounded-md border border-white/[0.1] bg-ink-900 sm:aspect-[1600/964]">
            <AnimatePresence initial={false}>
              <motion.img
                key={tela.src}
                src={tela.src}
                alt={`Tela de ${tela.nome} do Nextgen ERP`}
                width={1600}
                height={964}
                loading="lazy"
                decoding="async"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 h-full w-full object-cover object-left-top"
              />
            </AnimatePresence>
          </div>
          <figcaption className="mt-4 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-fog-500">
            <span>
              Nextgen ERP — {tela.nome}
              <span className="text-fog-600"> · dados fictícios</span>
            </span>
            <span className="flex gap-1.5">
              {TELAS.map((t, i) => (
                <button
                  key={t.nome}
                  type="button"
                  onClick={() => setAtual(i)}
                  aria-label={`Mostrar tela de ${t.nome}`}
                  aria-pressed={i === atual}
                  className="flex h-6 items-center"
                >
                  <span className={`block h-px w-7 transition-colors duration-500 ${i === atual ? "bg-fog-50" : "bg-white/20"}`} />
                </button>
              ))}
            </span>
          </figcaption>
        </figure>
      </Reveal>

      <div className="container-x mt-10 flex flex-col gap-6 border-t border-white/[0.08] pt-6 md:flex-row md:items-center md:justify-between">
        <ul className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-[0.1em] text-fog-500">
          {camadas.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-x-6 gap-y-3">
          <a href={DEMO_ERP} target="_blank" rel="noopener noreferrer" className="arrow-shift link-underline flex items-center gap-2 text-sm text-fog-50">
            Abrir demonstração <ArrowUpRight size={14} aria-hidden="true" />
            <span className="sr-only">(abre em nova aba)</span>
          </a>
          {comLinkPagina && (
            <Link to="/sistemas" className="arrow-shift link-underline flex items-center gap-2 text-sm text-fog-400 hover:text-fog-50">
              Sobre os sistemas <ArrowRight size={14} aria-hidden="true" />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
