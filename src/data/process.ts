export interface ProcessStep {
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    title: "Briefing",
    description:
      "Entendemos seu negócio, objetivos e público para desenhar a estratégia certa antes de qualquer código.",
  },
  {
    title: "Design",
    description: "Protótipos navegáveis com a identidade da sua marca, validados com você a cada etapa.",
  },
  {
    title: "Desenvolvimento",
    description:
      "Código com tecnologia moderna, testes contínuos e checkpoints semanais de acompanhamento.",
  },
  {
    title: "Entrega e suporte",
    description: "Publicamos, monitoramos e seguimos disponíveis para evoluções e suporte técnico.",
  },
];
