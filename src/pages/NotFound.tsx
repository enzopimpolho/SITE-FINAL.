import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[80vh] flex-col items-start justify-center gap-6 pb-24 pt-36">
      <span className="label">Erro 404</span>
      <h1 className="text-[56px] font-medium leading-none tracking-[-0.04em] md:text-[88px]">
        Página não <span className="serif-em">encontrada.</span>
      </h1>
      <p className="max-w-md text-base leading-relaxed text-fog-400 md:text-lg">
        A página que você tentou acessar não existe ou foi movida.
      </p>
      <Link to="/" className="btn-primary">
        <ArrowLeft size={16} aria-hidden="true" />
        Voltar para o início
      </Link>
    </section>
  );
}
