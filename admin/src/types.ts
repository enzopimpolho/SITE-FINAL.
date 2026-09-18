export type Stage = 'novo' | 'qualificado' | 'proposta' | 'fechado';

export type ScoreLabel = 'Quente' | 'Muito Quente' | 'Super Quente';

export interface DecisionMaker {
  name: string;
  role: string;
}

export interface Lead {
  id: string;
  name: string;
  category: string;
  city: string;
  state: string;
  address: string;
  phone: string;
  whatsapp: string;
  hasWhatsapp: boolean;
  website: string;
  hasWebsite: boolean;
  googleMapsUrl: string;
  rating: number;
  reviewsCount: number;
  decisionMaker: DecisionMaker;
  aiScore: number;
  aiScoreLabel: ScoreLabel;
  aiReason: string;
  stage: Stage;
  suggestedPitch: string;
  dealValue: number;
  /** Distância até o ponto da busca, quando a busca foi por localização. */
  distanceKm?: number;
}

export interface ProspectRequest {
  niche: string;
  city: string;
  onlyWithoutWebsite?: boolean;
  lat?: number;
  lng?: number;
  /** Raio da busca por localização, em km (1 a 50). */
  radiusKm?: number;
}

export type ToastKind = 'success' | 'error' | 'info';

export interface ToastMessage {
  id: number;
  kind: ToastKind;
  text: string;
}
