// Arquivo gerado por scripts/build-api.mjs a partir de server/api. Não edite à mão.

// server/auth.ts
var COOKIE_SESSAO = "leadja_sessao";
var VALIDADE_MS = 365 * 24 * 60 * 60 * 1e3;
var cookie = (valor, maxAge) => `${COOKIE_SESSAO}=${valor}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${maxAge}`;
function logout() {
  return { status: 204, body: null, setCookie: cookie("", 0) };
}

// server/api/logout.ts
function POST() {
  const r = logout();
  return new Response(null, { status: r.status, headers: { "Set-Cookie": r.setCookie } });
}
export {
  POST
};
