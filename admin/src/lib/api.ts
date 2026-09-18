import type { Lead, ProspectRequest } from '../types';
import { IS_PREVIEW, PREVIEW_SEARCH_MESSAGE } from './preview';

export async function placesConfigured(): Promise<boolean | null> {
  if (IS_PREVIEW) return null;
  try {
    const res = await fetch('/api/health');
    const data = await res.json();
    return Boolean(data.placesConfigured);
  } catch {
    return null;
  }
}

export async function sessaoAtiva(): Promise<boolean> {
  if (IS_PREVIEW) return true;
  try {
    const res = await fetch('/api/session', { credentials: 'same-origin' });
    return Boolean((await res.json()).autenticado);
  } catch {
    return false;
  }
}

export async function entrar(senha: string): Promise<void> {
  const res = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ senha }),
  });
  if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error ?? 'Não foi possível entrar.');
}

export async function sair(): Promise<void> {
  await fetch('/api/logout', { method: 'POST' }).catch(() => undefined);
}

export async function prospect(params: ProspectRequest): Promise<Lead[]> {
  if (IS_PREVIEW) throw new Error(PREVIEW_SEARCH_MESSAGE);
  const res = await fetch('/api/prospect-real', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error ?? 'Erro inesperado na busca.');
  return data.leads as Lead[];
}
