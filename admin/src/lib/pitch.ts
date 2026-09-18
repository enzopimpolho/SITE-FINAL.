import type { Lead } from '../types';

export const DEFAULT_OFFER = 'Criação de Site Profissional e Posicionamento no Google';

export type Tone = 'consultivo' | 'direto' | 'elogio' | 'demo';

export const TONES: { id: Tone; label: string }[] = [
  { id: 'consultivo', label: 'Consultivo & Estratégico' },
  { id: 'direto', label: 'Direto ao Ponto' },
  { id: 'elogio', label: 'Elogio Google (Rapport)' },
  { id: 'demo', label: 'Convite para Demo' },
];

type PitchLead = Pick<Lead, 'name' | 'city' | 'rating' | 'reviewsCount' | 'category' | 'hasWebsite' | 'decisionMaker'>;

function greeting(lead: PitchLead): string {
  const name = lead.decisionMaker.name;
  const generic = !name || name.includes('/') || name.toLowerCase().startsWith('sócio');
  return generic ? 'Olá, tudo bem?' : `Olá, ${name.split(' ')[0]}, tudo bem?`;
}

function ratingText(lead: PitchLead): string {
  if (!lead.rating) return '';
  const reviews = lead.reviewsCount ? ` com ${lead.reviewsCount} avaliações` : '';
  return `nota ${lead.rating.toFixed(1).replace('.', ',')}${reviews}`;
}

export function generatePitch(lead: PitchLead, tone: Tone = 'consultivo', offer: string = DEFAULT_OFFER): string {
  const hi = greeting(lead);
  const rt = ratingText(lead);
  const city = lead.city || 'sua região';
  const inCity = lead.city ? ` em ${lead.city}` : '';
  const category = lead.category.toLowerCase();
  const siteLine = lead.hasWebsite
    ? `Vi que vocês já têm site, mas acredito que dá para transformar ele em mais pedidos vindos do Google.`
    : `Reparei que o perfil de vocês no Google Maps ainda não tem um site vinculado, e muita gente que pesquisa por ${category}${inCity} acaba escolhendo quem tem.`;

  switch (tone) {
    case 'direto':
      return `${hi} Aqui é da equipe de ${offer}. ${lead.hasWebsite ? 'Vi o site da' : 'Vi que a'} ${lead.name} ${lead.hasWebsite ? 'e tenho uma proposta para gerar mais contatos com ele.' : 'ainda não tem site no Google Maps.'} Monto um site profissional para vocês, pronto para receber clientes pelo WhatsApp. Posso te mandar os valores?`;
    case 'elogio':
      return `${hi} Estava pesquisando ${category} em ${city} e a ${lead.name} chamou minha atenção${rt ? `: ${rt} no Google` : ''}, parabéns pelo trabalho! ${siteLine} Trabalho com ${offer} e adoraria ajudar vocês a aparecer ainda mais. Posso te mostrar uma ideia?`;
    case 'demo':
      return `${hi} Sou especialista em ${offer} para ${category} em ${city}. Preparei uma prévia de como ficaria a presença online da ${lead.name}. ${siteLine} Topa uma conversa rápida de 10 minutos esta semana para eu te mostrar?`;
    case 'consultivo':
    default:
      return `${hi} Fiz uma análise rápida da presença digital da ${lead.name}${inCity}${rt ? ` (${rt} no Google)` : ''}. ${siteLine} Trabalho com ${offer} e tenho algumas sugestões práticas para vocês converterem mais dessas buscas em clientes. Posso te enviar?`;
  }
}
