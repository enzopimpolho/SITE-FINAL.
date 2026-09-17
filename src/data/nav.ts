export interface NavLink {
  label: string;
  path: string;
}

export const navLinks: NavLink[] = [
  { label: "Início", path: "/" },
  { label: "Serviços", path: "/servicos" },
  { label: "Portfólio", path: "/portfolio" },
  { label: "Sobre", path: "/sobre" },
  { label: "Contato", path: "/contato" },
];
