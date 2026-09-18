/** Classes de cor do score: brasa (≥ 90), âmbar (≥ 80) ou neutro. */
export function heat(score: number) {
  if (score >= 90) return { text: 'text-brasa', bg: 'bg-brasa/15', bar: 'bg-brasa' };
  if (score >= 80) return { text: 'text-ambar', bg: 'bg-ambar/15', bar: 'bg-ambar' };
  return { text: 'text-soft', bg: 'bg-fg/10', bar: 'bg-soft' };
}

export function initials(name: string): string {
  const skip = new Set(['de', 'da', 'do', 'das', 'dos', 'e', 'em', 'a', 'o']);
  const words = name.split(/\s+/).filter((w) => /^[\p{L}\d]/u.test(w) && !skip.has(w.toLowerCase()));
  return (words[0]?.[0] ?? name[0] ?? '?').toUpperCase() + (words[1]?.[0] ?? '').toUpperCase();
}
