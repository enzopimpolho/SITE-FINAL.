export interface Project {
  name: string;
  category: string;
  slug: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  /** Tipo de entrega: Website, E-commerce, Sistema web, Landing page */
  kind: string;
  description: string;
  year: number;
  /** Todos os projetos do portfólio são conceitos desenvolvidos pela Nextgen, sem cliente real */
  status: "Conceito";
  /** Tecnologias reais: os projetos-conceito são construídos neste repositório */
  stack: string[];
}

const STACK_SITE = ["React", "TypeScript", "Tailwind CSS", "Vite"];

export const projects: Project[] = [
  { name: "PetCare", category: "Pet shop", slug: "petcare", image: "/portfolio/petcare.webp", imageWidth: 1440, imageHeight: 1800, kind: "Website", description: "Site para pet shop com agendamento de banho e tosa e vitrine de serviços.", year: 2026, status: "Conceito", stack: STACK_SITE },
  { name: "Bella Itália", category: "Restaurante", slug: "bella-italia", image: "/portfolio/bella-italia.webp", imageWidth: 1440, imageHeight: 1800, kind: "Website", description: "Restaurante italiano com cardápio digital, reservas e clima de cantina.", year: 2026, status: "Conceito", stack: STACK_SITE },
  { name: "Urban Style", category: "E-commerce", slug: "urban-style", image: "/portfolio/urban-style.webp", imageWidth: 1440, imageHeight: 1800, kind: "E-commerce", description: "E-commerce de moda urbana com catálogo, filtros e carrinho.", year: 2026, status: "Conceito", stack: STACK_SITE },
  { name: "Vintage Club", category: "Barbearia", slug: "vintage-club", image: "/portfolio/vintage-club.webp", imageWidth: 1440, imageHeight: 1800, kind: "Website", description: "Barbearia com identidade retrô, serviços e agendamento online.", year: 2026, status: "Conceito", stack: STACK_SITE },
  { name: "Gestão Pro", category: "Sistema web", slug: "gestao-pro", image: "/portfolio/gestao-pro.webp", imageWidth: 1440, imageHeight: 1800, kind: "Sistema web", description: "Sistema web de gestão com painel de indicadores e controle operacional.", year: 2026, status: "Conceito", stack: STACK_SITE },
  { name: "FitLife", category: "Academia", slug: "fitlife", image: "/portfolio/fitlife.webp", imageWidth: 1440, imageHeight: 1800, kind: "Website", description: "Academia com planos, grade de aulas e captação de novos alunos.", year: 2026, status: "Conceito", stack: STACK_SITE },
  { name: "SaaS Launch", category: "Landing page", slug: "saas-launch", image: "/portfolio/saas-launch.webp", imageWidth: 1440, imageHeight: 1800, kind: "Landing page", description: "Landing page de lançamento de SaaS focada em conversão.", year: 2026, status: "Conceito", stack: STACK_SITE },
];
