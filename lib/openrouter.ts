import type { ChatMessage } from "@/types";

const OR_KEY = process.env.NEXT_PUBLIC_OR_KEY ?? "";
const OR_ENDPOINT = "https://openrouter.ai/api/v1/chat/completions";
const OR_MODEL = "deepseek/deepseek-chat";

export async function orChat(
  systemPrompt: string,
  messages: ChatMessage[]
): Promise<string> {
  // Try internal Next.js API route first (handles keys on server & avoids client CORS issues)
  try {
    const apiRes = await fetch("/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ systemPrompt, messages }),
    });

    if (apiRes.ok) {
      const data = await apiRes.json();
      if (data.text) {
        return data.text;
      }
    }
  } catch {
    // If the internal API route fails or isn't reachable, fall back to direct call
  }

  // Direct client fallback
  const payload = {
    model: OR_MODEL,
    max_tokens: 800,
    messages: [{ role: "system", content: systemPrompt }, ...messages],
  };

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${OR_KEY}`,
    "HTTP-Referer": "https://tenachin.app",
    "X-Title": "TENACHIN Wellness",
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
  const content =
    d.choices?.[0]?.message?.content?.trim() ||
    d.choices?.[0]?.message?.reasoning?.trim();

  if (!content) {
    throw new Error("AI returned an empty response. Please try again.");
  }

  return content;
}
