import { useState, type FormEvent } from 'react';
import { Loader2, Lock } from 'lucide-react';
import { Logo } from './Logo';
import { entrar } from '../lib/api';

/** Tela de acesso restrito: o LeadJá é uma ferramenta interna do administrador. */
export function AdminLogin({ onEntrar }: { onEntrar: () => void }) {
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [enviando, setEnviando] = useState(false);

  async function enviar(e: FormEvent) {
    e.preventDefault();
    setEnviando(true);
    setErro('');
    try {
      await entrar(senha);
      onEntrar();
    } catch (err) {
      setErro(err instanceof Error ? err.message : 'Não foi possível entrar.');
      setEnviando(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-ink px-4">
      <form onSubmit={enviar} className="w-full max-w-sm rounded-2xl border border-line bg-surface p-8" noValidate>
        <Logo />
        <h1 className="mt-6 flex items-center gap-2 text-lg font-semibold text-fg">
          <Lock className="h-4 w-4 text-verde" aria-hidden="true" /> Acesso restrito
        </h1>
        <p className="mt-1 text-sm text-mist">Ferramenta interna da Nextgen. Entre com a senha de administrador.</p>
        <label htmlFor="senha" className="mt-6 block text-sm font-medium text-soft">
          Senha
        </label>
        <input
          id="senha"
          type="password"
          autoComplete="current-password"
          autoFocus
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          aria-invalid={!!erro}
          aria-describedby={erro ? 'senha-erro' : undefined}
          className="mt-1.5 h-11 w-full rounded-lg border border-line bg-deep px-3 text-fg outline-none focus:border-verde"
        />
        {erro && (
          <p id="senha-erro" role="alert" className="mt-2 text-sm text-brasa">
            {erro}
          </p>
        )}
        <button
          type="submit"
          disabled={!senha || enviando}
          className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-verde font-semibold text-ink transition hover:bg-verde-hover disabled:opacity-50"
        >
          {enviando && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />} Entrar
        </button>
      </form>
    </main>
  );
}
