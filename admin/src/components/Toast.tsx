import { useCallback, useState } from 'react';
import { CheckCircle2, Info, X, XCircle } from 'lucide-react';
import type { ToastKind, ToastMessage } from '../types';

export type Notify = (text: string, kind?: ToastKind) => void;

let nextId = 1;

export function useToasts() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const dismiss = useCallback((id: number) => {
    setToasts((list) => list.filter((t) => t.id !== id));
  }, []);

  const notify = useCallback<Notify>(
    (text, kind = 'success') => {
      const id = nextId++;
      setToasts((list) => [...list, { id, kind, text }]);
      window.setTimeout(() => dismiss(id), kind === 'error' ? 7000 : 4000);
    },
    [dismiss],
  );

  return { toasts, notify, dismiss };
}

const ICONS = {
  success: <CheckCircle2 className="h-5 w-5 shrink-0 text-verde" />,
  error: <XCircle className="h-5 w-5 shrink-0 text-brasa" />,
  info: <Info className="h-5 w-5 shrink-0 text-mist" />,
};

export function ToastStack({ toasts, onDismiss }: { toasts: ToastMessage[]; onDismiss: (id: number) => void }) {
  return (
    <div className="pointer-events-none fixed inset-x-4 top-4 z-[60] flex flex-col items-end gap-2 sm:left-auto sm:w-96" aria-live="polite">
      {toasts.map((t) => (
        <div
          key={t.id}
          role="status"
          className="pointer-events-auto flex w-full items-start gap-3 rounded-2xl border border-line bg-surface-2/95 p-4 text-sm shadow-2xl backdrop-blur"
        >
          {ICONS[t.kind]}
          <p className="flex-1 leading-relaxed text-soft">{t.text}</p>
          <button onClick={() => onDismiss(t.id)} className="-m-1 p-1 text-faint hover:text-fg" aria-label="Fechar aviso">
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
