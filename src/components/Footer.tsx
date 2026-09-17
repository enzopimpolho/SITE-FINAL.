import { Link } from "react-router-dom";
import Logo from "./Logo";
import { navLinks } from "../data/nav";
import { company } from "../data/company";

const serviceNames = [
  "Sites institucionais",
  "E-commerce",
  "Sistemas sob medida",
  "Landing pages",
  "Manutenção e suporte",
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="container-x flex flex-col gap-14 border-t border-white/[0.08] pb-9 pt-16 md:pt-24">
      <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-6">
        <div className="col-span-2 flex flex-col gap-4 md:col-span-1">
          <Logo />
          <p className="max-w-[280px] text-[15px] leading-relaxed text-fog-400">
            Sites, sistemas web e aplicações digitais sob medida para empresas que querem crescer com
            tecnologia.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <span className="label">Navegação</span>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-[15px] text-fog-100 transition-colors hover:text-accent-ink"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden flex-col gap-3 md:flex">
          <span className="label">Serviços</span>
          {serviceNames.map((name) => (
            <span key={name} className="text-[15px] text-fog-100">
              {name}
            </span>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <span className="label">Redes</span>
          {company.social.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="text-[15px] text-fog-100 transition-colors hover:text-accent-ink"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>

      <div
        aria-hidden="true"
        className="select-none text-[25vw] font-semibold leading-[0.8] tracking-[-0.065em] text-fog-600 lg:text-[216px]"
      >
        Nextgen
      </div>

      <div className="flex flex-col gap-1 pr-16 text-xs text-fog-400 md:flex-row md:justify-between md:text-[13px]">
        <span>© {year} Nextgen. Todos os direitos reservados.</span>
        <span>Feito em São Paulo, SP.</span>
      </div>
    </footer>
  );
}
