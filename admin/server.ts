import 'dotenv/config';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express, { type Request, type Response } from 'express';
import { health, prospectReal } from './server/prospect';
import { NAO_AUTORIZADO, autenticado, login, logout, type RespostaAuth } from './server/auth';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT) || 3000;
const isProd = process.env.NODE_ENV === 'production';
const API_KEY = process.env.GOOGLE_MAPS_API_KEY;

if (!API_KEY) {
  console.warn('[LeadJá] ⚠ GOOGLE_MAPS_API_KEY não definida no .env. A busca real vai responder com erro até você configurar a chave.');
}

const app = express();
app.use(express.json({ limit: '100kb' }));

app.get('/api/health', (_req: Request, res: Response) => {
  const result = health(API_KEY);
  res.status(result.status).json(result.body);
});

const responder = (res: Response, r: RespostaAuth) => {
  if (r.setCookie) res.setHeader('Set-Cookie', r.setCookie);
  if (r.body === null) res.status(r.status).end();
  else res.status(r.status).json(r.body);
};

app.get('/api/session', (req: Request, res: Response) => {
  res.json({ autenticado: autenticado(req.headers.cookie) });
});
app.post('/api/login', async (req: Request, res: Response) => responder(res, await login(req.body)));
app.post('/api/logout', (_req: Request, res: Response) => responder(res, logout()));

app.post('/api/prospect-real', async (req: Request, res: Response) => {
  if (!autenticado(req.headers.cookie)) return responder(res, NAO_AUTORIZADO);
  const result = await prospectReal(req.body, API_KEY);
  res.status(result.status).json(result.body);
});

async function start() {
  const httpServer = http.createServer(app);

  if (isProd) {
    const dist = path.join(__dirname, 'dist');
    app.use(express.static(dist));
    app.get('/{*splat}', (_req, res) => res.sendFile(path.join(dist, 'index.html')));
  } else {
    const { createServer } = await import('vite');
    // HMR usa o mesmo servidor HTTP, sem abrir outra porta.
    const vite = await createServer({ server: { middlewareMode: true, hmr: { server: httpServer } }, appType: 'spa' });
    app.use(vite.middlewares);
  }

  httpServer.listen(PORT, () => {
    console.log(`[LeadJá] Rodando em http://localhost:${PORT} (${isProd ? 'produção' : 'desenvolvimento'})`);
  });
}

start();
