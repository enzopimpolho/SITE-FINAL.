export function onlyDigits(value: string): string {
  return value.replace(/\D/g, '');
}

export function hasWhatsapp(phone: string): boolean {
  return onlyDigits(phone).length >= 10;
}

/** Monta o link wa.me com DDI 55 (sem duplicar se o número já vier com ele). */
export function whatsappLink(phone: string, text?: string): string {
  let digits = onlyDigits(phone);
  if (!(digits.startsWith('55') && digits.length >= 12)) digits = '55' + digits;
  const query = text ? `?text=${encodeURIComponent(text)}` : '';
  return `https://wa.me/${digits}${query}`;
}

export function formatBRL(value: number): string {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
}
