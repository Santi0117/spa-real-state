import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CondominiumDetail from "@/components/CondominiumDetail";
import {
  getAllCondominiumSlugs,
  getCondominiumBySlug,
} from "@/lib/condominiums";
import { site } from "@/lib/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllCondominiumSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const condo = getCondominiumBySlug(slug);
  if (!condo) return { title: site.brand };

  return {
    title: `Condominio ${condo.name} — ${site.brand}`,
    description: condo.description,
  };
}

export default async function CondominiumPage({ params }: PageProps) {
  const { slug } = await params;
  const condominium = getCondominiumBySlug(slug);
  if (!condominium) notFound();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-cream pb-20 pt-24 md:pt-28">
        <CondominiumDetail condominium={condominium} />
      </main>
      <Footer />
    </>
  );
}
