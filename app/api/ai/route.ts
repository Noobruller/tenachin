import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { systemPrompt, messages } = await req.json();
    const apiKey =
      process.env.OR_KEY ||
      process.env.NEXT_PUBLIC_OR_KEY ||
      "";

    if (!apiKey) {
      return NextResponse.json(
        { error: "OpenRouter API key is not configured" },
        { status: 500 }
      );
    }

    const payload = {
      model: "deepseek/deepseek-chat",
      max_tokens: 800,
      messages: [{ role: "system", content: systemPrompt }, ...messages],
    };

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "HTTP-Referer": "https://tenachin.app",
        "X-Title": "TENACHIN Wellness",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errText = await res.text();
      return NextResponse.json(
        { error: `API ${res.status}: ${errText.slice(0, 150)}` },
        { status: res.status }
      );
    }

    const d = await res.json();
    const content =
      d.choices?.[0]?.message?.content?.trim() ||
      d.choices?.[0]?.message?.reasoning?.trim();

    if (!content) {
      return NextResponse.json(
        { error: "AI model returned an empty response. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({ text: content });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

