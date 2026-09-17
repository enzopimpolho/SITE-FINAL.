import { Fragment } from "react";
import { projects } from "../data/projects";

export default function TrustMarquee() {
  const track = [...projects, ...projects];

  return (
    <section className="flex h-16 items-center gap-10 overflow-hidden border-y border-white/[0.07] md:h-[104px]">
      <div className="hidden shrink-0 items-center gap-10 pl-20 lg:flex">
        <span className="label text-fog-500">Entregas recentes</span>
        <span className="h-px w-12 bg-white/15" />
      </div>
      <div className="relative min-w-0 flex-1 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-ink-950 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-ink-950 to-transparent" />
        <div className="flex w-max animate-marquee items-center whitespace-nowrap will-change-transform text-[17px] font-medium tracking-[-0.02em] text-fog-100 md:text-[22px]">
          {track.map((project, index) => (
            <Fragment key={`${project.name}-${index}`}>
              <span className={index % 2 === 1 ? "font-serif text-[1.18em] font-normal italic" : ""}>
                {project.name}
              </span>
              <span className="px-6 font-mono text-[13px] text-fog-700 md:px-9 md:text-base">/</span>
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
