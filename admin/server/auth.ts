// Acesso restrito ao administrador: senha única (hash scrypt em LEADJA_ADMIN_HASH)
// e sessão em cookie HttpOnly assinado com HMAC (LEADJA_SESSION_SECRET). Sem dependências.
import { createHmac, randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';

export const COOKIE_SESSAO = 'leadja_sessao';
const VALIDADE_MS = 7 * 24 * 60 * 60 * 1000;

interface Config {
  hash?: string;
  segredo?: string;
}

const config = (): Config => ({
  hash: process.env.LEADJA_ADMIN_HASH,
  segredo: process.env.LEADJA_SESSION_SECRET,
});

/** Sem configuração, o acesso só é liberado fora de produção (desenvolvimento local). */
function authDesativada({ hash, segredo }: Config) {
  const producao = process.env.VERCEL || process.env.NODE_ENV === 'production';
  return !producao && (!hash || !segredo);
}

/** Gera o valor de LEADJA_ADMIN_HASH para uma senha (formato salt:hash em hex). */
export function hashSenha(senha: string): string {
  const salt = randomBytes(16);
  return `${salt.toString('hex')}:${scryptSync(senha, salt, 32).toString('hex')}`;
}

function conferirSenha(senha: string, hash: string): boolean {
  const [salt, esperado] = hash.split(':');
  if (!salt || !esperado) return false;
  const calculado = scryptSync(senha, Buffer.from(salt, 'hex'), 32);
  const alvo = Buffer.from(esperado, 'hex');
  return alvo.length === calculado.length && timingSafeEqual(alvo, calculado);
}

const assinar = (dados: string, segredo: string) =>
  createHmac('sha256', segredo).update(dados).digest('base64url');

function criarToken(segredo: string): string {
  const expira = String(Date.now() + VALIDADE_MS);
  return `${expira}.${assinar(expira, segredo)}`;
}

function tokenValido(token: string | undefined, segredo: string): boolean {
  if (!token) return false;
  const [expira, assinatura] = token.split('.');
  if (!expira || !assinatura || Number(expira) < Date.now()) return false;
  const a = Buffer.from(assinatura);
  const b = Buffer.from(assinar(expira, segredo));
  return a.length === b.length && timingSafeEqual(a, b);
}

function lerCookie(header: string | null | undefined, nome: string): string | undefined {
  for (const parte of (header ?? '').split(';')) {
    const [k, ...v] = parte.trim().split('=');
    if (k === nome) return decodeURIComponent(v.join('='));
  }
  return undefined;
}

const cookie = (valor: string, maxAge: number) =>
  `${COOKIE_SESSAO}=${valor}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${maxAge}`;

/** Verdadeiro se a requisição (header Cookie) tem sessão de administrador válida. */
export function autenticado(cookieHeader: string | null | undefined): boolean {
  const c = config();
  if (authDesativada(c)) return true;
  if (!c.segredo) return false;
  return tokenValido(lerCookie(cookieHeader, COOKIE_SESSAO), c.segredo);
}

export interface RespostaAuth {
  status: number;
  body: unknown;
  setCookie?: string;
}

export async function login(input: unknown): Promise<RespostaAuth> {
  const c = config();
  if (authDesativada(c)) return { status: 200, body: { ok: true } };
  if (!c.hash || !c.segredo) {
    return { status: 503, body: { error: 'Acesso de administrador não configurado.' } };
  }
  const senha = typeof input === 'object' && input && 'senha' in input ? String(input.senha) : '';
  if (!senha || !conferirSenha(senha, c.hash)) {
    // atraso fixo para encarecer tentativas de força bruta
    await new Promise((r) => setTimeout(r, 800));
    return { status: 401, body: { error: 'Senha incorreta.' } };
  }
  return { status: 200, body: { ok: true }, setCookie: cookie(criarToken(c.segredo), VALIDADE_MS / 1000) };
}

export function logout(): RespostaAuth {
  return { status: 204, body: null, setCookie: cookie('', 0) };
}

export const NAO_AUTORIZADO: RespostaAuth = {
  status: 401,
  body: { error: 'Acesso restrito ao administrador. Faça login.' },
};
