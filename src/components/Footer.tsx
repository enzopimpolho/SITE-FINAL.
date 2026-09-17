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

const linkClass = "inline-block py-1 text-base text-fog-100 transition-colors hover:text-accent-ink md:text-[15px]";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="container-x flex flex-col gap-14 border-t border-white/[0.08] pb-9 pt-16 md:pt-24">
      <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-6">
        <div className="col-span-2 flex flex-col gap-4 md:col-span-1">
          <Logo />
          <p className="max-w-[280px] text-base leading-relaxed text-fog-400 md:text-[15px]">
            Sites, sistemas web e aplicações digitais sob medida para empresas que querem crescer com
            tecnologia.
          </p>
        </div>

        <nav aria-labelledby="rodape-navegacao" className="flex flex-col gap-2">
          <h2 id="rodape-navegacao" className="label mb-1">
            Navegação
          </h2>
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link to={link.path} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden flex-col gap-2 md:flex">
          <h2 className="label mb-1">Serviços</h2>
          <ul className="flex flex-col gap-1">
            {serviceNames.map((name) => (
              <li key={name} className="py-1 text-[15px] text-fog-100">
                {name}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="label mb-1">Redes</h2>
          <ul className="flex flex-col gap-1">
            {company.social.map((item) => (
              <li key={item.label}>
                <a href={item.href} target="_blank" rel="noreferrer" className={linkClass}>
                  {item.label}
                  <span className="sr-only"> (abre em nova aba)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="select-none text-[25vw] font-semibold leading-[0.8] tracking-[-0.065em] text-fog-600 lg:text-[216px]"
      >
        Nextgen
      </div>

      <div className="flex flex-col gap-1 pr-16 text-xs text-fog-400 md:flex-row md:justify-between md:text-[13px]">
        <p>© {year} Nextgen. Todos os direitos reservados.</p>
        <p>Feito em São Paulo, SP.</p>
      </div>
    </footer>
  );
}
