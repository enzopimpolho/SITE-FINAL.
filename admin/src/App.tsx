import { useEffect, useState } from 'react';
import { LogOut } from 'lucide-react';
import type { Lead } from './types';
import { sampleLeads } from './data/sampleLeads';
import { Dashboard } from './components/Dashboard';
import { Landing } from './components/Landing';
import { ToastStack, useToasts } from './components/Toast';
import { IS_PREVIEW } from './lib/preview';
import { AdminLogin } from './components/AdminLogin';
import { sair, sessaoAtiva } from './lib/api';

export default function App() {
  const [view, setView] = useState<'landing' | 'app'>('app');
  const [leads, setLeads] = useState<Lead[]>(sampleLeads);
  const { toasts, notify, dismiss } = useToasts();
  const [acesso, setAcesso] = useState<'verificando' | 'negado' | 'ok'>('verificando');

  useEffect(() => {
    sessaoAtiva().then((ok) => setAcesso(ok ? 'ok' : 'negado'));
  }, []);

  const go = (next: 'landing' | 'app') => {
    setView(next);
    window.scrollTo({ top: 0 });
  };

  if (acesso === 'verificando') return <main className="min-h-screen bg-ink" aria-busy="true" />;
  if (acesso === 'negado') return <AdminLogin onEntrar={() => setAcesso('ok')} />;

  return (
    <>
      {!IS_PREVIEW && (
        <button
          type="button"
          onClick={() => sair().then(() => setAcesso('negado'))}
          className="fixed bottom-4 left-4 z-50 flex items-center gap-1.5 rounded-full border border-line bg-surface/90 px-3 py-1.5 text-xs font-medium text-mist backdrop-blur transition hover:text-fg"
        >
          <LogOut className="h-3.5 w-3.5" aria-hidden="true" /> Sair
        </button>
      )}
      {IS_PREVIEW && (
        <p className="border-b border-line-soft bg-surface px-4 py-2 text-center text-xs text-mist">
          <strong className="text-ambar">Versão de visualização.</strong> A busca real no Google Maps e o download de CSV só funcionam rodando o LeadJá no seu computador.
        </p>
      )}
      {view === 'landing' ? (
        <Landing onOpenApp={() => go('app')} />
      ) : (
        <Dashboard leads={leads} setLeads={setLeads} onBack={() => go('landing')} notify={notify} />
      )}
      <ToastStack toasts={toasts} onDismiss={dismiss} />
    </>
  );
}
