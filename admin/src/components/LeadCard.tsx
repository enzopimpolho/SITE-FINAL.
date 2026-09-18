import { Flame, MapPin, MessageCircle, Star } from 'lucide-react';
import type { Lead } from '../types';
import { heat } from '../lib/heat';
import { whatsappLink } from '../lib/whatsapp';

export function ScoreBadge({ lead }: { lead: Lead }) {
  const h = heat(lead.aiScore);
  return (
    <span className={`inline-flex h-7 items-center gap-1.5 rounded-full px-3 text-xs font-bold ${h.bg} ${h.text}`}>
      <Flame className="h-3.5 w-3.5" />
      {lead.aiScore} · {lead.aiScoreLabel}
    </span>
  );
}

export function ScoreMeter({ lead, compact }: { lead: Lead; compact?: boolean }) {
  const h = heat(lead.aiScore);
  return (
    <div className="flex items-center gap-2.5">
      {!compact && <Flame className={`h-4 w-4 shrink-0 ${h.text}`} aria-hidden="true" />}
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-line" role="presentation">
        <div className={`h-full rounded-full ${h.bar}`} style={{ width: `${lead.aiScore}%` }} />
      </div>
      <span className={`font-mono text-[13px] font-bold ${h.text}`}>
        {lead.aiScore}
        {compact && ` · ${lead.aiScoreLabel}`}
      </span>
    </div>
  );
}

function location(lead: Lead) {
  return lead.address || [lead.city, lead.state].filter(Boolean).join(' - ') || 'Endereço não informado';
}

interface Props {
  lead: Lead;
  onShowScript?: (lead: Lead) => void;
  compact?: boolean;
}

export function LeadCard({ lead, onShowScript, compact }: Props) {
  const h = heat(lead.aiScore);
  const wa = whatsappLink(lead.whatsapp || lead.phone, lead.suggestedPitch);

  if (compact) {
    return (
      <article className="card flex flex-col gap-3.5 p-5 sm:p-6">
        <div className="flex items-center gap-2">
          <span className="text-xs text-mist">{lead.category}</span>
          {!lead.hasWebsite && <span className="badge-site ml-auto">SEM SITE</span>}
        </div>
        <h3 className="font-display text-[22px] leading-tight font-bold tracking-[-0.02em]">{lead.name}</h3>
        <p className="text-[13px] text-mist">
          {location(lead)}
          {lead.distanceKm !== undefined && <strong className="font-mono text-xs text-verde"> · a {lead.distanceKm.toLocaleString('pt-BR')} km</strong>}
        </p>
        <ScoreMeter lead={lead} compact />
        <a href={wa} target="_blank" rel="noreferrer" className="btn-primary mt-auto">
          <MessageCircle className="h-4 w-4" /> WhatsApp com 1 clique
        </a>
      </article>
    );
  }

  return (
    <article className="card flex flex-col gap-3 p-5 transition hover:border-line-strong">
      <div className="flex items-center gap-2">
        <span className="truncate text-xs text-mist">{lead.category}</span>
        {!lead.hasWebsite && <span className="badge-site ml-auto shrink-0">SEM SITE</span>}
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="font-display text-[21px] leading-tight font-bold tracking-[-0.02em]">{lead.name}</h3>
        <p className="text-[13px] text-mist">{location(lead)}</p>
        {lead.distanceKm !== undefined && (
          <p className="font-mono text-xs font-bold text-verde">a {lead.distanceKm.toLocaleString('pt-BR')} km de você</p>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-[13px]">
        <span className="flex items-center gap-1">
          <Star className="h-3.5 w-3.5 fill-ambar text-ambar" aria-hidden="true" />
          <strong>{lead.rating ? lead.rating.toFixed(1).replace('.', ',') : '–'}</strong>
          <span className="text-faint">({lead.reviewsCount} avaliações)</span>
        </span>
        <span className="font-mono text-soft">{lead.whatsapp || lead.phone}</span>
      </div>

      <div className="flex flex-col gap-2 rounded-2xl bg-ink px-3.5 py-3">
        <ScoreMeter lead={lead} />
        <p className="text-xs leading-relaxed text-mist">
          <strong className={h.text}>{lead.aiScoreLabel}</strong> · {lead.aiReason}
        </p>
        <p className="text-xs text-faint">
          {lead.decisionMaker.name} · {lead.decisionMaker.role}
        </p>
      </div>

      <div className="mt-auto flex gap-2">
        <a
          href={lead.googleMapsUrl}
          target="_blank"
          rel="noreferrer"
          className="btn-ghost w-11 shrink-0 px-0"
          aria-label={`Ver ${lead.name} no Google Maps`}
          title="Ver no Google Maps"
        >
          <MapPin className="h-[18px] w-[18px]" />
        </a>
        {onShowScript && (
          <button onClick={() => onShowScript(lead)} className="btn-ghost px-3.5">
            Ver script
          </button>
        )}
        <a href={wa} target="_blank" rel="noreferrer" className="btn-primary flex-1 px-3">
          <MessageCircle className="h-4 w-4" /> WhatsApp
        </a>
      </div>
    </article>
  );
}
