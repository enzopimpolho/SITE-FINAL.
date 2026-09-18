// Arquivo gerado por scripts/build-api.mjs a partir de server/api. Não edite à mão.

// server/auth.ts
import { createHmac, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
var COOKIE_SESSAO = "leadja_sessao";
var VALIDADE_MS = 365 * 24 * 60 * 60 * 1e3;
var config = () => ({
  hash: process.env.LEADJA_ADMIN_HASH,
  segredo: process.env.LEADJA_SESSION_SECRET
});
function authDesativada({ hash, segredo }) {
  const producao = process.env.VERCEL || process.env.NODE_ENV === "production";
  return !producao && (!hash || !segredo);
}
function conferirSenha(senha, hash) {
  const [salt, esperado] = hash.split(":");
  if (!salt || !esperado) return false;
  const calculado = scryptSync(senha, Buffer.from(salt, "hex"), 32);
  const alvo = Buffer.from(esperado, "hex");
  return alvo.length === calculado.length && timingSafeEqual(alvo, calculado);
}
var assinar = (dados, segredo) => createHmac("sha256", segredo).update(dados).digest("base64url");
function criarToken(segredo) {
  const expira = String(Date.now() + VALIDADE_MS);
  return `${expira}.${assinar(expira, segredo)}`;
}
var cookie = (valor, maxAge) => `${COOKIE_SESSAO}=${valor}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${maxAge}`;
async function login(input) {
  const c = config();
  if (authDesativada(c)) return { status: 200, body: { ok: true } };
  if (!c.hash || !c.segredo) {
    return { status: 503, body: { error: "Acesso de administrador n\xE3o configurado." } };
  }
  const senha = typeof input === "object" && input && "senha" in input ? String(input.senha) : "";
  if (!senha || !conferirSenha(senha, c.hash)) {
    await new Promise((r) => setTimeout(r, 800));
    return { status: 401, body: { error: "Senha incorreta." } };
  }
  return { status: 200, body: { ok: true }, setCookie: cookie(criarToken(c.segredo), VALIDADE_MS / 1e3) };
}

// server/api/login.ts
async function POST(request) {
  const r = await login(await request.json().catch(() => null));
  const headers = r.setCookie ? { "Set-Cookie": r.setCookie } : void 0;
  return Response.json(r.body, { status: r.status, headers });
}
export {
  POST
};
