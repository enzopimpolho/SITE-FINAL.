import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Reveal from "../components/Reveal";
import { projects, type Project } from "../data/projects";

// Um de cada tipo: sistema, e-commerce e site
const DESTAQUES = ["gestao-pro", "urban-style", "bella-italia"];

type Composicao = "imagem-esquerda" | "imagem-direita" | "largura-total";
const COMPOSICOES: Composicao[] = ["imagem-esquerda", "imagem-direita", "largura-total"];

function Imagem({ p, aspecto }: { p: Project; aspecto: string }) {
  return (
    <div className="overflow-hidden rounded-[4px] border border-white/[0.08] bg-ink-900">
      <img
        src={p.image}
        alt={`Tela do projeto ${p.name}`}
        width={p.imageWidth}
        height={p.imageHeight}
        loading="lazy"
        decoding="async"
        className={`${aspecto} w-full object-cover object-top brightness-[0.94] transition-[transform,filter] duration-700 ease-out-expo group-hover:scale-[1.01] group-hover:brightness-100 motion-reduce:transform-none`}
      />
    </div>
  );
}

/** Tecnologias sem quebrar no meio do nome (ex.: Tailwind CSS). */
function Stack({ itens }: { itens: string[] }) {
  return (
    <>
      {itens.map((t, i) => (
        <span key={t} className="whitespace-nowrap">
          {t}
          {i < itens.length - 1 ? " · " : ""}
        </span>
      ))}
    </>
  );
}

function Info({ p }: { p: Project }) {
  return (
    <>
      <h3 className="text-4xl font-medium tracking-[-0.04em] transition-colors duration-500 group-hover:text-white md:text-5xl lg:text-4xl xl:text-5xl">
        {p.name}
      </h3>
      <p className="mt-4 max-w-[380px] text-base leading-relaxed text-fog-400">{p.description}</p>
      <p className="mt-6 font-mono text-[11px] uppercase leading-relaxed tracking-[0.08em] text-fog-500">
        {p.kind} / {p.year}
        <br />
        <Stack itens={p.stack} />
      </p>
      <span className="arrow-shift mt-8 inline-flex items-center gap-2 text-sm text-fog-300 transition-colors group-hover:text-fog-50">
        Ver projeto <ArrowUpRight size={15} aria-hidden="true" />
      </span>
    </>
  );
}

function CaseStudy({ p, numero, composicao }: { p: Project; numero: number; composicao: Composicao }) {
  const indice = (
    <span className="font-mono text-sm text-fog-500">{String(numero).padStart(2, "0")}</span>
  );

  if (composicao === "largura-total") {
    return (
      <Link to={`/projetos/${p.slug}`} className="group block">
        {indice}
        <div className="mt-5">
          <Imagem p={p} aspecto="aspect-[4/3] md:aspect-[21/10]" />
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-12">
          <div className="md:col-span-5">
            <h3 className="text-4xl font-medium tracking-[-0.04em] md:text-5xl">{p.name}</h3>
          </div>
          <div className="md:col-span-4 md:col-start-7">
            <p className="text-base leading-relaxed text-fog-400">{p.description}</p>
            <p className="mt-4 font-mono text-[11px] uppercase leading-relaxed tracking-[0.08em] text-fog-500">
              {p.kind} / {p.year}
              <br />
              <Stack itens={p.stack} />
            </p>
          </div>
          <div className="md:col-span-2 md:flex md:justify-end">
            <span className="arrow-shift inline-flex items-center gap-2 text-sm text-fog-300 group-hover:text-fog-50">
              Ver projeto <ArrowUpRight size={15} aria-hidden="true" />
            </span>
          </div>
        </div>
      </Link>
    );
  }

  const direita = composicao === "imagem-direita";
  return (
    <Link to={`/projetos/${p.slug}`} className="group grid gap-8 lg:grid-cols-12 lg:gap-16">
      <div className={`lg:col-span-8 ${direita ? "lg:order-2" : ""}`}>
        <div className="mb-5 lg:hidden">{indice}</div>
        <Imagem p={p} aspecto="aspect-[4/3] md:aspect-[16/10]" />
      </div>
      <div className={`flex flex-col lg:col-span-4 ${direita ? "lg:order-1" : ""}`}>
        <div className="hidden lg:block">{indice}</div>
        <div className="lg:mt-auto">
          <Info p={p} />
        </div>
      </div>
    </Link>
  );
}

/** Projetos grandes, em formato de estudo de caso, com composições diferentes (home). */
export default function SelectedProjects() {
  const lista = DESTAQUES.map((slug) => projects.find((p) => p.slug === slug)).filter(
    (p): p is Project => Boolean(p),
  );

  return (
    <section id="projetos" aria-labelledby="projetos-titulo" className="container-x section-y">
      <div className="mb-16 flex flex-col gap-6 md:mb-24 md:flex-row md:items-end md:justify-between">
        <Reveal>
          <h2 id="projetos-titulo" className="text-[34px] font-medium leading-[1.04] tracking-[-0.035em] md:text-5xl lg:text-[64px]">
            Projetos selecionados.
          </h2>
          <p className="mt-5 max-w-[440px] text-base leading-relaxed text-fog-400">
            Sites e sistemas-conceito desenhados e desenvolvidos pela Nextgen, para segmentos diferentes.
          </p>
        </Reveal>
        <Link to="/portfolio" className="arrow-shift link-underline flex shrink-0 items-center gap-2 self-start text-sm text-fog-300 hover:text-fog-50 md:self-end">
          Todos os projetos ({projects.length}) <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>

      <div className="flex flex-col gap-24 md:gap-40">
        {lista.map((p, i) => (
          <Reveal key={p.slug}>
            <CaseStudy p={p} numero={i + 1} composicao={COMPOSICOES[i] ?? "imagem-esquerda"} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
