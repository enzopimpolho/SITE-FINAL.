import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import GlassVideo from "@/components/GlassVideo";
import Reveal from "./Reveal";

interface CtaBannerProps {
  title: ReactNode;
  description: string;
}

export default function CtaBanner({ title, description }: CtaBannerProps) {

  return (
    <section className="container-x section-y">
      <Reveal>
        <div
          className="relative isolate overflow-hidden rounded-3xl border border-white/[0.08] bg-[radial-gradient(120%_120%_at_20%_10%,#2541d8_0%,#0f1a5c_45%,#07080c_80%)] md:rounded-[28px]"
        >
          <div aria-hidden="true" className="absolute inset-0 -z-10">
            <GlassVideo />
          </div>
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-gradient-to-r from-ink-950/90 via-ink-950/60 to-ink-950/20"
          />

          <div className="flex flex-col gap-8 px-6 py-14 md:px-12 lg:flex-row lg:items-end lg:justify-between lg:px-16 lg:py-20">
            <div className="flex max-w-[820px] flex-col gap-5">
              <h2 className="text-balance text-[40px] font-medium leading-[1.02] tracking-[-0.04em] md:text-6xl lg:text-7xl">
                {title}
              </h2>
              <p className="max-w-[520px] text-base leading-relaxed text-fog-200 md:text-lg">{description}</p>
            </div>
            <Link to="/contato" className="btn-primary shrink-0 self-start lg:self-end">
              Solicitar orçamento
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
