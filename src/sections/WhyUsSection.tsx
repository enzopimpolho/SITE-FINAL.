import SectionIntro from "../components/SectionIntro";
import Reveal from "../components/Reveal";
import { differentials } from "../data/differentials";

interface WhyUsSectionProps {
  label?: string;
}

export default function WhyUsSection({ label = "(03) — Por que a Nextgen" }: WhyUsSectionProps) {
  return (
    <section id="diferenciais" className="bg-ink-900">
      <div className="container-x section-y flex flex-col gap-9 lg:gap-[72px]">
        <SectionIntro label={label}>
          Tecnologia, processo e <span className="serif-em">proximidade.</span>
        </SectionIntro>

        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {differentials.map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} delay={index * 0.08}>
                <div className="flex flex-col gap-2.5 border-t border-white/[0.12] pt-[22px] lg:gap-4 lg:pt-7">
                  <div className="flex items-center justify-between text-accent-ink">
                    <span className="hidden font-mono text-xs text-fog-500 lg:inline">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-[22px] font-medium tracking-[-0.02em] text-fog-50 lg:hidden">
                      {item.title}
                    </h3>
                    <Icon size={22} strokeWidth={1.7} aria-hidden="true" />
                  </div>
                  <h3 className="hidden text-2xl font-medium tracking-[-0.02em] lg:block">{item.title}</h3>
                  <p className="text-[15px] leading-relaxed text-fog-400 lg:text-[15.5px]">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
