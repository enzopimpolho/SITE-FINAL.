// Função do Vercel: POST /api/prospect-real (empacotada em api/prospect-real.js por scripts/build-api.mjs).
import { NAO_AUTORIZADO, autenticado } from '../auth';
import { prospectReal } from '../prospect';

export async function POST(request: Request): Promise<Response> {
  if (!autenticado(request.headers.get('cookie'))) {
    return Response.json(NAO_AUTORIZADO.body, { status: NAO_AUTORIZADO.status });
  }
  const input = await request.json().catch(() => null);
  const result = await prospectReal(input, process.env.GOOGLE_MAPS_API_KEY);
  return Response.json(result.body, { status: result.status });
}
