import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Logo from "./Logo";
import { navLinks } from "../data/nav";

const links = navLinks.filter((link) => link.path !== "/");

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header className="fixed inset-x-4 top-4 z-50 md:inset-x-10 md:top-7 lg:inset-x-20">
      <nav className="flex h-[60px] items-center justify-between rounded-full border border-white/[0.09] bg-ink-850/90 pl-4 pr-2 md:h-16 md:pl-[22px] md:pr-2.5">
        <Logo />

        <div className="hidden items-center gap-9 text-sm lg:flex">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `transition-colors duration-300 hover:text-fog-50 ${isActive ? "text-accent-ink" : "text-fog-200"}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <Link
          to="/contato"
          className="hidden h-11 items-center gap-2 rounded-full bg-accent px-5 text-sm font-medium text-white transition-colors duration-300 hover:bg-accent-hover lg:flex"
        >
          Solicitar orçamento
          <ArrowUpRight size={15} />
        </Link>

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isOpen}
          className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/15 lg:hidden"
        >
          <span
            className={`absolute h-[1.5px] w-4 bg-fog-50 transition-transform duration-500 ease-out-expo ${isOpen ? "rotate-45" : "-translate-y-[4px]"}`}
          />
          <span
            className={`absolute h-[1.5px] w-4 bg-fog-50 transition-transform duration-500 ease-out-expo ${isOpen ? "-rotate-45" : "translate-y-[4px]"}`}
          />
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="mt-2 rounded-[28px] border border-white/[0.09] bg-ink-850 p-6 lg:hidden"
          >
            <div className="flex flex-col">
              {navLinks.map((link, index) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === "/"}
                  className={({ isActive }) =>
                    `flex items-baseline gap-4 border-b border-white/[0.08] py-4 text-2xl font-medium tracking-[-0.02em] ${isActive ? "text-accent-ink" : "text-fog-50"}`
                  }
                >
                  <span className="font-mono text-xs text-fog-500">0{index + 1}</span>
                  {link.label}
                </NavLink>
              ))}
            </div>
            <Link to="/contato" className="btn-primary mt-6 w-full">
              Solicitar orçamento
              <ArrowUpRight size={16} />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
