# LeadJá

Plataforma de prospecção B2B: busca negócios locais no Google Maps, filtra os que não têm site, dá uma nota de oportunidade e ajuda a abordar pelo WhatsApp.

## Como rodar

Requisitos: Node 20 ou superior.

1. Instale as dependências: `npm install`
2. Copie `.env.example` para `.env` e preencha `GOOGLE_MAPS_API_KEY` com uma chave que tenha a **Places API (New)** ativada no Google Cloud.
3. Desenvolvimento: `npm run dev` e abra http://localhost:3000
4. Produção: `npm run build` e depois `npm start`

A chave fica só no servidor (`server.ts`). Sem ela, o app abre normalmente, mas a busca real responde com erro.

## Publicar no Vercel

1. Importe o repositório do GitHub no Vercel (o `vercel.json` já define Vite, `npm run build` e a pasta `dist`).
2. Em **Settings → Environment Variables**, crie `GOOGLE_MAPS_API_KEY` com a sua chave e faça um novo deploy.
3. A cada `git push` na branch `main`, o Vercel publica de novo.

No Vercel, a busca roda nas funções `api/health.js` e `api/prospect-real.js`. Elas são geradas a partir de `server/api/*.ts` por `npm run build:api` (o `npm run build` já faz isso). O código da busca fica em `server/prospect.ts` e é o mesmo usado pelo `server.ts` local.

## Estrutura

- `server.ts`: Express com `GET /api/health` e `POST /api/prospect-real`. Em dev usa o Vite como middleware; em produção serve `dist/`.
- `src/components`: Landing, Dashboard, Extractor, LeadCard, Kanban, ScriptGenerator, RoiPanel, AddLeadModal, Toast.
- `src/lib`: score, csv, whatsapp e modelos de mensagem (`pitch.ts`).
- `src/data/sampleLeads.ts`: 6 leads fictícios para a interface não abrir vazia.

## Observações

- Não há banco de dados nem login: os leads ficam na memória do navegador e somem ao recarregar.
- O "Gerador de Scripts" usa modelos de texto com variáveis, não um modelo de linguagem.
- Busca por **cidade/bairro/região** ou **perto de mim** (geolocalização do navegador, raio de 2 a 50 km). No modo perto de mim, o servidor descarta empresas fora do raio e mostra a distância de cada uma.
- Espaços reservados em `src/components/Landing.tsx`: números de prova social (`[NÚMERO]`, `[NOTA]`...), depoimentos e o WhatsApp de atendimento (`SUPPORT_WHATSAPP`).
- Identidade visual "Verde Já": cores e fontes ficam no `@theme` de `src/index.css` (Bricolage Grotesque nos títulos, Plus Jakarta Sans no texto, JetBrains Mono nos números).
