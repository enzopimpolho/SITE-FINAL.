import PageHeader from "../components/PageHeader";
import CtaBanner from "../components/CtaBanner";
import AboutStatement from "../sections/AboutStatement";
import TechLayers from "../sections/TechLayers";
import ProcessSection from "../sections/ProcessSection";

export default function Sobre() {
  return (
    <>
      <PageHeader
        label="Sobre a Nextgen"
        title={
          <>
            Engenharia de software <span className="serif-em">sob medida.</span>
          </>
        }
        description="Um estúdio de desenvolvimento em São Paulo que projeta e constrói sites, sistemas web e automações para empresas."
      />
      <AboutStatement label="01 — Quem somos" comLink={false} />
      <TechLayers label="02 — O que construímos" />
      <ProcessSection label="03 — Processo" />
      <CtaBanner />
    </>
  );
}
