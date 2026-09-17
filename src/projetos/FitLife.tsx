import { Fragment, useState } from "react";
import { Check, Flame, HeartPulse } from "lucide-react";
import ProjectShell from "./ProjectShell";

const display = { fontFamily: '"Barlow Condensed", Impact, sans-serif' };

const schedule: Record<string, { time: string; name: string; coach: string; level: number }[]> = {
  Seg: [
    { time: "06:30", name: "Cross Training", coach: "Bia", level: 3 },
    { time: "12:15", name: "Funcional 30'", coach: "Léo", level: 2 },
    { time: "19:00", name: "Spinning", coach: "Nina", level: 3 },
    { time: "20:15", name: "Yoga Flow", coach: "Duda", level: 1 },
  ],
  Ter: [
    { time: "07:00", name: "Boxe", coach: "Caio", level: 3 },
    { time: "12:15", name: "Mobilidade", coach: "Duda", level: 1 },
    { time: "18:30", name: "HIIT", coach: "Bia", level: 3 },
  ],
  Qua: [
    { time: "06:30", name: "Cross Training", coach: "Léo", level: 3 },
    { time: "18:00", name: "Pilates Solo", coach: "Duda", level: 1 },
    { time: "19:30", name: "Spinning", coach: "Nina", level: 2 },
  ],
  Qui: [
    { time: "07:00", name: "Funcional", coach: "Léo", level: 2 },
    { time: "12:15", name: "Boxe 30'", coach: "Caio", level: 2 },
    { time: "19:00", name: "HIIT", coach: "Bia", level: 3 },
    { time: "20:15", name: "Alongamento", coach: "Duda", level: 1 },
  ],
  Sex: [
    { time: "06:30", name: "Cross Training", coach: "Bia", level: 3 },
    { time: "18:30", name: "Dance Fit", coach: "Nina", level: 2 },
  ],
  Sáb: [
    { time: "09:00", name: "Treino em dupla", coach: "Léo", level: 2 },
    { time: "10:30", name: "Yoga Flow", coach: "Duda", level: 1 },
  ],
};

const plans = [
  { name: "Start", monthly: 99, perks: ["Musculação livre", "Horário comercial", "App de treinos"] },
  { name: "Pro", monthly: 149, perks: ["Tudo do Start", "Aulas coletivas ilimitadas", "Acesso 24h", "Avaliação física mensal"], featured: true },
  { name: "Black", monthly: 229, perks: ["Tudo do Pro", "4 sessões de personal", "Leve um amigo 2x/mês"] },
];

const imcRanges = [
  { max: 18.5, label: "Abaixo do peso", color: "#5AC8FA" },
  { max: 25, label: "Peso saudável", color: "#C6F432" },
  { max: 30, label: "Sobrepeso", color: "#FFC83D" },
  { max: Infinity, label: "Obesidade", color: "#FF5A4E" },
];

const modalities = ["Musculação", "Cross", "Spinning", "Funcional", "Yoga", "Boxe"];

