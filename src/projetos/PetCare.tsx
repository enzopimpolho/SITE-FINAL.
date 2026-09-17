import { useState } from "react";
import { Bath, BedDouble, Cat, Check, Dog, PawPrint, ShoppingBag, Star, Stethoscope } from "lucide-react";
import ProjectShell from "./ProjectShell";

const display = { fontFamily: '"Fredoka", "Nunito", sans-serif' };

const services = [
  { icon: Bath, title: "Banho & tosa", text: "Produtos hipoalergênicos e secagem sem estresse.", price: "a partir de R$ 59", bg: "#FFE3D3", tilt: "-rotate-2" },
  { icon: Stethoscope, title: "Veterinário", text: "Consultas, vacinas e plantão para emergências.", price: "a partir de R$ 120", bg: "#D8F3DC", tilt: "rotate-1" },
  { icon: BedDouble, title: "Hotelzinho", text: "Diárias com brincadeiras e fotos para o tutor.", price: "a partir de R$ 85", bg: "#E3E8FF", tilt: "-rotate-1" },
  { icon: ShoppingBag, title: "Lojinha", text: "Rações naturais, brinquedos e acessórios.", price: "entrega em 2h", bg: "#FFF0B3", tilt: "rotate-2" },
];

const petOptions = [
  { id: "cao", label: "Cão", icon: Dog },
  { id: "gato", label: "Gato", icon: Cat },
];
const bookingServices = ["Banho", "Banho + tosa", "Consulta", "Vacina"];
const days = ["Hoje", "Amanhã", "Qua 24", "Qui 25", "Sex 26"];

function DogIllustration() {
  return (
    <svg viewBox="0 0 320 320" className="h-full w-full" aria-hidden="true">
      <ellipse cx="88" cy="128" rx="34" ry="62" fill="#8B5A2B" transform="rotate(-22 88 128)" />
      <ellipse cx="232" cy="128" rx="34" ry="62" fill="#8B5A2B" transform="rotate(22 232 128)" />
      <circle cx="160" cy="170" r="95" fill="#F4C27A" />
      <ellipse cx="200" cy="125" rx="34" ry="26" fill="#E0A95B" />
      <ellipse cx="160" cy="210" rx="56" ry="44" fill="#FFF1DC" />
      <circle cx="124" cy="160" r="10" fill="#2B1B12" />
      <circle cx="196" cy="160" r="10" fill="#2B1B12" />
      <circle cx="127" cy="156" r="3.5" fill="#fff" />
      <circle cx="199" cy="156" r="3.5" fill="#fff" />
      <circle cx="104" cy="192" r="12" fill="#FF9F80" opacity="0.55" />
      <circle cx="216" cy="192" r="12" fill="#FF9F80" opacity="0.55" />
      <ellipse cx="160" cy="192" rx="17" ry="12" fill="#2B1B12" />
      <path d="M160 204 q0 16 -17 19 M160 204 q0 16 17 19" stroke="#2B1B12" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M150 224 q10 26 20 0 z" fill="#FF6F91" />
    </svg>
  );
}

