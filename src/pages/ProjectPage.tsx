import { lazy, Suspense, type ComponentType, type LazyExoticComponent } from "react";
import { useParams } from "react-router-dom";
import NotFound from "./NotFound";

// Each concept site is its own chunk, so none of them weigh on the main Nextgen pages.
const sites: Record<string, LazyExoticComponent<ComponentType>> = {
  petcare: lazy(() => import("@/projetos/PetCare")),
  "bella-italia": lazy(() => import("@/projetos/BellaItalia")),
  "urban-style": lazy(() => import("@/projetos/UrbanStyle")),
  "vintage-club": lazy(() => import("@/projetos/VintageClub")),
  "gestao-pro": lazy(() => import("@/projetos/GestaoPro")),
  fitlife: lazy(() => import("@/projetos/FitLife")),
  "saas-launch": lazy(() => import("@/projetos/SaasLaunch")),
};

export default function ProjectPage() {
  const { slug = "" } = useParams();
  const Site = sites[slug];

  if (!Site) {
    return (
      <div className="bg-ink-950">
        <NotFound />
      </div>
    );
  }

  return (
    <Suspense fallback={<div className="min-h-screen bg-ink-950" aria-busy="true" />}>
      <Site />
    </Suspense>
  );
}
