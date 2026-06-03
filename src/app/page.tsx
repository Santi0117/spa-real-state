import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import FeaturedProperties from "@/components/FeaturedProperties";
import Areas from "@/components/Areas";
import PropertyGrid from "@/components/PropertyGrid";
import Services from "@/components/Services";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Stats />
        <FeaturedProperties />
        <Areas />
        <PropertyGrid />
        <Services />
        <About />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
