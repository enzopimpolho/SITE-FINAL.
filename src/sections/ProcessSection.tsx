import Reveal from "../components/Reveal";
import { processSteps } from "../data/process";

/** Processo editorial: quatro etapas numeradas sobre uma linha, sem cards nem ícones. */
export default function ProcessSection() {
  return (
    <section aria-labelledby="processo-titulo" className="container-x section-y">
      <Reveal>
        <h2 id="processo-titulo" className="max-w-[760px] text-[34px] font-medium leading-[1.04] tracking-[-0.035em] md:text-5xl">
          Como trabalhamos.
        </h2>
      </Reveal>

      <ol className="mt-14 grid md:mt-20 md:grid-cols-4">
        {processSteps.map((step, i) => (
          <li key={step.title} className="relative border-l border-white/[0.08] pb-10 pl-6 md:border-l-0 md:border-t md:pb-0 md:pl-0 md:pr-8 md:pt-8">
            {/* marcador na linha */}
            <span aria-hidden="true" className="absolute -left-[3px] top-1 h-1.5 w-1.5 bg-accent md:-top-[3px] md:left-0" />
            <Reveal delay={i * 0.08}>
              <span className="font-mono text-xs text-fog-500">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 text-2xl font-medium tracking-[-0.03em] md:mt-6">{step.title}</h3>
              <p className="mt-3 max-w-[280px] text-[15px] leading-relaxed text-fog-400">{step.description}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
