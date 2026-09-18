import { useState, type FormEvent } from 'react';
import { Download, Loader2, Search } from 'lucide-react';
import type { Lead } from '../types';
import { MIN_RATINGS, NICHES } from '../data/niches';
import { prospect } from '../lib/api';
import { LeadCard } from './LeadCard';
import { LeadDetailsModal } from './LeadDetailsModal';
import { LocationPicker, locationError, locationParams, type LocationState } from './LocationPicker';
import { Switch } from './Switch';
import type { Notify } from './Toast';

interface Props {
  leads: Lead[];
  location: LocationState;
  onLocationChange: (next: LocationState) => void;
  onResults: (leads: Lead[]) => void;
  onExport: () => void;
  notify: Notify;
}

const fmtRating = (r: number) => r.toFixed(1).replace('.', ',');

export function Extractor({ leads, location, onLocationChange, onResults, onExport, notify }: Props) {
  const [niche, setNiche] = useState(NICHES[0]);
  const [minRating, setMinRating] = useState(4.0);
  const [onlyWithoutWebsite, setOnlyWithoutWebsite] = useState(true);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<Lead | null>(null);
  const [lastFound, setLastFound] = useState<number | null>(null);

  const visible = leads.filter((l) => !l.rating || l.rating >= minRating);

  const search = async (e?: FormEvent) => {
    e?.preventDefault();
    if (!niche.trim()) {
      notify('Informe o nicho ou termo de busca.', 'error');
      return;
    }
    const locError = locationError(location);
    if (locError) {
      notify(locError, 'error');
      return;
    }
    setLoading(true);
    try {
      const found = await prospect({ niche: niche.trim(), onlyWithoutWebsite, ...locationParams(location) });
      const passing = found.filter((l) => !l.rating || l.rating >= minRating);
      const where = location.mode === 'perto' ? ` num raio de ${location.radiusKm} km` : '';
      onResults(found);
      setLastFound(found.length);
      notify(
        found.length
          ? `${found.length} ${found.length === 1 ? 'estabelecimento encontrado' : 'estabelecimentos encontrados'}${where} (${passing.length} com nota ≥ ${fmtRating(minRating)}).`
          : `A busca terminou, mas nenhum estabelecimento${where} passou nos filtros.`,
        found.length ? 'success' : 'info',
      );
    } catch (err) {
      notify(err instanceof Error ? err.message : 'Erro na busca.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={search} className="card flex flex-col gap-4 p-4 sm:p-5">
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-[minmax(0,1fr)_auto_auto] lg:items-end">
          <div>
            <label className="label" htmlFor="ex-niche">Nicho ou termo</label>
            <input id="ex-niche" className="input" value={niche} onChange={(e) => setNiche(e.target.value)} placeholder="Ex.: pizzaria, dentista..." />
          </div>
          <fieldset className="min-w-0">
            <legend className="label">Nota mínima</legend>
            <div className="flex h-12 gap-1 rounded-2xl border border-line-strong bg-ink p-1">
              {MIN_RATINGS.map((r) => (
                <button
                  type="button"
                  key={r}
                  onClick={() => setMinRating(r)}
                  aria-pressed={minRating === r}
                  className={`flex-1 rounded-xl px-3 font-mono text-[13px] transition lg:w-16 lg:flex-none ${
                    minRating === r ? 'bg-line font-bold text-fg' : 'text-mist hover:text-fg'
                  }`}
                >
                  {fmtRating(r)}+
                </button>
              ))}
            </div>
          </fieldset>
          <button type="submit" className="btn-primary h-12 text-[15px]" disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
            {loading ? 'Extraindo...' : 'Extrair estabelecimentos'}
          </button>
        </div>

        <div className="border-t border-line-soft pt-4">
          <LocationPicker
            idPrefix="ex"
            value={location}
            onChange={onLocationChange}
            mapQuery={niche}
            onMessage={(text, kind) => notify(text, kind)}
          />
        </div>

        <div className="flex flex-col gap-3 border-t border-line-soft pt-4 xl:flex-row xl:items-center">
          <div className="flex flex-wrap gap-2">
            {NICHES.map((n) => (
              <button
                type="button"
                key={n}
                onClick={() => setNiche(n)}
                aria-pressed={niche === n}
                className={`h-8 rounded-full border px-3 text-xs font-semibold transition ${
                  niche === n ? 'border-verde bg-verde/15 text-verde' : 'border-line-strong text-mist hover:text-fg'
                }`}
              >
                {n}
              </button>
            ))}
          </div>
          <Switch checked={onlyWithoutWebsite} onChange={setOnlyWithoutWebsite} className="whitespace-nowrap xl:ml-auto">
            Somente sem site
          </Switch>
        </div>
      </form>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <h2 className="font-display text-[22px] font-bold tracking-[-0.02em]">
          {lastFound === null ? 'Seus leads' : `${lastFound} ${lastFound === 1 ? 'estabelecimento encontrado' : 'estabelecimentos encontrados'}`}
        </h2>
        {lastFound !== null && lastFound > 0 && <span className="badge-site">NOVOS NO TOPO</span>}
        <span className="text-[13px] text-mist lg:ml-auto">
          Mostrando <strong className="text-fg">{visible.length}</strong> de {leads.length} leads · nota ≥ {fmtRating(minRating)}
        </span>
        <button onClick={onExport} className="btn-ghost" disabled={leads.length === 0}>
          <Download className="h-4 w-4" /> Exportar planilha (.csv)
        </button>
      </div>

      {visible.length === 0 ? (
        <p className="card p-12 text-center text-mist">Nenhum estabelecimento encontrado com esses filtros.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3">
          {visible.map((lead) => (
            <LeadCard key={lead.id} lead={lead} onShowScript={setSelected} />
          ))}
        </div>
      )}

      {selected && <LeadDetailsModal lead={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
