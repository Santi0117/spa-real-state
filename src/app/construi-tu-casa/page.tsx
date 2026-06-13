import type { Metadata } from "next";
import BuildHousePageClient from "@/components/pages/BuildHousePageClient";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Construí tu casa — ${site.brand}`,
  description: "Asesoría para construir tu casa en Costa Rica, con o sin lote.",
};

export default function ConstruiTuCasaPage() {
  return <BuildHousePageClient />;
}
