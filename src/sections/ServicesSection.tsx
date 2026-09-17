import SectionIntro from "../components/SectionIntro";
import ServiceRow from "../components/ServiceRow";
import { services } from "../data/services";

interface ServicesSectionProps {
  showDetails?: boolean;
}

export default function ServicesSection({ showDetails = false }: ServicesSectionProps) {
  return (
    <section id="servicos" className="container-x section-y flex flex-col gap-9 lg:gap-[72px]">
      <div className="grid gap-4 lg:grid-cols-12 lg:gap-6">
        <span className="label hidden pt-3.5 lg:col-span-4 lg:block">(01) — Serviços</span>
        <SectionIntro label="(01) — Serviços" className="lg:col-span-8 [&>span]:lg:hidden">
          Do site institucional ao sistema mais complexo, com o{" "}
          <span className="serif-em">mesmo padrão de qualidade.</span>
        </SectionIntro>
      </div>

      <ul className="border-b border-white/[0.08]">
        {services.map((service, index) => (
          <ServiceRow key={service.title} service={service} index={index} showDetails={showDetails} />
        ))}
      </ul>
    </section>
  );
}
