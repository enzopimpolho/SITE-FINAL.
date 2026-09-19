import Reveal from "../components/Reveal";

const camadas = [
  { nome: "Frontend", texto: "Interfaces rápidas, responsivas e cuidadosamente desenvolvidas." },
  { nome: "Backend", texto: "APIs, autenticação, regras de negócio e infraestrutura." },
  { nome: "Database", texto: "Estrutura, armazenamento e gerenciamento de dados." },
  { nome: "Integrations", texto: "WhatsApp, pagamentos, APIs e automações." },
];

/** Engenharia: título fixo à esquerda, camadas da stack em linhas à direita. */
export default function TechLayers() {
  return (
    <section aria-labelledby="camadas-titulo" className="relative border-y border-white/[0.06] bg-[#030408]">
      <div aria-hidden="true" className="grid-bg absolute inset-0 [mask-image:linear-gradient(to_right,black,transparent_60%)]" />
      <div className="container-x section-y relative grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <Reveal className="lg:sticky lg:top-32">
            <h2
              id="camadas-titulo"
              className="text-[34px] font-medium leading-[1.04] tracking-[-0.035em] md:text-5xl lg:text-[56px]"
            >
              Não fazemos apenas páginas.
              <span className="mt-2 block text-fog-500">Construímos a tecnologia por trás delas.</span>
            </h2>
          </Reveal>
        </div>

        <ol className="border-b border-white/[0.08] lg:col-span-6 lg:col-start-7">
          {camadas.map((c, i) => (
            <li
              key={c.nome}
              className="group relative border-t border-white/[0.08] py-8 transition-colors duration-500 hover:border-white/25 md:py-10"
            >
              <div className="flex items-center gap-3 font-mono text-[13px] uppercase tracking-[0.1em]">
                <span className="text-fog-50 opacity-40 transition-opacity duration-500 group-hover:opacity-100">
                  {String(i + 1).padStart(2, "0")} /
                </span>
                <h3 className="text-fog-200">{c.nome}</h3>
                {/* indicador azul discreto no hover */}
                <span
                  aria-hidden="true"
                  className="ml-auto h-1.5 w-1.5 bg-accent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
              </div>
              <p className="mt-4 text-xl leading-snug tracking-[-0.015em] text-fog-400 transition-[color,transform] duration-500 ease-out-expo group-hover:translate-x-1 group-hover:text-fog-50 md:text-[26px] motion-reduce:transform-none">
                {c.texto}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
