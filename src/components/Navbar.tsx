import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Lock } from "lucide-react";
import Logo from "./Logo";
import { navLinks } from "../data/nav";
import { useAdmin } from "../lib/admin";

const links = navLinks.filter((link) => link.path !== "/");

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [rolou, setRolou] = useState(false);
  const { pathname } = useLocation();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const admin = useAdmin();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // fundo e borda aparecem só depois de sair do topo (o hero fica limpo)
  useEffect(() => {
    const onScroll = () => setRolou(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  const solido = rolou || isOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-500 ${
        isOpen
          ? "border-white/[0.07] bg-ink-950"
          : solido
            ? "border-white/[0.07] bg-ink-950/75 backdrop-blur-md"
            : "border-transparent bg-transparent"
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between gap-6">
        <Logo />

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-8 text-[14px]">
            {links.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `link-underline py-1 transition-colors duration-300 ${isActive ? "text-fog-50 bg-[length:100%_1px]" : "text-fog-400 hover:text-fog-50"}`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          {admin && (
            // /admin é outro app (fora do React Router): link comum
            <a
              href="/admin"
              className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-fog-400 transition-colors hover:text-accent-ink"
            >
              <Lock size={12} aria-hidden="true" />
              LeadJá
            </a>
          )}
          <Link to="/contato" className="btn-primary h-9 px-4 text-[13px]">
            Solicitar orçamento
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>

        <button
          ref={toggleRef}
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isOpen}
          aria-controls="menu-mobile"
          className="relative -mr-2 flex h-11 w-11 items-center justify-center lg:hidden"
        >
          <span
            aria-hidden="true"
            className={`absolute h-px w-5 bg-fog-50 transition-transform duration-500 ease-out-expo ${isOpen ? "rotate-45" : "-translate-y-[4px]"}`}
          />
          <span
            aria-hidden="true"
            className={`absolute h-px w-5 bg-fog-50 transition-transform duration-500 ease-out-expo ${isOpen ? "-rotate-45" : "translate-y-[4px]"}`}
          />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.nav
            id="menu-mobile"
            aria-label="Menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }}
            exit={{ opacity: 0, y: -6, transition: { duration: 0.2 } }}
            className="container-x h-[calc(100svh-4rem)] overflow-y-auto border-t border-white/[0.07] pb-8 lg:hidden"
          >
            <ul className="flex flex-col">
              {navLinks.map((link, index) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    end={link.path === "/"}
                    className={({ isActive }) =>
                      `flex items-baseline gap-4 border-b border-white/[0.07] py-5 text-[28px] font-medium tracking-[-0.03em] ${isActive ? "text-fog-50" : "text-fog-300"}`
                    }
                  >
                    <span aria-hidden="true" className="font-mono text-[11px] text-fog-600">
                      0{index + 1}
                    </span>
                    {link.label}
                  </NavLink>
                </li>
              ))}
              {admin && (
                <li>
                  <a
                    href="/admin"
                    className="flex items-center gap-3 border-b border-white/[0.07] py-5 font-mono text-sm uppercase tracking-[0.14em] text-accent-ink"
                  >
                    <Lock size={14} aria-hidden="true" />
                    LeadJá · painel admin
                  </a>
                </li>
              )}
            </ul>
            <Link to="/contato" className="btn-primary mt-8 w-full">
              Solicitar orçamento
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
