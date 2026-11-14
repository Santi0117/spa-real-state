"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "@/components/LanguageProvider";
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
  const { t, locale } = useTranslations();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([{ id: "welcome", role: "assistant", content: t.assistant.welcomeMessage }]);
  }, [locale, t.assistant.welcomeMessage]);

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
        throw new Error(data.error ?? t.assistant.sendError);
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
      setError(err instanceof Error ? err.message : t.assistant.connectionError);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <section id="asistente" className="bg-navy py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="section-label-gold">{t.assistant.label}</p>
          <h2 className="font-display mt-4 text-4xl font-normal tracking-tight text-white md:text-6xl">
            {t.assistant.title}
          </h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-white/80">
            {t.assistant.description}
          </p>
          <div className="mt-8 flex flex-col items-start gap-4">
            <Link href="/agendar-visita" className="btn-gold">
              {t.cta.schedule}
            </Link>
            <a
              href={`mailto:${site.email}`}
              className="text-sm text-white/80 transition hover:text-gold"
            >
              {t.assistant.orWriteUs} {site.email}
            </a>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl bg-white shadow-2xl shadow-black/30">
          <div className="flex items-center gap-3 px-6 pb-2 pt-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-navy font-display text-lg text-gold">
              J
            </div>
            <div>
              <p className="text-sm font-bold text-navy">{t.assistant.virtualAssistant}</p>
              <p className="flex items-center gap-1.5 text-xs text-slate-warm">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                {t.assistant.onlineNow}
              </p>
            </div>
          </div>

          <div
            ref={scrollRef}
            className="max-h-[320px] space-y-3 overflow-y-auto px-6 py-4"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "rounded-br-sm bg-navy text-white"
                      : "rounded-bl-sm bg-sand text-navy/90"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="flex gap-1 rounded-2xl rounded-bl-sm bg-sand px-4 py-3">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gold/70 [animation-delay:0ms]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gold/70 [animation-delay:150ms]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gold/70 [animation-delay:300ms]" />
                </div>
              </div>
            )}

            {error && <p className="text-center text-xs text-red-600">{error}</p>}
          </div>

          <div className="px-6 pb-4">
            <div className="flex flex-wrap gap-2">
              {t.assistant.quickReplies.map((reply) => (
                <button
                  key={reply}
                  type="button"
                  disabled={loading}
                  onClick={() => sendMessage(reply)}
                  className="rounded-full border border-dashed border-navy/40 px-4 py-2 text-xs text-navy transition hover:border-gold hover:bg-gold/10 disabled:opacity-50"
                >
                  {reply}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="px-6 pb-6">
            <div className="flex items-center gap-2 rounded-full bg-sand py-1.5 pl-5 pr-1.5">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t.assistant.placeholder}
                disabled={loading}
                maxLength={500}
                className="min-w-0 flex-1 bg-transparent py-2 text-sm text-navy outline-none placeholder:text-slate-warm/70"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy text-white transition hover:bg-navy-deep disabled:opacity-40"
                aria-label={t.assistant.send}
              >
                →
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
