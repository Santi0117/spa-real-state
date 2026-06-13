import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import FeaturedProperties from "@/components/FeaturedProperties";
import ServicesMarquee from "@/components/ServicesMarquee";
import Areas from "@/components/Areas";
import PropertyGrid from "@/components/PropertyGrid";
import FinancingSection from "@/components/FinancingSection";
import Services from "@/components/Services";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import Assistant from "@/components/Assistant";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Stats />
        <FeaturedProperties />
        <ServicesMarquee />
        <Areas />
        <PropertyGrid />
        <Suspense fallback={null}>
          <FinancingSection />
        </Suspense>
        <Services />
        <About />
        <Testimonials />
        <Assistant />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
