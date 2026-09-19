import { useEffect } from "react";

export const SITE_URL = "https://site-final-eight-sigma.vercel.app";

interface Meta {
  title: string;
  description: string;
  /** Páginas que não devem aparecer em buscadores */
  noindex?: boolean;
}

const PADRAO: Meta = {
  title: "Nextgen — Sites e Sistemas Web Sob Medida",
  description:
    "Desenvolvimento de sites, sistemas web, automações e soluções digitais sob medida para empresas. São Paulo, SP.",
};

const PAGINAS: Record<string, Meta> = {
  "/": PADRAO,
  "/servicos": {
    title: "Serviços — Sites, sistemas web e automações | Nextgen",
    description:
      "Sites institucionais, e-commerce, sistemas web sob medida, automações, integrações, landing pages, manutenção e SEO técnico.",
  },
  "/portfolio": {
    title: "Projetos — Sites e sistemas-conceito | Nextgen",
    description:
      "Projetos-conceito desenhados e desenvolvidos pela Nextgen em React e TypeScript: sites, e-commerce, landing page e sistema web.",
  },
  "/sistemas": {
    title: "Sistemas web e ERP demonstrativo | Nextgen",
    description:
      "Conheça o Nextgen ERP, demonstração aberta de um sistema web com pedidos, estoque, logística, financeiro e relatórios.",
  },
  "/sobre": {
    title: "Sobre — Desenvolvimento de software em São Paulo | Nextgen",
    description:
      "A Nextgen desenvolve sites e sistemas sob medida em São Paulo, da interface à infraestrutura.",
  },
  "/contato": {
    title: "Contato — Solicite um orçamento | Nextgen",
    description: "Conte o que sua empresa precisa. Atendimento por WhatsApp e e-mail.",
  },
  "/entrar": { title: "Área restrita | Nextgen", description: PADRAO.description, noindex: true },
};

function definirMeta(seletor: string, atributo: "content" | "href", valor: string) {
  document.querySelector(seletor)?.setAttribute(atributo, valor);
}

/**
 * Título, descrição, canonical e Open Graph por rota (SPA: o index.html é único).
 * Rotas desconhecidas (404) recebem noindex. Páginas de projeto definem o próprio título.
 */
export function useMetaDaPagina(pathname: string) {
  useEffect(() => {
    const projeto = pathname.startsWith("/projetos/");
    const meta = PAGINAS[pathname] ?? (projeto ? PADRAO : { ...PADRAO, noindex: true });
    const url = SITE_URL + (pathname === "/" ? "/" : pathname);

    if (!projeto) document.title = meta.title;
    definirMeta('meta[name="description"]', "content", meta.description);
    definirMeta('link[rel="canonical"]', "href", url);
    definirMeta('meta[property="og:url"]', "content", url);
    definirMeta('meta[property="og:title"]', "content", meta.title);
    definirMeta('meta[property="og:description"]', "content", meta.description);
    definirMeta('meta[name="robots"]', "content", meta.noindex ? "noindex, follow" : "index, follow");
  }, [pathname]);
}
