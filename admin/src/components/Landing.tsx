import { useState, type FormEvent, type ReactNode } from 'react';
import { ArrowRight, Check, Loader2, Menu, MessageCircle, Minus, Plus, Search, X } from 'lucide-react';
import type { Lead } from '../types';
import { MIN_RATINGS, NICHES, QUICK_SUGGESTIONS } from '../data/niches';
import { prospect } from '../lib/api';
import { heat } from '../lib/heat';
import { formatBRL } from '../lib/whatsapp';
import { LeadCard } from './LeadCard';
import { LocationPicker, locationError, locationParams, type LocationState } from './LocationPicker';
import { Logo, LogoMark, Wordmark } from './Logo';
import { Switch } from './Switch';

// Coloque aqui o WhatsApp de atendimento com DDI (ex.: 55119...). Vazio abre a escolha de contato.
const SUPPORT_WHATSAPP = '';

const NAV = [
  { href: '#demo', label: 'Testar busca' },
  { href: '#como-funciona', label: 'Como funciona' },
  { href: '#diferenciais', label: 'Diferenciais' },
  { href: '#crm', label: 'CRM Kanban' },
  { href: '#roi', label: 'Calculadora ROI' },
  { href: '#faq', label: 'FAQ' },
];

function Heading({ eyebrow, title, children, center }: { eyebrow: string; title: string; children?: ReactNode; center?: boolean }) {
  return (
    <div className={`flex flex-col gap-3 ${center ? 'items-center text-center' : ''}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="display text-4xl leading-none sm:text-[56px]">{title}</h2>
      {children && <p className="max-w-xl text-base leading-relaxed text-mist">{children}</p>}
    </div>
  );
}

const section = 'mx-auto w-full max-w-[1280px] px-4 sm:px-8';

export function Landing({ onOpenApp }: { onOpenApp: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="overflow-x-clip">
      <header className="sticky top-0 z-40 border-b border-line-soft bg-ink/85 backdrop-blur">
        <div className={`${section} flex h-[76px] items-center gap-6`}>
          <a href="#topo" aria-label="LeadJá: início">
            <Logo />
          </a>
          <nav className="hidden items-center gap-6 text-sm font-medium text-mist xl:flex" aria-label="Seções da página">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="transition hover:text-fg">
                {n.label}
              </a>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-3">
            <span className="hidden h-[30px] items-center gap-1.5 rounded-full border border-verde/35 px-3 text-xs font-bold text-verde md:flex">
              <span className="h-[7px] w-[7px] rounded-full bg-verde" aria-hidden="true" /> Acesso liberado
            </span>
            <button onClick={onOpenApp} className="btn-primary hidden sm:inline-flex">
              Acessar plataforma
            </button>
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="grid h-11 w-11 place-items-center rounded-[13px] border border-line xl:hidden"
              aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav className="border-t border-line-soft px-4 py-3 xl:hidden" aria-label="Seções da página">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} onClick={() => setMenuOpen(false)} className="block rounded-xl px-3 py-3 text-[15px] text-soft hover:bg-surface">
                {n.label}
              </a>
            ))}
            <button onClick={onOpenApp} className="btn-primary mt-2 w-full sm:hidden">
              Acessar plataforma
            </button>
          </nav>
        )}
      </header>

      <main>
        <Hero onOpenApp={onOpenApp} />
        <NicheBand />
        <Demo />
        <HowItWorks />
        <Comparison />
        <CrmAndRoi onOpenApp={onOpenApp} />
        <Testimonials />
        <Faq />
        <FinalCta onOpenApp={onOpenApp} />
      </main>

      <footer className="mt-20 border-t border-line-soft">
        <div className={`${section} flex flex-col items-center justify-between gap-3 py-10 text-[13px] text-faint sm:flex-row`}>
          <Wordmark className="text-[22px] text-fg" />
          <p>Dados públicos do Google Maps (Places API) · © {new Date().getFullYear()} LeadJá</p>
        </div>
      </footer>

      <a
        href={`https://wa.me/${SUPPORT_WHATSAPP}?text=${encodeURIComponent('Olá! Quero saber mais sobre o LeadJá.')}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Falar no WhatsApp"
        className="fixed right-4 bottom-4 z-30 grid h-14 w-14 place-items-center rounded-[18px] bg-verde text-ink shadow-[0_16px_32px_rgba(61,220,132,0.25)] transition hover:scale-105 sm:right-7 sm:bottom-7 sm:h-[60px] sm:w-[60px] sm:rounded-[20px]"
      >
        <MessageCircle className="h-7 w-7" />
      </a>
    </div>
  );
}

const HERO_LEADS = [
  { initials: 'CS', name: 'Clínica Sorriso Vila Mariana', rating: '4,8', reviews: 142, score: 99 },
  { initials: 'OE', name: 'Odonto Esperança Saúde', rating: '4,6', reviews: 707, score: 99 },
  { initials: 'DM', name: 'Dr. Mendes Consultório', rating: '5,0', reviews: 18, score: 90 },
  { initials: 'CA', name: 'Clínica Aclimação Dental', rating: '4,3', reviews: 64, score: 85 },
];

function Hero({ onOpenApp }: { onOpenApp: () => void }) {
  return (
    <section id="topo" className="relative overflow-hidden">
      <svg viewBox="0 0 760 760" className="pointer-events-none absolute -top-32 -right-40 w-[760px] opacity-50" aria-hidden="true">
        <g fill="none" stroke="#1C2521">
          <circle cx="380" cy="380" r="120" />
          <circle cx="380" cy="380" r="220" />
          <circle cx="380" cy="380" r="320" />
          <circle cx="380" cy="380" r="370" />
        </g>
      </svg>
      <div className={`${section} relative grid grid-cols-1 gap-14 pt-12 pb-16 sm:pt-20 lg:grid-cols-12 lg:gap-6 lg:pt-24 lg:pb-20`}>
        <div className="flex flex-col gap-6 lg:col-span-6 lg:gap-7">
          <span className="flex h-8 items-center gap-2.5 self-start rounded-full border border-line bg-surface px-3.5 font-mono text-[11px] text-mist sm:text-xs">
            Google Maps <span className="text-verde">→</span> sem site <span className="text-verde">→</span> WhatsApp
          </span>
          <h1 className="display text-[40px] leading-[0.98] sm:text-7xl sm:leading-[0.96] xl:text-[84px]">
            Encontre clientes qualificados{' '}
            <span className="relative whitespace-nowrap text-verde">
              antes do almoço.
              <svg viewBox="0 0 440 18" preserveAspectRatio="none" className="absolute -bottom-3 left-0 h-3 w-full sm:h-[18px]" aria-hidden="true">
                <path d="M4 12c60-8 130-10 210-6s150 3 222-4" fill="none" stroke="#FF8A4C" strokeWidth="5" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
          <p className="mt-2 max-w-[540px] text-lg leading-relaxed text-mist sm:text-xl">
            O LeadJá encontra negócios locais no Google Maps que ainda não têm site, dá uma nota de oportunidade para cada um e deixa a mensagem de WhatsApp pronta para você vender.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button onClick={onOpenApp} className="btn-primary h-14 px-7 text-[17px]">
              Acessar plataforma <ArrowRight className="h-5 w-5" />
            </button>
            <a href="#demo" className="btn-ghost h-14 px-6 text-[17px]">
              <Search className="h-5 w-5" /> Testar busca rápida
            </a>
          </div>
          <span className="text-[13px] text-faint">Dados públicos do Google Maps (Places API) · até 20 empresas por busca</span>
        </div>

        <div className="relative lg:col-span-5 lg:col-start-8 lg:h-[560px]" aria-hidden="true">
          <div className="flex flex-col gap-3 rounded-[28px] border border-line bg-surface p-4 shadow-[0_40px_80px_rgba(0,0,0,0.45)] sm:p-5 lg:absolute lg:top-0 lg:right-0 lg:w-[520px]">
            <div className="flex h-[52px] items-center gap-2.5 rounded-2xl border border-line bg-ink pr-2 pl-4">
              <Search className="h-[18px] w-[18px] shrink-0 text-faint" />
              <span className="truncate text-sm font-semibold">Clínicas Odontológicas</span>
              <span className="hidden truncate text-sm text-faint sm:inline">em São Paulo, SP</span>
              <span className="ml-auto flex h-9 items-center rounded-[11px] bg-verde px-3.5 text-[13px] font-bold text-ink">Extrair</span>
            </div>
            <div className="flex justify-between px-1 pt-1 text-xs text-faint">
              <span>7 empresas sem site</span>
              <span className="font-mono">score ↓</span>
            </div>
            {HERO_LEADS.map((l) => {
              const h = heat(l.score);
              return (
                <div key={l.name} className="flex items-center gap-3.5 rounded-2xl bg-surface-2 px-4 py-3.5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-ink text-[15px] font-bold text-mist">{l.initials}</span>
                  <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <span className="truncate text-[15px] font-bold">{l.name}</span>
                    <span className="truncate text-xs text-mist">
                      <span className="text-ambar">★</span> {l.rating} · {l.reviews} avaliações · <span className="font-mono text-[11px] text-verde">SEM SITE</span>
                    </span>
                  </span>
                  <span className={`grid h-8 min-w-11 place-items-center rounded-[10px] px-2.5 font-mono text-[15px] font-bold ${h.bg} ${h.text}`}>{l.score}</span>
                </div>
              );
            })}
          </div>
          <div className="relative mx-4 -mt-10 flex flex-col gap-3 rounded-[22px] bg-paper p-[18px] text-ink shadow-[0_30px_60px_rgba(0,0,0,0.5)] sm:mx-auto sm:max-w-[360px] lg:absolute lg:bottom-0 lg:-left-10 lg:m-0 lg:w-[360px]">
            <span className="flex items-center gap-2 text-xs font-bold text-mata">
              <MessageCircle className="h-4 w-4" /> Mensagem pronta · tom consultivo
            </span>
            <p className="text-sm leading-normal">
              Olá, tudo bem? Fiz uma análise rápida da presença digital da Clínica Sorriso Vila Mariana (nota 4,8 com 142 avaliações no Google). Reparei que o perfil de vocês ainda não tem um site vinculado…
            </p>
            <span className="flex h-10 items-center self-start rounded-xl bg-ink px-4 text-[13px] font-bold text-paper">Enviar no WhatsApp</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function NicheBand() {
  const niches = ['Odontologia', 'Oficinas', 'Restaurantes', 'Barbearias', 'Pet shops', 'Estética', 'Marcenarias', 'Advocacia', 'Contabilidade'];
  const stats = [
    ['[NÚMERO]', 'leads gerados no mês'],
    ['[NOTA]', 'avaliação dos usuários'],
    ['[TAXA]', 'taxa de resposta no WhatsApp'],
    ['[TEMPO]', 'até o primeiro lead'],
  ];
  return (
    <>
      <div className="border-y border-line-soft">
        <div className={`${section} flex flex-col gap-4 py-7 lg:flex-row lg:items-center lg:gap-12`}>
          <span className="eyebrow whitespace-nowrap text-faint">Funciona para</span>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 font-display text-lg font-bold tracking-[-0.02em] text-soft sm:text-[22px]">
            {niches.map((n, i) => (
              <li key={n} className="flex items-center gap-5">
                {i > 0 && (
                  <span className="text-line-strong" aria-hidden="true">
                    /
                  </span>
                )}
                {n}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Espaços reservados: substitua pelos números reais. */}
      <div className={`${section} grid grid-cols-2 gap-3 pt-10 lg:grid-cols-4 lg:gap-4`}>
        {stats.map(([value, label]) => (
          <div key={label} className="flex flex-col gap-1.5 rounded-[20px] border border-dashed border-line-strong p-5 sm:p-[22px]">
            <span className="display text-2xl text-faint sm:text-4xl">{value}</span>
            <span className="text-[13px] text-mist">{label}</span>
          </div>
        ))}
      </div>
    </>
  );
}

function Demo() {
  const [niche, setNiche] = useState(NICHES[0]);
  const [location, setLocation] = useState<LocationState>({ mode: 'cidade', city: 'São Paulo, SP', coords: null, radiusKm: 10 });
  const [minRating, setMinRating] = useState(4.0);
  const [onlyWithoutWebsite, setOnlyWithoutWebsite] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [results, setResults] = useState<Lead[] | null>(null);

  const run = async (n = niche, loc = location) => {
    const locError = locationError(loc);
    if (locError) {
      setError(locError);
      return;
    }
    setLoading(true);
    setError('');
    try {
      const found = await prospect({ niche: n, onlyWithoutWebsite, ...locationParams(loc) });
      setResults(found.filter((l) => !l.rating || l.rating >= minRating));
    } catch (err) {
      setResults(null);
      setError(err instanceof Error ? err.message : 'Erro na busca.');
    } finally {
      setLoading(false);
    }
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    run();
  };

  return (
    <section id="demo" className={`${section} flex scroll-mt-24 flex-col gap-8 pt-24 lg:pt-32`}>
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <Heading eyebrow="Teste agora" title="Empresas reais, em segundos." />
        <p className="max-w-[420px] text-base leading-relaxed text-mist">Escolha um nicho e onde buscar: uma cidade ou região, ou perto de você. A busca consulta o Google Maps e descarta quem não tem telefone.</p>
      </div>

      <form onSubmit={submit} className="card flex flex-col gap-4 p-4 sm:p-6">
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-[minmax(0,1fr)_220px_auto] lg:items-end">
          <div>
            <label className="label" htmlFor="demo-niche">Nicho</label>
            <select id="demo-niche" className="input h-[54px]" value={niche} onChange={(e) => setNiche(e.target.value)}>
              {NICHES.map((n) => (
                <option key={n}>{n}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label" htmlFor="demo-rating">Nota mínima</label>
            <select id="demo-rating" className="input h-[54px]" value={minRating} onChange={(e) => setMinRating(Number(e.target.value))}>
              {MIN_RATINGS.map((r) => (
                <option key={r} value={r}>
                  ★ {r.toFixed(1).replace('.', ',')}+
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn-primary h-[54px] px-6 text-[15px]" disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
            {loading ? 'Buscando...' : 'Buscar empresas'}
          </button>
        </div>
        <div className="border-t border-line-soft pt-4">
          <LocationPicker
            idPrefix="demo"
            value={location}
            onChange={setLocation}
            mapQuery={niche}
            onMessage={(text) => setError(text)}
          />
        </div>
        <div className="flex flex-wrap items-center gap-2.5 border-t border-line-soft pt-4">
          <Switch checked={onlyWithoutWebsite} onChange={setOnlyWithoutWebsite} className="mr-4">
            Priorizar empresas sem site
          </Switch>
          <span className="text-xs text-faint">Sugestões:</span>
          {QUICK_SUGGESTIONS.map((s) => (
            <button
              type="button"
              key={s.label}
              disabled={loading}
              onClick={() => {
                const next: LocationState = { ...location, mode: 'cidade', city: s.city };
                setNiche(s.niche);
                setLocation(next);
                run(s.niche, next);
              }}
              className="h-9 rounded-full border border-line-strong px-3.5 text-[13px] font-semibold text-soft transition hover:border-verde hover:text-verde disabled:opacity-50"
            >
              {s.label}
            </button>
          ))}
        </div>
      </form>

      {error && <p className="rounded-2xl border border-brasa/40 bg-brasa/10 p-4 text-sm text-brasa">{error}</p>}
      {results && results.length === 0 && <p className="card p-10 text-center text-mist">Nenhum estabelecimento encontrado com esses filtros.</p>}
      {results && results.length > 0 && (
        <div className="flex flex-col gap-4">
          <p className="text-sm text-mist">
            {results.length} resultados. Os {Math.min(6, results.length)} com maior score:
          </p>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {results.slice(0, 6).map((lead) => (
              <LeadCard key={lead.id} lead={lead} compact />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

function HowItWorks() {
  const steps = [
    ['01', 'Escolha nicho e cidade', 'Digite o tipo de negócio e a região, ou use sua localização para buscar num raio de 10 km.'],
    ['02', 'Filtre quem não tem site', 'Cada empresa ganha um score de 0 a 100: sem site, nota alta e muitas avaliações pesam mais.'],
    ['03', 'Aborde pelo WhatsApp', 'A mensagem já vem com o nome, a nota e a cidade da empresa. Um clique e a conversa começa.'],
  ];
  return (
    <section id="como-funciona" className={`${section} flex scroll-mt-24 flex-col gap-12 pt-28 lg:pt-36`}>
      <Heading eyebrow="Como funciona" title="Da busca à conversa em 3 passos." />
      <ol className="grid grid-cols-1 border-t border-line md:grid-cols-3">
        {steps.map(([n, title, text], i) => (
          <li
            key={n}
            className={`flex flex-col gap-3.5 py-8 md:pb-0 ${i > 0 ? 'border-t border-line md:border-t-0 md:border-l md:pl-8' : ''} ${i < 2 ? 'md:pr-8' : ''}`}
          >
            <span className="display text-7xl leading-none text-verde lg:text-8xl" aria-hidden="true">
              {n}
            </span>
            <h3 className="text-[22px] font-bold">{title}</h3>
            <p className="text-[15px] leading-relaxed text-mist">{text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Comparison() {
  const without = ['Horas rolando o Google Maps e copiando dados na mão', 'Planilhas bagunçadas e leads esquecidos', 'Mensagem genérica que ninguém responde', 'Nenhuma ideia de quanto dinheiro está na mesa'];
  const withIt = ['Até 20 empresas por busca, já filtradas', 'Score de oportunidade para saber quem abordar primeiro', 'Mensagens com nome, nota e cidade de cada empresa', 'Kanban e estimativa de faturamento no mesmo lugar'];
  return (
    <section id="diferenciais" className={`${section} grid scroll-mt-24 grid-cols-1 gap-6 pt-28 lg:grid-cols-12 lg:pt-36`}>
      <div className="lg:col-span-4">
        <Heading eyebrow="Diferenciais" title="Sem LeadJá × Com LeadJá">
          Prospecção manual custa a manhã inteira. Aqui ela cabe entre um café e outro.
        </Heading>
      </div>
      <div className="flex flex-col gap-4 rounded-[28px] border border-line p-7 sm:p-8 lg:col-span-4">
        <h3 className="text-lg font-bold text-mist">Sem LeadJá</h3>
        <ul className="flex flex-col gap-4">
          {without.map((t) => (
            <li key={t} className="flex gap-3 text-[15px] leading-normal text-mist">
              <X className="mt-0.5 h-5 w-5 shrink-0 text-faint" aria-hidden="true" />
              <span className="line-through decoration-line-strong">{t}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-4 rounded-[28px] bg-verde p-7 text-ink sm:p-8 lg:col-span-4">
        <h3 className="text-lg font-extrabold">Com LeadJá</h3>
        <ul className="flex flex-col gap-4">
          {withIt.map((t) => (
            <li key={t} className="flex gap-3 text-[15px] leading-normal font-semibold">
              <Check className="mt-0.5 h-5 w-5 shrink-0" strokeWidth={2.6} aria-hidden="true" />
              {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const PREVIEW_STAGES = [
  { title: 'Novos', cards: [['Clínica Sorriso', 'R$ 3.200'], ['Auto Center Mooca', 'R$ 2.500']] },
  { title: 'Qualificados', cards: [['Barbearia Navalha', 'R$ 1.800'], ['PetLar Tatuapé', 'R$ 2.200']] },
  { title: 'Proposta', cards: [['Cantina do Largo', 'R$ 4.000']] },
  { title: 'Fechado', cards: [['Marcenaria Lapa', 'R$ 3.500']], done: true },
];

function CrmAndRoi({ onOpenApp }: { onOpenApp: () => void }) {
  const [leads, setLeads] = useState(500);
  const [rate, setRate] = useState(3);
  const [ticket, setTicket] = useState(2500);
  const sales = (leads * rate) / 100;

  const sliders = [
    { id: 'roi-leads', label: 'Leads por mês', value: leads, set: setLeads, min: 50, max: 10000, step: 50, display: leads.toLocaleString('pt-BR') },
    { id: 'roi-rate', label: 'Taxa de fechamento', value: rate, set: setRate, min: 0.5, max: 20, step: 0.5, display: `${rate.toLocaleString('pt-BR')}%` },
    { id: 'roi-ticket', label: 'Ticket médio', value: ticket, set: setTicket, min: 300, max: 15000, step: 100, display: formatBRL(ticket) },
  ];

  return (
    <section className={`${section} grid grid-cols-1 gap-6 pt-28 lg:grid-cols-12 lg:pt-36`}>
      <div id="crm" className="card flex scroll-mt-24 flex-col gap-6 p-6 sm:p-8 lg:col-span-7">
        <div className="flex flex-col gap-2.5">
          <span className="eyebrow">CRM Kanban</span>
          <h2 className="display text-4xl leading-[1.05] tracking-[-0.035em]">Cada negociação no seu lugar.</h2>
          <p className="text-[15px] leading-relaxed text-mist">Avance o lead com um clique e veja quanto está em jogo, sem planilha.</p>
        </div>
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4" aria-hidden="true">
          {PREVIEW_STAGES.map((s) => (
            <div key={s.title} className="flex min-h-[200px] flex-col gap-2.5 rounded-[18px] bg-ink p-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold">{s.title}</span>
                <span className="font-mono text-[11px] text-faint">{s.cards.length}</span>
              </div>
              {s.cards.map(([name, value]) => (
                <div key={name} className={`flex flex-col gap-1.5 rounded-xl border bg-surface-2 p-2.5 ${s.done ? 'border-verde' : 'border-line'}`}>
                  <span className="text-xs leading-tight font-bold">{name}</span>
                  <span className="font-mono text-[11px] text-verde">{value}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
        <button onClick={onOpenApp} className="btn-ghost self-start">
          Abrir o Kanban <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      <div id="roi" className="flex scroll-mt-24 flex-col gap-5 rounded-[28px] bg-paper p-6 text-ink sm:p-8 lg:col-span-5">
        <div className="flex flex-col gap-2.5">
          <span className="eyebrow text-mata">Calculadora ROI</span>
          <h2 className="display text-4xl leading-[1.05] tracking-[-0.035em]">Quanto isso pode render?</h2>
        </div>
        {sliders.map((s) => (
          <div key={s.id} className="flex flex-col gap-1">
            <div className="flex justify-between text-sm">
              <label htmlFor={s.id} className="text-[#4a5650]">
                {s.label}
              </label>
              <span className="font-mono font-bold">{s.display}</span>
            </div>
            <input id={s.id} type="range" className="h-7 w-full" min={s.min} max={s.max} step={s.step} value={s.value} onChange={(e) => s.set(Number(e.target.value))} />
          </div>
        ))}
        <div className="mt-auto flex flex-col gap-1 rounded-[20px] bg-ink p-5 text-fg sm:p-6">
          <span className="text-[13px] text-mist">Faturamento estimado por mês</span>
          <output className="display text-4xl text-verde sm:text-5xl" htmlFor="roi-leads roi-rate roi-ticket">
            {formatBRL(sales * ticket)}
          </output>
          <span className="text-[13px] text-mist">≈ {sales.toLocaleString('pt-BR', { maximumFractionDigits: 1 })} vendas fechadas · estimativa, não garantia</span>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  // Espaços reservados: substitua por depoimentos reais, com autorização.
  return (
    <section className={`${section} grid grid-cols-1 gap-5 pt-28 md:grid-cols-3 lg:pt-36`}>
      {[1, 2, 3].map((i) => (
        <figure key={i} className="flex flex-col gap-4 rounded-[28px] border border-dashed border-line-strong p-7">
          <span className="display text-6xl leading-[0.6] text-verde" aria-hidden="true">
            “
          </span>
          <blockquote className="text-lg leading-normal text-mist">[DEPOIMENTO REAL DE CLIENTE, COM AUTORIZAÇÃO]</blockquote>
          <figcaption className="text-sm font-bold">
            [NOME] · <span className="font-medium text-faint">[CIDADE]</span>
          </figcaption>
        </figure>
      ))}
    </section>
  );
}

const FAQ = [
  {
    q: 'Como vocês detectam que uma empresa não tem site?',
    a: 'Consultamos o perfil da empresa no Google Maps pela Places API. Se o campo de site estiver vazio, ela recebe o selo SEM SITE. A empresa pode ter um site que não cadastrou no Google, então vale confirmar na conversa.',
  },
  {
    q: 'As empresas são reais?',
    a: 'Sim. Os resultados da busca vêm direto do Google Maps, com nome, endereço, telefone e nota públicos. Os leads que aparecem ao abrir a plataforma pela primeira vez são apenas exemplos fictícios.',
  },
  {
    q: 'E a LGPD?',
    a: 'Usamos apenas dados empresariais públicos. Na abordagem, identifique-se, seja relevante e respeite quem pedir para não receber mais mensagens. Consulte seu jurídico para o seu caso.',
  },
  {
    q: 'Posso exportar os leads?',
    a: 'Sim. Baixe uma planilha .csv pronta para o Excel ou Google Planilhas, com empresa, contato, nota, score e mensagem sugerida.',
  },
  {
    q: 'Quanto custa cada busca?',
    a: 'O LeadJá usa a Places API do Google com a sua chave. Cada busca traz até 20 empresas e é cobrada na sua conta do Google Cloud, conforme a tabela de preços do Google. Acompanhe o uso no console do Google Cloud.',
  },
];

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className={`${section} grid scroll-mt-24 grid-cols-1 gap-8 pt-28 lg:grid-cols-12 lg:gap-6 lg:pt-36`}>
      <div className="lg:col-span-4">
        <Heading eyebrow="FAQ" title="Perguntas frequentes" />
      </div>
      <div className="border-t border-line lg:col-span-8">
        {FAQ.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={item.q} className="border-b border-line">
              <h3>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-${i}`}
                  className="flex min-h-[72px] w-full items-center justify-between gap-6 py-4 text-left text-[17px] font-bold sm:text-[19px]"
                >
                  {item.q}
                  <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl transition ${isOpen ? 'bg-verde text-ink' : 'bg-surface-2 text-fg'}`}>
                    {isOpen ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                  </span>
                </button>
              </h3>
              {isOpen && (
                <p id={`faq-${i}`} className="pr-4 pb-6 text-base leading-relaxed text-mist sm:pr-16">
                  {item.a}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function FinalCta({ onOpenApp }: { onOpenApp: () => void }) {
  return (
    <section className={`${section} pt-28 lg:pt-36`}>
      <div className="relative flex flex-col items-start justify-between gap-8 overflow-hidden rounded-[36px] bg-verde p-8 text-ink sm:p-12 lg:flex-row lg:items-center lg:p-16">
        <div className="pointer-events-none absolute -top-20 right-10 opacity-15 lg:right-72" aria-hidden="true">
          <LogoMark size={320} inverted />
        </div>
        <h2 className="display relative max-w-[720px] text-4xl leading-[0.98] sm:text-5xl lg:text-[64px]">Sua próxima venda está no mapa. Vá buscar.</h2>
        <button
          onClick={onOpenApp}
          className="relative inline-flex h-16 shrink-0 items-center gap-2.5 rounded-[18px] bg-ink px-8 text-lg font-bold text-fg transition hover:bg-surface"
        >
          Acessar plataforma <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
}
