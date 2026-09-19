import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Reveal from "../components/Reveal";
import { projects, type Project } from "../data/projects";

// Um de cada tipo: sistema, e-commerce e site de serviço
const DESTAQUES = ["gestao-pro", "urban-style", "bella-italia"];

function CaseStudy({ projeto, numero, invertido }: { projeto: Project; numero: number; invertido: boolean }) {
  return (
    <Reveal>
      <Link
        to={`/projetos/${projeto.slug}`}
        className="group grid gap-8 border-t border-white/[0.08] pt-8 md:pt-10 lg:grid-cols-12 lg:gap-12"
      >
        <div className={`lg:col-span-7 ${invertido ? "lg:order-2" : ""}`}>
          <div className="overflow-hidden rounded-sm border border-white/[0.08] bg-ink-900">
            <img
              src={projeto.image}
              alt={`Tela do projeto ${projeto.name}`}
              width={projeto.imageWidth}
              height={projeto.imageHeight}
              loading="lazy"
              decoding="async"
              className="aspect-[4/3] w-full object-cover object-top brightness-[0.92] transition duration-700 ease-out-expo group-hover:scale-[1.01] group-hover:brightness-100"
            />
          </div>
        </div>

        <div className={`flex flex-col justify-between gap-8 lg:col-span-5 ${invertido ? "lg:order-1" : ""}`}>
          <div className="flex justify-between font-mono text-[11px] uppercase tracking-[0.16em] text-fog-500">
            <span>Project / {String(numero).padStart(3, "0")}</span>
            <span>{projeto.year}</span>
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent-ink">{projeto.category}</p>
            <h3 className="mt-3 text-4xl font-medium tracking-[-0.04em] md:text-[56px] md:leading-none">{projeto.name}</h3>
            <p className="mt-5 max-w-[420px] text-base leading-relaxed text-fog-400 md:text-lg">{projeto.description}</p>
          </div>
          <div className="flex items-end justify-between gap-6 border-t border-white/[0.08] pt-5">
            <p className="font-mono text-[11px] uppercase leading-relaxed tracking-[0.12em] text-fog-500">
              {projeto.stack.join(" · ")}
            </p>
            <span className="arrow-shift flex shrink-0 items-center gap-2 text-sm text-fog-200 group-hover:text-fog-50">
              Ver projeto <ArrowUpRight size={15} aria-hidden="true" />
            </span>
          </div>
        </div>
      </Link>
    </Reveal>
  );
}

/** Projetos grandes, em formato de estudo de caso (home). */
export default function SelectedProjects() {
  const lista = DESTAQUES.map((slug) => projects.find((p) => p.slug === slug)).filter(
    (p): p is Project => Boolean(p),
  );

  return (
    <section id="projetos" aria-labelledby="projetos-titulo" className="container-x section-y">
      <div className="mb-14 flex flex-col gap-6 md:mb-20 md:flex-row md:items-end md:justify-between">
        <Reveal>
          <p className="label mb-5">03 — Projetos</p>
          <h2 id="projetos-titulo" className="text-[34px] font-medium leading-[1.04] tracking-[-0.035em] md:text-5xl lg:text-[64px]">
            Projetos selecionados.
          </h2>
          <p className="mt-5 max-w-[460px] text-base leading-relaxed text-fog-400">
            Sites e sistemas-conceito desenhados e desenvolvidos pela Nextgen, para segmentos diferentes.
          </p>
        </Reveal>
        <Link to="/portfolio" className="arrow-shift link-underline flex shrink-0 items-center gap-2 self-start text-sm text-fog-300 hover:text-fog-50 md:self-end">
          Todos os projetos ({projects.length}) <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>

      <div className="flex flex-col gap-20 md:gap-28">
        {lista.map((p, i) => (
          <CaseStudy key={p.slug} projeto={p} numero={projects.indexOf(p) + 1} invertido={i % 2 === 1} />
        ))}
      </div>
    </section>
  );
}
