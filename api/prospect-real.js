// Arquivo gerado por scripts/build-api.mjs a partir de server/api. Não edite à mão.

// server/auth.ts
import { createHmac, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
var COOKIE_SESSAO = "leadja_sessao";
var VALIDADE_MS = 365 * 24 * 60 * 60 * 1e3;
var config = () => ({
  hash: process.env.LEADJA_ADMIN_HASH,
  segredo: process.env.LEADJA_SESSION_SECRET
});
function authDesativada({ hash, segredo }) {
  const producao = process.env.VERCEL || process.env.NODE_ENV === "production";
  return !producao && (!hash || !segredo);
}
var assinar = (dados, segredo) => createHmac("sha256", segredo).update(dados).digest("base64url");
function tokenValido(token, segredo) {
  if (!token) return false;
  const [expira, assinatura] = token.split(".");
  if (!expira || !assinatura || Number(expira) < Date.now()) return false;
  const a = Buffer.from(assinatura);
  const b = Buffer.from(assinar(expira, segredo));
  return a.length === b.length && timingSafeEqual(a, b);
}
function lerCookie(header, nome) {
  for (const parte of (header ?? "").split(";")) {
    const [k, ...v] = parte.trim().split("=");
    if (k === nome) return decodeURIComponent(v.join("="));
  }
  return void 0;
}
function autenticado(cookieHeader) {
  const c = config();
  if (authDesativada(c)) return true;
  if (!c.segredo) return false;
  return tokenValido(lerCookie(cookieHeader, COOKIE_SESSAO), c.segredo);
}
var NAO_AUTORIZADO = {
  status: 401,
  body: { error: "Acesso restrito ao administrador. Fa\xE7a login." }
};

// src/lib/score.ts
function calculateScore({ hasWebsite, rating, reviewsCount }) {
  let score = 70;
  if (!hasWebsite) score += 15;
  if (rating >= 4.5) score += 5;
  if (reviewsCount > 100) score += 10;
  return Math.min(score, 99);
}
function scoreLabel(score) {
  if (score >= 90) return "Super Quente";
  if (score >= 80) return "Muito Quente";
  return "Quente";
}
function scoreReason({ hasWebsite, rating, reviewsCount }) {
  const parts = [];
  if (!hasWebsite) parts.push("n\xE3o tem site no perfil do Google");
  if (rating >= 4.5) parts.push(`nota alta (${rating.toFixed(1).replace(".", ",")})`);
  if (reviewsCount > 100) parts.push(`${reviewsCount} avalia\xE7\xF5es, clientela ativa`);
  if (parts.length === 0) return "Neg\xF3cio ativo no Google Maps com telefone p\xFAblico para contato.";
  const text = parts.join(", ");
  return text.charAt(0).toUpperCase() + text.slice(1) + ".";
}

// src/lib/pitch.ts
var DEFAULT_OFFER = "Cria\xE7\xE3o de Site Profissional e Posicionamento no Google";
function greeting(lead) {
  const name = lead.decisionMaker.name;
  const generic = !name || name.includes("/") || name.toLowerCase().startsWith("s\xF3cio");
  return generic ? "Ol\xE1, tudo bem?" : `Ol\xE1, ${name.split(" ")[0]}, tudo bem?`;
}
function ratingText(lead) {
  if (!lead.rating) return "";
  const reviews = lead.reviewsCount ? ` com ${lead.reviewsCount} avalia\xE7\xF5es` : "";
  return `nota ${lead.rating.toFixed(1).replace(".", ",")}${reviews}`;
}
function generatePitch(lead, tone = "consultivo", offer = DEFAULT_OFFER) {
  const hi = greeting(lead);
  const rt = ratingText(lead);
  const city = lead.city || "sua regi\xE3o";
  const inCity = lead.city ? ` em ${lead.city}` : "";
  const category = lead.category.toLowerCase();
  const siteLine = lead.hasWebsite ? `Vi que voc\xEAs j\xE1 t\xEAm site, mas acredito que d\xE1 para transformar ele em mais pedidos vindos do Google.` : `Reparei que o perfil de voc\xEAs no Google Maps ainda n\xE3o tem um site vinculado, e muita gente que pesquisa por ${category}${inCity} acaba escolhendo quem tem.`;
  switch (tone) {
    case "direto":
      return `${hi} Aqui \xE9 da equipe de ${offer}. ${lead.hasWebsite ? "Vi o site da" : "Vi que a"} ${lead.name} ${lead.hasWebsite ? "e tenho uma proposta para gerar mais contatos com ele." : "ainda n\xE3o tem site no Google Maps."} Monto um site profissional para voc\xEAs, pronto para receber clientes pelo WhatsApp. Posso te mandar os valores?`;
    case "elogio":
      return `${hi} Estava pesquisando ${category} em ${city} e a ${lead.name} chamou minha aten\xE7\xE3o${rt ? `: ${rt} no Google` : ""}, parab\xE9ns pelo trabalho! ${siteLine} Trabalho com ${offer} e adoraria ajudar voc\xEAs a aparecer ainda mais. Posso te mostrar uma ideia?`;
    case "demo":
      return `${hi} Sou especialista em ${offer} para ${category} em ${city}. Preparei uma pr\xE9via de como ficaria a presen\xE7a online da ${lead.name}. ${siteLine} Topa uma conversa r\xE1pida de 10 minutos esta semana para eu te mostrar?`;
    case "consultivo":
    default:
      return `${hi} Fiz uma an\xE1lise r\xE1pida da presen\xE7a digital da ${lead.name}${inCity}${rt ? ` (${rt} no Google)` : ""}. ${siteLine} Trabalho com ${offer} e tenho algumas sugest\xF5es pr\xE1ticas para voc\xEAs converterem mais dessas buscas em clientes. Posso te enviar?`;
  }
}

// src/lib/whatsapp.ts
function onlyDigits(value) {
  return value.replace(/\D/g, "");
}
function hasWhatsapp(phone) {
  return onlyDigits(phone).length >= 10;
}

// server/prospect.ts
var FIELD_MASK = [
  "places.id",
  "places.displayName",
  "places.formattedAddress",
  "places.nationalPhoneNumber",
  "places.rating",
  "places.userRatingCount",
  "places.websiteUri",
  "places.types",
  "places.location"
].join(",");
function parseCityState(address, fallbackCity) {
  const match = address.match(/,\s*([^,]+?)\s*-\s*([A-Z]{2})\s*(?:,|$)/);
  if (match) return { city: match[1], state: match[2] };
  const [city, state = ""] = fallbackCity.split(",").map((s) => s.trim());
  return { city: city || fallbackCity, state };
}
function distanceKm(aLat, aLng, bLat, bLng) {
  const rad = (d) => d * Math.PI / 180;
  const dLat = rad(bLat - aLat);
  const dLng = rad(bLng - aLng);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(aLat)) * Math.cos(rad(bLat)) * Math.sin(dLng / 2) ** 2;
  return 6371 * 2 * Math.asin(Math.sqrt(h));
}
function placeToLead(place, niche, fallbackCity) {
  const phone = place.nationalPhoneNumber ?? "";
  const website = place.websiteUri ?? "";
  const rating = place.rating ?? 0;
  const reviewsCount = place.userRatingCount ?? 0;
  const hasWebsite = Boolean(website);
  const scoreInput = { hasWebsite, rating, reviewsCount };
  const aiScore = calculateScore(scoreInput);
  const { city, state } = parseCityState(place.formattedAddress ?? "", fallbackCity);
  const base = {
    name: place.displayName?.text ?? "Estabelecimento sem nome",
    category: niche,
    city,
    rating,
    reviewsCount,
    hasWebsite,
    decisionMaker: { name: "S\xF3cio / Propriet\xE1rio", role: "Respons\xE1vel pelo Estabelecimento" }
  };
  return {
    id: place.id,
    ...base,
    state,
    address: place.formattedAddress ?? "",
    phone,
    whatsapp: phone,
    hasWhatsapp: hasWhatsapp(phone),
    website,
    googleMapsUrl: `https://www.google.com/maps/place/?q=place_id:${place.id}`,
    aiScore,
    aiScoreLabel: scoreLabel(aiScore),
    aiReason: scoreReason(scoreInput),
    stage: "novo",
    suggestedPitch: generatePitch(base),
    dealValue: 2500
  };
}
async function prospectReal(input, apiKey) {
  if (!apiKey) {
    return {
      status: 500,
      body: { error: "A chave GOOGLE_MAPS_API_KEY n\xE3o est\xE1 configurada no servidor. No computador, adicione-a ao .env; no Vercel, em Settings \u2192 Environment Variables." }
    };
  }
  const { niche, city, onlyWithoutWebsite = true, lat, lng, radiusKm } = input ?? {};
  const term = String(niche ?? "").trim();
  const place = String(city ?? "").trim();
  const hasCoords = typeof lat === "number" && typeof lng === "number" && Number.isFinite(lat) && Number.isFinite(lng);
  const radius = Math.min(50, Math.max(1, Number(radiusKm) || 10));
  if (!term) return { status: 400, body: { error: "Informe o nicho ou termo de busca." } };
  if (!place && !hasCoords) return { status: 400, body: { error: "Informe a cidade ou use a sua localiza\xE7\xE3o." } };
  const request = {
    textQuery: hasCoords ? term : `${term} em ${place}`,
    pageSize: 20,
    languageCode: "pt-BR",
    regionCode: "BR"
  };
  if (hasCoords) {
    request.locationBias = { circle: { center: { latitude: lat, longitude: lng }, radius: radius * 1e3 } };
  }
  try {
    const places = [];
    let pageToken;
    for (let pagina = 0; pagina < 3; pagina++) {
      const response = await fetch("https://places.googleapis.com/v1/places:searchText", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask": `${FIELD_MASK},nextPageToken`
        },
        body: JSON.stringify(pageToken ? { ...request, pageToken } : request)
      });
      if (!response.ok) {
        if (places.length) break;
        const detail = await response.json().catch(() => null);
        const message = detail?.error?.message ?? response.statusText;
        console.error("[LeadJ\xE1] Erro da Places API:", response.status, message);
        return { status: 500, body: { error: `O Google Places recusou a busca (${response.status}): ${message}` } };
      }
      const data = await response.json();
      places.push(...data.places ?? []);
      pageToken = data.nextPageToken;
      if (!pageToken) break;
    }
    let outsideRadius = 0;
    const leads = places.filter((p) => Boolean(p.nationalPhoneNumber)).filter((p) => !(onlyWithoutWebsite && p.websiteUri)).map((p) => {
      const lead = placeToLead(p, term, place);
      if (hasCoords && p.location) {
        lead.distanceKm = Math.round(distanceKm(lat, lng, p.location.latitude, p.location.longitude) * 10) / 10;
      }
      return lead;
    }).filter((l) => {
      const inside = l.distanceKm === void 0 || l.distanceKm <= radius;
      if (!inside) outsideRadius++;
      return inside;
    }).sort((a, b) => b.aiScore - a.aiScore || (a.distanceKm ?? 0) - (b.distanceKm ?? 0));
    return { status: 200, body: { leads, total: leads.length, outsideRadius } };
  } catch (err) {
    console.error("[LeadJ\xE1] Falha ao consultar a Places API:", err);
    return { status: 500, body: { error: "N\xE3o foi poss\xEDvel conectar ao Google Places. Verifique sua conex\xE3o e tente novamente." } };
  }
}

// server/api/prospect-real.ts
async function POST(request) {
  if (!autenticado(request.headers.get("cookie"))) {
    return Response.json(NAO_AUTORIZADO.body, { status: NAO_AUTORIZADO.status });
  }
  const input = await request.json().catch(() => null);
  const result = await prospectReal(input, process.env.GOOGLE_MAPS_API_KEY);
  return Response.json(result.body, { status: result.status });
}
export {
  POST
};
