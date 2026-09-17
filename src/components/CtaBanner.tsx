import { useRef, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { useInView, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Velaris from "@/components/ui/velaris";
import { useMotionPause } from "@/lib/motion";
import Reveal from "./Reveal";

// Kept at module scope: Velaris rebuilds its WebGL program whenever the colors array identity changes.
const BRAND_COLORS = ["#4c6ef5", "#2541d8", "#22d3ee", "#07080c"];

interface CtaBannerProps {
  title: ReactNode;
  description: string;
}

export default function CtaBanner({ title, description }: CtaBannerProps) {
  const boxRef = useRef<HTMLDivElement>(null);
  const inView = useInView(boxRef, { margin: "200px 0px" });
  const reduceMotion = useReducedMotion();
  const { paused } = useMotionPause();
  const animate = inView && !paused && !reduceMotion;

  return (
    <section className="container-x section-y">
      <Reveal>
        <div
          ref={boxRef}
          className="relative isolate overflow-hidden rounded-3xl border border-white/[0.08] bg-[radial-gradient(120%_120%_at_20%_10%,#2541d8_0%,#0f1a5c_45%,#07080c_80%)] md:rounded-[28px]"
        >
          {animate && (
            <div aria-hidden="true" className="absolute inset-0 -z-10">
              <Velaris height="100%" bg="#07080c" colors={BRAND_COLORS} speed={1.2} grain={0.25} />
            </div>
          )}
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-gradient-to-r from-ink-950/75 via-ink-950/35 to-transparent"
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
