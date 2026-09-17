import { useState } from "react";
import { Check, Minus, Plus } from "lucide-react";
import ProjectShell from "./ProjectShell";

const serif = { fontFamily: '"Cormorant Garamond", Georgia, serif' };

const menu: Record<string, { name: string; description: string; price: number }[]> = {
  Antipasti: [
    { name: "Burrata con pomodori", description: "Burrata cremosa, tomates assados e manjericão fresco.", price: 58 },
    { name: "Carpaccio di manzo", description: "Filé em lâminas, rúcula, parmesão e alcaparras.", price: 52 },
    { name: "Bruschetta della casa", description: "Pão de fermentação natural, tomate e azeite.", price: 34 },
  ],
  Primi: [
    { name: "Tagliatelle al ragù", description: "Massa fresca e ragù de cozimento lento, seis horas.", price: 74 },
    { name: "Cacio e pepe", description: "Tonnarelli, pecorino romano e pimenta moída na hora.", price: 68 },
    { name: "Ravioli di zucca", description: "Recheio de abóbora, manteiga noisette e sálvia.", price: 72 },
    { name: "Risotto ai funghi", description: "Arroz carnaroli, cogumelos frescos e secos.", price: 79 },
  ],
  Secondi: [
    { name: "Ossobuco alla milanese", description: "Empanado na manteiga, limão siciliano e rúcula.", price: 118 },
    { name: "Pesce all'acqua pazza", description: "Peixe do dia, tomate-cereja, azeitonas e ervas.", price: 96 },
    { name: "Pollo al mattone", description: "Frango crocante sob tijolo, batatas ao alecrim.", price: 82 },
  ],
  Dolci: [
    { name: "Tiramisù", description: "Receita de família, montado na hora.", price: 32 },
    { name: "Panna cotta", description: "Baunilha de Madagascar e frutas vermelhas.", price: 29 },
    { name: "Cannoli siciliani", description: "Massa crocante e ricota com pistache.", price: 27 },
  ],
};

const times = ["19:00", "19:30", "20:00", "20:30", "21:00", "21:30"];

function PastaPlate() {
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden="true">
      <circle cx="100" cy="100" r="78" fill="#FBF6EE" stroke="#1E1410" strokeWidth="1.5" />
      <circle cx="100" cy="100" r="62" fill="none" stroke="#6B1E2B" strokeWidth="1" strokeDasharray="2 4" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <path
          key={i}
          d={`M${70 + i * 3} ${88 + i * 4} q30 -${22 - i * 2} 60 ${i * 2}`}
          stroke="#E3B04B"
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
        />
      ))}
      <circle cx="92" cy="96" r="7" fill="#B23A2E" />
      <circle cx="112" cy="104" r="6" fill="#B23A2E" />
      <path d="M118 80 q10 -6 14 4 q-8 6 -14 -4z" fill="#5B6B2F" />
    </svg>
  );
}

