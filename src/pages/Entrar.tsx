import { useState, type FormEvent } from "react";
import { Loader2, Lock } from "lucide-react";
import { reconsultarAdmin, useAdmin } from "../lib/admin";

/** Login do administrador no próprio site; libera o LeadJá no menu. */
export default function Entrar() {
  const jaAdmin = useAdmin();
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);

  async function enviar(e: FormEvent) {
    e.preventDefault();
    setEnviando(true);
    setErro("");
    try {
      const r = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ senha }),
      });
      if (!r.ok) throw new Error((await r.json().catch(() => ({}))).error ?? "Não foi possível entrar.");
      reconsultarAdmin();
      window.location.assign("/admin");
    } catch (err) {
      setErro(err instanceof Error ? err.message : "Não foi possível entrar.");
      setEnviando(false);
    }
  }

  return (
    <section className="container-x flex min-h-[80vh] items-center justify-center pb-24 pt-40">
      <meta name="robots" content="noindex, nofollow" />
      <div className="w-full max-w-sm rounded-[24px] border border-white/10 bg-ink-850 p-8">
        <p className="label flex items-center gap-2">
          <Lock size={13} aria-hidden="true" /> Área restrita
        </p>
        <h1 className="mt-3 text-2xl font-medium text-fog-50">Acesso do administrador</h1>
        {jaAdmin ? (
          <a href="/admin" className="btn-primary mt-6 w-full">
            Abrir LeadJá
          </a>
        ) : (
          <form onSubmit={enviar} noValidate className="mt-6">
            <label htmlFor="senha-admin" className="mb-2 block text-sm text-fog-300">
              Senha
            </label>
            <input
              id="senha-admin"
              type="password"
              autoComplete="current-password"
              autoFocus
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              aria-invalid={!!erro}
              aria-describedby={erro ? "erro-admin" : undefined}
              className="field"
            />
            {erro && (
              <p id="erro-admin" role="alert" className="mt-2 text-sm text-red-400">
                {erro}
              </p>
            )}
            <button type="submit" disabled={!senha || enviando} className="btn-primary mt-5 w-full disabled:opacity-50">
              {enviando && <Loader2 size={16} className="animate-spin" aria-hidden="true" />}
              Entrar
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
