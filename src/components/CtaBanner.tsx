import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";

interface CtaBannerProps {
  title: ReactNode;
  description: string;
}

export default function CtaBanner({ title, description }: CtaBannerProps) {
  return (
    <section className="container-x section-y">
      <Reveal>
        <div className="flex flex-col gap-8 border-y border-white/[0.08] py-14 lg:flex-row lg:items-end lg:justify-between lg:py-20">
          <div className="flex max-w-[820px] flex-col gap-5">
            <h2 className="text-balance text-[40px] font-medium leading-[1.02] tracking-[-0.04em] md:text-6xl lg:text-7xl">
              {title}
            </h2>
            <p className="max-w-[520px] text-base leading-relaxed text-fog-400 md:text-lg">{description}</p>
          </div>
          <Link to="/contato" className="btn-primary shrink-0 self-start lg:self-end">
            Solicitar orçamento
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
