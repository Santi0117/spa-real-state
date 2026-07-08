import { NextResponse } from "next/server";
import type { LeadFormType } from "@/lib/leads";
import { saveFormSubmission } from "@/lib/leads-db";

const VALID_FORM_TYPES: LeadFormType[] = [
  "contact",
  "schedule_visit",
  "sell_property",
  "build_house",
];

const MAX_FIELD_LENGTH = 2000;
const MAX_FIELDS = 40;

const rateLimit = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 10;
const RATE_WINDOW_MS = 60_000;

function getClientId(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "anonymous"
  );
}

function isRateLimited(clientId: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(clientId);

  if (!entry || now > entry.resetAt) {
    rateLimit.set(clientId, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_LIMIT) return true;
  entry.count += 1;
  return false;
}

function sanitizePayload(raw: unknown): Record<string, string> {
  if (typeof raw !== "object" || raw === null) return {};

  const clean: Record<string, string> = {};
  let count = 0;

  for (const [key, value] of Object.entries(raw as Record<string, unknown>)) {
    if (count >= MAX_FIELDS) break;
    if (value === undefined || value === null) continue;

    const str =
      typeof value === "string" ? value : String(value as string | number | boolean);
    clean[key.slice(0, 100)] = str.slice(0, MAX_FIELD_LENGTH).trim();
    count += 1;
  }

  return clean;
}

function pick(payload: Record<string, string>, keys: string[]): string | null {
  for (const key of keys) {
    if (payload[key]) return payload[key];
  }
  return null;
}

export async function POST(request: Request) {
  try {
    const clientId = getClientId(request);

    if (isRateLimited(clientId)) {
      return NextResponse.json(
        { error: "Demasiados envíos. Intentá de nuevo en un minuto." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const formType = body?.formType as LeadFormType;

    if (!VALID_FORM_TYPES.includes(formType)) {
      return NextResponse.json(
        { error: "Tipo de formulario inválido." },
        { status: 400 }
      );
    }

    const payload = sanitizePayload(body?.payload);

    if (Object.keys(payload).length === 0) {
      return NextResponse.json(
        { error: "El formulario está vacío." },
        { status: 400 }
      );
    }

    const locale =
      typeof body?.locale === "string" ? body.locale.slice(0, 8) : null;

    const firstName = pick(payload, ["firstName", "nombre"]);
    const lastName = pick(payload, ["lastName", "apellido"]);
    const singleName = pick(payload, ["name"]);
    const fullName = [firstName, lastName].filter(Boolean).join(" ").trim();
    const name = singleName ?? (fullName || null);

    const result = await saveFormSubmission({
      formType,
      name,
      email: pick(payload, ["email", "correo"]),
      phone: pick(payload, ["phone", "telefono", "tel"]),
      message: pick(payload, ["message", "mensaje", "negotiable", "budget"]),
      payload,
      locale,
    });

    if (result.ok) {
      return NextResponse.json({ ok: true, stored: true });
    }

    if ("skipped" in result) {
      // Supabase no configurado: no perdemos la UX del visitante, pero avisamos.
      console.warn(
        "form_submissions: Supabase no configurado, envío no almacenado.",
        formType
      );
      return NextResponse.json({ ok: true, stored: false });
    }

    return NextResponse.json(
      { error: "No se pudo guardar el envío." },
      { status: 500 }
    );
  } catch {
    return NextResponse.json(
      { error: "Error al procesar el formulario." },
      { status: 500 }
    );
  }
}
