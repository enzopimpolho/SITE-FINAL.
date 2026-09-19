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
            Do site ao sistema, <span className="serif-em">do frontend ao backend.</span>
          </>
        }
        description="Sites, sistemas web, automações e integrações desenvolvidos sob medida, com código próprio e foco em performance."
      />

      <section aria-labelledby="servicos-lista" className="container-x pb-[72px] md:pb-24 lg:pb-[120px]">
        <h2 id="servicos-lista" className="label mb-6">
          O que entregamos
        </h2>
        <ul className="border-b border-white/[0.08]">
          {services.map((service, index) => (
            <ServiceRow key={service.title} service={service} index={index} showDetails />
          ))}
        </ul>
      </section>

      <section className="border-y border-white/[0.06] bg-ink-900">
        <div className="container-x section-y flex flex-col gap-9 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <SectionIntro label="Stack" className="lg:max-w-[720px]">
            Tecnologia certa para <span className="serif-em">cada tipo de projeto.</span>
          </SectionIntro>
          <Reveal delay={0.1} className="lg:max-w-[480px]">
            <p className="font-mono text-xs uppercase leading-loose tracking-[0.14em] text-fog-300 lg:text-right">
              {stack.join(" / ")}
            </p>
          </Reveal>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
