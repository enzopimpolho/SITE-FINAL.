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

        <ul className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {differentials.map((item, index) => {
            const Icon = item.icon;
            return (
              <li key={item.title}>
                <Reveal delay={index * 0.08}>
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-2.5 border-t border-white/[0.12] pt-[22px] lg:gap-y-4 lg:pt-7">
                    <span aria-hidden="true" className="hidden font-mono text-xs text-fog-500 lg:block">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <Icon
                      size={22}
                      strokeWidth={1.7}
                      aria-hidden="true"
                      className="col-start-2 row-start-1 text-accent-ink"
                    />
                    <h3 className="col-start-1 row-start-1 text-[22px] font-medium tracking-[-0.02em] lg:col-span-2 lg:row-start-2 lg:text-2xl">
                      {item.title}
                    </h3>
                    <p className="col-span-2 text-base leading-relaxed text-fog-400 lg:text-[15.5px]">
                      {item.description}
                    </p>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
