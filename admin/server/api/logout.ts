// Função do Vercel: POST /api/logout — apaga o cookie de sessão.
import { logout } from '../auth';

export function POST(): Response {
  const r = logout();
  return new Response(null, { status: r.status, headers: { 'Set-Cookie': r.setCookie! } });
}
