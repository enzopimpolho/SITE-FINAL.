import type { Lead } from '../types';

function cell(value: string | number): string {
  const text = String(value ?? '');
  return /[";\n\r]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

export function leadsToCsv(leads: Lead[]): string {
  const header = [
    'Empresa', 'Categoria', 'Cidade', 'Endereço Completo', 'WhatsApp', 'Decisor/Responsável',
    'Nota', 'Avaliações Google', 'Site', 'Score', 'Script Sugerido',
  ];
  const rows = leads.map((l) => [
    l.name,
    l.category,
    l.city,
    l.address,
    l.whatsapp || l.phone,
    `${l.decisionMaker.name} (${l.decisionMaker.role})`,
    l.rating ? l.rating.toFixed(1).replace('.', ',') : '',
    l.reviewsCount,
    l.website || 'Sem site',
    l.aiScore,
    l.suggestedPitch,
  ]);
  return [header, ...rows].map((r) => r.map(cell).join(';')).join('\r\n');
}

function slug(text: string): string {
  return (
    text
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '') || 'todas'
  );
}

export function downloadCsv(leads: Lead[], city: string): void {
  const blob = new Blob(['﻿' + leadsToCsv(leads)], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `leadja-leads-${slug(city)}.csv`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
