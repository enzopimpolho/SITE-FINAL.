import { useState } from "react";
import { Bell, Check, ChevronDown, FileSpreadsheet, Mail, Sparkles, Workflow, Zap } from "lucide-react";
import ProjectShell from "./ProjectShell";

const display = { fontFamily: '"Sora", sans-serif' };

const logos = ["Norte", "Ápice", "Lumen", "Casa Viva", "Orbita", "Tramo"];

const features = [
  { icon: Workflow, title: "Editor visual", text: "Monte fluxos arrastando blocos, sem escrever uma linha de código.", span: "md:col-span-2" },
  { icon: Zap, title: "Gatilhos em tempo real", text: "Formulários, e-mails e webhooks disparam na hora.", span: "" },
  { icon: Sparkles, title: "IA que resume", text: "Classifica pedidos e escreve respostas por você.", span: "" },
  { icon: FileSpreadsheet, title: "+300 integrações", text: "Planilhas, CRMs, ERPs e ferramentas de pagamento conectadas em poucos cliques.", span: "md:col-span-2" },
];

const tiers = [
  { name: "Grátis", monthly: 0, desc: "Para testar a ideia", perks: ["3 fluxos ativos", "500 execuções/mês", "Integrações básicas"] },
  { name: "Time", monthly: 89, desc: "Para equipes pequenas", perks: ["Fluxos ilimitados", "20 mil execuções/mês", "IA inclusa", "Suporte por chat"], featured: true },
  { name: "Empresa", monthly: 349, desc: "Para operações maiores", perks: ["Execuções sob medida", "SSO e auditoria", "Gerente de conta"] },
];

const faq = [
  ["Preciso saber programar?", "Não. Tudo é feito no editor visual. Se quiser, dá para usar código em blocos avançados."],
  ["Posso cancelar quando quiser?", "Sim, sem multa. Seus fluxos ficam salvos por 90 dias caso queira voltar."],
  ["Meus dados ficam seguros?", "Os dados são criptografados em trânsito e em repouso, com servidores no Brasil."],
  ["Existe período de teste?", "O plano Time tem 14 dias grátis, sem pedir cartão."],
];

const nodes = [
  { icon: Mail, label: "Novo e-mail", sub: "Gatilho", tint: "#EDE9FF", color: "#6D4AFF" },
  { icon: Sparkles, label: "Classificar com IA", sub: "Ação", tint: "#FFEDE3", color: "#F2703A" },
  { icon: FileSpreadsheet, label: "Salvar na planilha", sub: "Ação", tint: "#E1F7EE", color: "#1F9D6B" },
  { icon: Bell, label: "Avisar o time", sub: "Ação", tint: "#E6F0FF", color: "#2F6BFF" },
];

