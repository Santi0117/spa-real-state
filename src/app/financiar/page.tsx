import { redirect } from "next/navigation";

type PageProps = {
  searchParams: Promise<{ id?: string; propiedad?: string }>;
};

export default async function FinanciarPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const query = new URLSearchParams();

  if (params.id) query.set("id", params.id);
  if (params.propiedad) query.set("propiedad", params.propiedad);

  const suffix = query.toString();
  redirect(suffix ? `/?${suffix}#financiamiento` : "/#financiamiento");
}
