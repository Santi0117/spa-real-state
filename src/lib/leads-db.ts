import type { LeadFormType } from "./leads";
import { getSupabaseAdmin, isDatabaseConfigured } from "./supabase";

export type LeadSubmission = {
  formType: LeadFormType;
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  message?: string | null;
  payload: Record<string, unknown>;
  locale?: string | null;
};

export type SaveResult =
  | { ok: true }
  | { ok: false; skipped: true }
  | { ok: false; error: string };

export async function saveFormSubmission(
  submission: LeadSubmission
): Promise<SaveResult> {
  if (!isDatabaseConfigured()) return { ok: false, skipped: true };

  const supabase = getSupabaseAdmin();
  if (!supabase) return { ok: false, skipped: true };

  const { error } = await supabase.from("form_submissions").insert({
    form_type: submission.formType,
    name: submission.name ?? null,
    email: submission.email ?? null,
    phone: submission.phone ?? null,
    message: submission.message ?? null,
    payload: submission.payload ?? {},
    locale: submission.locale ?? null,
  });

  if (error) {
    console.error("Supabase form_submissions insert:", error.message);
    return { ok: false, error: error.message };
  }

  return { ok: true };
}