export default function SaasLaunch() {
  const [annual, setAnnual] = useState(false);
  const [open, setOpen] = useState<number | null>(0);

  return (
    <ProjectShell
      title="SaaS Launch"
      fonts="family=Sora:wght@400;600;700;800&family=DM+Sans:wght@400;500;700"
      className="bg-[#F6F4FF] text-[#17142B]"
    >
      <style>{`
        @keyframes sl-dash { to { stroke-dashoffset: -24; } }
        .sl-dash { stroke-dasharray: 6 6; animation: sl-dash 0.9s linear infinite; }
        @keyframes sl-float { 50% { transform: translateY(-6px); } }
        .sl-float { animation: sl-float 5s ease-in-out infinite; }
        html[data-motion="paused"] .sl-dash, html[data-motion="paused"] .sl-float { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) { .sl-dash, .sl-float { animation: none; } }
      `}</style>
      <div className="relative overflow-hidden" style={{ fontFamily: '"DM Sans", sans-serif' }}>
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[900px]">
          <div className="absolute -left-40 -top-40 h-[560px] w-[560px] rounded-full bg-[#CFC3FF] opacity-70 blur-[120px]" />
          <div className="absolute -right-32 top-10 h-[480px] w-[480px] rounded-full bg-[#FFD3BE] opacity-70 blur-[120px]" />
          <div className="absolute left-1/3 top-[420px] h-[420px] w-[420px] rounded-full bg-[#C4F1DF] opacity-60 blur-[120px]" />
        </div>

        <header className="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <a href="#topo" style={display} className="flex items-center gap-2 text-xl font-bold">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#17142B] text-white">
              <Zap size={16} aria-hidden="true" />
            </span>
            Fluxa
          </a>
          <nav aria-label="Fluxa" className="hidden gap-8 text-[15px] font-medium text-[#4B4766] md:flex">
            <a href="#recursos" className="hover:text-[#17142B]">Recursos</a>
            <a href="#precos" className="hover:text-[#17142B]">Preços</a>
            <a href="#faq" className="hover:text-[#17142B]">Dúvidas</a>
          </nav>
          <a href="#precos" className="rounded-full bg-[#17142B] px-5 py-2.5 text-sm font-medium text-white transition-transform hover:-translate-y-0.5">
            Começar grátis
          </a>
        </header>

        <section id="topo" className="relative mx-auto max-w-6xl px-6 pb-20 pt-14 text-center">
          <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/60 px-4 py-1.5 text-sm font-medium text-[#4B4766] backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-[#1F9D6B]" /> Novo: agentes de IA dentro dos fluxos
          </p>
          <h1 style={display} className="mx-auto mt-6 max-w-4xl text-5xl font-extrabold leading-[1.05] tracking-tight md:text-7xl">
            Automatize o trabalho repetitivo{" "}
            <span className="bg-gradient-to-r from-[#6D4AFF] via-[#C04BD8] to-[#F2703A] bg-clip-text text-transparent">em minutos.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-[#4B4766]">
            Conecte suas ferramentas e deixe a Fluxa cuidar das tarefas chatas enquanto seu time foca no que importa.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href="#precos" className="rounded-full bg-[#6D4AFF] px-7 py-3.5 font-medium text-white shadow-[0_10px_30px_-10px_#6D4AFF] transition-transform hover:-translate-y-0.5">
              Testar 14 dias grátis
            </a>
            <a href="#recursos" className="rounded-full border border-[#17142B]/10 bg-white/70 px-7 py-3.5 font-medium backdrop-blur hover:bg-white">
              Ver como funciona
            </a>
          </div>

          <div className="mx-auto mt-14 max-w-5xl rounded-3xl border border-white/80 bg-white/50 p-4 shadow-[0_30px_80px_-30px_rgba(60,40,140,0.35)] backdrop-blur-xl md:p-8">
            <div className="mb-6 flex items-center justify-between text-left">
              <p style={display} className="font-semibold">Triagem de pedidos</p>
              <span className="rounded-full bg-[#E1F7EE] px-3 py-1 text-xs font-bold text-[#1F9D6B]">● Ativo · 1.284 execuções hoje</span>
            </div>
            <ol aria-label="Etapas do fluxo" className="flex flex-col items-stretch gap-0 md:flex-row md:items-center">
              {nodes.map((node, i) => (
                <li key={node.label} className="flex flex-col items-center md:flex-1 md:flex-row">
                  <div
                    className="sl-float flex w-full items-center gap-3 rounded-2xl border border-white bg-white p-4 text-left shadow-sm md:w-auto md:flex-1"
                    style={{ animationDelay: `${i * 0.4}s` }}
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={{ background: node.tint, color: node.color }}>
                      <node.icon size={20} aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-xs font-medium uppercase tracking-wide text-[#8A86A3]">{node.sub}</span>
                      <span className="block text-sm font-bold">{node.label}</span>
                    </span>
                  </div>
                  {i < nodes.length - 1 && (
                    <svg aria-hidden="true" className="h-8 w-6 shrink-0 md:h-6 md:w-10" viewBox="0 0 40 24" preserveAspectRatio="none">
                      <path className="sl-dash hidden md:block" d="M0 12 H40" stroke="#6D4AFF" strokeWidth="2" fill="none" />
                      <path className="sl-dash md:hidden" d="M20 0 V24" stroke="#6D4AFF" strokeWidth="2" fill="none" />
                    </svg>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section aria-label="Empresas que usam a Fluxa" className="relative mx-auto max-w-6xl px-6 pb-16">
          <p className="text-center text-sm text-[#8A86A3]">Times de mais de 2.000 empresas automatizam com a Fluxa</p>
          <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
            {logos.map((logo) => (
              <li key={logo} style={display} className="text-2xl font-bold text-[#17142B]/35">{logo}</li>
            ))}
          </ul>
        </section>

        <section id="recursos" className="relative mx-auto max-w-6xl px-6 py-16">
          <h2 style={display} className="max-w-2xl text-4xl font-bold tracking-tight md:text-5xl">
            Tudo que você precisa para parar de copiar e colar.
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {features.map((f) => (
              <article key={f.title} className={`rounded-3xl border border-white bg-white/70 p-7 backdrop-blur ${f.span}`}>
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#17142B] text-white">
                  <f.icon size={20} aria-hidden="true" />
                </span>
                <h3 style={display} className="mt-5 text-xl font-semibold">{f.title}</h3>
                <p className="mt-2 text-[#4B4766]">{f.text}</p>
              </article>
            ))}
            <article className="rounded-3xl bg-[#17142B] p-7 text-white md:col-span-3 md:flex md:items-center md:justify-between">
              <div>
                <p style={display} className="text-5xl font-extrabold">
                  11h<span className="text-[#B9A8FF]">/semana</span>
                </p>
                <p className="mt-2 text-white/70">economizadas em média por pessoa no time.</p>
              </div>
              <div aria-hidden="true" className="mt-6 flex h-24 items-end gap-2 md:mt-0">
                {[30, 45, 40, 60, 70, 85, 100].map((h, i) => (
                  <span key={i} className="w-6 rounded-t-md bg-gradient-to-t from-[#6D4AFF] to-[#F2703A]" style={{ height: `${h}%` }} />
                ))}
              </div>
            </article>
          </div>
        </section>

        <section id="precos" className="relative mx-auto max-w-6xl px-6 py-16 text-center">
          <h2 style={display} className="text-4xl font-bold tracking-tight md:text-5xl">Preço simples, sem surpresa.</h2>
          <div role="group" aria-label="Período de cobrança" className="mx-auto mt-6 inline-flex rounded-full border border-white bg-white/70 p-1 backdrop-blur">
            {[
              ["Mensal", false],
              ["Anual · 2 meses grátis", true],
            ].map(([label, value]) => (
              <button
                key={String(label)}
                type="button"
                aria-pressed={annual === value}
                onClick={() => setAnnual(Boolean(value))}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${annual === value ? "bg-[#17142B] text-white" : "text-[#4B4766]"}`}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="mt-10 grid gap-4 text-left md:grid-cols-3">
            {tiers.map((tier) => {
              const price = annual ? Math.round((tier.monthly * 10) / 12) : tier.monthly;
              return (
                <article
                  key={tier.name}
                  className={`flex flex-col rounded-3xl p-7 ${
                    tier.featured
                      ? "bg-gradient-to-b from-[#6D4AFF] to-[#4B2FD6] text-white shadow-[0_30px_60px_-25px_#6D4AFF]"
                      : "border border-white bg-white/70 backdrop-blur"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h3 style={display} className="text-xl font-semibold">{tier.name}</h3>
                    {tier.featured && <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold">Mais escolhido</span>}
                  </div>
                  <p className={`mt-1 text-sm ${tier.featured ? "text-white/75" : "text-[#8A86A3]"}`}>{tier.desc}</p>
                  <p className="mt-6">
                    <span style={display} className="text-5xl font-extrabold">R$ {price}</span>
                    <span className={tier.featured ? "text-white/75" : "text-[#8A86A3]"}>/mês</span>
                  </p>
                  <ul className="mt-6 flex flex-col gap-3">
                    {tier.perks.map((perk) => (
                      <li key={perk} className="flex items-center gap-2 text-[15px]">
                        <Check size={16} aria-hidden="true" className={tier.featured ? "" : "text-[#6D4AFF]"} /> {perk}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#topo"
                    className={`mt-8 rounded-full py-3 text-center font-medium ${
                      tier.featured ? "bg-white text-[#17142B]" : "bg-[#17142B] text-white"
                    }`}
                  >
                    {tier.monthly === 0 ? "Criar conta" : `Assinar ${tier.name}`}
                  </a>
                </article>
              );
            })}
          </div>
        </section>

        <section id="faq" className="relative mx-auto max-w-3xl px-6 py-16">
          <h2 style={display} className="text-center text-4xl font-bold tracking-tight">Dúvidas frequentes</h2>
          <div className="mt-8 flex flex-col gap-3">
            {faq.map(([q, a], i) => {
              const isOpen = open === i;
              return (
                <div key={q} className="rounded-2xl border border-white bg-white/70 backdrop-blur">
                  <h3>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`faq-${i}`}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-bold"
                    >
                      {q}
                      <ChevronDown size={18} aria-hidden="true" className={`shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                    </button>
                  </h3>
                  <div id={`faq-${i}`} hidden={!isOpen} className="px-6 pb-5 text-[#4B4766]">
                    {a}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <footer className="relative border-t border-[#17142B]/10 px-6 pb-24 pt-8 text-center text-sm text-[#8A86A3]">
          <span style={display} className="font-bold text-[#17142B]">Fluxa</span> · Feito em São Paulo · Berrini
        </footer>
      </div>
    </ProjectShell>
  );
}
