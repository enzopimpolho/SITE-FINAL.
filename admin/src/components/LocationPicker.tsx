import { useCallback, useEffect, useRef, useState } from 'react';
import { Building2, Loader2, LocateFixed, Maximize2, Minimize2, RefreshCw } from 'lucide-react';

export type Coords = { lat: number; lng: number };
export type SearchMode = 'cidade' | 'perto';

export const RADIUS_OPTIONS = [2, 5, 10, 20, 50];

export interface LocationState {
  mode: SearchMode;
  city: string;
  coords: Coords | null;
  radiusKm: number;
}

interface Props {
  idPrefix: string;
  value: LocationState;
  onChange: (next: LocationState) => void;
  /** Termo usado no mapa (o nicho atual). */
  mapQuery: string;
  onMessage: (text: string, kind: 'error' | 'info') => void;
  showMap?: boolean;
}

export function LocationPicker({ idPrefix, value, onChange, mapQuery, onMessage, showMap = true }: Props) {
  const [locating, setLocating] = useState(false);
  const set = (patch: Partial<LocationState>) => onChange({ ...value, ...patch });

  const locate = () => {
    if (!('geolocation' in navigator)) {
      onMessage('Seu navegador não permite geolocalização. Busque por cidade ou região.', 'error');
      set({ mode: 'cidade' });
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocating(false);
        onChange({ ...value, mode: 'perto', coords: { lat: pos.coords.latitude, lng: pos.coords.longitude } });
      },
      () => {
        setLocating(false);
        onMessage('Não foi possível obter sua localização. Libere a permissão de localização no navegador ou busque por cidade.', 'error');
        if (!value.coords) set({ mode: 'cidade' });
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  };

  const pickMode = (mode: SearchMode) => {
    if (mode === 'perto' && !value.coords) {
      set({ mode });
      locate();
    } else {
      set({ mode });
    }
  };

  // Zoom do mapa acompanha o raio.
  const zoom = value.radiusKm <= 2 ? 15 : value.radiusKm <= 5 ? 14 : value.radiusKm <= 10 ? 13 : value.radiusKm <= 20 ? 12 : 10;
  const mapSrc = value.coords
    ? `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&ll=${value.coords.lat},${value.coords.lng}&z=${zoom}&output=embed`
    : '';

  const modes: { id: SearchMode; label: string; icon: typeof Building2 }[] = [
    { id: 'cidade', label: 'Cidade ou região', icon: Building2 },
    { id: 'perto', label: 'Perto de mim', icon: LocateFixed },
  ];

  return (
    <fieldset className="flex min-w-0 flex-col gap-3">
      <legend className="label">Onde buscar</legend>
      <div className="grid grid-cols-2 gap-1 rounded-2xl border border-line-strong bg-ink p-1 sm:inline-grid sm:self-start">
        {modes.map(({ id, label, icon: Icon }) => (
          <button
            type="button"
            key={id}
            onClick={() => pickMode(id)}
            aria-pressed={value.mode === id}
            className={`flex h-10 items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold transition ${
              value.mode === id ? 'bg-verde text-ink' : 'text-mist hover:text-fg'
            }`}
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
            {label}
          </button>
        ))}
      </div>

      {value.mode === 'cidade' ? (
        <div>
          <label className="sr-only" htmlFor={`${idPrefix}-city`}>
            Cidade, bairro ou região
          </label>
          <input
            id={`${idPrefix}-city`}
            className="input"
            value={value.city}
            onChange={(e) => set({ city: e.target.value })}
            placeholder="Ex.: São Paulo, SP · Pinheiros, São Paulo · Zona Sul do Rio"
          />
          <p className="mt-1.5 text-xs text-faint">Aceita cidade, bairro ou região. O Google busca o nicho dentro desse lugar.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-mist" id={`${idPrefix}-radius-label`}>
              Raio:
            </span>
            <div className="flex flex-wrap gap-1.5" role="group" aria-labelledby={`${idPrefix}-radius-label`}>
              {RADIUS_OPTIONS.map((r) => (
                <button
                  type="button"
                  key={r}
                  onClick={() => set({ radiusKm: r })}
                  aria-pressed={value.radiusKm === r}
                  className={`h-9 rounded-full border px-3 font-mono text-xs font-bold transition ${
                    value.radiusKm === r ? 'border-verde bg-verde/15 text-verde' : 'border-line-strong text-mist hover:text-fg'
                  }`}
                >
                  {r} km
                </button>
              ))}
            </div>
            <span className="text-xs text-faint sm:ml-auto">
              {locating
                ? 'Obtendo sua localização…'
                : value.coords
                  ? `Sua posição: ${value.coords.lat.toFixed(4)}, ${value.coords.lng.toFixed(4)}`
                  : 'Localização ainda não liberada'}
            </span>
            <button type="button" onClick={locate} className="btn-ghost min-h-9 rounded-xl px-3 text-xs" disabled={locating}>
              {locating ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <RefreshCw className="h-3.5 w-3.5" />}
              {value.coords ? 'Atualizar posição' : 'Usar minha localização'}
            </button>
          </div>
          {showMap && value.coords && <SearchMap src={mapSrc} />}
        </div>
      )}
    </fieldset>
  );
}

/** Mapa da busca com botão de tela cheia (tela cheia do navegador quando existir; senão, ocupa a janela). */
function SearchMap({ src }: { src: string }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);

  const close = useCallback(() => {
    setExpanded(false);
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
  }, []);

  const open = () => {
    setExpanded(true);
    boxRef.current?.requestFullscreen?.().catch(() => {
      /* sem tela cheia nativa (ex.: iPhone): fica o modo janela inteira */
    });
  };

  useEffect(() => {
    if (!expanded) return;
    // Sair da tela cheia pelo navegador (Esc) também fecha o modo expandido.
    const onFullscreenChange = () => {
      if (!document.fullscreenElement) setExpanded(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('fullscreenchange', onFullscreenChange);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener('fullscreenchange', onFullscreenChange);
      window.removeEventListener('keydown', onKey);
    };
  }, [expanded, close]);

  return (
    <div
      ref={boxRef}
      className={expanded ? 'fixed inset-0 z-[70] bg-ink' : 'relative'}
    >
      <iframe
        title="Mapa da região da busca"
        src={src}
        className={expanded ? 'h-full w-full' : 'h-64 w-full rounded-2xl border border-line sm:h-80'}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <button
        type="button"
        onClick={expanded ? close : open}
        className={`absolute flex min-h-11 items-center gap-2 rounded-xl bg-ink/90 px-3.5 text-sm font-semibold text-fg shadow-lg backdrop-blur transition hover:bg-ink ${
          expanded ? 'top-4 right-4' : 'top-3 right-3'
        }`}
      >
        {expanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
        {expanded ? 'Sair da tela cheia' : 'Tela cheia'}
      </button>
    </div>
  );
}

/** Parâmetros de localização para a API, conforme o modo escolhido. */
export function locationParams(loc: LocationState) {
  if (loc.mode === 'perto' && loc.coords) return { city: '', lat: loc.coords.lat, lng: loc.coords.lng, radiusKm: loc.radiusKm };
  return { city: loc.city.trim() };
}

export function locationError(loc: LocationState): string | null {
  if (loc.mode === 'perto' && !loc.coords) return 'Libere sua localização (botão "Usar minha localização") ou busque por cidade.';
  if (loc.mode === 'cidade' && !loc.city.trim()) return 'Informe a cidade, bairro ou região.';
  return null;
}
