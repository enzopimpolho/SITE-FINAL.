import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Reveal from "../components/Reveal";

interface Area {
  id: string;
  titulo: string;
  texto: string;
  exemplos: string[];
}

const principal: Area = {
  id: "01",
  titulo: "Sistemas web",
  texto:
    "Plataformas sob medida para o processo da sua empresa: do cadastro ao relatório, com regras de negócio, usuários e dados sob controle.",
  exemplos: ["Dashboards", "CRM", "Painel administrativo", "Autenticação", "Banco de dados", "APIs"],
};

const secundarias: Area[] = [
  {
    id: "02",
    titulo: "Sites & landing pages",
    texto: "Páginas rápidas, bem escritas e pensadas para converter.",
    exemplos: ["Institucional", "Landing pages", "Catálogo", "Portfólio", "Páginas de conversão"],
  },
  {
    id: "03",
    titulo: "Automações & integrações",
    texto: "Menos trabalho manual entre as ferramentas que você já usa.",
    exemplos: ["WhatsApp", "APIs", "Workflows", "Pagamentos", "Ferramentas internas"],
  },
];

function Exemplos({ itens }: { itens: string[] }) {
  return (
    <ul className="flex flex-wrap gap-x-4 gap-y-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-fog-500">
      {itens.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export default function ServicesSection() {
  return (
    <section aria-labelledby="servicos-titulo" className="container-x section-y">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <Reveal>
          <p className="label mb-5">01 — Serviços</p>
          <h2
            id="servicos-titulo"
            className="max-w-[820px] text-[34px] font-medium leading-[1.04] tracking-[-0.035em] md:text-5xl lg:text-[64px]"
          >
            Construímos produtos digitais <span className="text-fog-500">do frontend ao backend.</span>
          </h2>
        </Reveal>
        <Link to="/servicos" className="arrow-shift link-underline flex shrink-0 items-center gap-2 self-start text-sm text-fog-300 hover:text-fog-50 md:self-end">
          Todos os serviços <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>

      <div className="mt-14 grid border-t border-white/[0.08] md:mt-20 lg:grid-cols-12">
        <Reveal className="group relative flex min-h-[380px] flex-col justify-between gap-10 overflow-hidden border-b border-white/[0.08] py-10 lg:col-span-7 lg:min-h-[520px] lg:border-b-0 lg:border-r lg:py-12 lg:pr-14">
          <div aria-hidden="true" className="grid-bg absolute inset-0 opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent_80%)]" />
          <div className="relative flex items-start justify-between">
            <span className="font-mono text-xs text-fog-600">{principal.id}</span>
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent-ink">Foco principal</span>
          </div>
          <div className="relative">
            <h3 className="text-4xl font-medium tracking-[-0.035em] md:text-6xl">{principal.titulo}</h3>
            <p className="mt-5 max-w-[480px] text-base leading-relaxed text-fog-400 md:text-lg">{principal.texto}</p>
            <div className="mt-8">
              <Exemplos itens={principal.exemplos} />
            </div>
          </div>
        </Reveal>

        <div className="flex flex-col lg:col-span-5">
          {secundarias.map((area, i) => (
            <Reveal
              key={area.id}
              delay={0.08 * (i + 1)}
              className={`flex flex-1 flex-col justify-between gap-8 py-10 lg:py-12 lg:pl-12 ${i === 0 ? "border-b border-white/[0.08]" : ""}`}
            >
              <span className="font-mono text-xs text-fog-600">{area.id}</span>
              <div>
                <h3 className="text-2xl font-medium tracking-[-0.03em] md:text-[32px]">{area.titulo}</h3>
                <p className="mt-3 max-w-[380px] text-[15px] leading-relaxed text-fog-400">{area.texto}</p>
                <div className="mt-6">
                  <Exemplos itens={area.exemplos} />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
