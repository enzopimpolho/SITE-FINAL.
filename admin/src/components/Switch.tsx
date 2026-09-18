import type { ReactNode } from 'react';

interface Props {
  checked: boolean;
  onChange: (checked: boolean) => void;
  children: ReactNode;
  className?: string;
}

export function Switch({ checked, onChange, children, className = '' }: Props) {
  return (
    <label className={`flex min-h-11 cursor-pointer items-center gap-3 text-sm font-semibold ${className}`}>
      <input type="checkbox" className="peer sr-only" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span
        aria-hidden="true"
        className="flex h-6.5 w-11 shrink-0 items-center rounded-full bg-line-strong p-[3px] transition peer-checked:bg-verde peer-focus-visible:ring-2 peer-focus-visible:ring-verde/50 peer-checked:[&>span]:translate-x-[18px]"
      >
        <span className="h-5 w-5 rounded-full bg-ink transition-transform" />
      </span>
      <span>{children}</span>
    </label>
  );
}
