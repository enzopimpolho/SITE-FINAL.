import { useMemo, useState } from "react";
import {
  Bell,
  Boxes,
  LayoutDashboard,
  Search,
  Settings,
  ShoppingCart,
  TrendingDown,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";
import ProjectShell from "./ProjectShell";

const mono = { fontFamily: '"IBM Plex Mono", ui-monospace, monospace' };

type Period = "7 dias" | "30 dias" | "12 meses";

const data: Record<Period, { labels: string[]; values: number[]; kpis: { label: string; value: string; delta: number }[] }> = {
  "7 dias": {
    labels: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
    values: [18, 22, 19, 27, 31, 24, 29],
    kpis: [
      { label: "Receita", value: "R$ 170,4 mil", delta: 8.2 },
      { label: "Pedidos", value: "1.284", delta: 5.1 },
      { label: "Ticket médio", value: "R$ 132,70", delta: 2.9 },
      { label: "Devoluções", value: "1,8%", delta: -0.4 },
    ],
  },
  "30 dias": {
    labels: ["S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8"],
    values: [62, 58, 71, 69, 80, 77, 88, 94],
    kpis: [
      { label: "Receita", value: "R$ 712,9 mil", delta: 12.6 },
      { label: "Pedidos", value: "5.402", delta: 9.8 },
      { label: "Ticket médio", value: "R$ 131,97", delta: 2.5 },
      { label: "Devoluções", value: "2,1%", delta: 0.3 },
    ],
  },
  "12 meses": {
    labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
    values: [410, 380, 460, 490, 520, 505, 560, 610, 590, 650, 720, 840],
    kpis: [
      { label: "Receita", value: "R$ 6,73 mi", delta: 21.4 },
      { label: "Pedidos", value: "61.930", delta: 17.2 },
      { label: "Ticket médio", value: "R$ 108,67", delta: 3.6 },
      { label: "Devoluções", value: "2,4%", delta: -0.6 },
    ],
  },
};

const orders = [
  { id: "#48213", client: "Loja Aurora", total: "R$ 2.340,00", status: "Pago" },
  { id: "#48212", client: "Mercado Bom Preço", total: "R$ 890,50", status: "Pendente" },
  { id: "#48211", client: "Casa Verde Ltda.", total: "R$ 5.120,00", status: "Pago" },
  { id: "#48210", client: "Distribuidora Sul", total: "R$ 1.075,20", status: "Cancelado" },
  { id: "#48209", client: "Empório Central", total: "R$ 3.410,80", status: "Pago" },
  { id: "#48208", client: "Atacado Norte", total: "R$ 760,00", status: "Pendente" },
];

const statusStyle: Record<string, string> = {
  Pago: "bg-[#E3F5EC] text-[#136E4A]",
  Pendente: "bg-[#FCF1DC] text-[#8A5C0A]",
  Cancelado: "bg-[#FBE4E8] text-[#A62A42]",
};

const nav = [
  { label: "Visão geral", icon: LayoutDashboard },
  { label: "Pedidos", icon: ShoppingCart },
  { label: "Clientes", icon: Users },
  { label: "Estoque", icon: Boxes },
  { label: "Financeiro", icon: Wallet },
  { label: "Ajustes", icon: Settings },
];

const goals = [
  { label: "Receita do mês", value: 78 },
  { label: "Novos clientes", value: 54 },
  { label: "Entregas no prazo", value: 96 },
];

const W = 640;
const H = 220;

function AreaChart({ labels, values }: { labels: string[]; values: number[] }) {
  const { line, area, points, max } = useMemo(() => {
    const top = Math.max(...values) * 1.15;
    const pts = values.map((v, i) => [(i / (values.length - 1)) * W, H - (v / top) * H] as const);
    const d = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
    return { line: d, area: `${d} L${W} ${H} L0 ${H} Z`, points: pts, max: top };
  }, [values]);

  return (
    <figure>
      <svg viewBox={`0 0 ${W} ${H + 24}`} className="h-auto w-full overflow-visible" role="img" aria-label={`Receita por período: ${labels.map((l, i) => `${l} ${values[i]}`).join(", ")}`}>
        <defs>
          <linearGradient id="gp-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#5B5BD6" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#5B5BD6" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75, 1].map((f) => (
          <g key={f}>
            <line x1="0" x2={W} y1={H - f * H} y2={H - f * H} stroke="#E5E7EE" strokeDasharray="4 4" />
            <text x="0" y={H - f * H - 6} fontSize="10" fill="#8A8FA0" style={mono}>
              {Math.round(max * f)}
            </text>
          </g>
        ))}
        <path d={area} fill="url(#gp-fill)" />
        <path d={line} fill="none" stroke="#5B5BD6" strokeWidth="2.5" strokeLinejoin="round" />
        {points.map(([x, y], i) => (
          <g key={labels[i]}>
            <circle cx={x} cy={y} r="3.5" fill="#fff" stroke="#5B5BD6" strokeWidth="2" />
            <text x={x} y={H + 18} fontSize="11" textAnchor="middle" fill="#6B7080" style={mono}>
              {labels[i]}
            </text>
          </g>
        ))}
      </svg>
    </figure>
  );
}

