import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Reveal from "../components/Reveal";

/** Sobre (home): quase só tipografia, muito espaço negativo. */
export default function AboutStatement({ label = "06 — Sobre", comLink = true }: { label?: string; comLink?: boolean }) {
  return (
    <section aria-labelledby="sobre-titulo" className="container-x py-28 md:py-40 lg:py-52">
      <div className="grid gap-10 lg:grid-cols-12">
        <p className="label lg:col-span-3 lg:pt-4">{label}</p>
        <div className="lg:col-span-9">
          <Reveal>
            <h2
              id="sobre-titulo"
              className="text-[28px] font-medium leading-[1.12] tracking-[-0.03em] md:text-[44px] lg:text-[54px]"
            >
              A Nextgen desenvolve sites e sistemas sob medida para empresas que precisam transformar processos
              e ideias em <span className="text-fog-500">software funcional.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-10 grid gap-8 border-t border-white/[0.08] pt-8 md:grid-cols-2">
            <p className="max-w-[440px] text-base leading-relaxed text-fog-400 md:text-lg">
              Trabalhamos da interface à infraestrutura, criando soluções rápidas, escaláveis e fáceis de usar.
            </p>
            {comLink && (
              <Link to="/sobre" className="arrow-shift link-underline flex items-center gap-2 self-end text-sm text-fog-300 hover:text-fog-50 md:justify-self-end">
                Conheça a Nextgen <ArrowRight size={14} aria-hidden="true" />
              </Link>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
