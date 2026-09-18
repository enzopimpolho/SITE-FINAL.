// Empacota as funções do Vercel (server/api/*.ts) em api/*.js, cada uma num arquivo
// sem imports locais, para rodarem no Vercel sem depender de resolução de TypeScript.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

await build({
  entryPoints: ['health', 'prospect-real', 'session', 'login', 'logout'].map((f) => path.join(raiz, 'server/api', f + '.ts')),
  // funções da Vercel ficam na pasta api/ da raiz do site
  outdir: path.join(raiz, '../api'),
  bundle: true,
  platform: 'node',
  target: 'node20',
  format: 'esm',
  logLevel: 'info',
  banner: { js: '// Arquivo gerado por scripts/build-api.mjs a partir de server/api. Não edite à mão.' },
});
