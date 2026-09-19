import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import CtaBanner from "../components/CtaBanner";
import SystemsShowcase, { DEMO_ERP } from "../sections/SystemsShowcase";

const modulos = [
  { titulo: "Visão Geral", texto: "KPIs de faturamento, margem e inadimplência comparados ao período anterior." },
  { titulo: "Pedidos", texto: "Do orçamento à entrega, com aprovação por perfil, Kanban e ações em lote." },
  { titulo: "Estoque", texto: "Saldos por depósito, reservas automáticas, curva ABC e alertas de ruptura." },
  { titulo: "Logística", texto: "Romaneios, rastreio de entregas, ocorrências e entregas no prazo." },
  { titulo: "Financeiro", texto: "Contas a receber e a pagar, fluxo de caixa projetado e DRE gerencial." },
  { titulo: "Clientes", texto: "Cadastro com CNPJ/CEP automáticos, ficha 360º e controle de crédito." },
  { titulo: "Relatórios", texto: "Relatórios configuráveis com gráficos e exportação em PDF e Excel." },
];

const stack = ["React", "TypeScript", "Express", "PostgreSQL", "Prisma", "Vercel"];

export default function Sistemas() {
  return (
    <>
      <PageHeader
        label="Sistemas"
        title={
          <>
            Sistemas prontos <span className="serif-em">para testar agora.</span>
          </>
        }
        description="Conheça na prática um sistema que desenvolvemos. A demonstração é aberta, sem cadastro, com dados fictícios."
      />

      <SystemsShowcase comLinkPagina={false} />

      <section aria-labelledby="modulos-titulo" className="container-x section-y">
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="label mb-5">Módulos</p>
            <h2 id="modulos-titulo" className="text-3xl font-medium leading-tight tracking-[-0.03em] md:text-4xl">
              ERP para distribuidoras, <span className="text-fog-500">do pedido ao recebimento.</span>
            </h2>
            <p className="mt-6 font-mono text-[11px] uppercase leading-relaxed tracking-[0.12em] text-fog-500">
              {stack.join(" · ")}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <a href={DEMO_ERP} target="_blank" rel="noopener noreferrer" className="btn-primary">
                Ver demonstração ao vivo <ArrowUpRight size={16} aria-hidden="true" />
                <span className="sr-only">(abre em nova aba)</span>
              </a>
              <Link to="/contato" className="btn-ghost">
                Quero um sistema assim
              </Link>
            </div>
          </Reveal>

          <ol className="border-b border-white/[0.08] lg:col-span-7 lg:col-start-6">
            {modulos.map((m, i) => (
              <li key={m.titulo} className="grid gap-1 border-t border-white/[0.08] py-5 sm:grid-cols-[48px_180px_minmax(0,1fr)] sm:gap-4">
                <span className="font-mono text-xs text-fog-500">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="text-lg font-medium tracking-[-0.02em]">{m.titulo}</h3>
                <p className="text-[15px] leading-relaxed text-fog-400">{m.texto}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
