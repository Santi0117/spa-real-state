import { NextResponse } from "next/server";
import { saveChatExchange } from "@/lib/chat-db";
import type { ChatMessage } from "@/lib/assistant-context";
import type { LanguageCode } from "@/lib/i18n";
import { getAssistantReply } from "@/lib/openai";

const MAX_MESSAGE_LENGTH = 500;
const rateLimit = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 20;
const RATE_WINDOW_MS = 60_000;

const apiErrors: Record<
  LanguageCode,
  {
    rateLimit: string;
    empty: string;
    tooLong: string;
    process: string;
  }
> = {
  es: {
    rateLimit: "Demasiados mensajes. Intentá de nuevo en un minuto.",
    empty: "El mensaje no puede estar vacío.",
    tooLong: "El mensaje es demasiado largo.",
    process: "Error al procesar el mensaje.",
  },
  en: {
    rateLimit: "Too many messages. Please try again in a minute.",
    empty: "The message cannot be empty.",
    tooLong: "The message is too long.",
    process: "Error processing the message.",
  },
  pt: {
    rateLimit: "Muitas mensagens. Tente novamente em um minuto.",
    empty: "A mensagem nao pode estar vazia.",
    tooLong: "A mensagem e muito longa.",
    process: "Erro ao processar a mensagem.",
  },
};

function parseLocale(raw: unknown): LanguageCode {
  return raw === "en" || raw === "pt" ? raw : "es";
}

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

function parseHistory(raw: unknown): ChatMessage[] {
  if (!Array.isArray(raw)) return [];

  return raw
    .filter(
      (m): m is ChatMessage =>
        typeof m === "object" &&
        m !== null &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string"
    )
    .slice(-10);
}

export async function POST(request: Request) {
  let locale: LanguageCode = "es";

  try {
    const clientId = getClientId(request);
    const body = await request.json();
    locale = parseLocale(body.locale);
    const errors = apiErrors[locale];

    if (isRateLimited(clientId)) {
      return NextResponse.json({ error: errors.rateLimit }, { status: 429 });
    }

    const message = typeof body.message === "string" ? body.message.trim() : "";
    const history = parseHistory(body.history);
    const sessionId =
      typeof body.sessionId === "string" && body.sessionId.length <= 64
        ? body.sessionId
        : clientId;

    if (!message) {
      return NextResponse.json({ error: errors.empty }, { status: 400 });
    }

    if (message.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json({ error: errors.tooLong }, { status: 400 });
    }

    const { reply, provider } = await getAssistantReply(message, history, locale);

    await saveChatExchange(sessionId, message, reply, provider);

    return NextResponse.json({ reply, provider });
  } catch {
    return NextResponse.json(
      { error: apiErrors[locale].process },
      { status: 500 }
    );
  }
}
