import { useEffect, useState } from 'react';
import { Check, Copy, MessageCircle, RefreshCw } from 'lucide-react';
import type { Lead } from '../types';
import { DEFAULT_OFFER, TONES, generatePitch, type Tone } from '../lib/pitch';
import { heat, initials } from '../lib/heat';
import { whatsappLink } from '../lib/whatsapp';
import type { Notify } from './Toast';

const TONE_HINTS: Record<Tone, string> = {
  consultivo: 'análise + sugestões',
  direto: 'curto, com oferta',
  elogio: 'rapport pela nota',
  demo: 'marca uma conversa',
};

export function ScriptGenerator({ leads, notify }: { leads: Lead[]; notify: Notify }) {
  const [leadId, setLeadId] = useState(leads[0]?.id ?? '');
  const [offer, setOffer] = useState(DEFAULT_OFFER);
  const [tone, setTone] = useState<Tone>('consultivo');
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState(false);

  const lead = leads.find((l) => l.id === leadId) ?? leads[0];

  useEffect(() => {
    if (lead) setMessage(generatePitch(lead, tone, offer.trim() || DEFAULT_OFFER));
    // Gera ao trocar lead ou tom; a oferta só entra ao clicar em "Gerar".
  }, [lead?.id, tone]);

  if (!lead) {
    return <p className="card p-10 text-center text-mist">Adicione ou extraia leads para gerar mensagens.</p>;
  }

  const regenerate = () => {
    setMessage(generatePitch(lead, tone, offer.trim() || DEFAULT_OFFER));
    notify('Mensagem gerada com a oferta atual.', 'info');
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      notify('Não foi possível copiar. Selecione o texto e copie manualmente.', 'error');
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[400px_minmax(0,1fr)]">
      <div className="flex min-w-0 flex-col gap-6">
        <fieldset className="min-w-0">
          <legend className="label">1 · Escolha o lead</legend>
          <div className="flex max-h-[296px] flex-col gap-2 overflow-y-auto pr-1">
            {leads.map((l) => {
              const selected = l.id === lead.id;
              return (
                <button
                  key={l.id}
                  onClick={() => setLeadId(l.id)}
                  aria-pressed={selected}
                  className={`flex min-h-16 shrink-0 items-center gap-3 rounded-2xl border px-3.5 py-2.5 text-left transition ${
                    selected ? 'border-verde bg-surface-2' : 'border-line hover:border-line-strong'
                  }`}
                >
                  <span className="grid h-[38px] w-[38px] shrink-0 place-items-center rounded-xl bg-ink text-[13px] font-bold text-mist">{initials(l.name)}</span>
                  <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <span className="truncate text-sm font-bold">{l.name}</span>
                    <span className="truncate text-xs text-mist">
                      {l.category}
                      {l.city && ` · ${l.city}`}
                    </span>
                  </span>
                  <span className={`font-mono text-[13px] font-bold ${heat(l.aiScore).text}`}>{l.aiScore}</span>
                </button>
              );
            })}
          </div>
        </fieldset>

        <div>
          <label className="label" htmlFor="sg-offer">
            2 · O que sua empresa oferece?
          </label>
          <input id="sg-offer" className="input bg-surface text-sm" value={offer} onChange={(e) => setOffer(e.target.value)} />
        </div>

        <fieldset className="min-w-0">
          <legend className="label">3 · Tom da mensagem</legend>
          <div className="grid grid-cols-2 gap-2">
            {TONES.map((t) => {
              const selected = tone === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setTone(t.id)}
                  aria-pressed={selected}
                  className={`flex min-h-16 flex-col items-start justify-center gap-0.5 rounded-2xl border px-3.5 py-2.5 text-left transition ${
                    selected ? 'border-verde bg-verde text-ink' : 'border-line bg-surface hover:border-line-strong'
                  }`}
                >
                  <span className="text-sm leading-tight font-bold">{t.label}</span>
                  <span className={`text-[11px] ${selected ? 'text-ink/75' : 'text-mist'}`}>{TONE_HINTS[t.id]}</span>
                </button>
              );
            })}
          </div>
        </fieldset>

        <button onClick={regenerate} className="btn-ghost">
          <RefreshCw className="h-4 w-4" /> Gerar nova mensagem
        </button>
      </div>

      <section className="card flex min-h-[560px] flex-col overflow-hidden" aria-label="Prévia da conversa">
        <header className="flex min-h-[72px] items-center gap-3 border-b border-line px-5 py-3">
          <span className="grid h-[42px] w-[42px] shrink-0 place-items-center rounded-full bg-surface-2 text-sm font-bold text-mist">{initials(lead.name)}</span>
          <span className="flex min-w-0 flex-col">
            <span className="truncate text-[15px] font-bold">{lead.name}</span>
            <span className="font-mono text-xs text-mist">{lead.whatsapp || lead.phone} · WhatsApp</span>
          </span>
          <span className="ml-auto hidden h-[30px] items-center rounded-full bg-surface-2 px-3 text-xs font-semibold text-mist sm:flex">Prévia da conversa</span>
        </header>

        <div className="flex flex-1 flex-col justify-end gap-2.5 bg-[#0e1310] p-4 sm:p-7">
          <span className="self-center rounded-lg bg-surface-2 px-3 py-1 text-[11px] text-mist">Primeiro contato · edite à vontade</span>
          <div className="flex w-full flex-col gap-2 self-end rounded-[20px] rounded-br-md bg-bubble px-4 py-3.5 sm:max-w-[82%]">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              aria-label="Mensagem gerada"
              rows={9}
              className="w-full resize-y bg-transparent text-[15px] leading-relaxed text-fg outline-none [field-sizing:content] sm:text-base"
            />
            <span className="self-end font-mono text-[11px] text-mist">rascunho · {message.length} caracteres</span>
          </div>
        </div>

        <footer className="flex flex-wrap items-center gap-2.5 border-t border-line px-5 py-4">
          <span className="text-xs text-faint">Modelo de texto, não uma IA: revise antes de enviar.</span>
          <div className="flex w-full gap-2 sm:ml-auto sm:w-auto">
            <button onClick={copy} className="btn-ghost flex-1 sm:flex-none">
              {copied ? <Check className="h-4 w-4 text-verde" /> : <Copy className="h-4 w-4" />}
              {copied ? 'Copiado!' : 'Copiar texto'}
            </button>
            <a href={whatsappLink(lead.whatsapp || lead.phone, message)} target="_blank" rel="noreferrer" className="btn-primary flex-1 sm:flex-none">
              <MessageCircle className="h-4 w-4" /> Enviar no WhatsApp
            </a>
          </div>
        </footer>
      </section>
    </div>
  );
}
