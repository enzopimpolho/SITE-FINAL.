import type { ScoreLabel } from '../types';

export interface ScoreInput {
  hasWebsite: boolean;
  rating: number;
  reviewsCount: number;
}

/** Nota de oportunidade: base 70, +15 sem site, +5 nota ≥ 4.5, +10 com mais de 100 avaliações, máximo 99. */
export function calculateScore({ hasWebsite, rating, reviewsCount }: ScoreInput): number {
  let score = 70;
  if (!hasWebsite) score += 15;
  if (rating >= 4.5) score += 5;
  if (reviewsCount > 100) score += 10;
  return Math.min(score, 99);
}

export function scoreLabel(score: number): ScoreLabel {
  if (score >= 90) return 'Super Quente';
  if (score >= 80) return 'Muito Quente';
  return 'Quente';
}

export function scoreReason({ hasWebsite, rating, reviewsCount }: ScoreInput): string {
  const parts: string[] = [];
  if (!hasWebsite) parts.push('não tem site no perfil do Google');
  if (rating >= 4.5) parts.push(`nota alta (${rating.toFixed(1).replace('.', ',')})`);
  if (reviewsCount > 100) parts.push(`${reviewsCount} avaliações, clientela ativa`);
  if (parts.length === 0) return 'Negócio ativo no Google Maps com telefone público para contato.';
  const text = parts.join(', ');
  return text.charAt(0).toUpperCase() + text.slice(1) + '.';
}
