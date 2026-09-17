import { useState } from "react";
import SectionIntro from "../components/SectionIntro";
import ProjectCard from "../components/ProjectCard";
import Reveal from "../components/Reveal";
import { projects } from "../data/projects";

const layout = [
  { col: "lg:col-span-7", img: "lg:h-[456px]" },
  { col: "lg:col-span-5", img: "lg:h-[456px]" },
  { col: "lg:col-span-5", img: "lg:h-[396px]" },
  { col: "lg:col-span-7", img: "lg:h-[396px]" },
  { col: "lg:col-span-4", img: "lg:h-[336px]" },
  { col: "lg:col-span-4", img: "lg:h-[336px]" },
  { col: "lg:col-span-4", img: "lg:h-[336px]" },
];

const categories = ["Todos", ...projects.map((project) => project.category)];

interface PortfolioSectionProps {
  withIntro?: boolean;
}

export default function PortfolioSection({ withIntro = true }: PortfolioSectionProps) {
  const [active, setActive] = useState("Todos");

  return (
    <section id="portfolio" className="container-x section-y flex flex-col gap-7 md:gap-14">
      {withIntro && (
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <SectionIntro label="(02) — Portfólio">
            Projetos conceito <span className="serif-em">criados pela Nextgen.</span>
          </SectionIntro>
          <Reveal delay={0.1} className="lg:w-[360px] lg:shrink-0">
            <p className="text-base leading-relaxed text-fog-400">
              Sete sites reais, construídos por nós para mostrar como pensamos design e código para
              diferentes segmentos. Clique em qualquer um para navegar pelo projeto completo.
            </p>
          </Reveal>
        </div>
      )}
      {!withIntro && <h2 className="sr-only">Projetos</h2>}

      <div role="group" aria-label="Filtrar projetos por categoria" className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const selected = category === active;
          return (
            <button
              key={category}
              type="button"
              onClick={() => setActive(category)}
              aria-pressed={selected}
              className={`h-11 rounded-full border px-4 text-sm transition-colors duration-300 md:px-[18px] ${
                selected
                  ? "border-accent bg-accent text-white"
                  : "border-white/[0.14] text-fog-200 hover:border-white/30 hover:text-fog-50"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>
      <p role="status" className="sr-only">
        {active === "Todos"
          ? `Mostrando todos os ${projects.length} projetos.`
          : `Destacando projetos de ${active}: ${projects
              .filter((project) => project.category === active)
              .map((project) => project.name)
              .join(", ")}.`}
      </p>

      <div className="grid gap-7 md:grid-cols-2 md:gap-6 lg:grid-cols-12">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.name}
            project={project}
            index={index}
            dimmed={active !== "Todos" && project.category !== active}
            className={layout[index % layout.length].col}
            imageClassName={`h-[250px] md:h-[320px] ${layout[index % layout.length].img}`}
          />
        ))}
      </div>
    </section>
  );
}
