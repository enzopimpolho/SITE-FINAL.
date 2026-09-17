import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Logo from "./Logo";
import { navLinks } from "../data/nav";

const links = navLinks.filter((link) => link.path !== "/");

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  return (
    <header className="fixed inset-x-4 top-4 z-50 md:inset-x-10 md:top-7 lg:inset-x-20">
      <div className="flex h-[60px] items-center justify-between rounded-full border border-white/[0.09] bg-ink-850/90 pl-4 pr-2 md:h-16 md:pl-[22px] md:pr-2.5">
        <Logo />

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-7 text-sm">
            {links.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `inline-block px-1 py-2.5 transition-colors duration-300 hover:text-fog-50 ${isActive ? "text-accent-ink" : "text-fog-200"}`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <Link
          to="/contato"
          className="hidden h-11 items-center gap-2 rounded-full bg-accent px-5 text-sm font-medium text-white transition-colors duration-300 hover:bg-accent-hover lg:flex"
        >
          Solicitar orçamento
          <ArrowUpRight size={15} aria-hidden="true" />
        </Link>

        <button
          ref={toggleRef}
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isOpen}
          aria-controls="menu-mobile"
          className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/15 lg:hidden"
        >
          <span
            aria-hidden="true"
            className={`absolute h-[1.5px] w-4 bg-fog-50 transition-transform duration-500 ease-out-expo ${isOpen ? "rotate-45" : "-translate-y-[4px]"}`}
          />
          <span
            aria-hidden="true"
            className={`absolute h-[1.5px] w-4 bg-fog-50 transition-transform duration-500 ease-out-expo ${isOpen ? "-rotate-45" : "translate-y-[4px]"}`}
          />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.nav
            id="menu-mobile"
            aria-label="Menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.25 } }}
            className="mt-2 rounded-[28px] border border-white/[0.09] bg-ink-850 p-6 lg:hidden"
          >
            <ul className="flex flex-col">
              {navLinks.map((link, index) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    end={link.path === "/"}
                    className={({ isActive }) =>
                      `flex items-baseline gap-4 border-b border-white/[0.08] py-4 text-2xl font-medium tracking-[-0.02em] ${isActive ? "text-accent-ink" : "text-fog-50"}`
                    }
                  >
                    <span aria-hidden="true" className="font-mono text-xs text-fog-500">
                      0{index + 1}
                    </span>
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <Link to="/contato" className="btn-primary mt-6 w-full">
              Solicitar orçamento
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
