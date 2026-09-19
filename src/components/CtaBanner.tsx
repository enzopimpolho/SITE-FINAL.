import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";

/** Encerramento: texto enorme, muito espaço, luz azul quase imperceptível. Sem card. */
export default function CtaBanner() {
  return (
    <section aria-labelledby="cta-titulo" className="relative overflow-hidden border-t border-white/[0.06]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-1/2 left-1/2 h-[80%] w-[90%] -translate-x-1/2 rounded-[50%] bg-accent/[0.09] blur-[140px]"
      />
      <div className="container-x relative py-32 md:py-44 lg:py-56">
        <Reveal>
          <h2 id="cta-titulo">
            <span className="block text-xl font-medium tracking-[-0.02em] text-fog-500 md:text-3xl">Tem uma ideia?</span>
            <span className="mt-3 block text-[64px] font-medium leading-[0.92] tracking-[-0.055em] sm:whitespace-nowrap sm:text-[clamp(64px,10.5vw,160px)] md:mt-5">
              Vamos construir<span className="text-accent">.</span>
            </span>
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="mt-10 flex flex-col gap-8 md:mt-14 md:flex-row md:items-end md:justify-between">
          <p className="max-w-[420px] text-base leading-relaxed text-fog-400 md:text-lg">
            Conte o que sua empresa precisa e vamos pensar na melhor solução.
          </p>
          <Link to="/contato" className="btn-primary h-14 px-8 text-base">
            Solicitar orçamento
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
