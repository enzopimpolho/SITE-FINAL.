import type { ReactNode } from "react";
import Reveal from "./Reveal";

interface SectionIntroProps {
  label: string;
  children: ReactNode;
  className?: string;
}

export default function SectionIntro({ label, children, className = "" }: SectionIntroProps) {
  return (
    <Reveal className={`flex flex-col gap-4 ${className}`}>
      <span className="label">{label}</span>
      <h2 className="h-display max-w-[1000px] text-balance">{children}</h2>
    </Reveal>
  );
}
