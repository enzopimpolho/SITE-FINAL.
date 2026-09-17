import PageHeader from "../components/PageHeader";
import SectionIntro from "../components/SectionIntro";
import ServiceRow from "../components/ServiceRow";
import CtaBanner from "../components/CtaBanner";
import Reveal from "../components/Reveal";
import { services } from "../data/services";

const stack = ["React", "TypeScript", "Node.js", "Next.js", "Tailwind CSS", "PostgreSQL", "AWS", "Vercel"];

export default function Servicos() {
  return (
    <>
      <PageHeader
        label="Serviços"
        title={
          <>
            Soluções digitais para <span className="serif-em">cada etapa</span> do seu negócio.
          </>
        }
        description="Da vitrine institucional ao sistema mais robusto, a Nextgen entrega tecnologia sob medida com foco em performance e resultado."
      />

      <section className="container-x pb-[72px] md:pb-24 lg:pb-[120px]">
        <div className="border-b border-white/[0.08]">
          {services.map((service, index) => (
            <ServiceRow key={service.title} service={service} index={index} showDetails />
          ))}
        </div>
      </section>

      <section className="bg-ink-900">
        <div className="container-x section-y flex flex-col gap-9 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <SectionIntro label="Stack" className="lg:max-w-[720px]">
            Tecnologia certa para <span className="serif-em">cada tipo de projeto.</span>
          </SectionIntro>
          <Reveal delay={0.1} className="flex flex-wrap gap-2 lg:max-w-[480px] lg:justify-end">
            {stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/[0.14] px-4 py-2.5 font-mono text-xs uppercase tracking-[0.08em] text-fog-200"
              >
                {tech}
              </span>
            ))}
          </Reveal>
        </div>
      </section>

      <CtaBanner
        title={
          <>
            Não sabe qual serviço é <span className="serif-em">ideal para você?</span>
          </>
        }
        description="Conte o que você precisa e recomendamos a melhor solução para o seu momento de negócio."
      />
    </>
  );
}
