import Hero from "../sections/Hero";
import TrustMarquee from "../components/TrustMarquee";
import ServicesSection from "../sections/ServicesSection";
import PortfolioSection from "../sections/PortfolioSection";
import WhyUsSection from "../sections/WhyUsSection";
import ProcessSection from "../sections/ProcessSection";
import TestimonialsSection from "../sections/TestimonialsSection";
import ContactSection from "../sections/ContactSection";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustMarquee />
      <ServicesSection />
      <PortfolioSection />
      <WhyUsSection />
      <ProcessSection />
      <TestimonialsSection />
      <ContactSection />
    </>
  );
}
