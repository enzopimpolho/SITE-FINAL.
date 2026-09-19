// Vercel Routing Middleware: protege o site inteiro com senha (HTTP Basic Auth).
// A senha não fica no código: a Vercel guarda só o SHA-256 dela em SITE_PASSWORD_SHA256.
// Qualquer nome de usuário é aceito; só a senha é conferida.
// Para liberar o site, basta remover a variável SITE_PASSWORD_SHA256 na Vercel e publicar de novo.

export const config = { matcher: "/:path*" };

const encoder = new TextEncoder();

async function sha256Hex(texto) {
  const digest = await crypto.subtle.digest("SHA-256", encoder.encode(texto));
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

/** Comparação em tempo constante para não vazar informação pelo tempo de resposta. */
function iguais(a, b) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

function senhaDoCabecalho(request) {
  const header = request.headers.get("authorization") || "";
  if (!header.startsWith("Basic ")) return null;
  try {
    const decodificado = atob(header.slice(6));
    const separador = decodificado.indexOf(":");
    return separador >= 0 ? decodificado.slice(separador + 1) : null;
  } catch {
    return null;
  }
}

export default async function middleware(request) {
  const esperado = process.env.SITE_PASSWORD_SHA256;
  // sem a variável configurada, o site fica aberto
  if (!esperado) return new Response(null, { headers: { "x-middleware-next": "1" } });

  const senha = senhaDoCabecalho(request);
  if (senha !== null && iguais(await sha256Hex(senha), esperado.toLowerCase())) {
    return new Response(null, { headers: { "x-middleware-next": "1" } });
  }

  return new Response("Acesso restrito.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Nextgen", charset="UTF-8"',
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
