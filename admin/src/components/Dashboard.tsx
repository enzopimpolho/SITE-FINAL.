import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import { ArrowLeft, Columns3, Download, MessageCircle, Plus, Search, Target } from 'lucide-react';
import type { Lead } from '../types';
import { downloadCsv } from '../lib/csv';
import { placesConfigured } from '../lib/api';
import { IS_PREVIEW } from '../lib/preview';
import { AddLeadModal } from './AddLeadModal';
import { Extractor } from './Extractor';
import { Kanban, STAGES } from './Kanban';
import type { LocationState } from './LocationPicker';
import { Logo } from './Logo';
import { RoiPanel } from './RoiPanel';
import { ScriptGenerator } from './ScriptGenerator';
import type { Notify } from './Toast';

type Tab = 'extrator' | 'kanban' | 'scripts' | 'roi';

interface Props {
  leads: Lead[];
  setLeads: Dispatch<SetStateAction<Lead[]>>;
  onBack: () => void;
  notify: Notify;
}

const TABS = [
  { id: 'extrator', label: 'Extrator de Leads', icon: Search, subtitle: 'Busque empresas no Google Maps e filtre quem não tem site' },
  { id: 'kanban', label: 'CRM Kanban', icon: Columns3, subtitle: 'Avance cada lead até a venda' },
  { id: 'scripts', label: 'Gerador de Scripts', icon: MessageCircle, subtitle: 'Modelos de mensagem preenchidos com os dados de cada lead' },
  { id: 'roi', label: 'Metas & ROI', icon: Target, subtitle: 'Quanto a sua base de leads pode render' },
] as const satisfies readonly { id: Tab; label: string; icon: unknown; subtitle: string }[];

