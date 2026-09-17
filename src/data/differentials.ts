import type { LucideIcon } from "lucide-react";
import { CalendarCheck, Gauge, Headphones, Layers } from "lucide-react";

export interface Differential {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const differentials: Differential[] = [
  {
    icon: Gauge,
    title: "Performance real",
    description:
      "Sites rápidos de verdade, com notas altas em Core Web Vitals e carregamento otimizado em qualquer conexão.",
  },
  {
    icon: Layers,
    title: "Tecnologia moderna",
    description:
      "Stack atual — React, TypeScript e nuvem — pensada para escalar junto com o seu negócio.",
  },
  {
    icon: CalendarCheck,
    title: "Prazos previsíveis",
    description: "Processo com marcos definidos: você sabe em que etapa o projeto está a cada semana.",
  },
  {
    icon: Headphones,
    title: "Suporte contínuo",
    description:
      "Depois do lançamento seguimos por perto: monitoramento, atualizações e evolução do produto.",
  },
];
