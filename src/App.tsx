import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import { MotionConfig } from "framer-motion";
import { Analytics } from "@vercel/analytics/react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollProgress from "./components/ScrollProgress";
import WhatsAppButton from "./components/WhatsAppButton";
import Home from "./pages/Home";
import Servicos from "./pages/Servicos";
import Portfolio from "./pages/Portfolio";
import Sistemas from "./pages/Sistemas";
import Entrar from "./pages/Entrar";
import Sobre from "./pages/Sobre";
import Contato from "./pages/Contato";
import NotFound from "./pages/NotFound";
import ProjectPage from "./pages/ProjectPage";
import { scrollToTop, startSmoothScroll } from "./lib/smoothScroll";
import { MotionPauseProvider } from "./lib/motion";

function RouteChangeHandler({ mainRef }: { mainRef: React.RefObject<HTMLElement> }) {
  const { pathname } = useLocation();
  const isFirstRender = useRef(true);

  useEffect(() => {
    scrollToTop();
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    // Move keyboard/screen-reader focus to the new page instead of leaving it on the old link.
    mainRef.current?.focus({ preventScroll: true });
  }, [pathname, mainRef]);

  return null;
}

export default function App() {
  const mainRef = useRef<HTMLElement>(null);
  const { pathname } = useLocation();
  // Concept sites are shown full screen, without the Nextgen navbar and footer.
  const isConceptSite = pathname.startsWith("/projetos/");

  useEffect(() => startSmoothScroll(), []);

  return (
    <MotionConfig reducedMotion="user">
      <MotionPauseProvider>
        <div className="relative flex min-h-screen flex-col overflow-x-clip bg-ink-950 text-fog-50">
          <a
            href="#conteudo"
            className="fixed left-4 top-4 z-[70] -translate-y-24 rounded-full bg-accent px-5 py-3 text-sm font-medium text-white transition-transform focus-visible:translate-y-0"
          >
            Pular para o conteúdo
          </a>
          <RouteChangeHandler mainRef={mainRef} />
          {!isConceptSite && <ScrollProgress />}
          {!isConceptSite && <Navbar />}
          <main id="conteudo" ref={mainRef} tabIndex={-1} className="flex-1 outline-none">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/servicos" element={<Servicos />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/sistemas" element={<Sistemas />} />
              <Route path="/entrar" element={<Entrar />} />
              <Route path="/sobre" element={<Sobre />} />
              <Route path="/contato" element={<Contato />} />
              <Route path="/projetos/:slug" element={<ProjectPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          {!isConceptSite && <Footer />}
          {!isConceptSite && <WhatsAppButton />}
          <Analytics />
        </div>
      </MotionPauseProvider>
    </MotionConfig>
  );
}