export default function BellaItalia() {
  const [tab, setTab] = useState("Primi");
  const [guests, setGuests] = useState(2);
  const [time, setTime] = useState("20:00");
  const [booked, setBooked] = useState(false);

  return (
    <ProjectShell
      title="Bella Itália"
      fonts="family=Cormorant+Garamond:ital,wght@0,500;0,600;1,400;1,500&family=Jost:wght@400;500"
      className="bg-[#F3EBDD] text-[#1E1410]"
    >
      <div style={{ fontFamily: '"Jost", sans-serif' }}>
        <div className="border-b border-[#1E1410]/20">
          <div className="mx-auto flex max-w-6xl justify-between px-6 py-2 text-xs uppercase tracking-[0.2em] text-[#7A6A5C]">
            <span>Terça a domingo · 12h às 23h</span>
            <span className="hidden sm:inline">Vila Madalena · São Paulo</span>
          </div>
        </div>

        <header className="mx-auto max-w-6xl px-6 pt-8 text-center">
          <div className="border-y-[3px] border-double border-[#1E1410] py-4">
            <p style={serif} className="text-6xl italic leading-none md:text-8xl">
              Bella Itália
            </p>
            <p className="mt-2 text-xs uppercase tracking-[0.35em] text-[#6B1E2B]">Cucina di famiglia dal 1998</p>
          </div>
          <nav aria-label="Bella Itália" className="flex justify-center gap-8 py-4 text-sm uppercase tracking-[0.2em]">
            <a href="#cardapio" className="hover:text-[#6B1E2B]">Cardápio</a>
            <a href="#historia" className="hover:text-[#6B1E2B]">História</a>
            <a href="#reservas" className="hover:text-[#6B1E2B]">Reservas</a>
          </nav>
        </header>

        <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 md:grid-cols-[1.3fr_1fr]">
          <div className="flex flex-col gap-6">
            <h1 style={serif} className="text-6xl font-medium leading-[0.92] md:text-[104px]">
              La vera cucina, <em className="text-[#6B1E2B]">sem pressa.</em>
            </h1>
            <p className="max-w-md text-lg leading-relaxed text-[#5A4A3E]">
              Massas abertas à mão todas as manhãs, molhos de cozimento lento e uma carta de vinhos pensada
              para dividir.
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <a href="#reservas" className="bg-[#6B1E2B] px-8 py-4 text-sm uppercase tracking-[0.2em] text-[#F3EBDD] transition-colors hover:bg-[#4E1520]">
                Reservar mesa
              </a>
              <a href="#cardapio" style={serif} className="text-xl italic underline decoration-[#6B1E2B] underline-offset-4">
                ver o cardápio
              </a>
            </div>
          </div>

          <div className="relative mx-auto aspect-square w-full max-w-[380px]">
            <svg viewBox="0 0 300 300" className="absolute inset-0 h-full w-full motion-safe:animate-[spin_40s_linear_infinite]" aria-hidden="true">
              <defs>
                <path id="stamp-circle" d="M150 150 m-128 0 a128 128 0 1 1 256 0 a128 128 0 1 1 -256 0" />
              </defs>
              <text fontSize="17" letterSpacing="6" fill="#6B1E2B" style={{ fontFamily: '"Jost", sans-serif' }}>
                <textPath href="#stamp-circle">FATTO A MANO · PASTA FRESCA · VINO NATURALE · </textPath>
              </text>
            </svg>
            <div className="absolute inset-[16%]">
              <PastaPlate />
            </div>
          </div>
        </section>

        <section id="cardapio" className="border-t border-[#1E1410]/20">
          <div className="mx-auto max-w-4xl px-6 py-20">
            <div className="flex flex-col items-center gap-2 text-center">
              <p className="text-xs uppercase tracking-[0.35em] text-[#6B1E2B]">La carta</p>
              <h2 style={serif} className="text-5xl italic">O cardápio</h2>
            </div>

            <div role="tablist" aria-label="Seções do cardápio" className="mt-10 flex justify-center gap-2 border-b border-[#1E1410]/20">
              {Object.keys(menu).map((name) => (
                <button
                  key={name}
                  type="button"
                  role="tab"
                  aria-selected={tab === name}
                  onClick={() => setTab(name)}
                  style={serif}
                  className={`-mb-px border-b-2 px-4 pb-3 text-2xl italic transition-colors ${
                    tab === name ? "border-[#6B1E2B] text-[#6B1E2B]" : "border-transparent text-[#7A6A5C] hover:text-[#1E1410]"
                  }`}
                >
                  {name}
                </button>
              ))}
            </div>

            <ul role="tabpanel" aria-label={tab} className="mt-10 flex flex-col gap-7">
              {menu[tab].map((item) => (
                <li key={item.name}>
                  <div className="flex items-baseline gap-3">
                    <h3 style={serif} className="text-2xl font-semibold">{item.name}</h3>
                    <span aria-hidden="true" className="flex-1 border-b-2 border-dotted border-[#1E1410]/30" />
                    <span style={serif} className="text-2xl">R$ {item.price}</span>
                  </div>
                  <p className="mt-1 text-[#5A4A3E]">{item.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="historia" className="bg-[#5B6B2F] text-[#F3EBDD]">
          <div className="mx-auto max-w-4xl px-6 py-20 text-center">
            <p style={serif} className="text-4xl italic leading-snug md:text-5xl">
              “A massa é aberta à mão todas as manhãs, do jeito que a nonna Lucia ensinou.”
            </p>
            <p className="mt-6 text-xs uppercase tracking-[0.35em] text-[#E4DCC4]">Chef Marco Bellini</p>
          </div>
        </section>

        <section id="reservas" className="mx-auto max-w-6xl px-6 py-20">
          <div className="grid gap-10 border-[3px] border-double border-[#1E1410] p-8 md:grid-cols-2 md:p-12">
            <div className="flex flex-col justify-center gap-3">
              <p className="text-xs uppercase tracking-[0.35em] text-[#6B1E2B]">Prenotazioni</p>
              <h2 style={serif} className="text-5xl italic">Reserve sua mesa</h2>
              <p className="text-[#5A4A3E]">Mesas para jantar, de terça a domingo. Para grupos acima de 12, fale com a gente.</p>
            </div>

            {booked ? (
              <div role="status" className="flex flex-col items-center justify-center gap-3 text-center">
                <Check size={36} className="text-[#5B6B2F]" aria-hidden="true" />
                <p style={serif} className="text-3xl italic">Grazie!</p>
                <p className="text-[#5A4A3E]">
                  Mesa para {guests} {guests === 1 ? "pessoa" : "pessoas"} às {time}.
                </p>
                <button type="button" onClick={() => setBooked(false)} className="text-sm uppercase tracking-[0.2em] text-[#6B1E2B] underline">
                  Alterar reserva
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between border-b border-[#1E1410]/20 pb-4">
                  <span className="text-sm uppercase tracking-[0.2em]">Pessoas</span>
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      aria-label="Menos uma pessoa"
                      onClick={() => setGuests((g) => Math.max(1, g - 1))}
                      className="flex h-11 w-11 items-center justify-center border border-[#1E1410] hover:bg-[#1E1410] hover:text-[#F3EBDD]"
                    >
                      <Minus size={16} aria-hidden="true" />
                    </button>
                    <span style={serif} className="w-8 text-center text-3xl" aria-live="polite">
                      {guests}
                    </span>
                    <button
                      type="button"
                      aria-label="Mais uma pessoa"
                      onClick={() => setGuests((g) => Math.min(12, g + 1))}
                      className="flex h-11 w-11 items-center justify-center border border-[#1E1410] hover:bg-[#1E1410] hover:text-[#F3EBDD]"
                    >
                      <Plus size={16} aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <fieldset>
                  <legend className="mb-3 text-sm uppercase tracking-[0.2em]">Horário</legend>
                  <div className="grid grid-cols-3 gap-2">
                    {times.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        aria-pressed={time === slot}
                        onClick={() => setTime(slot)}
                        style={serif}
                        className={`border py-2.5 text-xl transition-colors ${
                          time === slot ? "border-[#6B1E2B] bg-[#6B1E2B] text-[#F3EBDD]" : "border-[#1E1410]/30 hover:border-[#1E1410]"
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </fieldset>
                <button
                  type="button"
                  onClick={() => setBooked(true)}
                  className="bg-[#6B1E2B] py-4 text-sm uppercase tracking-[0.2em] text-[#F3EBDD] transition-colors hover:bg-[#4E1520]"
                >
                  Confirmar reserva
                </button>
              </div>
            )}
          </div>
        </section>

        <footer className="border-t border-[#1E1410]/20 pb-24 pt-8 text-center text-xs uppercase tracking-[0.3em] text-[#7A6A5C]">
          Bella Itália · Vila Madalena · São Paulo
        </footer>
      </div>
    </ProjectShell>
  );
}
