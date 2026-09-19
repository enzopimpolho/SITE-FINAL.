import ShaderHero from "@/sections/ShaderHero";
import ServicesSection from "@/sections/ServicesSection";
import TechLayers from "@/sections/TechLayers";
import SelectedProjects from "@/sections/SelectedProjects";
import SystemsShowcase from "@/sections/SystemsShowcase";
import ProcessSection from "@/sections/ProcessSection";
import AboutStatement from "@/sections/AboutStatement";
import CtaBanner from "@/components/CtaBanner";

export default function Home() {
  return (
    <>
      <ShaderHero />
      <ServicesSection />
      <TechLayers />
      <SelectedProjects />
      <SystemsShowcase />
      <ProcessSection />
      <AboutStatement />
      <CtaBanner />
    </>
  );
}
