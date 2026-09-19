// Vercel Routing Middleware: manutenção e senha, controladas por variáveis na Vercel
// (Settings → Environment Variables). Depois de mudar um valor, faça Redeploy.
//
//   SITE_MAINTENANCE = 1  → mostra a página de manutenção (HTTP 503)   | 0 → site normal
//   SITE_PASSWORD_ON = 1  → pede senha para entrar (Basic Auth)        | 0 → sem senha
//   SITE_PASSWORD         → a senha (qualquer usuário é aceito)
//
// Se as duas estiverem ligadas, a manutenção tem prioridade.
// /admin e /api ficam fora da manutenção (o LeadJá continua usável), mas entram na senha.

export const config = { matcher: "/:path*" };

// Previsão de volta informada ao Google (segunda-feira, 21/09/2026, 9h em São Paulo)
const VOLTA = "Mon, 21 Sep 2026 12:00:00 GMT";

const ligado = (valor) => ["1", "true", "on", "sim"].includes(String(valor ?? "").trim().toLowerCase());
const seguir = () => new Response(null, { headers: { "x-middleware-next": "1" } });
const encoder = new TextEncoder();

async function sha256(texto) {
  return new Uint8Array(await crypto.subtle.digest("SHA-256", encoder.encode(texto)));
}

/** Compara pelo hash (mesmo tamanho) em tempo constante. */
async function senhaConfere(recebida, esperada) {
  const [a, b] = await Promise.all([sha256(recebida), sha256(esperada)]);
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

function senhaDoCabecalho(request) {
  const header = request.headers.get("authorization") || "";
  if (!header.startsWith("Basic ")) return null;
  try {
    const texto = atob(header.slice(6));
    const i = texto.indexOf(":");
    return i >= 0 ? texto.slice(i + 1) : null;
  } catch {
    return null;
  }
}

const PAGINA = `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="robots" content="noindex" />
<title>Nextgen — Site em manutenção</title>
<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='10' fill='%232f5bff'/%3E%3Cpath d='M18 44V20h5.2l17.6 18.4V20H46v24h-5.2L23.2 25.6V44H18Z' fill='%23fff'/%3E%3C/svg%3E" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500&family=Geist+Mono&display=swap" rel="stylesheet" />
<style>
  *{box-sizing:border-box;margin:0}
  html,body{height:100%}
  body{background:#05060a;color:#f3f4f8;font-family:Geist,ui-sans-serif,system-ui,sans-serif;-webkit-font-smoothing:antialiased;display:flex;flex-direction:column}
  .wrap{width:100%;max-width:1280px;margin:0 auto;padding:0 20px}
  header{border-bottom:1px solid rgba(255,255,255,.06)}
  header .wrap{height:64px;display:flex;align-items:center;gap:10px;font-weight:600;font-size:15px;letter-spacing:.18em}
  main{flex:1;display:flex;align-items:center}
  main .wrap{padding-top:80px;padding-bottom:80px}
  .meta{font-family:"Geist Mono",ui-monospace,monospace;font-size:13px;color:#7e8494}
  h1{margin-top:20px;font-weight:500;font-size:clamp(44px,9vw,120px);line-height:.95;letter-spacing:-.05em}
  h1 span{color:#7e8494}
  p.texto{margin-top:28px;max-width:460px;font-size:18px;line-height:1.6;color:#9ba1af}
  .contato{margin-top:48px;padding-top:20px;border-top:1px solid rgba(255,255,255,.08);display:flex;flex-wrap:wrap;gap:12px 28px;font-size:15px}
  .contato a{color:#d5d8e0;text-decoration:none;padding:4px 0;border-bottom:1px solid rgba(255,255,255,.2)}
  .contato a:hover,.contato a:focus-visible{color:#fff;border-color:#8fb0ff;outline:none}
  footer .wrap{padding:24px 20px;border-top:1px solid rgba(255,255,255,.08);font-family:"Geist Mono",ui-monospace,monospace;font-size:12px;color:#7e8494}
  @media (min-width:768px){.wrap{padding-left:40px;padding-right:40px}}
</style>
</head>
<body>
<header><div class="wrap">
  <svg width="22" height="22" viewBox="0 0 64 64" aria-hidden="true"><rect width="64" height="64" rx="10" fill="#2f5bff"/><path d="M18 44V20h5.2l17.6 18.4V20H46v24h-5.2L23.2 25.6V44H18Z" fill="#fff"/></svg>
  NEXTGEN
</div></header>
<main><div class="wrap">
  <p class="meta">Status — manutenção programada</p>
  <h1>Site em manutenção.<br /><span>Voltamos segunda.</span></h1>
  <p class="texto">Estamos atualizando o site. Ele volta ao ar na segunda-feira, 21 de setembro.</p>
  <div class="contato">
    <a href="https://wa.me/553195121764">WhatsApp — +55 31 9512-1764</a>
    <a href="mailto:Luizfreitas26@icloud.com">Luizfreitas26@icloud.com</a>
  </div>
</div></main>
<footer><div class="wrap">© Nextgen · São Paulo — Brasil</div></footer>
</body>
</html>`;

export default async function middleware(request) {
  const { pathname } = new URL(request.url);
  const interno = /^\/(admin|api)(\/|$)/.test(pathname);

  if (ligado(process.env.SITE_MAINTENANCE) && !interno) {
    return new Response(PAGINA, {
      status: 503,
      headers: { "Content-Type": "text/html; charset=utf-8", "Retry-After": VOLTA, "Cache-Control": "no-store" },
    });
  }

  const senha = process.env.SITE_PASSWORD;
  if (ligado(process.env.SITE_PASSWORD_ON) && senha) {
    const recebida = senhaDoCabecalho(request);
    if (recebida === null || !(await senhaConfere(recebida, senha))) {
      return new Response("Acesso restrito.", {
        status: 401,
        headers: {
          "WWW-Authenticate": 'Basic realm="Nextgen", charset="UTF-8"',
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "no-store",
        },
      });
    }
  }

  return seguir();
}
