// Função do Vercel: POST /api/login — confere a senha e grava o cookie de sessão.
import { login } from '../auth';

export async function POST(request: Request): Promise<Response> {
  const r = await login(await request.json().catch(() => null));
  const headers = r.setCookie ? { 'Set-Cookie': r.setCookie } : undefined;
  return Response.json(r.body, { status: r.status, headers });
}
