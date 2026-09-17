import SectionIntro from "../components/SectionIntro";
import ProcessSteps from "../components/ProcessSteps";

interface ProcessSectionProps {
  label?: string;
}

export default function ProcessSection({ label = "(04) — Processo" }: ProcessSectionProps) {
  return (
    <section id="processo" className="container-x section-y flex flex-col gap-10 lg:gap-20">
      <SectionIntro label={label}>
        Um processo claro, do <span className="serif-em">briefing ao suporte.</span>
      </SectionIntro>
      <ProcessSteps />
    </section>
  );
}
