import type { Metadata } from "next";
import SellPropertyPageClient from "@/components/pages/SellPropertyPageClient";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Vender propiedad — ${site.brand}`,
  description: "Contanos sobre tu propiedad y te ayudamos a venderla al mejor precio.",
};

export default function VenderPropiedadPage() {
  return <SellPropertyPageClient />;
}
