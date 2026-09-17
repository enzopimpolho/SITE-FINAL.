import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { Project } from "../data/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
  dimmed: boolean;
  className?: string;
  imageClassName?: string;
}

export default function ProjectCard({
  project,
  index,
  dimmed,
  className = "",
  imageClassName = "",
}: ProjectCardProps) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "-14%"]);

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 1.1, delay: (index % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      <Link
        to={`/projetos/${project.slug}`}
        className={`group flex flex-col gap-3.5 rounded-[20px] transition-opacity duration-500 focus-visible:opacity-100 md:gap-4 ${dimmed ? "opacity-25" : "opacity-100"}`}
      >
        <div
          className={`relative overflow-hidden rounded-[18px] border border-white/[0.08] bg-ink-850 md:rounded-[20px] ${imageClassName}`}
        >
          <div className="absolute inset-0 transition-transform duration-700 ease-out-expo group-hover:scale-[1.04] motion-reduce:group-hover:scale-100">
            <motion.img
              src={project.image}
              alt={`Página inicial do projeto conceito ${project.name}, ${project.category.toLowerCase()}`}
              width={project.imageWidth}
              height={project.imageHeight}
              loading="lazy"
              decoding="async"
              style={{ y: reduceMotion ? 0 : imageY }}
              className="absolute inset-x-0 top-0 block h-[130%] w-full max-w-none object-cover object-top will-change-transform"
            />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-ink-950/70 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-fog-100 backdrop-blur">
            Projeto conceito
          </span>
          <span className="absolute bottom-4 right-4 flex translate-y-2 items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-xs font-medium text-ink-950 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 motion-reduce:opacity-100 motion-reduce:translate-y-0">
            Ver projeto <ArrowUpRight size={14} aria-hidden="true" />
          </span>
        </div>
        <div className="flex items-baseline justify-between md:h-12 md:items-center">
          <div className="flex items-baseline gap-3 md:gap-3.5">
            <h3 className="text-xl font-medium tracking-[-0.02em] md:text-[22px]">{project.name}</h3>
            <p className="font-mono text-xs uppercase tracking-[0.1em] text-fog-500">{project.category}</p>
          </div>
          <span aria-hidden="true" className="font-mono text-xs text-fog-500">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
