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
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 1, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="group border-t border-white/[0.08]"
    >
      <div className="grid grid-cols-[32px_minmax(0,1fr)] gap-x-3.5 gap-y-2 py-[22px] lg:min-h-[104px] lg:grid-cols-[96px_minmax(0,1fr)_420px_44px] lg:items-center lg:gap-x-8 lg:py-0">
        <span className="pt-2 font-mono text-xs text-fog-500 lg:pt-0 lg:text-[13px]">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="text-2xl font-medium tracking-[-0.025em] transition-all duration-500 ease-out-expo group-hover:text-accent-ink lg:text-[34px] lg:group-hover:translate-x-3.5">
          {service.title}
        </h3>
        <p className="col-start-2 text-[15px] leading-relaxed text-fog-400 lg:col-start-3 lg:text-[15.5px]">
          {service.description}
        </p>
        <Link
          to="/contato"
          aria-label={`Pedir orçamento: ${service.title}`}
          className="hidden h-11 w-11 items-center justify-center rounded-full border border-white/[0.16] text-fog-200 transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-white lg:flex"
        >
          <ArrowUpRight size={16} />
        </Link>
      </div>

      {showDetails && (
        <ul className="grid gap-x-8 gap-y-2 pb-7 pl-[46px] sm:grid-cols-2 lg:grid-cols-4 lg:pl-32">
          {service.details.map((detail) => (
            <li key={detail} className="flex items-start gap-2 text-sm text-fog-300">
              <Check size={15} className="mt-0.5 shrink-0 text-accent-ink" />
              {detail}
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}
