import type { ChatMessage } from "@/types";

const OR_KEY      = process.env.NEXT_PUBLIC_OR_KEY ?? "";
const OR_ENDPOINT = "https://openrouter.ai/api/v1/chat/completions";
const OR_MODEL    = "openrouter/auto";

export async function orChat(
  systemPrompt: string,
  messages: ChatMessage[]
): Promise<string> {
  const payload = {
    model: OR_MODEL,
    max_tokens: 1000,
    messages: [{ role: "system", content: systemPrompt }, ...messages],
  };

  const headers: Record<string, string> = {
    "Content-Type":  "application/json",
    "Authorization": `Bearer ${OR_KEY}`,
    "HTTP-Referer":  "https://tenachin.app",
    "X-Title":       "TENACHIN Wellness",
  };

  const res = await fetch(OR_ENDPOINT, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`API ${res.status}: ${errText.slice(0, 120)}`);
  }

  const d = await res.json();
  return d.choices?.[0]?.message?.content?.trim() ?? "No response.";
}
