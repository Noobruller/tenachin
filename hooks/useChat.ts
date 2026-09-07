"use client";

import { useState, useEffect, useRef } from "react";
import type { ChatMessage, Lang } from "@/types";
import type { Profile } from "@/types";
import { orChat } from "@/lib/openrouter";

interface UseChatProps {
  profile: Profile;
  bmi: string | null;
  bmiCat: string | null;
  lang: Lang;
}

export function useChat({ profile, bmi, bmiCat, lang }: UseChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Selam! I'm your TENACHIN Wellness Coach 🌿 Powered by OpenRouter Auto. How can I support your health journey today?",
    },
  ]);
  const [chatIn,   setChatIn]   = useState("");
  const [chatLoad, setChatLoad] = useState(false);
  const [chatErr,  setChatErr]  = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendChat = async (overrideText?: string) => {
    const text = (overrideText ?? chatIn).trim();
    if (!text || chatLoad) return;
    setChatIn("");
    setChatErr("");

    const langName =
      lang === "en" ? "English" : lang === "am" ? "Amharic" : "Afaan Oromoo";

    setMessages((m) => [...m, { role: "user", content: text }]);
    setChatLoad(true);

    try {
      const sys = `You are Tenachin, an Ethiopian wellness AI coach. Profile: Name:${
        profile.fullName || "User"
      }, Age:${profile.age || "?"}, Sex:${profile.sex}, Weight:${
        profile.weight || "?"
      }kg, BMI:${bmi || "?"} (${bmiCat || "?"}), Religion:${
        profile.religion
      }, Budget:${profile.budget || "?"}ETB/mo, Conditions:${
        profile.conditions.join(",") || "None"
      }. Respond warmly in ${langName}. Keep it 2-3 sentences. Focus on Ethiopian foods and local context.`;

      const reply = await orChat(sys, [
        ...messages,
        { role: "user", content: text },
      ]);
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Unknown error";
      setChatErr(msg);
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Connection error. Please try again." },
      ]);
    }
    setChatLoad(false);
  };

  return { messages, chatIn, setChatIn, chatLoad, chatErr, chatEndRef, sendChat };
}
