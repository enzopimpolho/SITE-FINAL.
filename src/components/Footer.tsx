import { Link } from "react-router-dom";
import Logo from "./Logo";
import { company } from "../data/company";

const areas = ["Sites", "Sistemas", "Automações", "Integrações"];
const linkClass = "link-underline text-[15px] text-fog-300 transition-colors hover:text-fog-50";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/[0.08]">
      <div className="container-x grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-5">
          <Logo />
          <p className="mt-5 max-w-[300px] text-[15px] leading-relaxed text-fog-500">
            Sites e sistemas web sob medida. Da interface à infraestrutura.
          </p>
        </div>

        <div className="md:col-span-3">
          <h2 className="label mb-5">O que fazemos</h2>
          <ul className="flex flex-col gap-2.5 text-[15px] text-fog-300">
            {areas.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <h2 className="label mb-5">Contato</h2>
          <ul className="flex flex-col gap-2.5">
            <li>
              <a href={`https://wa.me/${company.whatsappHref}`} target="_blank" rel="noreferrer" className={linkClass}>
                WhatsApp — {company.whatsapp}
                <span className="sr-only"> (abre em nova aba)</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${company.email}`} className={linkClass}>
                {company.email}
              </a>
            </li>
            <li>
              <Link to="/contato" className={linkClass}>
                Formulário de contato
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="container-x flex flex-col gap-2 border-t border-white/[0.08] py-6 pr-20 font-mono text-[11px] uppercase tracking-[0.14em] text-fog-600 md:flex-row md:justify-between">
        <p>© {year} Nextgen</p>
        <p>
          São Paulo — Brasil ·{" "}
          <Link to="/entrar" className="transition-colors hover:text-fog-300">
            Área restrita
          </Link>
        </p>
      </div>
    </footer>
  );
}
