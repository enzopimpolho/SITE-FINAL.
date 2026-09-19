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
    title: "Automações e integrações",
    description:
      "Conectamos WhatsApp, pagamentos, APIs e ferramentas internas para reduzir trabalho manual.",
    details: [
      "Integração com WhatsApp",
      "Gateways de pagamento",
      "APIs de outros sistemas",
      "Rotinas e fluxos automatizados",
    ],
  },
  {
    title: "Landing pages",
    description: "Páginas orientadas a conversão, leves e rápidas de carregar.",
    details: [
      "Estrutura orientada a conversão",
      "Variações de título e chamada para testar",
      "Integração com pixels e analytics",
      "Publicação rápida de campanhas",
    ],
  },
  {
    title: "Manutenção e suporte",
    description: "Monitoramento, backups e evolução contínua do seu produto depois do lançamento.",
    details: [
      "Canal direto para correções e dúvidas",
      "Backups automáticos",
      "Monitoramento de uptime e performance",
      "Evoluções planejadas sob demanda",
    ],
  },
  {
    title: "SEO e performance",
    description:
      "Core Web Vitals, estrutura semântica e acessível, e acompanhamento da evolução.",
    details: [
      "Auditoria técnica completa",
      "Core Web Vitals otimizados",
      "Estrutura semântica e acessível",
      "Acompanhamento de indicadores",
    ],
  },
];
