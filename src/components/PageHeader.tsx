import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface PageHeaderProps {
  label: string;
  title: ReactNode;
  description: string;
}

const ease = [0.16, 1, 0.3, 1] as const;

export default function PageHeader({ label, title, description }: PageHeaderProps) {
  return (
    <section className="container-x flex flex-col gap-5 pb-14 pt-36 md:gap-7 md:pb-20 md:pt-48">
      <motion.span
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease }}
        className="label"
      >
        {label}
      </motion.span>
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.1, ease }}
        className="max-w-[1100px] text-balance text-[44px] font-medium leading-[1.02] tracking-[-0.04em] md:text-[64px] lg:text-[88px] lg:leading-[0.98]"
      >
        {title}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.35, ease }}
        className="max-w-[560px] text-base leading-relaxed text-fog-400 md:text-lg"
      >
        {description}
      </motion.p>
    </section>
  );
}
