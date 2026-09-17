import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import CtaBanner from "../components/CtaBanner";
import WhyUsSection from "../sections/WhyUsSection";
import ProcessSection from "../sections/ProcessSection";

const pillars = [
  {
    title: "Missão",
    description:
      "Transformar a presença digital de empresas em vantagem competitiva real, com sites e sistemas rápidos, seguros e bem pensados.",
  },
  {
    title: "Visão",
    description:
      "Ser referência em desenvolvimento web sob medida para pequenas e médias empresas em todo o Brasil.",
  },
  {
    title: "Valores",
    description:
      "Transparência, excelência técnica e compromisso com o resultado do cliente em cada projeto que assinamos.",
  },
];

export default function Sobre() {
  return (
    <>
      <PageHeader
        label="Sobre a Nextgen"
        title={
          <>
            Tecnologia com propósito, <span className="serif-em">feita em São Paulo.</span>
          </>
        }
        description="Somos uma equipe de desenvolvedores e designers dedicada a criar produtos digitais que fazem diferença para o negócio dos nossos clientes."
      />

      <section
        aria-labelledby="quem-somos"
        className="container-x grid gap-12 pb-[72px] md:pb-24 lg:grid-cols-12 lg:gap-6 lg:pb-[120px]"
      >
        <Reveal className="lg:col-span-6">
          <h2 id="quem-somos" className="label mb-6">
            Quem somos
          </h2>
          <div className="flex flex-col gap-5 text-lg leading-relaxed text-fog-300 md:text-xl">
            <p>
              Fundada em São Paulo, a <span className="text-fog-50">Nextgen</span> nasceu da vontade de
              fazer desenvolvimento web diferente: sem templates genéricos, sem promessas vazias e sem
              prazos que nunca se cumprem.
            </p>
            <p>
              Ajudamos empresas — de startups a operações consolidadas — a lançar sites institucionais,
              lojas virtuais e sistemas internos que unem design cuidadoso, código sólido e performance de
              verdade.
            </p>
            <p>
              Seguimos com o mesmo princípio do primeiro projeto:{" "}
              <span className="font-serif text-[1.15em] italic text-accent-ink">
                tecnologia só faz sentido quando gera resultado.
              </span>
            </p>
          </div>
        </Reveal>

        <ul className="border-b border-white/[0.08] lg:col-span-5 lg:col-start-8">
          {pillars.map((pillar, index) => (
            <li key={pillar.title}>
              <Reveal
                delay={index * 0.08}
                className="grid grid-cols-[32px_minmax(0,1fr)] gap-x-3.5 gap-y-2 border-t border-white/[0.08] py-6 lg:grid-cols-[48px_minmax(0,1fr)]"
              >
                <span aria-hidden="true" className="pt-1.5 font-mono text-xs text-fog-500">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-2xl font-medium tracking-[-0.02em]">{pillar.title}</h3>
                <p className="col-start-2 text-base leading-relaxed text-fog-400 md:text-[15px]">
                  {pillar.description}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <WhyUsSection label="(01) — Diferenciais" />
      <ProcessSection label="(02) — Processo" />
      <CtaBanner
        title={
          <>
            Vamos construir o <span className="serif-em">próximo case</span> juntos?
          </>
        }
        description="Conte sobre o seu negócio e descubra como podemos acelerar sua presença digital."
      />
    </>
  );
}
