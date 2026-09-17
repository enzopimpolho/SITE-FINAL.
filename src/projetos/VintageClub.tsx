import { useState } from "react";
import { Check, Scissors } from "lucide-react";
import ProjectShell from "./ProjectShell";

const display = { fontFamily: '"Bebas Neue", Impact, sans-serif' };
const serif = { fontFamily: '"Libre Baskerville", Georgia, serif' };

const prices = [
  { name: "Corte clássico", detail: "Tesoura e máquina, lavagem inclusa", price: 70 },
  { name: "Barba na navalha", detail: "Toalha quente e óleo pós-barba", price: 55 },
  { name: "Corte + barba", detail: "O ritual completo", price: 110 },
  { name: "Pigmentação", detail: "Barba ou cabelo", price: 45 },
  { name: "Sobrancelha", detail: "Na navalha ou pinça", price: 25 },
  { name: "Toalha quente", detail: "Relaxamento facial de 15 minutos", price: 40 },
];

const barbers = [
  { name: "Otávio", initials: "O", specialty: "Cortes clássicos" },
  { name: "Rafa", initials: "R", specialty: "Degradê e desenhos" },
  { name: "Téo", initials: "T", specialty: "Barba e navalha" },
];

const slots = ["10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00", "18:00"];
const takenSlots = ["12:00", "16:00"];

function BarberPole({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`flex flex-col items-center ${className}`}>
      <span className="h-5 w-10 rounded-t-full bg-[#C9A45C]" />
      <span
        className="vc-pole h-56 w-7 border-x-2 border-[#C9A45C]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-45deg, #EFE6D2 0 10px, #9E2B25 10px 20px, #EFE6D2 20px 30px, #1F4A8A 30px 40px)",
          backgroundSize: "40px 40px",
          animation: "vc-pole 1.6s linear infinite",
        }}
      />
      <span className="h-5 w-10 rounded-b-full bg-[#C9A45C]" />
    </div>
  );
}

