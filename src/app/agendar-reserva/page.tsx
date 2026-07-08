import { Suspense } from "react";
import type { Metadata } from "next";
import AgendarReservaPageClient from "@/components/pages/AgendarReservaPageClient";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Agendar reserva — ${site.brand}`,
  description: "Reservá días en propiedades en alquiler de Jopa Real Estate.",
};

export default function AgendarReservaPage() {
  return (
    <Suspense>
      <AgendarReservaPageClient />
    </Suspense>
  );
}
