import {
  ArrowUpRight,
  BarChart3,
  Boxes,
  FileText,
  LayoutDashboard,
  ShoppingCart,
  Truck,
  Users,
  Wallet,
} from "lucide-react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import CtaBanner from "../components/CtaBanner";

const DEMO_URL = "https://nextgen-erp-eosin.vercel.app/demo";

const modulos = [
  { icon: LayoutDashboard, titulo: "Visão Geral", texto: "KPIs de faturamento, margem e inadimplência comparados ao período anterior." },
  { icon: ShoppingCart, titulo: "Pedidos", texto: "Do orçamento à entrega, com aprovação por perfil, Kanban e ações em lote." },
  { icon: Boxes, titulo: "Estoque", texto: "Saldos por depósito, reservas automáticas, curva ABC e alertas de ruptura." },
  { icon: Truck, titulo: "Logística", texto: "Romaneios, rastreio de entregas, ocorrências e indicador de entregas no prazo." },
  { icon: Wallet, titulo: "Financeiro", texto: "Contas a receber e a pagar, fluxo de caixa projetado e DRE gerencial." },
  { icon: Users, titulo: "Clientes", texto: "Cadastro com CNPJ/CEP automáticos, ficha 360º e controle de crédito." },
  { icon: FileText, titulo: "Relatórios", texto: "Relatórios configuráveis com gráficos e exportação em PDF e Excel." },
];

const destaques = [
  "Perfis de acesso por área: vendas, estoque, financeiro, logística e gestão",
  "Números que batem entre todos os módulos",
  "Funciona no computador e no celular, com tema claro e escuro",
  "Seguro: login com renovação de sessão e dados na nuvem",
];

/** Miniatura estilizada do painel, sem imagens pesadas. */
function PreviaPainel() {
  const kpis = [
    ["Faturamento", "R$ 16,4 mi", "+70%"],
    ["Ticket médio", "R$ 34,1 mil", "+8%"],
    ["Pedidos", "480", "+57%"],
    ["Inadimplência", "6,4%", "-1,2 p.p."],
  ];
  const barras = [38, 52, 45, 61, 57, 72, 66, 80, 74, 88, 83, 95];
  return (
    <div aria-hidden className="overflow-hidden rounded-[20px] border border-white/10 bg-ink-950/80 shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
      <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="ml-3 font-mono text-[11px] text-fog-500">nextgen-erp · visão geral</span>
      </div>
      <div className="grid gap-3 p-4 sm:grid-cols-4">
        {kpis.map(([rotulo, valor, variacao]) => (
          <div key={rotulo} className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
            <p className="text-[11px] text-fog-400">{rotulo}</p>
            <p className="mt-1 text-lg font-medium text-fog-50">{valor}</p>
            <p className="text-[11px] text-accent-ink">{variacao}</p>
          </div>
        ))}
      </div>
      <div className="mx-4 mb-4 flex h-32 items-end gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-3">
        {barras.map((h, i) => (
          <span key={i} className="flex-1 rounded-t bg-accent/80" style={{ height: `${h}%` }} />
        ))}
      </div>
    </div>
  );
}

export default function Sistemas() {
  return (
    <>
      <PageHeader
        label="Sistemas"
        title={
          <>
            Sistemas prontos para <span className="serif-em">testar agora.</span>
          </>
        }
        description="Conheça na prática os sistemas que desenvolvemos. As demonstrações são abertas, sem cadastro e sem senha, com dados fictícios."
      />

      <section aria-labelledby="erp" className="container-x pb-[72px] md:pb-24 lg:pb-[120px]">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-5">
            <p className="label mb-4">ERP para distribuidoras</p>
            <h2 id="erp" className="h-display">
              Nextgen <span className="serif-em">ERP</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-fog-300">
              Gestão integrada de vendas, estoque, logística e finanças em um só lugar. Acompanhe o pedido
              desde o orçamento até o recebimento, com indicadores em tempo real para decidir melhor.
            </p>
            <ul className="mt-6 flex flex-col gap-2.5 text-fog-300">
              {destaques.map((d) => (
                <li key={d} className="flex gap-3">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-ink" />
                  {d}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={DEMO_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
                Ver demonstração ao vivo <ArrowUpRight className="h-5 w-5" aria-hidden />
              </a>
              <Link to="/contato" className="btn-ghost">
                Quero um sistema assim
              </Link>
            </div>          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-7">
            <PreviaPainel />
          </Reveal>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {modulos.map(({ icon: Icone, titulo, texto }, i) => (
            <Reveal key={titulo} delay={i * 0.04}>
              <div className="h-full rounded-[20px] border border-white/10 bg-white/[0.02] p-6">
                <Icone className="h-6 w-6 text-accent-ink" aria-hidden />
                <h3 className="mt-4 text-lg font-medium text-fog-50">{titulo}</h3>
                <p className="mt-2 text-fog-400">{texto}</p>
              </div>
            </Reveal>
          ))}
          <Reveal delay={0.3}>
            <a
              href={DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col justify-between rounded-[20px] border border-accent/40 bg-accent/10 p-6 transition hover:border-accent-ink"
            >
              <BarChart3 className="h-6 w-6 text-accent-ink" aria-hidden />
              <span className="mt-4 text-lg font-medium text-fog-50">
                Explore todos os módulos na demonstração
                <ArrowUpRight className="ml-1 inline h-5 w-5 transition group-hover:translate-x-0.5" aria-hidden />
              </span>
            </a>
          </Reveal>
        </div>
      </section>

      <CtaBanner
        title={
          <>
            Precisa de um sistema <span className="serif-em">sob medida?</span>
          </>
        }
        description="Adaptamos o Nextgen ERP à sua operação ou criamos um sistema do zero para o seu negócio."
      />
    </>
  );
}
