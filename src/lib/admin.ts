import { useEffect, useState } from "react";

// Consulta única por carregamento: o cookie de administrador é HttpOnly,
// então só a API (/api/session, mesmo domínio) sabe se o visitante é admin.
let consulta: Promise<boolean> | null = null;

function verificarAdmin(): Promise<boolean> {
  consulta ??= fetch("/api/session", { credentials: "same-origin" })
    .then((r) => (r.ok ? r.json() : { autenticado: false }))
    .then((d: { autenticado?: boolean }) => d.autenticado === true)
    .catch(() => false);
  return consulta;
}

/** Após login/logout, força nova consulta. */
export function reconsultarAdmin() {
  consulta = null;
}

/** Verdadeiro apenas para quem já entrou no painel /admin com a senha de administrador. */
export function useAdmin(): boolean {
  const [admin, setAdmin] = useState(false);
  useEffect(() => {
    let ativo = true;
    verificarAdmin().then((ok) => ativo && setAdmin(ok));
    return () => {
      ativo = false;
    };
  }, []);
  return admin;
}
