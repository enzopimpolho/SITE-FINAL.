export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  initials: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Marina Costa",
    role: "Diretora de Marketing",
    quote:
      "A Nextgen entregou um site muito acima do que esperávamos, dentro do prazo combinado. A comunicação foi transparente do início ao fim.",
    initials: "MC",
  },
  {
    name: "Rafael Andrade",
    role: "Fundador",
    quote:
      "Nosso e-commerce triplicou a taxa de conversão depois da migração. O time entendeu exatamente o que precisávamos.",
    initials: "RA",
  },
  {
    name: "Juliana Prado",
    role: "COO",
    quote:
      "O sistema sob medida resolveu um gargalo que tínhamos há anos. Suporte rápido e um time técnico muito sólido.",
    initials: "JP",
  },
];
