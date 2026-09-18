export function LogoMark({ size = 36, inverted = false }: { size?: number; inverted?: boolean }) {
  const bg = inverted ? '#0B0F0D' : '#3DDC84';
  const fg = inverted ? '#3DDC84' : '#0B0F0D';
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true" className="shrink-0">
      <rect width="48" height="48" rx="13" fill={bg} />
      <path d="M24 8.5c-6.9 0-12.5 5.4-12.5 12.2 0 8.8 12.5 19.3 12.5 19.3s12.5-10.5 12.5-19.3C36.5 13.9 30.9 8.5 24 8.5z" fill={fg} />
      <path d="M25.8 12.5 18.6 23h4.9l-1.6 8 7.3-10.6h-5z" fill={bg} />
    </svg>
  );
}

export function Wordmark({ className = 'text-2xl' }: { className?: string }) {
  return (
    <span className={`display leading-none ${className}`}>
      Lead<span className="text-verde">Já</span>
    </span>
  );
}

export function Logo({ subtitle, size = 36 }: { subtitle?: string; size?: number }) {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark size={size} />
      <span className="flex flex-col gap-0.5">
        <Wordmark />
        {subtitle && <span className="text-[11px] text-faint">{subtitle}</span>}
      </span>
    </span>
  );
}
