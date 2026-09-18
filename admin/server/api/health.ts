// Função do Vercel: GET /api/health (empacotada em api/health.js por scripts/build-api.mjs).
import { health } from '../prospect';

export function GET(): Response {
  const result = health(process.env.GOOGLE_MAPS_API_KEY);
  return Response.json(result.body, { status: result.status });
}