function Emblem() {
  return (
    <div className="relative mx-auto h-44 w-44">
      <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden="true">
        <defs>
          <path id="vc-top" d="M30 100 a70 70 0 0 1 140 0" />
          <path id="vc-bottom" d="M36 104 a64 64 0 0 0 128 0" />
        </defs>
        <circle cx="100" cy="100" r="96" fill="none" stroke="#C9A45C" strokeWidth="2" />
        <circle cx="100" cy="100" r="88" fill="none" stroke="#C9A45C" strokeWidth="0.75" />
        <circle cx="100" cy="100" r="50" fill="#0A1814" stroke="#C9A45C" strokeWidth="1.5" />
        <text fill="#EFE6D2" fontSize="22" letterSpacing="5" style={display}>
          <textPath href="#vc-top" startOffset="50%" textAnchor="middle">VINTAGE CLUB</textPath>
        </text>
        <text fill="#C9A45C" fontSize="14" letterSpacing="6" style={display}>
          <textPath href="#vc-bottom" startOffset="50%" textAnchor="middle">EST · 2012 · SP</textPath>
        </text>
      </svg>
      <Scissors className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[#C9A45C]" size={40} aria-hidden="true" />
    </div>
  );
}

export default function VintageClub() {
  const [barber, setBarber] = useState(barbers[0].name);
  const [slot, setSlot] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  return (
    <ProjectShell
      title="Vintage Club"
      fonts="family=Bebas+Neue&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400"
      className="bg-[#0F241E] text-[#EFE6D2]"
    >
      <style>{`
        @keyframes vc-pole { to { background-position: 0 40px; } }
        html[data-motion="paused"] .vc-pole { animation-play-state: paused !important; }
        @media (prefers-reduced-motion: reduce) { .vc-pole { animation: none !important; } }
      `}</style>
      <div style={serif}>
        <header className="border-b border-[#C9A45C]/40">
          <nav aria-label="Vintage Club" className="mx-auto grid max-w-6xl grid-cols-[1fr_auto_1fr] items-center gap-6 px-6 py-5 text-lg tracking-[0.2em]" style={display}>
            <div className="flex gap-8">
              <a href="#precos" className="hover:text-[#C9A45C]">Serviços</a>
              <a href="#agendar" className="hidden hover:text-[#C9A45C] sm:inline">Barbeiros</a>
            </div>
            <a href="#topo" className="flex items-center gap-2 text-2xl text-[#C9A45C]">
              <Scissors size={20} aria-hidden="true" /> Vintage Club
            </a>
            <div className="flex justify-end gap-8">
              <a href="#horarios" className="hidden hover:text-[#C9A45C] sm:inline">Horários</a>
              <a href="#agendar" className="hover:text-[#C9A45C]">Agendar</a>
            </div>
          </nav>
        </header>

        <section
          id="topo"
          className="relative overflow-hidden bg-[repeating-conic-gradient(from_-90deg_at_50%_100%,rgba(201,164,92,0.07)_0deg_5deg,transparent_5deg_10deg)] px-6 pb-24 pt-16 text-center"
        >
          <BarberPole className="absolute left-[6%] top-24 hidden lg:flex" />
          <BarberPole className="absolute right-[6%] top-24 hidden lg:flex" />

          <Emblem />
          <h1 style={display} className="mt-8 text-7xl leading-[0.9] tracking-[0.04em] md:text-[140px]">
            Corte clássico.
            <br />
            <span className="text-[#C9A45C]">Conversa boa.</span>
          </h1>
          <div className="mx-auto mt-6 flex max-w-xl items-center gap-4">
            <span className="h-px flex-1 bg-[#C9A45C]/60" />
            <p className="italic text-[#D8CDB5]">Barbearia de bairro desde 2012</p>
            <span className="h-px flex-1 bg-[#C9A45C]/60" />
          </div>
          <a
            href="#agendar"
            style={display}
            className="mt-10 inline-flex border-2 border-[#C9A45C] px-10 py-4 text-2xl tracking-[0.2em] text-[#C9A45C] transition-colors hover:bg-[#C9A45C] hover:text-[#0F241E]"
          >
            Agendar horário
          </a>
        </section>

        <section id="precos" className="bg-[#0A1814] px-6 py-20">
          <div className="relative mx-auto max-w-3xl border-4 border-double border-[#C9A45C] p-8 md:p-14">
            {["-left-2 -top-2", "-right-2 -top-2", "-bottom-2 -left-2", "-bottom-2 -right-2"].map((pos) => (
              <span key={pos} aria-hidden="true" className={`absolute ${pos} h-4 w-4 rotate-45 bg-[#C9A45C]`} />
            ))}
            <h2 style={display} className="text-center text-6xl tracking-[0.1em]">Tabela de preços</h2>
            <p className="mb-10 text-center text-sm italic text-[#D8CDB5]">Pagamento em dinheiro, cartão ou Pix</p>
            <ul className="flex flex-col gap-6">
              {prices.map((item) => (
                <li key={item.name}>
                  <div className="flex items-baseline gap-3">
                    <h3 style={display} className="text-3xl tracking-[0.06em]">{item.name}</h3>
                    <span aria-hidden="true" className="flex-1 border-b-2 border-dotted border-[#C9A45C]/50" />
                    <span style={display} className="text-3xl text-[#C9A45C]">R$ {item.price}</span>
                  </div>
                  <p className="text-sm italic text-[#D8CDB5]">{item.detail}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="agendar" className="mx-auto max-w-6xl px-6 py-20">
          <h2 style={display} className="text-center text-6xl tracking-[0.1em]">
            Escolha sua <span className="text-[#C9A45C]">cadeira</span>
          </h2>

          {confirmed && slot ? (
            <div role="status" className="mx-auto mt-10 flex max-w-md flex-col items-center gap-3 border-2 border-[#C9A45C] p-10 text-center">
              <Check size={36} className="text-[#C9A45C]" aria-hidden="true" />
              <p style={display} className="text-4xl tracking-[0.08em]">Horário reservado</p>
              <p className="italic text-[#D8CDB5]">
                Com {barber}, às {slot}. Chegue 5 minutos antes para o café.
              </p>
              <button
                type="button"
                onClick={() => {
                  setConfirmed(false);
                  setSlot(null);
                }}
                className="mt-2 text-sm underline"
              >
                Remarcar
              </button>
            </div>
          ) : (
            <>
              <fieldset className="mt-10">
                <legend className="sr-only">Barbeiro</legend>
                <div className="grid gap-4 md:grid-cols-3">
                  {barbers.map((person) => {
                    const selected = barber === person.name;
                    return (
                      <button
                        key={person.name}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => setBarber(person.name)}
                        className={`flex items-center gap-4 border-2 p-5 text-left transition-colors ${
                          selected ? "border-[#C9A45C] bg-[#C9A45C]/10" : "border-[#C9A45C]/30 hover:border-[#C9A45C]/70"
                        }`}
                      >
                        <span
                          style={display}
                          className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-[#C9A45C] text-4xl text-[#C9A45C]"
                        >
                          {person.initials}
                        </span>
                        <span>
                          <span style={display} className="block text-3xl tracking-[0.06em]">{person.name}</span>
                          <span className="text-sm italic text-[#D8CDB5]">{person.specialty}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <fieldset id="horarios" className="mt-8">
                <legend style={display} className="mb-4 text-2xl tracking-[0.1em] text-[#C9A45C]">
                  Horários de hoje com {barber}
                </legend>
                <div className="grid grid-cols-4 gap-3 md:grid-cols-8">
                  {slots.map((time) => {
                    const taken = takenSlots.includes(time);
                    return (
                      <button
                        key={time}
                        type="button"
                        disabled={taken}
                        aria-pressed={slot === time}
                        onClick={() => setSlot(time)}
                        style={display}
                        className={`border py-3 text-2xl tracking-[0.06em] transition-colors disabled:cursor-not-allowed disabled:line-through disabled:opacity-40 ${
                          slot === time ? "border-[#C9A45C] bg-[#C9A45C] text-[#0F241E]" : "border-[#C9A45C]/40 hover:border-[#C9A45C]"
                        }`}
                      >
                        {time}
                        {taken && <span className="sr-only"> (ocupado)</span>}
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <div className="mt-8 flex justify-center">
                <button
                  type="button"
                  disabled={!slot}
                  onClick={() => setConfirmed(true)}
                  style={display}
                  className="border-2 border-[#C9A45C] bg-[#C9A45C] px-12 py-4 text-2xl tracking-[0.2em] text-[#0F241E] transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {slot ? `Confirmar ${slot}` : "Escolha um horário"}
                </button>
              </div>
            </>
          )}
        </section>

        <footer className="border-t border-[#C9A45C]/40 px-6 pb-24 pt-8 text-center">
          <p style={display} className="text-2xl tracking-[0.2em] text-[#C9A45C]">Vintage Club</p>
          <p className="mt-1 text-sm italic text-[#D8CDB5]">Terça a sábado, 10h às 19h · Mooca, São Paulo</p>
        </footer>
      </div>
    </ProjectShell>
  );
}
