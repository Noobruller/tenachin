"use client";

import React from "react";
import type { ColorTokens, Lang, Theme } from "@/types";

interface HeaderProps {
  C: ColorTokens;
  lang: Lang;
  theme: Theme;
  onToggleLang: () => void;
  onToggleTheme: () => void;
  onEditProfile: () => void;
}

export default function Header({
  C, lang, theme, onToggleLang, onToggleTheme, onEditProfile,
}: HeaderProps) {
  const isDark = theme === "dark";

  const btnBase: React.CSSProperties = {
    background: "transparent",
    color: C.text,
    border: `1.5px solid ${C.border}`,
    borderRadius: 10,
    padding: "5px 9px",
    cursor: "pointer",
    fontSize: 10,
    fontWeight: 600,
    transition: "all 0.18s",
    outline: "none",
    letterSpacing: "0.01em",
  };

  return (
    <header
      style={{
        padding: "12px 16px 10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: `1px solid ${C.border}`,
        background: C.headerBg,
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        position: "sticky",
        top: 0,
        zIndex: 30,
      }}
    >
      {/* Logo + Brand */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div
          style={{
            width: 40, height: 40, borderRadius: 12, overflow: "hidden",
            background: `linear-gradient(135deg,${C.green},${C.gold})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: C.shadowGreen, flexShrink: 0,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="TENACHIN Logo"
            onError={(e) => {
              e.currentTarget.style.display = "none";
              (e.currentTarget.nextSibling as HTMLElement).style.display = "flex";
            }}
            style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 12 }}
          />
          <span
            style={{
              fontSize: 20, display: "none",
              alignItems: "center", justifyContent: "center",
              width: "100%", height: "100%",
            }}
          >🌿</span>
        </div>
        <div>
          <div style={{ fontSize: 17, fontWeight: 900, color: C.green, letterSpacing: "-0.03em", lineHeight: 1 }}>
            TENACHIN
          </div>
          <div style={{ fontSize: 9, color: C.textMuted, fontWeight: 500, letterSpacing: "0.08em" }}>
            ጤና ቺን · WELLNESS
          </div>
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <button style={btnBase} onClick={onToggleLang}>
          {lang === "en" ? "🇪🇹 አማ" : lang === "am" ? "🟢 Oro" : "🇬🇧 EN"}
        </button>
        <button style={{ ...btnBase, fontSize: 13 }} onClick={onToggleTheme}>
          {isDark ? "☀️" : "🌙"}
        </button>
        <button style={{ ...btnBase, fontSize: 13 }} onClick={onEditProfile}>
          ✏️
        </button>
      </div>
    </header>
  );
}
