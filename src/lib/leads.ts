export type LeadFormType =
  | "contact"
  | "schedule_visit"
  | "sell_property"
  | "build_house";

export type LeadInput = {
  formType: LeadFormType;
  payload: Record<string, unknown>;
  locale?: string;
};

/**
 * Envía un formulario al endpoint que lo persiste en Supabase.
 * Se usa desde componentes de cliente.
 */
export async function submitLead(input: LeadInput): Promise<boolean> {
  try {
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    return res.ok;
  } catch {
    return false;
  }
}
