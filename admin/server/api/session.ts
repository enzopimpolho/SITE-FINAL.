// Função do Vercel: GET /api/session — informa se há sessão de administrador.
import { autenticado } from '../auth';

export function GET(request: Request): Response {
  return Response.json({ autenticado: autenticado(request.headers.get('cookie')) });
}
