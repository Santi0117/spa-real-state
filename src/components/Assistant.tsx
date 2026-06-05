"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { quickReplies, welcomeMessage } from "@/lib/chatbot";
import { site } from "@/lib/site";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function getSessionId() {
  if (typeof window === "undefined") return "server";
  const key = "jopa-chat-session";
  let id = sessionStorage.getItem(key);
  if (!id) {
    id = createId();
    sessionStorage.setItem(key, id);
  }
  return id;
}

export default function Assistant() {
  const [messages, setMessages] = useState<Message[]>([
    { id: "welcome", role: "assistant", content: welcomeMessage },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading, scrollToBottom]);

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    setError(null);
    setInput("");

    const userMessage: Message = {
      id: createId(),
      role: "user",
      content: trimmed,
    };

    const historyForApi = [...messages, userMessage]
      .filter((m) => m.id !== "welcome")
      .map((m) => ({ role: m.role, content: m.content }));

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          history: historyForApi,
          sessionId: getSessionId(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? "No se pudo enviar el mensaje.");
      }

      setMessages((prev) => [
        ...prev,
        {
          id: createId(),
          role: "assistant",
          content: data.reply,
        },
      ]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error de conexión.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <section id="asistente" className="border-t border-charcoal/8 bg-white py-20 md:py-28">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <div className="text-center">
          <p className="section-label">Asistente</p>
          <h2 className="font-display mt-3 text-4xl font-medium tracking-tight text-charcoal md:text-5xl">
            ¿Tenés preguntas?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-slate-warm">
            Preguntale al asistente de {site.brand}. Responde al instante sobre propiedades,
            zonas, visitas y servicios.
          </p>
        </div>

        <div className="mt-10 overflow-hidden border border-charcoal/8 bg-cream shadow-sm">
          <div className="flex items-center gap-3 border-b border-charcoal/8 bg-gold/10 px-5 py-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold font-display text-lg text-white">
              J
            </div>
            <div>
              <p className="text-sm font-semibold text-charcoal">Asistente virtual</p>
              <p className="flex items-center gap-1.5 text-xs text-slate-warm">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold" />
                En línea ahora
              </p>
            </div>
          </div>

          <div
            ref={scrollRef}
            className="max-h-[360px] space-y-4 overflow-y-auto p-5 md:p-6"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[88%] rounded-sm px-4 py-3 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-gold text-white"
                      : "border border-charcoal/8 bg-white text-charcoal/85"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="flex gap-1 rounded-sm border border-charcoal/8 bg-white px-4 py-3">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gold/70 [animation-delay:0ms]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gold/70 [animation-delay:150ms]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gold/70 [animation-delay:300ms]" />
                </div>
              </div>
            )}

            {error && <p className="text-center text-xs text-red-600">{error}</p>}
          </div>

          <div className="border-t border-charcoal/8 px-5 pb-4 pt-3">
            <div className="flex flex-wrap gap-2">
              {quickReplies.map((reply) => (
                <button
                  key={reply}
                  type="button"
                  disabled={loading}
                  onClick={() => sendMessage(reply)}
                  className="rounded-sm border border-charcoal/15 bg-white px-3 py-2 text-xs text-charcoal/80 transition hover:border-gold hover:bg-gold/5 hover:text-charcoal disabled:opacity-50 md:text-sm"
                >
                  {reply}
                </button>
              ))}
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 border-t border-charcoal/8 px-4 py-4"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribí tu pregunta..."
              disabled={loading}
              maxLength={500}
              className="input-field flex-1 rounded-sm"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="btn-gold flex h-11 w-11 shrink-0 items-center justify-center rounded-sm p-0 disabled:opacity-40"
              aria-label="Enviar"
            >
              →
            </button>
          </form>
        </div>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link href="/agendar-visita" className="btn-gold rounded-sm">
            Agendar visita
          </Link>
          <a
            href={`mailto:${site.email}`}
            className="text-sm text-slate-warm transition hover:text-gold"
          >
            o escribinos → {site.email}
          </a>
        </div>
      </div>
    </section>
  );
}
