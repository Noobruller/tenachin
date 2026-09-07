"use client";

import React from "react";
import type { ColorTokens, Lang } from "@/types";
import { t } from "@/lib/i18n";

// We inline the type here to avoid a circular import
export interface CoachScreenProps {
  messages: Array<{ role: "user" | "assistant"; content: string }>;
  chatIn: string;
  setChatIn: (v: string) => void;
  chatLoad: boolean;
  chatErr: string;
  chatEndRef: React.RefObject<HTMLDivElement>;
  sendChat: (overrideText?: string) => void;
  C: ColorTokens;
  lang: Lang;
}

export default function CoachScreen({
  messages, chatIn, setChatIn, chatLoad, chatErr, chatEndRef, sendChat, C, lang,
}: CoachScreenProps) {
  const T = (key: string) => t(lang, key);
  const QP = [T("q1"), T("q2"), T("q3"), T("q4")];

  const chip: React.CSSProperties = {
    background: "transparent",
    color: C.text,
    border: `1.5px solid ${C.border}`,
    borderRadius: 20,
    padding: "6px 14px",
    cursor: "pointer",
    fontSize: 11,
    fontWeight: 600,
    transition: "all 0.18s",
    outline: "none",
    flexShrink: 0,
    whiteSpace: "nowrap",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Coach header */}
      <div style={{
        padding: "12px 16px 10px",
        borderBottom: `1px solid ${C.border}`,
        display: "flex", alignItems: "center", gap: 12,
        background: C.surface, flexShrink: 0,
      }}>
        <div style={{ width: 40, height: 40, borderRadius: 14, background: `linear-gradient(135deg,${C.green},#0A5C2E)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, boxShadow: C.shadowGreen }}>
          🌿
        </div>
        <div>
          <div style={{ fontWeight: 800, fontSize: 14, color: C.text }}>{T("coach_title")}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 1 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.green }} />
            <span style={{ fontSize: 10, color: C.green, fontWeight: 600 }}>{T("coach_online")}</span>
          </div>
        </div>
      </div>

      {/* Error */}
      {chatErr && (
        <div style={{ margin: "8px 16px", padding: "8px 12px", background: `${C.red}15`, borderRadius: 10, fontSize: 11, color: C.red, flexShrink: 0 }}>
          ⚠ {chatErr}
        </div>
      )}

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", padding: "14px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", alignItems: "flex-end", gap: 8 }}>
            {m.role === "assistant" && (
              <div style={{ width: 28, height: 28, borderRadius: 10, background: C.green, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, flexShrink: 0 }}>
                🌿
              </div>
            )}
            <div style={{
              maxWidth: "78%",
              background: m.role === "user" ? `linear-gradient(135deg,${C.green},${C.greenDark})` : C.surface,
              color: m.role === "user" ? "#fff" : C.text,
              borderRadius: m.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
              padding: "11px 15px", fontSize: 13, lineHeight: 1.55,
              border: m.role === "assistant" ? `1px solid ${C.border}` : "none",
              boxShadow: C.shadow,
            }}>
              {m.content}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {chatLoad && (
          <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: 10, background: C.green, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13 }}>🌿</div>
            <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: "18px 18px 18px 4px", padding: "12px 16px", display: "flex", gap: 4 }}>
              {[0, 1, 2].map((i) => (
                <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: C.green, animation: "bounce 1.2s infinite", animationDelay: `${i * 0.18}s` }} />
              ))}
            </div>
          </div>
        )}
        <div ref={chatEndRef as React.RefObject<HTMLDivElement>} />
      </div>

      {/* Input area */}
      <div style={{ padding: "10px 16px 12px", borderTop: `1px solid ${C.border}`, background: C.navBg, backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", flexShrink: 0 }}>
        {/* Quick prompts */}
        <div style={{ display: "flex", gap: 6, marginBottom: 8, overflowX: "auto", paddingBottom: 2 }}>
          {QP.map((q) => (
            <button key={q} style={chip} onClick={() => sendChat(q)}>{q}</button>
          ))}
        </div>

        {/* Input + send */}
        <div style={{ display: "flex", gap: 8 }}>
          <input
            style={{
              background: C.surfaceEl, border: `1.5px solid ${C.border}`,
              borderRadius: 12, padding: "12px 16px", color: C.text,
              fontSize: 14, flex: 1, boxSizing: "border-box",
              outline: "none", fontFamily: "inherit",
            }}
            value={chatIn}
            onChange={(e) => setChatIn(e.target.value)}
            placeholder={T("coach_input")}
            onKeyDown={(e) => e.key === "Enter" && sendChat()}
          />
          <button
            style={{
              background: C.green, color: "#fff", border: "none",
              borderRadius: 12, padding: "12px 18px", cursor: "pointer",
              flexShrink: 0, fontWeight: 700, fontSize: 16,
              boxShadow: C.shadowGreen, transition: "opacity 0.15s",
            }}
            onClick={() => sendChat()}
            disabled={chatLoad}
          >
            {chatLoad ? "…" : "→"}
          </button>
        </div>
      </div>
    </div>
  );
}
