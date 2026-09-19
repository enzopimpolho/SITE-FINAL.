import PageHeader from "../components/PageHeader";
import CtaBanner from "../components/CtaBanner";
import PortfolioGrid from "../sections/PortfolioGrid";

export default function Portfolio() {
  return (
    <>
      <PageHeader
        label="Portfólio"
        title={
          <>
            Projetos que já <span className="serif-em">colocamos no ar.</span>
          </>
        }
        description="Uma seleção de sites, sistemas e lojas virtuais desenvolvidos para empresas de diferentes segmentos e portes."
      />
      <PortfolioGrid />
      <CtaBanner
        title={
          <>
            Gostou do que <span className="serif-em">viu?</span>
          </>
        }
        description="Seu projeto pode ser o próximo case da Nextgen. Vamos conversar sobre a sua ideia."
      />
    </>
  );
}