export default function FitLife() {
  const [day, setDay] = useState("Seg");
  const [weight, setWeight] = useState(72);
  const [height, setHeight] = useState(175);
  const [annual, setAnnual] = useState(true);

  const imc = weight / (height / 100) ** 2;
  const range = imcRanges.find((r) => imc < r.max)!;
  const marker = Math.min(100, Math.max(0, ((imc - 15) / (40 - 15)) * 100));

  return (
    <ProjectShell
      title="FitLife"
      fonts="family=Barlow+Condensed:ital,wght@0,600;0,800;1,700;1,800;1,900&family=Barlow:wght@400;500;600"
      className="bg-[#0B0B0B] text-white"
    >
      <style>{`
        @keyframes fl-beat { from { stroke-dashoffset: 600; } to { stroke-dashoffset: 0; } }
        .fl-beat { stroke-dasharray: 600; animation: fl-beat 2.4s linear infinite; }
        html[data-motion="paused"] .fl-beat { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) { .fl-beat { animation: none; stroke-dasharray: none; } }
      `}</style>
      <div style={{ fontFamily: '"Barlow", sans-serif' }}>
        <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <a href="#topo" style={display} className="text-4xl font-black italic tracking-tight">
            FIT<span className="text-[#C6F432]">/</span>LIFE
          </a>
          <nav aria-label="FitLife" className="hidden gap-8 text-sm font-semibold uppercase tracking-wide md:flex">
            <a href="#aulas" className="hover:text-[#C6F432]">Aulas</a>
            <a href="#imc" className="hover:text-[#C6F432]">IMC</a>
            <a href="#planos" className="hover:text-[#C6F432]">Planos</a>
          </nav>
          <a href="#planos" className="-skew-x-12 bg-[#C6F432] px-6 py-3 text-black transition-transform hover:scale-105">
            <span style={display} className="inline-block skew-x-12 text-xl font-extrabold uppercase italic">
              Matricule-se
            </span>
          </a>
        </header>

        <section id="topo" className="relative overflow-hidden">
          <div aria-hidden="true" className="absolute inset-y-0 right-0 w-1/2 bg-[#C6F432] [clip-path:polygon(35%_0,100%_0,100%_100%,0_100%)]" />
          <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-6 pb-16 pt-10 md:grid-cols-[1.3fr_1fr]">
            <div>
              <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#C6F432]">
                <Flame size={16} aria-hidden="true" /> Aberto 24 horas
              </p>
              <h1 style={display} className="mt-4 text-[88px] font-black uppercase italic leading-[0.82] md:text-[150px]">
                Supere
                <br />
                seu{" "}
                <span className="text-transparent" style={{ WebkitTextStroke: "3px #C6F432" }}>
                  limite.
                </span>
              </h1>
              <p className="mt-6 max-w-md text-lg text-[#BDBDBD]">
                Estrutura completa, mais de 40 aulas por semana e professores que acompanham sua evolução de perto.
              </p>
              <dl className="mt-8 flex gap-8">
                {[
                  ["40+", "aulas por semana"],
                  ["12", "professores"],
                  ["24h", "de acesso"],
                ].map(([value, label]) => (
                  <div key={label} className="flex flex-col-reverse">
                    <dt className="text-xs uppercase tracking-wide text-[#9A9A9A]">{label}</dt>
                    <dd style={display} className="text-5xl font-extrabold italic">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="relative -rotate-3 bg-[#0B0B0B] p-6 shadow-[16px_16px_0_#000] ring-2 ring-black">
              <div className="flex items-center justify-between">
                <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-[#9A9A9A]">
                  <HeartPulse size={18} className="text-[#FF5A4E]" aria-hidden="true" /> Treino de hoje
                </p>
                <p style={display} className="text-3xl font-extrabold italic">
                  148 <span className="text-base text-[#9A9A9A]">bpm</span>
                </p>
              </div>
              <svg viewBox="0 0 300 80" className="mt-4 h-20 w-full" aria-hidden="true">
                <path d="M0 40 H300" stroke="#222" strokeWidth="1" />
                <path
                  className="fl-beat"
                  d="M0 40 H70 L82 18 L96 64 L108 10 L120 40 H180 L190 28 L200 52 L210 40 H300"
                  fill="none"
                  stroke="#C6F432"
                  strokeWidth="3"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                {[
                  ["42'", "duração"],
                  ["610", "kcal"],
                  ["8/10", "esforço"],
                ].map(([value, label]) => (
                  <div key={label} className="bg-[#151515] py-3">
                    <p style={display} className="text-3xl font-extrabold italic text-[#C6F432]">{value}</p>
                    <p className="text-xs uppercase text-[#9A9A9A]">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="-rotate-1 overflow-hidden bg-[#C6F432] py-3 text-black">
          <div className="flex w-max animate-marquee whitespace-nowrap">
            {[0, 1, 2, 3].map((copy) => (
              <Fragment key={copy}>
                {modalities.map((m) => (
                  <span key={`${copy}-${m}`} aria-hidden={copy > 0} style={display} className="px-6 text-4xl font-black uppercase italic">
                    {m} <span className="pl-6">✕</span>
                  </span>
                ))}
              </Fragment>
            ))}
          </div>
        </div>

        <section id="aulas" className="mx-auto max-w-6xl px-6 py-20">
          <h2 style={display} className="text-6xl font-black uppercase italic">
            Grade de <span className="text-[#C6F432]">aulas</span>
          </h2>
          <div role="tablist" aria-label="Dia da semana" className="mt-8 flex flex-wrap gap-2">
            {Object.keys(schedule).map((d) => (
              <button
                key={d}
                type="button"
                role="tab"
                aria-selected={day === d}
                onClick={() => setDay(d)}
                className={`-skew-x-12 px-5 py-2.5 transition-colors ${day === d ? "bg-[#C6F432] text-black" : "bg-[#151515] hover:bg-[#222]"}`}
              >
                <span style={display} className="inline-block skew-x-12 text-2xl font-extrabold uppercase italic">{d}</span>
              </button>
            ))}
          </div>
          <ul role="tabpanel" aria-label={`Aulas de ${day}`} className="mt-6 divide-y divide-white/10 border-y border-white/10">
            {schedule[day].map((item) => (
              <li key={item.time + item.name} className="grid grid-cols-[80px_1fr_auto] items-center gap-4 py-4 md:grid-cols-[120px_1fr_140px_120px]">
                <span style={display} className="text-3xl font-extrabold italic text-[#C6F432]">{item.time}</span>
                <span style={display} className="text-3xl font-bold uppercase">{item.name}</span>
                <span className="hidden text-[#9A9A9A] md:block">com {item.coach}</span>
                <span className="flex gap-1" aria-label={`Intensidade ${item.level} de 3`} role="img">
                  {[1, 2, 3].map((n) => (
                    <span key={n} className={`h-4 w-3 -skew-x-12 ${n <= item.level ? "bg-[#C6F432]" : "bg-white/15"}`} />
                  ))}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section id="imc" className="bg-[#151515]">
          <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-2">
            <div>
              <h2 style={display} className="text-6xl font-black uppercase italic">
                Calcule seu <span className="text-[#C6F432]">IMC</span>
              </h2>
              <p className="mt-3 text-[#BDBDBD]">Um ponto de partida. Na avaliação física a gente vai muito além do número.</p>
              <div className="mt-8 flex flex-col gap-6">
                <label className="flex flex-col gap-2">
                  <span className="flex justify-between text-sm font-semibold uppercase tracking-wide">
                    Peso <span style={display} className="text-2xl italic text-[#C6F432]">{weight} kg</span>
                  </span>
                  <input type="range" min={40} max={150} value={weight} onChange={(e) => setWeight(+e.target.value)} className="accent-[#C6F432]" />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="flex justify-between text-sm font-semibold uppercase tracking-wide">
                    Altura <span style={display} className="text-2xl italic text-[#C6F432]">{height} cm</span>
                  </span>
                  <input type="range" min={140} max={210} value={height} onChange={(e) => setHeight(+e.target.value)} className="accent-[#C6F432]" />
                </label>
              </div>
            </div>
            <div className="flex flex-col justify-center gap-6 bg-[#0B0B0B] p-8" aria-live="polite">
              <p className="text-sm uppercase tracking-wide text-[#9A9A9A]">Seu IMC</p>
              <p style={display} className="text-[120px] font-black italic leading-none">
                {imc.toFixed(1).replace(".", ",")}
              </p>
              <p style={{ ...display, color: range.color }} className="text-4xl font-extrabold uppercase italic">
                {range.label}
              </p>
              <div className="relative">
                <div className="flex h-3 overflow-hidden">
                  {imcRanges.map((r) => (
                    <span key={r.label} className="flex-1" style={{ background: r.color }} />
                  ))}
                </div>
                <span
                  aria-hidden="true"
                  className="absolute -top-2 h-7 w-1.5 -translate-x-1/2 bg-white shadow-[0_0_0_3px_#0B0B0B] transition-[left] duration-300"
                  style={{ left: `${marker}%` }}
                />
              </div>
            </div>
          </div>
        </section>

        <section id="planos" className="mx-auto max-w-6xl px-6 py-20">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 style={display} className="text-6xl font-black uppercase italic">
              Escolha seu <span className="text-[#C6F432]">plano</span>
            </h2>
            <div role="group" aria-label="Forma de pagamento" className="flex bg-[#151515] p-1">
              {[
                ["Mensal", false],
                ["Anual −20%", true],
              ].map(([label, value]) => (
                <button
                  key={String(label)}
                  type="button"
                  aria-pressed={annual === value}
                  onClick={() => setAnnual(Boolean(value))}
                  className={`px-4 py-2 text-sm font-semibold uppercase ${annual === value ? "bg-[#C6F432] text-black" : "text-[#BDBDBD]"}`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {plans.map((plan) => {
              const price = annual ? Math.round(plan.monthly * 0.8) : plan.monthly;
              return (
                <article
                  key={plan.name}
                  className={`flex flex-col gap-5 p-7 ${plan.featured ? "bg-[#C6F432] text-black md:-translate-y-4" : "bg-[#151515]"}`}
                >
                  <h3 style={display} className="text-4xl font-black uppercase italic">{plan.name}</h3>
                  <p>
                    <span style={display} className="text-6xl font-extrabold italic">R$ {price}</span>
                    <span className={plan.featured ? "text-black/70" : "text-[#9A9A9A]"}>/mês</span>
                  </p>
                  <ul className="flex flex-col gap-2.5">
                    {plan.perks.map((perk) => (
                      <li key={perk} className="flex items-center gap-2">
                        <Check size={16} aria-hidden="true" /> {perk}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#topo"
                    style={display}
                    className={`mt-auto py-3 text-center text-2xl font-extrabold uppercase italic ${
                      plan.featured ? "bg-black text-[#C6F432]" : "bg-[#C6F432] text-black"
                    }`}
                  >
                    Quero o {plan.name}
                  </a>
                </article>
              );
            })}
          </div>
        </section>

        <footer className="border-t border-white/10 px-6 pb-24 pt-8 text-center text-sm text-[#9A9A9A]">
          <span style={display} className="text-2xl font-black italic text-white">FIT/LIFE</span> · Tatuapé, São Paulo · 24h, todos os dias
        </footer>
      </div>
    </ProjectShell>
  );
}
