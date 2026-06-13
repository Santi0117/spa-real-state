import { Suspense } from "react";
import type { Metadata } from "next";
import AgendarVisitaPageClient from "@/components/pages/AgendarVisitaPageClient";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Agendar visita — ${site.brand}`,
  description: "Reservá un horario con un asesor de Jopa Real Estate.",
};

export default function AgendarVisitaPage() {
  return (
    <Suspense>
      <AgendarVisitaPageClient />
    </Suspense>
  );
}
