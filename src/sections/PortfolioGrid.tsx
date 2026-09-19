import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { LayoutGrid, type Card } from "@/components/ui/layout-grid";
import { projects } from "@/data/projects";

const descricoes: Record<string, string> = {
  petcare: "Site para pet shop com agendamento de banho e tosa e vitrine de serviços.",
  "bella-italia": "Restaurante italiano com cardápio digital, reservas e clima de cantina.",
  "urban-style": "E-commerce de moda urbana com catálogo, filtros e carrinho.",
  "vintage-club": "Barbearia com identidade retrô, serviços e agendamento online.",
  "gestao-pro": "Sistema web de gestão com painel de indicadores e controle operacional.",
  fitlife: "Academia com planos, grade de aulas e captação de novos alunos.",
  "saas-launch": "Landing page de lançamento de SaaS focada em conversão.",
};

// Grade de 3 colunas: largo+estreito, estreito+largo, depois três iguais
const tamanhos = ["md:col-span-2", "md:col-span-1", "md:col-span-1", "md:col-span-2"];

function Conteudo({ nome, categoria, slug }: { nome: string; categoria: string; slug: string }) {
  return (
    <div>
      <p className="label text-fog-300">{categoria}</p>
      <p className="mt-2 text-2xl font-medium text-white md:text-4xl">{nome}</p>
      <p className="my-4 max-w-lg text-base text-fog-200">{descricoes[slug]}</p>
      <Link to={`/projetos/${slug}`} className="btn-primary">
        Ver projeto <ArrowUpRight size={16} aria-hidden="true" />
      </Link>
    </div>
  );
}

const cards: Card[] = projects.map((p, i) => ({
  id: i + 1,
  titulo: p.name,
  thumbnail: p.image,
  className: tamanhos[i] ?? "md:col-span-1",
  content: <Conteudo nome={p.name} categoria={p.category} slug={p.slug} />,
}));

/** Portfólio em Layout Grid: clique em um projeto para ampliar e abrir. */
export default function PortfolioGrid() {
  return (
    <section id="portfolio" aria-label="Projetos" className="container-x section-y">
      <LayoutGrid cards={cards} />
    </section>
  );
}
