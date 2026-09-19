// Lógica da busca no Google Places, usada pelo servidor local (server.ts)
// e pelas funções do Vercel (server/api/*.ts → api/*.js).
import { calculateScore, scoreLabel, scoreReason } from '../src/lib/score';
import { generatePitch } from '../src/lib/pitch';
import { hasWhatsapp } from '../src/lib/whatsapp';
import type { Lead, ProspectRequest } from '../src/types';

export interface ApiResult {
  status: number;
  body: unknown;
}

const FIELD_MASK = [
  'places.id',
  'places.displayName',
  'places.formattedAddress',
  'places.nationalPhoneNumber',
  'places.rating',
  'places.userRatingCount',
  'places.websiteUri',
  'places.types',
  'places.location',
].join(',');

interface Place {
  id: string;
  location?: { latitude: number; longitude: number };
  displayName?: { text: string };
  formattedAddress?: string;
  nationalPhoneNumber?: string;
  rating?: number;
  userRatingCount?: number;
  websiteUri?: string;
  types?: string[];
}

/** Tenta extrair cidade e UF de um endereço como "Rua X, 123 - Bairro, São Paulo - SP, 01000-000, Brasil". */
function parseCityState(address: string, fallbackCity: string): { city: string; state: string } {
  const match = address.match(/,\s*([^,]+?)\s*-\s*([A-Z]{2})\s*(?:,|$)/);
  if (match) return { city: match[1], state: match[2] };
  const [city, state = ''] = fallbackCity.split(',').map((s) => s.trim());
  return { city: city || fallbackCity, state };
}

/** Distância em km entre dois pontos (fórmula de haversine). */
function distanceKm(aLat: number, aLng: number, bLat: number, bLng: number): number {
  const rad = (d: number) => (d * Math.PI) / 180;
  const dLat = rad(bLat - aLat);
  const dLng = rad(bLng - aLng);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(aLat)) * Math.cos(rad(bLat)) * Math.sin(dLng / 2) ** 2;
  return 6371 * 2 * Math.asin(Math.sqrt(h));
}

function placeToLead(place: Place, niche: string, fallbackCity: string): Lead {
  const phone = place.nationalPhoneNumber ?? '';
  const website = place.websiteUri ?? '';
  const rating = place.rating ?? 0;
  const reviewsCount = place.userRatingCount ?? 0;
  const hasWebsite = Boolean(website);
  const scoreInput = { hasWebsite, rating, reviewsCount };
  const aiScore = calculateScore(scoreInput);
  const { city, state } = parseCityState(place.formattedAddress ?? '', fallbackCity);
  const base = {
    name: place.displayName?.text ?? 'Estabelecimento sem nome',
    category: niche,
    city,
    rating,
    reviewsCount,
    hasWebsite,
    decisionMaker: { name: 'Sócio / Proprietário', role: 'Responsável pelo Estabelecimento' },
  };

  return {
    id: place.id,
    ...base,
    state,
    address: place.formattedAddress ?? '',
    phone,
    whatsapp: phone,
    hasWhatsapp: hasWhatsapp(phone),
    website,
    googleMapsUrl: `https://www.google.com/maps/place/?q=place_id:${place.id}`,
    aiScore,
    aiScoreLabel: scoreLabel(aiScore),
    aiReason: scoreReason(scoreInput),
    stage: 'novo',
    suggestedPitch: generatePitch(base),
    dealValue: 2500,
  };
}

export function health(apiKey: string | undefined): ApiResult {
  return { status: 200, body: { status: 'ok', placesConfigured: Boolean(apiKey) } };
}

export async function prospectReal(input: unknown, apiKey: string | undefined): Promise<ApiResult> {
  if (!apiKey) {
    return {
      status: 500,
      body: { error: 'A chave GOOGLE_MAPS_API_KEY não está configurada no servidor. No computador, adicione-a ao .env; no Vercel, em Settings → Environment Variables.' },
    };
  }

  const { niche, city, onlyWithoutWebsite = true, lat, lng, radiusKm } = (input ?? {}) as ProspectRequest;
  const term = String(niche ?? '').trim();
  const place = String(city ?? '').trim();
  const hasCoords = typeof lat === 'number' && typeof lng === 'number' && Number.isFinite(lat) && Number.isFinite(lng);
  const radius = Math.min(50, Math.max(1, Number(radiusKm) || 10));

  if (!term) return { status: 400, body: { error: 'Informe o nicho ou termo de busca.' } };
  if (!place && !hasCoords) return { status: 400, body: { error: 'Informe a cidade ou use a sua localização.' } };

  const request: Record<string, unknown> = {
    textQuery: hasCoords ? term : `${term} em ${place}`,
    pageSize: 20,
    languageCode: 'pt-BR',
    regionCode: 'BR',
  };
  if (hasCoords) {
    request.locationBias = { circle: { center: { latitude: lat, longitude: lng }, radius: radius * 1000 } };
  }

  try {
    // O Google entrega até 3 páginas de 20. Como a maioria já tem site,
    // uma página só costuma zerar depois do filtro; buscamos todas.
    const places: Place[] = [];
    let pageToken: string | undefined;
    for (let pagina = 0; pagina < 3; pagina++) {
      const response = await fetch('https://places.googleapis.com/v1/places:searchText', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': apiKey,
          'X-Goog-FieldMask': `${FIELD_MASK},nextPageToken`,
        },
        body: JSON.stringify(pageToken ? { ...request, pageToken } : request),
      });

      if (!response.ok) {
        if (places.length) break; // páginas seguintes são bônus
        const detail = await response.json().catch(() => null);
        const message = detail?.error?.message ?? response.statusText;
        console.error('[LeadJá] Erro da Places API:', response.status, message);
        return { status: 500, body: { error: `O Google Places recusou a busca (${response.status}): ${message}` } };
      }

      const data = (await response.json()) as { places?: Place[]; nextPageToken?: string };
      places.push(...(data.places ?? []));
      pageToken = data.nextPageToken;
      if (!pageToken) break;
    }

    let outsideRadius = 0;
    const leads = places
      .filter((p) => Boolean(p.nationalPhoneNumber))
      .filter((p) => !(onlyWithoutWebsite && p.websiteUri))
      .map((p) => {
        const lead = placeToLead(p, term, place);
        if (hasCoords && p.location) {
          lead.distanceKm = Math.round(distanceKm(lat, lng, p.location.latitude, p.location.longitude) * 10) / 10;
        }
        return lead;
      })
      // O Google só prioriza o raio; aqui ele vira limite de verdade.
      .filter((l) => {
        const inside = l.distanceKm === undefined || l.distanceKm <= radius;
        if (!inside) outsideRadius++;
        return inside;
      })
      .sort((a, b) => b.aiScore - a.aiScore || (a.distanceKm ?? 0) - (b.distanceKm ?? 0));

    return { status: 200, body: { leads, total: leads.length, outsideRadius } };
  } catch (err) {
    console.error('[LeadJá] Falha ao consultar a Places API:', err);
    return { status: 500, body: { error: 'Não foi possível conectar ao Google Places. Verifique sua conexão e tente novamente.' } };
  }
}
