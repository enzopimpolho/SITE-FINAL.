import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Reveal from "../components/Reveal";

interface Linha {
  titulo: string;
  texto: string;
  itens: string[];
}

// Estrutura de ficha técnica: número / área / o que resolve / o que construímos
const linhas: Linha[] = [
  {
    titulo: "Sistemas web",
    texto: "Plataformas sob medida para processos que precisam de mais controle.",
    itens: ["CRM", "Dashboards", "Painéis", "APIs"],
  },
  {
    titulo: "Sites & landing pages",
    texto: "Experiências rápidas, responsivas e desenvolvidas para conversão.",
    itens: ["Institucional", "Landing pages", "Catálogos", "Portais"],
  },
  {
    titulo: "Automações & integrações",
    texto: "Conectamos ferramentas e processos para reduzir trabalho manual.",
    itens: ["WhatsApp", "APIs", "Pagamentos", "Automações"],
  },
];

const colunas = "md:grid-cols-[64px_minmax(0,5fr)_minmax(0,4fr)_minmax(0,3fr)]";

export default function ServicesSection() {
  return (
    <section aria-labelledby="servicos-titulo" className="container-x section-y">
      <div className="grid gap-8 lg:grid-cols-12">
        <Reveal className="lg:col-span-9">
          <h2
            id="servicos-titulo"
            className="text-[34px] font-medium leading-[1.04] tracking-[-0.035em] md:text-5xl lg:text-[64px]"
          >
            Construímos produtos digitais
            <br className="hidden md:block" /> <span className="text-fog-500">do frontend ao backend.</span>
          </h2>
        </Reveal>
        <div className="flex lg:col-span-3 lg:items-end lg:justify-end">
          <Link to="/servicos" className="arrow-shift link-underline flex items-center gap-2 text-sm text-fog-300 hover:text-fog-50">
            Todos os serviços <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </div>

      {/* cabeçalho das colunas, só no desktop */}
      <div className={`mt-16 hidden gap-8 pb-4 font-mono text-[11px] text-fog-600 md:mt-24 md:grid ${colunas}`} aria-hidden="true">
        <span>#</span>
        <span>Área</span>
        <span>O que resolve</span>
        <span>O que construímos</span>
      </div>

      <Reveal>
      <ol className="mt-10 border-b border-white/[0.06] md:mt-0">
        {linhas.map((l, i) => (
          <li key={l.titulo}>
            <div className={`group grid gap-3 border-t border-white/[0.06] py-9 transition-colors duration-500 hover:border-white/[0.16] md:items-baseline md:gap-8 md:py-12 ${colunas}`}>
                <span className="font-mono text-xs text-fog-600 transition-colors duration-500 group-hover:text-fog-300">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-[28px] font-medium leading-tight tracking-[-0.03em] transition-transform duration-500 ease-out-expo group-hover:translate-x-1 md:text-[40px] motion-reduce:transform-none">{l.titulo}</h3>
                <p className="max-w-[360px] text-base leading-relaxed text-fog-400">{l.texto}</p>
                <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs uppercase tracking-[0.08em] text-fog-400 md:mt-0 md:flex-col md:gap-1.5">
                  {l.itens.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
          </li>
        ))}
      </ol>
      </Reveal>
    </section>
  );
}
