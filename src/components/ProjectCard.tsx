import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SOURCE_HEIGHT, SOURCE_WIDTH, type Project } from "../data/projects";

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
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const { x, y, width } = project.crop;

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 1.1, delay: (index % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      <div
        className={`group flex flex-col gap-3.5 transition-opacity duration-500 md:gap-4 ${dimmed ? "opacity-[0.16]" : "opacity-100"}`}
      >
        <div
          className={`relative overflow-hidden rounded-[18px] border border-white/[0.08] bg-ink-850 md:rounded-[20px] ${imageClassName}`}
        >
          <div className="absolute inset-0 transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]">
            <motion.img
              src={project.image}
              alt={`Site ${project.name}`}
              loading="lazy"
              decoding="async"
              style={{
                y: imageY,
                width: `${(SOURCE_WIDTH / width) * 100}%`,
                marginLeft: `${(-x / width) * 100}%`,
                marginTop: `${(-y / width) * 100}%`,
                aspectRatio: `${SOURCE_WIDTH} / ${SOURCE_HEIGHT}`,
              }}
              className="block max-w-none will-change-transform"
            />
          </div>
        </div>
        <div className="flex items-baseline justify-between md:h-12 md:items-center">
          <div className="flex items-baseline gap-3 md:gap-3.5">
            <h3 className="text-xl font-medium tracking-[-0.02em] md:text-[22px]">{project.name}</h3>
            <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-fog-500 md:text-xs">
              {project.category}
            </span>
          </div>
          <span className="font-mono text-[11px] text-fog-500 md:text-xs">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
      </div>
    </motion.article>
  );
}
