import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import type { Service } from "../data/services";

interface ServiceRowProps {
  service: Service;
  index: number;
  showDetails?: boolean;
}

export default function ServiceRow({ service, index, showDetails = false }: ServiceRowProps) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 1, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="group border-t border-white/[0.08]"
    >
      <div className="grid grid-cols-[32px_minmax(0,1fr)] gap-x-3.5 gap-y-2 py-[22px] lg:min-h-[104px] lg:grid-cols-[96px_minmax(0,1fr)_420px_44px] lg:items-center lg:gap-x-8 lg:py-0">
        <span aria-hidden="true" className="pt-2 font-mono text-xs text-fog-500 lg:pt-0 lg:text-[13px]">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="text-2xl font-medium tracking-[-0.025em] transition-[color,transform] duration-500 ease-out-expo group-focus-within:text-accent-ink group-hover:text-accent-ink lg:text-[34px] lg:group-focus-within:translate-x-3.5 lg:group-hover:translate-x-3.5 motion-reduce:!translate-x-0">
          {service.title}
        </h3>
        <p className="col-start-2 text-base leading-relaxed text-fog-400 lg:col-start-3 lg:text-[15.5px]">
          {service.description}
        </p>
        <Link
          to="/contato"
          aria-label={`Pedir orçamento de ${service.title.toLowerCase()}`}
          className="hidden h-11 w-11 items-center justify-center rounded-md border border-white/[0.16] text-fog-200 transition-colors duration-300 group-focus-within:border-accent group-focus-within:bg-accent group-focus-within:text-white group-hover:border-accent group-hover:bg-accent group-hover:text-white lg:flex"
        >
          <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
      </div>

      {showDetails && (
        <ul
          aria-label={`O que está incluído em ${service.title.toLowerCase()}`}
          className="grid gap-x-8 gap-y-2 pb-7 pl-[46px] sm:grid-cols-2 lg:grid-cols-4 lg:pl-32"
        >
          {service.details.map((detail) => (
            <li key={detail} className="flex items-start gap-2 text-[15px] text-fog-300">
              <Check size={15} className="mt-1 shrink-0 text-accent-ink" aria-hidden="true" />
              {detail}
            </li>
          ))}
        </ul>
      )}
    </motion.li>
  );
}
