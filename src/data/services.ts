export interface Service {
  title: string;
  description: string;
  details: string[];
}

export const services: Service[] = [
  {
    title: "Sites institucionais",
    description:
      "Presença digital sólida, com design exclusivo e SEO técnico desde a primeira linha de código.",
    details: [
      "Design exclusivo alinhado à marca",
      "Otimização para buscadores (SEO técnico)",
      "Painel de conteúdo opcional",
      "Hospedagem e domínio configurados",
    ],
  },
  {
    title: "E-commerce",
    description:
      "Lojas rápidas e seguras, com checkout otimizado, meios de pagamento e gestão de estoque.",
    details: [
      "Checkout otimizado para conversão",
      "Integração com gateways de pagamento",
      "Catálogo escalável de produtos",
      "Painel administrativo completo",
    ],
  },
  {
    title: "Sistemas web sob medida",
    description: "Plataformas criadas do zero para resolver o processo específico do seu negócio.",
    details: [
      "Levantamento de requisitos com o time",
      "Arquitetura escalável e segura",
      "Integrações via API com outros sistemas",
      "Testes automatizados",
    ],
  },
  {
    title: "Landing pages",
    description: "Páginas orientadas a conversão, com carregamento em menos de 1 segundo.",
    details: [
      "Estrutura orientada a conversão",
      "Testes A/B de headline e CTA",
      "Integração com pixels e analytics",
      "Publicação rápida de campanhas",
    ],
  },
  {
    title: "Manutenção e suporte",
    description: "Monitoramento, backups e evolução contínua do seu produto depois do lançamento.",
    details: [
      "SLA de atendimento definido",
      "Backups automáticos",
      "Monitoramento de uptime e performance",
      "Pequenas evoluções mensais inclusas",
    ],
  },
  {
    title: "SEO e performance",
    description:
      "Core Web Vitals otimizados, estrutura acessível e relatórios mensais de evolução.",
    details: [
      "Auditoria técnica completa",
      "Core Web Vitals otimizados",
      "Estrutura semântica e acessível",
      "Relatórios mensais de evolução",
    ],
  },
];
