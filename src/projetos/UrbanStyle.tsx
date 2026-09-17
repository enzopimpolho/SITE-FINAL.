import { Fragment, useState } from "react";
import { ArrowRight, ShoppingBag } from "lucide-react";
import ProjectShell from "./ProjectShell";

const display = { fontFamily: '"Anton", Impact, sans-serif' };
const mono = { fontFamily: '"Space Mono", ui-monospace, monospace' };

type Kind = "hoodie" | "tee" | "cargo";

function Garment({ kind, color }: { kind: Kind; color: string }) {
  const stroke = "#0A0A0A";
  return (
    <svg viewBox="0 0 200 230" className="h-full w-full" aria-hidden="true">
      {kind === "hoodie" && (
        <g stroke={stroke} strokeWidth="3" strokeLinejoin="round">
          <path d="M40 58 l32 -12 h56 l32 12 l28 62 l-24 10 l-14 -32 v112 h-100 v-112 l-14 32 l-24 -10 z" fill={color} />
          <path d="M70 48 q30 -40 60 0 l-6 20 q-24 14 -48 0 z" fill={color} />
          <rect x="68" y="150" width="64" height="34" rx="6" fill="rgba(0,0,0,0.12)" />
          <path d="M92 66 v28 M108 66 v28" />
        </g>
      )}
      {kind === "tee" && (
        <g stroke={stroke} strokeWidth="3" strokeLinejoin="round">
          <path d="M48 44 l32 -14 q20 16 40 0 l32 14 l28 42 l-26 14 l-12 -18 v124 h-84 v-124 l-12 18 l-26 -14 z" fill={color} />
          <path d="M80 30 q20 16 40 0" fill="none" />
          <text x="100" y="130" textAnchor="middle" fontSize="22" fill={stroke} stroke="none" style={display}>
            URBAN
          </text>
        </g>
      )}
      {kind === "cargo" && (
        <g stroke={stroke} strokeWidth="3" strokeLinejoin="round">
          <path d="M58 18 h84 l12 196 h-44 l-10 -124 l-10 124 h-44 z" fill={color} />
          <path d="M58 34 h84" />
          <rect x="50" y="96" width="26" height="36" rx="3" fill="rgba(0,0,0,0.15)" />
          <rect x="124" y="96" width="26" height="36" rx="3" fill="rgba(0,0,0,0.15)" />
        </g>
      )}
    </svg>
  );
}

const products: { name: string; price: number; kind: Kind; colors: { name: string; hex: string }[] }[] = [
  {
    name: "Moletom Oversized",
    price: 289,
    kind: "hoodie",
    colors: [
      { name: "Preto", hex: "#1C1C1C" },
      { name: "Ácido", hex: "#D4FF00" },
      { name: "Areia", hex: "#C9C3B6" },
    ],
  },
  {
    name: "Camiseta Heavy",
    price: 129,
    kind: "tee",
    colors: [
      { name: "Off-white", hex: "#F5F5F2" },
      { name: "Vermelho", hex: "#FF3B1F" },
      { name: "Grafite", hex: "#5A5A5A" },
    ],
  },
  {
    name: "Calça Cargo",
    price: 259,
    kind: "cargo",
    colors: [
      { name: "Oliva", hex: "#5B6146" },
      { name: "Preto", hex: "#1C1C1C" },
      { name: "Areia", hex: "#C9C3B6" },
    ],
  },
];

const sizes = ["P", "M", "G", "GG"];
const ticker = ["Frete grátis acima de R$ 299", "Drop 07 no ar", "Troca em 30 dias", "Peças limitadas"];

