import { getSupabaseAdmin, isDatabaseConfigured } from "./supabase";

export async function saveChatExchange(
  sessionId: string,
  userMessage: string,
  assistantReply: string,
  provider: string
): Promise<void> {
  if (!isDatabaseConfigured()) return;

  const supabase = getSupabaseAdmin();
  if (!supabase) return;

  const rows = [
    { session_id: sessionId, role: "user", content: userMessage, provider: null },
    { session_id: sessionId, role: "assistant", content: assistantReply, provider },
  ];

  const { error } = await supabase.from("chat_messages").insert(rows);

  if (error) {
    console.error("Supabase chat_messages insert:", error.message);
  }
}
