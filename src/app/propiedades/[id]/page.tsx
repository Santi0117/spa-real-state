import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyDetail from "@/components/PropertyDetail";
import { getPropertyById, properties } from "@/lib/properties";
import { site } from "@/lib/site";

type PageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return properties.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const property = getPropertyById(id);
  if (!property) return { title: site.brand };

  return {
    title: `${property.title} — ${site.brand}`,
    description: property.description,
  };
}

export default async function PropertyPage({ params }: PageProps) {
  const { id } = await params;
  const property = getPropertyById(id);
  if (!property) notFound();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-cream pb-20 pt-24 md:pt-28">
        <PropertyDetail property={property} />
      </main>
      <Footer />
    </>
  );
}
