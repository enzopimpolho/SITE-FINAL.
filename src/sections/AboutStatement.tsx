import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Reveal from "../components/Reveal";

/** Sobre: tipografia e espaço negativo, com uma pequena ficha de identidade em mono. */
export default function AboutStatement({ comLink = true }: { comLink?: boolean }) {
  return (
    <section aria-labelledby="sobre-titulo" className="container-x py-28 md:py-40 lg:py-48">
      <div className="grid gap-14 lg:grid-cols-12">
        <dl className="grid grid-cols-2 gap-8 font-mono text-xs uppercase leading-relaxed tracking-[0.1em] text-fog-500 lg:col-span-3 lg:grid-cols-1 lg:content-start lg:gap-10">
          <div>
            <dt className="sr-only">Empresa</dt>
            <dd className="text-fog-200">Nextgen®</dd>
            <dd>Digital engineering</dd>
          </div>
          <div>
            <dt className="sr-only">Base</dt>
            <dd>São Paulo / Brasil</dd>
          </div>
          <div>
            <dt className="sr-only">Frentes</dt>
            <dd>Web</dd>
            <dd>Systems</dd>
            <dd>Automation</dd>
          </div>
        </dl>

        <div className="lg:col-span-8 lg:col-start-5">
          <Reveal>
            <h2
              id="sobre-titulo"
              className="text-[28px] font-medium leading-[1.14] tracking-[-0.03em] md:text-[40px] lg:text-[50px]"
            >
              A Nextgen desenvolve sites e sistemas sob medida para empresas que precisam transformar processos
              e ideias em software funcional.
            </h2>
            <p className="mt-8 max-w-[560px] text-lg leading-relaxed text-fog-400 md:text-xl">
              Trabalhamos da interface à infraestrutura: o mesmo time desenha, programa e publica.
            </p>
          </Reveal>
          {comLink && (
            <Link to="/sobre" className="arrow-shift link-underline mt-10 inline-flex items-center gap-2 text-sm text-fog-300 hover:text-fog-50">
              Conheça a Nextgen <ArrowRight size={14} aria-hidden="true" />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
