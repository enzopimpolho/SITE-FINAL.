// Arquivo gerado por scripts/build-api.mjs a partir de server/api. Não edite à mão.

// server/auth.ts
import { createHmac, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
var COOKIE_SESSAO = "leadja_sessao";
var VALIDADE_MS = 7 * 24 * 60 * 60 * 1e3;
var config = () => ({
  hash: process.env.LEADJA_ADMIN_HASH,
  segredo: process.env.LEADJA_SESSION_SECRET
});
function authDesativada({ hash, segredo }) {
  const producao = process.env.VERCEL || process.env.NODE_ENV === "production";
  return !producao && (!hash || !segredo);
}
var assinar = (dados, segredo) => createHmac("sha256", segredo).update(dados).digest("base64url");
function tokenValido(token, segredo) {
  if (!token) return false;
  const [expira, assinatura] = token.split(".");
  if (!expira || !assinatura || Number(expira) < Date.now()) return false;
  const a = Buffer.from(assinatura);
  const b = Buffer.from(assinar(expira, segredo));
  return a.length === b.length && timingSafeEqual(a, b);
}
function lerCookie(header, nome) {
  for (const parte of (header ?? "").split(";")) {
    const [k, ...v] = parte.trim().split("=");
    if (k === nome) return decodeURIComponent(v.join("="));
  }
  return void 0;
}
function autenticado(cookieHeader) {
  const c = config();
  if (authDesativada(c)) return true;
  if (!c.segredo) return false;
  return tokenValido(lerCookie(cookieHeader, COOKIE_SESSAO), c.segredo);
}

// server/api/session.ts
function GET(request) {
  return Response.json({ autenticado: autenticado(request.headers.get("cookie")) });
}
export {
  GET
};
