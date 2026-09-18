import { ArrowRight, Check, MessageCircle, Trash2 } from 'lucide-react';
import type { Lead, Stage } from '../types';
import { heat } from '../lib/heat';
import { formatBRL, whatsappLink } from '../lib/whatsapp';

export const STAGES: { id: Stage; title: string; dot: string }[] = [
  { id: 'novo', title: '1. Novos leads', dot: 'bg-mist' },
  { id: 'qualificado', title: '2. Qualificados', dot: 'bg-ambar' },
  { id: 'proposta', title: '3. Proposta/Negociação', dot: 'bg-brasa' },
  { id: 'fechado', title: '4. Venda fechada', dot: 'bg-verde' },
];

interface Props {
  leads: Lead[];
  onAdvance: (id: string) => void;
  onRemove: (id: string) => void;
}

const sum = (list: Lead[]) => list.reduce((total, l) => total + l.dealValue, 0);

export function Kanban({ leads, onAdvance, onRemove }: Props) {
  const open = leads.filter((l) => l.stage !== 'fechado');
  const closed = leads.filter((l) => l.stage === 'fechado');
  const pipelineValue = sum(leads);
  const closedValue = sum(closed);

  const columns = STAGES.map((stage) => {
    const items = leads.filter((l) => l.stage === stage.id);
    return { ...stage, items, total: sum(items) };
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="card flex flex-col gap-1 px-6 py-5">
          <span className="text-[13px] text-mist">Oportunidades no pipeline</span>
          <span className="display text-[44px] leading-tight">{open.length}</span>
          <span className="text-xs text-faint">sem contar vendas fechadas</span>
        </div>
        <div className="card flex flex-col gap-1 px-6 py-5">
          <span className="text-[13px] text-mist">Valor total em negociação</span>
          <span className="display text-[44px] leading-tight">{formatBRL(pipelineValue)}</span>
          <div className="mt-1.5 flex h-1.5 overflow-hidden rounded-full bg-line" aria-hidden="true">
            {pipelineValue > 0 &&
              columns.map((c) => <div key={c.id} className={c.dot} style={{ width: `${(c.total / pipelineValue) * 100}%` }} />)}
          </div>
        </div>
        <div className="flex flex-col gap-1 rounded-3xl bg-verde px-6 py-5 text-ink">
          <span className="text-[13px] font-semibold">Vendas fechadas</span>
          <span className="display text-[44px] leading-tight">{formatBRL(closedValue)}</span>
          <span className="text-xs font-semibold">
            {closed.length} {closed.length === 1 ? 'contrato' : 'contratos'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-2 xl:grid-cols-4">
        {columns.map((col, index) => {
          const isLast = index === STAGES.length - 1;
          return (
            <section key={col.id} className="flex flex-col gap-2.5 rounded-3xl border border-line-soft bg-deep p-3">
              <header className="flex h-10 items-center gap-2.5 px-2">
                <span className={`h-2.5 w-2.5 rounded-[3px] ${col.dot}`} aria-hidden="true" />
                <h2 className="text-sm font-bold">{col.title}</h2>
                <span className="ml-auto font-mono text-xs text-mist">
                  {col.items.length} · {formatBRL(col.total)}
                </span>
              </header>

              {col.items.length === 0 && (
                <p className="rounded-2xl border border-dashed border-line p-5 text-center text-xs text-faint">Nenhum lead aqui.</p>
              )}

              {col.items.map((lead) => {
                const h = heat(lead.aiScore);
                return (
                  <article key={lead.id} className={`flex flex-col gap-2.5 rounded-[18px] border bg-surface p-4 ${isLast ? 'border-verde/45' : 'border-line'}`}>
                    <div className="flex items-start gap-2">
                      <h3 className="flex-1 text-[15px] leading-snug font-bold">{lead.name}</h3>
                      <span className={`grid h-6 place-items-center rounded-md px-1.5 font-mono text-xs font-bold ${h.bg} ${h.text}`}>{lead.aiScore}</span>
                    </div>
                    <div className="flex flex-col gap-0.5 text-xs text-mist">
                      <span>{lead.decisionMaker.name}</span>
                      <span className="font-mono">{lead.phone}</span>
                    </div>
                    <span className="display text-[22px] tracking-[-0.03em] text-verde">{formatBRL(lead.dealValue)}</span>
                    <div className="flex gap-1.5">
                      <a
                        href={whatsappLink(lead.whatsapp || lead.phone, lead.suggestedPitch)}
                        target="_blank"
                        rel="noreferrer"
                        className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-verde/15 text-verde transition hover:bg-verde/25"
                        aria-label={`WhatsApp de ${lead.name}`}
                      >
                        <MessageCircle className="h-[17px] w-[17px]" />
                      </a>
                      {isLast ? (
                        <span className="flex h-11 flex-1 items-center justify-center gap-1 rounded-xl bg-verde text-[13px] font-bold text-ink">
                          Fechado <Check className="h-4 w-4" />
                        </span>
                      ) : (
                        <button
                          onClick={() => onAdvance(lead.id)}
                          className="flex h-11 flex-1 items-center justify-center gap-1.5 rounded-xl border border-line-strong text-[13px] font-bold transition hover:border-verde hover:text-verde"
                        >
                          Avançar <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                      )}
                      <button
                        onClick={() => onRemove(lead.id)}
                        className="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-faint transition hover:bg-brasa/15 hover:text-brasa"
                        aria-label={`Remover ${lead.name}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </article>
                );
              })}
            </section>
          );
        })}
      </div>
    </div>
  );
}
