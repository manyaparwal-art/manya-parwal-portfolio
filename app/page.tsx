import Hero from "../components/hero/Hero";
import AboutSection from "../components/sections/AboutSection";
import SelectedWork from "../components/sections/SelectedWork";
import DesignBrain from "../components/sections/DesignBrain";
import ContactSection from "../components/sections/ContactSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <AboutSection />
      <SelectedWork />
      <DesignBrain />
      <ContactSection />
    </main>
  );
}