export function Dashboard({ leads, setLeads, onBack, notify }: Props) {
  const [tab, setTab] = useState<Tab>('extrator');
  const [location, setLocation] = useState<LocationState>({ mode: 'cidade', city: 'São Paulo, SP', coords: null, radiusKm: 10 });
  const [adding, setAdding] = useState(false);
  const [keyOk, setKeyOk] = useState<boolean | null>(null);

  useEffect(() => {
    placesConfigured().then(setKeyOk);
  }, []);

  const current = TABS.find((t) => t.id === tab)!;

  const exportCsv = () => {
    if (leads.length === 0) {
      notify('Não há leads para exportar.', 'info');
      return;
    }
    if (IS_PREVIEW) {
      notify('Nesta versão de visualização o download fica bloqueado. Rode o LeadJá no seu computador para baixar o CSV.', 'info');
      return;
    }
    downloadCsv(leads, location.mode === 'perto' ? 'perto-de-mim' : location.city);
    notify(`Planilha com ${leads.length} leads baixada.`);
  };

  // Resultados novos entram no topo; leads já existentes mantêm etapa e valor.
  const mergeResults = (found: Lead[]) => {
    setLeads((list) => {
      const known = new Set(list.map((l) => l.id));
      return [...found.filter((l) => !known.has(l.id)), ...list];
    });
  };

  const advance = (id: string) => {
    setLeads((list) =>
      list.map((l) => {
        if (l.id !== id) return l;
        const i = STAGES.findIndex((s) => s.id === l.stage);
        return i < STAGES.length - 1 ? { ...l, stage: STAGES[i + 1].id } : l;
      }),
    );
  };

  const remove = (id: string) => {
    setLeads((list) => list.filter((l) => l.id !== id));
    notify('Lead removido.', 'info');
  };

  const addLead = (lead: Lead) => {
    setLeads((list) => [lead, ...list]);
    setAdding(false);
    notify(`${lead.name} adicionado ao pipeline.`);
  };

  return (
    <div className="min-h-screen lg:flex">
      <aside className="sticky top-0 hidden h-screen w-62 shrink-0 flex-col gap-7 border-r border-line-soft px-4 py-6 lg:flex">
        <button onClick={onBack} className="rounded-xl px-2 text-left" aria-label="LeadJá: voltar à página inicial">
          <Logo size={34} subtitle="Ambiente de trabalho B2B" />
        </button>
        <nav className="flex flex-col gap-1" aria-label="Seções do painel">
          {TABS.map((t) => {
            const active = t.id === tab;
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                aria-current={active ? 'page' : undefined}
                className={`flex h-[46px] items-center gap-3 rounded-[13px] px-3 text-sm transition ${
                  active ? 'bg-surface-2 font-bold text-fg' : 'font-semibold text-mist hover:bg-surface hover:text-fg'
                }`}
              >
                <Icon className={`h-[18px] w-[18px] ${active ? 'text-verde' : ''}`} aria-hidden="true" />
                {t.label}
                {t.id === 'extrator' && <span className={`ml-auto font-mono text-[11px] ${active ? 'text-verde' : 'text-faint'}`}>{leads.length}</span>}
              </button>
            );
          })}
        </nav>
        <button onClick={onBack} className="flex items-center gap-2 px-3 text-[13px] font-semibold text-mist hover:text-fg">
          <ArrowLeft className="h-4 w-4" /> Ver página inicial
        </button>
        <div className="mt-auto flex flex-col gap-1.5 rounded-[18px] border border-line bg-surface p-4">
          {IS_PREVIEW ? (
            <>
              <span className="flex items-center gap-2 text-[13px] font-bold">
                <span className="h-2 w-2 rounded-full bg-ambar" aria-hidden="true" />
                Versão de visualização
              </span>
              <span className="text-xs leading-relaxed text-faint">Busca real e download de CSV só funcionam rodando o app no seu computador.</span>
            </>
          ) : (
            <>
              <span className="flex items-center gap-2 text-[13px] font-bold">
                <span className={`h-2 w-2 rounded-full ${keyOk ? 'bg-verde' : keyOk === false ? 'bg-brasa' : 'bg-faint'}`} aria-hidden="true" />
                {keyOk ? 'Google Places conectado' : keyOk === false ? 'Chave do Google ausente' : 'Verificando conexão…'}
              </span>
              <span className="text-xs leading-relaxed text-faint">
                {keyOk === false ? 'Adicione GOOGLE_MAPS_API_KEY ao .env e reinicie o servidor.' : 'Até 20 empresas por busca. Cada busca é cobrada pelo Google.'}
              </span>
            </>
          )}
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-40 border-b border-line-soft bg-ink/90 backdrop-blur">
          <div className="flex min-h-[84px] flex-wrap items-center gap-3 px-4 py-3 sm:px-6 lg:px-10">
            <button onClick={onBack} className="lg:hidden" aria-label="LeadJá: voltar à página inicial">
              <Logo size={32} />
            </button>
            <div className="hidden flex-col gap-0.5 lg:flex">
              <h1 className="display text-[28px] leading-tight tracking-[-0.03em]">{current.label}</h1>
              <span className="text-[13px] text-faint">{current.subtitle}</span>
            </div>
            <div className="ml-auto flex gap-2">
              <button onClick={exportCsv} className="btn-ghost" aria-label="Baixar CSV">
                <Download className="h-4 w-4" /> <span className="hidden sm:inline">Baixar CSV</span>
              </button>
              <button onClick={() => setAdding(true)} className="btn-primary">
                <Plus className="h-4 w-4" />
                <span className="sm:hidden">Novo lead</span>
                <span className="hidden sm:inline">Adicionar lead</span>
              </button>
            </div>
          </div>
          <nav className="flex gap-1 overflow-x-auto px-4 pb-2 sm:px-6 lg:hidden" aria-label="Seções do painel">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                aria-current={t.id === tab ? 'page' : undefined}
                className={`h-10 shrink-0 rounded-xl px-3.5 text-sm font-semibold transition ${
                  t.id === tab ? 'bg-surface-2 text-fg' : 'text-mist hover:text-fg'
                }`}
              >
                {t.id === 'extrator' ? `${t.label} (${leads.length})` : t.label}
              </button>
            ))}
          </nav>
        </header>

        <main className="px-4 py-6 sm:px-6 lg:px-10 lg:py-7">
          <h1 className="display mb-5 text-3xl tracking-[-0.03em] lg:hidden">{current.label}</h1>
          {tab === 'extrator' && (
            <Extractor
              leads={leads}
              location={location}
              onLocationChange={setLocation}
              onResults={mergeResults}
              onExport={exportCsv}
              notify={notify}
            />
          )}
          {tab === 'kanban' && <Kanban leads={leads} onAdvance={advance} onRemove={remove} />}
          {tab === 'scripts' && <ScriptGenerator leads={leads} notify={notify} />}
          {tab === 'roi' && <RoiPanel leads={leads} />}
        </main>
      </div>

      {adding && <AddLeadModal onClose={() => setAdding(false)} onAdd={addLead} />}
    </div>
  );
}
