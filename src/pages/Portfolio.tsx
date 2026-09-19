import PageHeader from "../components/PageHeader";
import CtaBanner from "../components/CtaBanner";
import PortfolioGrid from "../sections/PortfolioGrid";

export default function Portfolio() {
  return (
    <>
      <PageHeader
        label="Projetos"
        title={
          <>
            Projetos <span className="serif-em">selecionados.</span>
          </>
        }
        description="Sites e sistemas-conceito desenhados e desenvolvidos pela Nextgen. Clique em um projeto para ampliar e abrir."
      />
      <PortfolioGrid />
      <CtaBanner />
    </>
  );
}
