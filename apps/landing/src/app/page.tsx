import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import AISection from "@/components/AISection";
import Modules from "@/components/Modules";
import Pricing from "@/components/Pricing";
import Team from "@/components/Team";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Services />
      <AISection />
      <Modules />
      <Pricing />
      <Team />
      <Contact />
      <Footer />
    </main>
  );
}
