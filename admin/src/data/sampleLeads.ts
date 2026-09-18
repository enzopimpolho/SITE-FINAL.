import type { Lead, Stage } from '../types';
import { calculateScore, scoreLabel, scoreReason } from '../lib/score';
import { generatePitch } from '../lib/pitch';

interface Seed {
  name: string;
  category: string;
  address: string;
  rating: number;
  reviewsCount: number;
  hasWebsite: boolean;
  stage: Stage;
  dealValue: number;
}

// Dados fictícios só para a interface não abrir vazia.
const seeds: Seed[] = [
  { name: 'Clínica Odontológica Exemplo A', category: 'Clínicas Odontológicas', address: 'Rua Fictícia, 100 - Centro, São Paulo - SP', rating: 4.8, reviewsCount: 142, hasWebsite: false, stage: 'novo', dealValue: 3200 },
  { name: 'Oficina Mecânica Exemplo B', category: 'Oficinas Mecânicas & Autopeças', address: 'Av. Modelo, 200 - Mooca, São Paulo - SP', rating: 4.6, reviewsCount: 88, hasWebsite: false, stage: 'novo', dealValue: 2500 },
  { name: 'Barbearia Exemplo C', category: 'Barbearias & Salões', address: 'Rua Demonstração, 300 - Pinheiros, São Paulo - SP', rating: 4.9, reviewsCount: 215, hasWebsite: false, stage: 'qualificado', dealValue: 1800 },
  { name: 'Pet Shop Exemplo D', category: 'Pet Shops & Veterinárias', address: 'Rua Teste, 400 - Tatuapé, São Paulo - SP', rating: 4.3, reviewsCount: 64, hasWebsite: false, stage: 'qualificado', dealValue: 2200 },
  { name: 'Restaurante Exemplo E', category: 'Restaurantes & Bares', address: 'Av. Amostra, 500 - Vila Mariana, São Paulo - SP', rating: 4.5, reviewsCount: 320, hasWebsite: false, stage: 'proposta', dealValue: 4000 },
  { name: 'Marcenaria Exemplo F', category: 'Marcenarias & Móveis Planejados', address: 'Rua Protótipo, 600 - Lapa, São Paulo - SP', rating: 4.7, reviewsCount: 39, hasWebsite: false, stage: 'fechado', dealValue: 3500 },
];

export const sampleLeads: Lead[] = seeds.map((s, i) => {
  const phone = `(11) 90000-000${i + 1}`;
  const scoreInput = { hasWebsite: s.hasWebsite, rating: s.rating, reviewsCount: s.reviewsCount };
  const aiScore = calculateScore(scoreInput);
  const base = {
    name: s.name,
    category: s.category,
    city: 'São Paulo',
    rating: s.rating,
    reviewsCount: s.reviewsCount,
    hasWebsite: s.hasWebsite,
    decisionMaker: { name: 'Sócio / Proprietário', role: 'Responsável pelo Estabelecimento' },
  };
  return {
    ...base,
    id: `exemplo-${i + 1}`,
    state: 'SP',
    address: s.address,
    phone,
    whatsapp: phone,
    hasWhatsapp: true,
    website: '',
    googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s.category + ' São Paulo')}`,
    aiScore,
    aiScoreLabel: scoreLabel(aiScore),
    aiReason: scoreReason(scoreInput),
    stage: s.stage,
    suggestedPitch: generatePitch(base),
    dealValue: s.dealValue,
  };
});