export default function PetCare() {
  const [pet, setPet] = useState("cao");
  const [service, setService] = useState(bookingServices[1]);
  const [day, setDay] = useState(days[1]);
  const [confirmed, setConfirmed] = useState(false);

  return (
    <ProjectShell
      title="PetCare"
      fonts="family=Fredoka:wght@500;600;700&family=Nunito:wght@400;600;700"
      className="bg-[#FFF6EC] text-[#2B1B12]"
    >
      <div style={{ fontFamily: '"Nunito", sans-serif' }}>
        <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
          <a href="#inicio" className="flex items-center gap-2.5">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FF7A45] text-white">
              <PawPrint size={22} aria-hidden="true" />
            </span>
            <span style={display} className="text-2xl font-bold">
              PetCare
            </span>
          </a>
          <nav aria-label="PetCare" className="hidden items-center gap-8 font-semibold md:flex">
            <a href="#servicos" className="hover:text-[#FF7A45]">Serviços</a>
            <a href="#agendar" className="hover:text-[#FF7A45]">Agendar</a>
            <a href="#servicos" className="hover:text-[#FF7A45]">Loja</a>
          </nav>
          <a href="#agendar" className="rounded-full bg-[#2B1B12] px-5 py-3 text-sm font-bold text-[#FFF6EC] transition-transform hover:-rotate-2">
            Agendar agora
          </a>
        </header>

        <section id="inicio" className="mx-auto grid max-w-6xl items-center gap-10 px-6 pb-20 pt-6 md:grid-cols-2">
          <div className="flex flex-col items-start gap-6">
            <span className="rounded-full bg-[#D8F3DC] px-4 py-2 text-sm font-bold text-[#2D6A4F]">
              Aberto 7 dias por semana
            </span>
            <h1 style={display} className="text-5xl font-bold leading-[0.95] md:text-7xl">
              <span className="relative inline-block">
                Carinho
                <svg viewBox="0 0 200 20" className="absolute -bottom-2 left-0 w-full" aria-hidden="true">
                  <path d="M2 14 C 40 2, 70 22, 110 10 S 170 4, 198 12" stroke="#FF7A45" strokeWidth="6" fill="none" strokeLinecap="round" />
                </svg>
              </span>{" "}
              de verdade, do banho ao check-up.
            </h1>
            <p className="max-w-md text-lg text-[#6B5446]">
              Pet shop e clínica no mesmo lugar, com uma equipe que trata seu bichinho como da família.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#agendar" className="rounded-full bg-[#FF7A45] px-7 py-4 font-bold text-white shadow-[0_8px_0_#C8521F] transition-transform hover:translate-y-1 hover:shadow-[0_4px_0_#C8521F]">
                Agendar banho
              </a>
              <a href="#servicos" className="rounded-full border-2 border-[#2B1B12] px-7 py-4 font-bold transition-colors hover:bg-[#2B1B12] hover:text-[#FFF6EC]">
                Ver serviços
              </a>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <div className="flex -space-x-3">
                {["#FF7A45", "#2D6A4F", "#6C7BFF", "#F4C27A"].map((color) => (
                  <span key={color} className="h-10 w-10 rounded-full border-4 border-[#FFF6EC]" style={{ background: color }} />
                ))}
              </div>
              <p className="text-sm font-semibold">
                <span className="flex items-center gap-1 text-[#FF7A45]">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} size={14} fill="currentColor" aria-hidden="true" />
                  ))}
                </span>
                Tutores que voltam todo mês
              </p>
            </div>
          </div>

          <div className="relative mx-auto aspect-square w-full max-w-[480px]">
            <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" aria-hidden="true">
              <path d="M320 70c46 40 62 118 38 184s-92 118-168 112S42 314 30 238 44 90 110 56s164-26 210 14z" fill="#FF7A45" />
              <circle cx="345" cy="330" r="38" fill="#2D6A4F" />
              <circle cx="58" cy="70" r="22" fill="#FFD166" />
            </svg>
            <div className="absolute inset-[12%]">
              <DogIllustration />
            </div>
            <div className="absolute -left-2 top-[18%] -rotate-6 rounded-2xl bg-white px-4 py-3 shadow-[0_12px_30px_rgba(43,27,18,0.12)]">
              <p style={display} className="font-semibold">Banho & tosa</p>
              <p className="text-sm text-[#6B5446]">a partir de R$ 59</p>
            </div>
            <div className="absolute -right-2 bottom-[16%] flex rotate-3 items-center gap-2 rounded-2xl bg-[#2B1B12] px-4 py-3 text-[#FFF6EC]">
              <Stethoscope size={18} aria-hidden="true" />
              <p className="text-sm font-bold">Vet de plantão 24h</p>
            </div>
          </div>
        </section>

        <section id="servicos" className="mx-3 rounded-[48px] bg-white px-6 py-20 md:mx-6">
          <div className="mx-auto max-w-6xl">
            <h2 style={display} className="max-w-xl text-4xl font-bold leading-tight md:text-5xl">
              Tudo que seu pet precisa, num só lugar.
            </h2>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {services.map(({ icon: Icon, title, text, price, bg, tilt }) => (
                <article
                  key={title}
                  style={{ background: bg }}
                  className={`${tilt} flex flex-col gap-3 rounded-[32px] p-6 transition-transform duration-300 hover:-translate-y-2 hover:rotate-0`}
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white">
                    <Icon size={26} aria-hidden="true" />
                  </span>
                  <h3 style={display} className="text-2xl font-semibold">{title}</h3>
                  <p className="text-[#6B5446]">{text}</p>
                  <p className="mt-auto pt-4 font-bold">{price}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="agendar" className="mx-auto max-w-6xl px-6 py-20">
          <div className="grid gap-10 rounded-[48px] bg-[#2B1B12] p-8 text-[#FFF6EC] md:grid-cols-[1fr_1.2fr] md:p-12">
            <div className="flex flex-col justify-center gap-4">
              <h2 style={display} className="text-4xl font-bold md:text-5xl">Agende em 30 segundos.</h2>
              <p className="text-[#E8D5C4]">Escolha o pet, o serviço e o dia. A gente confirma pelo WhatsApp.</p>
            </div>

            <div className="rounded-[32px] bg-[#FFF6EC] p-6 text-[#2B1B12]">
              {confirmed ? (
                <div role="status" className="flex h-full flex-col items-center justify-center gap-3 py-10 text-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#D8F3DC] text-[#2D6A4F]">
                    <Check size={32} aria-hidden="true" />
                  </span>
                  <p style={display} className="text-2xl font-bold">Agendado!</p>
                  <p className="text-[#6B5446]">
                    {service} para seu {pet === "cao" ? "cão" : "gato"} — {day.toLowerCase()}.
                  </p>
                  <button type="button" onClick={() => setConfirmed(false)} className="mt-2 font-bold text-[#FF7A45] underline">
                    Fazer outro agendamento
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  <fieldset>
                    <legend className="mb-3 text-sm font-bold uppercase tracking-wide text-[#6B5446]">1. Seu pet</legend>
                    <div className="grid grid-cols-2 gap-3">
                      {petOptions.map(({ id, label, icon: Icon }) => (
                        <button
                          key={id}
                          type="button"
                          aria-pressed={pet === id}
                          onClick={() => setPet(id)}
                          className={`flex items-center justify-center gap-2 rounded-2xl border-2 py-4 font-bold transition-colors ${
                            pet === id ? "border-[#FF7A45] bg-[#FF7A45] text-white" : "border-[#EADBCB] hover:border-[#FF7A45]"
                          }`}
                        >
                          <Icon size={22} aria-hidden="true" />
                          {label}
                        </button>
                      ))}
                    </div>
                  </fieldset>
                  <fieldset>
                    <legend className="mb-3 text-sm font-bold uppercase tracking-wide text-[#6B5446]">2. Serviço</legend>
                    <div className="flex flex-wrap gap-2">
                      {bookingServices.map((item) => (
                        <button
                          key={item}
                          type="button"
                          aria-pressed={service === item}
                          onClick={() => setService(item)}
                          className={`rounded-full px-4 py-2.5 text-sm font-bold transition-colors ${
                            service === item ? "bg-[#2B1B12] text-[#FFF6EC]" : "bg-[#F3E6D8] hover:bg-[#EADBCB]"
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </fieldset>
                  <fieldset>
                    <legend className="mb-3 text-sm font-bold uppercase tracking-wide text-[#6B5446]">3. Dia</legend>
                    <div className="grid grid-cols-5 gap-2">
                      {days.map((item) => (
                        <button
                          key={item}
                          type="button"
                          aria-pressed={day === item}
                          onClick={() => setDay(item)}
                          className={`rounded-2xl px-1 py-3 text-sm font-bold transition-colors ${
                            day === item ? "bg-[#2D6A4F] text-white" : "bg-[#F3E6D8] hover:bg-[#EADBCB]"
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </fieldset>
                  <button
                    type="button"
                    onClick={() => setConfirmed(true)}
                    className="rounded-full bg-[#FF7A45] py-4 font-bold text-white shadow-[0_6px_0_#C8521F] transition-transform hover:translate-y-1 hover:shadow-[0_2px_0_#C8521F]"
                  >
                    Confirmar agendamento
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        <footer className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 border-t-2 border-dashed border-[#EADBCB] px-6 pb-24 pt-8 text-sm font-semibold text-[#6B5446] md:flex-row">
          <span style={display} className="text-lg font-bold text-[#2B1B12]">PetCare</span>
          <span>Pinheiros, São Paulo · Seg a Dom, 8h às 20h</span>
        </footer>
      </div>
    </ProjectShell>
  );
}
