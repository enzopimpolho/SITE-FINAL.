import Reveal from "../components/Reveal";

const camadas = [
  { nome: "Frontend", texto: "Interfaces rápidas, responsivas e cuidadosamente desenvolvidas." },
  { nome: "Backend", texto: "APIs, autenticação, regras de negócio e infraestrutura." },
  { nome: "Database", texto: "Estrutura, armazenamento e gerenciamento de dados." },
  { nome: "Integrations", texto: "WhatsApp, pagamentos, APIs e automações." },
];

/** Seção técnica: camadas da stack em linhas, sem cards. */
export default function TechLayers({ label = "02 — Engenharia" }: { label?: string }) {
  return (
    <section aria-labelledby="camadas-titulo" className="relative overflow-hidden border-y border-white/[0.06] bg-[#030408]">
      <div aria-hidden="true" className="grid-bg absolute inset-0 [mask-image:radial-gradient(ellipse_at_70%_20%,black,transparent_70%)]" />
      <div className="container-x section-y relative">
        <Reveal>
          <p className="label mb-5">{label}</p>
          <h2
            id="camadas-titulo"
            className="max-w-[1000px] text-[34px] font-medium leading-[1.04] tracking-[-0.035em] md:text-5xl lg:text-[64px]"
          >
            Não fazemos apenas páginas. <span className="text-fog-500">Construímos a tecnologia por trás delas.</span>
          </h2>
        </Reveal>

        <ol className="mt-14 border-b border-white/[0.08] md:mt-20">
          {camadas.map((c, i) => (
            <li key={c.nome}>
              <Reveal delay={i * 0.06}>
                <div className="group relative grid gap-2 border-t border-white/[0.08] py-7 transition-colors duration-500 hover:bg-white/[0.015] md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:items-baseline md:gap-8 md:py-9">
                  {/* a linha superior "acende" no hover */}
                  <span
                    aria-hidden="true"
                    className="absolute -top-px left-0 h-px w-full origin-left scale-x-0 bg-accent/70 transition-transform duration-700 ease-out-expo group-hover:scale-x-100 motion-reduce:transition-none"
                  />
                  <h3 className="flex items-baseline gap-4 font-mono text-sm uppercase tracking-[0.14em] text-fog-100 transition-transform duration-500 ease-out-expo group-hover:translate-x-1.5 md:text-[15px]">
                    <span className="text-fog-600 transition-colors group-hover:text-accent-ink">
                      {String(i + 1).padStart(2, "0")} /
                    </span>
                    {c.nome}
                  </h3>
                  <p className="text-lg leading-snug text-fog-400 transition-colors duration-500 group-hover:text-fog-100 md:text-2xl md:tracking-[-0.015em]">
                    {c.texto}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
