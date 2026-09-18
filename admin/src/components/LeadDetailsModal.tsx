import { useState } from 'react';
import { Check, Copy, MessageCircle } from 'lucide-react';
import type { Lead } from '../types';
import { formatBRL, whatsappLink } from '../lib/whatsapp';
import { Modal } from './Modal';
import { ScoreBadge } from './LeadCard';

export function LeadDetailsModal({ lead, onClose }: { lead: Lead; onClose: () => void }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(lead.suggestedPitch);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* navegador sem permissão de clipboard */
    }
  };

  const rows: [string, string][] = [
    ['Categoria', lead.category],
    ['Endereço', lead.address || lead.city || '–'],
    ['Telefone', lead.phone],
    ['Responsável', `${lead.decisionMaker.name} · ${lead.decisionMaker.role}`],
    ['Nota Google', lead.rating ? `${lead.rating.toFixed(1).replace('.', ',')} (${lead.reviewsCount} avaliações)` : 'Sem nota'],
    ['Site', lead.website || 'Não possui'],
    ['Valor estimado', formatBRL(lead.dealValue)],
  ];

  return (
    <Modal title={lead.name} onClose={onClose} wide>
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <ScoreBadge lead={lead} />
        <span className="text-sm text-mist">{lead.aiReason}</span>
      </div>
      <dl className="grid gap-x-6 gap-y-4 text-sm sm:grid-cols-2">
        {rows.map(([k, v]) => (
          <div key={k}>
            <dt className="text-xs font-semibold text-faint">{k}</dt>
            <dd className="mt-0.5 break-words text-soft">{v}</dd>
          </div>
        ))}
      </dl>
      <h3 className="mb-3 mt-7 text-xs font-semibold text-mist">Mensagem sugerida</h3>
      <div className="rounded-3xl bg-deep p-4">
        <p className="ml-auto max-w-[92%] whitespace-pre-wrap rounded-[20px] rounded-br-md bg-bubble px-4 py-3.5 text-[15px] leading-relaxed">{lead.suggestedPitch}</p>
      </div>
      <div className="mt-5 grid gap-2 sm:grid-cols-2">
        <button onClick={copy} className="btn-ghost">
          {copied ? <Check className="h-4 w-4 text-verde" /> : <Copy className="h-4 w-4" />}
          {copied ? 'Copiado!' : 'Copiar texto'}
        </button>
        <a href={whatsappLink(lead.whatsapp || lead.phone, lead.suggestedPitch)} target="_blank" rel="noreferrer" className="btn-primary">
          <MessageCircle className="h-4 w-4" /> Enviar no WhatsApp
        </a>
      </div>
    </Modal>
  );
}