export default function GestaoPro() {
  const [period, setPeriod] = useState<Period>("30 dias");
  const [filter, setFilter] = useState("Todos");
  const current = data[period];
  const visibleOrders = filter === "Todos" ? orders : orders.filter((o) => o.status === filter);

  return (
    <ProjectShell
      title="Gestão Pro"
      fonts="family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500"
      className="bg-[#F4F5F8] text-[#14161F]"
    >
      <div className="flex min-h-screen" style={{ fontFamily: '"IBM Plex Sans", sans-serif' }}>
        <aside className="hidden w-60 shrink-0 flex-col border-r border-[#E5E7EE] bg-white p-5 md:flex">
          <p className="flex items-center gap-2 px-2 text-lg font-semibold">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#5B5BD6] text-sm text-white">G</span>
            Gestão Pro
          </p>
          <nav aria-label="Gestão Pro" className="mt-8 flex flex-col gap-1">
            {nav.map(({ label, icon: Icon }, index) => (
              <a
                key={label}
                href="#painel"
                aria-current={index === 0 ? "page" : undefined}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm ${
                  index === 0 ? "bg-[#EEEEFB] font-semibold text-[#3E3EB0]" : "text-[#4A4F60] hover:bg-[#F4F5F8]"
                }`}
              >
                <Icon size={18} aria-hidden="true" />
                {label}
              </a>
            ))}
          </nav>
          <div className="mt-auto rounded-xl bg-[#14161F] p-4 text-white">
            <p className="text-sm font-semibold">Plano Empresa</p>
            <p className="mt-1 text-xs text-[#B4B8C8]">12 de 20 usuários ativos</p>
            <div className="mt-3 h-1.5 rounded-full bg-white/15">
              <div className="h-full w-3/5 rounded-full bg-[#8C8CF0]" />
            </div>
          </div>
        </aside>

        <div id="painel" className="flex min-w-0 flex-1 flex-col">
          <header className="flex flex-wrap items-center gap-4 border-b border-[#E5E7EE] bg-white px-6 py-4">
            <label className="relative min-w-[200px] flex-1">
              <span className="sr-only">Buscar</span>
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8A8FA0]" aria-hidden="true" />
              <input
                type="search"
                placeholder="Buscar pedidos, clientes, produtos…"
                className="w-full rounded-lg border border-[#E5E7EE] bg-[#F4F5F8] py-2.5 pl-9 pr-3 text-sm focus:border-[#5B5BD6] focus:outline-none"
              />
            </label>
            <div role="group" aria-label="Período" className="flex rounded-lg border border-[#E5E7EE] bg-[#F4F5F8] p-1">
              {(Object.keys(data) as Period[]).map((p) => (
                <button
                  key={p}
                  type="button"
                  aria-pressed={period === p}
                  onClick={() => setPeriod(p)}
                  className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
                    period === p ? "bg-white font-semibold shadow-sm" : "text-[#6B7080] hover:text-[#14161F]"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
            <button type="button" aria-label="Notificações" className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-[#E5E7EE]">
              <Bell size={18} aria-hidden="true" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#D1435B]" />
            </button>
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FCE7C8] text-sm font-semibold">
              <span aria-hidden="true">AL</span>
              <span className="sr-only">Conta de Ana Lima</span>
            </span>
          </header>

          <div className="flex flex-col gap-6 p-6">
            <div>
              <h1 className="text-2xl font-semibold">Visão geral</h1>
              <p className="text-sm text-[#6B7080]">Desempenho dos últimos {period}</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {current.kpis.map((kpi) => {
                const good = kpi.label === "Devoluções" ? kpi.delta <= 0 : kpi.delta >= 0;
                const Trend = kpi.delta >= 0 ? TrendingUp : TrendingDown;
                return (
                  <div key={kpi.label} className="rounded-xl border border-[#E5E7EE] bg-white p-5">
                    <p className="text-sm text-[#6B7080]">{kpi.label}</p>
                    <p className="mt-2 text-2xl font-semibold" style={mono}>{kpi.value}</p>
                    <p className={`mt-2 flex items-center gap-1 text-sm font-medium ${good ? "text-[#1F9D6B]" : "text-[#D1435B]"}`}>
                      <Trend size={16} aria-hidden="true" />
                      {kpi.delta > 0 ? "+" : ""}
                      {kpi.delta.toString().replace(".", ",")}%<span className="font-normal text-[#8A8FA0]"> vs. período anterior</span>
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="grid gap-4 xl:grid-cols-[2fr_1fr]">
              <section aria-labelledby="gp-receita" className="rounded-xl border border-[#E5E7EE] bg-white p-5">
                <div className="mb-4 flex items-center justify-between">
                  <h2 id="gp-receita" className="font-semibold">Receita (R$ mil)</h2>
                  <span className="rounded-full bg-[#EEEEFB] px-2.5 py-1 text-xs font-medium text-[#3E3EB0]">{period}</span>
                </div>
                <AreaChart labels={current.labels} values={current.values} />
              </section>

              <section aria-labelledby="gp-metas" className="flex flex-col gap-5 rounded-xl border border-[#E5E7EE] bg-white p-5">
                <h2 id="gp-metas" className="font-semibold">Metas do mês</h2>
                {goals.map((goal) => (
                  <div key={goal.label}>
                    <div className="mb-1.5 flex justify-between text-sm">
                      <span>{goal.label}</span>
                      <span style={mono}>{goal.value}%</span>
                    </div>
                    <div
                      role="progressbar"
                      aria-label={goal.label}
                      aria-valuenow={goal.value}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      className="h-2 rounded-full bg-[#EEF0F4]"
                    >
                      <div className="h-full rounded-full bg-[#5B5BD6]" style={{ width: `${goal.value}%` }} />
                    </div>
                  </div>
                ))}
                <div className="mt-auto rounded-lg bg-[#FCF1DC] p-4 text-sm text-[#8A5C0A]">
                  3 produtos com estoque abaixo do mínimo.
                </div>
              </section>
            </div>

            <section aria-labelledby="gp-pedidos" className="rounded-xl border border-[#E5E7EE] bg-white">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E5E7EE] p-5">
                <h2 id="gp-pedidos" className="font-semibold">Últimos pedidos</h2>
                <div role="group" aria-label="Filtrar por status" className="flex gap-2">
                  {["Todos", "Pago", "Pendente", "Cancelado"].map((s) => (
                    <button
                      key={s}
                      type="button"
                      aria-pressed={filter === s}
                      onClick={() => setFilter(s)}
                      className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                        filter === s ? "border-[#14161F] bg-[#14161F] text-white" : "border-[#E5E7EE] text-[#4A4F60] hover:border-[#B4B8C8]"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="text-xs uppercase text-[#8A8FA0]">
                    <tr>
                      <th scope="col" className="px-5 py-3 font-medium">Pedido</th>
                      <th scope="col" className="px-5 py-3 font-medium">Cliente</th>
                      <th scope="col" className="px-5 py-3 text-right font-medium">Total</th>
                      <th scope="col" className="px-5 py-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visibleOrders.map((order) => (
                      <tr key={order.id} className="border-t border-[#EEF0F4] hover:bg-[#F8F9FB]">
                        <td className="px-5 py-3.5" style={mono}>{order.id}</td>
                        <td className="px-5 py-3.5">{order.client}</td>
                        <td className="px-5 py-3.5 text-right tabular-nums" style={mono}>{order.total}</td>
                        <td className="px-5 py-3.5">
                          <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyle[order.status]}`}>{order.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
            <div className="h-16" />
          </div>
        </div>
      </div>
    </ProjectShell>
  );
}