function ProductCard({ product, onAdd }: { product: (typeof products)[number]; onAdd: () => void }) {
  const [color, setColor] = useState(product.colors[0]);
  const [size, setSize] = useState("M");
  const [added, setAdded] = useState(false);

  return (
    <article className="flex flex-col border-b-2 border-[#0A0A0A] md:border-b-0 md:border-r-2 md:last:border-r-0">
      <div className="relative aspect-[4/5] bg-[#E2E2DE] p-10">
        <span style={mono} className="absolute left-4 top-4 bg-[#0A0A0A] px-2 py-1 text-xs text-[#D4FF00]">
          DROP 07
        </span>
        <Garment kind={product.kind} color={color.hex} />
      </div>
      <div className="flex flex-col gap-4 border-t-2 border-[#0A0A0A] p-5">
        <div className="flex items-start justify-between gap-4">
          <h3 style={display} className="text-3xl uppercase leading-none">{product.name}</h3>
          <p style={mono} className="text-lg font-bold">R${product.price}</p>
        </div>
        <fieldset>
          <legend style={mono} className="mb-2 text-xs uppercase">Cor: {color.name}</legend>
          <div className="flex gap-2">
            {product.colors.map((option) => (
              <button
                key={option.name}
                type="button"
                aria-label={option.name}
                aria-pressed={color.name === option.name}
                onClick={() => setColor(option)}
                style={{ background: option.hex }}
                className={`h-9 w-9 border-2 border-[#0A0A0A] ${color.name === option.name ? "outline outline-2 outline-offset-2 outline-[#0A0A0A]" : ""}`}
              />
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend style={mono} className="mb-2 text-xs uppercase">Tamanho</legend>
          <div className="grid grid-cols-4 border-2 border-[#0A0A0A]">
            {sizes.map((option) => (
              <button
                key={option}
                type="button"
                aria-pressed={size === option}
                onClick={() => setSize(option)}
                style={mono}
                className={`border-r-2 border-[#0A0A0A] py-2 text-sm font-bold last:border-r-0 ${
                  size === option ? "bg-[#0A0A0A] text-[#D4FF00]" : "hover:bg-[#D4FF00]"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </fieldset>
        <button
          type="button"
          onClick={() => {
            onAdd();
            setAdded(true);
            window.setTimeout(() => setAdded(false), 1400);
          }}
          style={display}
          className="flex items-center justify-between bg-[#0A0A0A] px-4 py-3 text-xl uppercase text-[#EDEDEA] transition-colors hover:bg-[#D4FF00] hover:text-[#0A0A0A]"
        >
          {added ? "Na sacola ✓" : "Adicionar"}
          <ArrowRight size={20} aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}

export default function UrbanStyle() {
  const [cart, setCart] = useState(0);
  const [subscribed, setSubscribed] = useState(false);

  return (
    <ProjectShell
      title="Urban Style"
      fonts="family=Anton&family=Space+Mono:wght@400;700"
      className="bg-[#EDEDEA] text-[#0A0A0A]"
    >
      <div style={mono}>
        <div className="overflow-hidden bg-[#0A0A0A] py-2 text-[#D4FF00]">
          <div className="flex w-max animate-marquee whitespace-nowrap text-xs uppercase">
            {[0, 1, 2, 3].map((copy) => (
              <Fragment key={copy}>
                {ticker.map((item) => (
                  <span key={`${copy}-${item}`} className="px-6" aria-hidden={copy > 0}>
                    ✦ {item}
                  </span>
                ))}
              </Fragment>
            ))}
          </div>
        </div>

        <header className="flex items-stretch justify-between border-b-2 border-[#0A0A0A]">
          <a href="#topo" style={display} className="flex items-center border-r-2 border-[#0A0A0A] px-6 text-3xl uppercase">
            Urban<span className="text-[#FF3B1F]">/</span>Style
          </a>
          <nav aria-label="Urban Style" className="hidden flex-1 items-center gap-8 px-6 text-sm uppercase md:flex">
            <a href="#produtos" className="hover:underline">Masculino</a>
            <a href="#produtos" className="hover:underline">Feminino</a>
            <a href="#produtos" className="hover:underline">Acessórios</a>
          </nav>
          <p
            aria-live="polite"
            className="flex items-center gap-2 border-l-2 border-[#0A0A0A] bg-[#D4FF00] px-6 text-sm font-bold uppercase"
          >
            <ShoppingBag size={18} aria-hidden="true" />
            Sacola ({cart})
          </p>
        </header>

        <section id="topo" className="grid border-b-2 border-[#0A0A0A] md:grid-cols-[1.2fr_1fr]">
          <div className="flex flex-col justify-between gap-10 border-b-2 border-[#0A0A0A] p-6 md:border-b-0 md:border-r-2 md:p-10">
            <p className="text-sm uppercase">Coleção inverno · 300 peças</p>
            <h1 style={display} className="text-[120px] uppercase leading-[0.82] md:text-[210px]">
              Drop
              <br />
              <span className="text-[#FF3B1F]">07</span>
            </h1>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <p className="max-w-xs text-sm">Modelagem ampla, algodão pesado e costura reforçada. Feito para durar mais que a tendência.</p>
              <a
                href="#produtos"
                style={display}
                className="flex items-center gap-3 border-2 border-[#0A0A0A] bg-[#0A0A0A] px-6 py-4 text-2xl uppercase text-[#EDEDEA] transition-colors hover:bg-transparent hover:text-[#0A0A0A]"
              >
                Comprar agora <ArrowRight aria-hidden="true" />
              </a>
            </div>
          </div>
          <div className="relative flex min-h-[420px] items-center justify-center overflow-hidden bg-[#D4FF00] p-10">
            <p style={display} aria-hidden="true" className="absolute -left-4 top-6 text-[140px] uppercase leading-none text-[#0A0A0A]/[0.07]">
              Urban
            </p>
            <div className="relative h-80 w-72 -rotate-6">
              <Garment kind="hoodie" color="#1C1C1C" />
            </div>
            <span
              style={display}
              className="absolute right-8 top-8 flex h-28 w-28 rotate-12 items-center justify-center rounded-full bg-[#FF3B1F] text-3xl uppercase text-[#EDEDEA]"
            >
              Novo
            </span>
          </div>
        </section>

        <section className="grid grid-cols-3 border-b-2 border-[#0A0A0A] text-center">
          {[
            ["300", "peças"],
            ["24h", "para envio"],
            ["30 dias", "para troca"],
          ].map(([value, label]) => (
            <div key={label} className="border-r-2 border-[#0A0A0A] px-2 py-6 last:border-r-0">
              <p style={display} className="text-4xl uppercase">{value}</p>
              <p className="text-xs uppercase">{label}</p>
            </div>
          ))}
        </section>

        <section id="produtos" aria-labelledby="produtos-titulo" className="border-b-2 border-[#0A0A0A]">
          <div className="flex items-end justify-between border-b-2 border-[#0A0A0A] px-6 py-6">
            <h2 id="produtos-titulo" style={display} className="text-5xl uppercase md:text-6xl">
              Mais vendidos
            </h2>
            <p className="text-sm uppercase">03 / 24</p>
          </div>
          <div className="grid md:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.name} product={product} onAdd={() => setCart((c) => c + 1)} />
            ))}
          </div>
        </section>

        <section className="overflow-hidden border-b-2 border-[#0A0A0A] py-10">
          <p
            style={{ ...display, WebkitTextStroke: "2px #0A0A0A" }}
            className="whitespace-nowrap text-center text-[90px] uppercase leading-none text-transparent md:text-[150px]"
          >
            Vista o corre
          </p>
        </section>

        <section className="bg-[#0A0A0A] px-6 py-16 text-[#EDEDEA]">
          <div className="mx-auto flex max-w-5xl flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <h2 style={display} className="text-5xl uppercase leading-none md:text-6xl">
              Entre na lista
              <br />
              <span className="text-[#D4FF00]">do próximo drop</span>
            </h2>
            {subscribed ? (
              <p role="status" style={display} className="text-3xl uppercase text-[#D4FF00]">
                Você está na lista ✓
              </p>
            ) : (
              <form
                className="flex w-full max-w-md border-2 border-[#EDEDEA] focus-within:outline focus-within:outline-2 focus-within:outline-offset-4 focus-within:outline-[#D4FF00]"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubscribed(true);
                }}
              >
                <label htmlFor="urban-email" className="sr-only">
                  Seu e-mail
                </label>
                <input
                  id="urban-email"
                  type="email"
                  required
                  placeholder="SEU@EMAIL.COM"
                  className="min-w-0 flex-1 bg-transparent px-4 py-4 text-base uppercase text-[#EDEDEA] placeholder:text-[#888] focus:outline-none"
                />
                <button type="submit" style={display} className="bg-[#D4FF00] px-6 text-xl uppercase text-[#0A0A0A]">
                  Entrar
                </button>
              </form>
            )}
          </div>
        </section>

        <footer className="flex justify-between px-6 pb-24 pt-6 text-xs uppercase">
          <span>© Urban/Style</span>
          <span>São Paulo — BR</span>
        </footer>
      </div>
    </ProjectShell>
  );
}
