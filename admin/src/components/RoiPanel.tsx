import { Lightbulb } from 'lucide-react';
import type { Lead } from '../types';
import { formatBRL } from '../lib/whatsapp';

const CLOSE_RATE = 0.05;
const AVG_TICKET = 2800;

export function RoiPanel({ leads }: { leads: Lead[] }) {
  const potential = leads.length * CLOSE_RATE * AVG_TICKET;
  const expectedSales = leads.length * CLOSE_RATE;

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
        <div className="card flex flex-col gap-1 p-7 md:col-span-2">
          <span className="text-[13px] text-mist">Total de leads na base</span>
          <span className="display text-7xl leading-none">{leads.length}</span>
        </div>
        <div className="flex flex-col gap-1 rounded-3xl bg-paper p-7 text-ink md:col-span-3">
          <span className="eyebrow text-mata">Faturamento potencial</span>
          <span className="display text-6xl leading-tight sm:text-7xl">{formatBRL(potential)}</span>
          <p className="mt-2 text-sm leading-relaxed text-[#4a5650]">
            {leads.length} leads × {CLOSE_RATE * 100}% de fechamento × ticket médio de {formatBRL(AVG_TICKET)} ≈{' '}
            {expectedSales.toLocaleString('pt-BR', { maximumFractionDigits: 1 })} vendas. É uma estimativa, não uma garantia.
          </p>
        </div>
      </div>
      <div className="card flex gap-4 p-7">
        <Lightbulb className="h-6 w-6 shrink-0 text-ambar" aria-hidden="true" />
        <div className="flex flex-col gap-2 text-[15px] leading-relaxed text-mist">
          <h2 className="font-display text-xl font-bold text-fg">Rotina de prospecção</h2>
          <p>Separe um bloco fixo de 1 hora pela manhã: extraia 20 leads de um nicho, mande mensagens personalizadas para os de score mais alto e mova no Kanban quem responder.</p>
          <p>Faça o follow-up em 2 dias úteis com algo concreto (um print de como o site ficaria, por exemplo). Constância diária rende mais que mutirões esporádicos.</p>
        </div>
      </div>
    </div>
  );
}
